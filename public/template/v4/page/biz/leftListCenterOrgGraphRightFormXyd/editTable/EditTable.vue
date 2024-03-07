<template>
  <div class="table-wrapper">
    <el-table size="small" border height="100%" :data="tableData" :row-key="rowKey" ref="tableRef">
      <el-table-column type="index" label="序号" width="45px" align="center" v-if="isShowIndex"> </el-table-column>
      <el-table-column :prop="column.code" :label="column.label" align="center" v-for="column in columnList" :key="column.code">
        <template slot-scope="{ row }">
          <el-input v-model="row[column.code]"></el-input>
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center" fixed="right" width="50">
        <template slot-scope="{ row }">
          <i class="el-icon-delete delete-icon" @click="onDelete(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-button type="success" @click="onAdd" icon="el-icon-circle-plus-outline" style="width: 100%">{{ addLabel ? addLabel : '新增' }}</el-button>
  </div>
</template>

<script>
import { uuid } from '@/utils/commonUtil'
export default {
  props: {
    defaultTableData: {
      type: Array,
      default: () => [],
    },
    isShowIndex: {
      type: Boolean,
      default: false,
    },
    columnList: {
      type: Array,
      default: () => [],
      required: true,
    },
    rowKey: {
      type: String,
      default: 'uid',
    },
    staticRow: {
      type: Object,
      default: () => {},
    },
    addLabel: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      tableData: [],
    }
  },
  watch: {
    defaultTableData: {
      handler() {
        this.setTableData()
      },
    },
  },
  methods: {
    setTableData() {
      this.tableData = this.defaultTableData.map((ele) => {
        return { ...ele }
      })
    },
    onDelete(row) {
      this.tableData = this.tableData.filter((ele) => ele[this.rowKey] != row[this.rowKey])
      // this.$emit('deleteTableData', row[this.rowKey])
    },
    onAdd() {
      let row = { [this.rowKey]: uuid(), ...this.staticRow }
      this.tableData.push(row)
      // this.$emit('addTableData', row)
    },
    getTableData() {
      return [...this.tableData]
    },
  },
}
</script>

<style lang="less" scoped>
.table-wrapper {
  height: 100%;
  .delete-icon {
    cursor: pointer;
    font-size: 16px;
  }
  .delete-icon:hover {
    color: #f7453f;
  }
}
</style>
