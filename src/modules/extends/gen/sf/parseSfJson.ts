import { camelCase, constantCase, pascalCase } from 'change-case';
import { genContentByType } from './util';
import { FRAMEWORK_TYPE, GEN_TYPE, VERSION } from './constant';

export async function parseSfJson(jsonData) {
    const { projectInfo } = jsonData
    const option = {
        frameworkType: projectInfo?.projectFrameworkType || FRAMEWORK_TYPE.TXSJ,
        version:projectInfo?.projectVersion || VERSION.V1
    }

    // 得到一个key跟GEN_TYPE对应以及模板文件名称对应的对象数据
    const paramData = formatJsonData(jsonData)

    let result = []
    for  (const key of Object.keys(paramData)) {
        const codeData = await genContentByType(key, paramData[key], option)
        if (Array.isArray(codeData) && codeData.length) {
            result = result.concat(codeData)
        } else {
            result.push(codeData)
        }
    }

    return result

}

function formatEnumList(enumData) {
    return enumData.map(categoryItem => {
        return {
            name: categoryItem.remark,
            camelCode: camelCase(categoryItem.code),
            constantCode: constantCase(categoryItem.code),
            list:categoryItem?.columns.map(item => {
                return {
                    name: item.remark,
                    code: item.code,
                    constantCode: constantCase(item.code),
                }
            })
        }
    })
}

function formatDataInfo(dataInfo) {
    // 首先过滤掉枚举
    const enumData = dataInfo.filter(item => item.modelType == 'enum')
    const entityList = dataInfo.filter(item => item.modelType == 'obj')

    const enumList = formatEnumList(enumData)

    return {
        enumList,
        entityList
    }

}

// TODO:收集&生成service
function formatJsonData(jsonData) {
    const { projectInfo,menuInfo, componentInfo,dataInfo } = jsonData

    const { enumList } = formatDataInfo(dataInfo)

    // TODO:menuInfo与componentInfo融合 =>后续JSON合并后就不需要处理了
    const pageData = menuInfo.map(item => {
        let param = componentInfo.filter(componentItem => componentItem.bindMenu == item.id)
        let menuParam =param || []
        return {
            ...item,
            menuParam
        }
    })

    const result = pageData.reduce((pre, pageItem) => {
        const { id, name, code, parentId, menuType, icon,menuParam, sort } = pageItem
        const constantCaseCode = constantCase(code)
        const camelCaseCode = camelCase(code)
        const pascalCaseCode = pascalCase(code)
        const isPage = menuType == 'page'
        pre[GEN_TYPE.MENU].push({
            id,
            name,
            code: constantCaseCode,
            parentId,
            menuType,
            icon,
            sort:(sort|| sort==0)? sort:pre[GEN_TYPE.MENU]?.length + 1
        })
        if (isPage) {
            pre[GEN_TYPE.ROUTES_CONSTANT].push({
                code: constantCaseCode,
                path: `/${camelCaseCode}`,
                name: pascalCaseCode
            })
            pre[GEN_TYPE.ROUTE].push({
                routesConstant: `...baseRoutesConstant.${constantCaseCode}`,
                filePath: `pages/${camelCaseCode}/${pascalCaseCode}.vue`,
                name
            })
            pre[GEN_TYPE.PAGE].push({
                name: camelCaseCode,
                dataInfo,
                componentInfo: menuParam
            })
        }
        return pre
    }, {[GEN_TYPE.MENU]: [],[GEN_TYPE.ROUTES_CONSTANT]: [],[GEN_TYPE.ROUTE]: [],[GEN_TYPE.PAGE]:[]})
    return {
        ...result,
        [GEN_TYPE.ENUM]:enumList,
        [GEN_TYPE.PROJECT]:projectInfo,
    }
}
