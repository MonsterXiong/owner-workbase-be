import { GEN_TYPE,SERVICES_TYPE } from "../fe/constants"
import GenService from "../fe/gen/GenService"
import * as changeCase from "change-case";
import { getTableInfo } from "./common";

async function genServiceFe(param){
    const {prefix,outputPath } =  param
    // 获取table
    const tableInfo = await getTableInfo()
    const tableList = tableInfo.filter(item=>!item.TABLE_NAME.startsWith('s_')).map(item=>{
        const tableName = item.TABLE_NAME
        const prikeyItem = item.TABLE_FIELDS.find(field=>field.Key=='PRI')
        return {
            tableName:changeCase.camelCase(tableName),
            tableCommon: item.TABLE_COMMENT,
            basePrefix:prefix,
            prikey:prikeyItem?changeCase.camelCase(prikeyItem.Field):'id'
        }
    })
    const genServiceFn = new GenService(GEN_TYPE.SERVICES, SERVICES_TYPE.BASE)
    let result = []
    for (const serviceItem of tableList) {
        const serviceData = await genServiceFn.getGenCode(serviceItem)
        result = result.concat(serviceData)
    }
    return result
}

export default genServiceFe