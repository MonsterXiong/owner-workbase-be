<template>
  <div class="activity-design">
    <PanelLayout>
      <div class="activity-design-main">
        <div
          class="activity-design-diagram"
          ref="diagramRef"
          @drop="handleDrop"
          @dragenter="handleDragenter"
          @dragover="handleDragover"
          @dragleave="handleDragleave"
        ></div>
        <div class="toolbar">
          <el-button type="primary" size="small" @click="autoLayout" v-if="finallyConfig.autoLayoutable">自动布局</el-button>
          <el-button type="primary" size="small" @click="changeToHorizontal" v-if="finallyConfig.horizontalable">横向</el-button>
          <el-button type="primary" size="small" @click="changeToVertical" v-if="finallyConfig.verticalable">纵向</el-button>
        </div>
      </div>
      <template slot="right">
        <div class="activity-design-meta">
          <div class="design-meta-block">
            <h3 class="title">流程</h3>
            <ul>
              <li
                class="meta-item process-item"
                draggable
                @dragstart="(event) => dragstart(event, process)"
                v-for="process in _processList"
                :key="process[finallyConfig.processTextKey]"
              >
                <slot name="processMetaItem" :process="process">
                  <div class="process-box">
                    <div class="head" style="font-size: 12px">
                      {{ process[finallyConfig.processTextKey] }}
                    </div>
                    <div class="main"></div>
                  </div>
                </slot>
              </li>
            </ul>
          </div>
          <div class="design-meta-block">
            <h3 class="title">活动</h3>
            <ul>
              <li
                class="meta-item activity-item"
                draggable
                @dragstart="(event) => dragstart(event, activity)"
                v-for="activity in activityList"
                :key="activity[finallyConfig.activityTextKey]"
              >
                <slot name="activityMetaItem" :activity="activity">
                  <div class="activity-box">
                    {{ activity[finallyConfig.activityTextKey] }}
                  </div>
                </slot>
              </li>
            </ul>
          </div>
        </div>
      </template>
    </PanelLayout>
  </div>
</template>

<script>
// TODO 竖向和横向转换
import PanelLayout from '@/components/panelLayout/PanelLayout.vue'
import GuidedDraggingTool from './gojs/plugin/GuidedDraggingTool.js'
import { LaneResizingTool, PoolLayout, HorizontalPoolLayout } from './gojs/plugin/PoolLayout.js'
import {
  poolTemplateMaker,
  poolHorizontalTemplateMaker,
  outtestTemplateMaker,
  outtestHorizontalTemplateMaker,
  defaultNodeTemplateMaker,
  groupResizeAdornmentTemplateMaker,
} from './gojs/template/template.js'
import { loadMockData, SwimLaneLayout } from './toolLib/LayoutHelper.js'
import { mockNodes, mockLinks } from './mockData.js'
import * as go from 'gojs'
import { isFunction, uuid } from '@/utils/commonUtil.js'
const $ = go.GraphObject.make

const nodeCategoryProperty = '_category'
const nodeKeyProperty = 'nodeId'
const poolCategory = 'processGroup'
const poolHorizontalCategory = 'processHorizontalGroup'
export const outtestContainerId = '999'
const outtestContainerCategory = 'outtest'
const outtestHorizontalContainerCategory = 'outtestHorizontal'

import { baseConfig } from './config.js'

export default {
  name: 'ActivityDesign',
  props: {
    processList: {
      type: Array,
      default: () => [],
    },
    activityList: {
      type: Array,
      default: () => [],
    },
    config: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    this.diagram = null
    this.layout = null
    return {}
  },
  mounted() {
    this.initDiagram()
    // this.loadMockData()
    // this.fixGroupSize(this.diagram)
  },
  computed: {
    finallyConfig() {
      return Object.assign(baseConfig, this.config)
    },
    _processList() {
      const list = _.cloneDeep(this.processList)
      list.forEach((item) => {
        item[nodeCategoryProperty] = poolCategory
        item.isGroup = true
      })
      return list
    },
  },
  methods: {
    loadMockData() {
      this.diagram.model.addNodeDataCollection(mockNodes)
      this.diagram.model.linkDataArray = mockLinks
    },
    changeDirection(isVertical = true) {
      const diagram = this.getDiagram()
      diagram.nodes.each((node) => {
        const nodeData = node.data
        if (nodeData[diagram.model.nodeCategoryProperty] === isVertical ? poolHorizontalCategory : poolCategory) {
          diagram.model.setCategoryForNodeData(nodeData, isVertical ? poolCategory : poolHorizontalCategory)
        }
      })
      diagram.model.modelData.__layout = isVertical ? 'vertical' : 'horizontal'
      diagram.layout = $(isVertical ? PoolLayout : HorizontalPoolLayout, { spacing: new go.Size(0, 0) })
      diagram.layoutDiagram()
    },
    changeToHorizontal() {
      this.changeDirection(false)
    },
    changeToVertical() {
      this.changeDirection(true)
    },
    autoLayout() {
      const diagram = this.getDiagram()
      const nodes = []
      const groups = []
      diagram.nodes.each((node) => {
        const nodeData = node.data
        if (!nodeData.isGroup) {
          const { width, height } = node.actualBounds
          nodeData.width = width
          nodeData.height = height
          nodes.push(nodeData)
        } else {
          groups.push(nodeData)
        }
      })
      const graphConfig = { rankDir: diagram.model.modelData.__layout === 'horizontal' ? 'LR' : 'TB' }
      const links = diagram.model.linkDataArray
      const layout = new SwimLaneLayout(nodes, links, diagram, { idKey: nodeKeyProperty, nodeNameKey: 'nodeName' }, graphConfig)
      this.layout = layout
      const { nodes: newNodes } = this.layout.doLayout()
      newNodes.forEach((item) => {
        item.loc = `${item.x} ${item.y}`
      })
      groups.push(...newNodes)
      diagram.model.nodeDataArray = groups
      //TODO 修正group的Size
      // this.fixGroupSize(diagram)
    },
    fixGroupSize(diagram) {
      const processGroupIds = diagram.model.nodeDataArray
        .filter((item) => [poolCategory, poolHorizontalCategory].includes(item[diagram.model.nodeCategoryProperty]))
        .map((item) => item[diagram.model.nodeKeyProperty])
      const groupObj = new Map()
      diagram.nodes.each((node) => {
        const nodeData = node.data
        if (processGroupIds.includes(nodeData.group)) {
          let goList = groupObj.get(nodeData.group)
          if (!goList) {
            goList = new go.List()
          }
          goList.add(node)
          groupObj.set(nodeData.group, goList)
        }
      })
      groupObj.forEach((nodes, groupId) => {
        const group = diagram.findNodeForKey(groupId)
        this.computeGroupFitSize(group, nodes, diagram)
      })
      console.log('groupObj', groupObj)
    },
    computeGroupFitSize(group, nodes, diagram) {
      const nodesBound = diagram.computePartsBounds(nodes)
      const groupBound = group.actualBounds
      let groupNewBound = new go.Rect(nodesBound.x - 20, nodesBound.y - 20, nodesBound.width + 40, nodesBound.height + 200)
      console.log('groupNewBound', groupNewBound)
      diagram.model.setDataProperty(group.data, 'loc', `${groupNewBound.x} ${groupNewBound.y}`)
      diagram.model.setDataProperty(group.data, 'size', `${groupNewBound.width} ${groupNewBound.height}`)
      // group.actualBounds = groupNewBound
    },
    initDiagram(isReadOnly) {
      const diagram = $(go.Diagram, this.$refs.diagramRef, {
        draggingTool: new GuidedDraggingTool(), // defined in GuidedDraggingTool.js
        'draggingTool.horizontalGuidelineColor': 'blue',
        'draggingTool.verticalGuidelineColor': 'blue',
        'draggingTool.centerGuidelineColor': 'green',
        'draggingTool.guidelineWidth': 1,
        resizingTool: new LaneResizingTool(),
        layout: $(PoolLayout, {
          spacing: new go.Size(0, 0),
        }),
        mouseDragOver: (e) => {
          // console.log(e, '=++++-+++--=-=_+-+++++++++++++')
        },
        mouseDrop: (e) => {},
        linkDrawn: (linkDrawnEvent) => {
          if (this.finallyConfig.linkDrawnAfterHook && isFunction(this.finallyConfig.linkDrawnAfterHook)) {
            let linkData = null
            const { subject, diagram } = linkDrawnEvent
            const linkFromKeyProperty = diagram.model.linkFromKeyProperty
            const linkToKeyProperty = diagram.model.linkToKeyProperty
            linkDrawnEvent.diagram.model.removeLinkData(subject.data)
            const fromNode = diagram.findNodeForKey(subject.data[linkFromKeyProperty])
            const toNode = diagram.findNodeForKey(subject.data[linkToKeyProperty])
            linkData = this.finallyConfig.linkDrawnAfterHook(fromNode, toNode, linkDrawnEvent)
            if (!linkData) {
              console.warn('linkDrawnAfterHook 函数返回的连线数据为空')
            } else {
              diagram.startTransaction('addLink')
              diagram.model.addLinkData(linkData)
              diagram.commitTransaction('addLink')
            }
          }
        },
        'commandHandler.copiesGroupKey': true,
        'animationManager.isEnabled': false,
        'undoManager.isEnabled': true, //ctrl-z, ctrl-y 撤销和恢复上一步 移动 复制 删除
        // SelectionMoved: (e) => relayoutDiagram(e.diagram), // 让泳道移动自动排序
        // SelectionCopied: (e) => relayoutDiagram(e.diagram),
      })
      const poolTemplate = poolTemplateMaker()
      const poolHorizontalTemplate = poolHorizontalTemplateMaker()
      poolTemplate.resizeAdornmentTemplate = groupResizeAdornmentTemplateMaker()
      poolHorizontalTemplate.resizeAdornmentTemplate = groupResizeAdornmentTemplateMaker()
      diagram.groupTemplateMap.add(poolCategory, poolTemplate)
      diagram.groupTemplateMap.add(poolHorizontalCategory, poolHorizontalTemplate)
      diagram.groupTemplateMap.add(outtestContainerId, outtestTemplateMaker())
      diagram.groupTemplateMap.add(outtestHorizontalContainerCategory, outtestHorizontalTemplateMaker())

      diagram.nodeTemplate = defaultNodeTemplateMaker(this.finallyConfig)
      diagram.model = new go.GraphLinksModel({
        nodeCategoryProperty,
        nodeKeyProperty,
      })
      if (this.finallyConfig.initDiagramAfterHook && isFunction(this.finallyConfig.initDiagramAfterHook)) {
        this.finallyConfig.initDiagramBeforeHook(diagram)
      }
      diagram.model.modelData.__layout = 'vertical'
      this.diagram = diagram
      window.diagram = diagram
    },
    handleDrop(event) {
      const documentPoint = this.diagram.transformViewToDoc(new go.Point(event.offsetX, event.offsetY))
      const graphObject = this.diagram.findObjectAt(documentPoint, function (x) {
        return x.part
      })
      const itemDataStr = event.dataTransfer.getData('itemData')
      const metaData = JSON.parse(itemDataStr)
      this.addPart(documentPoint, metaData, graphObject && graphObject instanceof go.Group ? graphObject : null)
    },
    addPart(documentPoint, metaData, belongToGroup) {
      console.log('belongToGroup', belongToGroup)
      const partData = {
        [nodeKeyProperty]: uuid(),
        ...metaData,
        loc: `${documentPoint.x} ${documentPoint.y}`,
        isGroup: metaData.isGroup,
      }
      partData.group = partData.isGroup ? outtestContainerId : belongToGroup ? belongToGroup.data[nodeKeyProperty] : ''
      if (this.finallyConfig.addPartBeforeHook && isFunction(this.finallyConfig.addPartBeforeHook)) {
        this.finallyConfig.addPartBeforeHook(partData, belongToGroup, this.diagram)
      }
      this.diagram.model.addNodeData(partData)
    },
    handleDragover(ev) {
      ev.preventDefault()
    },
    handleDragenter(ev) {
      ev.preventDefault()
    },
    dragstart(event, data) {
      event.dataTransfer.effectAllowed = 'move'
      event.dataTransfer.dropEffect = 'none'
      event.dataTransfer.setData('itemData', JSON.stringify(data))
    },
    getDiagram() {
      return this.diagram
    },
  },
  components: { PanelLayout },
}
</script>

<style scoped lang="less">
.activity-design {
  width: 100%;
  height: 100%;
  .activity-design-main {
    position: relative;
    width: 100%;
    height: 100%;
    .activity-design-diagram {
      position: absolute;
      width: 100%;
      height: 100%;
    }
    .toolbar {
      position: absolute;
      z-index: 99;
      top: 10px;
      right: 10px;
    }
  }
  .activity-design-meta {
    height: 100%;
    .design-meta-block {
      .title {
        text-align: center;
        padding-bottom: 10px;
        border-bottom: 1px solid gray;
      }
      ul {
        padding: 5px 10px;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
      }
      .process-item {
        .process-box {
          width: 80px;
          height: 70px;
          border: 1px solid #000;
          margin: auto;
          margin-bottom: 6px;
          .head {
            text-align: center;
            color: #000;
            height: 28%;
            border-bottom: 1px solid #000;
            background: #fff;
          }
          .main {
            height: 72%;
            background: #fff;
          }
        }
      }
      .activity-item {
        .activity-box {
          width: 80px;
          height: 40px;
          line-height: 40px;
          text-align: center;
          border: 1px solid #000;
          background: #fff;
          margin: auto;
          margin-bottom: 6px;
        }
      }
    }
  }
}
</style>
