<template>
  <div class="form-wrap">
    <div class="form-main">
      <el-form :label-position="labelPosition" label-width="80px" :model="form" size="small" :rules="rules" ref="missionFormRef">
        <el-form-item label="节点名称" prop="name">
          <el-input v-model="form.name"></el-input>
          <!-- @change="onFormChange" -->
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="form.code"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input v-model="form.remark" type="textarea"></el-input>
        </el-form-item>

        <el-form-item label="指标">
          <div class="table-wrap" style="height: 300px">
            <EditTable :defaultTableData="indexTableData" :columnList="columnList" ref="indexTableRef"></EditTable>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <footer>
      <el-button size="small" type="primary" @click="onSubmitForm">保存</el-button>
    </footer>
  </div>
</template>

<script>
import EditTable from '../editTable/EditTable.vue'
const staticFormData = {
  name: '',
  remark: '',
}
export default {
  props: {
    currentNodeData: { type: Object },
  },
  data() {
    return {
      labelPosition: 'right',
      form: staticFormData,
      rules: {
        name: { required: true, message: '请输入节点名称', check: 'blur' },
        code: { required: true, message: '请输入节点标识', check: 'blur' },
      },
      columnList: [
        {
          code: 'indexName',
          type: 'input',
          label: '名称',
        },
        {
          code: 'indexValue',
          type: 'input',
          label: '指标值',
        },
        {
          code: 'indetUnit',
          type: 'input',
          label: '指标单位',
        },
      ],
      indexTableData: [],
    }
  },
  watch: {
    currentNodeData: {
      handler() {
        this.form = Object.assign({}, this.currentNodeData.properties || staticFormData)
      },
      immediate: true,
    },
  },
  methods: {
    onFormChange() {
      this.onSubmitForm()
    },
    onSubmitForm() {
      this.$refs.missionFormRef.validate(async (valid) => {
        if (valid) {
          this.$emit('submitForm', { ...this.form })
        } else {
          console.error('error submit!!')
          return false
        }
      })
      this.updateIndexTable()
    },
    updateIndexTable() {
      let tableData = this.$refs.indexTableRef.getTableData()
      // todo 需要加校验
      console.log(tableData, '当前指标表格,看要不要保存')
    },
  },
  components: {
    EditTable,
  },
}
</script>

<style lang="less" scoped>
.form-wrap {
  height: 100%;
  .form-main {
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
