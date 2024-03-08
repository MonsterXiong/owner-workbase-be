<template>
  <div class="word-table-box" @focus="onFocus">
    <!-- <WordTitle
      v-show="data?.isShowTitle"
      @click.stop="setCurrerntNode"
      class="MsoCaption"
      :titleText="`表 ${data?.sort} `"
      :nodeStyle="DefaultTitleStyle"
      @input="onInput"
      :readOnly="readOnly"
      :value="data?.title || ''"
    /> -->
    <WordTitle
      v-show="data?.isShowTitle"
      @click.stop="setCurrerntNode"
      class="MsoCaption"
      :nodeStyle="DefaultTitleStyle"
      @input="onInput"
      :readOnly="readOnly"
      :value="data?.title || ''"
    />
    <table @click.stop="onClick" class="WordTable MsoTableGrid" border="1" cellspacing="0" cellpadding="0" style="border-collapse: collapse; border: none">
      <thead>
        <tr style="height: 25pt">
          <td
            class="resizeable"
            v-for="(item, index) in headerData"
            :class="{ active: focusRowIndex === 0 && focusColIndex === index }"
            :key="item.id"
            :style="`width: ${item.width * cm}pt`"
            valign="top"
            style="vertical-align: middle; border: solid windowtext 1pt; mso-border-alt: solid windowtext 0.5pt; height: 25pt"
          >
            <WordText
              style="padding: 5.4pt; display: flex; align-items: center; line-height: initial; min-height: 25pt"
              :nodeStyle="item.style"
              :class="`table_header_${index}`"
              v-model="item.content"
              @inputFocus="inputFocus(0, index)"
              :readOnly="readOnly"
            />
          </td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rowIndex) in contentData" :key="row.id" style="height: 25pt">
          <td
            v-for="(col, colIndex) in row"
            :class="{ active: focusRowIndex === rowIndex + 1 && focusColIndex === colIndex && !readOnly }"
            :key="col.id"
            :style="`width: ${col.width}pt`"
            valign="top"
            style="vertical-align: middle; border: solid windowtext 1pt; mso-border-alt: solid windowtext 0.5pt; height: 25pt"
          >
            <WordText
              :style="wordTextStyle"
              :nodeStyle="col.style"
              :class="`table_${rowIndex + 1}_${colIndex}`"
              v-model="col.content"
              @inputFocus="inputFocus(rowIndex + 1, colIndex)"
              :readOnly="readOnly"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { uuid } from '@/utils/commonUtil'
import { DefaultTableHeaderStyle, DefaultTableContentStyle, DefaultTitleStyle, cm, a4InnerWidth } from '../constants'
import wordMixins from './wordMixins'
import WordText from './WordText'
import WordTitle from './WordTitle'

export default {
  components: { WordTitle, WordText },
  mixins: [wordMixins],
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    value: {
      handler(val) {
        if (Array.isArray(val)) {
          this.initTableData(val, false)
        }
      },
      immediate: true,
    },
  },
  data() {
    return {
      cm,
      a4InnerWidth,
      DefaultTableHeaderStyle,
      DefaultTableContentStyle,
      DefaultTitleStyle,
      wordTextStyle: 'padding: 5.4pt;display: flex;align-items: center;line-height: initial;min-height: 25pt',
      headerData: [],
      contentData: [], // 二维数组
      tableData: [],
      focusRowIndex: 1,
      focusColIndex: 0,
    }
  },
  methods: {
    setCurrerntNode() {
      this.$emit('setCurrerntNode', this.data, this)
    },
    initTableData(val, isChange = true) {
      this.tableData = [...val]
      this.headerData = []
      this.contentData = []
      let widthList = [] // 记录每一列的宽度
      val.forEach((arr, index) => {
        if (Array.isArray(arr) && arr.length > 0) {
          // 第一行为表格头
          if (index === 0) {
            this.headerData = arr.map((item) => {
              this.$set(item, 'width', item?.width || a4InnerWidth / arr.length / cm)
              widthList.push(item.width)
              return item
            })
          } else {
            this.contentData.push(
              arr.map((item, rowIndex) => {
                this.$set(item, 'width', widthList[rowIndex] || a4InnerWidth / arr.length / cm)
                return item
              })
            )
          }
        }
      })
      if (isChange) this.$emit('input', this.tableData)
    },
    inputFocus(rowIndex, colIndex) {
      this.focusRowIndex = rowIndex
      this.focusColIndex = colIndex
    },
    onFocus() {
      this._focusNode()
    },
    _focusNode() {
      this.$nextTick(() => {
        const input = this.$el.querySelector(`.table_${this.focusRowIndex}_${this.focusColIndex}`)
        if (input) input.focus()
      })
    },
    addRow() {
      const dataRowId = uuid()
      this.initTableData(
        this.tableData.reduce((list, arr, rowIndex) => {
          list.push(arr)
          if (rowIndex === this.focusRowIndex) {
            list.push(
              arr.map(() => ({
                id: uuid(),
                content: '',
                dataRowId,
                style: {
                  ...DefaultTableContentStyle,
                },
              }))
            )
          }
          return list
        }, [])
      )
      this.focusRowIndex += 1
      this._focusNode()
    },
    addCol() {
      this.initTableData(
        this.tableData.map((arr, rowIndex) => {
          return arr.reduce((list, item, colIndex) => {
            list.push(item)
            if (colIndex === this.focusColIndex) {
              list.push({
                id: uuid(),
                content: '',
                style:
                  rowIndex === 0
                    ? {
                        ...DefaultTableHeaderStyle,
                      }
                    : {
                        ...DefaultTableContentStyle,
                      },
              })
            }
            return list
          }, [])
        })
      )
      this.focusColIndex += 1
      this._focusNode()
    },
    // 万一从word中复制了表格,这里进行一下简单判断处理
    pasteText(text, clipboardData, event) {
      if (!text) return
      const valueArr = text.split('\r\n').filter((arr) => arr[0]?.length > 0)
      const copyTable = valueArr.map((item) => item.split('\t'))
      if (copyTable.length > 1 || (copyTable.length > 0 && copyTable[0].length > 1)) {
        // 有多行数据的话特殊处理
        event.preventDefault()
        const newTableData = []
        const maxCol = Math.max(this.focusColIndex + copyTable[0].length, this.tableData[0].length)
        for (let rowIndex = 0; rowIndex < Math.max(this.focusRowIndex + copyTable.length, this.tableData.length); ++rowIndex) {
          const dataRowId = uuid()
          const newArr = []
          for (let colIndex = 0; colIndex < maxCol; ++colIndex) {
            let cell = (this.tableData[rowIndex] && this.tableData[rowIndex][colIndex]) || {}
            let content = cell?.content || ''
            if (rowIndex >= this.focusRowIndex && colIndex >= this.focusColIndex) {
              const copyContent = (copyTable[rowIndex - this.focusRowIndex] && copyTable[rowIndex - this.focusRowIndex][colIndex - this.focusColIndex]) || ''
              content = copyContent || content
            }
            newArr.push({
              style:
                rowIndex === 0
                  ? {
                      ...DefaultTableHeaderStyle,
                    }
                  : {
                      ...DefaultTableContentStyle,
                    },
              ...cell,
              id: uuid(),
              content,
              dataRowId,
            })
          }
          newTableData.push(newArr)
        }
        this.initTableData(newTableData)
        // this._focusNode()
      }
    },
    removeRow() {
      if (this.focusRowIndex <= 0) return
      this.initTableData(this.tableData.filter((item, rowIndex) => rowIndex !== this.focusRowIndex))
      if (this.tableData.length === 0) {
        // this.$emit('action', 'delete') // 通知父节点把该数据删掉
      } else if (this.tableData.length <= this.focusRowIndex) {
        this.focusRowIndex -= 1
      }
      this._focusNode()
    },
    removeCol() {
      let colLength = 0
      this.initTableData(
        this.tableData.map((arr) => {
          const list = arr.filter((item, colIndex) => colIndex !== this.focusColIndex)
          colLength = list.length
          return list
        })
      )
      if (colLength === 0) {
        this.$emit('action', 'delete') // 通知父节点把该数据删掉
      } else if (colLength <= this.focusColIndex) {
        this.focusColIndex -= 1
      }
      this._focusNode()
    },
    onInput(val) {
      if (typeof val === 'string') {
        this.$set(this.data, 'title', val)
      }
    },
  },
}
</script>

<style scoped lang="less">
.word-table-box {
  // &:hover {
  //   background: #000;
  // }
}
</style>
