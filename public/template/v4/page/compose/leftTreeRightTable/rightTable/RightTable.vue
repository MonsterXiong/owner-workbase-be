<template>
  <TableLayout>
    <template #query>
      <QuerySearch :searchList="searchList" @handleSearch="onSearch">
        <el-button type="danger" icon="el-icon-delete" size="small">批量刪除</el-button>
        <el-button id="createProjectButton" type="success" icon="el-icon-plus" size="small">{{ addText || '新增' }}</el-button>
      </QuerySearch>
    </template>
    <div class="main-container">
      <el-table size="small" border height="100%" :data="tableData" row-key="nodeId" @selection-change="onSelectionChange" tooltip-effect="light">
        <el-table-column type="selection" width="40px" align="center"> </el-table-column>
        <el-table-column type="index" label="序号" width="60px" align="center"> </el-table-column>
        <el-table-column prop="name" label="名称" min-width="120px" align="center"> </el-table-column>
        <el-table-column prop="code" label="标识" min-width="120px" align="center"> </el-table-column>
        <el-table-column label="操作" width="200px" align="center">
          <template slot-scope="{ row }">
            <el-button plain type="primary" icon="el-icon-edit" size="mini" @click="onEdit(row)">编辑</el-button>
            <el-button plain type="danger" icon="el-icon-delete" size="mini" @click="onBatchDelete([row])">刪除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div ref="paginationRef" class="pagination-wrapper">
      <el-pagination
        @size-change="onSizeChange"
        @current-change="onCurrentChange"
        :current-page="pageInfo.pageNum"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageInfo.pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageInfo.total"
      ></el-pagination>
    </div>
  </TableLayout>
</template>

<script>
import QuerySearch from './components/QuerySearch.vue'
export default {
  props: {
    tableData: {},
  },
  data() {
    return {
      searchList: [
        { label: '名称', code: 'name', type: 'input' },
        { label: '标识', code: 'code', type: 'input', options: [] },
      ],
      queryForm: {},
      multipleSelection: [],
      pageInfo: {
        pageNum: 1,
        pageSize: 20,
        total: 0,
      },
    }
  },
  components: {
    QuerySearch,
  },
  methods: {
    onSearch(data) {
      this.queryForm = data ? { ...data } : {}
      this.queryTableData()
    },
    onSizeChange(val) {
      this.pageInfo.pageSize = val
      this.queryTableData()
    },
    onCurrentChange(val) {
      this.pageInfo.pageNum = val
      this.queryTableData()
    },
    onSelectionChange(val) {
      this.multipleSelection = val
    },
  },
}
</script>

<style lang="less" scoped>
.main-container {
  height: calc(100% - 40px);
}
</style>
