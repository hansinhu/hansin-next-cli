import React, {
    Component
} from 'react'

var _menu = require('antd/lib/menu');
var _dropdown = require('antd/lib/dropdown');
var _icon = require('antd/lib/icon');

class Coupon extends Component {

    handleCoupon(item) {
        let str = '';
        str += 'Buy $' + item.over;
        item.money ? str += ', Get $' + item.money + ' Free' : false;
        item.freePost ? str += ', Get Free Post' : false;
        return str;
    }

    render() {
        let zhekou = {
            display: 'inline-block',
            margin: '0 5px 0 0'
        };
        let coupon = null;
        if (this.props.couponList && this.props.couponList.length == 1) {
            coupon = <div>
                <i className="icon iconfont icon-zhekou"></i><span> {this.handleCoupon(this.props.couponList[0])}</span>
            </div>
        } else if (this.props.couponList && this.props.couponList.length > 1) {
            let menu = (
                <_menu>{
                    this.props.couponList.map((item,index) => (
                        <_menu.Item className="coupon-item" key={item+index}>
                            <span rel="noopener noreferrer" ><i className={`icon iconfont icon-zhekou ${zhekou}`}></i> {this.handleCoupon(item)}</span>
                        </_menu.Item>
                    ))
                }</_menu>
            );
            coupon = <_dropdown overlay={menu}>
                <span className="ant-dropdown-link" >
                    <i className={`icon iconfont icon-zhekou ${zhekou}`}></i> {this.handleCoupon(this.props.couponList[0])} <_icon type="down" />
                </span>
            </_dropdown>

        }


        return (
            <div className="pd-coupon">
                {coupon}
            </div>
        )
    }
}

export default Coupon