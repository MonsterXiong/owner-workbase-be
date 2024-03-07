const PanelComponentMap = new Map();

PanelComponentMap.set("task", () => import("./TaskForm.vue"));
PanelComponentMap.set("mission", () => import("./MissionForm.vue"));

export { PanelComponentMap };
