export default {
  props: ['value', 'readOnly'],
  methods: {
    onClick(ev) {
      this.$emit('click', ev)
    },
  },
}
