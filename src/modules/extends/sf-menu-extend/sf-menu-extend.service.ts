import { Injectable } from '@nestjs/common';
import { SfMenuDetailService } from '../../base/sfMenuDetail/sfMenuDetail.service';
import { SfMenuService } from '../../base/sfMenu/sfMenu.service';

@Injectable()
export class SfMenuExtendService {
    constructor(
        private readonly sfMenuService: SfMenuService,
        private readonly sfMenuDetailService: SfMenuDetailService){}

    async getMenuInfoById(menuId) {
        const menuInfo = await this.sfMenuService.findOne(menuId)
        if (!menuInfo) {
            return null
        }
        const menuDetailInfo = await this.sfMenuDetailService.findOneByParam({ 'bindMenu': menuId })
        let menuParam = {}
        if (menuDetailInfo?.menuParam) {
            menuParam = {...JSON.parse(menuDetailInfo.menuParam)}
        }
        return {
            ...menuInfo,
            menuParam
        }
    }
}
