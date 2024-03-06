<template>
  <base-dialog :title="dialogTitle" :width="dialogWidth" :visible.sync="visible" :before-close="onCancel">
    <div class="demand-view-wrap">
      <el-form :model="formData" ref="formRef" :rules="rules" size="medium" label-width="auto">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item prop="name" label="专题名称：">
              <el-input v-model="formData.name" placeholder="请输入专题名称"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="code" label="专题编码：">
              <el-input v-model="formData.code" placeholder="请输入专题编码"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="equip" label="装备：">
              <el-select v-model="formData.equip" placeholder="请选择装备" multiple clearable>
                <el-option v-for="item in enumData" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="demandType" label="需求类别：">
              <el-select v-model="formData.demandType" placeholder="请选择需求类别" multiple clearable>
                <el-option v-for="item in enumData" :key="item.key" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item prop="valueLimt" label="值：">
              <el-row>
                <el-col :span="8">
                  <el-select v-model="formData.valueLimt">
                    <el-option v-for="item in valueEnum" :key="item.value" :label="item.label" :value="item.value"></el-option>
                  </el-select>
                </el-col>
                <el-col :span="16">
                  <el-form-item prop="value" label-width="10px">
                    <el-input class="value-wrap" v-model="formData.value" placeholder="请输入值"></el-input>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item prop="desc" label="备注：">
              <el-input type="textarea" v-model="formData.desc" placeholder="请输入备注"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <div>
        <el-button size="medium" @click="onCancel">取 消</el-button>
        <el-button size="medium" type="primary" @click="onSubmit">确 定</el-button>
      </div>
    </div>
  </base-dialog>
</template>

<script>
export default {
  name: 'DemandViewDialog',
  data() {
    return {
      dialogTitle: '设置需求视图',
      dialogWidth: '700px',
      visible: false,
      formData: {
        name: '',
        code: '',
        equip: [],
        demandType: [],
        valueLimt: '>',
        value: '',
        desc: '',
      },
      enumData: [],
      valueEnum: [
        {
          label: '>',
          value: '>',
        },
        {
          label: '<',
          value: '<',
        },
        {
          label: '=',
          value: '=',
        },
        {
          label: '>=',
          value: '>=',
        },
        {
          label: '<=',
          value: '<=',
        },
      ],
      rules: {
        name: [{ required: true, message: '请输入专题名称', trigger: 'blur' }],
        code: [{ required: true, message: '请输入专题编码', trigger: 'blur' }],
        valueLimt: [{ required: true, message: '请选择', trigger: 'change' }],
        value: [{ required: true, message: '请输入值', trigger: 'blur' }],
      },
    }
  },
  methods: {
    show() {
      this.visible = true
    },
    onSubmit() {
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          // TODO 提交
        }
      })
    },
    onCancel() {
      this.visible = false
      this.$refs.formRef.resetFields()
      this.formData = {
        name: '',
        code: '',
        equip: [],
        demandType: [],
        valueLimt: '>',
        value: '',
        desc: '',
      }
    },
  },
}
</script>

<style lang="less" scoped>
.demand-view-wrap {
  .el-input,
  .el-select {
    width: 100%;
  }
}
</style>
