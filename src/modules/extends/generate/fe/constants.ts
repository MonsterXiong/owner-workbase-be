export const GEN_TYPE = Object.freeze({
  PAGE: 'page',
  SERVICES: 'services',
  ROUTER:'router'

})
export const PAGE_TYPE = Object.freeze({
  CRUD: 'crud'
})

export const SERVICES_TYPE = Object.freeze({
  BASE: 'base'
})

export const GEN_SERVICE_TYPE = Object.freeze({
  BASE: 'base',
})

export const GEN_CRUD_TYPE = Object.freeze({
  INDEX: 'index',
  DIALOG: 'dialog',
  QUERY: 'query',
  TABLE: 'table'
})

export const ROUTER_TYPE = Object.freeze({
  ROUTES: 'routes',
  ROUTES_CONSTANT:'routesConstant'
})


export const GEN_PATH={
  [GEN_TYPE.PAGE]:{
    path:'./src/views/pages'
  },
  [GEN_TYPE.SERVICES]:{
    path:'./src/services/module'
  },
  [GEN_TYPE.ROUTER]:{
    path:'./src/router'
  },
}