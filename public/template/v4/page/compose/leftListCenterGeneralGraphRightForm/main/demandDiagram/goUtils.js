import * as go from 'gojs'

export function isString(str) {
  return Object.prototype.toString.call(str) === '[object String]'
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
export function isMap(obj) {
  return isObject(obj) && obj instanceof Map
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
