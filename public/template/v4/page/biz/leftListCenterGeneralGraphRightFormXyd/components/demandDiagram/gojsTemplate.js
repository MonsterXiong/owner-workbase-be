import * as go from 'gojs'
const $ = go.GraphObject.make

const nodeTemplate = function (option) {
  return $(
    go.Node,
    'Auto',
    {
      deletable: false,
      locationSpot: go.Spot.Center,
    },
    new go.Binding('text', 'text'),
    new go.Binding('location', 'loc', function (value) {
      return go.Point.parse(value)
    }).makeTwoWay(function (value) {
      return go.Point.stringify(value)
    }),
    $(
      go.Shape,
      'Ellipse',
      {
        fill: option?.fill ?? 'transparent',
        stroke: '#027db4',
        strokeWidth: 1,
        width: 220,
        stretch: go.GraphObject.Fill,
        alignment: go.Spot.Center,
      },
      // new go.Binding(bindingKey.STROKE, bindingValueKey.LINECOLOR),
    ),
    $(
      go.TextBlock,
      {
        font: '700 18px Droid Serif, sans-serif',
        textAlign: 'center',
        // margin: 10,
        width: 150,
        stroke: '#027db4',
      },
      new go.Binding('text', 'text')
    )
  )
}

const linkTemplate = function () {
  return $(
    go.Link, // the whole link panel
    {
      routing: go.Link.Orthogonal,
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
    $(go.Shape, {
      strokeWidth: 1.5,
      stroke: '#7f7f7f',
    }),
    $(
      go.Shape, // the arrowhead
      { toArrow: 'OpenTriangle', fill: null }
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

export { nodeTemplate, linkTemplate }
