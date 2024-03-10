import { getFontSize } from './diagramHelper'

import * as go from 'gojs'
const $ = go.GraphObject.make

const defaultNodeTemplateMaker = function (option) {
  return $(
    go.Node,
    'Auto',
    {
      deletable: true,
      locationSpot: go.Spot.Center,
      cursor: 'pointer',
      fromSpot: go.Spot.AllSides,
      toSpot: go.Spot.AllSides,
      fromLinkable: true,
      toLinkable: true,
    },
    new go.Binding('text', 'text'),
    new go.Binding('location', 'loc', function (value) {
      return go.Point.parse(value)
    }).makeTwoWay(function (value) {
      return go.Point.stringify(value)
    }),
    $(
      go.Shape,
      'Circle',
      {
        fill: option?.fill ?? 'transparent',
        stroke: '#027db4',
        figure: option?.figure ?? 'Ellipse',
        strokeWidth: 1,
        stretch: go.GraphObject.Fill,
        alignment: go.Spot.Center,
      },
      new go.Binding('figure'),
      new go.Binding('desiredSize', 'size', (size) => {
        // 给节点留出20px的连线触发区域
        // 取消双向绑定，防止数值过小时大小不正确
        const realSize = size
          .split(' ')
          .map((value) => Number(value) - 20)
          .join(' ')
        return go.Size.parse(realSize)
      }),
      new go.Binding('fill', 'fillColor'),
      new go.Binding('stroke', 'lineColor'),
      new go.Binding('strokeWidth', 'strokeWidth'),
    ),
    $(
      go.TextBlock,
      {
        font: '700 18px Droid Serif, sans-serif',
        textAlign: 'center',
        // margin: 10,
        // width: 150,
        stroke: '#027db4',
      },
      new go.Binding('width', 'size', function (size, param2) {
        // isTextVertical true(竖直)|false(水平)
        console.log(getFontSize(param2.font), 'getFontSize(param2.font)', Math.max(size.split(' ')[0] - 30, 30))
        if (param2.part.data.isTextVertical) {
          const fontSize = getFontSize(param2.font)
          return parseInt(fontSize)
        } else {
          return Math.max(size.split(' ')[0] - 30, 30)
        }
      }),
      new go.Binding('text', 'text'),
      new go.Binding('visible', 'textVisible').makeTwoWay(),
    )
  )
}

const defaultLinkTemplateMaker = function (option) {
  return $(
    go.Link, // the whole link panel
    {
      // routing: go.Link.Orthogonal,
      routing: go.Link.Normal,
      corner: 0,
      fromEndSegmentLength: 10,
      toEndSegmentLength: 10,
      relinkableFrom: true,
      relinkableTo: true,
      reshapable: true,
      resegmentable: true,
    },
    new go.Binding('fromSpot', 'fromSpot', function (value) {
      if (!value) {
        return go.Spot.None
      }
      if (Object.prototype.toString.call(value) === '[object Object]') {
        return value
      }
      return go.Spot.parse(value)
    }).makeTwoWay(go.Spot.stringify),
    new go.Binding('toSpot', 'toSpot', function (value) {
      if (!value) {
        return go.Spot.None
      }
      if (Object.prototype.toString.call(value) === '[object Object]') {
        return value
      }
      return go.Spot.parse(value)
    }).makeTwoWay(go.Spot.stringify),
    $(
      go.Shape,
      {
        strokeWidth: 1.5,
        stroke: '#7f7f7f',
      },
      new go.Binding('strokeDashArray', 'dash', function (strokeDashArray) {
        if (!strokeDashArray || strokeDashArray.length != 2) {
          return [0, 0]
        }
        return strokeDashArray
      })
    ),
    $(
      go.Shape, // the arrowhead
      {
        toArrow: 'OpenTriangle',
        fill: null,
      }
    ),
    $(
      go.TextBlock,
      {
        font: '400 9pt Source Sans Pro, sans-serif',
        segmentIndex: 0,
        segmentOffset: new go.Point(NaN, NaN),
        isMultiline: false,
        editable: true,
      },
      new go.Binding('text', 'text').makeTwoWay(), // TwoWay due to user editing with TextEditingTool
      new go.Binding('stroke', 'lineColor').makeTwoWay()
    )
  )
}

const temporaryLinkTemplate = function () {
  return $(
    go.Link,
    $(go.Shape, {
      stroke: 'dodgerblue',
      strokeWidth: 1,
      strokeDashArray: [6, 2],
    })
  )
}

export { defaultNodeTemplateMaker, defaultLinkTemplateMaker, temporaryLinkTemplate }
