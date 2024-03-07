export const MockNodeList = [
  {
    id: 'root',
    name: '根节点',
    parentId: '',
    properties: {},
    sortValue: 0, //排序
    // _type: 'default', //颜色
    tag: '标签', //标签
  },
  {
    id: 'child1',
    name: '子节点1',
    parentId: 'root',
    properties: {
      remark: '描述',
    },
    sortValue: 1,
    _type: 'red',
    tag: '子节点1-标签', //标签
  },
  {
    id: 'child2',
    name: '子节点2',
    parentId: 'root',
    properties: {},
    sortValue: 2,
    _type: 'red',
    tag: '子节点2-标签', //标签
  },
  {
    id: 'child3',
    name: '子节点3',
    parentId: 'child1',
    properties: {},
    // sortValue: 3,
    _type: 'hazeBlue',
  },
]

export const AddNodeConfigCode = {
  ABILITY: 'ability',
  EQUIP: 'equip',
  DEFAULT: 'default',
}
export const AddNodeConfig = {
  [AddNodeConfigCode.ABILITY]: {
    matchCode: {
      id: 'abilityId',
      name: 'abilityName',
      parentId: 'parentId',
      sortValue: 'sortValue',
      _type: '_type',
    },
    template: {
      abilityId: '',
      abilityName: '活动',
      abilityCode: '',
      remark: '',
      parentId: '',
      _type: '',
      sortValue: '',
    },
    nodeLabel: '活动',
    tag: '活动tag',
    _type: 'orange',
  },
  [AddNodeConfigCode.EQUIP]: {
    matchCode: {
      id: 'equipId',
      name: 'equipName',
      parentId: 'parentId',
      sortValue: 'sortValue',
      _type: '_type',
    },
    template: {
      equipId: '',
      equipCode: '',
      equipName: '装备',
      equipType: '',
      remark: '',
      parentId: '',
      _type: '',
      sortValue: '',
    },
    nodeLabel: '装备',
    // tag: '任务',
    _type: 'green',
  },
  [AddNodeConfigCode.DEFAULT]: {
    matchCode: {
      id: 'id',
      name: 'name',
      tag: 'tag',
      parentId: 'parentId',
      sortValue: 'sortValue',
      _type: '_type',
    },
    template: {
      id: '',
      name: '',
      tag: '',
      parentId: '',
      sortValue: '',
      _type: '',
    },
    nodeLabel: '节点',
    tag: '',
    _type: 'default',
  },
}
