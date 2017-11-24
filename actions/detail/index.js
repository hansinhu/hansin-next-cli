import axios from '../../plugins/axios'
import {
    actionTypes
} from '../../reducers/detail';
import {
    basicConfig
} from '../../static/js/config'

import {
    toDecimal2,
    checkLoginStatus,
    setToken,
    removeToken
} from '../../static/js/global'

export const changeMainImg = (data) => dispatch => {
    return dispatch({
        type: actionTypes.CHANGE_MAIN_IMG,
        index: data
    })
};

export const setShowPrice = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_SHOW_PRICE,
        price: data
    })
};

export const setSpecItem = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_SPEC_ITEM,
        specItem: data
    })
};

export const setDetailData = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_DETAIL_DATA,
        data: data
    })
};

export const setSpecData = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_SPEC_DATA,
        specData: data
    })
};

export const setGoodsNum = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_GOODS_NUM,
        goodsNum: data
    })
};

export const setShareData = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_SHARE_DATA,
        data: data
    })
};

export const setMoreData = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_MORE_DATA,
        data: data
    })
};

export const setCollectStatus = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_COLLECT_STATUS,
        data: data
    })
};

export const setCommentList = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_COMMENT_LIST,
        data: data
    })
};

export const setCommentListMobile = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_COMMENT_LIST_MOBILE,
        data: data
    })
};


export function getProductDetail(params) {
    return (dispatch, detailData) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/item/detail.do', {
            params: Object.assign({}, params,{unLogin: true}) || {}
        })
            .then((res) => {
                let data = res.data.data;
                if(data == null) {
                    dispatch(setDetailData({shopId: null}));
                    return;
                }
                dispatch(setDetailData(data));
                //折扣
                let rate = data.discount ? Number(toDecimal2(data.discount.discountRate * 0.1)) : 1;
                //多规格,价格
                if (data.specList && data.specList.length) {
                    let arrSpecKey = [];
                    let arrSpecDec = [];
                    let flag = true;
                    for (let key in data.specList[0].specKey){
                        arrSpecKey.push(key)
                    }
                    for (let i=0;i<data.specDeclareList.length;i++) {
                        arrSpecDec.push(data.specDeclareList[i].name);
                        if(arrSpecDec[i] != arrSpecKey[i]){
                            flag = false;
                        }
                    }

                    //specKey 与 specDeclareList，属性顺序不一致
                    if(!flag) {
                        for(let i=0;i<data.specList.length;i++) {
                            let obj = {};
                            for(let j=0;j<data.specDeclareList.length;j++){
                                obj[arrSpecDec[j]] = data.specList[i].specKey[arrSpecDec[j]]
                            }
                            data.specList[i].specKey = obj;
                        }
                    }

                    let arr = data.specList.map(function(item,i) {
                        let specKey = '';
                        for(let key in item.specKey) {
                            specKey += key + '=' + item.specKey[key] + ',';
                        }
                        specKey = specKey.substring(0,specKey.length-1);
                        data.specList[i].specKey = specKey;
                        return item.price;
                    });

                    arr.sort(function(a, b) {
                        return a - b
                    });
                    if (arr[0] == arr[arr.length - 1]) {
                        dispatch(setShowPrice({
                            price: toDecimal2(arr[0] * rate),
                            oldPrice: toDecimal2(data.price),
                            rate: rate
                        }))
                    } else { //多价格
                        dispatch(setShowPrice({
                            price: toDecimal2(arr[0] * rate) + '~' + toDecimal2(arr[arr.length - 1] * rate),
                            oldPrice: toDecimal2(arr[0]) + '~' + toDecimal2(arr[arr.length - 1]),
                            rate: rate
                        }))
                    }
                } else {
                    dispatch(setShowPrice({
                        price: toDecimal2(data.price * rate),
                        oldPrice: toDecimal2(data.price),
                        rate: rate
                    }))
                }
                let aAvtiveIndex = [];
                let aSpecNameVal = [];
                data.specDeclareList && data.specDeclareList.forEach(function(item) {
                    aSpecNameVal.push({
                        name: item.name,
                        val: ''
                    });
                });
                dispatch(setSpecData({
                    activeIndex: aAvtiveIndex,
                    specKeyVal: aSpecNameVal
                }));
                dispatch(setSpecItem({
                    inventory: data.inventory
                }));
                dispatch(setCollectStatus(data.favorited));

                //裂变分销
                /*if (data.brokerage > 0 && checkLoginStatus()) {
                    dispatch(shareLink({
                        channel: 'SYSTEM',
                        fissionId: data.fissionId
                    }));
                }*/
            }).catch((error) => {
                console.log('error: getProductDetail',error)
            });
    }
}
// channel fissionId
export function shareLink(params) {
    return (dispatch) => {
        return axios.post(basicConfig.interfaceUrl + '/marketing/fission/share', params || {})
            /*.then(res => {
                if (res.data.success && params.channel == 'SYSTEM') { //
                    dispatch(setShareData({shareUrl: res.data.data}))
                }
            }).catch((error) => {
                console.log('error: shareLink',error)
            });*/
    }
}

// channel itemId
export function shareLogs(params) {
    return (dispatch) => {
        return axios.get(basicConfig.interfaceUrl + '/logs/shareadd', { params: Object.assign({}, params,{unLogin: true}) || {}})
            .catch((error) => {
                console.log('error: shareLogs',error)
            });
    }
}

//下单
export function creatOrder(params) {
    return () => {
        /*item_id spec_key quantity*/
        return axios.post(basicConfig.interfaceUrl + '/buyerOrder/addOrderConfirmGroup', params || {})
    }
}

//加入购物车
export function addToCard(params) {
    return () => {
        /*item_id price spec_key quantity*/
        return axios.post(basicConfig.interfaceUrl + '/cart/addCart', params || {})
    }
}

//收藏
export function collectGoods(params) {
    return (dispatch, getState) => {
        /*itemId*/
        return axios.post(basicConfig.interfaceUrl + '/buyer/addCollect', params||{})
    }
}

//取消收藏
export function cancelCollectGoods(params) {
    return (getState) => {
        /*itemId*/
        return axios.post(basicConfig.interfaceUrl + '/buyer/removeCollect', params || {})
    }
}



// 评论列表
export function getCommentList(params) {
    return (dispatch, getState) => {
        return axios.post(basicConfig.interfaceUrl + '/comment/order/listComment',
            Object.assign({}, params,{unLogin: true})  || {}
        )
        .then((res) => {
            dispatch(setCommentList(res.data.data));
        }).catch((error) => {
            console.log('error: getCommentList',error)
        });
    }
}

// 评论列表(手机端)
export function getCommentListMobile(params) {
    return (dispatch, getState) => {
        return axios.post(basicConfig.interfaceUrl + '/comment/order/listComment',
            Object.assign({}, params,{unLogin: true})  || {}
        )
        .then((res) => {
            dispatch(setCommentListMobile(res.data.data));
        }).catch((error) => {
            console.log('error: getCommentListMobile',error)
        });
    }
}


//点赞
export function addGoods(params) {
    return (dispatch, getState) => {
        /*commentId*/
        return axios.post(basicConfig.interfaceUrl + '/comment/order/addgoodsComment', params || {})
    }
}

//取消点赞
export function deleteGoods(params) {
    return (getState) => {
        /*commentId*/
        return axios.post(basicConfig.interfaceUrl + '/comment/order/deleteGoodsComment', params || {})
    }
}


