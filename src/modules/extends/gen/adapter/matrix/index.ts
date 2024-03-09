import {PAGE_TYPE} from '../../common/pageType'
import { generalMatrixAdapter } from './generalMatrixAdapter'
import { relationMatrixAdapter } from './relationMatrixAdapter'
import { weightMatrixAdapter } from './weightMatrixAdapter'
/* Software Gen Code Require Placeholder */

export const MATRIX_ADAPTER_MAP = {
  [PAGE_TYPE.GENERAL_MATRIX]:generalMatrixAdapter,
	[PAGE_TYPE.RELATION_MATRIX]:relationMatrixAdapter,
	[PAGE_TYPE.WEIGHT_MATRIX]:weightMatrixAdapter,
	/* Software Gen Code Placeholder */
}