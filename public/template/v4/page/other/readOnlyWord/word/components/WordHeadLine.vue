<template>
  <h3
    ref="editorRef"
    :contenteditable="readOnly ? 'false' : 'plaintext-only'"
    :style="{
      fontSize: nodeStyle?.fontSize + 'pt',
      fontFamily: nodeStyle?.fontFamily,
      fontWeight: nodeStyle?.fontWeight,
      textAlign: nodeStyle?.textAlign,
      textIndent: (nodeStyle?.fontSize || 0) * (nodeStyle?.textIndent || 0) + 'pt',
      justifyContent: nodeStyle?.justifyContent,
      color: '#000',
    }"
    @input="inputText"
    @blur="inputBlur"
    @focus="inputFocus"
    @click="onClick"
  ></h3>
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
