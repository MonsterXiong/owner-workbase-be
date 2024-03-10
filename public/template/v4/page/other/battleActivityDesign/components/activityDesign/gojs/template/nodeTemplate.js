import * as go from 'gojs'
const $ = go.GraphObject.make

import { baseConfig } from '../../config'

const defaultNodeTemplateMaker = (finallyConfig) => {
  console.log("finallyConfig", finallyConfig)
  return $(
    go.Node,
    'Auto',
    {
      locationSpot: go.Spot.Center,
      copyable: false,
      desiredSize: new go.Size(120, 40),
      // background: 'transparent'
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    $(go.Shape, 'RoundedRectangle', {
      name: 'SHAPE',
      portId: '',
      cursor: 'pointer',
      fromLinkable: true,
      toLinkable: true,
      strokeWidth: 2,
      stroke: '#898888',
      fill: 'white',
    }),
    $(go.TextBlock, { margin: new go.Margin(8, 20), editable: false }, new go.Binding('text', finallyConfig.activityTextKey))
  )
}

export { defaultNodeTemplateMaker }
