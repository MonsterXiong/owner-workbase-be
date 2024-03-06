export function findUpOrDownNode(diagram, node, step = -1) {
  let result = null
  const sortValue = node.data.sortValue
  if (sortValue && node.data.parentId) {
    const apank = sortValue
    const parentNode = diagram.findNodeForKey(node.data.parentId)
    const sameLevelNodeItea = parentNode.findTreeChildrenNodes()
    let sameLevelNodes = []
    sameLevelNodeItea.each((node) => {
      sameLevelNodes.push(node)
    })
    sameLevelNodes.sort(function (a, b) {
      const da = a.data
      const db = b.data
      if (da.sortValue && db.sortValue) {
        const apank = da.sortValue
        const bpank = db.sortValue
        return parseInt(apank) - parseInt(bpank) > 0 ? 1 : -1
      }
    })
    if (sameLevelNodes.count < 2) {
      console.warn('没有找到上一个节点,因为该节点没有兄弟节点')
      return null
    }
    if (sameLevelNodes.length > 1) {
      for (let i = 0; i < sameLevelNodes.length; i++) {
        let node = sameLevelNodes[i]
        if (node.data.sortValue) {
          const pank = node.data.sortValue
          if (pank == apank) {
            if ((step === -1 && i === 0) || (step === 1 && i === sameLevelNodes.length)) {
              break
            }
            result = sameLevelNodes[i + step]
            break
          }
        }
      }
    }
  }
  return result
}

export function exchangeNodeValue(diagram, source, target, key) {
  const sourceValue = source[key]
  const targetValue = target[key]
  diagram.model.setDataProperty(source, key, targetValue)
  diagram.model.setDataProperty(target, key, sourceValue)
  diagram.layout.doLayout(diagram)
}

export function changeLayoutAngle(diagram, layoutItem) {
  diagram.layout.angle = parseInt(layoutItem.value)
  diagram.angleLayout = layoutItem
  diagram.nodes.each((node) => {
    diagram.model.setDataProperty(node.data, 'angle', layoutItem.value)
  })
}
