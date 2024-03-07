import * as go from 'gojs'
import Vue from 'vue'
import { typeColorConfig, typeImageConfig } from './typeConfig'
const $ = go.GraphObject.make

const treeGraphContextMenu = $(go.HTMLInfo, {
  show: (obj, diagram, tool) => {
    Vue.prototype.$emitter.emit('treeGraphContextmenuShow', {
      obj,
      diagram,
      tool,
    })
  },
  hide: () => {
    Vue.prototype.$emitter.emit('treeGraphContextmenuHide')
  },
})
export function nodeTemplate() {
  return $(
    go.Node,
    'Vertical',
    {
      selectionObjectName: 'shape',
      contextMenu: treeGraphContextMenu,
    },
    $(
      go.Panel,
      'Spot',
      $(
        go.Panel,
        'Auto',
        $(
          go.Shape,
          'RoundedRectangle',
          {
            name: 'shape',
            cursor: 'pointer',
            fill: 'transparent',
            // stroke: 'red',
            strokeWidth: 1,
          },
          new go.Binding('stroke', '', function (nodeData, targetObj) {
            const typeValue = nodeData._type || 'default'
            return typeColorConfig[typeValue].deep
          })
        ),
        $(
          go.TextBlock,
          {
            font: '14px sans-serif',
            // stroke: 'red',
            margin: new go.Margin(10),
            minSize: new go.Size(86, 0),
            maxSize: new go.Size(210, Infinity),
            textAlign: 'center',
            editable: false,
          },
          new go.Binding('text', 'name').makeTwoWay(),
          new go.Binding('stroke', '', function (nodeData, targetObj) {
            const typeValue = nodeData._type || 'default'
            return typeColorConfig[typeValue].deep
          })
        )
      )
    )
  )
}

export function linkTemplate() {
  return $(
    go.Link,
    { routing: go.Link.Orthogonal, corner: 5 },
    $(go.Shape, {
      toArrow: 'Standard',
      stroke: '#5a5a5a',
    })
  )
}
function textStyle(field) {
  return [
    {
      font: '14px Roboto, sans-serif',
      stroke: 'rgba(0, 0, 0, .60)',
      // visible: false, // only show textblocks when there is corresponding data for them
    },
    new go.Binding('stroke', 'isSelected', function (sel, targetObj) {
      const nodeData = targetObj.part.data
      const typeValue = nodeData._type || 'default'
      return sel ? typeColorConfig[typeValue].shallow : typeColorConfig[typeValue].deep
    }).ofObject(),
  ]
}
export function taskNodeTemplate(options) {
  return $(
    go.Node,
    'Spot',
    {
      portId: '',
      cursor: 'pointer',
      selectionObjectName: 'shape',
      fromLinkable: false,
      fromLinkableSelfNode: false,
      fromLinkableDuplicates: false,
      toLinkable: false,
      toLinkableSelfNode: false,
      toLinkableDuplicates: false,
      locationSpot: go.Spot.Center,
      contextMenu: treeGraphContextMenu,
      // desiredSize: new go.Size(150, 60),
      // maxSize: new go.Size(150, 60),
      selectionAdorned: true,
      // ...options,
    },
    $(
      go.Panel,
      'Auto',
      $(go.Shape, {
        stroke: 'transparent',
        fill: 'transparent',
      }),
      $(
        go.Panel,
        'Vertical',
        {
          name: 'shape',
          stretch: go.GraphObject.Fill,
          width: 208,
        },
        $(
          go.Panel,
          'Auto',
          {
            stretch: go.GraphObject.Horizontal,
          },
          $(
            go.Shape,
            'Rectangle',
            {
              fill: 'transparent',
              strokeWidth: 1,
              stroke: 'transparent',
            },
            new go.Binding('fill', '', function (nodeData) {
              const typeValue = nodeData._type || 'default'
              return typeColorConfig[typeValue].deep
            }),
            new go.Binding('stroke', '', function (nodeData, targetObj) {
              const typeValue = nodeData._type || 'default'
              return typeColorConfig[typeValue].deep
            })
          ),
          $(
            go.Panel,
            'Horizontal',
            {},
            $(
              go.Picture,
              {
                source: '',
                margin: new go.Margin(0, 4),
                width: 16,
                height: 16,
              },
              new go.Binding('source', '_type', function (value) {
                return value ? typeImageConfig[value] : ''
              })
            ),
            $(
              go.TextBlock,
              '',
              {
                text: '',
                margin: new go.Margin(5, 0),
                textAlign: 'center',
                isMultiline: true,
                stroke: '#fff',
                font: 'bold 16px sans-serif',
              },
              new go.Binding('text', 'tag', function (value) {
                return value || ''
              })
            )
          )
        ),
        $(
          go.Panel,
          'Auto',
          {
            stretch: go.GraphObject.Fill,
          },
          $(
            go.Shape,
            'Rectangle',
            {
              strokeWidth: 1,
            },
            new go.Binding('fill', 'isSelected', function (sel, targetObj) {
              const nodeData = targetObj.part.data
              const typeValue = nodeData._type || 'default'
              return sel ? typeColorConfig[typeValue].deep : typeColorConfig[typeValue].shallow
            }).ofObject(),
            new go.Binding('stroke', '_type', function (value, targetObj) {
              const typeValue = value || 'default'
              return typeColorConfig[value].deep
            }),
            new go.Binding('strokeDashArray', '', function (nodeData, targetObj) {
              const parentId = nodeData.data.parentId
              return parentId == '' ? [0, 0] : [8, 8]
            }).ofObject(),
            new go.Binding('visible', '', function (nodeData, targetObj) {
              const parentId = nodeData.data.parentId
              if (parentId) {
                let arr = options?.textList || []
                let flag = false
                // 当properties 都没有赋值数据时不显示
                arr.map((ele) => {
                  const properties = nodeData.data.properties
                  if (properties[ele.code]) {
                    flag = true
                  }
                })
                return flag
              } else return true
            }).ofObject()
          ),
          $(
            go.Panel,
            'Vertical',
            {
              name: 'INFO', // identify to the PanelExpanderButton
              stretch: go.GraphObject.Horizontal,
              // margin: new go.Margin(12, 10),
              defaultAlignment: go.Spot.Left,
            },
            ...getTextBlock(options?.textList || []),
            new go.Binding('visible', '', function (nodeData, targetObj) {
              const parentId = nodeData.data.parentId
              return parentId == '' ? false : true
            }).ofObject()
          ),
          $(
            go.TextBlock,
            {
              font: 'bold 14px sans-serif',
              stroke: '#333',
              margin: new go.Margin(14, 10),
              isMultiline: true,
              maxLines: 2,
              editable: false,
              textAlign: 'center',
            },
            new go.Binding('text', 'name').makeTwoWay(),
            new go.Binding('stroke', 'isSelected', function (sel, targetObj) {
              const nodeData = targetObj.part.data
              const typeValue = nodeData._type || 'default'
              return sel ? typeColorConfig[typeValue].shallow : typeColorConfig[typeValue].deep
            }).ofObject(),
            new go.Binding('visible', '', function (nodeData, targetObj) {
              const parentId = nodeData.data.parentId
              return parentId == '' ? true : false
            }).ofObject()
          )
        )
      )
    ),

    $(
      'TreeExpanderButton',
      {
        alignment: options?.angle != 90 ? go.Spot.Right : go.Spot.Bottom,
        alignmentFocus: options?.angle != 90 ? go.Spot.Right : go.Spot.Bottom,
      },
      new go.Binding('alignment', 'angle', function (value) {
        return value != 90 ? go.Spot.Right : go.Spot.Bottom
      }),
      new go.Binding('alignmentFocus', 'angle', function (value) {
        return value != 90 ? go.Spot.Right : go.Spot.Bottom
      })
    )
  )
}

function getTextBlock(array) {
  let res = array.map((ele) => {
    return $(
      go.TextBlock,
      textStyle(ele.code),
      new go.Binding('margin', '', () => new go.Margin(3, 5)),
      new go.Binding('text', '', (code, targetObj) => {
        const properties = targetObj.part.data.properties
        return ele.title + ': ' + (properties[ele.code] || '')
      }),
      new go.Binding('visible', '', (code, targetObj) => {
        const properties = targetObj.part.data.properties
        return properties[ele.code] ? true : false
      })
    )
  })
  return res
}
