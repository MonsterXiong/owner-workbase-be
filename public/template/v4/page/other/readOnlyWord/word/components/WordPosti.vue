<template>
  <div class="WordPosti" @mouseenter="onMouseenter" @mouseleave="onMouseleave">
    <div class="WordPosti-box" v-for="(item, index) in data" :key="item.contentPostilId">
      <i class="remove-btn el-icon-circle-close" @click="onRemoveByIndex(index)"></i>
      <i class="el-icon-s-custom"></i>
      <div>
        <div>
          <b>{{ item.postilUser }}</b> {{ item.postilDate }}
        </div>
        <WordText v-model="item.content"></WordText>
      </div>
    </div>
  </div>
</template>

<script>
import WordText from './WordText'

export default {
  components: { WordText },
  data() {
    this.curDom = null
    return {
      text: '',
    }
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  beforeDestroy() {
    console.log('beforeDestroy')
    if (this.curDom) {
      console.log('???')
      this.curDom.style = 'position: relative;'
      this.curDom = null
    }
  },
  methods: {
    onRemoveByIndex(index) {
      this.data.splice(index, 1)
      if (this.curDom) {
        this.curDom.style = 'position: relative;'
        this.curDom = null
      }
    },
    onMouseenter(e) {
      if (e.path && e.path[1]) {
        e.path[1].style = 'position: relative; outline: 1px solid #b6072f;'
        this.curDom = e.path[1]
      }
    },
    onMouseleave(e) {
      if (e.path && e.path[1]) e.path[1].style = 'position: relative;'
      if (this.curDom) {
        this.curDom.style = 'position: relative;'
        this.curDom = null
      }
    },
  },
}
</script>

<style scoped lang="less">
.WordPosti {
  position: absolute;
  top: -7px;
  right: -90.14173228pt;
  transform: translateX(100%);
  background: #fff;
  width: 268px;
  .WordPosti-box {
    position: relative;
    display: flex;
    padding: 5px 10px;
    border: 1px solid #000;
    &:not(:first-child) {
      border-top: none;
    }
    &:hover {
      .remove-btn {
        visibility: initial;
      }
    }
    .remove-btn {
      visibility: hidden;
      position: absolute;
      color: #b6072f;
      top: -7px;
      left: -7px;
      background: #fff;
      cursor: pointer;
    }
  }
  &::before {
    position: absolute;
    content: '';
    width: 90.14173228pt;
    height: 1px;
    top: 6px;
    left: -90.14173228pt;
    background: #b6072f;
    visibility: hidden;
  }
  .el-icon-s-custom {
    font-size: 30px;
    margin-right: 8px;
  }
}
</style>
