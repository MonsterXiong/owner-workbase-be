<template>
  <component :is="rightComponent" :nodeData="nodeData" :formConfig="formConfig" @update="handleUpdate"></component>
</template>

<script>
import OperationPanel from './components/OperationPanel.vue'
export default {
  name: 'xydSystemInteractionAnalysisRight',
  props: {
    nodeData: {
      type: Object,
      default: () => {},
    },
  },
  components: { OperationPanel },
  data() {
    return {
      rightComponent: 'OperationPanel',
      formConfig: [
        {
          key: 'text',
          label: '名称',
          type: 'input',
          required: true,
        },
        {
          key: 'code',
          label: '标识',
          type: 'input',
          required: true,
        },
        {
          key: 'content',
          label: '交互信息内容',
          type: 'textarea',
          required: true,
          validatorFn: (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'))
            } else if (value !== this.ruleForm.pass) {
              callback(new Error('两次输入密码不一致!'))
            } else {
              callback()
            }
          },
        },
        {
          key: 'dataType',
          label: '数据格式',
          type: 'select',
          optionList: [
            {
              code: '1',
              label: 'xml',
            },
            {
              code: '2',
              label: 'json',
            },
          ],
        },
      ],
    }
  },
  mounted() {},
  methods: {
    handleUpdate(data) {
      this.$emit('updateNodeData', data)
    },
  },
}
</script>
