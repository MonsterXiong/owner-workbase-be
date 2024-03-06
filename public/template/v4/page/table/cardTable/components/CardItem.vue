<template>
  <div class="box-card">
    <div class="card-head" ref="cardHeadRef">
      <h3>{{ cardInfo.title }}</h3>
      <slot name="headRight">
        <div v-if="cardInfo.status" class="status-wrap">
          {{ cardInfo.status }}
        </div>
      </slot>
    </div>
    <slot name="cardContent">
      <div class="card-content" :style="{ height: `calc(100% - ${otherHeight}px - 10px)` }">
        {{ cardInfo.content }}
      </div>
      <div class="card-footer" ref="cardFooterRef">
        <div class="time-wrap">{{ cardInfo.time }}</div>
        <!-- medium -->
        <el-button type="primary" size="small" @click="onDesc">详情</el-button>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  name: 'SpecialCard',
  props: {
    cardInfo: {
      type: Object,
      default: () => {},
    },
  },
  data() {
    return {
      otherHeight: 0,
    }
  },
  mounted() {
    this.setotherHeight()
  },
  methods: {
    onDesc(item) {
      this.$emit('desc', item)
    },
    setotherHeight() {
      if (this.$refs.cardHeadRef) this.otherHeight += this.$refs.cardHeadRef.offsetHeight
      if (this.$refs.cardFooterRef) this.otherHeight += this.$refs.cardFooterRef.offsetHeight
    },
  },
}
</script>

<style lang="less" scoped>
@import './variables.less';

.box-card {
  padding: 20px;
  height: 100%;
  background-color: @cardBgColor;
  border: 1px solid @cardBorderColor;
  border-radius: 5px;
  &:hover {
    box-shadow: 1px 2px 3px @cardTitleColor;
  }
  .card-head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
    h3 {
      margin: 0;
      color: @cardTitleColor;
      font-size: 20px;
    }
    .status-wrap {
      color: @cardStatusColor;
    }
  }
  .card-content {
    color: @cardContentColor;
    line-height: 1.5;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 8;
    -webkit-box-orient: vertical;
  }
  .card-footer {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: @cardContentColor;
  }
}
</style>
