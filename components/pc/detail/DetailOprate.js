import React, {Component} from 'react'
import {bindActionCreators} from 'redux'
import {setShowPrice, setSpecItem, setSpecData, setGoodsNum, setShareData, shareLink, shareLogs, creatOrder, addToCard, setCollectStatus, collectGoods, cancelCollectGoods} from '../../../actions/detail/index'
import {getCarNum} from '../../../actions/headers/index'
import {connect} from 'react-redux'
import Router from 'next/router'
import {basicConfig} from '../../../static/js/config'
import {toDecimal2, checkLoginStatus, setToken, getCookie} from '../../../static/js/global'
import Score from './Score'
import Coupon from './Coupon'
import Specification from './Specification'

import InputNumber from 'antd/lib/input-number';
import Button from 'antd/lib/button';
import Icon from 'antd/lib/icon';
import Tooltip from 'antd/lib/tooltip';
import message from 'antd/lib/message';


class DetailOprate extends Component {
    constructor() {
        super();
        this.state = {
            buyLoading: false,
            cardLoading: false,
            collectNum: 0
        }
    }

    componentDidMount(){
        this.props.setShareData({shareUrl: window.location.href});
    }

    shareCode(name, share) {
        let data = this.props.detail.detailData;
        let sShareUrl = location.protocol + "//" + window.location.host + "/detail?itemId=" + Router.query.itemId; //
        let sShareImg = data.image;
        let sShareContent = data.name;

        if (name == 'facebook') {
            if (share) {
                this.props.shareLink({channel: 'FACEBOOK', fissionId: data.fissionId})
                    .then(res => {
                        if (res.data.success) {
                            window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(res.data.data) + "&t=" + Math.random(), 'sharer', 'toolbar=0,status=0,width=626,height=436');
                        }
                    }).catch((error) => {
                        console.log('error: shareLink',error)
                    });
            } else {
                this.props.shareLogs({channel: 'facebook', itemId: Router.query.itemId});
                window.open('http://www.facebook.com/sharer.php?u=' + encodeURIComponent(sShareUrl) + "&t=" + Math.random(), 'sharer', 'toolbar=0,status=0,width=626,height=436');
            }
        }
        if (name == 'twitter') {
            if (share) {
                this.props.shareLink({channel: 'TWITTER', fissionId: data.fissionId})
                    .then(res => {
                        if (res.data.success) {
                            window.open("http://twitter.com/home/?status=" + res.data.data, 'sharer', 'toolbar=0,status=0,width=626,height=436');
                        }
                    }).catch((error) => {
                        console.log('error: shareLink',error)
                    });
            } else {
                this.props.shareLogs({channel: 'twitter', itemId: Router.query.itemId});
                window.open("http://twitter.com/home/?status=" + sShareUrl, 'sharer', 'toolbar=0,status=0,width=626,height=436');
            }
        }
        if (name == 'pinterest') {
            if (share) {
                this.props.shareLink({channel: 'PINTEREST', fissionId: data.fissionId})
                    .then(res => {
                        if (res.data.success) {
                            window.open("https://www.pinterest.com/pin/create/extension/?spm=&url=" + encodeURIComponent(sShareUrl) + "&media=" + encodeURIComponent(res.data.data), 'sharer', 'toolbar=0,status=0,width=626,height=436');
                        }
                    }).catch((error) => {
                        console.log('error: shareLink',error)
                    });
            } else {
                this.props.shareLogs({channel: 'pinterest', itemId: Router.query.itemId});
                window.open("https://www.pinterest.com/pin/create/extension/?spm=&url=" + encodeURIComponent(sShareUrl) + "&media=" + encodeURIComponent(sShareImg), 'sharer', 'toolbar=0,status=0,width=626,height=436');
            }
        }
    }
    fenxiaoDialog(str) {
        if (!checkLoginStatus()) {
            setToken("t_back_url", window.location.href);
            window.location.href = basicConfig.oldUrl + '/account/login.html';
            return false
        }
        document.getElementById('dialogCover').style.display = str;
    }
    copyShareLink() {
        if(this.props.detail.shareData.shareUrl != window.location.href){
            document.getElementById("shareUrlVal").focus();
            document.getElementById("shareUrlVal").select();
            document.execCommand('Copy');
        }
        this.props.shareLink({
            channel: 'SYSTEM',
            fissionId: this.props.detail.detailData.fissionId
        }).then(res => {
            if (res.data.success && this.props.detail.shareData.shareUrl == window.location.href) { //
                this.props.setShareData({shareUrl: res.data.data});
                //document.getElementById("shareUrlVal").value = res.data.data;
                document.getElementById("shareUrlVal").focus();
                document.getElementById("shareUrlVal").select();
                document.execCommand('Copy');
            }
        }).catch((error) => {
            console.log('error: shareLink',error)
        })

    }

    buyNow() {
        let specList = this.props.detail.detailData.specList;
        //有规格，必须选择
        if(specList && specList.length > 0) {
            if(!this.props.detail.specItem.specKey) {
                message.warning("Please select the product specifications !");
                return false
            }
        }
        //数量大于0
        if (this.props.detail.goodsNum < 1) {
            message.warning("Quantity must be greater than 0 !");
            return false
        }

        //切换按钮状态
        this.setState({
            buyLoading: true
        })

        /*itemId specKey quantity*/
        this.props.creatOrder({
            itemId: Router.query.itemId,
            shopId: getCookie('shopId'),
            specId: this.props.detail.specItem.id || '0',
            quantity: this.props.detail.goodsNum,
            shareId: Router.query.shareId || ''
        })
        .then(res => {
            if (res.data.success) {
                window.location.href = basicConfig.oldUrl + "/orders/order-confirm.html?groupId=" + res.data.data + '&shareId=' + (Router.query.shareId || '');
            } else {
                this.setState({
                    buyLoading: false
                })
            }
        }).catch((error) => {
            console.log('error: creatOrder',error);
            this.setState({
                buyLoading: false
            })
        });
    }

    addToCart() {
        let specList = this.props.detail.detailData.specList;
        //有规格，必须选择
        if(specList && specList.length > 0) {
            if(!this.props.detail.specItem.specKey) {
                message.warning("Please select the product specifications !");
                return false
            }
        }
        //数量大于0
        if (this.props.detail.goodsNum < 1) {
            message.warning("Quantity must be greater than 0 !");
            return false
        }

        //切换按钮状态
        this.setState({
            cardLoading: true
        })

        /*itemId price specKey quantity*/
        this.props.addToCard({
            itemId: Router.query.itemId,
            price: this.props.detail.showPrice.price,
            specId: this.props.detail.specItem.id || '0',
            quantity: this.props.detail.goodsNum,
            shareId: Router.query.shareId || ''
        })
        .then(res => {
            if (res.data.success) {
                //更新购物车
                this.props.getCarNum();
                message.success('Add to cart successful !');
                this.setState({cardLoading: false})
            } else {
                this.setState({cardLoading: false})
            }
        }).catch((error) => {
            console.log('error: addToCard',error);
            this.setState({cardLoading: false})
        });

    }

    handleCollect(action) {
        if (action == 'add') {
            this.props.collectGoods({
                    itemId: Router.query.itemId
                })
                .then(res => {
                    if (res.data.success) {
                        this.props.setCollectStatus(true);
                        this.setState({
                            collectNum: this.state.collectNum + 1
                        });
                    }
                }).catch((error) => {

                });
        } else {
            this.props.cancelCollectGoods({
                    itemId: Router.query.itemId
                })
                .then(res => {
                    if (res.data.success) {
                        this.props.setCollectStatus(false);
                        this.setState({
                            collectNum: this.state.collectNum - 1
                        });
                    }
                }).catch((error) => {

                });
        }
    }

    handleGoodsNum(val){
        if(val > this.props.detail.specItem.inventory) {
            message.warning('sorrry ,no enough inventory');
            return false;
        }
        this.props.setGoodsNum(val)
    }

    render() {
        const {
            detail
        } = this.props;
        let data = detail.detailData;

        let price = null;
        let ratePrice = null;

        ratePrice = <div className="do-price">
            <span><em>$</em>{detail.showPrice.price}</span>
            <span className="do-price-old"><em>$</em>{detail.showPrice.oldPrice}</span>
            <span className="do-price-discount">{`-${(1-detail.showPrice.rate).toFixed(2)*100}%`}</span>
        </div>;

        price = <div className="do-price">
            <span><em>$</em>{detail.showPrice.price}</span>
        </div>;

        //收藏
        let collectIcon = null;
        !this.props.detail.collectStatus ? (collectIcon = <span onClick={()=>{this.handleCollect('add')}} className="add-wish"><Icon type="heart-o"/> Add to Wish List </span>) : (collectIcon = <span onClick={()=>{this.handleCollect('remove')}} className="add-wish"><Icon type="heart"/> collected </span>);

        //分销
        let fenxiao = null;
        let fenxiaoDialog = null;
        if (data.brokerage > 0) {
            fenxiao = <Tooltip className="fenxiao-btn-tip" placement="bottom" title={data.advertise}><Button className="sub-btn" onClick={()=>{this.fenxiaoDialog('block')}} size='large' style={{margin: '0 0 0 10px'}}><i className="icon iconfont icon-dollor"></i> GET US ${data.brokerage}</Button></Tooltip>;
            fenxiaoDialog = <div className="dialog-cover" id="dialogCover" >
                <div className="incomec-dialog">
                    <div className="incomec-dialog-title">
                        <span></span>
                        <Icon  onClick={()=>{this.fenxiaoDialog('none')}} type="close-circle-o" />
                    </div>
                    <div className="incomec-dialog-body" >
                        <h3 >GO TO GET <span >{`$${toDecimal2(data.brokerage)}`}</span></h3>
                        <div className="incomec-tips">{data.advertise}</div>
                        <dl className="clearfix_both">
                            <dt >Share</dt>
                            <dd className="share-item">
                                <span onClick={()=>{this.shareCode('facebook','share')}} className="social-sp social-facebook-icon"></span>
                                <span onClick={()=>{this.shareCode('twitter','share')}} className="social-sp social-twitter-icon"></span>
                                <span onClick={()=>{this.shareCode('pinterest','share')}} className="social-sp social-pinterest-icon"></span>
                            </dd>
                        </dl>
                        <p className="share-link"><input id="shareUrlVal" value={this.props.detail.shareData.shareUrl} readOnly></input><a onClick={()=>{this.copyShareLink()}}>&nbsp;&nbsp;Copy</a></p>
                    </div>
                </div>
            </div>
        }

        //无库存提示
        let tooltip = (detail.specItem.inventory || detail.specItem.inventory == null) ? null : <div className="out-tooltip"><Icon type="exclamation-circle-o"></Icon> THIS  PRODUCT IS NO LONGER IN STOCK !</div>;

        let btnDisable = detail.specItem.inventory > 0 ? false : true;

        return (
            <div className="do-wraper">
                <h3 className="do-title">{data.name || ''}</h3>
                {detail.showPrice.rate != 1 ? ratePrice : price}
                <Score comment={data.comment || {}} />
                <Coupon couponList={data.couponList || []}></Coupon>
                <div className="oprate-line"></div>

                <Specification detail={detail || {}} setGoodsNum={this.props.setGoodsNum} setSpecData={this.props.setSpecData} setSpecItem={this.props.setSpecItem} setShowPrice={this.props.setShowPrice}></Specification>

                {tooltip}
                <div className="do-oprate-con">
                    <InputNumber size="large" min={1} max={detail.specItem.inventory || 1} value={detail.goodsNum} defaultValue={1} precision={0} onChange={(value)=>{ this.handleGoodsNum(value) }} />
                    <Button onClick={()=>{this.addToCart()}} loading={this.state.cardLoading} className="add-to-card" type="primary" size='large' disabled={btnDisable}><Icon type="shopping-cart"></Icon>ADD TO CART</Button>
                    {fenxiao}
                    <Button onClick={()=>{this.buyNow()}} loading={this.state.buyLoading} className="sub-btn" size='large' disabled={btnDisable}>BUY NOW</Button>
                </div>

                <div className="">
                    {collectIcon}<span className="adds-count"> ({`${this.state.collectNum + (data.collectCount || 0)} Adds`})</span>
                </div>
                <div className="oprate-line"></div>
                <div className="share-con">
                    <span onClick={()=>{this.shareCode('facebook')}} className="social-sp social-facebook-icon"></span>
                    <span onClick={()=>{this.shareCode('twitter')}} className="social-sp social-twitter-icon"></span>
                    <span onClick={()=>{this.shareCode('pinterest')}} className="social-sp social-pinterest-icon"></span>
                    <span className="paypal-icon right-icon"></span>
                    <span className="visa-icon right-icon"></span>
                </div>

                {fenxiaoDialog}

            </div>
        )
    }
}
const mapStateToProps = ({
    detail
}) => ({
    detail
});

const mapDispatchToProps = (dispatch) => {
    return {
        setShowPrice: bindActionCreators(setShowPrice, dispatch),
        setSpecItem: bindActionCreators(setSpecItem, dispatch),
        setShareData: bindActionCreators(setShareData, dispatch),
        setSpecData: bindActionCreators(setSpecData, dispatch),
        setGoodsNum: bindActionCreators(setGoodsNum, dispatch),
        shareLink: bindActionCreators(shareLink, dispatch),
        shareLogs: bindActionCreators(shareLogs, dispatch),
        creatOrder: bindActionCreators(creatOrder, dispatch),
        addToCard: bindActionCreators(addToCard, dispatch),
        setCollectStatus: bindActionCreators(setCollectStatus, dispatch),
        collectGoods: bindActionCreators(collectGoods, dispatch),
        cancelCollectGoods: bindActionCreators(cancelCollectGoods, dispatch),
        getCarNum: bindActionCreators(getCarNum, dispatch),
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailOprate)