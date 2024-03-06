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
    <el-dropdown trigger="click" @command="handleCommand" style="margin-left: 10px">
      <span class="el-dropdown-link"> 节点样式<i class="el-icon-arrow-down el-icon--right"></i> </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item v-for="item in typeColorConfigList" :key="item.code" :command="item.code">
          <div class="dropdown-wrap">
            <span :style="'display:inline-block;width:20px;height:19px;margin-right:5px; background:' + item.deep"></span>
            <span>{{ item.code }}</span>
          </div>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <slot></slot>
  </div>
</template>

<script>
import { typeColorConfig } from './gojs/typeConfig'
export default {
  props: {
    menuList: {
      type: Array,
      default: () => [],
    },
    addToolList: {
      type: Array,
      default: () => [],
    },
    saveMode: {
      type: String,
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
        {
          name: '添加',
          code: 'add',
          icon: 'el-icon-circle-plus-outline',
        },
        {
          name: '上移',
          code: 'moveUp',
          icon: 'el-icon-arrow-up',
        },
        {
          name: '下移',
          code: 'moveDown',
          icon: 'el-icon-arrow-down',
        },
        {
          name: '导出',
          code: 'export',
          icon: 'el-icon-upload2',
        },
        {
          name: '水平',
          code: 'horizontal',
          icon: 'el-icon-caret-right',
        },
        {
          name: '垂直',
          code: 'vertical',
          icon: 'el-icon-caret-bottom',
        },
      ],
      typeColorConfigList: [],
    }
  },
  watch: {
    menuList() {
      if (this.menuList.length > 0) {
        this.toolList = [...this.toolList, ...this.menuList]
      }
    },
    saveMode: {
      handler(val) {
        console.log(val, 888)
        if (val == 'monitor') this.toolList = this.toolList.filter((ele) => ele.code !== 'save')
      },
      immediate: true,
    },
    addToolList: {
      handler(val) {
        if (val.length > 0) this.toolList = this.toolList.filter((ele) => ele.code !== 'add')
        val.map((ele, index) => {
          this.toolList.splice(2 + index, 0, ele)
        })
      },
      immediate: true,
    },
  },
  mounted() {
    for (let key in typeColorConfig) {
      const element = typeColorConfig[key]
      this.typeColorConfigList.push({ code: key, ...element })
    }
  },
  methods: {
    onToolEvent(data) {
      console.log('toolbar Click+++++++++++', data)
      this.$emit('toolbarClick', data)
    },
    handleCommand(code) {
      this.$emit('changeNodeStyle', code)
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
