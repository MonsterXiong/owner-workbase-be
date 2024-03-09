<template>
  <div class="query-search">
    <el-form :model="queryForm" :inline="true" size="small">
      <el-form-item v-for="formItem in searchList" :key="formItem.code" :label="formItem.label">
        <el-input v-model="queryForm[formItem.code]" v-if="formItem.type == 'input'" clearable></el-input>
        <el-select v-model="queryForm[formItem.code]" placeholder="请选择" v-if="formItem.type == 'select'" clearable>
          <el-option v-for="item in formItem.options" :key="item.id" :label="item.name" :value="item.id"> </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button :loading="queryLoading" type="primary" icon="el-icon-search" size="small" @click="handleSearch">查询</el-button>
        <el-button icon="el-icon-refresh-right" size="small" @click="handleReset">重置</el-button>
        <slot></slot>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    queryLoading: {
      type: Boolean,
      default: false,
    },
    searchList: {
      type: Array,
    },
  },
  data() {
    return {
      queryForm: {},
    }
  },
  methods: {
    handleSearch() {
      this.$emit('handleSearch', this.queryForm)
    },
    handleReset() {
      this.queryForm = {}
    },
  },
}
</script>

<style lang="less" scoped>
.query-search {
  position: absolute;
  height: 100%;
  display: flex;
  align-items: center;
}
::v-deep {
  .el-form-item {
    margin-bottom: 0px;
  }
}
</style>
