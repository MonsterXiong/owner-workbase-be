<template>
  <div class="diagram-wrap">
    <div class="tool-bar"></div>
    <div id="demandModelDiagram"></div>
    <Editor />
  </div>
</template>

<script>
import Editor from './Editor.vue'
import { nodeTemplate, linkTemplate } from './gojsTemplate'
import * as go from 'gojs'
const $ = go.GraphObject.make

export default {
  name: 'DemandModelDiagram',
  components: { Editor },
  data() {
    return {
      diagram: null,
    }
  },
  mounted() {
    this.initDiagram()
  },
  methods: {
    initDiagram() {
      if (!this.diagram) {
        const diagram = $(go.Diagram, 'demandModelDiagram', {
          // 画布被点击事件
          click: (inputEvent) => {
            console.log(inputEvent, 'click---------------')
          },
        })
        diagram.nodeTemplate = nodeTemplate()
        diagram.linkTemplate = linkTemplate()
        this.diagram = diagram
        window.diagram = this.diagram
      }
      this.diagram.model.nodeDataArray = [
        {
          key: '123',
          text: '航空平台集成数据链系统',
          loc: '100 50',
        },
        {
          key: '456',
          text: '天基平台集成数据链系统',
          loc: '600 50',
        },
      ]
      this.diagram.model.linkDataArray = [
        {
          to: '456',
          from: '123',
          text: '航空平台系统交互信息',
        },
      ]
    },
  },
}
</script>

<style lang="less" scoped>
.diagram-wrap {
  height: 100%;
  position: relative;
  #demandModelDiagram {
    height: 100%;
  }
}
</style>
