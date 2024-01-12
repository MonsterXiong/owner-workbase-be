<template>
    <BasePage>
      <template #query>
        <ExpertProfessionalTitle0Query
          @onAdd="onAdd"
          @onQuery="queryTableData"
          @onBatchDelete="onBatchDelete"
          @onReset="onReset"
          :queryForm.sync="queryForm"
        ></ExpertProfessionalTitle0Query>
      </template>
  
      <ExpertProfessionalTitle0Table
        @selection-change="onSelectionChange"
        :pageInfo.sync="pageInfo"
        :tableData="tableData"
        :total="total"
        @onEdit="onEdit"
        @onDelete="onDelete"
      ></ExpertProfessionalTitle0Table>
      
      <ExpertProfessionalTitle0Dialog ref="dialogRef" @refresh="queryTableData"></ExpertProfessionalTitle0Dialog>
    </BasePage>
  </template>
  
  <script>
  import { QueryConditionBuilder } from '@/utils/common/queryConditionBuilder'
  import ExpertProfessionalTitle0Dialog from './components/ExpertProfessionalTitle0Dialog.vue'
  import ExpertProfessionalTitle0Table from './components/ExpertProfessionalTitle0Table.vue'
  import ExpertProfessionalTitle0Query from './components/ExpertProfessionalTitle0Query.vue'
  export default {
    data() {
      return {
        tableData: [],
        queryForm: {},
        total: 0,
        pageInfo: {
          rows: 20,
          page: 1,
        },
        multipleSelection: [],
      }
    },
    components: {
      ExpertProfessionalTitle0Dialog,
      ExpertProfessionalTitle0Table,
      ExpertProfessionalTitle0Query,
    },
    watch: {
      pageInfo: {
        handler(newValue) {
          this.queryTableData()
        },
        deep: true,
      },
    },
    mounted() {
      this.queryTableData()
    },
    methods: {
      // 新增
      onAdd() {
        this.$refs.dialogRef.show({ title: `新增文档` })
      },
      // 删除
      async handleDelete(rows) {
        if (Array.isArray(rows) && !rows.length) {
          return this.$tools.message(`请勾选要删除的文档信息！`, { type: 'warning' })
        }
        const name = rows.map((item) => item.name).join('，')
        try {
          await this.$tools.confirm('请确认是否删除【' + name + '】信息？')
          const { code } = await this.$api.ExpertProfessionalTitle0Service.deleteExpertProfessionalTitle0Batch(rows.map((row) => row.documentId))
          if (code === 200) this.$tools.message('删除成功')
          this.queryTableData()
        } catch (e) {
          if (e == 'cancel') return this.$tools.message('已取消删除', { type: 'info' })
          console.error('删除失败', e)
        }
      },
      onBatchDelete() {
        this.handleDelete(this.multipleSelection)
      },
      // 编辑
      onEdit(row) {
        this.$refs.dialogRef.show({ row, title: `编辑文档` })
      },
      // 删除
      onDelete(row) {
        this.handleDelete([row])
      },
      onSelectionChange(val) {
        this.multipleSelection = val
      },
      refreshPagination() {
        this.pageInfo = {
          rows: 20,
          page: 1,
        }
      },
      onReset() {
        Object.keys(this.queryForm).forEach((key) => {
          this.queryForm[key] = ''
        })
        this.refreshPagination()
      },
      async queryTableData() {
        let queryCondition = QueryConditionBuilder.getInstance(this.pageInfo.page, this.pageInfo.rows)
        Object.keys(this.queryForm).forEach((key) => {
          if (this.queryForm[key] || this.queryForm[key] == 0) {
            queryCondition.buildLikeQuery(key, this.queryForm[key])
          }
        })
        const { data, count } = await this.$api.ExpertProfessionalTitle0Service.queryExpertProfessionalTitle0(queryCondition)
        this.tableData = data
        this.total = count
      },
    },
  }
  </script>
  
  <style lang="less" scoped></style>
  