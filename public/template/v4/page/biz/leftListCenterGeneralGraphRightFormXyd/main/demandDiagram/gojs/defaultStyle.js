import { eobjectShapeType } from './diagramHelper'

const defaultSize = '220 60'

export const defaultStyle = Object.freeze({
  [eobjectShapeType.GRAPH_ELLIPSE]: {
    size: defaultSize,
  },
  [eobjectShapeType.GRAPH_DIAMOND]: {
    size: '200 80',
  },
  [eobjectShapeType.GRAPH_ROUNDEDRECTANGLE]: {
    size: defaultSize,
  },
  [eobjectShapeType.GRAPH_CIRCLE]: {
    size: '60 60',
    text: '456',
    lineColor: 'black',
    fillColor: 'black',
    textVisible: false,
  },
  [eobjectShapeType.GRAPH_Ring]: {
    size: '60 60',
    text: '123',
    lineColor: '#333333',
    strokeWidth: 10,
    textVisible: false,
  },
})
