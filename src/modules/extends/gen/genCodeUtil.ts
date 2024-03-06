import { pascalCase } from 'change-case';
import * as path from 'path'
import * as fs from 'fs'
import * as ejs from 'ejs'
import * as glob from 'glob'
import { MULTI_PAGE_LIST } from './multiList';
const GEN_TYPE = {
    MENU: 'menu',
    ROUTE: 'route',
    ROUTES_CONSTANT:'routesConstant',
    SERVICE:'service',
}

function getPath(filepath) {
    return path.join(process.cwd(),filepath)
}
const TEMPLATE_PATH={
    [GEN_TYPE.MENU]:getPath('public/template/v4/menu/menu.ejs'),
    [GEN_TYPE.ROUTE]:getPath('public/template/v4/route/route.ejs'),
    [GEN_TYPE.ROUTES_CONSTANT]:getPath('public/template/v4/routeConstant/routeConstant.ejs'),
    [GEN_TYPE.SERVICE]:getPath('public/template/v4/service/service.ejs'),
}
// ROUTE_COMPONENT_PREFIX:'@/pages',

// PAGE_DIR_PATH:'src/pages',

// ROUTE_CONSTANT_OUTPUT_PATH:'src/router/base/baseRoutesConstant.js',

// CODE_OUTPUT_ROOT_PATH:isDev?'./submodule/txsj-fe-template':'./temp'

const FRAMEWORK_CONFIG = {
    [GEN_TYPE.MENU]:'layout/sideBar/menuData.js',
    [GEN_TYPE.ROUTE]:'router/base/baseRoutes.js',
    [GEN_TYPE.ROUTES_CONSTANT]:'router/base/baseRoutesConstant.js',
    [GEN_TYPE.SERVICE]:'services/module/base',
}

function getEjsTemplate(templatePath) {
    const templateFile = fs.readFileSync(templatePath, "utf8");
    return ejs.compile(templateFile);
}

export function genContentByType(type, param) {
    const temp = getEjsTemplate(TEMPLATE_PATH[type]);
    return {
        filePath:FRAMEWORK_CONFIG[type],
        content:temp(param)
    }
}
export function genServiceCode(type, param) {
    const temp = getEjsTemplate(TEMPLATE_PATH[type]);
    const dirPath = FRAMEWORK_CONFIG[type]
    const {pascalCaseName} = param
    const filePath = `${dirPath}/${pascalCaseName}Service.js`
    return {
        filePath:filePath,
        content:temp(param)
    }
}

export async function genPageCode(param) {
    console.log('param',param);

    const { name, detailParam } = param
    let type = ''
    let categoryType = ''
    let templatePath = ''
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

    const templateParam = {
        name,
        pageName:pascalCaseName
    }
    if (MULTI_PAGE_LIST.includes(type)) {
        const templatePathList = glob.sync(`${basePath}/**/*.{vue,ejs,less,js}`)
        const pageCodeList = []
        templatePathList.forEach(templatePathItem => {
            const filePath = templatePathItem.slice(basePath.length + 1)
            const ext = filePath.match(/\.\w+$/i)[0]
            const fileName = filePath.replace(ext, '')
            let outputFilePath = entryPath
            if (fileName != type) {
                const extName = ext === '.ejs'?'vue':ext
                outputFilePath = `${pageDirPath}/${fileName}${extName}`
            }
            const temp = getEjsTemplate(templatePathItem);
            pageCodeList.push({
                filePath: outputFilePath,
                content:temp(templateParam)
            })
        });
        console.log('pageCodeList',pageCodeList);

        return pageCodeList

    } else {
        if (type == 'empty') {
            templatePath = getPath(`public/template/v4/page/${type}/${type}.ejs`)
        } else {
            templatePath = getPath(`${basePath}/${type}.ejs`)
        }
        const temp = getEjsTemplate(templatePath);
        return {
            filePath: entryPath,
            content:temp(templateParam)
        }
    }
}