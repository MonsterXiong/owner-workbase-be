import { SfMenuExtendService } from './../sf-menu-extend/sf-menu-extend.service';
import { Injectable } from '@nestjs/common';
import { FRAMEWORK_CONFIG } from '../../../../submodule/genCode-utils/src/config/frameworkConfig';
import { getGenCode } from '../../../../submodule/genCode-utils/src/genCode';
import { genContentByType, genPageCode, genServiceCode,genEnumCode, genProjectCode } from './genCodeUtil';

const path = require('path');

// \\转换为/
function formatUrl(str){
  return str.replace(/\\/g,'/');
}

//  转换输出结果 =>输出dir目录
function transformResult(baseDir,codeList){
    const result = codeList.map(item =>{
      const { filePath } = item
      let filepath = formatUrl(filePath)
      let dirPath = ''
      let fileName = ''
      let lastSlashIndex = -1
      lastSlashIndex = filepath.lastIndexOf('/');
      if (lastSlashIndex == -1) {
        fileName = filepath
      } else {
        dirPath = path.join('./', filepath.substring(0, lastSlashIndex))
        fileName = filepath.substring(lastSlashIndex+1)
      }
      filepath = path.join(baseDir, filePath)
      return {
        ...item,
        dirPath:formatUrl(dirPath),
        fileName,
        filePath:formatUrl(filepath)
      }
    })
    return result
}

@Injectable()
export class GenService {
  constructor( private readonly sfMenuExtendService: SfMenuExtendService ){}
  /**
   * @description 通过json获取到生成的代码
   * @param {object} param json数据
   * @returns
   */
  async getGenCode(param) {
    try {
      const { projectInfo } = param;
      const { projectOutputDir } = projectInfo;
      const projectPath = projectOutputDir || FRAMEWORK_CONFIG.CODE_OUTPUT_ROOT_PATH;
      const codeList = await getGenCode(param);
      // 清洗文件路径
      const fileList =transformResult(projectPath.toString(),codeList)

      return fileList

    } catch (error) {
      console.log(error, '获取生成的代码错误');
    }
  }
  async getSfPageCode(menuId) {
    const menuInfo = await this.sfMenuExtendService.getMenuInfoById(menuId)
      if (!menuInfo) return []
      const { menuCode, menuParam} = menuInfo
      const pageInfo = {
          name:menuCode,
          detailParam:menuParam
      }
    return await genPageCode(pageInfo)
  }
  getSfServiceCode(serviceList) {
    return serviceList.map(item => genServiceCode('service', item))
  }
  getSfEnumCode(enumList) {
    return enumList.map(item => genEnumCode('enum', item))
  }
  /**
   * projectInfo含有项目的配置信息
   * @param projectInfo
   */
  getSfProjectCode(projectInfo) {
    return genProjectCode(projectInfo)
  }
  /**
   * 通过type获取code
   * @param type menu | route | routesConstant
   * @param list
   * @returns
   */
  getSfCodeByType(type, list) {
    return genContentByType(type,{list})
  }
  async getSfPageListCode(pageList) {
    let pageCodeList = []
    for await (const page of pageList) {
      const pageCode = await genPageCode(page)
      if (Array.isArray(pageCode)) {
        pageCodeList = pageCodeList.concat(pageCode)
      } else {
        pageCodeList.push(pageCode)
      }
    }
    return pageCodeList
  }
  async getSfGenCode(jsonData) {
    const { projectInfo,projectConfig,menuList,routesConstantList,routeList,pageList,serviceList,enumList} = jsonData
    // 对每一种生成的数据参数在内部进行数据校验，存在问题的生成问题数据
    const projectCodeList = this.getSfProjectCode({...projectInfo, ...projectConfig})
    const menuCodeList = this.getSfCodeByType('menu',menuList)
    const routeCodeList = this.getSfCodeByType('route',routeList)
    const routesConstantCodeList = this.getSfCodeByType('routesConstant',routesConstantList)
    const enumCodeList = this.getSfEnumCode(enumList)
    const serviceCodeList = this.getSfServiceCode(serviceList)
    // 页面需要放入项目配置信息
    const pageCodeList = await this.getSfPageListCode(pageList)
    return [...projectCodeList,menuCodeList, routeCodeList, routesConstantCodeList,...enumCodeList,...pageCodeList,...serviceCodeList]
  }
}
