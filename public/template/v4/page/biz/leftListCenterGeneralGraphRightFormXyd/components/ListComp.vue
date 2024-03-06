<template>
  <div class="list-comp-wrap">
    <slot name="title" v-if="isHeader">
      <div class="header-title">{{ headerTitle }}</div>
    </slot>
    <div :class="['item-wrap', value === item.id ? 'active' : '']" v-for="item in listData" :key="item.id" @click="onItem(item)">
      {{ item.name }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'ListComp',
  props: {
    isHeader: {
      type: Boolean,
      default: false,
    },
    headerTitle: {
      type: String,
      default: '标题',
    },
    listData: {
      type: Array,
      default: () => [],
    },
    value: String,
  },
  methods: {
    onItem(item) {
      this.$emit('input', item.id)
    },
  },
}
</script>

<style lang="less" scoped>
.list-comp-wrap {
    width: 100%;
    height: 100%;
    background-color: #fff;

    .header-title {
        padding: 15px 10px;
        background: #1e86d5;
        color: #fff;
        text-align: center;
        font-size: 16px;
        font-weight: bold;
    }

    .item-wrap {
        padding: 20px 10px;
        font-size: 16px;
        text-align: center;
        border-bottom: 1px solid #ccc;
        cursor: pointer;

        &:hover {
            color: #02a7f0;
        }
    }

    .active {
        color: #02a7f0;
        font-weight: bold;
    }
}
</style>
