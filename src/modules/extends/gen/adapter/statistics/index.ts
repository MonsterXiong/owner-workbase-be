import {PAGE_TYPE} from '../../common/pageType'
import { statisticsPieAdapter } from './statisticsPieAdapter'
import { statisticsLineAdapter } from './statisticsLineAdapter'
import { statisticsBarAdapter } from './statisticsBarAdapter'
import { statisticsScatterAdapter } from './statisticsScatterAdapter'
import { statisticsRadarAdapter } from './statisticsRadarAdapter'
import { statisticsRelationAdapter } from './statisticsRelationAdapter'
import { statisticsMatrixtreeAdapter } from './statisticsMatrixtreeAdapter'
import { statisticsRisingsunAdapter } from './statisticsRisingsunAdapter'
import { statisticsSankeyAdapter } from './statisticsSankeyAdapter'
import { statisticsInstrumentpanelAdapter } from './statisticsInstrumentpanelAdapter'
import { statistics_3dbarAdapter } from './statistics_3dbarAdapter'
/* Software Gen Code Require Placeholder */

export const STATISTICS_ADAPTER_MAP = {
  [PAGE_TYPE.STATISTICS_PIE]:statisticsPieAdapter,
	[PAGE_TYPE.STATISTICS_LINE]:statisticsLineAdapter,
	[PAGE_TYPE.STATISTICS_BAR]:statisticsBarAdapter,
	[PAGE_TYPE.STATISTICS_SCATTER]:statisticsScatterAdapter,
	[PAGE_TYPE.STATISTICS_RADAR]:statisticsRadarAdapter,
	[PAGE_TYPE.STATISTICS_RELATION]:statisticsRelationAdapter,
	[PAGE_TYPE.STATISTICS_MATRIXTREE]:statisticsMatrixtreeAdapter,
	[PAGE_TYPE.STATISTICS_RISINGSUN]:statisticsRisingsunAdapter,
	[PAGE_TYPE.STATISTICS_SANKEY]:statisticsSankeyAdapter,
	[PAGE_TYPE.STATISTICS_INSTRUMENTPANEL]:statisticsInstrumentpanelAdapter,
	[PAGE_TYPE.STATISTICS_3DBAR]:statistics_3dbarAdapter,
	/* Software Gen Code Placeholder */
}