<template>
  <el-form :label-position="labelPosition" label-width="80px" :model="form" size="small" :rules="rules">
    <el-form-item label="使命名称" prop="name">
      <el-input v-model="form.name"></el-input>
    </el-form-item>
    <!-- <el-form-item label="使命目标">
      <el-input v-model="form.target"></el-input>
    </el-form-item> -->
    <!-- <el-form-item label="使命时间">
      <el-input v-model="form.time"></el-input>
    </el-form-item>
    <el-form-item label="使命区域">
      <el-input v-model="form.area"></el-input>
    </el-form-item> -->
    <el-form-item label="描述">
      <el-input v-model="form.remark" type="textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data() {
    return {
      labelPosition: 'right',
      form: {
        name: '',
        area: '',
        type: '',
      },
      rules: {
        name: { required: true, message: '请输入使命名称', check: 'blur' },
      },
    }
  },
}
</script>

<style></style>
