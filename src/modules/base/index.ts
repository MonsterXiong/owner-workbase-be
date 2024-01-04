  import { TestModule } from './test/test.module'
  import { WfCodeTemplateModule } from './wfCodeTemplate/wfCodeTemplate.module'
  import { WfGenProjectModule } from './wfGenProject/wfGenProject.module'
  import { WfGenProjectRecordModule } from './wfGenProjectRecord/wfGenProjectRecord.module'
  import { ZyDatabasePoolModule } from './zyDatabasePool/zyDatabasePool.module'

const moduleList = [
  TestModule,
  WfCodeTemplateModule,
  WfGenProjectModule,
  WfGenProjectRecordModule,
  ZyDatabasePoolModule,
]

export {
  TestModule,
  WfCodeTemplateModule,
  WfGenProjectModule,
  WfGenProjectRecordModule,
  ZyDatabasePoolModule,
}

export default moduleList