- 基础使用示例
```
<template>
  <div class="battle_activity_design">
    <ActivityDesign :processList="processList" ref="activityDesignRef" :activityList="activityList" :config="config">
      // 右侧元信息定义了两个插槽来实现
      <template slot="processMetaItem" slot-scope="{ process }">
        {{ process.nodeName }}
      </template>
      <template slot="activityMetaItem" slot-scope="{ activity }">
        {{ activity.nodeName }}
      </template>
    </ActivityDesign>
  </div>
</template>
<script>
import ActivityDesign from './components/activityDesign/ActivityDesign.vue'
export default {
  name: 'XydBattleActivityDesign',
  components: { ActivityDesign },
  data() {
    return {
      config: { activityTextKey: 'nodeName', processTextKey: 'nodeName' },
      activityList: [{ nodeName: '跟踪' }, { nodeName: '巡逻' }, { nodeName: '瞄准' }, { nodeName: '监视' }],
      processList: [{ nodeName: '发现' }, { nodeName: '定位' }, { nodeName: '跟踪' }, { nodeName: '瞄准' }, { nodeName: '交战' }, { nodeName: '评估' }],
    }
  },
}
</script>

```

- 获取画布数据
组件提供了 getDiagram() 来获取画布对象
```
const diagram = this.$refs.activityDesignRef.getDiagram()
```
- 配置信息
> 后续完善