/**
** 用户行为统计
** @author xiaohui
** @params shopId、token、uuid、from、webUrl、type=1 详情 0 其他、goodsId、duration、otherInfo、request
** 
*/

import axios from '../../plugins/axios'

import {basicConfig} from '../../static/js/config'

export function addStatistic(preload) {

        return (dispatch, getState) => {
            return axios.post(basicConfig.interfaceUrl + '/logs/add', preload || {})
                .then((res) => {

                }).catch((error) => {
                    
                });
        }
    
}
