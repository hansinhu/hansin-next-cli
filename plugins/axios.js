/**
 * Created by zhulijun on 2017/7/11.
 */
import axios from 'axios'
import qs from 'qs';
import Message from 'antd/lib/message';
import Toast from 'antd-mobile/lib/toast';
import { getCookie ,removeToken , setToken, getStorageToken , getLastParam ,isLocalStorageSupported , browserRedirect ,getParam} from '../static/js/global';
import {basicConfig} from '../static/js/config'
import {setLoading} from '../actions/loading/index'
import {setShopId} from '../actions/home/index'
import Cookie from 'js-cookie'
import translate from '../static/js/i18n/translate'
var isNode = typeof window === 'undefined';   //判断是否服务端渲染
var count=0,countNum=0;

if(!isNode){
    if(!isLocalStorageSupported()){
        if(browserRedirect() == 'pc') {
            Message.error('Can not display the item, if your browser is using incognito browsing mode, please switch to normal mode, refresh retry');
        } else if(browserRedirect() == 'mobile') {
            Toast.info('Can not display the item, if your browser is using incognito browsing mode, please switch to normal mode, refresh retry', 5);
        }
    }else {
        //添加请求拦截器   (TODO:提示，如果非必须要登陆之后才能调用的接口需要加上请求参数unLogin: true)
        axios.interceptors.request.use((config) => {
            //配置请求参数
            config.timeout = '120000';
            config.headers['Content-Type'] = 'application/x-www-form-urlencoded';

            if (getLastParam(config.url) == '/send.do') {
                config.headers['Content-Type'] = 'multipart/form-data';
            }

            if(Cookie.get('shopId') && (Cookie.get('shopId') != localStorage.getItem('shopId'))) {  //解决服务端渲染时无法操作localStorage的解决办法
                let trueShopId= Cookie.get('shopId');
                removeToken('shopId');
                setToken('shopId',trueShopId);
            }

            let storeShopID = window.__NEXT_REDUX_STORE__.getState().home.shopId;
            if((storeShopID != 0) && (storeShopID != getCookie('shopId'))){  //防止在同个浏览器打开多个店铺时造成的shopId混淆（但只能做到页面切换之间不会混淆，如果刷新且url不带shopId就无法解决）
                removeToken('shopId');
                setToken('shopId',storeShopID);
            }

            if(localStorage.getItem('shouldUpdateShopId')){  //刷新页面时对shopId的操作
                let refreshShopId= localStorage.getItem('shouldUpdateShopId');
                removeToken('shopId');
                setToken('shopId',refreshShopId);
                localStorage.removeItem('shouldUpdateShopId');
            }

            let shopId = getCookie('shopId');
            window.__NEXT_REDUX_STORE__.dispatch(setShopId(shopId));   //走到这里的shopId肯定是正确的

            if(!shopId) {     //防止在safari在某些情况下在node端无法将shopId存进cookie的操作   TODO 有了上面的操作这段代码其实不是必要的
                shopId = getParam('shopId') || '';
                setToken('shopId',shopId);
            }

            let method = config.method;

            let token = getCookie('token');
            let tokenBefore = getCookie('tokenBefore');

            let host = location.host.split('.')[0];
            switch (method) {
                case 'get':
                    let params = config.params || {};
                    if(host == 'facebook' || host == 'mobile' || host == 'trade' || host == 'localhost:8030' || (shopId && shopId !='null')) {  //TODO
                        params['shopId'] = shopId;
                    }
                    if(params['unLogin']) {
                        if(token){
                            params['token'] = token;
                        }else {
                            params['token'] = tokenBefore;
                        }
                        delete params['unLogin'];
                    }else {
                        params['token'] = token;
                    }
                    if(params['unLoading']) {
                        countNum++;
                        delete params['unLoading'];
                    }
                    break;
                case 'post':
                    let data = config.data || {};
                    if(host == 'facebook' || host == 'mobile' || host == 'trade' || host == 'localhost:8030' || (shopId && shopId !='null')) {   //TODO
                        data['shopId'] = shopId;
                    }
                    if(data['unLogin']) {
                        if(token) {
                            data['token'] = token;
                        }else {
                            data['token'] = tokenBefore;
                        }
                        delete data['unLogin'];
                    }else {
                        data['token'] = token;
                    }
                    if(data['unLoading']) {
                        countNum++;
                        delete data['unLoading'];
                    }
                    if (config.headers['Content-Type'] != 'multipart/form-data') {
                        config.transformRequest = [function(data) {
                            data = qs.stringify(data);
                            return data;
                        }];
                    }
                    break;
            }
            //添加loading
            count++;
            if(count - countNum > 0){
                window.__NEXT_REDUX_STORE__.dispatch(setLoading(true));
            }
            return config;
        }, (error) => {
            window.__NEXT_REDUX_STORE__.dispatch(setLoading(false));
            return Promise.reject(error);
        });

        //添加响应拦截器
        axios.interceptors.response.use((response) => {
            if(response.status){
                count--;
            }
            if(count == 0){
                countNum = 0;
                window.__NEXT_REDUX_STORE__.dispatch(setLoading(false))
            }

            let device = window.__NEXT_REDUX_STORE__.getState().home.device;
            let isFb = window.__NEXT_REDUX_STORE__.getState().home.isFb;

            if (response.data && !response.data.success) {
                if (response.data.code == -2) {   //匿名用户
                    let url = (device == 'pc') ? basicConfig.oldUrl : ( isFb ? basicConfig.oldFbUrl : basicConfig.oldMobileUrl);
                    setToken("t_back_url", window.location.href);
                    window.location.href = url + '/account/login.html';
                }else{                            //匿名用户不需提示
                    if (device == 'pc') {
                        Message.error(response.data.mdetail ? translate[response.data.mdetail.name] : response.data.message);
                    } else if (device == 'mobile') {
                        Toast.info(response.data.mdetail ? translate[response.data.mdetail.name] : response.data.message, 1);
                    }
                }
            }

            //首次获取匿名token或者是用户手动清除缓存后需要再次去获取tokenBefore
            let headersBefore = JSON.stringify(response.headers);
            if(headersBefore.indexOf('set-storage')>-1){
                let headers = JSON.parse(headersBefore.replace(/set-storage/, "storage"));
                if(headers.storage && !localStorage.getItem('tokenBefore')){
                    setToken('tokenBefore',getStorageToken(headers.storage))
                }
            }

            return response;
        }, (error) => {
            let device = window.__NEXT_REDUX_STORE__.getState().home.device;
            let isFb = window.__NEXT_REDUX_STORE__.getState().home.isFb;
            window.__NEXT_REDUX_STORE__.dispatch(setLoading(false));
            if (error.response) {
                if(error.response.status == 401) {
                    let postUrl = getLastParam(error.response.config.url);
                    if(postUrl == '/removeCollect' || postUrl == '/addCollect' || postUrl == '/addCart' || postUrl == '/addOrderConfirmGroup' || postUrl == '/share' ) {
                        let url = (device == 'pc') ? basicConfig.oldUrl : ( isFb ? basicConfig.oldFbUrl : basicConfig.oldMobileUrl);
                        setToken("t_back_url", window.location.href);
                        window.location.href = url + '/account/login.html';
                    }else {
                        removeToken('token');
                        setToken('logined',0);
                        window.location.reload();
                    }
                } else if (error.response.status > 401) {
                    if (device == 'pc') {
                        Message.error('The interface address you requested does not exist');
                    } else if (device == 'mobile') {
                        Toast.info('The interface address you requested does not exist', 1);
                    }
                }
            }
            return Promise.reject(error); // 返回接口返回的错误信息
        });
    }
}

export default axios
