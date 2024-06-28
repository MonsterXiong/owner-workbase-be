import { FRAMEWORK_TYPE, GEN_TYPE, VERSION } from "./constant";

export const FRAMEWORK_PATH = {
    [FRAMEWORK_TYPE.TXSJ]: {
        [VERSION.V1]: {
            [GEN_TYPE.MENU]: 'layout/sideBar/menuData.js',
            [GEN_TYPE.ROUTE]: 'router/base/baseRoutes.js',
            [GEN_TYPE.ROUTES_CONSTANT]: 'router/base/baseRoutesConstant.js',
            [GEN_TYPE.SERVICE]: 'services/module/base',
            [GEN_TYPE.ENUM]: 'enum/module/base',
        }
    }
}
