export const COMPOSE_TYPE = {
  CRUD: 'crud',
  LEFT_TREE_RIGHT_TABLE: 'leftTreeRightTable',
};

export const TEMPLATE_MAP = {
  // base
  dialog: 'public/template/fe/base/dialog.ejs',
  queryForm: 'public/template/fe/base/queryForm.ejs',
  table: 'public/template/fe/base/table.ejs',
  tree: 'public/template/fe/base/tree.ejs',

  crud: 'public/template/fe/common/crud.ejs',
  leftTreeRightTable: 'public/template/fe/common/leftTreeRightTable.ejs',
};

export const COMPOSE = [
  {
    type: COMPOSE_TYPE.CRUD,
    structure: {
      components: ['dialog', 'table', 'queryForm'],
      entry: 'crud',
    },
  },
  {
    type: COMPOSE_TYPE.LEFT_TREE_RIGHT_TABLE,
    structure: {
      rightTable: ['dialog', 'table', 'queryForm'],
      leftTree: ['dialog', 'tree', 'queryForm'],
      entry: 'leftTreeRightTable',
    },
  },
];

export const COMPOSE_DATA = COMPOSE.reduce((res, item) => {
  const { type, structure } = item;
  const params = {};
  Object.keys(structure).forEach((key) => {
    const currentStructure = structure[key];
    if (Array.isArray(currentStructure)) {
      params[key] = {};
      currentStructure.forEach((structureItem) => {
        params[key][structureItem] = TEMPLATE_MAP[structureItem];
      });
    } else {
      params[currentStructure] = TEMPLATE_MAP[currentStructure];
    }
  });
  res[type] = params;
  return res;
}, {});

console.log(COMPOSE_DATA);
