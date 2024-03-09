import {PAGE_TYPE} from '../../common/pageType'
import { leftListRightTableAdapter } from './leftListRightTableAdapter'
import { leftTreeRightTableAdapter } from './leftTreeRightTableAdapter'
import { leftTreeRightOrgGraphAdapter } from './leftTreeRightOrgGraphAdapter'
import { leftListRightRelationMatrixAdapter } from './leftListRightRelationMatrixAdapter'
import { leftOrgGraphRightFormAdapter } from './leftOrgGraphRightFormAdapter'
import { leftListRighOrgGraphAdapter } from './leftListRighOrgGraphAdapter'
/* Software Gen Code Require Placeholder */

export const COMPOSE_ADAPTER_MAP = {
  [PAGE_TYPE.LEFT_LIST_RIGHT_TABLE]:leftListRightTableAdapter,
	[PAGE_TYPE.LEFT_TREE_RIGHT_TABLE]:leftTreeRightTableAdapter,
	[PAGE_TYPE.LEFT_TREE_RIGHT_ORG_GRAPH]:leftTreeRightOrgGraphAdapter,
	[PAGE_TYPE.LEFT_LIST_RIGHT_RELATION_MATRIX]:leftListRightRelationMatrixAdapter,
	[PAGE_TYPE.LEFT_ORG_GRAPH_RIGHT_FORM]:leftOrgGraphRightFormAdapter,
	[PAGE_TYPE.LEFT_LIST_RIGH_ORG_GRAPH]:leftListRighOrgGraphAdapter,
	/* Software Gen Code Placeholder */
}