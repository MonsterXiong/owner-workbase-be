<template>
  <!-- 组织图组件 -->
  <div class="task-org-diagram">
    <Toolbar
      :addToolList="addToolList"
      :saveMode="saveMode"
      @toolbarClick="onToolbarClick"
      @changeNodeStyle="changeNodeStyle"
    >
      <slot></slot
    ></Toolbar>
    <main>
      <div id="orgDiagram" ref="orgDiagramRef" style="height: 100%"></div>
    </main>
    <ContextMenu ref="contextMenuRef" :menuList="contextMenuList" />
  </div>
</template>

<script>
import * as go from "gojs";
import { v4 as uuidv4 } from "uuid";
import {
  linkTemplate,
  nodeTemplate,
  taskNodeTemplate,
} from "./gojs/diagramTemplate";
import {
  findUpOrDownNode,
  exchangeNodeValue,
  changeLayoutAngle,
} from "./gojs/gojsHelper";
import ContextMenu from "./ContextMenu.vue";
import Toolbar from "./Toolbar.vue";
import { DefaultAddNodeConfig } from "./gojs/typeConfig";
const $ = go.GraphObject.make;

export default {
  name: "OrgDiagram",
  props: {
    nodeList: {
      type: Array,
      default: () => [],
    },
    defaultAngle: { type: Number, default: 0 },
    saveMode: {
      type: String,
      default: "save", //monitor
    },
    addToolList: {
      type: Array,
      default: () => [],
    },
    nodeTemplate: {
      type: Object,
    },
    defaultTemplate: {
      type: String,
    },
    cw: { type: Number },
    ch: { type: Number },
    textList: {
      type: Array,
      default: () => [],
    },
    addNodeConfig: {
      type: Object,
    },
  },
  data() {
    return {
      diagram: null,
      nodeData: [],
      contextMenuList: [],
      angle: 0,
    };
  },
  computed: {
    selection() {
      return this.diagram?.selection;
    },
    activeNode() {
      return this.diagram?.selection?.first();
    },
    activeNodeData() {
      return this.activeNode?.data;
    },
  },
  watch: {
    nodeList: {
      handler() {
        this.$nextTick(() => {
          this.setNodeData();
        });
      },
      immediate: true,
    },
    defaultAngle: {
      handler() {
        this.angle = this.defaultAngle;
      },
      immediate: true,
    },
    activeNodeData: {
      handler() {
        this.$emit("setCurrentNodeData", this.activeNodeData);
      },
    },
  },
  beforeDestroy() {
    this.$emitter.off("treeGraphContextmenuShow", this.showContextMenu);
    this.$emitter.off("treeGraphContextmenuHide", this.hideContextMenu);
    this.$emitter.off("updateActiveNodeData", this.updateActiveNodeData);
  },
  methods: {
    initDiagram(fn) {
      if (this.diagram) {
        this.diagram.div = null;
        this.diagram = null;
      }
      const diagram = $(go.Diagram, this.$refs.orgDiagramRef, {
        allowDelete: false,
        allowTextEdit: true,
        layout: $(go.TreeLayout, {
          sorting: go.TreeLayout.SortingAscending,
          angle: this.angle,
          comparer: function (a, b) {
            const da = a.node.data;
            const db = b.node.data;
            return parseInt(da.sortValue) - parseInt(db.sortValue) > 0 ? 1 : -1;
          },
        }),
        model: new go.TreeModel({
          nodeKeyProperty: "id",
          nodeParentKeyProperty: "parentId",
        }),
        padding: new go.Margin(54, 0, 0, 0),
      });
      diagram.nodeTemplate = this.nodeTemplate
        ? this.nodeTemplate
        : taskNodeTemplate({ angle: this.angle, textList: this.textList });
      diagram.linkTemplate = linkTemplate();
      this.diagram = diagram;
      window.diagram = diagram;
      if (fn) fn();
      this.initEventListener();
    },
    setNodeData() {
      this.nodeData = [];
      this.nodeList.map((node, index) => {
        if (node.id) {
          let sortValue = node.parentId ? index : 0;
          this.nodeData.push({
            ...node,
            sortValue: node.sortValue || sortValue,
            _type: node._type || "default",
          });
        }
      });
      this.renderDiagram();
    },
    renderDiagram() {
      if (this.diagram) {
        this.diagram.model.nodeDataArray = [...this.nodeData];
      } else {
        this.initDiagram(() => {
          this.diagram.model.nodeDataArray = [...this.nodeData];
        });
      }
    },
    initEventListener() {
      this.$emitter.on("treeGraphContextmenuShow", this.showContextMenu);
      this.$emitter.on("treeGraphContextmenuHide", this.hideContextMenu);
      this.$emitter.on("updateActiveNodeData", this.updateActiveNodeData);
    },
    hideContextMenu() {
      this.$refs["contextMenuRef"]?.hide();
    },
    showContextMenu({ obj, diagram, tool }) {
      const viewPoint = diagram.lastInput.viewPoint;
      let diagramDiv = this.$refs.orgDiagramRef;
      let app = document.querySelector("#app");
      let h =
          app.clientHeight - (this.ch ? this.ch - 50 : diagramDiv.clientHeight),
        w = app.clientWidth - (this.cw ? this.cw : diagramDiv.clientWidth);
      const mockEvent = {
        clientX: viewPoint.x,
        clientY: viewPoint.y,
        type: "canvas",
        w,
        h,
      };
      this.contextMenuList = this.getContextMenuList(obj);
      this.$nextTick(() => {
        this.$refs["contextMenuRef"]?.show(mockEvent);
      });
    },
    getContextMenuList(obj) {
      if (obj instanceof go.Node) {
        let arr = [
          {
            title: "删除节点",
            code: "delete",
            action: () => {
              this.handleDelete();
            },
            params: obj,
          },
        ];
        if (this.addToolList) {
          this.addToolList.map((ele) => {
            arr.push({
              title: ele.name,
              code: ele.code,
              addTemplateCode: ele.addTemplateCode,
              action: () => {
                this.handleAdd(ele?.addTemplateCode || "");
              },
              params: obj,
            });
          });
        } else {
          arr.push({
            title: "添加节点",
            code: "add",
            action: () => {
              this.handleAdd();
            },
            params: obj,
          });
        }
        return arr;
      } else return [];
    },
    getDeleteListById(node) {
      let childrens = this.nodeData.filter((v) => v.parentId === node.id);
      if (childrens.length === 0) return [];
      childrens.forEach((children) => {
        childrens = childrens.concat(this.getDeleteListById(children));
      });
      return childrens;
    },
    handleDelete() {
      if (!this.activeNodeData) {
        return;
      }
      const downnode = findUpOrDownNode(this.diagram, this.activeNode, 1);
      const upnode = findUpOrDownNode(this.diagram, this.activeNode, -1);
      let parentNode = this.activeNodeData.parentId
        ? this.diagram.findNodeForKey(this.activeNodeData.parentId)
        : null;
      let deleteList = this.getDeleteListById(this.activeNodeData);
      deleteList = [this.activeNodeData, ...deleteList];
      this.diagram.model.removeNodeDataCollection(deleteList);
      const deleteIds = deleteList.map((item) => item.id);
      this.nodeData = this.nodeData.filter(
        (item) => !deleteIds.includes(item.id)
      );
      if (downnode) {
        this.diagram.select(downnode);
      } else {
        if (upnode) this.diagram.select(upnode);
        else {
          if (parentNode) this.diagram.select(parentNode);
        }
      }
      this.$emit("deleteNode", deleteList);
    },
    _uuid() {
      const id = uuidv4();
      return id.replace(/-/g, "");
    },
    handleAdd(addTemplateCode = "") {
      // if (addTemplateCode) {

      //   return
      // }
      if (this.nodeData.length == 0) {
        this.addRoot(addTemplateCode);
      } else {
        this.addChildNode(addTemplateCode);
      }
    },
    addRoot(addTemplateCode) {
      let staticParams = DefaultAddNodeConfig;
      if (addTemplateCode) {
        staticParams = this.addNodeConfig[addTemplateCode];
      }
      let params = {
        id: this._uuid(),
        sortValue: 0,
        name: staticParams?.nodeLabel || "任务使命",
        tag: staticParams?.tag || "使命",
        parentId: "",
        _type: staticParams?._type || "",
        properties: {
          ...staticParams.template,
        },
      };
      for (const key in staticParams.matchCode) {
        const match = staticParams.matchCode[key];
        params.properties[match] = params[key];
      }
      this.diagram.model.addNodeData(params);
      this.nodeData.push(params);
      const node = this.diagram.findNodeForKey(params.id);
      this.diagram.select(node);
      this.$emit("addNode", params);
    },
    addChildNode(addTemplateCode) {
      if (!this.activeNodeData) {
        return this.$message.warning("先选择一个节点");
      }
      let staticParams = DefaultAddNodeConfig;
      if (addTemplateCode) {
        staticParams = this.addNodeConfig[addTemplateCode];
      }
      const params = {
        id: this._uuid(),
        sortValue: this.nodeData.length,
        name: (staticParams?.nodeLabel || "节点") + this.nodeData.length,
        tag:
          (staticParams?.tag || staticParams?.nodeLabel || "节点") +
          this.nodeData.length,
        parentId: this.activeNodeData.id,
        _type: staticParams?._type || "",
        properties: {
          ...staticParams.template,
        },
      };
      for (const key in staticParams.matchCode) {
        const match = staticParams.matchCode[key];
        params.properties[match] = params[key];
      }
      this.diagram.model.addNodeData(params);
      this.nodeData.push(params);
      this.$emit("addNode", params);
    },
    //上移
    upNode() {
      const node = findUpOrDownNode(this.diagram, this.activeNode, -1);
      if (node) {
        exchangeNodeValue(
          this.diagram,
          this.activeNode.data,
          node.data,
          "sortValue"
        );
        this.$emit("updateNode", [this.activeNode.data, node.data]);
      }
    },
    // 下移
    downNode() {
      const node = findUpOrDownNode(this.diagram, this.activeNode, 1);
      if (node) {
        exchangeNodeValue(
          this.diagram,
          this.activeNode.data,
          node.data,
          "sortValue"
        );
        this.$emit("updateNode", [this.activeNode.data, node.data]);
      }
    },
    export() {
      console.log("export");
    },
    onToolbarClick(data) {
      let code = data.code;
      switch (code) {
        case "save":
          // 保存
          this.saveDiagram();
          break;
        case "delete":
          // 删除
          this.handleDelete();
          break;
        case "add":
          // 添加
          this.handleAdd(data?.addTemplateCode || "");
          break;
        case "moveUp":
          // 上移
          this.upNode();
          break;
        case "moveDown":
          // 下移
          this.downNode();
          break;
        case "export":
          // 导出
          this.export();
          break;
        case "horizontal":
          // 导出
          this.changeAngle(0);
          break;
        case "vertical":
          // 导出
          this.changeAngle(90);
          break;

        default:
          break;
      }
    },
    changeNodeStyle(code) {
      const node = this.diagram.findNodeForKey(this.activeNodeData?.id);
      if (node) {
        this.diagram.model.setDataProperty(node.data, "_type", code);
        this.diagram.model.setDataProperty(node, "isSelected", false);
        this.diagram.select(node);
        this.$emit("updateNode", [node.data]);
      }
    },
    changeAngle(value) {
      changeLayoutAngle(this.diagram, { value });
    },
    saveDiagram() {
      this.$emit("saveDiagram", this.diagram.model.nodeDataArray);
    },
    updateActiveNodeData(params) {
      const node = this.diagram.findNodeForKey(this.activeNodeData?.id);
      if (node) {
        for (const key in params) {
          const element = params[key];
          this.diagram.model.setDataProperty(node.data, key, element);
        }
        this.diagram.model.setDataProperty(node, "isSelected", false);
        this.diagram.select(node);
      }
    },
  },
  components: {
    Toolbar,
    ContextMenu,
  },
};
</script>

<style lang="less" scoped>
.task-org-diagram {
  height: 100%;
  border-right: 1px solid #d8d8d8;
  main {
    height: calc(100% - 50px);
  }
}
</style>
