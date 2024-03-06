<template>
  <div class="panel-layout float-panel-layout">
    <div class="top-layer">
      <splitpanes class="default-theme" @resize="onResize">
        <pane class="left-side" v-if="$slots.left" :size="leftWidth">
          <aside class="aside">
            <i v-show="!isCollapseLeft" :title="isShowToggleTitle ? '收缩左侧边栏' : ''" class="collapse-icon el-icon-d-arrow-left" @click="onToggleLeft"></i>
            <i v-show="isCollapseLeft" :title="isShowToggleTitle ? '展开左侧边栏' : ''" class="unfold-icon el-icon-d-arrow-right" @click="onToggleLeft"></i>
          </aside>
          <nav class="side-nav">
            <slot name="left"></slot>
          </nav>
        </pane>
        <pane class="main" :size="mainWidth">
          <slot name="content"></slot>
        </pane>
        <pane class="right-side" v-if="$slots.right" :size="rightWidth">
          <aside class="aside">
            <i
              v-show="!isCollapseRight"
              :title="isShowToggleTitle ? '收缩右侧边栏' : ''"
              class="collapse-icon el-icon-d-arrow-right"
              @click="onToggleRight"
            ></i>
            <i v-show="isCollapseRight" :title="isShowToggleTitle ? '展开右侧边栏' : ''" class="unfold-icon el-icon-d-arrow-left" @click="onToggleRight"></i>
          </aside>
          <nav class="side-nav">
            <slot name="right"></slot>
          </nav>
        </pane>
      </splitpanes>
    </div>
  </div>
</template>

<script>
import { Splitpanes, Pane } from 'splitpanes'
export default {
  name: 'FloatPanelLayout',
  components: { Splitpanes, Pane },
  props: {
    // 初始化左侧栏宽度
    defaultLeftWidth: {
      type: Number,
      default: 18,
    },
    // 初始化右侧栏宽度
    defaultRightWidth: {
      type: Number,
      default: 18,
    },
    // 左侧栏展开收缩
    defaultCollapseLeft: {
      type: Boolean,
      default: false,
    },
    // 右侧栏展开收缩
    defaultCollapseRight: {
      type: Boolean,
      default: false,
    },
    isShowToggleTitle: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    this.splitPaneKey = []
    return {
      // leftWidth: this.defaultLeftWidth ?? 18,
      leftWidth: 18,
      mainWidth: 85,
      rightWidth: this.defaultRightWidth ?? 18,
      isCollapseLeft: false,
      isCollapseRight: false,
    }
  },
  created() {
    this.leftWidth = 0
    this.rightWidth = 0
    if (this.$slots.left) {
      this.leftWidth = this.defaultCollapseLeft ? 0 : this.defaultLeftWidth
      this.isCollapseLeft = this.defaultCollapseLeft
      this.splitPaneKey.push('leftWidth')
    }
    this.splitPaneKey.push('mainWidth')
    if (this.$slots.right) {
      this.rightWidth = this.defaultCollapseRight ? 0 : this.defaultRightWidth
      this.isCollapseRight = this.defaultCollapseRight
      this.splitPaneKey.push('rightWidth')
    }
    this.onComputeSize()
  },
  methods: {
    onToggleLeft() {
      this.isCollapseLeft ? this.onUnfoldLeft() : this.onCollapseLeft()
    },
    onUnfoldLeft() {
      this.isCollapseLeft = false
      this.leftWidth = this.defaultLeftWidth
      this.onComputeSize()
    },
    onCollapseLeft() {
      this.isCollapseLeft = true
      this.leftWidth = 0
      this.onComputeSize()
    },
    onToggleRight() {
      this.isCollapseRight ? this.onUnfoldRight() : this.onCollapseRight()
    },
    onUnfoldRight() {
      this.isCollapseRight = false
      this.rightWidth = this.defaultRightWidth
      this.onComputeSize()
    },
    onCollapseRight() {
      this.isCollapseRight = true
      this.rightWidth = 0
      this.onComputeSize()
    },
    onResize(values) {
      values.forEach((item, index) => {
        this[this.splitPaneKey[index]] = item.size
      })
      this.onComputeSize()
    },
    // 重新计算大小 以及是否收缩的状态
    onComputeSize() {
      this.isCollapseLeft = this.leftWidth == 0
      this.isCollapseRight = this.rightWidth == 0
      this.mainWidth = 100 - this.leftWidth - this.rightWidth
      console.log(this.leftWidth, this.rightWidth, this.mainWidth)
    },
  },
}
</script>

<style lang="less" scoped>
@import './style/panel-layout.less';
.float-panel-layout {
  width: 100%;
  height: 100%;
  .top-layer {
    width: 100%;
    height: 100%;
    // pointer-events: none;
    ::v-deep {
      .left-side,
      .right-side,
      .splitpanes__splitter {
        pointer-events: auto;
      }
      .splitpanes__splitter {
        border: none;
      }
      .main {
        // pointer-events: none;
      }
    }
  }
}
</style>
