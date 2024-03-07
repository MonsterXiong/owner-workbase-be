<template>
  <!-- 虚拟word,不用来显示的, 只是用来计算分页的 -->
  <div class="virtual word">
    <article ref="vortualRef" class="virtual word-article">
      <component
        v-for="(item, index) in data"
        :is="item.type"
        :data="item"
        :nodeStyle="item.style || {}"
        :key="item.id"
        :tabindex="index"
        v-model="item.content"
      ></component>
    </article>
  </div>
</template>

<script>
import wordMixins from './wordMixins'
import { uuid } from '@/utils/commonUtil'

export default {
  mixins: [wordMixins],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {}
  },

  methods: {
    // 重新计算大小
    computedWordData() {
      const el = this.$refs.vortualRef
      const { height } = el.getBoundingClientRect()
      const children = el.childNodes
      let total = 0
      let treeData = [
        {
          label: '第1页',
          _id: uuid(),
          children: [],
          isTransverse: false, // 是否横向
        },
      ]
      let treeDataIndex = 0
      children.forEach((dom, index) => {
        const { height: domHeight } = dom.getBoundingClientRect()
        const data = this.data[index]
        if (data?.isTransverse) {
          if (treeData[treeDataIndex].children.length === 0) {
            treeData[treeDataIndex].children.push(data)
            treeData[treeDataIndex].isTransverse = true
          } else {
            treeData.push({
              label: `第${treeData.length + 1}页`,
              _id: uuid(),
              children: [data],
              isTransverse: true,
            })
            treeDataIndex += 1
          }
          total += height
        } else if (total + domHeight <= height && !data?.isTransverse) {
          treeData[treeDataIndex].children.push(data)
          total += domHeight
        } else {
          treeData.push({
            label: `第${treeData.length + 1}页`,
            _id: uuid(),
            children: [data],
          })
          treeDataIndex += 1
          total = domHeight
        }
      })
      return treeData
    },
  },
}
</script>

<style scoped lang="less">
@import './word.less';
</style>
