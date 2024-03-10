<template>
  <div class="demand-model">
    <Toolbar @toolbarClick="onToolbarClick" />
    <div class="diagram-wrap">
      <div id="demandModelDiagram" @drop="handleDrop" @dragover="handleDragover"></div>
      <DiagramEditor :editorData="editorData" @currentMetaToolChange="handleCMTChange" />
    </div>
  </div>
</template>

<script>
import Toolbar from './Toolbar.vue'
import DiagramEditor from './DiagramEditor.vue'
import { defaultNodeTemplateMaker, defaultLinkTemplateMaker, temporaryLinkTemplate } from './gojs/diagramTemplate'
import { updateNodeOrLinkProperty, getFigure, isString, isLine } from './gojs/diagramHelper'
import { defaultStyle } from './gojs/defaultStyle'
import { uuid, isFunction } from '@/utils/commonUtil'
import { DrawCommandHandler } from '@/utils/DrawCommandHandler'
import EventTypes from '@/common/eventTypes'

import * as go from 'gojs'
const $ = go.GraphObject.make

export default {
  name: 'DemandModelDiagram',
  components: { Toolbar, DiagramEditor },
  props: {
    graphConfig: {
      type: Object,
      default: () => {},
    },
    updateGraphData: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      diagram: null,
      activeMetaTool: null,
      activeNodeData: null,
      defaultRightWidth: 24,
    }
  },
  computed: {
    activeNode() {
      return this.diagram?.selection.first()
    },
    selection() {
      return this.diagram?.selection
    },
    editorData() {
      return this.graphConfig?.editorData || []
    },
    isLink() {
      return this.activeNode instanceof go.Link
    },
    isNode() {
      return this.activeNode instanceof go.Node
    },
  },
  mounted() {
    console.log(this.graphConfig, 'graphConfig------------')
    this.$emitter.on(EventTypes.UPDATA_NODE_DATA, (data) => {
      this.onUpdateNodeOrLinkData(data)
    })
    this.initDiagram()
  },
  methods: {
    initDiagram() {
      if (!this.diagram) {
        const diagram = $(go.Diagram, 'demandModelDiagram', {
          allowMove: true,
          allowLink: false,
          allowRelink: true,
          commandHandler: new DrawCommandHandler(),
          // 画布被点击事件
          click: (inputEvent) => {
            this.diagramClick(inputEvent)
          },
          // 节点连线事件
          LinkDrawn: (linkDrawnEvent) => {
            let linkData = null
            const { subject, diagram } = linkDrawnEvent
            const linkFromKeyProperty = diagram.model.linkFromKeyProperty
            const linkToKeyProperty = diagram.model.linkToKeyProperty
            linkDrawnEvent.diagram.model.removeLinkData(subject.data)
            const fromNode = diagram.findNodeForKey(subject.data[linkFromKeyProperty])
            const toNode = diagram.findNodeForKey(subject.data[linkToKeyProperty])
            // 自定义连线方法
            if (this.graphConfig.linkDrawnAfterHook && isFunction(this.graphConfig.linkDrawnAfterHook)) {
              linkData = this.graphConfig.linkDrawnAfterHook(fromNode, toNode, linkDrawnEvent)
              if (!linkData) {
                console.warn('linkDrawnAfterHook 函数返回的连线数据为空')
              } else {
                diagram.startTransaction('addLink')
                diagram.model.addLinkData(linkData)
                diagram.commitTransaction('addLink')
              }
            } else {
              diagram.startTransaction('addLink')
              const uuidStr = uuid()
              linkData = {
                key: uuidStr,
                text: this.activeMetaTool.edefineName || '',
                textVisible: this.activeMetaTool.textVisible,
                [linkFromKeyProperty]: subject.data[linkFromKeyProperty],
                [linkToKeyProperty]: subject.data[linkToKeyProperty],
                objData: {
                  fromObjectId: fromNode.data.key,
                  toObjectId: toNode.data.key,
                  objectId: uuidStr,
                  eobjectShape: this.activeMetaTool.eobjectShape,
                  objectName: this.activeMetaTool.edefineName || '',
                },
              }
              if (this.activeMetaTool.dash) linkData.dash = this.activeMetaTool.dash
              diagram.model.addLinkData(linkData)
              diagram.commitTransaction('addLink')
            }
          },
        })
        diagram.nodeTemplate = defaultNodeTemplateMaker(this.graphConfig)
        diagram.linkTemplate = defaultLinkTemplateMaker(this.graphConfig)
        // 自定义初始化画布方法
        if (this.graphConfig.initDiagramAfterHook && isFunction(this.graphConfig.initDiagramAfterHook)) {
          this.graphConfig.initDiagramBeforeHook(diagram)
        }
        this.diagram = diagram
        window.diagram = this.diagram
      }
      this.diagram.model.nodeDataArray = [
        {
          key: '123',
          text: '航空平台集成数据链系统',
          loc: '100 50',
        },
        {
          key: '456',
          text: '天基平台集成数据链系统',
          loc: '600 50',
        },
        {
          key: '456',
          text: '数据链系统',
          loc: '260 -200',
        },
      ]
      this.diagram.model.linkDataArray = [
        {
          to: '456',
          from: '123',
          text: '航空平台系统交互信息',
        },
      ]
    },
    onToolbarClick(data) {
      let code = data.code
      switch (code) {
        case 'save':
          // 保存
          this.saveDiagram()
          break
        case 'delete':
          // 删除
          this.handleDelete()
          break
      }
    },
    saveDiagram() {
      this.$emit('saveDiagram', this.diagram.model.nodeDataArray)
    },
    handleDelete() {
      if (this.diagram.commandHandler.canDeleteSelection()) {
        console.log(this.diagram.commandHandler.deleteSelection)
        this.diagram.commandHandler.deleteSelection()
      }
    },
    diagramClick(inputEvent) {
      if (this.activeMetaTool === null) return console.log('当前选择的系统元素为null')
      if (isLine(this.activeMetaTool)) {
        console.warn('当前线类型不支持点击添加')
      } else {
        this.addNode(this.activeMetaTool, inputEvent)
      }
    },
    handleCMTChange(metaTool) {
      this.activeMetaTool = metaTool
      if (metaTool.eobjectShape === 'graph_circle') {
        this.diagram.allowLink = false
        this.diagram.allowReLink = false
        this.diagram.allowMove = true
      } else {
        this.diagram.allowLink = true
        this.diagram.allowReLink = true
        this.diagram.allowMove = false
        if (metaTool.eobjectShape === 'graph_line_dotted') {
          this.diagram.toolManager.linkingTool.temporaryLink = temporaryLinkTemplate()
        }
        // this.diagram.toolManager.relinkingTool.temporaryLink = dottedLinkTemplate()
      }
    },
    addNode(activeMetaTool, inputEventOrLevel) {
      const node = {}
      const uuidStr = uuid()
      node.key = uuidStr
      node.figure = getFigure(activeMetaTool.eobjectShape)
      if (typeof inputEventOrLevel === 'string') {
        if (inputEventOrLevel === 'lower') {
          node.parent = this.diagram?.selection?.first()?.data.key
        } else if (inputEventOrLevel === 'same') {
          node.parent = this.diagram?.selection?.first()?.data.parent
        }
      } else {
        node.loc = `${inputEventOrLevel.documentPoint.x} ${inputEventOrLevel.documentPoint.y}`
      }
      this.setCommonValue(node, activeMetaTool, uuidStr, this.diagram)
      if (typeof inputEventOrLevel !== 'string') {
        this.diagram.startTransaction('addNode')
        console.log('添加的节点数据为：', node)
        this.diagram.model.addNodeData(node)
        this.diagram.select(this.diagram.findNodeForData(node))
        this.diagram.commitTransaction('addNode')
      }
      return node
    },
    setCommonValue(nodeOrLink, activeMetaTool, uuidStr, diagram, isRelation) {
      // 页面上相同eobjectShape的节点个数
      let nodeNum = 1
      this.diagram.nodes.each((node) => {
        nodeNum += 1
      })
      nodeOrLink.text = activeMetaTool.edefineName
      nodeOrLink.text += nodeNum
      const style = this.loadStyle(activeMetaTool, diagram, isRelation)
      console.log(style, 'style---------------')
      if (style) {
        Object.keys(style).forEach((key) => {
          nodeOrLink[key] = style[key]
        })
      }
      nodeOrLink.objData = {
        eobjectShape: activeMetaTool.eobjectShape,
        objectId: uuidStr,
        objectName: activeMetaTool.edefineName || '',
      }
      nodeOrLink.objData.objectName += nodeNum
    },
    handleDrop(ev) {
      const documentPoint = this.diagram.transformViewToDoc(new go.Point(ev.offsetX, ev.offsetY))
      const graphObject = this.diagram.findObjectAt(documentPoint, function (x) {
        return x.part
      })
      this._handleDrop(ev, graphObject && graphObject instanceof go.Group ? graphObject : null)
    },
    handleDragover(ev) {
      ev.preventDefault()
    },
    _handleDrop(ev, group) {
      console.log(this.activeMetaTool, '_handleDrop-------------')
      // 拖拽创建节点
      const documentPoint = this.diagram.transformViewToDoc(new go.Point(ev.offsetX, ev.offsetY))
      const mockInputEvent = {
        documentPoint: { x: documentPoint.x, y: documentPoint.y },
      }
      mockInputEvent.event = {}
      mockInputEvent.event.offsetX = documentPoint.x
      mockInputEvent.event.offsetY = documentPoint.y
      this.diagramClick(mockInputEvent, group)
    },
    onUpdateNodeOrLinkData(data) {
      for (const key in data) {
        updateNodeOrLinkProperty(this.diagram, this.selection, key, data[key])
      }
    },
    loadStyle(activeMetaTool, diagram, isRelation) {
      // 设置默认样式
      const style = {}
      // 加载本地默认样式
      const localDefaultStyle = defaultStyle[activeMetaTool.eobjectShape] || {}
      // 填充 activeMetaTool 的defaultStyle
      const serverConfigStyle = activeMetaTool.defaultStyle || {}
      // 过滤掉  serverConfigStyle 中的空值
      Object.keys(serverConfigStyle).forEach((key) => {
        if (serverConfigStyle[key] == null || serverConfigStyle[key] == '') {
          delete serverConfigStyle[key]
        }
      })
      Object.assign(style, localDefaultStyle, serverConfigStyle)
      if (diagram.layoutTheme) {
        if (isRelation == '0') {
          Object.assign(style, diagram.layoutTheme.nodeStyle)
        } else if (isRelation == '1') {
          Object.assign(style, diagram.layoutTheme.linkStyle)
        }
      }
      Object.keys(style).forEach((key) => {
        let value = style[key]
        if (['strokeWidth'].includes(key)) {
          if (isString(value)) {
            style[key] = parseInt(value) || 1
          }
        }
      })
      return style
    },
  },
  watch: {
    activeNode() {
      if (this.activeNode) {
        this.activeNodeData = this.activeNode.data
        this.activeNodeData._nodeType = this.isNode ? 'node' : 'link'
      } else {
        this.activeNodeData = null
      }
      this.$emit('selectNode', this.activeNodeData)
    },
    updateGraphData(data) {
      this.onUpdateNodeOrLinkData(data)
    },
  },
}
</script>

<style lang="less" scoped>
.demand-model {
  width: 100%;
  height: 100%;
  .diagram-wrap {
    width: 100%;
    height: 100%;
    position: relative;
    #demandModelDiagram {
      width: 100%;
      height: 100%;
    }
  }
}
::v-deep {
  .panel-layout.absolute {
    pointer-events: all;
  }
}
</style>
