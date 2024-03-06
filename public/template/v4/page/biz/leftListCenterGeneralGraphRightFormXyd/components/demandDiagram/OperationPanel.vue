<template>
  <div class="operation-wrap">
    <div class="hed-title">{{ title }}</div>
    <div class="form-wrap">
      <el-form :model="formData" label-width="auto" size="small">
        <el-form-item label="关系名称" prop="linkName">
          <el-input v-model="formData.linkName"></el-input>
        </el-form-item>
        <el-form-item label="标识" prop="code">
          <el-input v-model="formData.code"></el-input>
        </el-form-item>
        <el-form-item label="交互信息内容" prop="content">
          <el-input type="textarea" v-model="formData.content"></el-input>
        </el-form-item>
        <el-form-item label="数据格式" prop="dataType">
          <el-select v-model="formData.dataType" placeholder="请选择">
            <el-option label="xml" value="xml"></el-option>
            <el-option label="json" value="json"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="保密要求" prop="secrecyLevel">
          <el-select v-model="formData.secrecyLevel" placeholder="请选择">
            <el-option label="公开" value="0"></el-option>
            <el-option label="秘密" value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="交换频率" prop="frequency">
          <el-input v-model="formData.frequency"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn-wrap">
      <el-button size="small">取消</el-button>
      <el-button type="primary" size="small">保存</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'OperationPanel',
  data() {
    return {
      title: '属性设置',
      formData: {
        linkName: '',
        code: '',
        content: '',
        dataType: '',
        secrecyLevel: '',
        frequency: '',
      },
    }
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
