export const actionTypes = {
    TYPE: 'TYPE',
    CURRENTPAGE: 'CURRENTPAGE',
    TOTAL: 'TOTAL',
    LISTDATA: 'LISTDATA',
    CATEGORYID: 'CATEGORYID',
    PRICEMIN: 'PRICEMIN',
    PRICEMAX: 'PRICEMAX',
    ORDERBY: 'ORDERBY',
    SIZE: 'SIZE',
    CATALOGLIST: 'CATALOGLIST',
    SEARCHIN: 'SEARCHIN',
    CATALOGLISTCHOOSE: 'CATALOGLISTCHOOSE',
    HOTPRODUCTS: 'HOTPRODUCTS',
    NODATA: 'NODATA'
};

export const products = (state = {
    listType: 1, //列表展示网格1或列表2
    currentPage: 1, //当前页码,分页开始行，0开始
    total: 0, //总页数
    size: 16, //每页产品数
    listDate: [], //列表数据
    categoryId: null, //分组ID，多选，多个逗号隔开
    priceMin: null, //价格区间，最小值
    priceMax: null, //价格区间，最大值
    orderby: 'salesHigh', //排序方式：("salesHigh","销量由高到低"),("saleLow","销量由低到高"),("newest","最新上传"),("priceHigh","价格高到低"),("priceLow","价格低到高"),("storeHigh","库存高到底"),("storeLow","库存低到高")
    catalogListData: [], //catalog列表数据
    catalogListDataChoose: [
        [],
        []
    ], //空没选择，0123代表点击了二级列表，分别代表点击的第几个
    searchIn: '', //是否从搜索页到列表页,空不是，非空即搜索条件
    hotProducts: [],//热销产品列表
    noData: true//true有数据
}, action) => {
    switch (action.type) {
        case actionTypes.HOTPRODUCTS:
            return Object.assign({}, state, {
                hotProducts: action.hotProducts
            });
        case actionTypes.TYPE:
            return Object.assign({}, state, {
                listType: action.listType,
            });
        case actionTypes.CURRENTPAGE:
            return Object.assign({}, state, {
                currentPage: action.value,
            });
        case actionTypes.TOTAL:
            return Object.assign({}, state, {
                total: action.value,
            });
        case actionTypes.LISTDATA:
            return Object.assign({}, state, {
                listDate: action.value,
            });
        case actionTypes.CATEGORYID:
            return Object.assign({}, state, {
                categoryId: action.value,
            });
        case actionTypes.PRICEMIN:
            return Object.assign({}, state, {
                priceMin: action.value,
            });
        case actionTypes.PRICEMAX:
            return Object.assign({}, state, {
                priceMax: action.value,
            });
        case actionTypes.ORDERBY:
            return Object.assign({}, state, {
                orderby: action.value,
            });
        case actionTypes.SIZE:
            return Object.assign({}, state, {
                size: action.value,
            });
        case actionTypes.CATALOGLIST:
            return Object.assign({}, state, {
                catalogListData: action.value,
            });
        case actionTypes.CATALOGLISTCHOOSE:
            return Object.assign({}, state, {
                catalogListDataChoose: action.value,
            });
        case actionTypes.SEARCHIN:
            return Object.assign({}, state, {
                searchIn: action.value,
            });
        case actionTypes.NODATA:
            return Object.assign({}, state, {
                noData: action.value,
            });
        default:
            return state
    }
};