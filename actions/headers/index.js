import {actionTypes} from '../../reducers/headers';
import {getProductCatalogListData} from '../products';
import axios from '../../plugins/axios'
import {basicConfig} from '../../static/js/config'
import {removeToken ,setToken} from '../../static/js/global'
import {ShowCaseLoading, setKeywords, setDescription, setSkin, setColor} from '../home/index'

export const setNavIndex = (navIndex) => dispatch => {
    return dispatch({
        type: actionTypes.NAVINDEX,
        navIndex
    })
};

export const setFooterInfo = (footerInfo) => dispatch => {
    return dispatch({
        type: actionTypes.FOOTERINFO,
        footerInfo
    })
};


export const setBottomInfo = (bottomInfo) => dispatch => {
    return dispatch({
        type: actionTypes.BOTTOMINFO,
        bottomInfo
    })
};

export const setUserInfo = (userInfo) => dispatch => {
    return dispatch({
        type: actionTypes.USERINFO,
        userInfo
    })
};

export const setMenuList = (menuList) => dispatch => {
    return dispatch({
        type: actionTypes.MENULIST,
        menuList
    })
};

export const setFetchMenu = (fetchMenu) => dispatch => {
    return dispatch({
        type: actionTypes.FETCHMENU,
        fetchMenu
    })
};

export const setShowSearch = (showSearch) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWSEARCH,
        showSearch
    })
};

export const setShowMenu = (showMenu) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWMENU,
        showMenu
    })
};

export const setShowMobileLogo = (showMobileLogo) => dispatch => {
    return dispatch({
        type: actionTypes.SHOWMOBILELOGO,
        showMobileLogo
    })
};

export const setCarNum = (carNum) => dispatch => {
    return dispatch({
        type: actionTypes.CARNUM,
        carNum
    })
};

export const setLogined = (isLogined) => dispatch => {
    return dispatch({
        type: actionTypes.ISLOGINED,
        isLogined
    })
};

export const setShopInfo = (data) => dispatch => {
    return dispatch({
        type: actionTypes.SET_SHOP_INFO,
        data: data
    })
};

/**
 * 获取店铺装修信息
 * @param preload
 */
export function getDecoInfo(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/decoinfo.do', {
            params: Object.assign({}, preload,{unLogin: true}) || {}
        })
            .then((res) => {
                if (res.data.success) {
                    dispatch(setFooterInfo(res.data.data));
                    dispatch(ShowCaseLoading(false));
                }
            }).catch((error) => {

            });
    }
}


/**
 * 获取店铺橱窗信息
 * @param preload
 */
export function getShowCaseInfo(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/showcase/info.do', {
            params: Object.assign({}, preload,{unLogin: true}) || {}
        })
            .then((res) => {
                if (res.data.success) {

                    dispatch(setShowCaseInfo(res.data.data));
                    dispatch(ShowCaseLoading(false));
                }
            }).catch((error) => {

            });
    }
}


export const setShowCaseInfo = (showcaseList) => dispatch => {

    return dispatch({
        type: actionTypes.SHOWCASE,
        showcaseList
    })
};


/**
 * 退出登录接口
 * @param preload
 */
export function doSignOut(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/logout', {
                params: preload || {}
            })
            .then((res) => {
                if (res.data.success) {
                    let url = (getState('home').home.device == 'pc') ? basicConfig.oldUrl : ( (getState('home').home.isFb) ? basicConfig.oldFbUrl : basicConfig.oldMobileUrl);
                    removeToken('t_back_url');
                    removeToken('token');
                    // setToken('logined',0)
                    window.location.href = url + '/account/login.html?callback=' + window.location;
                }
            }).catch((error) => {

            });
    }
}

/**
 * 获取菜单下拉框接口
 * @param preload
 */
export function getMenuList(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/category/list.do', {
                params: Object.assign({}, preload,{unLogin: true,unLoading: true}) || {}
            })
            .then((res) => {
                if (res.data.success && res.data.data) {
                    let data = res.data.data;
                    if (data.length > 0) {
                        data.unshift({
                            "categoryId": "1",
                            "name": "All Categories",
                            "subList": []
                        });
                    }
                    for(let i=0;i<data.length;i++){
                        if(data[i].subList.length>0){
                            data[i].subList.unshift({
                                "categoryId": (i-1) + '-' + data[i].categoryId,
                                "name": "All Categories",
                                "subList": null,
                                'isAll': true
                            });
                        }
                    }

                    dispatch(setMenuList(data));
                    dispatch(setFetchMenu(false));
                    getProductCatalogListData()
                    // dispatch(setCatalogDataList(data))//数据格式错误，已改为product里面写好的
                }
            }).catch((error) => {

            });
    }
}

/**
 * 获取购物车数据接口
 * @param preload
 */
export function getCarNum(preload) {
    return (dispatch, getState) => {
        return axios.post(basicConfig.interfaceUrl + '/cart/getCartQuantity', preload || {})
            .then((res) => {
                if (res.data.success) {
                    dispatch(setCarNum(res.data.data));
                }
            }).catch((error) => {

            });
    }
}

/**
 * 获取当前用户
 * @param preload
 */
export function getUserInfo(preload) {
    return (dispatch, getState) => {
        return axios.post(basicConfig.interfaceUrl + '/user/get', preload || {})   //TODO NOT /get
            .then((res) => {
                if (res.data.success) {
                    dispatch(setUserInfo(res.data.data));
                    setToken('uuid',res.data.data.id)
                }
            }).catch((error) => {

            });
    }
}


//获取店铺基本信息
export function getShopInfo(params) {
    return (dispatch) => {
        //shopId
        return axios.get(basicConfig.interfaceUrl + '/buy/shop/detail',{
            params: Object.assign({}, params,{unLogin: true}) || {}
        })
    }
}

//获取卖家绑定的fb主页信息
export function getFBHomePage(params) {
    return () => {
        return axios.get(basicConfig.interfaceUrl + '/marketing/channel/facebook/bind/anonymity/get/shop', {
            params:  Object.assign({}, params,{unLogin: true}) || {}
        })
    }
}

//获取店铺装修信息
export function getShopDetail(params) {
    return (dispatch) => {
        //shopId
        return axios.get(basicConfig.interfaceUrl + '/shop/company/support',{
            params: Object.assign({}, params,{unLogin: true}) || {}
        })
            .then((res) => {
                if(res.data.success && res.data.data){
                    let data = res.data.data;
                    if(data.name){
                        dispatch(setKeywords(data.name));
                        dispatch(setDescription(data.name));
                    }
                    dispatch(setBottomInfo(data));
                }else {
                    let bottomInfo = {
                        logo: '',
                        shopExtInfo: {},
                        name: ''
                    };
                    dispatch(setBottomInfo(bottomInfo));
                }
            }).catch((error) => {
                let bottomInfo = {
                    logo: '',
                    shopExtInfo: {},
                    name: ''
                };
                dispatch(setBottomInfo(bottomInfo));
            });
    }
}

//获取主题信息
export function getShopTheme(params) {
    return (dispatch) => {
        //shopId
        return axios.get(basicConfig.interfaceUrl + '/shop/theme/get.do',{
            params: Object.assign({}, params,{unLogin: true}) || {}
        })
            .then((res) => {
                if(res.data.success && res.data.data){
                    let data = res.data.data;
                    let skin;
                    if (data.theme) {
                        skin = data.theme;
                    }else {
                        skin = "default";
                    }
                    dispatch(setSkin(skin));

                    let color;
                    if (data.color) {
                        color = data.color;
                    } else {
                        color = "black";
                    }
                    dispatch(setColor(color));
                }else {
                    dispatch(setSkin("default"));
                    dispatch(setColor("black"));
                }
            }).catch((error) => {
                dispatch(setSkin("default"));
                dispatch(setColor("black"));
            });
    }
}
