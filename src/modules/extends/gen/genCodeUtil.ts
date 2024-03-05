import { pascalCase } from 'change-case';
import * as path from 'path'
import * as fs from 'fs'
import * as ejs from 'ejs'
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
    if (type == 'empty') {
        templatePath = getPath(`public/template/v4/page/${type}/${type}.ejs`)
    } else {
        templatePath = getPath(`public/template/v4/page/${categoryType}/${type}/${type}.ejs`)
    }
    const pascalCaseName = pascalCase(name)
    const temp = getEjsTemplate(templatePath);
    // 参数自定义
    const templateParam = {
        name,
        pageName:pascalCaseName
    }
    return {
        filePath: `pages/${name}/${pascalCaseName}.vue`,
        content:temp(templateParam)
    }
}