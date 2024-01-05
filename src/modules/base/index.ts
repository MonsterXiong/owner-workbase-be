  import { TestModule } from './test/test.module'
  import { WfCodeTemplateModule } from './wfCodeTemplate/wfCodeTemplate.module'
  import { WfDefTableModule } from './wfDefTable/wfDefTable.module'
  import { WfDefTableColumnModule } from './wfDefTableColumn/wfDefTableColumn.module'
  import { WfGenProjectModule } from './wfGenProject/wfGenProject.module'
  import { WfGenProjectRecordModule } from './wfGenProjectRecord/wfGenProjectRecord.module'
  import { WfViewComponentModule } from './wfViewComponent/wfViewComponent.module'
  import { WfViewMenuModule } from './wfViewMenu/wfViewMenu.module'
  import { WfViewPageModule } from './wfViewPage/wfViewPage.module'
  import { ZyDatabasePoolModule } from './zyDatabasePool/zyDatabasePool.module'

const moduleList = [
  TestModule,
  WfCodeTemplateModule,
  WfDefTableModule,
  WfDefTableColumnModule,
  WfGenProjectModule,
  WfGenProjectRecordModule,
  WfViewComponentModule,
  WfViewMenuModule,
  WfViewPageModule,
  ZyDatabasePoolModule,
]

export {
  TestModule,
  WfCodeTemplateModule,
  WfDefTableModule,
  WfDefTableColumnModule,
  WfGenProjectModule,
  WfGenProjectRecordModule,
  WfViewComponentModule,
  WfViewMenuModule,
  WfViewPageModule,
  ZyDatabasePoolModule,
}

export default moduleList