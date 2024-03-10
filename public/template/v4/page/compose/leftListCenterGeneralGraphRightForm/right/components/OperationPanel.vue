<template>
  <div class="operation-wrap">
    <div class="hed-title">{{ title }}</div>
    <div class="form-wrap">
      <el-form ref="formRef" :model="formData" :rules="rules" label-width="auto" label-position="right" size="small" :validate-on-rule-change="false">
        <el-form-item :label="item.label" :prop="item.key" v-for="item in formConfig" :key="item.key">
          <template v-if="item.type === 'input'">
            <el-input v-model="formData[item.key]"></el-input>
          </template>
          <template v-else-if="item.type === 'textarea'">
            <el-input type="textarea" v-model="formData[item.key]"></el-input>
          </template>
          <template v-else-if="item.type === 'select'">
            <el-select v-model="formData[item.key]" placeholder="请选择">
              <el-option v-for="opt in item.optionList" :key="opt.code" :label="opt.label" :value="opt.code"></el-option>
            </el-select>
          </template>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-wrap">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small" @click="saveForm">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationPanel',
  props: {
    nodeData: {
      type: Object,
      default: () => {},
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      title: '属性设置',
      formData: {},
      rules: {
        text: [{ required: true, message: '请输入节点名称', trigger: 'blur' }],
      },
      rulesType: ['select'],
    }
  },
  mounted() {
    this.setFormValidator()
  },
  methods: {
    setFormValidator() {
      const requiredList = this.formConfig.filter((item) => item.required)
      requiredList.map((item) => {
        let itemValidator = []
        this.$set(this.rules, item.key, [
          {
            required: true,
            message: `请${this.rulesType.includes(item.type) ? '选择' : '输入'}${item.label}`,
            trigger: `${this.rulesType.includes(item.type) ? 'change' : 'blur'}`,
          },
        ])
        if (item.validatorFn) {
          this.$set(this.rules, item.key)
        }
      })
    },
    saveForm() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          console.log(this.formData, 'formData------------')
          this.$emit('update', this.formData)
        }
      })
    },
  },
  watch: {
    nodeData: {
      handler() {
        if (!this.nodeData) {
          this.formData = {}
        } else {
          this.formData = _.cloneDeep(this.nodeData)
        }
      },
      immediate: true,
    },
  },
}
</script>

<style lang="less" scoped>
.operation-wrap {
  .hed-title {
    padding: 10px;
    background-color: #1e86d5;
    color: #fff;
    text-align: center;
    font-size: 18px;
  }
  .form-wrap {
    padding: 10px;
  }
  .btn-wrap {
    padding-right: 10px;
    text-align: right;
  }
}
</style>
