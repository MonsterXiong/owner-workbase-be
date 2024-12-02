import {PAGE_TYPE} from '../../common/pageType'
import { bizTableAdapter } from './bizTableAdapter'
import { bizOrgAdapter } from './bizOrgAdapter'
import { bizLeftListAndRightTableAdapter } from './bizLeftListAndRightTableAdapter'
import { bizLeftListAndRightOrgAdapter } from './bizLeftListAndRightOrgAdapter'
import { bizLeftTreeAndRightTableAdapter } from './bizLeftTreeAndRightTableAdapter'
import { bizLeftTreeAndRightOrgAdapter } from './bizLeftTreeAndRightOrgAdapter'
import { bizFormAdapter } from './bizFormAdapter'
/* Software Gen Code Require Placeholder */

export const BIZ_COMPONENT_ADAPTER_MAP = {
  [PAGE_TYPE.BIZ_TABLE]:bizTableAdapter,
	[PAGE_TYPE.BIZ_ORG]:bizOrgAdapter,
	[PAGE_TYPE.BIZ_LEFT_LIST_AND_RIGHT_TABLE]:bizLeftListAndRightTableAdapter,
	[PAGE_TYPE.BIZ_LEFT_LIST_AND_RIGHT_ORG]:bizLeftListAndRightOrgAdapter,
	[PAGE_TYPE.BIZ_LEFT_TREE_AND_RIGHT_TABLE]:bizLeftTreeAndRightTableAdapter,
	[PAGE_TYPE.BIZ_LEFT_TREE_AND_RIGHT_ORG]:bizLeftTreeAndRightOrgAdapter,
	[PAGE_TYPE.BIZ_FORM]:bizFormAdapter,
	/* Software Gen Code Placeholder */
}