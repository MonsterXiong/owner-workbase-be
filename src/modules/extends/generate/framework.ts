export const FE_FRAMEWORK_TYPE = {
    TXSJ: 'txsj'
}
export const BE_FRAMEWORK_TYPE = {
    NEST: 'nest'
}
export const BE_FRAMEWORK_DATA = {
    [BE_FRAMEWORK_TYPE.NEST]: {
        projectInfo: {
            projectName: '后端',
            // 标识
            code: 'be',
            version: '0.0.1',
            framework_code:'',
            templateDirPath:`public/template/be/${BE_FRAMEWORK_TYPE.NEST}`
        },
        pathInfo:{
            module:{
                base:'src/modules/base'
            }
        }
    }
}

export const FE_FRAMEWORK_DATA = {
    [FE_FRAMEWORK_TYPE.TXSJ]: {
        // SERVICE
        projectInfo: {
            projectName: '前端',
            // 标识
            code: 'fe',
            version: '0.0.1',
            framework_code_url:'https://github.com/MonsterXiong/txsj-fe-template',
            templateDirPath:`public/template/fe/${FE_FRAMEWORK_TYPE.TXSJ}`
        },
        config:{
            systemName: 'xxx软件',
            systemIcon: '',
            showLogo: 0,
            companyName: '2024- xxx科技',
            loginPageName: 'login6',
        },
        env: {
            'dev': {
                VUE_APP_URL: 'http://192.168.2.204:9981/',
                VUE_APP_SYSTEM_NAME: '体系结构建模与分析软件',
                VUE_APP_SYSTEM_ICON: '',
                VUE_APP_SHOW_LOGO: 0,
                VUE_APP_COMPANY_NAME: '2024- xxx科技',
                VUE_APP_LOGIN_PAGE_NAME: 'login6',
                VUE_APP_AUTO_LOGIN: 1,
            },
            'development': {
                NODE_ENV:'development',
                VUE_APP_URL: 'http://192.168.2.204:9981/'
            },
            'production': {
                NODE_ENV:'production',
                VUE_APP_BUILD_ENV:'prod',
                VUE_APP_URL:'http://192.168.2.204:9981/'
            },
        },
        pathInfo: {
            menu:{
                base:'src/layout/sideBar/menuData.js'
            },
            service: {
                base: 'src/services/module/base',
                extend: 'src/services/module/extend',
                system: 'src/services/module/system',
            },
            route: {
                base: 'src/router/base/baseRoutes.js',
            },
            routeConstant: {
                base: 'src/router/base/baseRoutesConstant.js'
            },
            page: {
                base: 'src/pages',
                genDir:"@/pages"
            },
            components: {
                base: 'src/components'
            },
            view: {
                base: 'src/views'
            }
        }

    }
}