import {PAGE_TYPE} from '../../common/pageType'
import { readOnlyWordAdapter } from './readOnlyWordAdapter'
import { battleActivityDesignAdapter } from './battleActivityDesignAdapter'
/* Software Gen Code Require Placeholder */

export const OTHER_ADAPTER_MAP = {
  [PAGE_TYPE.READ_ONLY_WORD]:readOnlyWordAdapter,
	[PAGE_TYPE.BATTLE_ACTIVITY_DESIGN]:battleActivityDesignAdapter,
	/* Software Gen Code Placeholder */
}