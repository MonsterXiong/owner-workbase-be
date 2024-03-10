export class Draggable {
  constructor() {
    this.headerEl = null
    this.dragDom = null
    this.minDragDomLeft = 0
    this.minDragDomTop = 0
    this.maxDragDomLeft = 0
    this.maxDragDomTop = 0
    this.disX = 0
    this.disY = 0
    this.styL = 0
    this.styT = 0
  }
  // 获取dom元素
  handleDom(headClass, domClass) {
    this.headerEl = document.querySelector(`.${headClass}`)
    this.dragDom = document.querySelector(`.${domClass}`)
  }
  // 鼠标按下，计算当前元素距离可视区的距离
  handlemousedown(e) {
    this.disX = e.clientX - this.headerEl.offsetLeft
    this.disY = e.clientY - this.headerEl.offsetTop

    const dragDomWidth = this.dragDom.offsetWidth
    const dragDomHeight = this.dragDom.offsetHeight

    const screenWidth = document.body.clientWidth
    const screenHeight = document.body.clientHeight

    this.minDragDomLeft = this.dragDom.offsetLeft
    this.maxDragDomLeft = screenWidth - this.dragDom.offsetLeft - dragDomWidth

    this.minDragDomTop = this.dragDom.offsetTop
    this.maxDragDomTop = screenHeight - this.dragDom.offsetTop - dragDomHeight

    // 获取到的值带px 正则匹配替换
    this.styL = _getStyle(this.dragDom, 'left')
    console.log(this.styL);
    this.styT = _getStyle(this.dragDom, 'top')

    if (this.styL.includes('%')) {
      let regex = new RegExp('\\%', 'g') ///\%/g
      this.styL = +document.body.clientWidth * (+this.styL.replace(regex, '') / 100)
      this.styT = +document.body.clientHeight * (+this.styT.replace(regex, '') / 100)
    } else {
      this.styL = +this.styL.replace(/\px/g, '')
      this.styT = +this.styT.replace(/\px/g, '')
    }
    console.log(
      this.headerEl,
      this.dragDom,
      this.minDragDomLeft,
      this.minDragDomTop,
      this.maxDragDomLeft,
      this.maxDragDomTop,
      this.disX,
      this.disY,
      this.styL,
      this.styT, 'handlemousedown------------');
  }
  handleMousemove(e) {
    if (!this.dragDom) return
    // 通过事件委托，计算移动的距离
    let left = e.clientX - this.disX
    let top = e.clientY - this.disY

    // 边界处理
    if (-left > this.minDragDomLeft) {
      left = -this.minDragDomLeft
    } else if (left > this.maxDragDomLeft) {
      left = this.maxDragDomLeft
    }

    if (-top > this.minDragDomTop) {
      top = -this.minDragDomTop
    } else if (top > this.maxDragDomTop) {
      top = this.maxDragDomTop
    }

    // 移动当前元素
    this.dragDom.style.cssText += `;left:${left + this.styL}px;top:${top + this.styT}px;`
  }
}

// 获取原有属性 ie dom元素.currentStyle 火狐谷歌 window.getComputedStyle(dom元素, null)
function _getStyle() {
  if (window.document.currentStyle) {
    return (dom, attr) => dom.currentStyle[attr]
  } else {
    return (dom, attr) => getComputedStyle(dom, false)[attr]
  }
}
