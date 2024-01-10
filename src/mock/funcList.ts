const { nanoid } = require('nanoid');


const id1 = nanoid();
const id2 = nanoid();
const id21 = nanoid();
export const funcList = [
    {
      id: id1,
      parent: null,
      code: 'project',
      name: '项目',
      icon: 'icon-xinjian-copy',
      menuType: 'module',
    },
    {
      id: nanoid(),
      parent: id1,
      code: 'project_info',
      name: '项目基本信息',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
    {
      id: nanoid(),
      parent: id1,
      code: 'jszbyq',
      name: '技术指标要求',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
    {
      id: id2,
      parent: null,
      code: 'design',
      name: '设计',
      icon: 'icon-xinjian-copy',
      menuType: 'module',
    },
    {
      id: id21,
      parent: id2,
      code: 'ztsj',
      name: '总体设计',
      icon: 'icon-xinjian-copy',
      menuType: 'module',
    },
    {
      id: nanoid(),
      parent: id21,
      code: 'rjsjjuece',
      name: '软件设计决策',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
    {
      id: nanoid(),
      parent: id21,
      code: 'xtywlc',
      name: '系统业务员流程',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
    {
      id: nanoid(),
      parent: id21,
      code: 'jsjgsj',
      name: '技术架构设计',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
    {
      id: nanoid(),
      parent: id21,
      code: 'xtjgsj',
      name: '系统架构设计',
      icon: 'icon-xinjian-copy',
      menuType: 'page',
    },
  ];