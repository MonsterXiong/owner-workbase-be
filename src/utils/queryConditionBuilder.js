
class QueryConditionBuilder {
    static getInstanceNoPage() {
      const instance = new QueryConditionBuilder()
      instance.sortParams = []
      instance.conditionParams = []
      return instance
    }
    static getInstance(pageNumber = 1, pageSize = 10, sortParams = []) {
      const instance = new QueryConditionBuilder()
      instance.pageNumber = pageNumber
      instance.pageSize = pageSize
      instance.sortParams = sortParams // 默认根据创建时间排序
      instance.conditionParams = []
      return instance
    }

    static getPageInstance(pageNumber = 1, pageSize = 10, sortParams = []) {
      const instance = new QueryConditionBuilder()
      instance.page = pageNumber
      instance.rows = pageSize
      instance.sortParams = sortParams // 默认根据创建时间排序
      instance.conditionParams = []
      return instance
    }

    filterIsFalse() {
      if (this.conditionParams && this.conditionParams.length > 0) {
        this.conditionParams = this.conditionParams.filter((item) => item.value)
      }
      return this
    }

    filter(predict = () => true) {
      if (this.conditionParams && this.conditionParams.length > 0) {
        this.conditionParams = this.conditionParams.filter((item) => predict(item.value))
      }
    }

    _buildQuery(property, value, symbol, combine) {
      this.conditionParams.push({
        combine,
        property,
        value,
        symbol,
      })
    }

    _buildSort(property, isDesc = true) {
      this.sortParams.push({
        property,
        isDesc,
      })
    }

    buildDescSort(property) {
      this._buildSort(property, true)
      return this
    }

    buildAscSort(property) {
      this._buildSort(property, false)
      return this
    }

    buildProperty() {}

    buildEqualQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '=', combine)
      return this
    }

    buildNotEqualQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '!=', combine)
      return this
    }

    buildGTQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '>', combine)
      return this
    }

    buildGEQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '>=', combine)
      return this
    }

    buildLTQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '<', combine)
      return this
    }

    buildLEQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, '<=', combine)
      return this
    }

    buildLikeQuery(property, value, combine = 'and') {
      this._buildQuery(property, value, 'like', combine)
      return this
    }

    buildInQuery(property, value, combine = 'and') {
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      this._buildQuery(property, value, 'in', combine)
      return this
    }

    buildNotInQuery(property, value, combine = 'and') {
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      this._buildQuery(property, value, 'not in', combine)
      return this
    }
    buildBetweenQuery(property, value, combine = 'and') {
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      this._buildQuery(property, value, 'between', combine)
      return this
    }

    buildNotBetweenQuery(property, value, combine = 'and') {
      if (Array.isArray(value)) {
        value = value.join(',')
      }
      this._buildQuery(property, value, 'not between', combine)
      return this
    }

    setPageNumber(pageNumber) {
      this.pageNumber = pageNumber
      return this
    }

    setPageSize(pageSize) {
      this.pageSize = pageSize
      return this
    }
  }

  export {  QueryConditionBuilder }
  export default QueryConditionBuilder
