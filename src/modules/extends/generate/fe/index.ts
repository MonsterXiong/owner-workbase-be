const fs = require("fs");
const path = require("path");
const fse = require("fs-extra");
import * as changeCase from "change-case";
const execa = require("execa");
import { GEN_TYPE, PAGE_TYPE, SERVICES_TYPE, GEN_CRUD_TYPE, ROUTER_TYPE, GEN_PATH } from './constants'
import GenCrud  from './gen/GenCrud'
import GenService from './gen/GenService'
import GenRouter from './gen/GenRouter'
import { formatVueFile, compress, uncompress }  from './utils/index'
// const chalk = require('chalk')
function transParams() {
  // 初始化:根据生成类型和匹配项可以找到模板文件以及生成的文件目录
  // 该函数生成的数据与模板需要高度匹配,是不是可以生成class基类,匹配不同的参数与模板就可以生成代码,便于扩展
  // 后续:
  // 1.可以把模板持久化,模板规则定义出来
  // 2.希望可以定义好生成类型和匹配项,给到数据源就可以拿到生成数据路径和内容

  // fields中的type Input Select Textarea Date Color RichEditor TreeSelect Upload InputNumber url
  // Input Textarea Date Color RichEditor Upload InputNumber url
  // Select 数据来源自定义枚举,接口,字典 同时需要考虑表格展示
  // TreeSelect 数据来源
  // 然后再考虑
}





// console.log(chalk.blue(`创建项目文件夹`))
// await execa("cnpm i ", {
//     cwd: getRootPath(),
//     stdio: [2, 2, 2],
//   });

// function getRootPath() {
//   return path.resolve(process.cwd(), config.packageName);
// }

!(async () => {
  console.time('start')

  const genCrudFn = new GenCrud(GEN_TYPE.PAGE, PAGE_TYPE.CRUD)
  const genServiceFn = new GenService(GEN_TYPE.SERVICES, SERVICES_TYPE.BASE)
  const genRoutesFn = new GenRouter(GEN_TYPE.ROUTER, ROUTER_TYPE.ROUTES)
  const genRoutesConstantFn = new GenRouter(GEN_TYPE.ROUTER, ROUTER_TYPE.ROUTES_CONSTANT)

  let result = []
  for (let index = 0; index < 1000; index++) {
    const crudData = await genCrudFn.getGenCode(getData(index))
    result = result.concat(crudData)
  }

  const serviceList = getServiceData()
  for (const serviceItem of serviceList) {
    const serviceData = await genServiceFn.getGenCode(serviceItem)
    result = result.concat(serviceData)
  }
  // 格式化
  // for (const item of result) {
  //   item.content = await formatVueFile(item.content)
  // }

  let routeList = []
  result.forEach(item => {
    // console.log(item.filePath,item.genType,item.type,item.detailType);
    if (item.genType == GEN_TYPE.PAGE) {
      if (item.type == PAGE_TYPE.CRUD && item.detailType == GEN_CRUD_TYPE.INDEX) {
        routeList.push(item)
      }
    }
  })


  let routes = routeList.map(item => {
    return {
      filePath: item.filePath,
      tableName: item.params.tableName
    }
  })

  const routesData = await genRoutesFn.getGenCode(routes)
  const routesConstantData = await genRoutesConstantFn.getGenCode(routes)
  result = result.concat(routesData)
  result = result.concat(routesConstantData)

  // await genCode(result)

  const resultAnalysis:any = result.filter(item => item.genType == GEN_TYPE.PAGE).map(item => {
    const params = {}
    Object.keys(item).forEach(key => {
      if (item[key] && key !== 'content') {
        params[key] = item[key]
      }
    })
    return params
  })
  // 左树右表 组合结构都应该如此
  // 只需要先获取一遍CRUD,获取一遍树形结构，将目录结构进行修改即可，
  // 所以该GenClass需要生成一遍自己的入口页面
  // 这样就可以做到适配了
  // 第一步应该内置CRUD、树形结构、列表、穿梭框、弹窗(表格、表单)
  resultAnalysis.forEach(item => {
    const oldFilePath = path.resolve(process.cwd(), item.filePath)
    const pagePath = GEN_PATH[GEN_TYPE.PAGE].path
    const oldDirPath = path.resolve(process.cwd(), pagePath)
    const relativePath = oldFilePath.replace(oldDirPath, "")
    const currentPage = "treeAndTabel"
    const newFilePath = path.join(`${pagePath}/${currentPage}`, relativePath)
    // console.log(newFilePath);
    console.log(path.resolve(process.cwd(), newFilePath));
  })
    // console.log(resultAnalysis);
    // await execCompress()
    console.timeEnd('start')

  })();

  async function execCompress() {
    const sourcePath = path.resolve(process.cwd(), './src/')
    const targetPath = path.resolve(process.cwd(), './demo.zip')
    try {
      await compress(sourcePath, targetPath)
      await uncompress(targetPath, './dist')
    } catch (error) {
      console.log(error);
    }
  }


  function getData(index) {
    const baseTableName = `expert_professional_title${index}`;
    const tableCommon = "文档";
    const tableName = changeCase.camelCase(baseTableName);
    const prikey = "professionalTitleId";
    const tableConfig = {
      selection: {
        show: false,
        label: '序号',
        option: {
          width: 80
        }
      }
    }
    // fields中的type Input Select Textarea Date Color RichEditor TreeSelect Upload InputNumber url
    // Input Textarea Date Color RichEditor Upload InputNumber url
    // Select 数据来源自定义枚举,接口,字典 同时需要考虑表格展示
    // TreeSelect 数据来源
    // 然后再考虑
    const fields = [
      {
        label: "职称",
        key: "name",
        type: "input",
        data: "",
        dataType: "",
        options: {
          placeholder: "请输入职称",
        },
        config: {
          isTable: true,
          isQuery: true,
          isDialog: true
        }
      }, {
        label: "职称等级",
        key: "level",
        type: "select",
        data: "TITLE_LEVEL",
        dataType: "dictCategory",
        options: {
          placeholder: "请输入职称等级",
        },
        config: {
          isTable: true,
          isQuery: true,
          isDialog: true
        }
      }, {
        label: "描述",
        key: "description",
        type: "textarea",
        data: "",
        dataType: "",
        options: {
          placeholder: "请填写简要描述",
        },
        config: {
          isTable: false,
          isQuery: false,
          isDialog: true
        }
      }
    ]

    return {
      tableName,
      tableCommon,
      prikey,
      tableConfig,
      fields
    }
  }

  function getServiceData() {
    const dataList = [{
      tableName: 'expert_title',
      tableCommon: '专家职称'
    }, {
      tableName: 'expert',
      tableCommon: '专家'
    }, {
      tableName: 'project',
      tableCommon: '项目'
    }, {
      tableName: 'log',
      tableCommon: '日志'
    }, {
      tableName: 'ability',
      tableCommon: '能力'
    }, {
      tableName: 'abilityAssessmentIndex',
      tableCommon: '评估指标'
    }, {
      tableName: 'abilityAssessmentIndexItem',
      tableCommon: '评估指标项'
    }, {
      tableName: 'abilityIndex',
      tableCommon: '能力指标'
    }, {
      tableName: 'abilityVersion',
      tableCommon: '能力版本'
    }, {
      tableName: 'document',
      tableCommon: '文档'
    }, {
      tableName: 'hangTime',
      tableCommon: '滞空时间'
    }, {
      tableName: 'label',
      tableCommon: '标签'
    }, {
      tableName: 'model',
      tableCommon: '模型信息'
    }, {
      tableName: 'sensor',
      tableCommon: '传感器'
    }, {
      tableName: 'stage',
      tableCommon: '阶段'
    }, {
      tableName: 'keyword',
      tableCommon: '关键字信息'
    }]

    return dataList.map(item => {
      const basePrefix = "nbpgBase";
      const tableName = changeCase.camelCase(item.tableName)
      return {
        tableName,
        tableCommon: item.tableCommon,
        basePrefix
      }
    })
  }