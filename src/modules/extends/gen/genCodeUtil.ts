import { pascalCase } from 'change-case';
import * as path from 'path'
import * as fs from 'fs'
import * as ejs from 'ejs'
import * as glob from 'glob'
import { adapter } from './adapter';
const GEN_TYPE = {
    MENU: 'menu',
    ROUTE: 'route',
    ROUTES_CONSTANT: 'routesConstant',
    SERVICE: 'service',
    ENUM: 'enum',
    PROJECT: 'project',
}

function getPath(filepath) {
    return path.join(process.cwd(), filepath)
}
const TEMPLATE_PATH = {
    [GEN_TYPE.MENU]: getPath('public/template/v4/menu/menu.ejs'),
    [GEN_TYPE.ROUTE]: getPath('public/template/v4/route/route.ejs'),
    [GEN_TYPE.ROUTES_CONSTANT]: getPath('public/template/v4/routeConstant/routeConstant.ejs'),
    [GEN_TYPE.SERVICE]: getPath('public/template/v4/service/service.ejs'),
    [GEN_TYPE.ENUM]: getPath('public/template/v4/enum/enum.ejs'),

    // 目录
    [GEN_TYPE.PROJECT]: 'public/template/v4/project',
}

const FRAMEWORK_CONFIG = {
    [GEN_TYPE.MENU]: 'layout/sideBar/menuData.js',
    [GEN_TYPE.ROUTE]: 'router/base/baseRoutes.js',
    [GEN_TYPE.ROUTES_CONSTANT]: 'router/base/baseRoutesConstant.js',
    [GEN_TYPE.SERVICE]: 'services/module/base',
    [GEN_TYPE.ENUM]: 'enum/module/base',
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

export function genContentByType(type, param) {
    const temp = getEjsTemplate(TEMPLATE_PATH[type]);
    return {
        filePath: FRAMEWORK_CONFIG[type],
        content: temp(param)
    }
}
export function genServiceCode(type, param) {
    const temp = getEjsTemplate(TEMPLATE_PATH[type]);
    const dirPath = FRAMEWORK_CONFIG[type]
    const { pascalCaseName } = param
    const filePath = `${dirPath}/${pascalCaseName}Service.js`
    return {
        filePath: filePath,
        content: temp(param)
    }
}
export function genEnumCode(type, param) {
    const temp = getEjsTemplate(TEMPLATE_PATH[type]);
    const dirPath = FRAMEWORK_CONFIG[type]
    const { camelCode } = param
    const filePath = `${dirPath}/${camelCode}.js`
    return {
        filePath: filePath,
        content: temp(param)
    }
}

async function genEmptyCode(filePath, templateParam) {
    return {
        filePath,
        content: await getEjsTemplateByFile(getPath('public/template/v4/page/empty/empty.ejs'), templateParam)
    }
}

export function genProjectCode(param) {
    const dirPath = TEMPLATE_PATH[GEN_TYPE.PROJECT]
    const templatePathList = glob.sync(`${dirPath}/**/*.{vue,ejs,less,js}`)
    let projectCodeList = []
    templatePathList.forEach(templatePath => {
        const template = getEjsTemplate(templatePath)
        const filePath = templatePath.slice(dirPath.length + 1)
        const ext = filePath.match(/\.\w+$/i)[0]
        const fileName = filePath.replace(ext, '')
        const outputFilePath = `../.${fileName}`
        const content = template(param)
        projectCodeList.push({
            filePath: outputFilePath,
            content
        })
    })
    return projectCodeList
}

export async function genPageCode(param) {
    const { name, detailParam } = param
    let type = ''
    let categoryType = ''
    if (!detailParam || !detailParam?.categoryType || !detailParam?.type) {
        type = 'empty'
    } else {
        categoryType = detailParam.categoryType
        type = detailParam.type
    }

    const pascalCaseName = pascalCase(name)
    const basePath = `public/template/v4/page/${categoryType}/${type}`
    const pageDirPath = `pages/${name}`
    const entryPath = `${pageDirPath}/${pascalCaseName}.vue`

    const commonTemplateParam = {
        name,
        pageName: pascalCaseName
    }

    const templateParam = adapter(categoryType, type, { ...commonTemplateParam, ...param })

    if(!templateParam){
        return genEmptyCode(entryPath, commonTemplateParam)
    }

    const templatePathList = glob.sync(`${basePath}/**/*.{vue,ejs,less,js}`)

    const pageCodeList = []

    for await (const templatePathItem of templatePathList) {
        const filePath = templatePathItem.slice(basePath.length + 1)
        const ext = filePath.match(/\.\w+$/i)[0]
        const fileName = filePath.replace(ext, '')

        let outputFilePath = entryPath
        let subTemplateParam = templateParam['entry'] || {}
        // 不是入口文件
        if (fileName != type) {
            const index =fileName.lastIndexOf('/')>=0?fileName.lastIndexOf('/'):fileName.lastIndexOf('\\')
            const templateNameLength = index + 1
            const dirName = fileName.slice(0, templateNameLength)
            const templateName = fileName.slice(templateNameLength)
            let extName = ext
            subTemplateParam = templateParam[templateName]
            if (ext == '.ejs') {
                extName = '.vue'
                const genFileName = pascalCase(`${pascalCaseName}_${templateName}`)
                outputFilePath = `${pageDirPath}/${dirName}${genFileName}${extName}`
            } else {
                outputFilePath = `${pageDirPath}/${fileName}${extName}`
            }
        }
        const content = await getEjsTemplateByFile(templatePathItem, { ...commonTemplateParam, ...subTemplateParam });
        // 可以控制多模板的时候不显示哪些数据
        pageCodeList.push({
            filePath: outputFilePath,
            content
        })
    }
    return pageCodeList
}