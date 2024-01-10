import { Injectable } from '@nestjs/common';
import { genServiceFe, genInterface, genPage } from './utils/index';
const path = require('path');

import { funcList } from '../../../mock/funcList';

@Injectable()
export class GenerateService {
  async getInterface(param) {
    return await genInterface(param);
  }
  async getServiceFe(param) {
    const { projectInfo } = param;
    return await genServiceFe(projectInfo);
  }
  async getPage(list) {
    return await genPage(list);
  }

  async genCode(param) {
    const { projectInfo } = param;
    const { outputPath } = projectInfo;
    // 获取services代码
    const serviceList = await this.getServiceFe(param);
    // 获取menuData,route,rputeConstant代码
    const pageList = await this.getPage(funcList);
    const list = [...serviceList, ...pageList];
    // 拼写路径
    const fileList = list.map((item) => {
      return {
        ...item,
        filePath: path.resolve(outputPath, item.filePath),
      };
    });
    return fileList;
  }
}
