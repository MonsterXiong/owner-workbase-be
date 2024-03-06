<template>
  <div class="add-comp">
    <template v-if="isBtn">
      <el-button
        :type="btnConfig.type"
        :size="btnConfig.size"
        :style="{
          backgroundColor: btnConfig.bgColor ? btnConfig.bgColor : '',
          borderColor: btnConfig.bgColor ? btnConfig.bgColor : '',
        }"
        @click="onAdd"
        ><i :class="btnConfig.icon"></i>新增</el-button
      >
    </template>
    <template v-else>
      <div class="card-wrap" @click="onAdd">
        <div class="icon-wrap">
          <i :class="cardConfig.icon"></i>
        </div>
        <h3>{{ cardConfig.title }}</h3>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: 'AddComp',
  props: {
    isBtn: {
      type: Boolean,
      default: false,
    },
    btnConfig: {
      type: Object,
      default: () => {
        return {
          size: 'medium',
          bgColor: '',
          type: 'primary',
          icon: 'el-icon-circle-plus-outline',
        }
      },
    },
    cardConfig: {
      type: Object,
      default: () => {
        return {
          title: '设置需求视图',
          icon: 'el-icon-plus',
        }
      },
    },
  },
  data() {
    return {}
  },
  methods: {
    onAdd() {
      this.$emit('add')
    },
  },
}
</script>

<style lang="less" scoped>
@import './variables.less';

.add-comp {
  height: 100%;
  & > .el-button {
    i {
      vertical-align: middle;
      margin-right: 5px;
    }
  }
  .card-wrap {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: @addCardBgColor;
    border: 1px solid @addCompBorderColor;
    border-radius: 5px;
    cursor: pointer;
    .icon-wrap {
      width: 40px;
      height: 40px;
      margin-right: 30px;
      background-color: @addCompColor;
      border-radius: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      i {
        font-size: 30px;
        color: white;
      }
    }
    h3 {
      color: @addCompColor;
      font-size: 30px;
    }
  }
}

</style>
