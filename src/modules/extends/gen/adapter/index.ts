import {CATEGORY_TYPE} from '../common/pageCategoryType'
import { TABLE_ADAPTER_MAP } from './table/index'
import { FORM_ADAPTER_MAP } from './form/index'
import { MATRIX_ADAPTER_MAP } from './matrix/index'
import { TREE_ADAPTER_MAP } from './tree/index'
import { COMPOSE_ADAPTER_MAP } from './compose/index'
import { GLOBAL_GLOBAL_ADAPTER_MAP } from './globalGlobal/index'
import { BIZ_ADAPTER_MAP } from './biz/index'
import { LAYOUT_ADAPTER_MAP } from './layout/index'
import { OTHER_ADAPTER_MAP } from './other/index'
import { LIST_ADAPTER_MAP } from './list/index'
/* Software Gen Code Require Placeholder */

export const ADAPTER_MAP = {
  [CATEGORY_TYPE.TABLE]: TABLE_ADAPTER_MAP,
  [CATEGORY_TYPE.FORM]: FORM_ADAPTER_MAP,
	[CATEGORY_TYPE.MATRIX]: MATRIX_ADAPTER_MAP,
	[CATEGORY_TYPE.TREE]: TREE_ADAPTER_MAP,
	[CATEGORY_TYPE.COMPOSE]: COMPOSE_ADAPTER_MAP,
	[CATEGORY_TYPE.GLOBAL_GLOBAL]: GLOBAL_GLOBAL_ADAPTER_MAP,
	[CATEGORY_TYPE.BIZ]: BIZ_ADAPTER_MAP,
	[CATEGORY_TYPE.LAYOUT]: LAYOUT_ADAPTER_MAP,
	[CATEGORY_TYPE.OTHER]: OTHER_ADAPTER_MAP,
	[CATEGORY_TYPE.LIST]: LIST_ADAPTER_MAP,
	/* Software Gen Code Placeholder */
}

export const adapter = (categoryType,type,param)=> {
	if(!ADAPTER_MAP[categoryType]){
		return null
	}
  return ADAPTER_MAP[categoryType][type](param)
}