<template>
  <div class="word-page">
    <div class="word really noPage">
      <div class="border top-left"></div>
      <div class="border top-right"></div>
      <div class="border bottom-left"></div>
      <div class="border bottom-right"></div>
      <article class="word-article">
        <div class="word-modal" v-for="modal in modalData" :key="modal.id">
          <component
            v-for="item in modal.content"
            :key="item.id"
            :is="item.type"
            :data="item"
            v-model="item.content"
            :nodeStyle="item.style || {}"
            :readOnly="true"
          ></component>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
import { uuid } from "@/utils/commonUtil";
import wordMixins from "./wordMixins";

export default {
  mixins: [wordMixins],
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      modalData: [],
    };
  },
  watch: {
    data: {
      handler(val) {
        this.initData();
      },
      immediate: true,
    },
  },
  methods: {
    initData() {
      this.modalData = this.data.map((modal, index) => {
        const content = Array.isArray(modal?.content) ? modal?.content : [];
        const list = [
          {
            type: "head",
            id: uuid(),
            isTransverse: false,
            content: `${index + 1}、${modal.name}`,
          },
        ];
        content.forEach((data) => {
          if (data.type === "table") {
            list.push({
              ...data,
              id: uuid(),
              headerData: (data?.headerData || []).map((head) => ({
                ...head,
                id: uuid(),
              })),
              content: (data?.content || []).map((arr) =>
                arr.map((tmp) => ({
                  ...tmp,
                  id: uuid(),
                }))
              ),
            });
          } else {
            list.push({
              ...data,
              id: uuid(),
            });
          }
        });
        return {
          ...modal,
          modalId: modal.id,
          id: uuid(),
          content: list.map((item) => this.tramsformData(item)),
        };
      });
    },
  },
};
</script>

<style lang="less" scoped>
::v-deep {
  @import "./word.less";
}
.word-page {
  background-color: #fff;
}
.word-modal {
  &:hover {
    outline: 1px dashed @base-theme-color;
  }
}
</style>
