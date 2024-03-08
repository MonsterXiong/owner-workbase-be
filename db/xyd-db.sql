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

-- 正在导出表  xyd_db.s_db_update_json 的数据：~2 rows (大约)
INSERT INTO `s_db_update_json` (`module`, `year`, `version`, `comment`, `create_by`, `create_time`, `update_by`, `update_time`) VALUES
	('db_mysql_xyd_2024_admin.json', 2024, '0', '项目初始化', 'admin', '2024-03-08 16:51:11', '', ''),
	('db_sql_system_', 2024, '0', '项目初始化', 'admin', '2024-03-08 16:51:11', '', '');

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

-- 正在导出表  xyd_db.s_log 的数据：~185 rows (大约)
INSERT INTO `s_log` (`id`, `user_id`, `type`, `content`, `ip`, `bid`, `remark`, `cjr`, `cjsj`, `xgr`, `xgsj`, `url`) VALUES
	('00bfb57ba9f04041bbc755846082faf7', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:32:07', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('02ad532655e94563999291a09be4f82b', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 16:53:14', NULL, NULL, NULL),
	('02d472e2b8f64e7c980a0cd54caf81aa', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:15:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('03fa343b64fd478a9add7ae31004e04a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:35:29', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('063e6250c6234f60bd1e6b238765ce6a', '1', '项目API', '增加项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:56', NULL, NULL, '/base/api/xydProject/insertXydProject'),
	('066579ec1baa405aa7529f53d1fb98cd', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:57', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('09bc8b591fc749099c46d58f1fb7ae80', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:32:19', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('0b24ae6ab43e46779f79b05b09de9461', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:43', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('11c9f29f01e8415ea52d3407b05a135a', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('1265edc1ad76413887831873cfc97f15', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('137293e5bdb24764821711c61a0df883', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:13:01', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('13c40318df0a419db1cb5f6920ea09bd', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:21:14', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('15685a93d1424854a24237e5bde3193a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:27:58', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('15e44ae9a9cb4c92b7ea6f8b19f88f58', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('17759fa259254ee8aefb3d0459ebf298', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:28', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1810e6ad039f4533a90c48a459b6cc20', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:34:24', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('18b278bddd2547f4af5956acb56dcfbb', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:13:10', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('197109d37f2e4a4582f2d50101afa8f0', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('1b3ac19296194e60bf41ed27334cd151', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:51', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1b6ae53586104282ac3892612e8242f1', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:22:23', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1b83939969524a6d922897fc3226ce53', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:20', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1bebb38fcc7747b0b5b205faf55d03d4', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:26:13', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1ce8eaadf9944d21a3d028544bd4cd95', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:56', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('1fc2bd65acfb41b2881af485226389dd', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:18:30', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('214f90e695274d8ab473978104256039', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:08:41', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('225aa42aa0ae4bff9a814b8ca6f62724', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('22769e61bde345f099f9ee8c18dbb40c', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:28', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('274fa323804e429c9228346fd8a5fc4e', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('28b4936284d64c18b23ad12b6f8081ff', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:39:08', NULL, NULL, NULL),
	('28f7d52b42a0439595f8180ea7ef0a54', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:28:01', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('29569a674afd46bb80c5ed674edf112f', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:29', NULL, NULL, NULL),
	('2a4c64133d2f4e6d8663c657db649863', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:37', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('2b4f198f61e042bd946df7ce349c57da', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:27:54', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('2cf5a555a4884b68b9fba0fbaf417ece', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('2ecdd62afe134522b0ead5386b75f5a5', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:34:15', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('2fa88c0746fe4e3f99f9ffa9c60b7ac6', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:36', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('312481e6d4e1404d81a4a2c147be0c53', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:54', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('329e1b03ac8547699255feee322ee792', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:08', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('337f58be246a4b4fa999e9d1289982fa', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('341c78743e624cefbec954ffb668110d', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:18:28', NULL, NULL, NULL),
	('3b9ada08ed68441a89f07e08ec5159e3', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:34:18', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('3babbe0151694232bbfb9ed905662c4f', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('3c7292e5b8904f3b9f00d862e11c5570', '1', '项目API', '删除项目', '0:0:0:0:0:0:0:1', NULL, NULL, 'admin', '2024-03-08 17:40:18', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('3c892ac02b99468bb3b98649daa4c6aa', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('3dd8f539365b44c4ab0dbc0d76cfeed7', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:03', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('408ded0dd550400ea2aefa592b54e560', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:20', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('41665f9eeb924574bcfe87711b2f2a05', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:24', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('43a40d3e83714776b001e5cb7e0945ff', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:18:20', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('447d4c52224f4b229c1fae5253cb14d8', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:02:00', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('44aaaaa2cfce445e88e3837624dcbfc8', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:35:13', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('44c7ef0a822a46bf9f45245b5b417bf0', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('46623b6ef282401ea0c1eeeb8c5aaeca', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:12:39', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('4726cb8f5177419c8d2f0b8a5bb20a07', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:22:19', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('4787bf61388140b299b11287a60bd8dd', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:11', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('47bfd78fc11849bc875b9d6550906480', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:57:49', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('49d2228622bc43dd9637290190f57f11', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:49:03', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('4b5550d017584f3a929d493457491aec', '1', '项目API', '删除项目', '0:0:0:0:0:0:0:1', NULL, NULL, 'admin', '2024-03-08 17:47:48', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('4ccea4f777ef47e181b78d6fb9a291d5', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:26:07', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('50b03109dc4547369ac2941a23d57b79', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:45', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('52264db137cf4079af92eb445d598ace', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:19:07', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('5231b780853644e6a00de54d2deb3726', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:37', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('53fb81646f3147c69e14e097abf3429d', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:25', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('54fd6b005fb346fc87c8549d15d4d055', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:39', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('56d72f7c93974bcabefb8a1d0883a8d4', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:49:05', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('57643eb6316940959b98ba8451930955', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:07:27', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('583c1b42af2f473faf8beded32546bc9', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('583d2dfb2f6d48999f4d35ae3981fd2a', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:35:34', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('590dfed218f148bf9eaa5f3bdfedd5a1', '1', '项目API', '删除项目', '0:0:0:0:0:0:0:1', NULL, NULL, 'admin', '2024-03-08 17:44:55', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('5ac2bfeb7d924d4b88d7c48a22844161', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:18', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('5b30dc22cb1e4b89a5ac4b6be96c42a9', '1', '项目API', '删除项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:31:28', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('5d04c6d449264accb3c017437d04168a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:05', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('5d96b18e0f8240119c18b43656812da3', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:18', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('5e3a2aa464054e1e84bec9d454e76092', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('5f406c40a14c44ecbbfbed412cc54ff5', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:43', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('605c984729b04c67a180d0f35bdc7866', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('6426c6be2b744fee84ab2fffb0e885dc', '1', '项目API', '增加项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:54', NULL, NULL, '/base/api/xydProject/insertXydProject'),
	('654af9c971b54d6f8dcdf3d016ef6484', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:20:33', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('663fb64e4388418ba304ae71cfc9834e', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:36', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('68c63b77b2cb41239236a3917f9ad087', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:19:33', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('7329e48c657040c4acf56c17bf157b02', '1', '项目API', '删除项目', '0:0:0:0:0:0:0:1', NULL, NULL, 'admin', '2024-03-08 17:41:12', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('73a4f38f9a7b49dd9bde8ad5022ff45a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:34:12', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('73ad18985f7a46439f48802502f69056', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:24:39', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('75fc4f1d5b7644208ea6ed69e1b4f162', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:57:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('790d33e0749d4ccea0378253eaf281e1', '1', '项目API', '删除项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:48', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('796e802e93fb47fda5e86bde56df3077', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:22:06', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('7cff5a3f48314bf6b5eab4b54e30dfcb', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:02:59', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('7e619d0069ca4be989fa5d7881991562', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:31:02', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('833b9f0b9f1a44fe8e36b4138d9386a2', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('834d1e1362cf4a32b64df1dfde988e9c', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:57', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('841b5ef666464af880ec96b147cc2731', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:35:34', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('8464ef99e420405c888d6ab72f076a54', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:18', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('84c5a4ebfe3e43ec91d996086409fd60', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:26', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('84dc0d94d44943c6bf8e0292ded7c82a', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('855c5ce00c2b43019e7b57d1c9648908', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('85b60a29d2ed4c4f9fb2d795ba4f5976', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:18', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('868e85064fbb4405a127bb3f1132f633', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:05', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('87b09ec84b434a7493ff8b5e53e85d02', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:07:00', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('889faf6ad9194f9ebceb035fdc18c243', '1', '项目API', '删除项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:11', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('89603e50ff5848fd84c23d984361a774', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:43', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('8c862918f5e8444e901e2a03d2033881', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('8d5789b04a524f91bde05c9db2118da4', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:43', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('8d7b7db65ac5408a9293db422568d284', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:57:49', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('8e93cf6e5d5f4e7c8bec3d5ff69a89a8', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('8ef9480e5afe4e8090678c74957fbf38', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:18', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('8f92120912794142b92b49ec31724e0f', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:02:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('903666c87f7a4b5aaabd0f1d9b95824a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:07:22', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('9631dd0999cc4c708273e08a6ab636de', '1', '项目API', '修改项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:02:48', NULL, NULL, '/base/api/xydProject/updateXydProject'),
	('96aa55a341ee4644b49a34711fbda4d9', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('96f44ccfae1043ec8ef7c5aa0c7f6bb7', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:45', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('9724349d327042348b63931e5877b030', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:32:11', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('97bcfa797dc042acb492ba5f68a7cf50', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:34', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('980b4c74d7a7472996c82bc132ba7025', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:30:09', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('9a1ad7c459ff4ab985c8dc9f9672f380', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:41', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('9ad7f78b5da041bea40b2e34cd9a8465', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:27', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('9b252bd0668f47fdb088b2ccab9f05cd', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:57', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('9b4f6c34f8c04387949d81747f7c73a2', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:33:24', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('a008e5e2461e48d68c846824d27dd605', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 16:53:14', NULL, NULL, NULL),
	('a0abbe85070f44498671ec1831b92941', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:54', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('a4676708a99040d5bd7d56d1080352b5', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:26', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('a513dbe99ad94af9a9b320676eb81381', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:27:54', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('a58ed489cc794ea39066a52c94bd391a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:13:15', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('a834f5f20e1f462f81ac4c06eab373bd', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('a9bdbc95065f466a82f7a74418d7186f', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:58:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('ac07f594d6fb4b6c9fe888abcbdee40c', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('adb49ac48ac34846bbabe4c3b648e2f8', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:20', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('ae1c2d9ddcb241dba064b06774a19d29', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:17:46', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('ae8a67ee25f84ee2aa5a015eff5c7124', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:24:30', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('aefd7ab1c6fa475a9f5247604fc2a233', '1', '项目API', '增加项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:43', NULL, NULL, '/base/api/xydProject/insertXydProject'),
	('af9258ec1a744662878cabf5a8d1beed', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('b07728cba1fd4f15ad9221df3d7bbf5c', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:38:08', NULL, NULL, NULL),
	('b2243c0105ba413cb84efe2b4560bf61', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:25:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('b46f1c0e7dcb4b1d97901147ee512763', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:04:17', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('b4c98db89da94bcbb58935f27ac4e9fb', '1', '项目API', '删除项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:26:11', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('b82cdf266ad04879967dd94cdc77f76e', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:20:33', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('b88dc1ec77c44a43b1e4afa0d3b92a4e', '1', '项目API', '增加项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:37', NULL, NULL, '/base/api/xydProject/insertXydProject'),
	('b90a8a5ac03e4c34a5ab3b49de042bfc', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('b960dc5f7a7a418bbbc04254d5184ca0', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:39:56', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('baf2ac43225b43488a1bd3b80070b765', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('bc692a60fae94384ae5911fae6dbdec3', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:31:28', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('bf3a0316270c47d7a08a822637c6c03a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:18:18', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c42eaef296e447a1bfe2ff375dc90568', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:19:33', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c7075ffb97dd400ab29ee7dd2f0bf5a9', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:18:59', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c792789d56c74103a8e677982ead1414', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:28:08', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c81545210e664527b9226812fe875499', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:38:22', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c955ba9d285e42d497a7cbf23b791787', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:14:21', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('c9b2e67caa8846fd94e8d9181fb818a1', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:35:17', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('c9c70c1d610c4c96b87bd9fb9d5f4a9b', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:17:33', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('cae0000e675749e68a2f0e8b49dc1f77', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:43', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('caeec925beb84cdebb88930d0707c9da', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:18:28', NULL, NULL, NULL),
	('cf964ca3f9834788aa3414c3a6b6c254', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:48', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('d09170290a214a4ca22b07fd88e4d8db', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:19:30', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d22cf0b910e844509be271321a18920c', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:30', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d29a4b6dd916416d8b86ef07b2edbcd5', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:49:03', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d29c8498650747bc968421e377e5f42b', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:13:01', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d4c74325ca36492a9da75a71df3a62a6', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:32:21', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('d78e61fa92e14c2e9cef105bba32db67', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d99f5b643eda45a982e08b333a8f019a', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:25:32', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('d9c40342c3884bfd9674aa4fbe53e110', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:13', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('dda1954df1b04d2382dc7b12dbede2cb', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:34', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('de0cd2bf4f2345e6870ce87bd4758384', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('de283ccf9ea3482f8ead77993bcc55bb', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:54', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('de2c9e2971644c03b812a1d7083ea64d', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:02:48', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('dee875035a0c47e0ac507a55c0f3e626', '1', '项目API', '增加项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:12:13', NULL, NULL, '/base/api/xydProject/insertXydProject'),
	('df4a531e86224b00a6f67673c922a11e', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:39', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('e325ca6e81884486be1191bed55d2cde', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:29', NULL, NULL, NULL),
	('e54777fa08e1490ab42578fd19338f73', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:49', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('e562c069ab7343d4959844b24a7cc4eb', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:13:01', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('e5e636f98fff4c7a809ad367cf85118c', '1', '项目API', '删除项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:36:36', NULL, NULL, '/base/api/xydProject/deleteXydProject'),
	('e6ee316e128f4a60aa69802943a0cfed', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:14', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('e8da5053a8ea4c0d9ff61d7a479163a6', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:58:32', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('ea71383bb4814a5daaf8fbbbfb7be73b', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:34:26', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('eb573356428e4fee809008aa7b956ce9', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:45', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('eba14fecfd89492cb194ffc400327722', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:21:18', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('ec353634e89d43399f5009e9e6373d34', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 18:19:28', NULL, NULL, NULL),
	('edcc49e4bcd242f5b098e0a3673cf1cd', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:56:41', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('eea47af8e2e248d3a4372ace86b5954c', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:37:30', NULL, NULL, '/base/api/xydProject/saveXydProject'),
	('f14ae021161d4347927c10c9e17bbbc9', '1', '项目API', '修改项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:02:59', NULL, NULL, '/base/api/xydProject/updateXydProject'),
	('f233601264a146cdaaef348efd821186', '1', '项目API', '删除项目(批量、递归)', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 18:11:48', NULL, NULL, '/base/api/xydProject/deleteXydProjectBatch'),
	('f51bb6d8266a4045a80a0accc559f18d', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:16:05', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('f68747cb4896445bb1a0cb9ae17745ff', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:32:35', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('f94e5ba8dc7d4cd99a7ba15aa424e47b', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:15:32', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('fa794d39f0d64cab8ecce9cb576519d9', '1', '用户管理', '用户注销', '', NULL, NULL, 'admin', '2024-03-08 17:39:08', NULL, NULL, NULL),
	('faba86a7471b4a4aa11d5396227ba6bf', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:31:07', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('fe7d5a2681974752aba0fe2d94346dde', '1', '项目API', '查询项目列表结果', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:48:59', NULL, NULL, '/base/api/xydProject/queryXydProjectByCondition'),
	('ff46e95e56274208bced7122177de685', '1', '项目API', '保存项目', '192.168.2.190', NULL, NULL, 'admin', '2024-03-08 17:29:24', NULL, NULL, '/base/api/xydProject/saveXydProject');

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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `index_value` varchar(200) DEFAULT NULL COMMENT '指标值',
  `data_unit` varchar(50) DEFAULT NULL COMMENT '指标单位',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `bind_act` varchar(32) NOT NULL COMMENT '所属活动',
  `type` varchar(50) NOT NULL COMMENT '类型',
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
  `attributes` varchar(500) DEFAULT NULL COMMENT '能力属性',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '所属父级',
  `bind_type` varchar(100) DEFAULT NULL COMMENT '所属类型',
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
  `index_value` varchar(200) DEFAULT NULL COMMENT '指标值',
  `data_unit` varchar(50) DEFAULT NULL COMMENT '指标单位',
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
  `item_value` varchar(50) DEFAULT NULL COMMENT '条目值',
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
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级ID',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `start_time` varchar(100) DEFAULT NULL COMMENT '开始时间',
  `end_time` varchar(100) DEFAULT NULL COMMENT '结束时间',
  `lon` double(10,2) NOT NULL COMMENT '经度',
  `lat` double(10,2) NOT NULL COMMENT '纬度',
  `bind_damage` varchar(200) DEFAULT NULL COMMENT '毁伤情况',
  `bind_protection` varchar(200) DEFAULT NULL COMMENT '防护等级',
  `society` varchar(500) DEFAULT NULL COMMENT '社会民情',
  `bind_scheme` varchar(32) NOT NULL COMMENT '所属场景',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_equip` varchar(32) DEFAULT NULL COMMENT '所属装备',
  `bind_org` varchar(32) DEFAULT NULL COMMENT '所属组织',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `attr` varchar(255) DEFAULT NULL COMMENT '属性',
  `description` varchar(5000) DEFAULT NULL COMMENT '描述',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_equip` varchar(32) NOT NULL COMMENT '所属装备',
  `value` double(5,2) DEFAULT NULL COMMENT '值',
  `unit` varchar(50) DEFAULT NULL COMMENT '单位',
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
  `value` double(5,2) DEFAULT NULL COMMENT '条目值',
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
  `org_code` varchar(50) NOT NULL COMMENT '组织标识',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '所属父级',
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

-- 导出  表 xyd_db.xyd_platform 结构
CREATE TABLE IF NOT EXISTS `xyd_platform` (
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

-- 正在导出表  xyd_db.xyd_platform 的数据：~0 rows (大约)

-- 导出  表 xyd_db.xyd_platform_exchange_rel 结构
CREATE TABLE IF NOT EXISTS `xyd_platform_exchange_rel` (
  `rel_id` varchar(32) NOT NULL COMMENT '关系ID',
  `source_platform` varchar(32) NOT NULL COMMENT '源平台',
  `target_platform` varchar(32) NOT NULL COMMENT '目标平台',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `bind_task` varchar(32) NOT NULL COMMENT '所属任务',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`rel_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='平台交互关系';

-- 正在导出表  xyd_db.xyd_platform_exchange_rel 的数据：~0 rows (大约)

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
  `mission` varchar(2000) DEFAULT NULL COMMENT '使命',
  `bind_battle_abi_version` varchar(32) DEFAULT NULL COMMENT '当前作战能力版本',
  `bind_tixi_abi_version` varchar(32) DEFAULT NULL COMMENT '当前体系能力版本',
  `bind_sys_abi_version` varchar(32) DEFAULT NULL COMMENT '当前系统能力',
  `bind_function_version` varchar(32) DEFAULT NULL COMMENT '当前装备功能版本',
  `sys_sort` int(10) DEFAULT '0' COMMENT '排序',
  `sys_is_del` varchar(1) DEFAULT '0' COMMENT '是否已删除',
  `sys_creator` varchar(50) NOT NULL COMMENT '创建人',
  `sys_create_time` varchar(32) NOT NULL COMMENT '创建时间',
  `sys_updater` varchar(50) DEFAULT NULL COMMENT '修改人',
  `sys_update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COMMENT='项目';

-- 正在导出表  xyd_db.xyd_project 的数据：~9 rows (大约)
INSERT INTO `xyd_project` (`project_id`, `project_name`, `mission`, `bind_battle_abi_version`, `bind_tixi_abi_version`, `bind_sys_abi_version`, `bind_function_version`, `sys_sort`, `sys_is_del`, `sys_creator`, `sys_create_time`, `sys_updater`, `sys_update_time`) VALUES
	('0ee28de1057942cc92f2e23b5aee7a59', '111', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 17:56:41', 'admin', '2024-03-08 18:12:17'),
	('2452409308d04d549eb66ec5d32c5055', '1', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 18:12:53', 'admin', '2024-03-08 18:13:01'),
	('3076a658a162486482b587f2d0ff0f43', 'xxx', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 18:11:36', 'admin', '2024-03-08 18:11:47'),
	('31c4b085e18c4363a7ce01021c993200', '1', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 17:56:39', 'admin', '2024-03-08 18:11:47'),
	('347c54ee61e5424d89819467be6f9388', 'xxxx1', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 18:11:42', 'admin', '2024-03-08 18:11:47'),
	('4f7730f71f6740fb92360667eb5a41c5', '3', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 17:56:43', 'admin', '2024-03-08 18:11:47'),
	('50eec307e451432e81c4e1ae3802c56b', '2', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 18:12:56', 'admin', '2024-03-08 18:13:01'),
	('58e4871eafe846c085da20491488f231', '4', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 17:56:44', 'admin', '2024-03-08 18:11:47'),
	('7faabdbb200a4df5ac717e8a1eac92ec', '1111', NULL, NULL, NULL, NULL, NULL, 0, NULL, 'admin', '2024-03-08 18:12:13', 'admin', '2024-03-08 18:12:17');

-- 导出  表 xyd_db.xyd_required_change 结构
CREATE TABLE IF NOT EXISTS `xyd_required_change` (
  `exchange_id` varchar(32) NOT NULL COMMENT '变更ID',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `staff` varchar(50) DEFAULT NULL COMMENT '变更人员',
  `module` varchar(32) DEFAULT NULL COMMENT '变更模块',
  `change_index` varchar(32) DEFAULT NULL COMMENT '变更指标',
  `reason` varchar(500) DEFAULT NULL COMMENT '变更原因',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `type` varchar(50) DEFAULT NULL COMMENT '指标类型',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
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
  `content` varchar(500) DEFAULT NULL COMMENT '内容',
  `data_type` varchar(50) DEFAULT NULL COMMENT '数据格式',
  `frequency` varchar(50) DEFAULT NULL COMMENT '交换频率',
  `means` varchar(50) DEFAULT NULL COMMENT '交互手段',
  `event` varchar(50) DEFAULT NULL COMMENT '触发事件',
  `requirement` varchar(50) DEFAULT NULL COMMENT '保密要求',
  `form` varchar(50) DEFAULT NULL COMMENT '交互形式',
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
  `description` varchar(5000) DEFAULT NULL COMMENT '描述',
  `type` varchar(50) NOT NULL COMMENT '类型',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '所属父级',
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
  `value` double(5,2) DEFAULT NULL COMMENT '指标值',
  `unit` varchar(50) DEFAULT NULL COMMENT '单位',
  `bind_sys_abi` varchar(32) NOT NULL COMMENT '所属系统能力',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `type` varchar(50) NOT NULL COMMENT '类型',
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
  `value` varchar(50) DEFAULT NULL COMMENT '条目值',
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
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级ID',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `history_flag` int(1) NOT NULL COMMENT '是否历史版本',
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
  `task_target` varchar(200) DEFAULT NULL COMMENT '任务目标',
  `task_time` varchar(200) DEFAULT NULL COMMENT '任务时间',
  `task_area` varchar(500) DEFAULT NULL COMMENT '任务区域',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `attr` varchar(5000) DEFAULT NULL COMMENT '属性',
  `type` varchar(50) DEFAULT NULL COMMENT '类型',
  `parent_id` varchar(32) DEFAULT NULL COMMENT '所属父级',
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
  `value` double(5,2) DEFAULT NULL COMMENT '指标值',
  `unit` varchar(50) DEFAULT NULL COMMENT '指标单位',
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
  `item_value` varchar(50) DEFAULT NULL COMMENT '条目值',
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
  `parent_id` varchar(32) DEFAULT NULL COMMENT '父级ID',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
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
