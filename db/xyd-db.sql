-- --------------------------------------------------------
-- 主机:                           192.168.2.204
-- 服务器版本:                        5.7.30 - MySQL Community Server (GPL)
-- 服务器操作系统:                      linux-glibc2.12
-- HeidiSQL 版本:                  12.0.0.6468
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 xyd_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `xyd_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `xyd_db`;

-- 导出  表 xyd_db.s_company 结构
CREATE TABLE IF NOT EXISTS `s_company` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `company_name` varchar(200) DEFAULT NULL COMMENT '公司名称',
  `company_code` varchar(50) DEFAULT NULL COMMENT '公司代码',
  `company_desc` varchar(200) DEFAULT NULL COMMENT '公司描述',
  `company_owner` varchar(200) DEFAULT NULL COMMENT '公司负责人',
  `company_address` varchar(200) DEFAULT NULL COMMENT '公司地址',
  `company_tel` varchar(200) DEFAULT NULL COMMENT '公司电话',
  `longitude` varchar(32) DEFAULT NULL COMMENT '位置经度',
  `latitude` varchar(32) DEFAULT NULL COMMENT '位置维度',
  `enable` varchar(1) DEFAULT NULL COMMENT '是否启用',
  `isdel` varchar(1) DEFAULT NULL COMMENT '是否删除',
  `creator` varchar(32) NOT NULL COMMENT '创建人',
  `create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `updator` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='公司信息表';

-- 正在导出表  xyd_db.s_company 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_db_update 结构
CREATE TABLE IF NOT EXISTS `s_db_update` (
  `module` varchar(100) NOT NULL DEFAULT '',
  `version` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`module`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='数据结构更新表';

-- 正在导出表  xyd_db.s_db_update 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_db_update_json 结构
CREATE TABLE IF NOT EXISTS `s_db_update_json` (
  `module` varchar(100) NOT NULL DEFAULT '' COMMENT '模块标识',
  `year` int(11) DEFAULT NULL COMMENT '年份',
  `version` varchar(100) NOT NULL COMMENT 'sql版本',
  `comment` varchar(255) DEFAULT NULL COMMENT '注释',
  `create_by` varchar(32) DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `update_by` varchar(32) DEFAULT NULL COMMENT '更新人',
  `update_time` varchar(32) DEFAULT NULL COMMENT '更新时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据结构更新表';

-- 正在导出表  xyd_db.s_db_update_json 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_dept 结构
CREATE TABLE IF NOT EXISTS `s_dept` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `dept_code` varchar(5) NOT NULL COMMENT '单位代码',
  `dept_name` varchar(40) NOT NULL COMMENT '单位名称',
  `parent` varchar(32) NOT NULL DEFAULT '0' COMMENT '所属单位',
  `level` int(10) DEFAULT NULL COMMENT '单位级别',
  `type` varchar(10) DEFAULT NULL COMMENT '单位类型',
  `location` varchar(255) DEFAULT NULL COMMENT '单位位置',
  `status` int(1) DEFAULT '1' COMMENT '可用状态',
  `sort` int(11) DEFAULT '0' COMMENT '单位排序',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  `company_id` varchar(32) DEFAULT NULL COMMENT '所属公司',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='单位信息表';

-- 正在导出表  xyd_db.s_dept 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_dict 结构
CREATE TABLE IF NOT EXISTS `s_dict` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `code` varchar(30) NOT NULL COMMENT '数据代码',
  `name` varchar(100) NOT NULL COMMENT '数据名称',
  `category` varchar(32) NOT NULL COMMENT '数据分类',
  `alias` varchar(100) DEFAULT NULL COMMENT '数据别名',
  `extend` varchar(50) DEFAULT NULL COMMENT '扩展',
  `sort` int(11) DEFAULT '0' COMMENT '数据排序',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ind_dict_cateory_code` (`category`,`code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典数据表';

-- 正在导出表  xyd_db.s_dict 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_dict_category 结构
CREATE TABLE IF NOT EXISTS `s_dict_category` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `code` varchar(50) NOT NULL COMMENT '分类代码',
  `name` varchar(100) NOT NULL COMMENT '分类名称',
  `type` varchar(5) DEFAULT '1' COMMENT '分类类别',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `ind_dict_cateory_code` (`code`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='字典分类表';

-- 正在导出表  xyd_db.s_dict_category 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_log 结构
CREATE TABLE IF NOT EXISTS `s_log` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `user_id` varchar(32) NOT NULL COMMENT '操作用户',
  `type` varchar(80) NOT NULL COMMENT '日志类型',
  `content` varchar(200) NOT NULL COMMENT '日志内容',
  `ip` varchar(200) DEFAULT NULL COMMENT '日志IP',
  `bid` varchar(32) DEFAULT NULL COMMENT '业务ID',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  `url` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统日志表';

-- 正在导出表  xyd_db.s_log 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_message 结构
CREATE TABLE IF NOT EXISTS `s_message` (
  `message_id` varchar(32) NOT NULL DEFAULT '' COMMENT '消息ID',
  `message_type` varchar(32) DEFAULT NULL COMMENT '消息类型',
  `send_user_id` varchar(32) NOT NULL COMMENT '发送用户ID',
  `to_uesr_id` varchar(32) NOT NULL COMMENT '接受用户ID',
  `message_content` varchar(200) DEFAULT NULL COMMENT '消息内容',
  `state` int(11) NOT NULL COMMENT '状态',
  `reader_time` datetime NOT NULL COMMENT '读取消息时间',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `url` varchar(200) DEFAULT NULL COMMENT '关联URL',
  `bid` varchar(32) NOT NULL COMMENT '扩展业务ID',
  `creator` varchar(32) NOT NULL COMMENT '创建人',
  `create_time` datetime NOT NULL COMMENT '创建时间',
  `updator` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`message_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息通知表';

-- 正在导出表  xyd_db.s_message 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_message_read 结构
CREATE TABLE IF NOT EXISTS `s_message_read` (
  `read_id` varchar(32) DEFAULT NULL COMMENT '主键',
  `read_user_id` varchar(32) DEFAULT NULL COMMENT '读取用户ID',
  `state` int(11) DEFAULT '1' COMMENT '消息状态',
  `message_id` varchar(32) DEFAULT NULL COMMENT '消息ID',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `create_time` datetime DEFAULT NULL COMMENT '创建时间',
  `updator` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` datetime DEFAULT NULL COMMENT '修改时间'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='消息读取表';

-- 正在导出表  xyd_db.s_message_read 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_role 结构
CREATE TABLE IF NOT EXISTS `s_role` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `role_code` varchar(32) NOT NULL COMMENT '角色代码',
  `role_name` varchar(40) NOT NULL COMMENT '角色名称',
  `is_sys` int(1) NOT NULL DEFAULT '0' COMMENT '是否系统角色',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  `is_built_in` int(1) NOT NULL DEFAULT '0' COMMENT '是否为内置角色标识',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色信息表';

-- 正在导出表  xyd_db.s_role 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_role_function 结构
CREATE TABLE IF NOT EXISTS `s_role_function` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `role_id` varchar(32) DEFAULT NULL COMMENT '角色ID',
  `fun_id` varchar(32) DEFAULT NULL COMMENT '功能ID',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='角色功能表';

-- 正在导出表  xyd_db.s_role_function 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_secret_log 结构
CREATE TABLE IF NOT EXISTS `s_secret_log` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `user_id` varchar(32) NOT NULL COMMENT '操作用户',
  `type` varchar(10) NOT NULL COMMENT '日志类型',
  `content` varchar(200) NOT NULL COMMENT '日志内容',
  `ip` varchar(200) DEFAULT NULL COMMENT '日志IP',
  `bid` varchar(32) DEFAULT NULL COMMENT '业务ID',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  `url` varchar(200) DEFAULT NULL,
  `role_id` varchar(32) NOT NULL COMMENT '角色ID',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='三员日志表';

-- 正在导出表  xyd_db.s_secret_log 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_systemset 结构
CREATE TABLE IF NOT EXISTS `s_systemset` (
  `skey` varchar(32) NOT NULL COMMENT '设置键',
  `svalue` varchar(32) DEFAULT NULL COMMENT '设置值',
  `category` varchar(20) DEFAULT NULL COMMENT '分类代码',
  `type` varchar(20) DEFAULT NULL COMMENT '数据类型',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`skey`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统设置表';

-- 正在导出表  xyd_db.s_systemset 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_task_plan 结构
CREATE TABLE IF NOT EXISTS `s_task_plan` (
  `task_id` varchar(40) NOT NULL DEFAULT '' COMMENT 'id',
  `task_name` varchar(200) NOT NULL COMMENT '任务名称',
  `task_type` varchar(50) DEFAULT NULL COMMENT '任务类型',
  `cycle_type` varchar(50) DEFAULT NULL COMMENT '周期类型',
  `run_time` varchar(50) DEFAULT NULL COMMENT '运行时间',
  `last_run_time` datetime DEFAULT NULL COMMENT '上次运行时间',
  `next_run_time` datetime DEFAULT NULL COMMENT '下次运行时间',
  `task_status` int(11) DEFAULT NULL COMMENT '状态类型',
  `task_description` varchar(200) DEFAULT NULL COMMENT '备注',
  `task_cjr` varchar(32) DEFAULT NULL COMMENT '创建人',
  `task_cjsj` datetime DEFAULT NULL COMMENT '创建时间',
  `task_xgr` varchar(32) DEFAULT NULL COMMENT '修改人',
  `task_xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='后台计划任务';

-- 正在导出表  xyd_db.s_task_plan 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_task_record 结构
CREATE TABLE IF NOT EXISTS `s_task_record` (
  `record_id` varchar(32) NOT NULL DEFAULT '' COMMENT '任务记录id',
  `task_id` varchar(32) DEFAULT '' COMMENT '任务详情id',
  `record_name` varchar(200) DEFAULT NULL COMMENT '任务记录名称',
  `record_run_time` datetime DEFAULT NULL COMMENT '运行时间',
  `record_result` int(11) DEFAULT NULL COMMENT '运行结果',
  `record_message` varchar(200) DEFAULT NULL COMMENT '运行信息',
  PRIMARY KEY (`record_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='任务记录';

-- 正在导出表  xyd_db.s_task_record 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_user 结构
CREATE TABLE IF NOT EXISTS `s_user` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `account` varchar(30) NOT NULL COMMENT '帐号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `realname` varchar(40) DEFAULT NULL COMMENT '真实姓名',
  `nickname` varchar(60) DEFAULT NULL COMMENT '用户昵称',
  `sex` int(1) DEFAULT NULL COMMENT '性别',
  `birthday` varchar(10) DEFAULT NULL COMMENT '生日',
  `email` varchar(60) DEFAULT NULL COMMENT '邮箱',
  `qq` varchar(12) DEFAULT NULL COMMENT 'QQ号',
  `telphone` varchar(20) DEFAULT NULL COMMENT '电话',
  `address` varchar(120) DEFAULT NULL COMMENT '地址',
  `dept_id` varchar(32) DEFAULT NULL COMMENT '单位ID',
  `dept_name` varchar(200) DEFAULT NULL COMMENT '部门名称',
  `status` int(1) NOT NULL DEFAULT '1' COMMENT '状态',
  `user_type` int(1) DEFAULT '0' COMMENT '用户类型',
  `lock_time` datetime DEFAULT NULL COMMENT '锁定时间',
  `ip` varchar(20) DEFAULT NULL COMMENT '注册IP',
  `theme` varchar(50) DEFAULT NULL COMMENT '主题风格',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  `security_clazz` int(1) DEFAULT NULL COMMENT '密*级',
  `last_change_password_time` datetime DEFAULT NULL COMMENT '上次修改密码时间',
  `usb_code` varchar(50) DEFAULT NULL COMMENT 'USBKey标识',
  `usb_code_type` varchar(50) DEFAULT NULL COMMENT 'USBKey类型',
  `is_built_in` int(1) NOT NULL DEFAULT '0' COMMENT '是否内置用户',
  `company_id` varchar(32) DEFAULT NULL COMMENT '所属公司',
  `picture_path` varchar(200) DEFAULT NULL COMMENT '用户头像',
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `account` (`account`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户信息表';

-- 正在导出表  xyd_db.s_user 的数据：~1 rows (大约)
INSERT INTO `s_user` (`id`, `account`, `password`, `realname`, `nickname`, `sex`, `birthday`, `email`, `qq`, `telphone`, `address`, `dept_id`, `dept_name`, `status`, `user_type`, `lock_time`, `ip`, `theme`, `remark`, `cjr`, `cjsj`, `xgr`, `xgsj`, `security_clazz`, `last_change_password_time`, `usb_code`, `usb_code_type`, `is_built_in`, `company_id`, `picture_path`) VALUES
	('1', 'admin', 'e10adc3949ba59abbe56e057f20f883e', 'Admin', 'admin', 2, '2019-04-03', 'yuquan0405@sina.com', '', '18673159273', '麓天路银河科技园', '87ea5681bf1643e1b6a13f11c22b3bc2', '10086', 1, 1, NULL, NULL, NULL, '123', 'admin', '2019-04-10 09:32:06', 'admin', '2023-07-27 15:17:53', 2, '2023-07-27 15:17:53', NULL, NULL, 0, NULL, 'picture/2021-06/42a94e3689924809a3af30b6474710ea.jpg');

-- 导出  表 xyd_db.s_user_login 结构
CREATE TABLE IF NOT EXISTS `s_user_login` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `account` varchar(30) NOT NULL COMMENT '用户账号',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户登录信息表';

-- 正在导出表  xyd_db.s_user_login 的数据：~0 rows (大约)

-- 导出  表 xyd_db.s_user_role 结构
CREATE TABLE IF NOT EXISTS `s_user_role` (
  `id` varchar(32) NOT NULL COMMENT 'ID',
  `user_id` varchar(32) NOT NULL COMMENT '用户ID',
  `role_id` varchar(32) NOT NULL COMMENT '角色ID',
  `remark` varchar(100) DEFAULT NULL COMMENT '备注',
  `cjr` varchar(30) NOT NULL COMMENT '创建人',
  `cjsj` datetime NOT NULL COMMENT '创建时间',
  `xgr` varchar(30) DEFAULT NULL COMMENT '修改人',
  `xgsj` datetime DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='用户角色表';

-- 正在导出表  xyd_db.s_user_role 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_act 结构
CREATE TABLE IF NOT EXISTS `xyd_act` (
  `act_id` varchar(32) NOT NULL COMMENT '活动ID',
  `act_name` varchar(200) NOT NULL COMMENT '活动名称',
  `act_code` varchar(50) NOT NULL COMMENT '活动标识',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_unit` varchar(32) NOT NULL COMMENT '所属单元',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`act_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战活动';

-- 正在导出表  xyd_db.xyd_act 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_act_index 结构
CREATE TABLE IF NOT EXISTS `xyd_act_index` (
  `index_id` varchar(32) NOT NULL COMMENT '指标ID',
  `index_name` varchar(200) NOT NULL COMMENT '指标名称',
  `index_value` varchar(200) NOT NULL COMMENT '指标值',
  `data_unit` varchar(50) NOT NULL COMMENT '指标单位',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_act` varchar(32) NOT NULL COMMENT '所属活动',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`index_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='活动指标';

-- 正在导出表  xyd_db.xyd_act_index 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi` (
  `abi_id` varchar(32) NOT NULL COMMENT '能力ID',
  `abi_name` varchar(200) NOT NULL COMMENT '能力名称',
  `abi_code` varchar(50) NOT NULL COMMENT '能力标识',
  `attributes` varchar(500) NOT NULL COMMENT '能力属性',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `parent_id` varchar(32) NOT NULL COMMENT '所属父级',
  `bind_type` varchar(100) NOT NULL COMMENT '所属类型',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`abi_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力';

-- 正在导出表  xyd_db.xyd_battle_abi 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_index 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_index` (
  `index_id` varchar(32) NOT NULL COMMENT '指标ID',
  `index_name` varchar(200) NOT NULL COMMENT '指标名称',
  `index_value` varchar(200) NOT NULL COMMENT '指标值',
  `data_unit` varchar(50) NOT NULL COMMENT '指标单位',
  `bind_type` varchar(100) NOT NULL COMMENT '所属类型',
  `bind_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`index_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力指标';

-- 正在导出表  xyd_db.xyd_battle_abi_index 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_index_required_item 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_index_required_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `item_name` varchar(200) NOT NULL COMMENT '条目名称',
  `item_value` varchar(50) NOT NULL COMMENT '条目值',
  `bind_index` varchar(32) NOT NULL COMMENT '所属指标',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_verision` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_abi_item` varchar(32) NOT NULL COMMENT '所属能力条目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力指标需求条目';

-- 正在导出表  xyd_db.xyd_battle_abi_index_required_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_item 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(255) NOT NULL COMMENT '条目名称',
  `bind_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `parent_id` varchar(32) NOT NULL COMMENT '父级ID',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力条目';

-- 正在导出表  xyd_db.xyd_battle_abi_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_required_item 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_required_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `item_name` varchar(200) NOT NULL COMMENT '条目名称',
  `item_value` varchar(50) NOT NULL COMMENT '条目值',
  `bind_index` varchar(32) NOT NULL COMMENT '所属指标',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力需求条目';

-- 正在导出表  xyd_db.xyd_battle_abi_required_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_to_act_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_to_act_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关联ID',
  `bind_act` varchar(32) NOT NULL COMMENT '所属活动',
  `bind_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力与活动映射';

-- 正在导出表  xyd_db.xyd_battle_abi_to_act_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_to_tixi_abi_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_to_tixi_abi_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `bind_battle_abi` varchar(32) NOT NULL COMMENT '所属作战能力',
  `bind_tixi_abi` varchar(32) NOT NULL COMMENT '所属体系能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `rel_degree` varchar(50) NOT NULL COMMENT '关联程度',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力与体系能力映射';

-- 正在导出表  xyd_db.xyd_battle_abi_to_tixi_abi_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_battle_abi_version 结构
CREATE TABLE IF NOT EXISTS `xyd_battle_abi_version` (
  `version_id` varchar(32) NOT NULL COMMENT '版本ID',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `history_flag` int(1) NOT NULL COMMENT '是否历史版本',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`version_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战能力基线版本';

-- 正在导出表  xyd_db.xyd_battle_abi_version 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_deploy_node 结构
CREATE TABLE IF NOT EXISTS `xyd_deploy_node` (
  `node_id` varchar(32) NOT NULL COMMENT '节点ID',
  `node_name` varchar(200) NOT NULL COMMENT '节点名称',
  `bind_camp` varchar(200) NOT NULL COMMENT '所属阵营',
  `start_time` varchar(100) NOT NULL COMMENT '开始时间',
  `end_time` varchar(100) NOT NULL COMMENT '结束时间',
  `lon` double(10,2) NOT NULL COMMENT '经度',
  `lat` double(10,2) NOT NULL COMMENT '纬度',
  `bind_damage` varchar(200) NOT NULL COMMENT '毁伤情况',
  `bind_protection` varchar(200) NOT NULL COMMENT '防护等级',
  `society` varchar(500) NOT NULL COMMENT '社会民情',
  `bind_scheme` varchar(32) NOT NULL COMMENT '所属场景',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_equip` varchar(32) NOT NULL COMMENT '所属装备',
  `bind_org` varchar(32) NOT NULL COMMENT '所属组织',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`node_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='部署节点';

-- 正在导出表  xyd_db.xyd_deploy_node 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_equip 结构
CREATE TABLE IF NOT EXISTS `xyd_equip` (
  `equip_id` varchar(32) NOT NULL COMMENT '装备ID',
  `equip_name` varchar(200) NOT NULL COMMENT '装备名称',
  `equip_code` varchar(50) NOT NULL COMMENT '装备标识',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_unit` varchar(32) NOT NULL COMMENT '所属单元',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`equip_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='装备';

-- 正在导出表  xyd_db.xyd_equip 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_equip_function 结构
CREATE TABLE IF NOT EXISTS `xyd_equip_function` (
  `function_id` varchar(32) NOT NULL COMMENT '功能ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `attr` varchar(255) NOT NULL COMMENT '属性',
  `description` varchar(5000) NOT NULL COMMENT '描述',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_equip` varchar(32) NOT NULL COMMENT '所属装备',
  `value` double(5,2) NOT NULL COMMENT '值',
  `unit` varchar(50) NOT NULL COMMENT '单位',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`function_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='装备功能';

-- 正在导出表  xyd_db.xyd_equip_function 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_equip_function_required_item 结构
CREATE TABLE IF NOT EXISTS `xyd_equip_function_required_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(32) NOT NULL COMMENT '条目名称',
  `value` double(5,2) NOT NULL COMMENT '条目值',
  `bind_function` varchar(32) NOT NULL COMMENT '所属装备',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_equip_item` varchar(32) NOT NULL COMMENT '所属装备条目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='装备功能需求条目';

-- 正在导出表  xyd_db.xyd_equip_function_required_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_equip_item 结构
CREATE TABLE IF NOT EXISTS `xyd_equip_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(50) NOT NULL COMMENT '条目名称',
  `bind_equip` varchar(32) NOT NULL COMMENT '所属装备',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `parent_id` varchar(32) NOT NULL COMMENT '父级ID',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='装备条目';

-- 正在导出表  xyd_db.xyd_equip_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_equip_version 结构
CREATE TABLE IF NOT EXISTS `xyd_equip_version` (
  `version_id` varchar(32) NOT NULL COMMENT '版本ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `history_flag` int(1) NOT NULL COMMENT '是否历史版本',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`version_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='装备基线版本';

-- 正在导出表  xyd_db.xyd_equip_version 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_organ 结构
CREATE TABLE IF NOT EXISTS `xyd_organ` (
  `org_id` varchar(32) NOT NULL COMMENT '组织id',
  `org_name` varchar(200) NOT NULL COMMENT '组织名称',
  `org_code` varchar(50) NOT NULL COMMENT '组织表示',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `parent_id` varchar(32) NOT NULL COMMENT '所属父级',
  `bind_unit` varchar(32) NOT NULL COMMENT '所属单元',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`org_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='组织';

-- 正在导出表  xyd_db.xyd_organ 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_platfom 结构
CREATE TABLE IF NOT EXISTS `xyd_platfom` (
  `platform_id` varchar(32) NOT NULL COMMENT '平台ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`platform_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台';

-- 正在导出表  xyd_db.xyd_platfom 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_platorm_exchange_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_platorm_exchange_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `source_platform` varchar(32) NOT NULL COMMENT '源平台',
  `target_platform` varchar(32) NOT NULL COMMENT '目标平台',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台交互关系';

-- 正在导出表  xyd_db.xyd_platorm_exchange_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_project 结构
CREATE TABLE IF NOT EXISTS `xyd_project` (
  `project_id` varchar(32) NOT NULL COMMENT '项目ID',
  `project_name` varchar(50) NOT NULL COMMENT '项目名称',
  `mission` varchar(2000) NOT NULL COMMENT '使命',
  `bind_battle_abi_verion` varchar(32) NOT NULL COMMENT '当前作战能力版本',
  `bind_tixi_abi_version` varchar(32) NOT NULL COMMENT '当前体系能力版本',
  `bind_sys_abi_version` varchar(32) NOT NULL COMMENT '当前系统能力',
  `bind_function_version` varchar(32) NOT NULL COMMENT '当前装备功能版本',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目';

-- 正在导出表  xyd_db.xyd_project 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_required_change 结构
CREATE TABLE IF NOT EXISTS `xyd_required_change` (
  `exchange_id` varchar(32) NOT NULL COMMENT '变更ID',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `bind_proejct` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`exchange_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='需求变更申请';

-- 正在导出表  xyd_db.xyd_required_change 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_required_change_item 结构
CREATE TABLE IF NOT EXISTS `xyd_required_change_item` (
  `item_id` varchar(32) NOT NULL COMMENT '变更项ID',
  `staff` varchar(50) NOT NULL COMMENT '变更人员',
  `module` varchar(32) NOT NULL COMMENT '变更模块',
  `change_index` varchar(32) NOT NULL COMMENT '变更指标',
  `reason` varchar(500) NOT NULL COMMENT '变更原因',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `type` varchar(50) NOT NULL COMMENT '指标类型',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='需求变更项';

-- 正在导出表  xyd_db.xyd_required_change_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_scheme 结构
CREATE TABLE IF NOT EXISTS `xyd_scheme` (
  `scheme_id` varchar(32) NOT NULL COMMENT '场景ID',
  `scheme_name` varchar(50) NOT NULL COMMENT '场景名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`scheme_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='场景';

-- 正在导出表  xyd_db.xyd_scheme 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_stage 结构
CREATE TABLE IF NOT EXISTS `xyd_stage` (
  `stage_id` varchar(32) NOT NULL COMMENT '环节ID',
  `stage_name` varchar(200) NOT NULL COMMENT '环节名称',
  `bind_stage_scheme` varchar(32) NOT NULL COMMENT '所属环节方案',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`stage_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战环节';

-- 正在导出表  xyd_db.xyd_stage 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_stage_scheme 结构
CREATE TABLE IF NOT EXISTS `xyd_stage_scheme` (
  `stage_scheme_id` varchar(32) NOT NULL COMMENT '环节方案ID',
  `stage_scheme_name` varchar(32) NOT NULL COMMENT '环节方案名称',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`stage_scheme_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='环节方案';

-- 正在导出表  xyd_db.xyd_stage_scheme 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_system 结构
CREATE TABLE IF NOT EXISTS `xyd_system` (
  `sys_id` varchar(32) NOT NULL COMMENT '系统ID',
  `code` varchar(32) NOT NULL COMMENT '标识',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `bind_platform` varchar(32) NOT NULL COMMENT '所属平台',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`sys_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统';

-- 正在导出表  xyd_db.xyd_system 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_system_exchange_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_system_exchange_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `source_sys` varchar(32) NOT NULL COMMENT '源系统',
  `target_sys` varchar(32) NOT NULL COMMENT '目标系统',
  `content` varchar(500) NOT NULL COMMENT '内容',
  `data_type` varchar(50) NOT NULL COMMENT '数据格式',
  `frequency` varchar(50) NOT NULL COMMENT '交换频率',
  `means` varchar(50) NOT NULL COMMENT '交互手段',
  `event` varchar(50) NOT NULL COMMENT '触发事件',
  `requirement` varchar(50) NOT NULL COMMENT '保密要求',
  `form` varchar(50) NOT NULL COMMENT '交互形式',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统交互关系';

-- 正在导出表  xyd_db.xyd_system_exchange_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi` (
  `abi_id` varchar(32) NOT NULL COMMENT '能力ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `code` varchar(32) NOT NULL COMMENT '标识',
  `description` varchar(5000) NOT NULL COMMENT '描述',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `parent_id` varchar(32) NOT NULL COMMENT '所属父级',
  `bind_sys` varchar(32) NOT NULL COMMENT '所属系统',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`abi_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力';

-- 正在导出表  xyd_db.xyd_sys_abi 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi_index 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi_index` (
  `index_id` varchar(32) NOT NULL COMMENT '指标ID',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `value` double(5,2) NOT NULL COMMENT '指标值',
  `unit` varchar(50) NOT NULL COMMENT '单位',
  `bind_sys_abi` varchar(32) NOT NULL COMMENT '所属系统能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`index_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力指标';

-- 正在导出表  xyd_db.xyd_sys_abi_index 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi_index_required_item 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi_index_required_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(50) NOT NULL COMMENT '条目名称',
  `value` varchar(50) NOT NULL COMMENT '条目值',
  `bind_index` varchar(32) NOT NULL COMMENT '所属指标',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_sys_abi_item` varchar(32) NOT NULL COMMENT '所属能力条目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力指标需求条目';

-- 正在导出表  xyd_db.xyd_sys_abi_index_required_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi_item 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `bind_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `parent_id` varchar(32) NOT NULL COMMENT '父级ID',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力条目';

-- 正在导出表  xyd_db.xyd_sys_abi_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi_to_equip_function_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi_to_equip_function_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `bind_sys_abi` varchar(32) NOT NULL COMMENT '所属系统能力',
  `bind_function` varchar(32) NOT NULL COMMENT '所属装备功能',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力与装备功能映射';

-- 正在导出表  xyd_db.xyd_sys_abi_to_equip_function_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_abi_version 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_abi_version` (
  `version_id` varchar(32) NOT NULL COMMENT '版本ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`version_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统能力基线版本';

-- 正在导出表  xyd_db.xyd_sys_abi_version 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_sys_equip_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_sys_equip_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `bind_sys` varchar(32) NOT NULL COMMENT '所属系统',
  `bind_equip` varchar(32) NOT NULL COMMENT '所属装备',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='系统装备关联';

-- 正在导出表  xyd_db.xyd_sys_equip_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_task 结构
CREATE TABLE IF NOT EXISTS `xyd_task` (
  `task_id` varchar(32) NOT NULL COMMENT '任务ID',
  `task_name` varchar(200) NOT NULL COMMENT '任务名称',
  `task_target` varchar(200) NOT NULL COMMENT '任务目标',
  `task_time` varchar(200) NOT NULL COMMENT '任务时间',
  `task_area` varchar(500) NOT NULL COMMENT '任务区域',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_tage_cheme` varchar(32) NOT NULL COMMENT '所属环节方案',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`task_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战任务';

-- 正在导出表  xyd_db.xyd_task 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi` (
  `tixi_abi_id` varchar(32) NOT NULL COMMENT '体系能力ID',
  `code` varchar(32) NOT NULL COMMENT '标识',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `description` varchar(255) NOT NULL COMMENT '描述',
  `attr` varchar(5000) NOT NULL COMMENT '属性',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `parent_id` varchar(32) NOT NULL COMMENT '所属父级',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`tixi_abi_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力';

-- 正在导出表  xyd_db.xyd_tixi_abi 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi_index 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi_index` (
  `index_id` varchar(32) NOT NULL COMMENT '指标ID',
  `name` varchar(50) NOT NULL COMMENT '指标名称',
  `value` double(5,2) NOT NULL COMMENT '指标值',
  `unit` varchar(50) NOT NULL COMMENT '指标单位',
  `type` varchar(50) NOT NULL COMMENT '所属类型',
  `bind_tixi_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`index_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力指标';

-- 正在导出表  xyd_db.xyd_tixi_abi_index 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi_index_required_item 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi_index_required_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `item_name` varchar(200) NOT NULL COMMENT '条目名称',
  `item_value` varchar(50) NOT NULL COMMENT '条目值',
  `bind_index` varchar(32) NOT NULL COMMENT '所属指标',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_tixi_abi_item` varchar(32) NOT NULL COMMENT '所属体系能力条目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力指标需求条目';

-- 正在导出表  xyd_db.xyd_tixi_abi_index_required_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi_item 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi_item` (
  `item_id` varchar(32) NOT NULL COMMENT '条目ID',
  `name` varchar(500) NOT NULL COMMENT '条目名称',
  `bind_abi` varchar(32) NOT NULL COMMENT '所属能力',
  `bind_version` varchar(32) NOT NULL COMMENT '所属版本',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `parent_id` varchar(32) NOT NULL COMMENT '父级ID',
  `sys_level_code` varchar(400) DEFAULT NULL COMMENT '层次标识',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`item_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力条目';

-- 正在导出表  xyd_db.xyd_tixi_abi_item 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi_to_sys_abi_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi_to_sys_abi_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `bind_tixi_abi` varchar(32) NOT NULL COMMENT '所属体系能力',
  `bind_sys_abi` varchar(32) NOT NULL COMMENT '所属系统能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力与系统能力映射';

-- 正在导出表  xyd_db.xyd_tixi_abi_to_sys_abi_rel 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_tixi_abi_version 结构
CREATE TABLE IF NOT EXISTS `xyd_tixi_abi_version` (
  `version_id` varchar(32) NOT NULL COMMENT '版本ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `history_flag` int(1) NOT NULL COMMENT '是否历史版本',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`version_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='体系能力基线版本';

-- 正在导出表  xyd_db.xyd_tixi_abi_version 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_unit 结构
CREATE TABLE IF NOT EXISTS `xyd_unit` (
  `unit_id` varchar(32) NOT NULL COMMENT '单元ID',
  `unit_name` varchar(200) NOT NULL COMMENT '单元名称',
  `unit_code` varchar(50) NOT NULL COMMENT '单元标识',
  `description` varchar(500) NOT NULL COMMENT '描述',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`unit_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='作战单元';

-- 正在导出表  xyd_db.xyd_unit 的数据：~0 rows (大约)

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
