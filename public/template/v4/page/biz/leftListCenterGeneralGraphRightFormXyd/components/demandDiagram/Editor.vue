<template>
  <div class="editor-wrap">
    <div class="editor-head">
      <div class="title">工具栏</div>
      <div class="icon">
        <i class="el-icon-minus"></i>
      </div>
    </div>
    <div class="editor-main">
      <div class="editor-item" v-for="item in editorData" :key="item.title">
        <div class="item-head">
          <i class="el-icon-arrow-down"></i>
          {{ item.title }}
        </div>
        <div class="item-category" v-for="category in item.category" :key="category.name">
          <div class="category-wrap" v-if="item.isLine">
            <i :class="category.icon"></i>
            <span>{{ category.name }}</span>
          </div>
          <div class="category-wrap" v-else>
            <!-- svg -->
            <div>{{ category.name }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Editor',
  data() {
    return {
      editorData: [
        {
          title: '系统元素',
          category: [
            {
              icon: '',
              name: '数据链系统',
            },
            {
              icon: '',
              name: '交互关系',
            },
            {
              icon: '',
              name: '配合协同关系',
            },
          ],
        },
        {
          title: '绘图元素',
          category: [
            {
              icon: 'T',
              name: '文本',
            },
            {
              icon: 'el-icon-document',
              name: '批注',
            },
            {
              icon: 'el-icon-right',
              name: '箭头',
            },
          ],
          isLine: true,
        },
      ],
    }
  },
}
</script>

<style lang="less" scoped>
.editor-wrap {
  width: 160px;
  height: 400px;
  background-color: #fff;
  position: absolute;
  top: 20px;
  right: 0;
  border: 1px solid #d7d7d7;
  border-radius: 4px;
  z-index: 99;
  .editor-head {
    padding: 10px 5px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #d7d7d7;
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
    }
  }
  .editor-main {
    margin-top: 10px;
    .item-head {
      padding: 5px;
      border-top: 1px solid #d7d7d7;
      border-bottom: 1px solid #d7d7d7;
    }
    .category-wrap {
      padding: 2px 0;
      text-align: center;
      i {
        margin-right: 20px;
      }
    }
  }
}
</style>
