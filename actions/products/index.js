import {actionTypes} from '../../reducers/products';
import axios from '../../plugins/axios'
import {basicConfig} from '../../static/js/config'

//列表页展示效果 网格or列表
export const changeListType = (val) => dispatch => {
    return dispatch({
        type: actionTypes.TYPE,
        listType: val
    })
};

//改变当前页码
export const changePageNumber = (val) => dispatch => {
    return dispatch({
        type: actionTypes.CURRENTPAGE,
        value: val
    })
};

//设置总页数
export const changeTotal = (val) => dispatch => {
    return dispatch({
        type: actionTypes.TOTAL,
        value: val
    })
};

export const setCategotyId = (val) => dispatch => {
    return dispatch({
        type: actionTypes.CATEGORYID,
        value: val
    })
};

export const setPriceMin = (val) => dispatch => {
    return dispatch({
        type: actionTypes.PRICEMIN,
        value: val
    })
};

export const setPriceMax = (val) => dispatch => {
    return dispatch({
        type: actionTypes.PRICEMAX,
        value: val
    })
};

export const setOrderBy = (val) => dispatch => {
    return dispatch({
        type: actionTypes.ORDERBY,
        value: val
    })
};

export const setSize = (val) => dispatch => {
    return dispatch({
        type: actionTypes.SIZE,
        value: val
    })
};



//设置数据
export const setDataList = (val) => dispatch => {
    return dispatch({
        type: actionTypes.LISTDATA,
        value: val
    })
};

// 产品列表
export function getProductListData(preload) {
   
    return (dispatch, getState) => {
        dispatch(setIfData(true));
        return axios.get(basicConfig.interfaceUrl + '/shop/item/list.do', {
            params: Object.assign({}, preload,{unLogin: true}) || {}
        })
        .then((res) => {
            if (res.data&&res.data.success) {
                dispatch(setDataList(res.data.data.list));
                dispatch(changeTotal(res.data.data.total));
                if(res.data.data.list.length==0) {
                    dispatch(setIfData(false));
                }else {
                    dispatch(setIfData(true));
                }
                
            }
        }).catch((error) => {

        });
    }
}
// 搜索列表数据
/*categoryId/itemName/orderby/start/size
 */
 export const setSearchIn = (val) => (dispatch, getState) => {
    dispatch({
        type: actionTypes.SEARCHIN,
        value: val
    })
    //if (!val) return;
    let preload = {
        categoryId: getState().products.categoryId,
        itemName: val,
        orderby: null,
        start: 0,
        size: getState().products.size
    }
    searchList(dispatch, getState,preload);
};

const searchList = (dispatch, getState,preload)=>{
    // return axios.get(basicConfig.interfaceUrl + '/shop/item/search.do', {
    //     params: Object.assign({}, preload,{unLogin: true})
    // })
    // .then((res) => {
    //     if (res && res.data && res.data.success) {
    //         dispatch(setDataList(res.data.data.list));
    //         dispatch(changeTotal(res.data.data.total));
    //         //dispatch(setSearchIn('')); //清空搜索条件
    //     }
    // }).catch((error) => {

    // });
}

export const searchProductListData = (preload)=>(dispatch, getState)=> {
    return searchList(dispatch, getState,preload);
}

//设置数据
export const setCatalogDataList = (val) => dispatch => {
    return dispatch({
        type: actionTypes.CATALOGLIST,
        value: val
    })
};

export const setcatalogListDataChoose = (val) => dispatch => {
    return dispatch({
        type: actionTypes.CATALOGLISTCHOOSE,
        value: val
    })
};

export const setIfData = (val) => dispatch => {
    return dispatch({
        type: actionTypes.NODATA,
        value: val
    })
};

// 获取列表数据
export function getProductCatalogListData(preload) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/category/list.do', {
                params: Object.assign({}, preload,{unLogin: true}) || {}
            })
            .then((res) => {
                if (res && res.data && res.data.success) {
                    function op(val) {
                        if (Object.prototype.toString.call(val) != '[object Array]') {
                            return val
                        } else {
                            for (let a of val) {
                                a.choose = false
                                a.title = a.name
                                a.label = a.name
                                a.value = a.name
                                op(a.subList)
                            }
                            return val
                        }
                    }
                    let q = op(res.data.data)
                    dispatch(setCatalogDataList(q));
                }
            }).catch((error) => {

            });
    }
}

//热销产品
/*
@params:
*shopId店铺ID
*categoryId商品分组ID
*start起始页码
*size
*/
export function getHotProducts(params) {
    return (dispatch, getState) => {
        return axios.get(basicConfig.interfaceUrl + '/shop/item/hot.do', {
            params: Object.assign({}, params,{unLogin: true})
        }).then((res) => {
            if (res && res.data && res.data.success) {
                return dispatch({
                    type: actionTypes.HOTPRODUCTS,
                    hotProducts: res.data.data.list||[]
                })
            }
        }).catch((error) => {
            console.log(error)
        });
    }
}