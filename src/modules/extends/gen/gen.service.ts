import { Injectable } from '@nestjs/common';
import { FRAMEWORK_CONFIG } from 'submodule/genCode-utils/src/config/frameworkConfig';
import { getGenCode } from 'submodule/genCode-utils/src/genCode';

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
}
