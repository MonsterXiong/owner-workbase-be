import { uuid } from "@/utils/commonUtil";

export const TaskData = [
  {
    taskId: "task02",
    taskCode: "task002",
    taskName: "抢滩登陆任务",
    target: "登录xxx滩头",
    time: "2023.12.18",
    area: "area02",
    areaName: "xx滩头",
    remark: "1202",
    parentId: "root",
    _type: "default",
    sortValue: 1,
  },
  {
    taskId: "task01",
    taskCode: "task001",
    taskName: "渡海登岛任务",
    target: "登录xxx岛",
    time: "2023.12.18",
    area: "area01",
    areaName: "xx岛屿",
    remark: "1201",
    parentId: "root",
    _type: "default",
    sortValue: 2,
  },
];

export const MissionData = [
  {
    missionId: "root",
    missionName: "打台攻台使命任务",
    missionCode: "001",
    scene: "101",
    sceneName: "这是场景名称",
    target: "击毁敌军雷达，控制城市",
    remark: "...",
    sortValue: 0,
  },
];

export const mockNodeList = [
  {
    id: "root",
    name: "打台攻台使命任务",
    parentId: "",
    properties: {
      missionId: "root",
      missionName: "打台攻台使命任务",
      missionCode: "001",
      scene: "101",
      sceneName: "这是场景名称",
      target: "击毁敌军雷达，控制城市",
      remark: "...",
      sortValue: 0,
    },
    sortValue: 0, //排序
    _type: "default", //颜色
    tag: "使命", //标签
  },
  {
    id: "child1",
    name: "渡海登岛任务",
    parentId: "root",
    properties: {
      taskId: "task02",
      taskCode: "task002",
      taskName: "抢滩登陆任务",
      target: "登录xxx滩头",
      time: "2023.12.18",
      area: "area02",
      areaName: "xx滩头",
      remark: "1202",
      parentId: "root",
      _type: "default",
      sortValue: 1,
    },
    sortValue: 1,
    tag: "渡海登岛任务", //标签
    _type: "default",
  },
  {
    id: "child2",
    name: "抢滩登陆任务",
    parentId: "root",
    properties: {
      taskId: "task01",
      taskCode: "task001",
      taskName: "渡海登岛任务",
      target: "登录xxx岛",
      time: "2023.12.18",
      area: "area01",
      areaName: "xx岛屿",
      remark: "1201",
      parentId: "root",
      _type: "default",
      sortValue: 2,
    },
    sortValue: 2,
    tag: "抢滩登陆任务", //标签
    _type: "default",
  },
];
export const AddNodeConfigCode = {
  MISSION: "mission",
  TASK: "task",
  DEFAULT: "default",
};
export const AddNodeConfig = {
  [AddNodeConfigCode.MISSION]: {
    matchCode: {
      id: "missionId",
      name: "missionName",
      parentId: "parentId",
      sortValue: "sortValue",
      _type: "_type",
    },
    template: {
      missionId: "",
      missionName: "使命任务",
      missionCode: "",
      scene: "",
      sceneName: "",
      target: "",
      remark: "",
      parentId: "",
      _type: "",
      sortValue: "",
    },
    nodeLabel: "使命任务",
    tag: "使命",
    _type: "default",
  },
  [AddNodeConfigCode.TASK]: {
    matchCode: {
      id: "taskId",
      name: "taskName",
      // tag: 'taskName',
      parentId: "parentId",
      sortValue: "sortValue",
      _type: "_type",
    },
    template: {
      taskId: "",
      taskCode: "",
      taskName: "任务",
      target: "",
      time: "",
      area: "",
      areaName: "",
      remark: "",
      parentId: "",
      _type: "",
      sortValue: "",
    },
    nodeLabel: "任务",
    // tag: '任务',
    _type: "default",
  },
  [AddNodeConfigCode.DEFAULT]: {
    matchCode: {
      id: "id",
      name: "name",
      tag: "tag",
      parentId: "parentId",
      sortValue: "sortValue",
      _type: "_type",
    },
    template: {
      id: "",
      name: "",
      tag: "",
      parentId: "",
      sortValue: "",
      _type: "",
    },
    nodeLabel: "节点",
    tag: "",
    _type: "default",
  },
};
