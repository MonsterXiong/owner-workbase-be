<template>
  <div class="edit-panel">
    <div class="edit-panel-title">基础属性</div>
    <main>
      <component
        :is="curComponent"
        :currentNodeData="currentNodeData"
        @submitForm="onSubmit"
      ></component>
    </main>
    <!-- <footer>
      <el-button size="small" type="primary" @click="onSubmit">保存</el-button>
    </footer> -->
  </div>
</template>

<script>
import { PanelComponentMap } from "./panelComponentMap";

export default {
  name: "EditPanel",
  props: {
    currentNodeData: { type: Object },
    curNodeType: { type: String },
  },
  data() {
    return {
      curComponent: "",
    };
  },
  watch: {
    currentNodeData: {
      handler() {
        this.setCurComponent();
      },
      immediate: true,
    },
  },
  methods: {
    setCurComponent() {
      this.curComponent = PanelComponentMap.get(this.curNodeType);
    },
    onSubmit(formData) {
      this.$emit("submitFormData", formData);
    },
  },
};
</script>

<style lang="less" scoped>
.edit-panel {
  height: 100%;
  border-left: 1px solid #d8d8d8;
  .edit-panel-title {
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: 600;
    font-size: 16px;
    color: #fff;
    background: #1485cd; // display: flex;
    // align-items: center;
  }
  main {
    height: calc(100% - 50px);
    overflow-y: auto;
    padding: 10px;
  }
  footer {
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
