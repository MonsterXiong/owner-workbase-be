const BaseGen = require('./BaseGen')
import * as changeCase from "change-case";
const path = require("path");
import { ROUTER_TYPE } from '../constants'


class GenRouter extends BaseGen {
  constructor(type, codeType) {
    super(type, codeType)
  }
  implTemplateParams(params) {
    let routesConstant = []
    let routes = []
    params.forEach(item => {
      const { tableName, filePath } = item
      const routePath = tableName
      const routeConstant = changeCase.constantCase(routePath)
      const routeName = changeCase.paramCase(routeConstant)
      const component = filePath.replace('src', '@')
      routes.push({
          routeConstant,
          component
        })

      routesConstant.push({
        routeConstant,
        routePath,
        routeName
      })
    })
    return {
      [ROUTER_TYPE.ROUTES]: {
        routes
      },
      [ROUTER_TYPE.ROUTES_CONSTANT]: {
        routesConstant
      },
    }
  }
  genWriteFilePath(item, params) {
    return path.join(item.baseDirPath, `./${item.type}/${item.type}.js`)
  }
}

export default GenRouter
