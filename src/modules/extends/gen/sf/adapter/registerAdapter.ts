import { COMPONENT_TYPE, FRAMEWORK_TYPE, VERSION } from './../constant';
import { table_general } from './txsj/1.0.0/table_general';


// TODO:自动注册
export const registerAdapter = {
    [FRAMEWORK_TYPE.TXSJ]: {
        [VERSION.V1]: {
            [COMPONENT_TYPE.TABLE_GENERAL]:table_general
        }
    }
}