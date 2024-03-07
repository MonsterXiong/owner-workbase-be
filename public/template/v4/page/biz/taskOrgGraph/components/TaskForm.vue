<template>
  <el-form
    :label-position="labelPosition"
    label-width="80px"
    :model="form"
    size="small"
    :rules="rules"
    ref="tarkFormRef"
  >
    <el-form-item label="任务名称" prop="taskName">
      <el-input v-model="form.taskName" @change="onFormChange"></el-input>
    </el-form-item>
    <el-form-item label="任务目标">
      <el-input v-model="form.target" @change="onFormChange"></el-input>
    </el-form-item>
    <el-form-item label="任务时间">
      <el-input v-model="form.time" @change="onFormChange"></el-input>
    </el-form-item>
    <el-form-item label="任务区域">
      <el-input v-model="form.areaName" @change="onFormChange"></el-input>
    </el-form-item>
    <el-form-item label="描述">
      <el-input
        v-model="form.remark"
        type="textarea"
        @change="onFormChange"
      ></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
const staticFormData = {
  taskName: "",
  area: "",
  target: "",
  areaName: "",
  type: "",
};
export default {
  props: {
    currentNodeData: { type: Object },
  },
  data() {
    return {
      labelPosition: "right",
      form: staticFormData,
      rules: {
        taskName: { required: true, message: "请输入任务名称", check: "blur" },
      },
    };
  },
  watch: {
    currentNodeData: {
      handler() {
        this.form = Object.assign(
          {},
          this.currentNodeData.properties || staticFormData
        );
      },
      immediate: true,
    },
  },
  methods: {
    onFormChange() {
      this.getFormData();
    },
    getFormData() {
      this.$refs.tarkFormRef.validate(async (valid) => {
        if (valid) {
          this.$emit("submitForm", { ...this.form });
        } else {
          console.error("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style></style>
