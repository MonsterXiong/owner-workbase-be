import { genCode } from '../src/modules/extends/generate/utils/common';
import * as changeCase from 'change-case';
import { join } from 'path';
const fse = require('fs-extra')
const path = require('path')
const ejs = require('ejs')
const fs = require('fs/promises');

function mockData(){
    return {
        initOptionList:[
            {
                prop:'bindAbi',
                functionName:'getAbiOption',
                serviceName:'AbiService',
                interfaceName:'queryList',
                variableName:'abiOption'
            },
            {
                prop:'stage',
                functionName:'getStageOption',
                serviceName:'StageService',
                interfaceName:'queryList',
                variableName:'stageOption'
            }
        ],
        queryList:[{
            displayType:'text',
            label:'指标名称',
            prop:'name',
        },{
            displayType:'select',
            label:'所属能力',
            prop:'bindAbi',
            // selectType:'dict',
            // dictCode:'project_enum'
            selectType:'entity',
            dictCode:'project_enum',
            entityKey:'bindAbiId',
            entityLabel:'abiName',
        },{
            displayType:'select',
            label:'项目阶段',
            prop:'stage',
            selectType:'entity',
            dictCode:'project_enum',
            entityKey:'bindStageId',
            entityLabel:'name',
        }],
        toolbarBtnList:[{
            type:'success',
            icon:'el-icon-circle-plus-outline',
            functionName:'onAdd',
            name:'新增'
        },{
            type:'danger',
            icon:'el-icon-delete',
            functionName:'onBatchDelete',
            name:'批量删除'
        }]
    }
}
async function getInitTemplate(mockData){
    // const serviceRenderTempFile = fse.readFileSync('public/template/v1/queryFrom.ejs','utf8',);
    const content = await ejs.renderFile('public/template/v1/queryFrom.ejs',mockData)
    // const content = serviceRenderTemp(mockData)
    console.log(typeof content);
    genCode([{
        filePath:join(__dirname,'./Query.vue'),
        content
    }])

}

!(async()=>{
    await getInitTemplate(mockData())
})()
