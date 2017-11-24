/**
 * Created by hansin on 2017/8/26.
 */
import React, {
    Component
} from 'react';
import Cookie from 'js-cookie';

import {
    basicConfig
} from '../../../static/js/config'
import {getDate} from '../../../static/js/global';
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';
import Message from 'antd/lib/message';


class ActiveModal extends Component {

    state = {
        show: true,
        tipsTitle: 'New User Coupons',
        received: false,
        oldLongin: false
    }

    //关闭弹框，设置周期为一天
    closeModal = () =>{
        this.setState({
            show: false
        })
        Cookie.set("activetime", "1",{ expires: 1, path: '' });
    }

    showModal = () =>{
        this.setState({
            show: true
        })
    }

    //领取
    receiveAction = () =>{
        let noCount  = true;
        let couponShopDetailVOList = this.props.couponData.couponShopDetailVOList
        for(let j = 0; j<couponShopDetailVOList.length;  j++){
            if(couponShopDetailVOList[j].lastCount>0){
                noCount = false;
            }
        }
        if(this.props.couponData.received){
            this.setState({
                oldLongin: true
            })
        }else if(this.state.received ||noCount){
            this.setState({
                show: false
            })
        }else{
            this.props.receiveCoupon({couponShopId:this.props.couponData.id})
                .then((res)=>{
                    if(res.data&&res.data.success){
                        this.setState({
                            tipsTitle: 'Received Success',
                            received: true
                        })
                        Message.success('Received Success')
                    }else{
                        if(res.data.code != -2){
                            this.setState({
                                tipsTitle: res.data.message
                            })
                        }
                    }
                })
        }
    }

    componentDidMount(){
        let activetime =  Cookie.get("activetime");
        if(activetime) {
            this.setState({
                show: false
            })
        }
        if(!this.props.couponData){
            this.props.getCouponList()
        }
    }
//&& !this.props.couponData.received

    render() {
        var noCount  = true;
        if(this.props.couponData && this.props.couponData.couponShopDetailVOList ){
            for(var j = 0; j<this.props.couponData.couponShopDetailVOList.length;  j++){
                if(this.props.couponData.couponShopDetailVOList[j].lastCount>0){
                    noCount = false;
                }
            }
        }

        if(this.props.couponData && this.props.couponData.couponShopDetailVOList && !this.props.couponData.received && !noCount && !this.state.oldLongin ){
            const {couponShopDetailVOList,name,startTime,endTime,received} = this.props.couponData;

            const showStyle = {
                width: 400,
                display: "block"
            }
            const hiddenStyle = {
                width: "0",
                height: "0",
                display: "none"
            }
            const iconStyle = {
                fontSize:18,
                float:"right",
                cursor:"pointer",
            }
            return (
                <div>
                  <div className="active-modal-cover" style={this.state.show?showStyle:hiddenStyle}>
                    <div className="pro-modal" style={{opacity:this.state.show?'1':'0'}}>
                      <div style={{height: 40}}>
                        <Icon
                            onClick={this.closeModal}
                            className="modal-close"
                            type="close"
                            style={iconStyle}/>
                        <h2 className="modal-pro-title">
                            {noCount?<span> No More</span>:
                                <span>{(this.state.received)?'Success':(received?'Only new users can get it':this.state.tipsTitle)}</span>}
                        </h2>
                      </div>
                      <div className="card-box">
                          {
                              couponShopDetailVOList.map((n,i)=>{
                                  return (<div key={i} className={(this.state.received||received||n.lastCount == 0)?'is-disable card-content':'is-active card-content'}>
                                    <p className="card-name">{n.name}</p>
                                    <p className="more-money">${n.conditionMoney} or more available</p>
                                    <p className="discount-money">US${n.couponMoney}</p>
                                      {/*<p className="discount-time"><Icon type="clock-circle" />{` ${getDate(new Date(startTime))}--${getDate(new Date(endTime))}`}</p>*/}
                                  </div>)
                              })
                          }
                      </div>
                      <div className="modal-footer">
                        <div onClick={this.receiveAction} className="coupon-btn" >{(this.state.received||received||noCount)?'OK':'Receive'}</div>
                      </div>
                    </div>
                  </div>
                  <div className="coupon-btn-bottom" onClick={this.showModal} style={{display:this.state.show?'none':'block'}}> <Icon type="tag-o" /> Get DisCount</div>
                </div>

            )
        }else{
            return null
        }
    }
}


export default ActiveModal