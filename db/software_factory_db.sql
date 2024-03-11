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

-- 导出  表 software_factory_db.sf_enum 结构
CREATE TABLE IF NOT EXISTS `sf_enum` (
  `enum_id` varchar(32) NOT NULL COMMENT '枚举id',
  `enum_code` varchar(100) DEFAULT NULL COMMENT '枚举编码',
  `enum_name` varchar(200) NOT NULL COMMENT '枚举名称',
  `bind_enum_category` varchar(32) NOT NULL COMMENT '所属枚举类别',
  `bind_project` varchar(50) NOT NULL COMMENT '所属项目',
  `is_sync` int(11) DEFAULT '0' COMMENT '是否同步数据',
  `short_name` varchar(100) DEFAULT NULL COMMENT '枚举简称',
  `status` varchar(2) DEFAULT '1' COMMENT '项目状态(0:关,1:开)',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`enum_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='枚举';

-- 正在导出表  software_factory_db.sf_enum 的数据：~2 rows (大约)
INSERT INTO `sf_enum` (`enum_id`, `enum_code`, `enum_name`, `bind_enum_category`, `bind_project`, `is_sync`, `short_name`, `status`, `remark`, `description`, `sort`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('1', 'red_camp', '红方', '1', 'vGKO7EMwa8cX_0jEMG-OR', 1, NULL, '1', NULL, NULL, 0, '0', NULL, NULL, NULL, NULL),
	('2', 'blue_camp', '蓝方', '1', 'vGKO7EMwa8cX_0jEMG-OR', 1, NULL, '1', NULL, NULL, 0, '0', NULL, NULL, NULL, NULL);

-- 导出  表 software_factory_db.sf_enum_category 结构
CREATE TABLE IF NOT EXISTS `sf_enum_category` (
  `enum_category_id` varchar(32) NOT NULL COMMENT '枚举类别id',
  `enum_category_code` varchar(100) NOT NULL COMMENT '枚举类别编码',
  `enum_category_name` varchar(200) NOT NULL COMMENT '枚举类别名称',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `is_sync` int(11) DEFAULT '0' COMMENT '是否同步数据',
  `short_name` varchar(100) DEFAULT NULL COMMENT '枚举类别简称',
  `status` varchar(2) DEFAULT '1' COMMENT '项目状态(0:关,1:开)',
  `remark` varchar(500) DEFAULT NULL COMMENT '备注',
  `description` varchar(500) DEFAULT NULL COMMENT '描述',
  `sort` int(11) DEFAULT '0' COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`enum_category_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='枚举类别';

-- 正在导出表  software_factory_db.sf_enum_category 的数据：~1 rows (大约)
INSERT INTO `sf_enum_category` (`enum_category_id`, `enum_category_code`, `enum_category_name`, `bind_project`, `is_sync`, `short_name`, `status`, `remark`, `description`, `sort`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('1', 'camp_type', '阵营数据', 'vGKO7EMwa8cX_0jEMG-OR', 1, NULL, '1', NULL, NULL, 0, '0', NULL, NULL, NULL, NULL);

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

-- 正在导出表  software_factory_db.sf_menu 的数据：~104 rows (大约)
INSERT INTO `sf_menu` (`menu_id`, `menu_name`, `menu_code`, `english_name`, `parent_id`, `level_code`, `tag`, `menu_type`, `bind_project`, `status`, `sort`, `remark`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('01862066c4374f48a32cd0805d7a5d28', '模板资源版本管理', 'templateVersionManage', NULL, 'f04b46be0acd415598e86b449a813501', '067004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:26:17', 'admin', '2024-03-04 15:26:17'),
	('04da21a592bb4017bd71acd38ad54608', '态势展示及分析', 'TaiShiZhanShiJIFenXi', NULL, '', NULL, NULL, 'module', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('09b7da772d2240c9a7f4475b0f35f3c9', '系统能力', 'systemAbility', NULL, '', '066', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:22:06', 'admin', '2024-03-04 15:22:12'),
	('0BQLm89vGMKvTR7ffkyOR', '系统能力需求模型逻辑校验', 'systemAbilityModelLogicVerify', NULL, 'zqGwm_BZPVRoDB8CHfb_I', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('1b2c554b2b97467d82614a9957469866', '项目管理', 'projectManage', NULL, '55909cda4d554bb9b6df88253b8f9b3b', '064001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:18:49', 'admin', '2024-03-04 15:18:49'),
	('1cd5a63929f44d31a57564e78d643d54', '体系能力映射分析', 'structAbilityRelAnalysis', NULL, '7582d9140dca4309b70e797a5ff224a6', '062001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:35:11', 'admin', '2024-03-04 16:14:06'),
	('1P02P84foHsyQn4pni-OE', '布局', 'layout', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 9, NULL, '0', NULL, NULL, NULL, NULL),
	('2bc99760f60f4245ae409f88ef4527ad', '目标清单', 'MuBiaoQingDan', NULL, '556e20abf2ce4f4eb7dd39f1f46313d0', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('2Hw5Ro9Eb-hT7DZ-ELgJR', '需求变更', 'requirementModify', NULL, '', NULL, NULL, 'module', 'GmoA4xl7mETp-xPbQBejf', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('2Vx2IJqhG7KHDhyuSshd5', '通用表格', 'table1', NULL, '3LXPE0g7uEKX1UtpcoSXW', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('33ce9fffe2e14814b73c89a823675e81', '任务场景设计', 'taskSceneDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:28:31', 'admin', '2024-03-04 15:28:31'),
	('3d4091ebeadc4c958c1afe7dd7615f13', '武器平台清单', 'WuQiPingTaiQingDan', NULL, '556e20abf2ce4f4eb7dd39f1f46313d0', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('3d76f9dea528412ea90ee783ffed2cb8', '模板资源导入导出', 'templateResourceData', NULL, 'f04b46be0acd415598e86b449a813501', '067005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:27:03', 'admin', '2024-03-04 15:27:03'),
	('3dTOWuFLEPpEht3nTOvB4', '左列表中普通绘图右表单（新一代）', 'biz4', NULL, 'MJenOknbCSW_NIoKM0NcK', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('3e9d0c5c3de44cb5a63157f1b686cc23', '可行性分析', 'KeXingXingFengXi', NULL, '04da21a592bb4017bd71acd38ad54608', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('3ee46b7a5c184adaa264f992117bd50b', '作战能力需求条目生成', 'battleAbilityRequirement', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060007', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 6, NULL, '0', 'admin', '2024-03-04 15:32:27', 'admin', '2024-03-04 15:32:27'),
	('3LXPE0g7uEKX1UtpcoSXW', '表格', 'table', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('3vk3e5-lGh1OoXyc6-a0c', '横向需求追踪', 'horizontalRequirementTrace', NULL, 'spg0H2BuDf8RNVwMxD9e5', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('423a3f03f1534623959d112a0e7c67d1', '系统功能流程分析', 'systemFunctionFlowAnalysis', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:40:06', 'admin', '2024-03-04 15:40:06'),
	('49824f90e88a4075b8aa2fb92d90ad73', '数据链系统能力设计', 'dataChainSystemAbilityDesign', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:36:41', 'admin', '2024-03-04 15:36:41'),
	('556e20abf2ce4f4eb7dd39f1f46313d0', '战场资源管理', 'ZhanChangZiYuanGuanlI', NULL, '', NULL, NULL, 'module', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('55909cda4d554bb9b6df88253b8f9b3b', '项目', 'project', NULL, '', '064', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:18:13', 'admin', '2024-03-04 15:20:37'),
	('5cI8aU4CNbVZGMMDoHcxo', '作战能力需求版本控制', 'battleAbilityVersionControl', NULL, 'Kf6i3Poese3pJClq7eLrW', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('5f1bcf26ebec484d826f9cb41bc206b1', '体系能力需求条目生成', 'structAbilityRequirement', NULL, '7582d9140dca4309b70e797a5ff224a6', '062003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:35:53', 'admin', '2024-03-04 16:14:16'),
	('6674e45d3b424baa8737b4f294b70424', '弹药清单', 'DanYaoQingDan', NULL, '556e20abf2ce4f4eb7dd39f1f46313d0', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('6f4791ba147d4c109b1ef1de56d4ff91', '能力模板资源管理', 'abilityTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:24:42', 'admin', '2024-03-04 15:24:42'),
	('7582d9140dca4309b70e797a5ff224a6', '体系能力', 'structAbility', NULL, '', '062', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:20:28', 'admin', '2024-03-04 15:21:42'),
	('7ptDbs2ap7sPfRof34z8L', '需求专题透视', 'requirementSubjectView', NULL, 'LXSuYkaNayZw71WUgLaDx', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('930ce59701d9496b96a1ad06bc430f8b', '系统交互需求分析', 'systemInteractionAnalysis', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:37:29', 'admin', '2024-03-04 15:37:29'),
	('93aaccf9ea65441ebfed814403c4c7e7', '装备功能映射分析', 'equipFunctionRelAnalysis', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:40:46', 'admin', '2024-03-04 15:40:46'),
	('9e072453e0654a1b80683d3a72e8c020', '任务模板资源管理', 'taskTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:23:57', 'admin', '2024-03-04 15:23:57'),
	('9JMk7z0tu2JlvIuei_03K', '合并表格', 'table2', NULL, '3LXPE0g7uEKX1UtpcoSXW', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('a0p3Z4dFy-kHt1p7Ttsyv', '全局弹窗', 'gloabalDialog', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 11, NULL, '0', NULL, NULL, NULL, NULL),
	('af632b04f63748a595fdac2201f7ab4c', '活动与能力映射', 'activityRelAbility', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060006', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 5, NULL, '0', 'admin', '2024-03-04 15:31:43', 'admin', '2024-03-04 15:31:43'),
	('ASHimBVtMuoYI3iQOk3Qx', '左树（列表）右表格', 'compose2', NULL, 'gUmIJy45fXa9iCyjsptaN', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('AsJwalujZjQJAc49v48Bk', '左列表右表格', 'compose1', NULL, 'gUmIJy45fXa9iCyjsptaN', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('A_8ApIawfTgWjXcbBYHHe', '系统能力需求版本控制', 'systemAbilityVersionControl', NULL, 'Kf6i3Poese3pJClq7eLrW', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('b-4Hn7mrLIGHODV0Byiwd', '编辑表格', 'table5', NULL, '3LXPE0g7uEKX1UtpcoSXW', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 6, NULL, '0', NULL, NULL, NULL, NULL),
	('b6d1d1753a2641049b9d2b792ee44a40', '作战能力', 'battleAbility', NULL, '', '060', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:20:00', 'admin', '2024-03-04 15:20:40'),
	('b99170d58b074d88b41c1cea856e94f7', '战场态势显示', 'ZhanChangTaiShiXianShi', NULL, '04da21a592bb4017bd71acd38ad54608', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('bb3610573f2646d7a6bd2a298284ef26', '数据链体系能力导入', 'dataChainStructAbilityImport', NULL, '7582d9140dca4309b70e797a5ff224a6', '062002', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 1, NULL, '0', 'admin', '2024-03-04 15:34:33', 'admin', '2024-03-04 16:13:47'),
	('BFkkDOGm7adyL40UdWs7j', ' 模型校验规则配置', 'modelVerifyRuleConfig', NULL, 'zqGwm_BZPVRoDB8CHfb_I', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('BoklAB9Hxs73PSYhVAG0F', '需求影响分析', 'requirementInfluenceAnalysis', NULL, '2Hw5Ro9Eb-hT7DZ-ELgJR', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('B_b4FkGJGd2XgHyjlAbYP', '临时（随意修改）', '', NULL, '', NULL, NULL, 'module', 'vGKO7EMwa8cX_0jEMG-OR', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('c2a26968bea448a6a2d0d6273b8c557f', '弹目匹配分析', 'DanMuPiPeiFengXi', NULL, '04da21a592bb4017bd71acd38ad54608', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('c39056453a244647a60e262756556dca', '系统能力需求条目生成', 'systemAbilityRequirement', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:38:37', 'admin', '2024-03-04 15:38:37'),
	('c3kRtdhXcxUDEhQFmcgNg', '纵向需求追踪', 'verticalRequirementTrace', NULL, 'spg0H2BuDf8RNVwMxD9e5', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('c46e6798ac714024bb6399749695022a', '任务分析与输出', 'taskAnalysisOutput', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:27:51', 'admin', '2024-03-04 15:27:51'),
	('ce8e308d078446578e7832f87ce65a8e', '参考资料', 'ChanKaoZiLiao', NULL, 'e74909f73aa94cb4a7b956add66826ae', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('cJtkmZmu0ZaCSeJ78jLxy', '需求异常管理', 'requirementExceptionManage', NULL, 'spg0H2BuDf8RNVwMxD9e5', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('cLegkLDi1P5bFFqmuc64x', '需求报告生成', 'requirementReportGenerate', NULL, 'ouFPMEtjqCn1TIzZL6gmL', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('clu9XCQmsh_-kzLkNbga9', '通用表单', 'form1', NULL, 'HCeJKHDPXF7-1J4pU2EH8', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('cXPSVd-47LRuq9Q7Sc1g_', '体系能力需求模型逻辑校验', 'structAbilityModelLogicVerify', NULL, 'zqGwm_BZPVRoDB8CHfb_I', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('d9fb1808a0f84715bce33a1ee2a697c1', '数据链系统构成设计', 'dataChainSystemBuildDesign', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065001', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:39:31', 'admin', '2024-03-04 15:39:31'),
	('DcioiFYVZjmZpU5qnnTiz', '权重矩阵', 'matrix3', NULL, 'FKmwfkRz_DNc4JFPjN7A3', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('df348ebaddf9427ab4b33dda7855b6cf', '作战活动设计', 'battleActivityDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:29:59', 'admin', '2024-03-04 15:29:59'),
	('e6cbb772eda94c3f9165f6871019adc6', '装备功能性能生成', 'equipFunctionPerfGenerate', NULL, 'f7a026d23da44cc9937c3eb98ada7538', '065004', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 3, NULL, '0', 'admin', '2024-03-04 15:41:34', 'admin', '2024-03-04 15:41:34'),
	('e74909f73aa94cb4a7b956add66826ae', '帮助', 'BangZhu', NULL, '', NULL, NULL, 'module', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('EO5sdkjcWPH9FLW-WUSGx', '树形表格', 'table3', NULL, '3LXPE0g7uEKX1UtpcoSXW', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('f04b46be0acd415598e86b449a813501', '资源管理', 'resourceManage', NULL, '', '067', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 7, NULL, '0', 'admin', '2024-03-04 15:23:17', 'admin', '2024-03-04 15:23:17'),
	('f18da752644e4b8d824236198f497255', '系统能力映射分析', 'systemAbilityRelAnalysis', NULL, '09b7da772d2240c9a7f4475b0f35f3c9', '066003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:38:05', 'admin', '2024-03-04 15:38:05'),
	('f63efefb0da046309edd6f0e083c98d4', '数据链体系构成导入', 'dataChainStructBuildImport', NULL, '7582d9140dca4309b70e797a5ff224a6', '062005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 0, NULL, '0', 'admin', '2024-03-04 15:33:56', 'admin', '2024-03-04 16:13:54'),
	('f7a026d23da44cc9937c3eb98ada7538', '装备功能', 'equipFunction', NULL, '', '065', NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:22:40', 'admin', '2024-03-04 15:22:40'),
	('f9dfc4e12f044e43b88adc25b2de5d73', '任务线程导入与编辑', 'taskThreadResource', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:29:25', 'admin', '2024-03-04 15:29:25'),
	('FBElzv0HNRw1Qi3G5X0h6', '树形类', 'tree', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 5, NULL, '0', NULL, NULL, NULL, NULL),
	('fd639a4923ae4868b2115bccac9779b0', '历史数据', 'LiShiShuJu', NULL, 'e74909f73aa94cb4a7b956add66826ae', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('fd782299f49344f68323d5f1d496e4bf', '作战能力设计', 'battleAbilityDesign', NULL, 'b6d1d1753a2641049b9d2b792ee44a40', '060005', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 4, NULL, '0', 'admin', '2024-03-04 15:30:43', 'admin', '2024-03-04 15:30:43'),
	('fe59e080b6cf45f0aacc27a711abcfcc', '使用教程', 'ShiYongJiaoCheng', NULL, 'e74909f73aa94cb4a7b956add66826ae', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('ff487cf228234e298b96d9ddbb48983f', '耗弹量分析', 'HaoDanLiangFenXi', NULL, '04da21a592bb4017bd71acd38ad54608', NULL, NULL, 'page', '516fda70f2b140ddbbdc1a5e1fbec60f', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('fff9321e5d8e45469faebdf0b8fbc792', '装备模板资源管理', 'equipTemplateManage', NULL, 'f04b46be0acd415598e86b449a813501', '067003', NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', '1', 2, NULL, '0', 'admin', '2024-03-04 15:25:33', 'admin', '2024-03-04 15:25:33'),
	('FKmwfkRz_DNc4JFPjN7A3', '矩阵', 'matrix', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('gUmIJy45fXa9iCyjsptaN', '组合', 'compose', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('HCeJKHDPXF7-1J4pU2EH8', '表单', 'form', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('HYhW-F7P4yhFnFGiBSOMW', '项目列表', 'project', NULL, 'LiUy5Sn6bHHYNiZ1eaVax', NULL, NULL, 'page', 'tLmDeY0B0Jlodb0Q9Ueam', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('jnze75B95d7MV53Fxp0xZ', '关系矩阵', 'matrix2', NULL, 'FKmwfkRz_DNc4JFPjN7A3', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('Kf6i3Poese3pJClq7eLrW', '需求版本', 'requirementVersion', NULL, '', NULL, NULL, 'module', 'GmoA4xl7mETp-xPbQBejf', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('kFjV7-69Jlyu3Yx7HXIwq', '装备功能需求模型逻辑校验', 'equipFunctionModelLogicVerify', NULL, 'zqGwm_BZPVRoDB8CHfb_I', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('lgHuv-aZ15TL_txoI7mq_', '卡片表格', 'table4', NULL, '3LXPE0g7uEKX1UtpcoSXW', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('LiUy5Sn6bHHYNiZ1eaVax', '项目管理', 'project', NULL, '', NULL, NULL, 'module', 'tLmDeY0B0Jlodb0Q9Ueam', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('lloTwqlm4vyvnXkqrvb_R', '三栏布局(左中右)', 'layout1', NULL, '1P02P84foHsyQn4pni-OE', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('LXSuYkaNayZw71WUgLaDx', '专题分析', 'subjectAnalysis', NULL, '', NULL, NULL, 'module', 'GmoA4xl7mETp-xPbQBejf', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('MJenOknbCSW_NIoKM0NcK', '业务', 'biz', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 10, NULL, '0', NULL, NULL, NULL, NULL),
	('mt7r9nb4dAzpNFlJLtys0', '左列表右组织图', 'compose4', NULL, 'gUmIJy45fXa9iCyjsptaN', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 4, NULL, '0', NULL, NULL, NULL, NULL),
	('nqsgMMwpyZ7V313mc5Yei', '需求统计分析', 'requirementStatisticsAnalysis', NULL, 'LXSuYkaNayZw71WUgLaDx', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('NUFb0oHX28j8LDE5PVVJd', '左树右组织图', 'compose3', NULL, 'gUmIJy45fXa9iCyjsptaN', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('OrVS6BATSEFbRTo-UjTt_', '左列表中组织图右表单（新一代）', 'biz3', NULL, 'MJenOknbCSW_NIoKM0NcK', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('ouFPMEtjqCn1TIzZL6gmL', '报告生成', 'reportGenerate', NULL, '', NULL, NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 6, NULL, '0', NULL, NULL, NULL, NULL),
	('oUohgO0CHY9lVCNSaqNJn', '页面（随意修改-页面标识必填）', 'temp', NULL, 'B_b4FkGJGd2XgHyjlAbYP', NULL, NULL, 'page', 'vGKO7EMwa8cX_0jEMG-OR', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('Pq8epvb_b-8KQM80mnnC7', '三栏布局(上中下)', 'layout2', NULL, '1P02P84foHsyQn4pni-OE', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('PyjnYJxaAuhP5uHuYhGGE', '作战概念图', 'biz2', NULL, 'MJenOknbCSW_NIoKM0NcK', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('qQuQS3BJo2mAVv2LiBZ2H', '需求变更管理', 'requirementModifyManage', NULL, '2Hw5Ro9Eb-hT7DZ-ELgJR', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('r9XCdYcNiIEv6CqOsZ0CM', '装备功能需求版本控制', 'equipFunctionVersionControl', NULL, 'Kf6i3Poese3pJClq7eLrW', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 3, NULL, '0', NULL, NULL, NULL, NULL),
	('spg0H2BuDf8RNVwMxD9e5', '需求追踪', 'requirementTrace', NULL, '', NULL, NULL, 'module', 'GmoA4xl7mETp-xPbQBejf', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL),
	('uDDwgmOiIdLIkFZ8Mtx3Y', '通用矩阵', 'matrix1', NULL, 'FKmwfkRz_DNc4JFPjN7A3', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('Vhng0tAeTVXK8XvDIxJ6-', '需求报告模板定制', 'requirementReportTemplateMake', NULL, 'ouFPMEtjqCn1TIzZL6gmL', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('VXVBz2Tinf8gMbvkY7fWL', '组织图', 'tree1', NULL, 'FBElzv0HNRw1Qi3G5X0h6', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('wjCKVvPR48AKMem0bOjFQ', '列表', 'list', NULL, '', NULL, NULL, 'module', 'lpXMDd64Fb4aDDbFypoK3', NULL, 6, NULL, '0', NULL, NULL, NULL, NULL),
	('X-i4kVnbXrcLW-pmk6jeL', '左组织图右表单', 'compose5', NULL, 'gUmIJy45fXa9iCyjsptaN', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 5, NULL, '0', NULL, NULL, NULL, NULL),
	('XEdatjqADEUrKKsGnRSU-', '需求变更申请', 'requirementModifyApply', NULL, '2Hw5Ro9Eb-hT7DZ-ELgJR', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('xV4ksGmysoksYll9JTrKk', '作战能力需求模型逻辑校验', 'battleAbilityModelLogicVerify', NULL, 'zqGwm_BZPVRoDB8CHfb_I', NULL, NULL, 'page', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('YKiJclZL9qLwHEMF6ilfm', '（使命）任务分解图', 'biz1', NULL, 'MJenOknbCSW_NIoKM0NcK', NULL, NULL, 'page', 'lpXMDd64Fb4aDDbFypoK3', NULL, 0, NULL, '0', NULL, NULL, NULL, NULL),
	('zqGwm_BZPVRoDB8CHfb_I', '模型校验', 'modelVerify', NULL, '', NULL, NULL, 'module', 'DuKc8Et3ogtTxHPnhjVeO', NULL, 5, NULL, '0', NULL, NULL, NULL, NULL),
	('Zx8iVJ9KNcmFAOVkdG463', '体系能力需求版本控制', 'structAbilityVersionControl', NULL, 'Kf6i3Poese3pJClq7eLrW', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 1, NULL, '0', NULL, NULL, NULL, NULL),
	('_VCl_SEIYX_57sNxu8Ru7', '需求状态设置', 'requirementStatuSetting', NULL, 'spg0H2BuDf8RNVwMxD9e5', NULL, NULL, 'page', 'GmoA4xl7mETp-xPbQBejf', NULL, 2, NULL, '0', NULL, NULL, NULL, NULL);

-- 导出  表 software_factory_db.sf_menu_detail 结构
CREATE TABLE IF NOT EXISTS `sf_menu_detail` (
  `menu_detail_id` varchar(32) NOT NULL COMMENT 'ID',
  `menu_param` longtext COMMENT '参数配置',
  `bind_menu` varchar(32) NOT NULL COMMENT '所属菜单',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`menu_detail_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单详情';

-- 正在导出表  software_factory_db.sf_menu_detail 的数据：~67 rows (大约)
INSERT INTO `sf_menu_detail` (`menu_detail_id`, `menu_param`, `bind_menu`, `description`, `order_num`, `isdel`, `creator`, `create_time`, `create_ip`, `updater`, `update_time`, `update_ip`) VALUES
	('-pUWXaTrToGroVJR_Lem2', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'XEdatjqADEUrKKsGnRSU-', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('-vTEAsgJFnHdvF42xfrXO', '{"categoryType":"biz","type":"taskOrgGraph"}', 'YKiJclZL9qLwHEMF6ilfm', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('1g-axyFXHtQUwjwj22iWw', '{"categoryType":"table","type":"crudTable","templateParam":{"tableCode":"sf_project","tableName":"项目","attrs":[{"prop":"project_id","label":"项目id","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":true,"param":{},"configParam":{}},{"prop":"project_code","label":"项目编码","displayType":"input","isQuery":false,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"project_name","label":"项目名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"short_name","label":"项目简称","displayType":"input","isQuery":true,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"status","label":"项目状态(0:关,1:开)","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"remark","label":"备注","displayType":"input","isQuery":false,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"project_description","label":"项目描述","displayType":"input","isQuery":false,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"system_name","label":"系统名称","displayType":"input","isQuery":false,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"system_code","label":"系统标识","displayType":"input","isQuery":false,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sort","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"isdel","label":"是否删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}}]}}', 'HYhW-F7P4yhFnFGiBSOMW', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('1t1JEpfdpIBqo_TWRXX8I', '{"categoryType":"biz","type":"leftListCenterOrgGraphRightFormXyd"}', 'd9fb1808a0f84715bce33a1ee2a697c1', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('1_RtQZ2dgNUeg1UwAK0kp', '{"categoryType":"table","type":"mergeTable"}', '5cI8aU4CNbVZGMMDoHcxo', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('4aw35xGgyEcafp-A8swO3', '{"categoryType":"table","type":"mergeTable"}', '5f1bcf26ebec484d826f9cb41bc206b1', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('4y7dOgIlI-9l5cbNw92Uk', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'cJtkmZmu0ZaCSeJ78jLxy', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('73nx1zM-tiZrWrNp0_Kuv', '{"categoryType":"biz","type":"leftListCenterGeneralGraphRightFormXyd"}', '3dTOWuFLEPpEht3nTOvB4', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('7jOcM1ao_af2vJLOYaDu4', '{"categoryType":"compose","type":"leftListRightTable"}', 'AsJwalujZjQJAc49v48Bk', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('8m8LJfA--pSS9PxvxgKr5', '{"categoryType":"layout","type":"leftCenterRightLayout"}', 'lloTwqlm4vyvnXkqrvb_R', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('BEOg2a0pKIy028K5PSTv8', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'qQuQS3BJo2mAVv2LiBZ2H', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('BvjLeC2ikm41s-5s-WlqX', '{"categoryType":"biz","type":"operationalConceptGraph"}', '33ce9fffe2e14814b73c89a823675e81', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('B_dkKKlIyMD3W4LBuOERb', '{"categoryType":"biz","type":"operationalConceptGraph"}', 'PyjnYJxaAuhP5uHuYhGGE', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('c-M3zEo0DgrDm65miSTlI', '{"categoryType":"table","type":"mergeTable"}', '3ee46b7a5c184adaa264f992117bd50b', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('CB-XnA6PWBS_SpuhCCj-F', '{"categoryType":"form","type":"generalForm"}', 'cLegkLDi1P5bFFqmuc64x', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('CF_tdYJprW7RdtfudEm4y', '{"categoryType":"biz","type":"leftListCenterOrgGraphRightFormXyd"}', '49824f90e88a4075b8aa2fb92d90ad73', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('CqRD_NijgAWMm98vy5V3X', '{"categoryType":"matrix","type":"relationMatrix","templateParam":{}}', '93aaccf9ea65441ebfed814403c4c7e7', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('CWUEvHcR6dHjvu1GjmM3K', '{"categoryType":"table","type":"mergeTable"}', '6f4791ba147d4c109b1ef1de56d4ff91', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Dk3d5g5vfD8HVe9IiCh5R', '{"categoryType":"table","type":"treeTable"}', '9e072453e0654a1b80683d3a72e8c020', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('f2R2_BZXwU0Y30mu_-myv', '{"categoryType":"biz","type":"operationalConceptGraph"}', '33ce9fffe2e14814b73c89a823675e81', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('FBVgHxKnFnEOyQ-fxKuQX', '{"categoryType":"table","type":"editTable"}', 'b-4Hn7mrLIGHODV0Byiwd', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('fErDWmPMQK0el4uRgKIxc', '{"categoryType":"compose","type":"leftTreeRightOrgGraph"}', 'NUFb0oHX28j8LDE5PVVJd', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('FF4UKoG-tMCR6_di1oN_e', '{"categoryType":"compose","type":"leftTreeRightTable","templateParam":{}}', 'ASHimBVtMuoYI3iQOk3Qx', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('GGQNFzrcYlZLTIrrRLDv2', '{"categoryType":"layout","type":"topCenterBottomLayout"}', 'Pq8epvb_b-8KQM80mnnC7', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('GpxRr5TU-VdzXsa6hE11D', '{"categoryType":"table","type":"crudTable","templateParam":{}}', '0BQLm89vGMKvTR7ffkyOR', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('hGPfnleVd_lH7P7ZS45VW', '{"categoryType":"matrix","type":"generalMatrix"}', 'uDDwgmOiIdLIkFZ8Mtx3Y', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('HjC0JaFiiMbzdKOF4JTRM', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'cXPSVd-47LRuq9Q7Sc1g_', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('hTizJARyXIWGTbnmJBsGW', '{"categoryType":"compose","type":"leftListRighOrgGraph"}', 'mt7r9nb4dAzpNFlJLtys0', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('hx4YtjDck5Dx_iI8BXiWm', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'xV4ksGmysoksYll9JTrKk', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('I2drAj8S5VDfqkc8wSmIw', '{"categoryType":"table","type":"cardTable"}', 'lgHuv-aZ15TL_txoI7mq_', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Ic9FrVUWOmxumDEcLKKVd', '{"categoryType":"table","type":"mergeTable"}', 'e6cbb772eda94c3f9165f6871019adc6', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('IDb9ncjdMvxKuZgG1RWt4', '{"categoryType":"compose","type":"leftListRightRelationMatrix"}', 'f18da752644e4b8d824236198f497255', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('IJf6TRrcVpmjkllLNt6vF', '{"categoryType":"table","type":"crudTable","templateParam":{}}', '01862066c4374f48a32cd0805d7a5d28', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('iN2KaIXC0Xl7iXWX1GOBw', '{"categoryType":"table","type":"crudTable","templateParam":{"tableCode":"xyd_project","tableName":"项目","attrs":[{"prop":"project_id","label":"项目ID","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":true,"param":{},"configParam":{}},{"prop":"project_name","label":"项目名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"mission","label":"使命","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_battle_abi_version","label":"当前作战能力版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_tixi_abi_version","label":"当前体系能力版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_sys_abi_version","label":"当前系统能力","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_function_version","label":"当前装备功能版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_sort","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_is_del","label":"是否已删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}}]}}', '1b2c554b2b97467d82614a9957469866', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('jBQ-f9CPjlllTCtJ8Ukej', '{"categoryType":"other","type":"battleActivityDesign","templateParam":{}}', 'df348ebaddf9427ab4b33dda7855b6cf', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('jPvpKvgB8VWrjvqXLHyXn', '{"categoryType":"matrix","type":"relationMatrix","templateParam":{}}', '1cd5a63929f44d31a57564e78d643d54', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('lWTgfVio6u74YVUwdvhk6', '{"categoryType":"other","type":"readOnlyWord"}', 'Vhng0tAeTVXK8XvDIxJ6-', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('lygGGCRhxrfJUeuqGZQCf', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'oUohgO0CHY9lVCNSaqNJn', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('LyLowS6-84nr0iEmRu_Y_', '{"categoryType":"table","type":"mergeTable"}', 'BoklAB9Hxs73PSYhVAG0F', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('M89L5MDSCRLvPCkN2zcz2', '{"categoryType":"table","type":"mergeTable"}', 'A_8ApIawfTgWjXcbBYHHe', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Ml74pqKXEgclEqz96aWMF', '{"categoryType":"compose","type":"leftOrgGraphRightForm"}', 'fd782299f49344f68323d5f1d496e4bf', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('mVHTePkgR5uPO9MTqMtLt', '{"categoryType":"table","type":"crudTable","templateParam":{"tableCode":"xyd_project","tableName":"项目","attrs":[{"prop":"project_id","label":"项目ID","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":true,"isMerge":false,"param":{},"configParam":{}},{"prop":"project_name","label":"项目名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"mission","label":"使命","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"bind_battle_abi_version","label":"当前作战能力版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"bind_tixi_abi_version","label":"当前体系能力版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"bind_sys_abi_version","label":"当前系统能力","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"bind_function_version","label":"当前装备功能版本","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_sort","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_is_del","label":"是否已删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"sys_update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}}]}}', '1b2c554b2b97467d82614a9957469866', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
	('nC0Xt2d99oLztr0YS6bPV', '{"categoryType":"compose","type":"leftOrgGraphRightForm"}', 'bb3610573f2646d7a6bd2a298284ef26', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Ob51sW01txSDimtubH0iU', '{"categoryType":"table","type":"mergeTable"}', 'Zx8iVJ9KNcmFAOVkdG463', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('pALZNZ5pTjs8xjJn9tSBM', '{"categoryType":"table","type":"crudTable","templateParam":{}}', '3d76f9dea528412ea90ee783ffed2cb8', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('pNdj4lkciJu0VBVEgcQ9d', '{"categoryType":"table","type":"crudTable","templateParam":{}}', '_VCl_SEIYX_57sNxu8Ru7', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('ps6Jwj64ffXqJIbwNsp3A', '{"categoryType":"table","type":"cardTable"}', '7ptDbs2ap7sPfRof34z8L', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('qhkSg_JGQ2_2YlBNpKa5X', '{"categoryType":"table","type":"generalTable","templateParam":{"tableCode":"wf_view_menu","tableName":"菜单","attrs":[{"prop":"view_menu_id","label":"ID","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":true,"param":{},"configParam":{}},{"prop":"name","label":"名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"description","label":"描述","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_gen_project_id","label":"绑定生成项目","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"type","label":"菜单类型（模块还是页面）","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"emit_type","label":"触发类型（页面、弹窗、事件）","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"parent_id","label":"父菜单","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"emit_params","label":"触发类型的事件参数","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"alias_name","label":"菜单别名","displayType":"input","isQuery":true,"isForm":true,"isRequired":false,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"icon","label":"图标","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"iconType","label":"图标类型png、svg、el-class","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"icon_size","label":"图标大小","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"order_num","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"isdel","label":"是否删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"create_ip","label":"创建ip","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"update_ip","label":"修改ip","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}}]}}', '2Vx2IJqhG7KHDhyuSshd5', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('QnHneJdWm-WS1t7DyAi1o', '{"categoryType":"table","type":"mergeTable"}', 'r9XCdYcNiIEv6CqOsZ0CM', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('RE2YdPRIuwnz0azx3HsK2', '{"categoryType":"table","type":"crudTable","templateParam":{}}', 'kFjV7-69Jlyu3Yx7HXIwq', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('rJHSpajV-DhBXKPrKvJh5', '{"categoryType":"matrix","type":"relationMatrix"}', 'jnze75B95d7MV53Fxp0xZ', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('sPdIa6FRLYJLlHJFACi9r', '{"categoryType":"globalGlobal","type":"empty"}', 'Vhng0tAeTVXK8XvDIxJ6-', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('t7PNTzaBAgubdxsD0RsuO', '{"categoryType":"tree","type":"orgGraphTree"}', 'VXVBz2Tinf8gMbvkY7fWL', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Tc7-Bgs3PZPYmkpNaJ0kI', '{"categoryType":"table","type":"crudTable","templateParam":{}}', '3d4091ebeadc4c958c1afe7dd7615f13', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('tzslxf3-N2wwxF0DSQLeK', '{"categoryType":"table","type":"crudTable","templateParam":{"tableCode":"xyd_equip","tableName":"装备","attrs":[{"prop":"equip_id","label":"装备ID","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":true,"param":{},"configParam":{}},{"prop":"equip_name","label":"装备名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"equip_code","label":"装备标识","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"description","label":"描述","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_unit","label":"所属单元","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_task","label":"所属任务","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"bind_project","label":"所属项目","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_sort","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_is_del","label":"是否已删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}},{"prop":"sys_update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"param":{},"configParam":{}}]}}', 'fff9321e5d8e45469faebdf0b8fbc792', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('VES43hp5ycxR4nJnTE9B_', '{"categoryType":"matrix","type":"relationMatrix","templateParam":{"horizontal":{"tableCode":"xyd_act","fieldList":{"uniqueCode":"act_id","displayName":"act_name","parentCode":""}},"vertical":{"tableCode":"xyd_battle_abi","fieldList":{"uniqueCode":"abi_id","displayName":"abi_name","parentCode":"parent_id"}},"rel":{"tableCode":"xyd_battle_abi_to_act_rel","fieldList":{"uniqueCode":"rel_id","relCode":""}}}}', 'af632b04f63748a595fdac2201f7ab4c', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('vx5ETkIKbY5brzmG41BEY', '{"categoryType":"biz","type":"leftListCenterOrgGraphRightFormXyd"}', 'OrVS6BATSEFbRTo-UjTt_', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('W9JVyMATrwnMk_kiwWfLj', '{"categoryType":"form","type":"generalForm"}', 'clu9XCQmsh_-kzLkNbga9', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('wOf_CE1l1ceX6i2pUbyyC', '{"categoryType":"compose","type":"leftListRightTable"}', 'c39056453a244647a60e262756556dca', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('xEAw_3dZLcbnxyU100WRt', '{"categoryType":"biz","type":"taskOrgGraph"}', 'c46e6798ac714024bb6399749695022a', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Xx_qqO3rzxFPFb9TXwnCb', '{"categoryType":"biz","type":"leftListCenterOrgGraphRightFormXyd"}', 'f9dfc4e12f044e43b88adc25b2de5d73', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('xy6_hmSt93iyYy75nZHnV', '{"categoryType":"compose","type":"leftOrgGraphRightForm"}', 'X-i4kVnbXrcLW-pmk6jeL', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Yn9-_cAF02vbc1H9b57Rz', '{"categoryType":"table","type":"treeTable"}', 'EO5sdkjcWPH9FLW-WUSGx', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('zCvEs-62mGvVlA02QkMPh', '{"categoryType":"biz","type":"leftListCenterGeneralGraphRightFormXyd"}', '930ce59701d9496b96a1ad06bc430f8b', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('zfyeBjE1DERJ7SJ_KC113', '{"categoryType":"table","type":"mergeTable","templateParam":{"tableCode":"wf_view_component","tableName":"组件","attrs":[{"prop":"view_view_component_id","label":"ID","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":true,"isMerge":false,"param":{},"configParam":{}},{"prop":"name","label":"名称","displayType":"input","isQuery":true,"isForm":true,"isRequired":true,"isHidden":false,"isPrimaryKey":false,"isMerge":true,"param":{},"configParam":{}},{"prop":"description","label":"描述","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"bind_view_page","label":"绑定页面","displayType":"input","isQuery":false,"isForm":false,"isRequired":true,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"order_num","label":"排序","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"isdel","label":"是否删除","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"creator","label":"创建人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"create_time","label":"创建时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"create_ip","label":"创建ip","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"updater","label":"修改人","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"update_time","label":"修改时间","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}},{"prop":"update_ip","label":"修改ip","displayType":"input","isQuery":false,"isForm":false,"isRequired":false,"isHidden":true,"isPrimaryKey":false,"isMerge":false,"param":{},"configParam":{}}]}}', '9JMk7z0tu2JlvIuei_03K', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('zQDlhA1QoL47aU-isQmdl', '{"categoryType":"matrix","type":"weightMatrix","templateParam":{}}', 'DcioiFYVZjmZpU5qnnTiz', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('_E2BC1eSLYBXVDJ6sjQ9m', '{"categoryType":"biz","type":"leftListCenterGeneralGraphRightFormXyd"}', 'f63efefb0da046309edd6f0e083c98d4', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL);

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

-- 正在导出表  software_factory_db.sf_project 的数据：~6 rows (大约)
INSERT INTO `sf_project` (`project_id`, `project_code`, `project_name`, `short_name`, `status`, `remark`, `project_description`, `system_name`, `system_code`, `sort`, `isdel`, `creator`, `create_time`, `updater`, `update_time`) VALUES
	('516fda70f2b140ddbbdc1a5e1fbec60f', NULL, '打击筹划分析系统', NULL, '1', NULL, NULL, NULL, NULL, 0, '0', NULL, NULL, NULL, NULL),
	('DuKc8Et3ogtTxHPnhjVeO', NULL, '数据链军事需求开发软件', NULL, '1', NULL, NULL, NULL, NULL, 1, '0', NULL, NULL, NULL, NULL),
	('GmoA4xl7mETp-xPbQBejf', NULL, '数据链军事需求管理软件', NULL, '1', NULL, NULL, NULL, NULL, 2, '0', NULL, NULL, NULL, NULL),
	('lpXMDd64Fb4aDDbFypoK3', NULL, '测试组件', NULL, '1', NULL, NULL, NULL, NULL, 0, '0', NULL, NULL, NULL, NULL),
	('tLmDeY0B0Jlodb0Q9Ueam', NULL, '代码生成项目', NULL, '1', NULL, NULL, NULL, NULL, 0, '0', NULL, NULL, NULL, NULL),
	('vGKO7EMwa8cX_0jEMG-OR', NULL, '新一代临时生成工具', NULL, '1', NULL, NULL, NULL, NULL, -1, '0', NULL, NULL, NULL, NULL);

-- 导出  表 software_factory_db.sf_project_config 结构
CREATE TABLE IF NOT EXISTS `sf_project_config` (
  `project_config_id` varchar(32) NOT NULL COMMENT 'ID',
  `bind_project` varchar(32) NOT NULL COMMENT '所属项目',
  `config_param` longtext COMMENT '数据库配置',
  `project_param` longtext COMMENT '项目配置',
  `description` varchar(255) DEFAULT NULL COMMENT '描述',
  `order_num` int(10) DEFAULT NULL COMMENT '排序',
  `isdel` varchar(1) CHARACTER SET utf8 DEFAULT '0' COMMENT '是否删除',
  `creator` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建人',
  `create_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建时间',
  `create_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '创建ip',
  `updater` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改人',
  `update_time` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改时间',
  `update_ip` varchar(32) CHARACTER SET utf8 DEFAULT NULL COMMENT '修改ip',
  PRIMARY KEY (`project_config_id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='项目配置';

-- 正在导出表  software_factory_db.sf_project_config 的数据：~6 rows (大约)
INSERT INTO `sf_project_config` (`project_config_id`, `bind_project`, `config_param`, `project_param`, `description`, `order_num`, `isdel`, `creator`, `create_time`, `create_ip`, `updater`, `update_time`, `update_ip`) VALUES
	('8dO1H3zjtZlGmODLmoHup', 'tLmDeY0B0Jlodb0Q9Ueam', '{"host":"localhost","port":3306,"type":"mysql","username":"root","password":"123456","database":"software_factory_db"}', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('LVTiG1_hP2hsxrrlsmnRK', 'GmoA4xl7mETp-xPbQBejf', '{"host":"192.168.2.204","port":3306,"type":"mysql","username":"root","password":"123456","database":"xyd_db"}', '{"prefix":"base/api"}', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('nb2iFt5_J7BjfWht6rXie', 'DuKc8Et3ogtTxHPnhjVeO', '{"host":"192.168.2.204","port":3306,"type":"mysql","username":"root","password":"123456","database":"xyd_db"}', '{"prefix":"base/api"}', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('S4PiG1_hP2hsxrrlsmnRK', '516fda70f2b140ddbbdc1a5e1fbec60f', '{"host":"192.168.2.204","port":3306,"type":"mysql","username":"root","password":"123456","database":"chfx_db"}', '{"prefix":"base/api"}', NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('V4Uesq20BtAdXqbBm7NzT', 'vGKO7EMwa8cX_0jEMG-OR', '{"host":"192.168.2.204","port":3306,"type":"mysql","username":"root","password":"123456","database":"xyd_db"}', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL),
	('Y2Uvi7VC2xhpER97Hzusu', 'lpXMDd64Fb4aDDbFypoK3', '{"host":"localhost","port":3306,"type":"mysql","username":"root","password":"123456","database":"workflow_db"}', NULL, NULL, NULL, '0', NULL, NULL, NULL, NULL, NULL, NULL);

/*!40103 SET TIME_ZONE=IFNULL(@OLD_TIME_ZONE, 'system') */;
/*!40101 SET SQL_MODE=IFNULL(@OLD_SQL_MODE, '') */;
/*!40014 SET FOREIGN_KEY_CHECKS=IFNULL(@OLD_FOREIGN_KEY_CHECKS, 1) */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40111 SET SQL_NOTES=IFNULL(@OLD_SQL_NOTES, 1) */;
