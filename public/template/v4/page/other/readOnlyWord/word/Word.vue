<template>
  <div class="word-page">
    <!-- 虚拟word,不用来显示的, 只是用来计算分页的 -->
    <VirtualWord ref="VirtualWordRef" :data="wordData" />
    <div v-if="noPage" class="word really noPage">
      <div class="border top-left"></div>
      <div class="border top-right"></div>
      <div class="border bottom-left"></div>
      <div class="border bottom-right"></div>
      <article class="word-article">
        <div style="position: relative" v-for="(item, index) in wordData" :key="item.id">
          <component
            class="WordNode"
            :is="item.type"
            :data="item"
            v-model="item.content"
            :nodeStyle="item.style || {}"
            :tabindex="index"
            :readOnly="true"
          ></component>
        </div>
      </article>
    </div>
    <div v-else v-for="(word, pageIndex) in wordTreeData" class="word really" :class="{ transverse: word.isTransverse }" :key="word.id">
      <div class="border top-left"></div>
      <div class="border top-right"></div>
      <div class="border bottom-left"></div>
      <div class="border bottom-right"></div>
      <div class="pageNum">第 {{ pageIndex + 1 }} 页</div>
      <article class="word-article">
        <div style="position: relative" v-for="(item, index) in word.children" :key="item.id">
          <component
            class="WordNode"
            :is="item.type"
            :data="item"
            v-model="item.content"
            :nodeStyle="item.style || {}"
            :tabindex="index"
            :readOnly="true"
          ></component>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { uuid } from '@/utils/commonUtil'
import { WordContentType, ContentType, DefaultWordTextStyle, DefaultTableHeaderStyle, DefaultTableContentStyle, WordDefaultType } from './constants'
import VirtualWord from './VirtualWord.vue'
import wordMixins from './wordMixins'

export default {
  mixins: [wordMixins],
  components: {
    VirtualWord,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    noPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      wordData: [],
      wordTreeData: [],
    }
  },
  watch: {
    data: {
      handler(val) {
        this.wordData = val.map((item) => this.tramsformData(item))
        this.initData()
      },
      immediate: true,
    },
  },
  methods: {
    initData() {
      this.wordData = this.wordData
        .sort((a, b) => a._sort - b._sort)
        .map((item, index) => {
          item._sort = index
          return item
        })
      return new Promise((res, rej) => {
        setTimeout(() => {
          this.wordTreeData = this.$refs.VirtualWordRef.computedWordData()
          this.$nextTick(() => {
            res()
          })
        }, 0)
      })
    },
  },
}
</script>

<style lang="less" scoped>
::v-deep {
  @import './word.less';
}
.word-page {
  background-color: #fff;
}
</style>
