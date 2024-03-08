<template>
  <div class="panel">
    <div class="tip">提示：可选中模型通过拖拽方式将模型内容加入绘图区</div>
    <div class="modal-list">
      <div class="modal" v-for="item in modalData" :key="item.id" draggable @dragstart="onDragStart($event, item)">
        {{ item.name }}
      </div>
    </div>
  </div>
</template>

<script>
import { uuid } from '@/utils/commonUtil'
export default {
  data() {
    return {
      modalData: [
        {
          id: uuid(),
          name: '任务分析与输出模型',
          content: [
            {
              type: 'text',
              id: uuid(),
              isTransverse: false,
              content: '任务分析与输出模型针对XXXXXX使命任务进行分解，分别是XXX任务、XXXX任务、XXXX任务以及XXX任务。',
            },
            {
              type: 'img',
              id: uuid(),
              isTransverse: false,
              content: 'http://192.168.2.204:8037/picture/2024-01/60c8a47e45d54d8f8125f88c93fdfd5a.png',
              title: '任务分析与输出模型图',
              isShowTitle: true,
            },
          ],
        },
        {
          id: uuid(),
          name: '测试表格',
          content: [
            {
              type: 'text',
              id: uuid(),
              isTransverse: false,
              content: 'XXXX如下图所示。',
            },
            {
              type: 'table',
              id: uuid(),
              isTransverse: false,
              headerData: [
                {
                  id: uuid(),
                  content: '序号',
                  width: 30,
                },
                {
                  id: uuid(),
                  content: '名称',
                  width: 100,
                },
              ],
              content: [
                [
                  {
                    id: uuid(),
                    content: '1',
                  },
                  {
                    id: uuid(),
                    content: '名字1',
                  },
                ],
                [
                  {
                    id: uuid(),
                    content: '2',
                  },
                  {
                    id: uuid(),
                    content: '名字2',
                  },
                ],
              ],
              title: '表格标题',
              isShowTitle: true,
            },
          ],
        },
      ],
    }
  },

  methods: {
    onDragStart(event, data) {
      event.dataTransfer.setData('data', JSON.stringify(data))
    },
  },
}
</script>

<style scoped lang="less">
.panel {
  height: 100%;
  width: 100%;
  padding: 5px;
  .tip {
    width: 100%;
    text-align: center;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    margin-bottom: 10px;
  }

  .modal {
    height: calc(100% - 30px);
    overflow-y: auto;

    padding: 10px;
    border: 1px solid #d8dce5;
    cursor: pointer;

    &:not(:last-child) {
      margin-bottom: 10px;
    }
    &:hover {
      border-color: #1e86d5;
      color: #1e86d5;
    }
  }
}
</style>
