import {
    actionTypes
} from '../../reducers/home';
import axios from '../../plugins/axios';
import {
    basicConfig
} from '../../static/js/config'

export const setShowCatalogMenu = (showCatalogMenu) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWCATALOGMENU,
        showCatalogMenu
    })
};

export const setPathname = (pathname) => dispatch => {
    return dispatch({
        type: actionTypes.PATHNAME,
        pathname
    })
};


export const setReferer = (referer) => dispatch => {
    return dispatch({
        type: actionTypes.REFERER,
        referer
    })
};

export const setMonitor = (isMonitor) => dispatch => {
    return dispatch({
        type: actionTypes.ISMONITOR,
        isMonitor
    })
};

export const setLanguage = (language) => dispatch => {
    return dispatch({
        type: actionTypes.LANGUAGE,
        language
    })
};
export const setHomeShowMenu = (showMenu) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWMENU,
        showMenu
    })
};

export const newDevice = (device, isFb) => dispatch => {
    return dispatch({
        type: actionTypes.DEVICE,
        device: device,
        isFb: isFb
    })
};

export const isIeBrowser = (ie) => dispatch => {
    return dispatch({
        type: actionTypes.IEBROWSER,
        ie: ie
    })
};



export const getIntDevice = (device, isFb) => dispatch => {
    return dispatch({
        type: actionTypes.INITDEVICE,
        device: device,
        isFb: isFb
    })
};

export const setSkin = (skin) => dispatch => {
    return dispatch({
        type: actionTypes.SKIN,
        skin: skin
    })
};
export const setColor = (color) => dispatch => {
    return dispatch({
        type: actionTypes.COLOR,
        color: color
    })
};

export const setShareFb = (shareFb) => dispatch => {
    return dispatch({
        type: actionTypes.SHAREFB,
        shareFb
    })
};

export const setShopId = (shopId) => dispatch => {
    return dispatch({
        type: actionTypes.SHOPID,
        shopId
    })
};

//请求接口获取Skin类型 shop_id
export const getSkin = () => dispatch => {
    return (dispatch, getState) => {

        return axios.get('http://tradetest.onloon.net:8030/static/mock/skin.json')

        .then((res) => {
            //接口废弃
        }).catch((error) => {
            console.log('error--skin')
        })
    }
};


//获取橱窗列表Loading效果
/** 
 **/
export function ShowCaseLoading(showOrHidden) {
    return (dispatch, getState) => {
        dispatch({
            type: actionTypes.SHOWCASELOADING,
            showcaseLoading: showOrHidden
        })
    }
}

//获取优惠宝列表
/**
 **
 **/
export function getCouponList(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/couponShop/checkIfReceived', {
            params: preload || {}
        }).then((res)=>{
            if(res.data&&res.data.success){
                return dispatch({
                    type: actionTypes.COUPONDATA,
                    couponData: res.data.data
                })
            }
        }).catch((error)=>{
            console.warn(error)
        })
    }
}

//领取优惠券
/**
 **
 **/
export function receiveCoupon(preload) {
    return (dispatch, getState) => {
        return axios.post(basicConfig.interfaceUrl + '/couponShop/receiveCouponUser', preload || {})
    }
}

//SEO
export const setKeywords = (keywords) => dispatch => {
    return dispatch({
        type: actionTypes.KEYWORDS,
        keywords: keywords
    })
};
export const setDescription = (description) => dispatch => {
    return dispatch({
        type: actionTypes.DESCRIPTION,
        description: description
    })
};
