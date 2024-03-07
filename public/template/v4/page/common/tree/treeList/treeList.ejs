<template>
  <div class="functional-tree">
    <div class="tree-search">
      <el-input v-model="filterText" size="mini" placeholder="请输入" clearable>
        <el-button slot="append" icon="el-icon-search" @click="filterNodeByText" size="mini"></el-button>
      </el-input>
      <span class="tree-btn-wrap" v-show="!isReadonly">
        <!-- <span class="iconfont icon-tianjia" @click.native="onAdd" /> -->
        <BaseIcon iconName="icon-tianjia" @click.native="onAdd()" />
      </span>
    </div>
    <div class="tree-wrapper">
      <el-tree
        :data="treeData"
        ref="treeRef"
        :expand-on-click-node="false"
        :current-node-key="defaultNodeKey"
        node-key="id"
        default-expand-all
        highlight-current
        :filter-node-method="filterNode"
        @node-click="onNodeClick"
      >
        <span slot-scope="_node" class="tree-node-span">
          <span style="padding: 0 4px"><BaseIcon :icon-name="_node.data.icon"></BaseIcon></span>
          <span :title="_node.data.label" class="tree-text" :class="isReadonly ? 'tree-text-noicon' : ''" v-click-outside="onNodeLbelChange">
            <el-input v-if="_node.data.isEdit" size="mini" @click.native.stop @keyup.enter.native="onEditNodeLabel" v-model="editLabel"></el-input>
            <span @dblclick.stop="handleEditNodeLabel(_node)">{{ _node.data.label }}</span>
          </span>
          <span v-show="!isReadonly">
            <i class="el-icon-circle-plus-outline tree-icon" title="新增" @click="onAdd(_node.data)"></i>
            <i class="el-icon-edit tree-icon" title="编辑" v-show="_node.data.id !== 'root'" @click="onEdit(_node.data)"></i>
            <i class="el-icon-delete tree-icon" title="删除" v-show="_node.data.id !== 'root'" @click="onDelete(_node.data)"></i>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>

<script>
import tools from '@/utils/tools'
export default {
  props: {
    isReadonly: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      treeData: [
        {
          label: '测试',
          id: '1',
          icon: 'icon-System-Fill-copy',
          parentId: '',
          isEdit: false,
          data: { label: '测试', id: 1, icon: 'icon-System-Fill-copy', parentId: '' },
          children: [
            {
              label: '测试1-1',
              id: '1-1',
              icon: 'icon-tianjiajiedian',
              parentId: '1',
              isEdit: false,
              data: { label: '测试', id: '1-1', icon: 'icon-tianjiajiedian', parentId: '1' },
            },
          ],
        },
        {
          label: '测试1',
          id: '2',
          icon: 'icon-System-Fill-copy',
          parentId: '',
          isEdit: false,
          data: { label: '测试', id: '2', icon: 'icon-System-Fill-copy', parentId: '' },
        },
      ],
      defaultNodeKey: '',
      selectedNode: null,
      filterText: '',
      editData: null,
      editLabel: '',
      currentKey: '',
    }
  },
  mounted() {
    this.queryTreeData()
  },
  methods: {
    onNodeClick(nodeData) {
      this.selectedNode = nodeData
      this.$refs.treeRef.setCurrentKey(nodeData.id)
      this.currentKey = nodeData?.id || ''
      this.$emit('selectChange', nodeData)
    },
    async queryTreeData() {
      // let { data } = await SfFunctionModelBaseService.baseQuerySfFunctionModelList(
      //   QueryConditionBuilder.getInstanceNoPage().buildEqualQuery('bindProject', this.currentProjectId).buildAscSort('sort')
      // )
      // this.treeData = []
      // if (Array.isArray(data)) {
      //   let arr = data.map((ele) => {
      //     let obj = {
      //       label: ele.functionModelName,
      //       id: ele.functionModelId,
      //       icon: !ele.parentId ? 'icon-System-Fill-copy' : 'icon-tianjiajiedian',
      //       data: { ...ele },
      //       parentId: ele.parentId,
      //       isEdit: false,
      //     }
      //     return obj
      //   })
      //   this.treeData = znTool.treeTool.listToTree(arr)
      //   this._initClick()
      // }
      // this.$emit('refreshFunctionalData', _.cloneDeep(this.treeData))
    },
    // 默认点击第一个叶子节点,或者上一次点击的节点
    _initClick() {
      this.$nextTick(() => {
        const treeRef = this.$refs.treeRef
        const node = treeRef.getNode(this.currentKey)
        if (this.currentKey && node) {
          // 点击上一次点击的节点
          this.onNodeClick(node.data)
        } else {
          // 点击第一个叶子节点
          const treeItems = [...treeRef.treeItems]
          const firstLeafDom = treeItems.find((dom) => dom?.__vue__?.node?.isLeaf)
          if (firstLeafDom) {
            const firstLeafNode = firstLeafDom.__vue__.node
            this.onNodeClick(firstLeafNode.data)
          }
        }
      })
    },
    filterNode(value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    },
    onAdd(data) {
      // let parentId = null,
      //   bindFunctionType = FunctionTypeCode.MODULE,
      //   sort = 1
      // if (data) {
      //   parentId = data.id != 'root' ? data.id : ''
      //   let type = data?.data?.bindFunctionType
      //   if (type == FunctionTypeCode.MODULE) bindFunctionType = FunctionTypeCode.PAGE
      //   if (data.children) sort = data.children.length + 1
      // }
      // this.$refs.AddOrEditFunctionDialogRef.show({ parentId, status: '1', bindFunctionType, sort })
    },
    onEdit(item) {
      this.$refs.AddOrEditFunctionDialogRef.show(item.data)
    },
    async onDelete(data) {
      // tools
      //   .deleteConfirm(data.label, '功能', 1)
      //   .then(async () => {
      //     await SfFunctionModelBaseService.baseBatchDeleteSfFunctionModel([data.id])
      //     tools.message('删除成功')
      //     this.queryTreeData()
      //   })
      //   .catch((e) => {
      //     console.error('删除失败', e)
      //     tools.message('已取消删除', { type: 'info' })
      //   })
    },
    filterNodeByText() {
      this.$refs.treeRef.filter(this.filterText)
    },
    handleEditNodeLabel({ data, node }) {
      if (this.isReadonly) return
      this.onEditNodeLabel()
      this.editData = data
      this.editLabel = node.label
      this.$set(data, 'isEdit', true)
    },

    async onEditNodeLabel() {
      // if (!this.editData) return
      // if (!this.editLabel) {
      //   tools.message('名称不能为空', { type: 'info' })
      //   return
      // }
      // if (this.editData.data.functionModelName != this.editLabel) {
      //   let params = { ...this.editData.data, functionModelName: this.editLabel }
      //   await SfFunctionModelBaseService.baseUpdateSfFunctionModel(params)
      //   this.editData.label = this.editLabel
      //   this.editData.data.functionModelName = this.editLabel
      // }
      // this.editData.isEdit = false
      // this.editData = null
    },
    onNodeLbelChange() {
      if (!this.editData) return
      if (!this.editLabel) {
        this.editLabel = this.editData.data.functionModelName
      }
      this.onEditNodeLabel()
    },
  },

  watch: {
    filterText(val) {
      this.filterNodeByText()
    },
    currentProjectId: {
      handler() {
        this.queryTreeData()
      },
    },
  },
}
</script>

<style lang="less" scoped>
.functional-tree {
  height: 100%;
  padding: 5px;
  .tree-search {
    // height: 50px;
    padding: 10px 0px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .tree-btn-wrap {
      margin-left: 10px;
      .iconfont,
      .icon {
        font-size: 30px;
        cursor: pointer;
        color: @font-color-toolbar;
        // color: @button-bg-color-primary;
        &:hover {
          color: @button-bg-color-primary;
        }
      }
    }
  }
  .tree-wrapper {
    height: calc(100% - 54px);
    overflow-y: auto;
  }
}
.tree-node-span {
  width: 100%;
  display: flex;
  align-items: center;
  overflow: hidden;
  .tree-text {
    display: inline-block;
    width: calc(100% - 76px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .tree-text-noicon {
    // width: calc(100% - 40px);
    width: calc(100% - 22px);
  }
  .tree-icon {
    margin-left: 4px;
    cursor: pointer;
  }
  .el-icon-circle-plus-outline:hover {
    color: @button-bg-color-success;
  }
  .el-icon-edit:hover {
    color: @button-bg-color-primary;
  }
  .el-icon-delete:hover {
    color: @button-bg-color-danger;
  }
}
::v-deep {
  .el-input--mini .el-input__inner {
    height: 25px;
    line-height: 24px;
  }
}
</style>
