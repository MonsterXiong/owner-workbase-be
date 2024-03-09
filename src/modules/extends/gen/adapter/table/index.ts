import {PAGE_TYPE} from '../../common/pageType'
import { crudTableAdapter } from './crudTableAdapter'
import { cardTableAdapter } from './cardTableAdapter'
import { editTableAdapter } from './editTableAdapter'
import { generalTableAdapter } from './generalTableAdapter'
import { mergeTableAdapter } from './mergeTableAdapter'
import { treeTableAdapter } from './treeTableAdapter'
/* Software Gen Code Require Placeholder */

export const TABLE_ADAPTER_MAP = {
  [PAGE_TYPE.CARD_TABLE]:cardTableAdapter,
  [PAGE_TYPE.CRUD_TABLE]:crudTableAdapter,
	[PAGE_TYPE.EDIT_TABLE]:editTableAdapter,
	[PAGE_TYPE.GENERAL_TABLE]:generalTableAdapter,
	[PAGE_TYPE.MERGE_TABLE]:mergeTableAdapter,
	[PAGE_TYPE.TREE_TABLE]:treeTableAdapter,
	/* Software Gen Code Placeholder */
}