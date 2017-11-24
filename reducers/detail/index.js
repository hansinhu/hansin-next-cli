
export const actionTypes = {
    CHANGE_MAIN_IMG: 'CHANGE_MAIN_IMG',
    SET_DETAIL_DATA: 'SET_DETAIL_DATA',
    SET_SHOW_PRICE: 'SET_SHOW_PRICE',
    SET_SPEC_ITEM: 'SET_SPEC_ITEM',
    SET_SPEC_DATA: 'SET_SPEC_DATA',
    SET_GOODS_NUM: 'SET_GOODS_NUM',
    SET_SHARE_DATA: 'SET_SHARE_DATA',
    SET_MORE_DATA: 'SET_MORE_DATA',
    SET_COLLECT_STATUS: 'SET_COLLECT_STATUS',
    SET_COMMENT_LIST:'SET_COMMENT_LIST',
    SET_COMMENT_LIST_MOBILE:'SET_COMMENT_LIST_MOBILE',
};


export const detail = (state = {
    index: 0,
    detailData: {shopId:1},
    showPrice: { price: 0, oldPrice: 0, rate: 1},
    specItem: { inventory: null },
    specData: {activeIndex: [], specKeyVal: []},
    goodsNum: 1,
    shareData: {},
    moreData:[],
    collectStatus: false,
    commentList:{},
    commentListMobile:{},

}, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_MAIN_IMG:
            return Object.assign({}, state, {
                index: action.index
            });
        case actionTypes.SET_DETAIL_DATA:
            return Object.assign({}, state, {
                detailData: action.data
            });
        case actionTypes.SET_SHOW_PRICE:
            return Object.assign({}, state, {
                showPrice: action.price
            });
        case actionTypes.SET_SPEC_ITEM:
            return Object.assign({}, state, {
                specItem: action.specItem
            });
        case actionTypes.SET_SPEC_DATA:
            return Object.assign({}, state, {
                specData: action.specData
            });
        case actionTypes.SET_GOODS_NUM:
            return Object.assign({}, state, {
                goodsNum: action.goodsNum
            });
        case actionTypes.SET_SHARE_DATA:
            return Object.assign({}, state, {
                shareData: action.data
            });
        case actionTypes.SET_MORE_DATA:
            return Object.assign({}, state, {
                moreData: action.data
            });
        case actionTypes.SET_COLLECT_STATUS:
            return Object.assign({}, state, {
                collectStatus: action.data
            });
        case actionTypes.SET_COMMENT_LIST:
            return Object.assign({}, state, {
                commentList: action.data
            });
        case actionTypes.SET_COMMENT_LIST_MOBILE:
            return Object.assign({}, state, {
                commentListMobile: action.data
            });
        default:
            return state
    }
};