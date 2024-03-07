const typeColorConfig = {
  red: { deep: '#b3172a', shallow: '#fff5f6' },
  orange: { deep: '#cd6214', shallow: '#fff8f3' },
  yellow: { deep: '#cdb114', shallow: '#fffdf4' },
  amaranth: { deep: '#a7237b', shallow: '#fcf4f9' },
  green: { deep: '#158245', shallow: '#f5fff9' },
  blueGreen: { deep: '#098a9d', shallow: '#eefafc' },
  hazeBlue: { deep: '#4962a6', shallow: '#f4f7ff' },
  default: { deep: '#1485cd', shallow: '#f2faff' },
}

const typeImageConfig = {
  red: 'static/treeSvgIcon/equip.svg',
  orange: 'static/treeSvgIcon/organization.svg',
  yellow: 'static/treeSvgIcon/organization.svg',
  pink: 'static/treeSvgIcon/ability.svg',
  green: 'static/treeSvgIcon/function.svg',
  blueGreen: 'static/treeSvgIcon/index.svg',
  hazeBlue: 'static/treeSvgIcon/structure.svg',
  default: 'static/treeSvgIcon/engineering.svg',
  project: 'static/treeSvgIcon/project.svg',
}
export const layouts = [
  {
    iconName: 'icon-zuzhijiagou',
    value: 0,
    code: 'right',
    rotate: 270,
  },
  {
    iconName: 'icon-zuzhijiagou',
    value: 90,
    code: 'down',
    rotate: 0,
  },
  {
    iconName: 'icon-zuzhijiagou',
    value: 180,
    code: 'left',
    rotate: 90,
  },
]
export const DefaultAddNodeConfig = {
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
}
export { typeColorConfig, typeImageConfig }
