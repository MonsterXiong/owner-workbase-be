import { Injectable } from '@nestjs/common';
import { SfMenuDetailService } from '../../base/sfMenuDetail/sfMenuDetail.service';
import { SfMenuService } from '../../base/sfMenu/sfMenu.service';
import QueryConditionBuilder from '../../../utils/queryConditionBuilder';


function formatMenuInfo(menuInfo, menuDetailInfo) {
    let menuParam = {}
    if (menuDetailInfo?.menuParam) {
        menuParam = {...JSON.parse(menuDetailInfo.menuParam)}
    }
    return {
        ...menuInfo,
        menuParam
    }

}
@Injectable()
export class SfMenuExtendService {
    constructor(
        private readonly sfMenuService: SfMenuService,
        private readonly sfMenuDetailService: SfMenuDetailService
    ) { }

    // 获取单条菜单以及菜单详情信息
    async getMenuInfoById(menuId) {
        const menuInfo = await this.sfMenuService.findOne(menuId)
        if (!menuInfo) {
            return null
        }
        const menuDetailInfo = await this.sfMenuDetailService.findOneByParam({'bindMenu': menuId})
        return formatMenuInfo(menuInfo,menuDetailInfo)
    }
    // 批量获取菜单以及菜单详情信息
    async getMenuInfoByIds(menuIds) {
        // 获取菜单列表
        const menuQuery = QueryConditionBuilder.getInstanceNoPage().buildInQuery('menuId',menuIds).buildAscSort('sort')
        const menuList = await this.sfMenuService.queryList(menuQuery as any)
        // 获取菜单详情列表
        const menuDetailQuery = QueryConditionBuilder.getInstanceNoPage().buildInQuery('bindMenu',menuIds)
        const menuDetailList = await this.sfMenuDetailService.queryList(menuDetailQuery as any)
        const result =[]
        menuList.forEach(item => {
            const menuDetailInfo = menuDetailList.find(menuDetail => menuDetail.bindMenu == item.menuId)
            result.push(formatMenuInfo(item,menuDetailInfo))
        })
        return result
    }
}
