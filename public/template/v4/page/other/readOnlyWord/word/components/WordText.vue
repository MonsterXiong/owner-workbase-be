<template>
  <p
    ref="editorRef"
    class="WordText MsoNormal"
    :contenteditable="readOnly ? 'false' : 'plaintext-only'"
    :class="{ none: !value }"
    :style="{
      fontSize: nodeStyle?.fontSize + 'pt',
      fontFamily: nodeStyle?.fontFamily,
      fontWeight: nodeStyle?.fontWeight,
      textAlign: nodeStyle?.textAlign,
      textIndent: nodeStyle?.textIndent + 'pt',
      justifyContent: nodeStyle?.justifyContent,
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
  props: ['value', 'nodeStyle'],
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
      this.$emit('input', this.$refs.editorRef.innerHTML || this.value)
    },
    inputFocus() {
      this.isBlur = false
      this.$emit('inputFocus')
      this.$emit('input', this.$refs.editorRef.innerHTML || this.value)
    },
    inputBlur() {
      this.isBlur = true
    },
  },
}
</script>

<style scoped lang="less">
.none {
  &::before {
    content: '◀';
    color: rgba(0, 0, 0, 0.1);
    font-size: 12px;
  }
}
</style>
