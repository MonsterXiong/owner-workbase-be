import * as path from 'path'
import * as fs from 'fs'
import * as ejs from 'ejs'
import { DISPLAY_TYPE, FRAMEWORK_TYPE, GEN_TYPE, PROJETC_CONFIG_ENUM, VERSION } from './constant'
import { FRAMEWORK_PATH } from './config'
import { getTemplateParam } from './adapter'
import { camelCase, pascalCase } from 'change-case'


function getPath(filepath) {
    return path.join(process.cwd(), filepath)
}
function getEjsTemplate(templatePath) {
    const templateFile = fs.readFileSync(templatePath, "utf8");
    return ejs.compile(templateFile);
}

function getEjsTemplateByFile(templatePath, templateParam) {
    return new Promise((resolve, reject) => {
        ejs.renderFile(templatePath, templateParam, {}, function (err, str) {
            if (err) {
                reject(err)
            }
            resolve(str)
        });
    })
}

function getLocalTemplatePath(type,option) {
    const { frameworkType, version } = option
    let basePath = `public/template/sf/${frameworkType}/${version}/${type}`
    if (![GEN_TYPE.PROJECT, GEN_TYPE.PAGE].includes(type)) {
        basePath = `${basePath}/${type}.ejs`
    }
    return getPath(basePath)
}


function getProjectContent(projectInfo, option) {
    const projectConfigPath = getLocalTemplatePath(GEN_TYPE.PROJECT, option)
    return Object.keys(PROJETC_CONFIG_ENUM).map(key => {
        const temp = getEjsTemplate(path.join(projectConfigPath, `${PROJETC_CONFIG_ENUM[key]}.ejs`));
        return {
            filePath: `../${PROJETC_CONFIG_ENUM[key]}`,
            content: temp(projectInfo)
        }
    })
}

async function getPageContent(pageList, option) {
    const pageDirPath = getLocalTemplatePath(GEN_TYPE.PAGE, option)

    let result = []

    for (const pageItem of pageList) {
        const { name,componentInfo,dataInfo } = pageItem
        const componentCount = componentInfo?.length
        if (!componentCount) {
            return
        }
        // 单页面
        if (componentCount == 1) {
            const { label } = componentInfo[0]
            const templatePath = path.join(pageDirPath, `${label}/${label}.ejs`)
            const templateParam = getTemplateParam({componentInfo:componentInfo[0],dataInfo}, option)
            const content = await getEjsTemplateByFile(templatePath, templateParam)

            // 适配器获取参数
            result.push({
                filePath:`pages/${camelCase(name)}/${pascalCase(name)}.vue`,
                content
            })
        } else {
        // 组合页面-需要入口文件组装

        }
    }

    return result
}

export async function genContentByType(type, param, option = { frameworkType: FRAMEWORK_TYPE.TXSJ, version: VERSION.V1 }) {
    const { frameworkType, version } = option

    if (type == GEN_TYPE.PROJECT) {
        return getProjectContent(param,option)
    }


    if (type == GEN_TYPE.PAGE) {
        return await getPageContent(param, option)
    }
    const temp = getEjsTemplate(getLocalTemplatePath(type, option));
    const basePath = FRAMEWORK_PATH[frameworkType][version][type]
    if (type == GEN_TYPE.ENUM) {
        const result = param.map(item => {
            const { camelCode, name } = item
            const filePath = `${basePath}/${camelCode}.js`
            return {
                name,
                filePath: filePath,
                content: temp(item)
            }
        })
        return result
    }

    return {
        filePath:basePath,
        content: temp({list:param})
    }
}


export function convertMySQLTypeToNodeJS(mysqlType) {
    if (mysqlType.includes('varchar') || mysqlType.includes('text') || mysqlType.includes('char')) {
      return DISPLAY_TYPE.INPUT;
    } else if (mysqlType.includes('int') || mysqlType.includes('integer') || mysqlType.includes('bigint')) {
      return DISPLAY_TYPE.INPUT_NUMBER;
    } else if (mysqlType.includes('float') || mysqlType.includes('double') || mysqlType.includes('decimal')) {
      return DISPLAY_TYPE.INPUT_NUMBER;
    } else if (mysqlType.includes('date') || mysqlType.includes('time') || mysqlType.includes('timestamp')) {
      return DISPLAY_TYPE.DATE_TIME;
    } else if (mysqlType.includes('bool') || mysqlType.includes('bit')) {
      return DISPLAY_TYPE.SWITCH;
    } else {
      return DISPLAY_TYPE.INPUT;
    }
  }