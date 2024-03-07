<template>
  <div class="demand-model">
    <div class="diagram-wrap">
      <div id="demandModelDiagram" @drop="handleDrop" @dragover="handleDragover"></div>
      <DiagramEditor :editorData="editorData" @currentMetaToolChange="handleCMTChange" />
    </div>
  </div>
</template>

<script>
import DiagramEditor from './DiagramEditor.vue'
import { nodeTemplate, linkTemplate, temporaryLinkTemplate } from './gojsTemplate'
import { updateNodeOrLinkProperty } from './goUtils'
import { uuid } from '@/utils/commonUtil'
import EventTypes from '@/common/eventTypes'

import * as go from 'gojs'
const $ = go.GraphObject.make

export default {
  name: 'DemandModelDiagram',
  components: { DiagramEditor },
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
          // 画布被点击事件
          click: (inputEvent) => {
            this.diagramClick(inputEvent)
          },
          // 节点连线事件
          LinkDrawn: (event) => this.linkDrawn(event),
        })
        diagram.nodeTemplate = nodeTemplate()
        diagram.linkTemplate = linkTemplate()
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
    diagramClick(inputEvent) {
      if (this.activeMetaTool === null) return console.log('当前选择的系统元素为null')
      if (this.activeMetaTool.eobjectShape === 'graph_circle') {
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
      if (typeof inputEventOrLevel === 'string') {
        if (inputEventOrLevel === 'lower') {
          node.parent = this.diagram?.selection?.first()?.data.key
        } else if (inputEventOrLevel === 'same') {
          node.parent = this.diagram?.selection?.first()?.data.parent
        }
      } else {
        node.loc = `${inputEventOrLevel.documentPoint.x} ${inputEventOrLevel.documentPoint.y}`
      }
      this.setCommonValue(node, activeMetaTool, uuidStr)
      if (typeof inputEventOrLevel !== 'string') {
        this.diagram.startTransaction('addNode')
        console.log('添加的节点数据为：', node)
        this.diagram.model.addNodeData(node)
        this.diagram.select(this.diagram.findNodeForData(node))
        this.diagram.commitTransaction('addNode')
      }
      return node
    },
    setCommonValue(nodeOrLink, activeMetaTool, uuidStr) {
      // 页面上相同eobjectShape的节点个数
      let nodeNum = 1
      this.diagram.nodes.each((node) => {
        nodeNum += 1
      })
      nodeOrLink.text = activeMetaTool.edefineName
      nodeOrLink.text += nodeNum
      nodeOrLink.objData = {
        eobjectShape: activeMetaTool.eobjectShape,
        objectId: uuidStr,
        objectName: activeMetaTool.edefineName || '',
      }
      nodeOrLink.objData.objectName += nodeNum
    },
    linkDrawn(linkDrawnEvent) {
      const {
        subject,
        diagram,
        diagram: { model: linkModel },
      } = linkDrawnEvent
      console.log(this.activeMetaTool)
      linkModel.removeLinkData(subject.data)
      linkDrawnEvent.diagram.startTransaction('addLink')
      const fromNode = linkDrawnEvent.diagram.findNodeForKey(subject.data.from)
      const toNode = linkDrawnEvent.diagram.findNodeForKey(subject.data.to)
      const uuidStr = uuid()
      subject.data.objData = {
        fromObjectId: fromNode.data.key,
        toObjectId: toNode.data.key,
        objectId: uuidStr,
        eobjectShape: this.activeMetaTool.eobjectShape,
        objectName: this.activeMetaTool.edefineName || '',
      }
      subject.data.key = uuidStr
      subject.data.text = this.activeMetaTool.edefineName
      subject.data.strokeWidth = 20
      if (this.activeMetaTool.eobjectShape === 'graph_line_dotted') {
        subject.data.dash = [6, 3]
      }
      linkModel.addLinkData(subject.data)
      linkDrawnEvent.diagram.commitTransaction('addLink')
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
  },
  watch: {
    activeNode() {
      this.activeNodeData = this.activeNode ? this.activeNode.data : null
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
