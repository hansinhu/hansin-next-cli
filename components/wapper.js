import React, {
    Component
} from 'react';
import _Footer from '../components/footer';
import _Header from '../components/header';
import Loading from '../components/Loading';
import Router from 'next/router'
import {getCookie , getParam} from '../static/js/global'
import {addStatistic} from '../actions/user-behavior-statistic/index'
const Wapper = WrappedComponent => {

    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                sentWidth: null,
                newTime: null
            }
        }

        bufferDate = (widths) => {
            this.sentWidth = widths;
            this.newTime = new Date()
        };

        getDeviceWidth = () => {
            let widths = window.innerWidth;
            this.bufferDate(widths);
            if (widths <= 1400) {
                this.props.setMonitor(false);
            } else{
                this.props.setMonitor(true);
            }
        };
        
        //路由跳转加上shopId TODO 没必要，多家店铺之间会混淆
        // componentWillReceiveProps(nextProps) {
        //     const { pathname, query } = nextProps.url;
        //     let shopId = this.props.home.shopId || getCookie('shopId') || '';
        //     if(shopId && !query.shopId && pathname != '/detail'){
        //         query.shopId = shopId;
        //         Router.push({
        //             pathname: pathname,
        //             query: query
        //         })
        //     }
        // }

        componentDidMount() {
            if (this.props.home.initdevice != 'mobile') {
                this.getDeviceWidth();
                window.addEventListener('resize', () => {
                    let n = Date.parse(new Date());
                    let o = Date.parse(this.newTime);
                    if (n - o > 100) {
                        this.getDeviceWidth()
                    }
                });
            }


            let shopId = getCookie('shopId') || '';
            //shopId、token、uuid、from、webUrl、type=1 详情 0 其他、goodsId、duration、otherInfo、request
            if(this.props.home.pathname === '/detail'){
                this.duration = +new Date();
                this.itemId = getParam('itemId')
            }

            let uuid = getCookie('uuid') || 'LOONXIB2C';
            if(shopId && this.props.home.referer){
                window.__NEXT_REDUX_STORE__.dispatch(addStatistic({
                    shopId : shopId,
                    opType : 1,
                    clientType : this.props.home.isFb ? 1 : this.props.home.device === 'pc' ? 0 : 2 ,
                    uuid : uuid,
                    from : this.props.home.referer || '',
                    webUrl : this.props.home.pathname || '/',
                    type : this.props.home.pathname === '/detail' ? 1 : 0,
                    goodsId : this.itemId || '',
                    request : '',
                    unLogin: true,    //勿删，需要加上这个字段才会加上token
                    unLoading: true  //该接口不需要loading
                }))
            }
        }

        componentWillUnmount(){
            if(this.duration && this.itemId){
                let shopId = getCookie('shopId') || '';

                let uuid = getCookie('uuid') || 'LOONXIB2C';
                if(shopId && this.props.home.referer){
                    window.__NEXT_REDUX_STORE__.dispatch(addStatistic({
                        shopId : shopId,
                        opType : 2,
                        clientType : this.props.home.isFb ? 1 : this.props.home.device === 'pc' ? 0 :2 ,
                        uuid : uuid,
                        from : this.props.home.referer || '',
                        webUrl : this.props.home.pathname || '/',
                        type : 1,
                        goodsId : this.itemId || '',
                        duration : +new Date() - this.duration,
                        request : '',
                        unLogin: true,    //勿删，需要加上这个字段才会加上token
                        unLoading: true   //该接口不需要loading
                    }))
                }

            }
        }

        render() {
            const {
                home
            } = this.props;
            const skin = this.props.home.skin;
            const color = this.props.home.color;
            return (
                <div className={`${skin}-module ${skin}-${color}`}>
                    <_Header />
                    <div className="main-content"  style={ (home.showMenu || home.showCatalogMenu) ? {position:'fixed',top:0,left:0,right:0,bottom:0} : {}} >
                        <WrappedComponent {...this.props}/>
                    </div>
                    <_Footer />
                    <Loading />
                </div>
            )
        }
    }
}

export default Wapper;