<template>
  <div class="context-menu-box" v-if="isShow" :style="{ left: position.x + 'px', top: position.y + 'px' }" v-click-outside="hide" @click.stop>
    <el-menu
      :background-color="backgroundColor ? backgroundColor : ''"
      :text-color="textColor ? textColor : ''"
      :active-text-color="activeTextColor ? activeTextColor : ''"
      :collapse="true"
      class="context-menu"
    >
      <div v-for="(menu, index) in menuList" :key="menu.code + index">
        <el-menu-item v-if="!menu.children || menu.children.length == 0" @click="handleMenuItemClick(menu)" :index="menu.code" :disabled="menu.disabled">
          <BaseIcon v-if="menu.iconName" :iconName="menu.iconName" :fill="menu.iconfill" />
          <BaseIcon v-if="isIconName(menuList) && (menu.iconName === '' || menu.iconName === undefined)" iconName="" />
          <span class="context-menu-title">{{ typeof menu.title === 'function' ? menu.title(menu.params) : menu.title }}</span>
        </el-menu-item>
        <el-submenu v-else :index="menu.code" popper-class="context-submenu">
          <BaseIcon v-if="menu.iconName" :iconName="menu.iconName" :fill="menu.iconfill" />
          <span slot="title" class="context-menu-title">{{ menu.title }}</span>
          <el-menu-item
            v-for="(subItem, index) in menu.children"
            :key="subItem.code + index"
            @click="handleMenuItemClick(menu, subItem)"
            :index="subItem.code"
            v-show="!subItem.disabled"
            :disabled="subItem.disabled"
          >
            <BaseIcon v-if="subItem.iconName" :iconName="subItem.iconName" :fill="subItem.iconfill" />
            <BaseIcon v-if="isIconName(menu.children) && (subItem.iconName === '' || subItem.iconName === undefined)" iconName="" />
            <span class="context-menu-title">{{ subItem.title }}</span>
          </el-menu-item>
        </el-submenu>
      </div>
    </el-menu>
  </div>
</template>

<script>
//menuItem对象格式：
// {title:显示名称，---有
// code:菜单代码（用于以后做权限控制）,---有且唯一
// iconName：展示的icon名称（来自iconfont），
// iconfill：展示的icon填充颜色，
// disabled：是否不可用，
// children：子菜单项，
// action：点击后触发的方法[没有action就抛上去给父组件处理]
// params：传参（给action方法的参数）}
export default {
  name: 'BaseContextMenu',
  props: {
    menuList: {
      type: Array,
      require: true,
    },
    backgroundColor: String,
    textColor: String,
    activeTextColor: String,
  },
  data() {
    return {
      position: { x: -1, y: -1 },
      isShow: false,
    }
  },
  computed: {
    isIconName() {
      // 判断是否存在iconName
      return (menuList) => {
        return menuList.filter((item) => item.iconName && item.iconName !== '').length > 0
      }
    },
  },
  methods: {
    show(event, options) {
      if (!this.menuList || this.menuList.length < 1) return
      this.position.x = event.clientX + event.w
      this.position.y = event.clientY + event.h
      this.isShow = true
      this.$nextTick(() => {
        let menuBox = document.querySelector('.context-menu-box')
        // canvas画布容器
        let myDiagramDiv = document.querySelector('#orgDiagram')
        if (myDiagramDiv) {
          // Y轴
          if (myDiagramDiv.clientHeight - event.clientY < menuBox.offsetHeight) {
            this.position.y = myDiagramDiv.clientHeight - menuBox.offsetHeight + event.h
          }
          // X轴
          if (myDiagramDiv.clientWidth - event.clientX < menuBox.offsetWidth) {
            this.position.x = myDiagramDiv.clientWidth - menuBox.offsetWidth + event.w
          }
        }
      })
    },
    handleMenuItemClick(menuItem, subItem) {
      if (menuItem && menuItem.action) {
        menuItem.action(menuItem.params, this.targetOptions)
      } else {
        const data = {
          code: menuItem.code,
          params: menuItem.params,
        }
        this.$emit('contextMenuClick', data, subItem)
      }
      this.hide()
    },
    hide() {
      this.isShow = false
    },
  },
}
</script>

<style lang="less" scoped>
.context-menu-box {
  z-index: 99;
  position: absolute;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);

  .context-menu {
    border: 1px solid #d8dce5;
    padding: 4px 2px 4px 2px;

    .context-menu-title {
      margin-left: 5px;
    }
  }
}
.el-menu--collapse {
  width: 100% !important;
}

.el-menu-item {
  padding: 0 16px 0 10px !important;
}
.el-menu-item,
.el-submenu {
  height: 28px !important;
  line-height: 28px !important;
}

.el-menu-item:hover,
.el-submenu:hover {
  background-color: #eee;
}
.el-menu-item:focus,
.el-submenu:focus {
  background-color: #eee;
}
.el-submenu {
  & /deep/ .el-submenu__title {
    height: 28px !important;
    line-height: 28px !important;
  }

  & /deep/ .el-submenu__title:hover {
    background-color: #eee;
  }

  /deep/.el-submenu__icon-arrow {
    margin-top: -4px;
  }
}
</style>
