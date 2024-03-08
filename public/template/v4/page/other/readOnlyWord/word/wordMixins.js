import WordText from './components/WordText'
import WordImg from './components/WordImg'
import WordTable from './components/WordTable'
import WordPosti from './components/WordPosti'
import WordHeadLine from './components/WordHeadLine'
import { WordContentType, ContentType, DefaultWordTextStyle, DefaultTableHeaderStyle, DefaultTableContentStyle, WordDefaultType } from './constants'

export default {
  components: { WordText, WordImg, WordTable, WordPosti, WordHeadLine },
  methods: {
    tramsformData(data) {
      if (data.type === 'table') {
        let tableData = []
        if (data.headerData && data.headerData.length > 0) {
          tableData.push(
            data.headerData.map((item) => ({
              ...item,
              style: {
                ...DefaultTableHeaderStyle,
                ...(item.style || {}),
              },
            }))
          )
        }
        if (data.content && data.content.length > 0) {
          data.content.forEach((arr) => {
            tableData.push(
              arr.map((item) => ({
                ...item,
                style: {
                  ...DefaultTableContentStyle,
                  ...(item.style || {}),
                },
              }))
            )
          })
        }
        return {
          ...data,
          type: WordContentType[data.type],
          id: data.id,
          _id: data.id,
          sort: data.sort,
          isTransverse: data.isTransverse,
          content: tableData,
        }
      }
      return {
        ...data,
        type: WordContentType[data.type],
        id: data.id,
        _id: data.id,
        content: data?.content,
        sort: data.sort,
        isTransverse: data.isTransverse,
        style: {
          ...WordDefaultType[data.type],
          ...(data.style || {}),
        },
      }
    },
  },
}
