<template>
  <div class="editor-wrap">
    <div v-if="isShow" class="content">
      <div class="editor-head" @mousedown="onMousedown" @mousemove="onMousemove">
        <div class="title">工具栏</div>
        <div class="icon" @click="onHidePanel">
          <i class="el-icon-minus"></i>
        </div>
      </div>
      <div class="editor-main">
        <div class="editor-item" v-for="item in editorData" :key="item.title">
          <div class="item-head">
            <i class="el-icon-arrow-down"></i>
            {{ item.title }}
          </div>
          <el-row>
            <el-col v-for="category in item.category" :key="category.name" :span="item.colSpan || 24">
              <div class="item-category">
                <div :class="classObj(category, item.isDraw)" @click="handleToolClick(category)" draggable @dragstart="drag($event, category)">
                  <BaseIcon :iconName="category.icon" :fill="category.fill" class="meta-tool"></BaseIcon>
                  <div class="text">{{ category.edefineName }}</div>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </div>
    </div>
    <div v-else class="icon-wrap" @click="onHidePanel">
      <i class="el-icon-plus"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  props: {
    editorData: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      currentMetaTool: null,
      isShow: true,
    }
  },
  methods: {
    handleToolClick(metaTool) {
      this.currentMetaTool = this.currentMetaTool === metaTool ? null : metaTool
      this.$emit('currentMetaToolChange', this.currentMetaTool)
    },
    classObj(metaTool, isDraw) {
      let classText = 'category-wrap'
      if (isDraw) classText += ' category-line'
      if (this.currentMetaTool && this.currentMetaTool.icon === metaTool.icon) {
        return (classText += ' current-item')
      } else {
        return classText
      }
    },
    drag(event, metaTool) {
      event.dataTransfer.setData('metaTool', JSON.stringify(metaTool))
      this.currentMetaTool = metaTool
      this.$emit('currentMetaToolChange', this.currentMetaTool)
    },
    onHidePanel() {
      this.isShow = !this.isShow
    },
    async onMousedown(e) {
      // 鼠标按下，计算当前元素距离可视区的距离
    },
    onMousemove(e) {},
  },
}
</script>

<style lang="less" scoped>
.editor-wrap {
  // height: 400px;
  position: absolute;
  top: 20px;
  right: 20px;
  // right: 10px;
  z-index: 99;
  .content {
    width: 160px;
    border: 1px solid #d7d7d7;
    border-radius: 4px;
    background-color: #fff;
  }
  .icon-wrap {
    border: 1px solid #02c1d7;
    border-radius: 2px;
    color: #02c1d7;
    font-size: 20px;
    cursor: pointer;
  }
  .editor-head {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
    cursor: all-scroll;
    .title {
      font-size: 16px;
      font-weight: bold;
      color: rgb(104, 102, 102);
    }
    .icon {
      width: 16px;
      height: 16px;
      line-height: 16px;
      border: 1px solid #02c1d7;
      color: #02c1d7;
      border-radius: 2px;
      cursor: pointer;
    }
  }
  .editor-main {
    margin-top: 10px;
    .item-head {
      padding: 5px;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
    }
    .item-category {
      padding: 10px 0;
    }
    .category-wrap {
      padding: 2px 0;
      text-align: center;
      cursor: pointer;
      &:hover {
        background-color: #ececec;
      }
      &.current-item {
        background: #ececec;
        // color: #fff;
      }
      .text {
        font-size: 14px;
      }
      .meta-tool {
        width: 30px;
        height: 30px;
      }
      &.category-line {
        display: flex;
        justify-content: center;
        align-items: center;
        .meta-tool {
          margin-right: 20px;
          width: 16px;
          height: 16px;
        }
      }
    }
  }
}
</style>
