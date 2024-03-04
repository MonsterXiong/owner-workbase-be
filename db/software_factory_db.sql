-- --------------------------------------------------------
-- 主机:                           127.0.0.1
-- 服务器版本:                        5.7.26 - MySQL Community Server (GPL)
-- 服务器操作系统:                      Win64
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


-- 导出 software_factory_db 的数据库结构
CREATE DATABASE IF NOT EXISTS `software_factory_db` /*!40100 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci */;
USE `software_factory_db`;

-- 导出  表 software_factory_db.sf_menu 结构
CREATE TABLE IF NOT EXISTS `sf_menu` (
  `menu_id` varchar(32) NOT NULL COMMENT '菜单id',
  `menu_name` varchar(200) NOT NULL COMMENT '菜单名称',
  `menu_code` varchar(100) DEFAULT NULL COMMENT '菜单编码',
  `english_name` varchar(100) DEFAULT NULL COMMENT '英文名称',
  `parent_id` varchar(32) DEFAULT '' COMMENT '所属功能',
  `level_code` varchar(200) DEFAULT NULL COMMENT '级别编码',
  `tag` varchar(50) DEFAULT NULL COMMENT '菜单标签',
  `menu_type` varchar(30) DEFAULT NULL COMMENT '菜单类型',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `status` varchar(32) DEFAULT NULL COMMENT '状态',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `remark` varchar(500) DEFAULT NULL COMMENT '描述',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`menu_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单';

-- 正在导出表  software_factory_db.sf_menu 的数据：~0 rows (大约)
INSERT INTO `sf_menu` (`menu_id`, `menu_name`, `menu_code`, `english_name`, `parent_id`, `level_code`, `tag`, `menu_type`, `bind_project`, `status`, `sort`, `remark`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('01862066c4374f48a32cd0805d7a5d28', '模板资源版本管理', 'templateVersionManage', NULL, 'f04b46be0acd415598e86b449a813501', '067004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:26:17', 'admin', '2024-03-04 15:26:17'),
	('09b7da772d2240c9a7f4475b0f35f3c9', '系统能力', 'systemAbility', NULL, '', '066', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:22:06', 'admin', '2024-03-04 15:22:12'),
	('1b2c554b2b97467d82614a9957469866', '项目管理', 'projectManage', NULL, '55909cda4d554bb9b6df88253b8f9b3b', '064001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:18:49', 'admin', '2024-03-04 15:18:49'),
	('1cd5a63929f44d31a57564e78d643d54', '体系能力映射分析', 'structAbilityRelAnalysis', NULL, '7582d9140dca4309b70e797a5ff224a6', '062001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:35:11', 'admin', '2024-03-04 16:14:06'),
	('33ce9fffe2e14814b73c89a823675e81', '任务场景设计', 'taskSceneDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:28:31', 'admin', '2024-03-04 15:28:31'),
	('3d76f9dea528412ea90ee783ffed2cb8', '模板资源导入导出', 'templateResourceData', NULL, 'f04b46be0acd415598e86b449a813501', '067005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:27:03', 'admin', '2024-03-04 15:27:03'),
	('3ee46b7a5c184adaa264f992117bd50b', '作战能力需求条目生成', 'battleAbilityRequirement', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060007', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 6, NULL, '0', 'admin', '2024-03-04 15:32:27', 'admin', '2024-03-04 15:32:27'),
	('423a3f03f1534623959d112a0e7c67d1', '系统功能流程分析', 'systemFunctionFlowAnalysis', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:40:06', 'admin', '2024-03-04 15:40:06'),
	('49824f90e88a4075b8aa2fb92d90ad73', '数据链系统能力设计', 'dataChainSystemAbilityDesign', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:36:41', 'admin', '2024-03-04 15:36:41'),
	('55909cda4d554bb9b6df88253b8f9b3b', '项目', 'project', NULL, '', '064', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:18:13', 'admin', '2024-03-04 15:20:37'),
	('5f1bcf26ebec484d826f9cb41bc206b1', '体系能力需求条目生成', 'structAbilityRequirement', NULL, '7582d9140dca4309b70e797a5ff224a6', '062003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:35:53', 'admin', '2024-03-04 16:14:16'),
	('6f4791ba147d4c109b1ef1de56d4ff91', '能力模板资源管理', 'abilityTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:24:42', 'admin', '2024-03-04 15:24:42'),
	('7582d9140dca4309b70e797a5ff224a6', '体系能力', 'structAbility', NULL, '', '062', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:20:28', 'admin', '2024-03-04 15:21:42'),
	('930ce59701d9496b96a1ad06bc430f8b', '系统交互需求分析', 'systemInteractionAnalysis', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:37:29', 'admin', '2024-03-04 15:37:29'),
	('93aaccf9ea65441ebfed814403c4c7e7', '装备功能映射分析', 'equipFunctionRelAnalysis', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:40:46', 'admin', '2024-03-04 15:40:46'),
	('9e072453e0654a1b80683d3a72e8c020', '任务模板资源管理', 'taskTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:23:57', 'admin', '2024-03-04 15:23:57'),
	('af632b04f63748a595fdac2201f7ab4c', '活动与能力映射', 'activityRelAbility', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060006', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 5, NULL, '0', 'admin', '2024-03-04 15:31:43', 'admin', '2024-03-04 15:31:43'),
	('b6d1d1753a2641049b9d2b792ee44a40', '作战能力', 'battleAbility', NULL, '', '060', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:20:00', 'admin', '2024-03-04 15:20:40'),
	('bb3610573f2646d7a6bd2a298284ef26', '数据链体系能力导入', 'dataChainStructAbilityImport', NULL, '7582d9140dca4309b70e797a5ff224a6', '062002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:34:33', 'admin', '2024-03-04 16:13:47'),
	('c39056453a244647a60e262756556dca', '系统能力需求条目生成', 'systemAbilityRequirement', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:38:37', 'admin', '2024-03-04 15:38:37'),
	('c46e6798ac714024bb6399749695022a', '任务分析与输出', 'taskAnalysisOutput', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:27:51', 'admin', '2024-03-04 15:27:51'),
	('d9fb1808a0f84715bce33a1ee2a697c1', '数据链系统构成设计', 'dataChainSystemBuildDesign', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:39:31', 'admin', '2024-03-04 15:39:31'),
	('df348ebaddf9427ab4b33dda7855b6cf', '作战活动设计', 'battleActivityDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:29:59', 'admin', '2024-03-04 15:29:59'),
	('e6cbb772eda94c3f9165f6871019adc6', '装备功能性能生成', 'equipFunctionPerfGenerate', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:41:34', 'admin', '2024-03-04 15:41:34'),
	('f04b46be0acd415598e86b449a813501', '资源管理', 'resourceManage', NULL, '', '067', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 7, NULL, '0', 'admin', '2024-03-04 15:23:17', 'admin', '2024-03-04 15:23:17'),
	('f18da752644e4b8d824236198f497255', '系统能力映射分析', 'systemAbilityRelAnalysis', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:38:05', 'admin', '2024-03-04 15:38:05'),
	('f63efefb0da046309edd6f0e083c98d4', '数据链体系构成导入', 'dataChainStructBuildImport', NULL, '7582d9140dca4309b70e797a5ff224a6', '062005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:33:56', 'admin', '2024-03-04 16:13:54'),
	('f7a026d23da44cc9937c3eb98ada7538', '装备功能', 'equipFunction', NULL, '', '065', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:22:40', 'admin', '2024-03-04 15:22:40'),
	('f9dfc4e12f044e43b88adc25b2de5d73', '任务线程导入与编辑', 'taskThreadResource', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:29:25', 'admin', '2024-03-04 15:29:25'),
	('fd782299f49344f68323d5f1d496e4bf', '作战能力设计', 'battleAbilityDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:30:43', 'admin', '2024-03-04 15:30:43'),
	('fff9321e5d8e45469faebdf0b8fbc792', '装备模板资源管理', 'equipTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:25:33', 'admin', '2024-03-04 15:25:33');

-- 导出  表 software_factory_db.sf_project 结构
CREATE TABLE IF NOT EXISTS `sf_project` (
  `project_id` varchar(32) NOT NULL COMMENT '项目id',
  `project_code` varchar(100) DEFAULT NULL COMMENT '项目编码',
  `project_name` varchar(200) NOT NULL COMMENT '项目名称',
  `short_name` varchar(100) DEFAULT NULL COMMENT '项目简称',
  `status` varchar(2) DEFAULT '1' COMMENT '项目状态(0:关,1:开)',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `project_description` varchar(500) DEFAULT NULL COMMENT '项目描述',
  `system_name` varchar(255) DEFAULT NULL COMMENT '系统名称',
  `system_code` varchar(255) DEFAULT NULL COMMENT '系统标识',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`project_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目';

-- 正在导出表  software_factory_db.sf_project 的数据：~1 rows (大约)
INSERT INTO `sf_project` (`project_id`, `project_code`, `project_name`, `short_name`, `status`, `remark`, `project_description`, `system_name`, `system_code`, `sort`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('CdAluWOdoQ174yuHldWIw', NULL, 'xxx', NULL, '1', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, NULL, NULL),
	('DuKc8Et3ogtTxHPnhjVeO', NULL, '新一代', NULL, '1', NULL, NULL, NULL, NULL, 0, '0', NULL, NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
