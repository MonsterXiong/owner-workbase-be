-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
-- HeidiSQL 版本:                  12.1.0.6537
-- --------------------------------------------------------

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET NAMES utf8 */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;


-- 导出 workflow_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `workflow_db` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;
USE `workflow_db`;

-- 导出  表 workflow_db.test 结构
CREATE TABLE IF NOT EXISTS `test` (
  `updateDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6) COMMENT '更新时间',
  `createdDate` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) COMMENT '创建时间',
  `lock_time` timestamp NULL DEFAULT NULL COMMENT '锁定时间',
  `deleteDate` timestamp(6) NULL DEFAULT NULL COMMENT '删除时间',
  `creator` varchar(255) DEFAULT NULL COMMENT '创建人',
  `updater` varchar(255) DEFAULT NULL COMMENT '修改人',
  `menu_code` varchar(255) NOT NULL COMMENT '菜单编码',
  `name` varchar(255) NOT NULL COMMENT '名称',
  `icon` varchar(255) DEFAULT NULL COMMENT '图标',
  `css_style` varchar(255) DEFAULT NULL COMMENT '样式',
  `parent_code` varchar(255) DEFAULT NULL COMMENT '父标识',
  `level_code` varchar(255) DEFAULT NULL COMMENT '级别标识',
  `sort` int(11) DEFAULT NULL COMMENT '排序',
  `id` varchar(32) NOT NULL COMMENT '主键',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 正在导出表  workflow_db.test 的数据：~0 rows (大约)
INSERT INTO `test` (`updateDate`, `createdDate`, `lock_time`, `deleteDate`, `creator`, `updater`, `menu_code`, `name`, `icon`, `css_style`, `parent_code`, `level_code`, `sort`, `id`) VALUES
	('2023-12-30 19:47:44.141176', '2023-12-30 11:45:21.258000', '2023-12-30 11:45:21', NULL, 'string', 'string', 'string', 'string', 'string', 'string', 'string', 'string', 0, '0');

-- 导出  表 workflow_db.wf_code_template 结构
CREATE TABLE IF NOT EXISTS `wf_code_template` (
  `code_template_id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `repo_url` varchar(255) NOT NULL COMMENT '仓库地址',
  `type` varchar(32) NOT NULL COMMENT '代码类型（fe前端、be后端）',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) DEFAULT NULL COMMENT '是否删除',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(255) DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`code_template_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='框架代码';

-- 正在导出表  workflow_db.wf_code_template 的数据：~1 rows (大约)
INSERT INTO `wf_code_template` (`code_template_id`, `name`, `description`, `repo_url`, `type`, `order_num`, `isdel`, `creator`, `create_time`, `create_ip`, `updater`, `update_time`, `update_ip`) VALUES
	('', '', NULL, 'http://baidu.com', 'fe', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL);

-- 导出  表 workflow_db.wf_gen_project 结构
CREATE TABLE IF NOT EXISTS `wf_gen_project` (
  `project_id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `code` varchar(50) DEFAULT NULL COMMENT '项目标识',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `alias_name` varchar(50) DEFAULT NULL COMMENT '简称',
  `bind_databae_pool` varchar(32) NOT NULL COMMENT '映射数据池',
  `repo_url` varchar(255) DEFAULT NULL COMMENT '仓库地址',
  `database_source` varchar(32) NOT NULL COMMENT '数据来源',
  `bind_code_template` varchar(32) NOT NULL COMMENT '所属代码框架',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(32) DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`project_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目';

-- 正在导出表  workflow_db.wf_gen_project 的数据：~0 rows (大约)

-- 导出  表 workflow_db.wf_gen_project_record 结构
CREATE TABLE IF NOT EXISTS `wf_gen_project_record` (
  `gen_project_record_id` varchar(32) NOT NULL COMMENT '主键',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `gen_data` longtext NOT NULL COMMENT '生成文件',
  `version` varchar(32) NOT NULL COMMENT '版本号',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`gen_project_record_id`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COMMENT='项目生成记录';

-- 正在导出表  workflow_db.wf_gen_project_record 的数据：0 rows
/*!40000 ALTER TABLE `wf_gen_project_record` DISABLE KEYS */;
/*!40000 ALTER TABLE `wf_gen_project_record` ENABLE KEYS */;

-- 导出  表 workflow_db.zy_database_pool 结构
CREATE TABLE IF NOT EXISTS `zy_database_pool` (
  `database_id` varchar(32) NOT NULL COMMENT 'ID',
  `name` varchar(50) NOT NULL COMMENT '名称',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `host` varchar(32) NOT NULL COMMENT '主机',
  `port` varchar(32) NOT NULL COMMENT '端口',
  `account` varchar(32) NOT NULL COMMENT '账号',
  `password` varchar(32) NOT NULL COMMENT '密码',
  `type` varchar(32) NOT NULL DEFAULT 'mysql' COMMENT '数据库类型',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`database_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据池';

-- 正在导出表  workflow_db.zy_database_pool 的数据：~3 rows (大约)
INSERT INTO `zy_database_pool` (`database_id`, `name`, `description`, `host`, `port`, `account`, `password`, `type`, `order_num`, `isdel`, `creator`, `create_time`, `create_ip`, `updater`, `update_time`, `update_ip`) VALUES
	('1', '204', NULL, '192.168.2.204', '3306', 'root', '123456', 'mysql', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('2', '200', NULL, '192.168.2.200', '3306', 'root', '123456', 'mysql', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('3', '本机', NULL, 'localhost', '3306', 'root', '123456', 'mysql', NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('444', '8888', 'string', '1', '2', '3', '4', 'mysql', 0, '0', 'string', 'string', 'string', 'string', 'string', 'string');

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
