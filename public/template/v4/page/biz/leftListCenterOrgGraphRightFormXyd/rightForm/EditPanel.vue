<template>
  <div class="edit-panel">
    <div class="edit-panel-title">基础属性</div>
    <main>
      <component :is="curComponent" :currentNodeData="currentNodeData" v-on="$listeners" :ref="curNodeType + 'Ref'"></component>
      <!-- @submitForm="onSubmit" -->
    </main>
    <!-- <footer>
      <el-button size="small" type="primary" @click="onSubmitForm">保存</el-button>
    </footer> -->
  </div>
</template>

<script>
import { PanelComponentMap } from './panelComponentMap'

export default {
  name: 'EditPanel',
  props: {
    currentNodeData: { type: Object },
  },
  data() {
    return {
      curComponent: '',
      curNodeType: '',
    }
  },
  watch: {
    currentNodeData: {
      handler() {
        this.setCurComponent()
      },
      immediate: true,
    },
  },
  methods: {
    setCurComponent() {
      this.curNodeType = this.currentNodeData?.id ? 'sample' : ''
      this.curComponent = PanelComponentMap.get(this.curNodeType)
    },
    // onSubmit(formData) {
    //   this.$emit('submitFormData', formData)
    // },
  },
}
</script>

<style lang="less" scoped>
.edit-panel {
  height: 100%;
  // border-left: 1px solid #d8d8d8;
  .edit-panel-title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    background: #1485cd;
  }
  main {
    height: calc(100% - 50px);
    overflow-y: auto;
  }
}
</style>
