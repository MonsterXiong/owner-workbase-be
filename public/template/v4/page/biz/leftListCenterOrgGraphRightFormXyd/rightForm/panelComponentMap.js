const PanelComponentMap = new Map()

// PanelComponentMap.set('task', () => import('./TaskForm.vue'))
PanelComponentMap.set('sample', () => import('./SampleForm.vue'))

export { PanelComponentMap }
