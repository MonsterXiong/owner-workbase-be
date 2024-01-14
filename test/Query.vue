<template>
  <el-form :model="queryForm" size="small" :inline="true" class="query-form-container">
    <el-form-item label="指标名称" prop="name">
      <el-input v-model.trim="formData.name" placeholder="请输入指标名称"></el-input>
    </el-form-item>
    <el-form-item label="所属能力" prop="bindAbi">
      <el-select v-model="formData.bindAbi" clearable placeholder="请选择所属能力">
        <el-option v-for="item in bindAbiOption || []" :key="item.bindAbiId" :label="item.abiName" :value="item.bindAbiId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="项目阶段" prop="stage">
      <el-select v-model="formData.stage" clearable placeholder="请选择项目阶段">
        <el-option v-for="item in stageOption || []" :key="item.bindStageId" :label="item.name" :value="item.bindStageId"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="操作">
      <div class="btn-container">
        <el-button type="primary" icon="el-icon-search" @click="onQuery">查询</el-button>
        <el-button icon="el-icon-refresh" @click="onReset">重置</el-button>
        <el-button type="success" icon="el-icon-circle-plus-outline" @click="onAdd">新增</el-button>
        <el-button type="danger" icon="el-icon-delete" @click="onBatchDelete">批量删除</el-button>
      </div>
    </el-form-item>
  </el-form>
</template>

<script>
import { QueryConditionBuilder } from '@/utils/queryConditionBuilder'
import { AbiService, StageService } from '@/services'
export default {
  data () {
    return {
      bindAbiOption: []
      stageOption: []
    }
  },
  props: {
    queryForm: {},
  },
  async mounted(){
    await this.initOption()
  },
  methods: {
    async initOption(){
      await this.getAbiOption()
      await this.getStageOption()
    },
    async getAbiOption(){
      let queryCondition = QueryConditionBuilder.getInstanceNoPage()
      const { data } = await getAbiOption.queryList(queryCondition)
      this.abiOption = data
    },
    async getStageOption(){
      let queryCondition = QueryConditionBuilder.getInstanceNoPage()
      const { data } = await getStageOption.queryList(queryCondition)
      this.stageOption = data
    },
    onQuery() {
      this.$emit('onQuery')
    },
    onReset() {
      this.$emit('onReset')
    },
    onAdd() {
      this.$emit('onAdd')
    },
    onBatchDelete() {
      this.$emit('onBatchDelete')
    },
  },
}
</script>

<style lang="less" scoped></style>
