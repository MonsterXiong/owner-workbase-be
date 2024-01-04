const { glob } = require('glob')
const fs = require("fs");
const ejs = require("ejs");
const path = require("path");
const { GEN_PATH } = require('../constants')
import { formatPath, formatVueFile, getDirPath } from '../utils/index'
function errorInfo(message) {
  throw new Error(message);
}
function error(methodName) {
  throw new Error(`${methodName} must be implemented!`);
}
async function getFileContent(template, config) {
  // return await formatVueFile(ejs.render(template, config))
  return ejs.render(template, config)
}


class BaseGen {
  [x: string]: any;
  constructor(type, codeType) {
    this.type = type
    this.codeType = codeType
    this.baseDirPath = GEN_PATH[type].path
    this.templateBasePath = `public/template/${type}/`
    if (codeType) {
      this.templateBasePath += codeType
    }
    this.tempalteMap = null

    // new Promise((resolve, reject) => {
    //   let chain = Promise.resolve();
    //   chain = chain.then(() => this.getTemplateFiles());
    //   // chain = chain.then(() => this.getGenCode());
    //   chain.catch(err => {
    //     console.error(err.message);
    //   });
    // });
  }

  // 获取对应生成器的模板文件的路径地址
  async getTemplateFiles() {
    // const baseTempPath = path.resolve(__dirname, `../${this.templateBasePath}`);
    const baseTempPath = this.templateBasePath

    const jsfiles = await glob(`${baseTempPath}/**/*.ejs`)
    return jsfiles.map(item => formatPath(item))
  }

  // 根据模板路径地址可以解析出type(),dirPath目录路径以及模板路径地址
  generateStructure(data) {
    const result = [];
    const templateBasePath = this.templateBasePath

    data.forEach(filePath => {
      const parts = filePath.replace(templateBasePath, '').split('/')
      const type = parts[parts.length - 1].split('.')[0];
      const dirPath = getDirPath(templateBasePath, filePath)
      result.push({
        type,
        templatePath: filePath,
        baseDirPath: this.baseDirPath,
        relativeDirPath: dirPath,
      });
    });
    return result;
  }

  async implTemplateParams(params) {
    error('implTemplateParams')
  }
  async genWriteFilePath(item, params) {
    error('genWriteFilePath')
  }

  async getGenData(generatedStructure, params) {
    let result = []

    for (const item of generatedStructure) {
      // 读取对应模板
      const template = fs.readFileSync(item.templatePath, "utf8");
      // 生成文件路径
      const filePath = this.genWriteFilePath(item, params)
      // 根据type获取对应的模板参数
      const configParams = this.tempalteMap[item.type]
      // 根据模板和模板参数获取对应内容,
      const content = await getFileContent(template, configParams)
      result.push({
        genType: this.type,
        type: this.codeType,
        detailType: item.type,
        filePath: formatPath(filePath),
        content,
        params
      })
    }


    return result
  }

  async getGenCode(params) {
    this.tempalteMap = this.implTemplateParams(params)
    if (!this.tempalteMap) {
      errorInfo('implTemplateParams必须有返回值')
    }
    const tempFiles = await this.getTemplateFiles()
    const generatedStructure = this.generateStructure(tempFiles)
    const result = await this.getGenData(generatedStructure, params)

    return result
  }
}

module.exports = BaseGen