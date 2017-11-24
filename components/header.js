/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Router from 'next/router'
import dynamic from 'next/dynamic'

import { getShopInfo, setShopInfo, getFBHomePage ,getShopDetail ,getShopTheme} from '../actions/headers/index'
import { setShopId } from '../actions/home/index'
import { setToken , getCookie} from '../static/js/global'
import {basicConfig} from '../static/js/config'
import Cookie from 'js-cookie'

const HeaderMobile = dynamic(
    import ('./mobile/header/header'));
const HeaderTemplate1 = dynamic(
    import ('./pc/header/header-template1/header'));
const HeaderTemplate2 = dynamic(
    import ('./pc/header/header-template2/header'));
const HeaderTemplate3 = dynamic(
    import ('./pc/header/header-template3/header'));
const HeaderTemplate4 = dynamic(
    import ('./pc/header/header-template4/header'));
const HeaderTemplate5 = dynamic(
    import ('./pc/header/header-template5/header'));
const HeaderTemplate6 = dynamic(
    import ('./pc/header/header-template6/header'));
const HeaderTemplatetToy = dynamic(
    import ('./pc/header/header-template-toy/header'));
const HeaderTemplateBaby = dynamic(
    import ('./pc/header/header-template-baby/header'));
const HeaderTemplateHardware = dynamic(
    import ('./pc/header/header-template-hardware/header'));


class _Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageId: null
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        const moveProcessPropsNow = Object.assign({},
            {shopId: this.props.home.shopId},
            {skin: this.props.home.skin},
            {color: this.props.home.color}
        );
        const moveProcessPropsNext = Object.assign({},
            {shopId: nextProps.home.shopId},
            {skin: nextProps.home.skin},
            {color: nextProps.home.color}
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    componentDidMount() {
        if(this.props.home.shopId != 0) {    //防止在第一次刷新store中的shopId无变化时也不调用这个方法
            this.handlePageRefresh();
        }
        if (Cookie.get('shouldUpdateShopId')) {
            this.props.getShopTheme();
            this.props.getShopDetail();
            Cookie.remove('shouldUpdateShopId');
        }

        if(Router.pathname == '/' || Router.pathname == '/detail' || Router.pathname == '/products') {
            if(this.props.headers.shopInfo.shopId) {
                this.handleTraceEvent()
            }else {
                this.props.getShopInfo()   //二级域名不需要shopId
                    .then((res)=>{
                        if(res.data.success) {
                            this.props.setShopInfo(res.data.data);
                            res.data.data && setToken('shopId', res.data.data.shopId);
                            if(res.data.data.messageDisplay){
                                //fb message
                                if(this.props.home.device == 'pc') {
                                    this.props.getFBHomePage().then(res => {
                                        if(res.data.data && res.data.data.pageId) {
                                            this.handleFBMessage(res.data.data)
                                        }
                                    }).catch((error) => {
                                        console.log('error: getFBHomePage',error)
                                    });
                                }
                            }
                            this.handleTraceEvent()
                        }
                    }).catch((error) => {
                    console.log('error: getShopInfo',error)
                });
            }
            if(Router.query.isFb) {
                document.querySelector('body').classList.add('fb')
            }
        }

        //sw
        /*if(typeof window != 'undefined' ){ //&& window.location.protocol == 'https:'
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker
                    .register('/service-worker.js')
                    .then(registration => {
                        console.log('service worker registration successful')
                    })
                    .catch(err => {
                        console.warn('service worker registration failed', err.message)
                    })
            }
        }*/
    }
    componentDidUpdate() {
        this.handlePageRefresh();   //TODO 在这里shopId会由之前的0变成请求时加上的shopId,在这里可以进行进一步操作
    }
    handlePageRefresh() {
        let storeShopId = this.props.home.shopId;
        let script = document.createElement('script');
        script.innerHTML = `window.onunload = function() {
                                var localShopId = localStorage.getItem('shopId')
                                if(localShopId != ${storeShopId}){
                                    localStorage.setItem('shouldUpdateShopId',${storeShopId})
                                    document.cookie = 'shouldUpdateShopId=true'
                                }
                             };`;
        document.body.appendChild(script);
    }

    handleTraceEvent(){
        let shopInfo = this.props.headers.shopInfo;
        //fp埋点
        if(shopInfo.facebookCode){
            let script = document.createElement('script');
            script.innerHTML = `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
                n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
                t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
                document,'script','https://connect.facebook.net/en_US/fbevents.js');`;
            document.body.appendChild(script);
            let queryTime = null;
            let queryCount = 3;
            queryTime = setInterval(function(){
                queryCount--;
                if(fbq){
                    fbq('init', shopInfo.facebookCode); // Insert your pixel ID here.
                    fbq('track', 'PageView');
                    let fpimg = document.createElement('img');
                    fpimg.src = "https://www.facebook.com/tr?id="+shopInfo.facebookCode+"&ev=PageView&noscript=1";
                    fpimg.height = 1;
                    fpimg.width = 1;
                    fpimg.style.display = 'none';
                    let noscript = document.createElement('noscript');
                    noscript.appendChild(fpimg);
                    document.body.appendChild(noscript);
                    clearInterval(queryTime)
                }else if(queryCount<0){
                    clearInterval(queryTime)
                }
            },2000);
        }
        //ga埋点
        if(shopInfo.googleCode){
            let script = document.createElement('script');
            script.innerHTML = `(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
              (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
              m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
              })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');`;
            document.body.appendChild(script);

            let queryTime = null;
            let queryCount = 3;
            queryTime = setInterval(function(){
                queryCount--;
                if(ga){
                    ga('create', shopInfo.googleCode, 'auto');
                    ga('send', 'pageview');
                    clearInterval(queryTime)
                }else if(queryCount<0){
                    clearInterval(queryTime)
                }
            },2000);
        }
    }

    handleFBMessage(data){
        this.setState({
            pageId: data.pageId
        });
        let script = document.createElement('script');
        script.innerHTML = `window.fbAsyncInit = function() {
                    FB.init({
                        appId: ${basicConfig.appId},
                        xfbml: true,
                        version: "v2.6"
                    });
                };
                
                (function(d, s, id){
                    var js, fjs = d.getElementsByTagName(s)[0];
                    if (d.getElementById(id)) { return; }
                    js = d.createElement(s); js.id = id;
                    js.src = "//connect.facebook.net/en_US/sdk.js";
                    fjs.parentNode.insertBefore(js, fjs);
                }(document, 'script', 'facebook-jssdk'));`;
        document.body.appendChild(script);
    }

    render() {
        const {home} = this.props;
        let fbMessage = <div className="fb-messengermessageus"
                             data-messenger_app_id={basicConfig.appId}
                             data-page_id={this.state.pageId}
                             data-color="blue"
                             data-size="standard" >
        </div>;

        return (
            <div id="header">
                {home.device === 'pc' ? 
                    <div id="pHeader" className="pHeader">
                        {this.renderHeader(home)}
                        {fbMessage}
                    </div> :
                    (home.device === 'mobile'?
                        <div id="mHeader" className="mHeader">
                            <HeaderMobile />
                        </div>:null)
                }
            </div>
        )
    }

    renderHeader(home) {
        if (home.skin == 'default') {
            return (
                <HeaderTemplate1 />
            )
        } else if (home.skin == 'male') {
            return (
                <HeaderTemplate2 />
            )
        } else if (home.skin == 'c3') {
            return (
                <HeaderTemplate3 />
            )
        } else if (home.skin == 'luggage') {
            return (
                <HeaderTemplate4 />
            )
        } else if (home.skin == 'female') {
            return (
                <HeaderTemplate5 />
            )
        } else if (home.skin == 'jewelry') {
            return (
                <HeaderTemplate6 />
            )
        } else if (home.skin == 'toy') {
            return (
                <HeaderTemplatetToy />
            )
        } else if (home.skin == 'baby') {
            return (
                <HeaderTemplateBaby />
            )
        } else if (home.skin == 'hardware') {
            return (
                <HeaderTemplateHardware />
            )
        } else {
            return (
                <HeaderTemplate1 />
            )
        }
    }
}

const mapStateToProps = ({
    home,
    headers
}) => ({
    home,
    headers
});

const mapDispatchToProps = (dispatch) => {
    return {
        getShopInfo: bindActionCreators(getShopInfo, dispatch),
        setShopInfo: bindActionCreators(setShopInfo, dispatch),
        getFBHomePage: bindActionCreators(getFBHomePage, dispatch),
        setShopId: bindActionCreators(setShopId, dispatch),
        getShopDetail: bindActionCreators(getShopDetail, dispatch),
        getShopTheme: bindActionCreators(getShopTheme, dispatch)
    }
};


export default connect(mapStateToProps,mapDispatchToProps)(_Header)