import { camelCase, pascalCase } from "change-case";
import { FUNCTION_LOCATION } from "../../../constant";
import { convertMySQLTypeToNodeJS } from "../../../util";

export function table_general(param) {
    const { componentInfo, dataInfo } = param
    const {elements,function:functionInfo,code} = componentInfo

    const currentModel = elements.find(item=>item.label == 'tableElement').bindObj

    const modalData = dataInfo.find(item=>item.code == currentModel)?.columns || []
    const btnList = Object.keys(FUNCTION_LOCATION).reduce((pre, cur) => {
        const key = FUNCTION_LOCATION[cur]
        pre[key] = functionInfo.filter(item=>item.location ==key)
        return pre
    },{})

    const result = {}
    functionInfo.forEach(functionItem => {
        // 按照功能项来区分每个
        result[`${functionItem.label}Info`] = parseFunctionItem(functionItem,modalData)
    });
    return {
        pageName:pascalCase(code),
        ...result,
        ...btnList
    }
}



function parseFunctionItem(functionItem,modalData) {
    const { label, name, code, url, param, location } = functionItem

    // 解析url,code方法
    const { serviceType, interfaceName } = parseUrl(url)
    const ServiceName = `${pascalCase(serviceType)}Service`
    const InterfaceName = `${camelCase(interfaceName)}`

    let tableFields = param
    const PrimaryCode = camelCase(modalData.find(item=>item.isPrimary)?.code || 'id')
    if (isEmptyObj(param)) {
        const currentModel = modalData.filter(item => {
            const {  code, isPrimary } = item
            return !((isPrimary && code.endsWith('id')) || code.startsWith('sys_'))
        })
        tableFields = currentModel.map(item => {
            const { dataType, remark, code, isPrimary } = item
            if (!((isPrimary && code.endsWith('id')) || code.startsWith('sys_'))){
                return {
                    displayType: convertMySQLTypeToNodeJS(dataType),
                    prop: camelCase(code),
                    label:remark
                }
            }
        })
        console.log('tableFields',tableFields);

    } else {
        tableFields = param.filter(item=>item.isShow)
    }
    const request = {
        ServiceName,
        InterfaceName,
        PrimaryCode
    }

    const result: any = {
        data: functionItem,
        tableFields,
        request: {
          ...request
        }
    }
    if (label == 'queryList') {
        // 查询方法 getTableList
        result.request  = {
            ...request,
            queryParam: [
                // {
                //     symbol:'buildEqualQuery',
                //     key: 'bindProject',
                //     valueType: 'variable',
                //     value:'bindProject'
                // }
            ],
            configParam: {
                isLimit:true
            }
        }
    }
    if (label == 'insert') { }
    if (label == 'quickQuery') {
        result.tableFields = result.tableFields.map(item => {
            return {
                ...item,
                formDataCode:'queryForm'
            }
        })
    }

    return result
}

function parseUrl(url) {
    const [, interfaceType, serviceType, _, interfaceName] = url.split('/')
    return {
      interfaceType,
      serviceType,
      interfaceName
    }
  }

function isEmptyObj(obj) {
    return !Object.keys(obj).length
}