<template>
  <div class="demand-analyse-table-warp" ref="demandAnalyseTableRef">
    <div class="tool-wrap" ref="toolRef">
      <el-form :model="queryForm" inline size="small">
        <el-form-item label="交互内容名称">
          <el-input v-model="queryForm.name" placeholder="请输入"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="table-wrap">
      <el-table :datatype="tableData" border :height="tableHeight">
        <el-table-column type="index" label="序号" width="60"></el-table-column>
        <el-table-column v-for="(item, index) in tableColumn" :key="index" :label="item.label" :prop="item.prop"></el-table-column>
        <el-table-column label="操作"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DemandAnalyseTable',
  data() {
    return {
      queryForm: { name: '' },
      tableData: [],
      tableColumn: [
        {
          prop: '',
          label: '系统交互内容名称',
        },
        {
          prop: '',
          label: '源系统',
        },
        {
          prop: '',
          label: '目标系统',
        },
        {
          prop: '',
          label: '交互内容',
        },
        {
          prop: '',
          label: '数据格式',
        },
        {
          prop: '',
          label: '交换频率',
        },
        {
          prop: '',
          label: '交互手段',
        },
        {
          prop: '',
          label: '触发事件',
        },
        {
          prop: '',
          label: '保密要求',
        },
        {
          prop: '',
          label: '交互形式',
        },
      ],
      tableHeight: '300px',
    }
  },
  mounted() {
    this.setTableHeight()
  },
  methods: {
    setTableHeight() {
      this.$nextTick(() => {
        this.tableHeight = this.$refs.demandAnalyseTableRef.offsetHeight - this.$refs.toolRef.offsetHeight - 20 + 'px'
      })
    },
  },
}
</script>

<style lang="less" scoped>
.demand-analyse-table-warp {
  padding: 10px;
  height: 100%;
}
</style>
