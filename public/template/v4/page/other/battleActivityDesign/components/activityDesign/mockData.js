import { poolTemplateMaker } from "./gojs/template/groupTemplate"

const nodeCategoryProperty = '_category'
const poolCategory = 'processGroup'
const mockNodes = [
  { nodeId: '1', nodeName: '发现', isGroup: true, [nodeCategoryProperty]: poolCategory },
  { nodeId: '11', nodeName: '跟踪活动11', group: '1', loc: '0 0' },
  { nodeId: '12', nodeName: '巡逻活动12', group: '1', loc: '0 50' },
  { nodeId: '13', nodeName: '巡逻活动13', group: '1', loc: '0 100' },
  { nodeId: '14', nodeName: '巡逻活动14', group: '1', loc: '0 150' },

  { nodeId: '2', nodeName: '定位', isGroup: true, [nodeCategoryProperty]: poolCategory },
  { nodeId: '21', nodeName: '跟踪活动21', group: '2', loc: '80 0' },
  { nodeId: '22', nodeName: '巡逻活动22', group: '2', loc: '80 50' },
  { nodeId: '23', nodeName: '巡逻活动23', group: '2', loc: '80 100' },
  { nodeId: '24', nodeName: '巡逻活动24', group: '2', loc: '80 150' },

  { nodeId: '3', nodeName: '跟踪', isGroup: true, [nodeCategoryProperty]: poolCategory },
  { nodeId: '31', nodeName: '跟踪活动31', group: '3', loc: '160 0' },
  { nodeId: '32', nodeName: '巡逻活动32', group: '3', loc: '160 50' },
  { nodeId: '33', nodeName: '巡逻活动33', group: '3', loc: '160 100' },
  { nodeId: '34', nodeName: '巡逻活动34', group: '3', loc: '160 150' },
  { nodeId: '35', nodeName: '巡逻活动35', group: '3', loc: '160 200' },
]
const mockLinks = [
  { from: '11', to: '12' },
  { from: '11', to: '13' },
  { from: '12', to: '14' },
  { from: '13', to: '14' },

  { from: '14', to: '21' },

  { from: '21', to: '22' },
  { from: '21', to: '23' },
  { from: '22', to: '24' },
  { from: '23', to: '24' },

  { from: '14', to: '31' },

  { from: '31', to: '32' },
  { from: '31', to: '33' },
  { from: '32', to: '34' },
  { from: '33', to: '34' },
  { from: '34', to: '35' },
]

export { mockNodes, mockLinks }
