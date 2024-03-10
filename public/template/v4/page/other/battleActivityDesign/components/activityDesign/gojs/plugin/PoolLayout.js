import * as go from 'gojs'

const MINLENGTH = 160 // this controls the minimum length of any swimlane
const MINBREADTH = 20 // this controls the minimum breadth of any non-collapsed swimlane

class PoolLayout extends go.GridLayout {
  constructor() {
    super()
    this.cellSize = new go.Size(1, 1)
    this.wrappingColumn = Infinity
    this.wrappingWidth = Infinity
    this.isRealtime = false // don't continuously layout while dragging
    this.alignment = go.GridLayout.Position
    // This sorts based on the location of each Group.
    // This is useful when Groups can be moved up and down in order to change their order.
    this.comparer = (a, b) => {
      const ax = a.location.x
      const bx = b.location.x
      if (isNaN(ax) || isNaN(bx)) return 0
      if (ax < bx) return -1
      if (ax > bx) return 1
      return 0
    }
    this.boundsComputation = (part, layout, rect) => {
      part.getDocumentBounds(rect)
      rect.inflate(-1, -1) // negative strokeWidth of the border Shape
      return rect
    }
  }

  doLayout(coll) {
    const diagram = this.diagram
    if (diagram === null) return
    diagram.startTransaction('PoolLayout')
    const pool = this.group
    if (pool !== null && pool.category === 'Pool') {
      // make sure all of the Group Shapes are big enough
      const minsize = computeMinPoolSize(pool)
      pool.memberParts.each((lane) => {
        if (!(lane instanceof go.Group)) return
        if (lane.category !== 'Pool') {
          const shape = lane.resizeObject
          if (shape !== null) {
            // change the desiredSize to be big enough in both directions
            const sz = computeLaneSize(lane)
            shape.width = !isNaN(shape.width)
              ? Math.max(shape.width, sz.width)
              : sz.width
            shape.height = isNaN(shape.height)
              ? minsize.height
              : Math.max(shape.height, minsize.height)
            const cell = lane.resizeCellSize
            if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0)
              shape.width = Math.ceil(shape.width / cell.width) * cell.width
            if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0)
              shape.height = Math.ceil(shape.height / cell.height) * cell.height
          }
        }
      })
    }
    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
    super.doLayout(coll)
    diagram.commitTransaction('PoolLayout')
  }
}

class HorizontalPoolLayout extends go.GridLayout {
  constructor() {
    super();
    this.cellSize = new go.Size(1, 1);
    this.wrappingColumn = 1;
    this.wrappingWidth = Infinity;
    this.isRealtime = false;  // don't continuously layout while dragging
    this.alignment = go.GridLayout.Position;
    // This sorts based on the location of each Group.
    // This is useful when Groups can be moved up and down in order to change their order.
    this.comparer = (a, b) => {
      const ay = a.location.y;
      const by = b.location.y;
      if (isNaN(ay) || isNaN(by)) return 0;
      if (ay < by) return -1;
      if (ay > by) return 1;
      return 0;
    };
    this.boundsComputation = (part, layout, rect) => {
      part.getDocumentBounds(rect);
      rect.inflate(-1, -1);  // negative strokeWidth of the border Shape
      return rect;
    }
  }

  doLayout(coll) {
    const diagram = this.diagram;
    if (diagram === null) return;
    diagram.startTransaction("PoolLayout");
    const pool = this.group;
    if (pool !== null && pool.category === "Pool") {
      // make sure all of the Group Shapes are big enough
      const minsize = computeMinPoolSize(pool);
      pool.memberParts.each(lane => {
        if (!(lane instanceof go.Group)) return;
        if (lane.category !== "Pool") {
          const shape = lane.resizeObject;
          if (shape !== null) {  // change the desiredSize to be big enough in both directions
            const sz = computeLaneSize(lane);
            shape.width = (isNaN(shape.width) ? minsize.width : Math.max(shape.width, minsize.width));
            shape.height = (!isNaN(shape.height)) ? Math.max(shape.height, sz.height) : sz.height;
            const cell = lane.resizeCellSize;
            if (!isNaN(shape.width) && !isNaN(cell.width) && cell.width > 0) shape.width = Math.ceil(shape.width / cell.width) * cell.width;
            if (!isNaN(shape.height) && !isNaN(cell.height) && cell.height > 0) shape.height = Math.ceil(shape.height / cell.height) * cell.height;
          }
        }
      });
    }
    // now do all of the usual stuff, according to whatever properties have been set on this GridLayout
    super.doLayout(coll);
    diagram.commitTransaction("PoolLayout");
  }
}

function computeMinPoolSize(pool) {
  // assert(pool instanceof go.Group && pool.category === "Pool");
  let len = MINLENGTH
  pool.memberParts.each((lane) => {
    // pools ought to only contain lanes, not plain Nodes
    if (!(lane instanceof go.Group)) return
    const holder = lane.placeholder
    if (holder !== null) {
      len = Math.max(len, holder.actualBounds.height)
    }
  })
  return new go.Size(NaN, len)
}
function computeMinLaneSize(lane) {
  if (!lane.isSubGraphExpanded) return new go.Size(1, MINLENGTH)
  return new go.Size(MINBREADTH, MINLENGTH)
}

function computeLaneSize(lane) {
  // assert(lane instanceof go.Group && lane.category !== "Pool");
  const sz = computeMinLaneSize(lane)
  if (lane.isSubGraphExpanded) {
    const holder = lane.placeholder
    if (holder !== null) {
      const hsz = holder.actualBounds
      sz.width = Math.ceil(Math.max(sz.width, hsz.width))
    }
  }
  // minimum breadth needs to be big enough to hold the header
  const hdr = lane.findObject('HEADER')
  if (hdr !== null)
    sz.width = Math.ceil(
      Math.max(
        sz.width,
        hdr.actualBounds.width + hdr.margin.left + hdr.margin.right
      )
    )
  return sz
}

function relayoutDiagram(diagram) {
  diagram.layout.invalidateLayout()
  diagram.findTopLevelGroups().each((g) => {
    if (g.category === 'Pool') g.layout.invalidateLayout()
  })
  diagram.layoutDiagram()
}

class LaneResizingTool extends go.ResizingTool {
  isLengthening() {
    return this.handle.alignment === (this.diagram.model.modelData.__layout === 'vertical' ? go.Spot.Bottom : go.Spot.Right)
  }

  computeMinPoolSize() {
    const lane = this.adornedObject.part
    // assert(lane instanceof go.Group && lane.category !== "Pool");
    const msz = computeMinLaneSize(lane) // get the absolute minimum size
    if (this.isLengthening()) {
      // compute the minimum length of all lanes
      const sz = computeMinPoolSize(lane.containingGroup)
      msz.height = Math.max(msz.height, sz.height)
    } else {
      // find the minimum size of this single lane
      const sz = computeLaneSize(lane)
      msz.width = Math.max(msz.width, sz.width)
      msz.height = Math.max(msz.height, sz.height)
    }
    return msz
  }

  resize(newr) {
    const lane = this.adornedObject.part
    if (this.isLengthening()) {
      // changing the length of all of the lanes
      const containingGroup = lane.containingGroup
      let brotherGroups = null
      if (containingGroup) {
        brotherGroups = containingGroup.memberParts
      } else {
        brotherGroups = this.diagram.findTopLevelGroups()
      }
      brotherGroups.each((lane) => {
        if (!(lane instanceof go.Group)) return
        const shape = lane.resizeObject
        if (shape !== null) {
          // set its desiredSize length, but leave each breadth alone
          if (this.diagram.model.modelData.__layout == 'vertical') {
            shape.height = newr.height
          } else {
            shape.width = newr.width
          }
        }
      })
    } else {
      // changing the breadth of a single lane
      super.resize(newr)
    }
    relayoutDiagram(this.diagram) // now that the lane has changed size, layout the pool again
  }
}

export { MINLENGTH, PoolLayout, HorizontalPoolLayout, LaneResizingTool }
