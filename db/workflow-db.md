```
应该有个项目列表 => 然后把项目数据数据存起来
```

​    项目数据有

```
1. 建立项目（项目id、项目名称、项目简称、项目标识）
    2. 项目框架（gffx框架）=>项目框架对应着git模板的地址，同时会有一份项目生成的配置文件
    3. 项目数据来源（选择对应的数据库）=>或者新建
    4. 生成services（标识=>模板样式=>选择数据库表结构（默认全选）=>确认生成路径=>生成（配置文件需要看到））
    5. 生成页面 （展示页面列表=>增删改查）
          A、批量生成管理端界面（增删改查）
          B、生成单页面-选择模板结构（）-根据模板结构去选择对应的表-然后在选择字段的时候（不同的字段可以有特殊的配置）
          C、生成路由（考虑单页面还是在baseLayout下）
```

​    疑问：       一、能否把菜单考虑进去、生成一套可以直接用的代码       二、使用Git地址进行更新       三、如何保留每次更新的记录（副本、版本号 or ...）       四、定义好一份生成记录

​    流程=>1.建立项目=>2.选择项目框架=>3.选择数据来源=>4.生成services=>5.生成页面（页面列表）





# 生成数据库表

```sql
# 创建表
CREATE TABLE `zy_database_pool` (
    `id` VARCHAR(32) NOT NULL COMMENT 'ID' COLLATE 'utf8mb4_general_ci',
    `name` VARCHAR(50) NOT NULL COMMENT '名称' COLLATE 'utf8mb4_general_ci',
    `description` VARCHAR(255) NULL DEFAULT NULL COMMENT '描述' COLLATE 'utf8mb4_general_ci',
    `order_num` INT(10) NULL DEFAULT NULL COMMENT '排序',
    `isdel` VARCHAR(1) NULL DEFAULT '0' COMMENT '是否删除' COLLATE 'utf8_general_ci',
    `creator` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建人' COLLATE 'utf8_general_ci',
    `create_time` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建时间' COLLATE 'utf8_general_ci',
    `create_ip` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建ip' COLLATE 'utf8_general_ci',
    `updater` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改人' COLLATE 'utf8_general_ci',
    `update_time` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改时间' COLLATE 'utf8_general_ci',
    `update_ip` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改ip' COLLATE 'utf8_general_ci',
    PRIMARY KEY (`id`) USING BTREE
)
COMMENT='数据池'
COLLATE='utf8mb4_general_ci'
ENGINE=InnoDB
;

# 加字段
ALTER TABLE wf_gen_project_record ADD (
    `code_template_id` VARCHAR(32) NOT NULL COMMENT 'ID' COLLATE 'utf8mb4_general_ci',
   `name` VARCHAR(50) NOT NULL COMMENT '名称' COLLATE 'utf8mb4_general_ci',
   `description` VARCHAR(255) NULL DEFAULT NULL COMMENT '描述' COLLATE 'utf8mb4_general_ci',
    `order_num` INT(10) NULL DEFAULT NULL COMMENT '排序',
    `isdel` VARCHAR(1) NULL DEFAULT '0' COMMENT '是否删除' COLLATE 'utf8_general_ci',
    `creator` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建人' COLLATE 'utf8_general_ci',
    `create_time` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建时间' COLLATE 'utf8_general_ci',
    `create_ip` VARCHAR(32) NULL DEFAULT NULL COMMENT '创建ip' COLLATE 'utf8_general_ci',
    `updater` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改人' COLLATE 'utf8_general_ci',
    `update_time` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改时间' COLLATE 'utf8_general_ci',
    `update_ip` VARCHAR(32) NULL DEFAULT NULL COMMENT '修改ip' COLLATE 'utf8_general_ci'
);
```