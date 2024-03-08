// 单位都是pt!
export const DefaultfontSizeList = Object.freeze([
  {
    label: '小五',
    value: 9.0,
  },
  {
    label: '五号',
    value: 10.5,
  },
  {
    label: '小四',
    value: 12,
  },
  {
    label: '四号',
    value: 14,
  },
  {
    label: '小三',
    value: 15,
  },
  {
    label: '三号',
    value: 16,
  },
  {
    label: '小二',
    value: 18,
  },
  {
    label: '二号',
    value: 22,
  },
])

export const DefaultFontFamilyList = Object.freeze([
  {
    label: '宋体',
    value: '宋体',
  },
  {
    label: '黑体',
    value: '黑体',
  },
])

export const DefaultFontWeightList = Object.freeze([
  {
    label: '正常',
    value: '400',
  },
  {
    label: '加粗',
    value: 'bold',
  },
])
export const DefaultTextAlignList = Object.freeze([
  {
    label: '左对齐',
    value: 'left',
  },
  {
    label: '右对齐',
    value: 'right',
  },
  {
    label: '居中',
    value: 'center',
  },
  {
    label: '两端对齐',
    value: 'justify',
  },
])
export const DefaultTableTextAlignList = Object.freeze([
  {
    label: '单元格左对齐',
    value: 'flex-start',
    _value: 'left',
  },
  {
    label: '单元格右对齐',
    value: 'flex-end',
    _value: 'right',
  },
  {
    label: '单元格居中',
    value: 'center',
    _value: 'center',
  },
])
export const getStyleByLabel = (label) => {
  const list = [...DefaultfontSizeList, ...DefaultFontFamilyList, ...DefaultFontWeightList, ...DefaultTextAlignList, ...DefaultTableTextAlignList]
  return list.find((item) => item.label === label)?.value
}

// 标题的初始样式
export const DefaultWordHeadlineStyle = Object.freeze({
  fontSize: getStyleByLabel('四号'),
  fontFamily: getStyleByLabel('黑体'),
  textAlign: getStyleByLabel('左对齐'),
  fontWeight: getStyleByLabel('加粗'),
  textIndent: 0,
})

// 段落的初始样式
export const DefaultWordTextStyle = Object.freeze({
  fontSize: getStyleByLabel('五号'),
  fontFamily: getStyleByLabel('宋体'),
  textAlign: getStyleByLabel('左对齐'),
  textIndent: 2, // 默认首行缩进两个字符
})

// 图片的初始样式
export const DefaultWordImgStyle = Object.freeze({
  fontSize: getStyleByLabel('五号'),
  fontFamily: getStyleByLabel('宋体'),
  textAlign: getStyleByLabel('居中'),
})

// 表格头的初始样式
export const DefaultTableHeaderStyle = Object.freeze({
  fontSize: getStyleByLabel('五号'),
  fontFamily: getStyleByLabel('宋体'),
  fontWeight: getStyleByLabel('加粗'),
  textAlign: getStyleByLabel('居中'),
  justifyContent: getStyleByLabel('单元格居中'),
})

// 表格内容的初始样式
export const DefaultTableContentStyle = Object.freeze({
  fontSize: getStyleByLabel('五号'),
  fontFamily: getStyleByLabel('宋体'),
  fontWeight: getStyleByLabel('正常'),
  textAlign: getStyleByLabel('左对齐'),
  justifyContent: getStyleByLabel('单元格左对齐'),
})

// 题注的初始样式
export const DefaultTitleStyle = Object.freeze({
  fontSize: getStyleByLabel('五号'),
  fontFamily: getStyleByLabel('黑体'),
  textAlign: getStyleByLabel('居中'),
})

// 对应后端的类型
export const ContentType = Object.freeze({
  text: 'text',
  img: 'img',
  table: 'table',
  head: 'head',
  equation: 'equation',
  postil: 'postil',
})

export const ContentTypeText = Object.freeze({
  [ContentType.head]: '标题',
  [ContentType.text]: '文字',
  [ContentType.img]: '图片',
  [ContentType.table]: '表格',
  [ContentType.equation]: '公式',
  [ContentType.postil]: '标注',
})

// 每一个段路的类型
export const WordContentType = Object.freeze({
  text: 'WordText',
  img: 'WordImg',
  table: 'WordTable',
  head: 'WordHeadLine', // 标题
  clazzTable: 'WordClazzTable',
  equation: 'WordEquation',
})

export const WordDefaultType = Object.freeze({
  text: DefaultWordTextStyle,
  img: DefaultWordImgStyle,
  table: {},
  head: DefaultWordHeadlineStyle,
  equation: {},
})

export const cm = (1 / ((1 / 72) * 25.4)) * 10 // 一厘米多少pt
export const a4Width = 21 * cm // A4张宽度 21厘米
export const a4Height = 29.7 * cm // A4纸高度 29.7厘米
export const a4WidthPadding = 3.18 * cm //  3.18厘米
export const a4HeightPadding = 2.54 * cm //  3.18厘米
export const a4InnerWidth = a4Width - 2 * a4WidthPadding
export const a4InnerHeight = a4Height - 2 * a4HeightPadding
