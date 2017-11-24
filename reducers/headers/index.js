export const actionTypes = {
    FOOTERINFO: 'FOOTERINFO',
    NAVINDEX: 'NAVINDEX',
    MENULIST: 'MENULIST',
    SHOWSEARCH: 'SHOWSEARCH',
    SHOWMENU: 'SHOWMENU',
    SHOWMOBILELOGO: 'SHOWMOBILELOGO',
    CARNUM: 'CARNUM',
    USERINFO: 'USERINFO',
    BOTTOMINFO: 'BOTTOMINFO',
    SHOWCASE : 'SHOWCASE',
    ISLOGINED: 'ISLOGINED',
    SET_SHOP_INFO: 'SET_SHOP_INFO',
    FETCHMENU: 'FETCHMENU'
};

export const headers = (state = {
    fetchMenu: true,
    isLogined: false,
    bottomInfo: {
        logo: '',
        shopExtInfo: {},
        name: ''},
    footerInfo: {},
    showcaseList:[],
    navIndex: '0',
    menuList: [],
    showSearch: false,
    showMenu: false,
    showMobileLogo: false,
    carNum: '',
    userInfo: {},
    shopInfo: {}
}, action) => {
    switch (action.type) {
        case actionTypes.FETCHMENU:
            return Object.assign({}, state, {
                fetchMenu: action.fetchMenu,
            });
        case actionTypes.ISLOGINED:
            return Object.assign({}, state, {
                isLogined: action.isLogined,
            });
        case actionTypes.SHOWCASE:
            return Object.assign({}, state, {
                showcaseList:  action.showcaseList
            });    
        case actionTypes.BOTTOMINFO:
            return Object.assign({}, state, {
                bottomInfo: action.bottomInfo,
            });
        case actionTypes.USERINFO:
            return Object.assign({}, state, {
                userInfo: action.userInfo,
            });
        case actionTypes.FOOTERINFO:
            return Object.assign({}, state, {
                footerInfo: action.footerInfo,
            });
        case actionTypes.NAVINDEX:
            return Object.assign({}, state, {
                navIndex: action.navIndex,
            });
        case actionTypes.MENULIST:
            return Object.assign({}, state, {
                menuList: action.menuList,
            });
        case actionTypes.SHOWSEARCH:
            return Object.assign({}, state, {
                showSearch: action.showSearch,
            });
        case actionTypes.SHOWMENU:
            return Object.assign({}, state, {
                showMenu: action.showMenu,
            });
        case actionTypes.SHOWMOBILELOGO:
            return Object.assign({}, state, {
                showMobileLogo: action.showMobileLogo,
            });
        case actionTypes.CARNUM:
            return Object.assign({}, state, {
                carNum: action.carNum,
            });
        case actionTypes.SET_SHOP_INFO:
            return Object.assign({}, state, {
                shopInfo: action.data
            });
        default:
            return state
    }
};