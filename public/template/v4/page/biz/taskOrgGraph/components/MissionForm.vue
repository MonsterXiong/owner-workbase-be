<template>
  <el-form
    :label-position="labelPosition"
    label-width="80px"
    :model="form"
    size="small"
    :rules="rules"
    ref="missionFormRef"
  >
    <el-form-item label="使命名称" prop="missionName">
      <el-input v-model="form.missionName" @change="onFormChange"></el-input>
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
    <el-form-item label="描述" @change="onFormChange">
      <el-input v-model="form.remark" type="textarea"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
const staticFormData = {
  missionName: "",
  remark: "",
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
        missionName: {
          required: true,
          message: "请输入使命名称",
          check: "blur",
        },
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
      this.$refs.missionFormRef.validate(async (valid) => {
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
