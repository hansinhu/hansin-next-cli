export const actionTypes = {
    PATHNAME : 'PATHNAME',
    REFERER : 'REFERER',
    DEVICE: 'DEVICE',
    SHOWCASE: 'SHOWCASE',
    SHOWCASELOADING: 'SHOWCASELOADING',
    INITDEVICE: 'INITDEVICE',
    LANGUAGE: 'LANGUAGE',
    SKIN: 'SKIN',
    COLOR: 'COLOR',
    SHOWMENU: 'SHOWMENU',
    IEBROWSER: 'IEBROWSER',
    ISMONITOR: 'ISMONITOR',
    COUPONDATA: 'COUPONDATA',
    SHOWCATALOGMENU: 'SHOWCATALOGMENU',
    SHAREFB: 'SHAREFB',
    KEYWORDS: 'KEYWORDS',
    DESCRIPTION: 'DESCRIPTION',
    SHOPID: 'SHOPID'
};

export const home = (state = {
    shopId: 0,
    shareFb: {
        shareUrl: '',
        shareImg: '',
        shareContent: ''
    },
    isIeBrowser: false,
    device: '',
    isFb: false,
    pathname : '',
    referer : '',
    initdevice: '',
    skin: '',
    color: '',
    showcase: [],
    showcaseLoading: true,
    language: 'en_US',
    showMenu: false,
    isMonitor: false,
    couponData: null,
    showCatalogMenu: false,
    keywords: 'from onloon china',
    description: 'from China Supplier or Manufacturer',
}, action) => {
    switch (action.type) {
        case actionTypes.SHOPID:
            return Object.assign({}, state, {
                shopId: action.shopId,
            });
        case actionTypes.SHAREFB:
            return Object.assign({}, state, {
                shareFb: action.shareFb,
            });
        case actionTypes.SHOWCATALOGMENU:
            return Object.assign({}, state, {
                showCatalogMenu: action.showCatalogMenu,
            });
        case actionTypes.PATHNAME:
            return Object.assign({}, state, {
                pathname: action.pathname,
            });
        case actionTypes.REFERER:
            return Object.assign({}, state, {
                referer: action.referer,
            });
        
        case actionTypes.ISMONITOR:
            return Object.assign({}, state, {
                isMonitor: action.isMonitor,
            });
        case actionTypes.SHOWMENU:
            return Object.assign({}, state, {
                showMenu: action.showMenu,
            });
        case actionTypes.LANGUAGE:
            return Object.assign({}, state, {
                language: action.language,
            });
        case actionTypes.IEBROWSER:
            return Object.assign({}, state, {
                isIeBrowser: action.ie
            });
        case actionTypes.DEVICE:
            return Object.assign({}, state, {
                device: action.device,
                isFb: action.isFb
            });
        case actionTypes.INITDEVICE:
            return Object.assign({}, state, {
                device: action.device,
                initdevice: action.device,
                isFb: action.isFb
            });
        case actionTypes.SHOWCASE:
            return Object.assign({}, state, {
                showcase: action.showcase
            });
        case actionTypes.SHOWCASELOADING:
            return Object.assign({}, state, {
                showcaseLoading: action.showcaseLoading
            });
        case actionTypes.SKIN:
            return Object.assign({}, state, {
                skin: action.skin
            });
        case actionTypes.COLOR:
            return Object.assign({}, state, {
                color: action.color
            });
        case actionTypes.COUPONDATA:
            return Object.assign({}, state, {
                couponData: action.couponData
            });
        case actionTypes.KEYWORDS:
            let words = action.keywords + ',' + state.keywords;
            return Object.assign({}, state, {
                keywords: words
            });
        case actionTypes.DESCRIPTION:
            let cription = action.description + ',' + state.description;
            return Object.assign({}, state, {
                description: cription
            });
        default:
            return state
    }
};