import * as go from 'gojs'
const $ = go.GraphObject.make
import { PoolLayout, HorizontalPoolLayout, MINLENGTH } from '../plugin/PoolLayout.js'

const MINHEIGHT = 450
const minHeight = MINHEIGHT

const poolTemplateMaker = (isVertical = true) => {
  return $(
    go.Group,
    isVertical ? 'Vertical' : 'Horizontal',
    groupStyle(minHeight, isVertical),
    {
      contextMenu: $(
        'ContextMenu',
        {},
        $(
          'ContextMenuButton',
          $(go.TextBlock, '删除泳道', {
            alignment: go.Spot.Center,
            margin: new go.Margin(5, 10, 5, 10),
            font: '14px sans-serif',
            // strokeWidth: 2,
            stroke: '#404040',
          }),
          {
            click: () => {},
          }
        )
      ),
      selectionObjectName: 'SHAPE', // selecting a lane causes the body of the lane to be highlit, not the label
      resizable: true,
      resizeObjectName: 'SHAPE', // the custom resizeAdornmentTemplate only permits two kinds of resizing
      // layout: $(
      //   go.LayeredDigraphLayout, // automatically lay out the lane's subgraph
      //   {
      //     isInitial: false, // don't even do initial layout
      //     isOngoing: false, // don't invalidate layout when nodes or links are added or removed
      //     direction: 0,
      //     columnSpacing: 10,
      //     layeringOption: go.LayeredDigraphLayout.LayerLongestPathSource,
      //   }
      // ),
      computesBoundsAfterDrag: true, // needed to prevent recomputing Group.placeholder bounds too soon
      computesBoundsIncludingLinks: false, // to reduce occurrences of links going briefly outside the lane
      computesBoundsIncludingLocation: true, // to support empty space at top-left corner of lane
      handlesDragDropForMembers: true, // don't need to define handlers on member Nodes and Links
      memberValidation(thisGroup, part) {
        return false
      },
      mouseDrop: (e, grp) => {
        console.log('mouseDropmouseDrop')
        if (e.shift) {
          e.diagram.currentTool.doCancel()
          return
        } // cannot change groups with an unmodified drag-and-drop
        if (e.diagram.selection.all((n) => !!n.data.group && n.data.key !== 'Start' && n.data.key !== 'End') || e.diagram.selection.size > 1) {
          return
        }
        // cannot change groups with an unmodified drag-and-drop
        if (!e.diagram.selection.any((n) => n instanceof go.Group)) {
          const node = grp.diagram.selection.first()
          if (node.data.key === 'Start' || node.data.key === 'End') {
            grp.addMembers(grp.diagram.selection, false)
          } else {
            console.log('?????')
            const ok = grp.addMembers(grp.diagram.selection, true)
            if (ok) {
              updateCrossLaneLinks(grp)
            } else {
              grp.diagram.currentTool.doCancel()
            }
          }
        } else {
          e.diagram.currentTool.doCancel()
        }
      },
    },
    // the lane header consisting of a Shape and a TextBlock
    $(
      go.Panel,
      'Auto',
      {
        stretch: go.GraphObject.Horizontal,
        angle: isVertical ? 0 : 270, // maybe rotate the header to read sideways going up
        alignment: go.Spot.Center,
        background: 'red',
      },
      $(
        go.Shape,
        'Rectangle', // 头部边框
        {
          stretch: go.GraphObject.Horizontal,
          minSize: isVertical ? new go.Size(MINLENGTH, NaN) : new go.Size(MINLENGTH, NaN),
          fill: 'white',
          margin: new go.Margin(0, 0, -1, 0),
        }
      ),
      $(
        go.Panel,
        'Horizontal',
        $(
          go.TextBlock, // the lane label
          {
            name: 'HEADER',
            font: 'bold 13pt sans-serif',
            editable: true,
            margin: new go.Margin(5, 20),
          },
          new go.Binding('text', 'nodeName').makeTwoWay()
        )
      )
    ), // end Horizontal Panel
    $(
      go.Panel,
      'Auto', // the lane consisting of a background Shape and a Placeholder representing the subgraph
      $(
        go.Shape,
        'Rectangle', // this is the resized object
        {
          name: 'SHAPE',
          minSize: isVertical ? new go.Size(MINLENGTH, minHeight) : new go.Size(minHeight, MINLENGTH),
          // fill: 'white',
        },
        // new go.Binding('fill', 'color'),
        new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
        new go.Binding('fill', '', function (item) {
          // if (item.isHighlighted) {
          //   return '#78d1f3'
          // } else return getPoolColor(item.data.code)
          return item.isHighlighted ? '#cde6f9' : 'white'
          // : item.isShadowed
          // ? 'white'
          // : getPoolColor(item.key)
        }).ofObject()
      ),
      $(go.Placeholder, {
        minSize: isVertical ? new go.Size(MINLENGTH, minHeight) : new go.Size(minHeight, MINLENGTH),
        padding: 12,
        alignment: go.Spot.TopLeft,
      })
    ) // end Auto Panel
  )
}

const poolHorizontalTemplateMaker = () => {
  return poolTemplateMaker(false)
}

const outtestTemplateMaker = (isVertical = true) => {
  return $(
    go.Group,
    'Auto',
    groupStyle(minHeight),
    {
      layout: isVertical ? $(PoolLayout, { spacing: new go.Size(0, 0) }) : $(HorizontalPoolLayout, { spacing: new go.Size(0, 0) }), // no space between lanes
    },
    $(go.Panel, 'Table', { defaultRowSeparatorStroke: 'red' }, $(go.Placeholder, { row: 1 }))
  )
}

const outtestHorizontalTemplateMaker = () => {
  return outtestTemplateMaker(false)
}

const groupResizeAdornmentTemplateMaker = () => {
  return $(
    go.Adornment,
    'Spot',
    $(go.Placeholder),
    $(
      go.Shape, // for changing the length of a lane
      {
        alignment: go.Spot.Bottom,
        desiredSize: new go.Size(50, 7),
        fill: 'lightblue',
        stroke: 'dodgerblue',
        cursor: 'row-resize',
      }
    ),
    $(
      go.Shape, // for changing the breadth of a lane
      {
        alignment: go.Spot.Right,
        desiredSize: new go.Size(7, 50),
        fill: 'lightblue',
        stroke: 'dodgerblue',
        cursor: 'col-resize',
      }
    )
  )
}

function groupStyle(minHeight = MINHEIGHT, isVertical = true) {
  // common settings for both Lane and Pool Groups
  return [
    {
      layerName: 'Background', // all pools and lanes are always behind all nodes and links
      background: 'transparent', // can grab anywhere in bounds
      movable: false, // allows users to re-order by dragging
      copyable: false, // can't copy lanes or pools
      avoidable: false, // don't impede AvoidsNodes routed Links
      deletable: true, //允许删除泳道
      minLocation: new go.Point(-Infinity, NaN), // only allow horizontal movement
      maxLocation: new go.Point(Infinity, NaN),
      minSize: isVertical ? new go.Size(MINLENGTH, minHeight) : new go.Size(70, 70),
    },
    new go.Binding('location', 'loc', go.Point.parse).makeTwoWay(go.Point.stringify),
    new go.Binding('desiredSize', 'size', go.Size.parse).makeTwoWay(go.Size.stringify),
  ]
}

function updateCrossLaneLinks(group) {
  group.findExternalLinksConnected().each((l) => {
    l.visible = l.fromNode.isVisible() && l.toNode.isVisible()
  })
}

export { poolTemplateMaker, poolHorizontalTemplateMaker, outtestTemplateMaker, outtestHorizontalTemplateMaker, groupResizeAdornmentTemplateMaker }
