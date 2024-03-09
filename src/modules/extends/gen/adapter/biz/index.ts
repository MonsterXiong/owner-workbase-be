import {PAGE_TYPE} from '../../common/pageType'
import { taskOrgGraphAdapter } from './taskOrgGraphAdapter'
import { operationalConceptGraphAdapter } from './operationalConceptGraphAdapter'
import { leftListCenterOrgGraphRightFormXydAdapter } from './leftListCenterOrgGraphRightFormXydAdapter'
import { leftListCenterGeneralGraphRightFormXydAdapter } from './leftListCenterGeneralGraphRightFormXydAdapter'
/* Software Gen Code Require Placeholder */

export const BIZ_ADAPTER_MAP = {
  [PAGE_TYPE.TASK_ORG_GRAPH]:taskOrgGraphAdapter,
	[PAGE_TYPE.OPERATIONAL_CONCEPT_GRAPH]:operationalConceptGraphAdapter,
	[PAGE_TYPE.LEFT_LIST_CENTER_ORG_GRAPH_RIGHT_FORM_XYD]:leftListCenterOrgGraphRightFormXydAdapter,
	[PAGE_TYPE.LEFT_LIST_CENTER_GENERAL_GRAPH_RIGHT_FORM_XYD]:leftListCenterGeneralGraphRightFormXydAdapter,
	/* Software Gen Code Placeholder */
}