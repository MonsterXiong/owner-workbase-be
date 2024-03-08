<template>
  <p class="WordImg MsoNormal" @focus="onFocus" @click.stop="onClick">
    <img :style="imgStyle" ref="imgRef" @load="loadImg" :src="value.includes('http') ? value : configData.baseUrl + value" />
    <!-- <WordTitle
      v-show="data?.isShowTitle"
      :titleText="`图 ${data?.sort} `"
      @click.stop="setCurrerntNode"
      class="MsoCaption"
      :nodeStyle="DefaultTitleStyle"
      @input="onInput"
      :value="data?.title || ''"
      :readOnly="readOnly"
    /> -->
    <WordTitle
      v-show="data?.isShowTitle"
      @click.stop="setCurrerntNode"
      class="MsoCaption"
      :nodeStyle="DefaultTitleStyle"
      @input="onInput"
      :value="data?.title || ''"
      :readOnly="readOnly"
    />
  </p>
</template>

<script>
import configData from '@/utils/config'
import { DefaultTitleStyle, cm, a4Width, a4Height, a4WidthPadding, a4HeightPadding, a4InnerWidth, a4InnerHeight } from '../constants'
import wordMixins from './wordMixins'
import WordTitle from './WordTitle'

export default {
  components: { WordTitle },
  props: {
    data: {
      type: Object,
      default: () => {},
    },
  },
  mixins: [wordMixins],
  data() {
    return {
      lock: true,
      cm,
      a4InnerWidth,
      a4InnerHeight,
      DefaultTitleStyle,
      configData,
    }
  },
  computed: {
    imgStyle() {
      let style = ''
      if (this.data && this.data.width && this.data.height) style += `width: ${this.data.width * cm}pt; height: ${this.data.height * cm}pt;`
      return style
    },
  },
  methods: {
    setCurrerntNode() {
      this.$emit('setCurrerntNode', this.data, this)
    },
    loadImg() {
      const { width } = this.$el.getBoundingClientRect()
      const { naturalWidth, naturalHeight } = this.$refs.imgRef
      const pxTopt = width / a4InnerWidth
      const ptTopx = a4InnerWidth / width
      let imgWidth = 10
      let imgHeight = 10
      if (this.data?.width && this.data?.height) {
        imgWidth = this.data.width
        imgHeight = this.data.height
      } else {
        imgWidth = (naturalWidth * pxTopt) / cm
        imgHeight = (naturalHeight * pxTopt) / cm
      }
      // 最宽不能超过文档宽度
      if (imgWidth * cm > width) {
        imgWidth = a4InnerWidth / cm
        imgHeight = imgWidth * (naturalHeight / naturalWidth)
      } else if (imgHeight * cm > a4InnerHeight) {
        imgHeight = a4InnerHeight / cm
        imgWidth = imgHeight * (naturalWidth / naturalHeight)
      }
      this.$set(this.data, 'width', imgWidth)
      this.$set(this.data, 'height', imgHeight)
      this.$emit('refreshWordLayout')
    },
    onChangeWidth(value, oldValue) {
      if (this.lock) {
        this.$set(this.data, 'height', value * (this.data.height / oldValue))
      }
    },
    onChangeHeight(value, oldValue) {
      if (this.lock) {
        this.$set(this.data, 'width', value * (this.data.width / oldValue))
      }
    },
    onFocus() {
      //
    },
    onInput(val) {
      if (typeof val === 'string') {
        this.$set(this.data, 'title', val)
      }
    },
  },
}
</script>

<style scoped lang="less">
.WordImg {
  position: relative;
  img {
    max-width: 100%;
  }
  &:focus {
    outline: @base-theme-color auto 1px;
  }
  &:hover {
    .editSize {
      visibility: initial;
    }
  }
  .editSize {
    border: 1px dashed @base-theme-color;
    border-bottom: 0;
    z-index: 2;
    visibility: hidden;
    padding: 2px 5px 2px 2px;
    background: #ffffffe6;
    font-size: 0;
    left: -1px;
    top: -33px;
    position: absolute;
    display: flex;
    align-items: center;
    gap: 5px;
    ::v-deep {
      .el-form-item--mini.el-form-item, .el-form-item--small.el-form-item {
        margin-bottom: 0px;
      }
    }
  }

  ::v-deep {
    .el-input-number {
      position: relative;

      &::after {
        position: absolute;
        content: '厘米';
        top: 0px;
        font-size: 12px;
        right: 38px;
      }
    }
    .el-input-number.is-controls-right .el-input__inner {
      padding-left: 10px;
      padding-right: 63px;
    }
    .el-checkbox__label {
      font-size: 12px;
      padding-left: 5px;
      color: #000;
    }
  }
}
.WordImg.MsoNormal {
  text-align: center;
  margin-top: 2px;
}
</style>
