<template>
  <!-- 组织图组件操作栏 -->
  <div class="toolbar">
    <div class="menu-item" v-for="(menuItem, index) in toolList" :key="menuItem.code + index" @click="onToolEvent(menuItem)">
      <div class="toolbar-menu-item-icon" :title="menuItem.name">
        <!-- <BaseIcon :iconName="menuItem.icon || 'icon-skin'" class="" /> -->
        <i :class="menuItem.icon"></i>
      </div>
      <span class="toolbar-menu-item-text" v-show="!hideText">{{ menuItem.name }}</span>
    </div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
  },
  name: 'Toolbar',
  data() {
    return {
      hideText: false,
      toolList: [
        {
          name: '保存',
          code: 'save',
          icon: 'el-icon-check',
        },
        {
          name: '删除',
          code: 'delete',
          icon: 'el-icon-delete',
        },
      ],
    }
  },
  watch: {
    menuList() {
      if (this.menuList.length > 0) {
        this.toolList = [...this.toolList, ...this.menuList]
      }
    },
  },
  mounted() {},
  methods: {
    onToolEvent(data) {
      this.$emit('toolbarClick', data)
    },
  },
}
</script>

<style lang="less" scoped>
.toolbar {
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #d8d8d8;
  .menu-item {
    height: 100%;
    padding: 0px 10px;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    color: #4b4b4b;
  }
  .menu-item:hover {
    color: #3e96f5;
    background: #e7e7e785;
  }
  .toolbar-menu-item-icon {
    font-size: 18px;
    margin-right: 5px;
    position: relative;
    display: flex;
    align-items: center;
  }
  .toolbar-menu-item-text {
    flex: 1;
    overflow: hidden;
    font-size: 13px;
  }
}
::v-deep {
  .dropdown-wrap {
    display: flex;
    width: 100px !important;
    align-items: center;
    line-height: 30px;
    // span
  }
}
</style>
