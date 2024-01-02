const WHERE_TYPE = {
  IN: 'In',
  NOT_IN: 'NotIn',
  LIKE: 'Like',
  EQUAL: 'Equal',
}

const SORT_TYPE = {
  DESC: 'DESC',
  ASC: 'ASC'
}

function genWhere(condition) {
  // code1+=`.where('menu_code = :menu_code',{menu_code:'8'})`
  // const name = '%7%'
  // code1+=`.andWhere('name LIKE :name',{name: '${name}'})`
  // const names = [87]
  // code1+=`.andWhere('name IN (:...names)',{names:[${names}]})`
  // const names = [87]
  // code1+=`.andWhere('name NOT IN (:...names)',{names:[${names}]})`
  // combine暂时不考虑
  const { property, symbol, value, combine } = condition

  if (symbol == WHERE_TYPE.EQUAL) {
    return `'${property} = :${property}',{${property} : ${value}}`
  } else if (symbol == WHERE_TYPE.IN) {
    const values = value && value.join(',')
    return `'${property} IN (:...${property}s)',{${property}s : [${values}]}`
  } else if (symbol == WHERE_TYPE.NOT_IN) {
    const values = value && value.join(',')
    return `'${property} NOT IN (:...${property}s)',{${property}s : [${values}]}`
  } else if (symbol == WHERE_TYPE.LIKE) {
    return `'${property} LIKE :${property}',{${property} : '%${value}%'}`
  } else {
    return ""
  }
}

function getWhereCode(condition, index) {
  let result = ''
  const code = genWhere(condition)
  if (code) {
    // if (index == 0) {
    if (index == -1) {
      result = `.where(${code})`
    } else {
      result = `.andWhere(${code})`
    }
  }
  return result
}

function getPageCode({ pageNumber, pageSize }) {
  let result = ""
  if (pageNumber && pageSize) {
    result = `.offset(${(pageNumber - 1) * pageSize}).limit(${pageSize})`
  }
  return result
}



function genOrderBy(condition, index) {
  // propertyType暂时不考虑
  const { property, propertyType, isDesc } = condition
  let result = ''
  const sortType = isDesc ? SORT_TYPE.DESC : SORT_TYPE.ASC
  if (index == 0) {
    result = `.orderBy('${property}','${sortType}')`
  } else {
    result = `.addOrderBy('${property}','${sortType}')`
  }
  return result
}

function getFilterCode(conditionParams) {
  let result = ''
  if (conditionParams.length) {
    conditionParams.forEach((condition, index) => {
      result += getWhereCode(condition, index)
    })
  }
  return result
}

function getSortCode(sortParams) {
  let result = ''
  if (sortParams.length) {
    sortParams.forEach((condition, index) => {
      result += genOrderBy(condition, index)
    })
  }

  return result
}

function getCode(params) {
  const { conditionParams, sortParams, pageNumber, pageSize } = params
  let code = ".where('isdel = :isdel',{isdel: 0})"
  if (conditionParams.length || sortParams.length) {
    code += getFilterCode(conditionParams)
    code += getSortCode(sortParams)
    // code+=getPageCode({pageNumber,pageSize})
  } else {
    // code+=`.skip(${(pageNumber-1)*pageSize}).take(${pageSize})`
  }
  return code
}

function getDataByPage(data, params) {
  const { pageNumber, pageSize } = params
  const count = data.length
  const skip = (pageNumber - 1) * pageSize
  const result = {
    data: data.slice(skip, skip + pageSize),
    count
  }
  return result
}

// // 导出函数
// export async function queryParams(params, _this) {
//   const fn = new Function('_this', `with(_this){return _this.repository.createQueryBuilder()${getCode(params)}.getMany()}`)
//   const queryData = await fn(_this)
//   const result = getDataByPage(queryData, params)
//   return result
// }


// 导出函数
export async function queryParams(params, _this) {
  const countFn = new Function('_this', `with(_this){return _this.repository.createQueryBuilder()${getCode(params)}.getCount()}`)
  const resultFn = new Function('_this', `with(_this){return _this.repository.createQueryBuilder()${getCode(params)}${genPageCode(params)}.getMany()}`)
  const totalCount = await countFn(_this)
  const data = await resultFn(_this)
  return {
    totalCount,
    data
  }
}

function genPageCode(params){
  const {pageNumber, pageSize }=params
  let code = ""
  if(pageNumber && pageSize){
    code+= `.skip(${(pageNumber-1)*pageSize}).take(${pageSize})`
  }
  return code
}
