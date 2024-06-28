import { registerAdapter } from "./registerAdapter";


export function getTemplateParam(param,option) {
    const { frameworkType, version } = option
    const { componentInfo } = param
    const { label } = componentInfo
    const getParamMethod:any = registerAdapter[frameworkType][version][label]
    return getParamMethod(param)
}