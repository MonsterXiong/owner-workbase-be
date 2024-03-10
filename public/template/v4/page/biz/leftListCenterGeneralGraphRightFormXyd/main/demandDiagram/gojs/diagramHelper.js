// import { defaultStyle } from './defaultStyle'
import * as go from 'gojs'

// 绘图模型的eobjectShape
export const eobjectShapeType = {
  GRAPH_ELLIPSE: 'graph_ellipse', // 椭圆
  GRAPH_ROUNDEDRECTANGLE: 'graph_roundedrectangle', // 圆角矩形
  GRAPH_DIAMOND: 'graph_diamond', // 菱形（逻辑判断）
  GRAPH_CIRCLE: 'graph_circle', // 开始节点
  GRAPH_Ring: 'graph_ring', // 结束节点
  GRAPH_LINE: 'graph_line', // 线
}

export function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]'
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export function isMap(obj) {
  return isObject(obj) && obj instanceof Map
}
export function isLine(metaTool) {
  return metaTool?.eobjectShape?.startsWith(eobjectShapeType.GRAPH_LINE)
}

export function updateNodeOrLinkProperty(diagram, nodeOrLink, attr, value) {
  if (!nodeOrLink) return
  diagram.model.startTransaction('updateProperty')
  try {
    if (isMap(attr)) {
      attr.forEach((value, key) => {
        updateOne(key, value)
      })
    } else if (isObject(attr)) {
      Object.keys(attr).forEach((key) => updateOne(key, attr[key]))
    } else if (isString(attr)) {
      updateOne(attr, value)
    }
    diagram.model.commitTransaction('updateProperty')
  } catch (e) {
    console.error('更新属性失败', e)
    diagram.model.rollbackTransaction()
  }

  function updateOne(key, value) {
    if (nodeOrLink instanceof go.Node || nodeOrLink instanceof go.Link) {
      diagram.model.setDataProperty(nodeOrLink.data, key, value)
    } else if (nodeOrLink.each) {
      nodeOrLink.each((item) => {
        diagram.model.setDataProperty(item.data, key, value)
      })
    } else if (isObject(nodeOrLink)) {
      diagram.model.setDataProperty(nodeOrLink, key, value)
    }
  }
}

/**
 * 根据 eobjectShape 得到 figure
 * @param {string} eobjectShape
 * @returns figure
 */
export function getFigure(eobjectShape) {
  const map = new Map()
  map.set(eobjectShapeType.GRAPH_ELLIPSE, 'Ellipse')
  map.set(eobjectShapeType.GRAPH_ROUNDEDRECTANGLE, 'RoundedRectangle')
  map.set(eobjectShapeType.GRAPH_DIAMOND, 'Diamond')
  map.set(eobjectShapeType.GRAPH_CIRCLE, 'Circle')
  map.set(eobjectShapeType.GRAPH_Ring, 'Ring')
  let figure = eobjectShape.replace('graph_', '')
  if (map.has(eobjectShape)) {
    return map.get(eobjectShape)
  }
  return figure
}

export function getFontSize(fontStr) {
  if (!fontStr) {
    return 12
  }
  const reg = /(\d*)px.*/
  const match = fontStr.match(reg)
  if (match && match[1]) {
    return match[1]
  }
  return 12
}
