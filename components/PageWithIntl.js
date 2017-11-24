import React, {Component} from 'react'
import {IntlProvider, injectIntl} from 'react-intl'
// import initReactFastclick from 'react-fastclick';
import {browserType, ieBrowser, getCookie, setToken, getUserFromCookie ,removeToken} from '../static/js/global'

import {setNavIndex, setShowMobileLogo, setShowMenu  ,setShowSearch ,setBottomInfo} from '../actions/headers';
import {getIntDevice, setSkin, setColor, isIeBrowser , setPathname ,setReferer ,setShowCatalogMenu, setShareFb ,setKeywords, setDescription ,setShopId} from '../actions/home'
import browser from '../static/js/browser';
import NodeCookie from 'cookie'

import zh_CN from '../static/locales/zh_CN';
import en_US from '../static/locales/en_US';
//如果浏览器没有自带intl，则需要在使用npm安装intl之后添加如下代码
import intl from 'intl';
import fetch from 'isomorphic-fetch';
import {
    basicConfig
} from '../static/js/config'

export default (Page) => {
    const IntlPage = injectIntl(Page);
    return class PageWithIntl extends Component {
        static async getInitialProps({store, req, isServer, res, pathname, query, asPath}) {
            // initReactFastclick();
            //true 代表fb布局，false代表mobile布局
            if (browser.env(req).iPad) {
                store.dispatch(getIntDevice('mobile', true))
            }else if(browser.env(req).mobile){
                store.dispatch(getIntDevice('mobile', false))
            } else {
                //解决Fb-APP-mobile问题
                if (query.isFb) {
                    store.dispatch(getIntDevice('mobile', true))
                }else if(store.getState().home.device == ''){
                    store.dispatch(getIntDevice('pc', false))
                }
            }
            

            var referer = basicConfig.baseUrl;
            if(isServer){
                if(req.headers && req.headers.referer){
                    referer = req.headers.referer
                }else if(req.headers.host){
                    let ht = req.httpVersion >= 2 ? 'https://': 'http://';
                    referer = ht + req.headers.host
                }
            }


            store.dispatch(setPathname(pathname));
            store.dispatch(setReferer(referer));

            let type = query.type;
            if (isServer) {
                res.setHeader('Set-Cookie', NodeCookie.serialize('type', type, {
                    maxAge: 0
                }));
                res.setHeader('Set-Cookie', NodeCookie.serialize('type', type));
            } else {
                setToken('type', type)
            }

            //隐藏菜单和搜索框和分类框 移动端
            store.dispatch(setShowMenu(false));
            store.dispatch(setShowSearch(false));
            store.dispatch(setShowCatalogMenu(false));

            //检测参数或者cookie是否有shopId,没有则跳转官网（商品详情页除外）
            let shopId = query.shopId || '';
            let itemId = query.itemId;
            if (shopId && shopId != 'undefined') {
                if (isServer) {
                    res.setHeader('Set-Cookie', NodeCookie.serialize('shopId', shopId, {
                        maxAge: 0
                    }));
                    res.setHeader('Set-Cookie', NodeCookie.serialize('shopId', shopId));
                } else {
                    removeToken('shopId');
                    setToken('shopId', shopId)
                }
                store.dispatch(setShopId(shopId));
            }

            let shopIdCookie = isServer ? getUserFromCookie(req, 'shopId') : getCookie('shopId');
            if ((!shopIdCookie && !shopId && !itemId) || shopId == 'null') {
                if (isServer) {
                    let host = req.headers.host;
                    if(host.split('.')[0] == 'facebook' || host.split('.')[0] == 'mobile' || host.split('.')[0] == 'trade') {
                        res.writeHead(302, {
                            Location: 'http://www.onloon.net/'
                        });
                        res.end();
                        res.finished = true
                    }

                } else {
                    let host = location.host;
                    if(host.split('.')[0] == 'facebook' || host.split('.')[0] == 'mobile' || host.split('.')[0] == 'trade') {
                        window.location.href = 'http://www.onloon.net/'
                    }
                }
            }

            if (isServer) {
                let host = req.headers.host;
                //判断 facebook mobile 二级域名
                if(req.headers.host == 'facebook.onloon.net') {
                    //解决Fb-APP-mobile问题
                    if (browser.env(req).iPad) {
                        store.dispatch(getIntDevice('mobile', true))
                    }else if (browser.env(req).mobile) {
                        store.dispatch(getIntDevice('mobile', false))
                    } else {
                        store.dispatch(getIntDevice('mobile', true))
                    }
                }
                if(req.headers.host == 'mobile.onloon.net') {
                    store.dispatch(getIntDevice('mobile', false))
                }
                //根据详情页面获取shopId
                let cookieFetch;
                if(itemId) {
                    await fetch((parseInt(req.httpVersion) >= 2 ? 'https://': 'http://') + host  + '/api/shop/item/detail.do?itemId=' + itemId).then(function(response) {
                        return response.json();
                    }).then(function(json) {
                        if (json.success && json.data) {
                            cookieFetch = json.data.shopId;
                            store.dispatch(setShopId(cookieFetch));
                            res.setHeader('Set-Cookie', NodeCookie.serialize('shopId', cookieFetch, {
                                maxAge: 0
                            }));
                            res.setHeader('Set-Cookie', NodeCookie.serialize('shopId', cookieFetch));
                            let arr = {
                                shareUrl: (parseInt(req.httpVersion) >= 2 ? 'https://': 'http://') + host + '/detail?itemId=' + itemId,
                                shareImg: json.data.image,
                                shareContent: json.data.name
                            };
                            store.dispatch(setShareFb(arr));
                            store.dispatch(setKeywords(json.data.name));
                            store.dispatch(setDescription(json.data.name));
                        }else {
                            if (shopId || shopIdCookie) {
                                cookieFetch = shopId || shopIdCookie || '';
                            }else {
                                let bottomInfo = {
                                    logo: '',
                                    shopExtInfo: {},
                                    name: ''
                                };
                                store.dispatch(setBottomInfo(bottomInfo));
                            }
                        }
                    }).catch(function(e) {
                        store.dispatch(setSkin('default'));
                        store.dispatch(setColor('black'));
                    });
                }else if (shopId || shopIdCookie) {
                    cookieFetch = shopId || shopIdCookie || '';
                }

                //获取主题信息
                await fetch((parseInt(req.httpVersion) >= 2 ? 'https://': 'http://') + host  + '/api/shop/theme/get.do' + (cookieFetch?'?shopId='+cookieFetch:'')).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    if(json.success && json.data){
                        let skin;
                        if (json.data.theme) {
                            skin = json.data.theme;
                        }else {
                            skin = "default";
                        }
                        store.dispatch(setSkin(skin));

                        let color;
                        if (json.data.color) {
                            color = json.data.color;
                        } else {
                            color = "black";
                        }
                        store.dispatch(setColor(color));
                    }else{
                        store.dispatch(setSkin("default"));
                        store.dispatch(setColor("black"));
                    }
                }).catch(function(e) {
                    store.dispatch(setSkin('default'));
                    store.dispatch(setColor('black'));
                });

                //获取店铺装修信息
                await fetch((parseInt(req.httpVersion) >= 2 ? 'https://': 'http://') + host  +  '/api/shop/company/support' + (cookieFetch?'?shopId='+cookieFetch:'')).then(function(response) {
                    return response.json();
                }).then(function(json) {
                    if(json.success && json.data){
                        if(json.data.name){
                            store.dispatch(setKeywords(json.data.name));
                            store.dispatch(setDescription(json.data.name));
                        }
                        store.dispatch(setBottomInfo(json.data));
                    }else {
                        let bottomInfo = {
                            logo: '',
                            shopExtInfo: {},
                            name: ''
                        };
                        store.dispatch(setBottomInfo(bottomInfo));
                    }

                }).catch(function(e) {
                    let bottomInfo = {
                        logo: '',
                        shopExtInfo: {},
                        name: ''
                    };
                    store.dispatch(setBottomInfo(bottomInfo));
                });


                //对IE9及以下的浏览器的处理
                if (ieBrowser(req.headers['user-agent'])) {
                    store.dispatch(isIeBrowser(true));
                }

                if (pathname != '/belowIE9' && browserType(req.headers['user-agent'])) {
                    res.writeHead(302, {
                        Location: '/belowIE9'
                    });
                    res.end();
                    res.finished = true
                }
                if (pathname == '/belowIE9' && !browserType(req.headers['user-agent'])) {
                    res.writeHead(302, {
                        Location: '/'
                    });
                    res.end();
                    res.finished = true
                }
            }

            /* 锁定nav */
            switch (pathname) {
                case '/':
                    store.dispatch(setNavIndex('0'));
                    break;
                case '/products':
                    if(query.type) {
                        switch (query.type) {
                            case 'top':
                                store.dispatch(setNavIndex('3'));
                                break;
                            case 'new':
                                store.dispatch(setNavIndex('4'));
                                break;
                        }
                    }else if(query.categoryId) {
                        store.dispatch(setNavIndex(query.categoryId));
                    }else {
                        store.dispatch(setNavIndex('1'));
                    }
                    break;
                case '/company':
                    store.dispatch(setNavIndex('5'));
                    break;
                case '/contact':
                    store.dispatch(setNavIndex('6'));
                    break;
                default:
                    store.dispatch(setNavIndex('7'));
            }

            //移动端除了首页都不显示logo
            if (pathname == '/' || pathname == '/products') {
                store.dispatch(setShowMobileLogo(true));
            } else {
                store.dispatch(setShowMobileLogo(false));
            }
            return query
        }

        chooseLocale() {
            let language = this.props.home.language;
            switch (language) {
                case 'en_US':
                    return en_US;
                case 'zh_CN':
                    return zh_CN;
                default:
                    return en_US;
            }
        }


        render() {
            const {...props
            } = this.props;
            return (
                <IntlProvider locale={'en'} messages={this.chooseLocale()}>
                    <IntlPage {...props} />
                </IntlProvider>
            )
        }
    }
}