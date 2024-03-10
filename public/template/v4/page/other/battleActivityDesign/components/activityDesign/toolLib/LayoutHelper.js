import dagre from 'dagre'
import { groupBy, cloneDeep } from 'lodash'
// const dagre = require('dagre')
// const { groupBy } = require('lodash')
const gojsBaseOption = {
  idKey: 'nodeId',
  nodeNameKey: 'nodeName',
  nodeWidthKey: 'width',
  nodeHeightKey: 'height',
  groupKey: 'group',
  groupIsAlone: true,
}

const layoutBaseOption = {
  rankDir: 'TB', // TB BT LR RL
  align: undefined, // UL UR DL DR
  nodesep: 50, // 水平方向上，分隔节点的距离（节点之间的间距）
  edgesep: 10,
  ranksep: 50, // 每个层级间的距离
  marginx: 0,
  marginy: 0,
  acyclicer: undefined,
  ranker: 'tight-tree', // 'network-simplex' || 'tight-tree' || 'longest-path'
}

class SwimLaneLayout {
  constructor(nodes, links, diagram, gojsOption = {}, layoutOption = {}) {
    let _links = cloneDeep(links)
    this.finallyGojsOption = Object.assign(gojsBaseOption, gojsOption)
    this.finallyLayoutOption = Object.assign(layoutBaseOption, layoutOption)
    const groupObj = groupBy(nodes)
    const g = new dagre.graphlib.Graph()
    g.setGraph(this.finallyLayoutOption)
    g.setDefaultEdgeLabel(function () {
      return {}
    })
    Object.keys(groupObj).forEach((group) => {
      const nodeList = groupObj[group]
      nodeList.forEach((node) => {
        g.setNode(node[this.finallyGojsOption.idKey], {
          label: node[this.finallyGojsOption.nodeNameKey],
          shape: 'rect',
          width: node[this.finallyGojsOption.nodeWidthKey],
          height: node[this.finallyGojsOption.nodeHeightKey],
          ...node,
          _rawData: node,
        })
      })
    })
    if (this.finallyGojsOption.groupIsAlone) {
      // 去掉跨组的连线
      _links.forEach((link, index) => {
        const from = link[diagram.model.linkFromKeyProperty]
        const to = link[diagram.model.linkToKeyProperty]
        const fromNode = diagram.findNodeForKey(from)
        const toNode = diagram.findNodeForKey(to)
        if (fromNode.data[diagram.model.nodeGroupKeyProperty] != toNode.data[diagram.model.nodeGroupKeyProperty]) {
          _links[index] = null
        }
      })
      _links = _links.filter((item) => item)
    }
    _links.forEach((link) => {
      g.setEdge(link.from, link.to)
    })
    this.g = g
  }
  setGraph(config) {
    this.finallyLayoutOption = Object.assign(this.finallyLayoutOption, config)
    this.g.setGraph(this.finallyLayoutOption)
  }
  doLayout() {
    dagre.layout(this.g)
    const newNodes = []
    this.g.nodes().forEach((nodeId) => {
      newNodes.push(this.g.node(nodeId))
    })
    return { nodes: newNodes }
  }
}

export { SwimLaneLayout }
