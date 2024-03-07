<template>
  <p
    ref="editorRef"
    :data-content-before="titleText"
    class="WordText MsoNormal"
    :contenteditable="readOnly ? 'false' : 'plaintext-only'"
    :class="{ none: !value }"
    :style="{
      fontSize: nodeStyle?.fontSize + 'pt',
      fontFamily: nodeStyle?.fontFamily,
      fontWeight: nodeStyle?.fontWeight,
      textAlign: nodeStyle?.textAlign,
      textIndent: nodeStyle?.textIndent + 'pt',
      color: '#000',
    }"
    @input="inputText"
    @blur="inputBlur"
    @focus="inputFocus"
    @click="onClick"
  ></p>
</template>

<script>
import wordMixins from './wordMixins'

export default {
  props: ['value', 'nodeStyle', 'titleText'],
  mixins: [wordMixins],
  data() {
    return {
      isBlur: true,
    }
  },
  watch: {
    value: {
      handler(val) {
        if (this.isBlur && typeof val === 'string') {
          const text = val
          this.$nextTick(() => {
            this.$refs.editorRef.innerHTML = text
          })
        }
      },
      immediate: true,
    },
  },
  methods: {
    inputText() {
      this.$emit('input', this.$refs.editorRef.innerHTML)
    },
    inputFocus() {
      this.isBlur = false
      this.$emit('inputFocus')
    },
    inputBlur() {
      this.isBlur = true
    },
  },
}
</script>

<style scoped lang="less">
.WordText {
  &::before {
    content: attr(data-content-before);
    font-family: inherit;
    font-size: inherit;
    font-weight: inherit;
    color: inherit;
  }
}
.none {
  &::before {
    content: '◀';
    color: rgba(0, 0, 0, 0.1);
    font-size: 12px;
  }
}
</style>
