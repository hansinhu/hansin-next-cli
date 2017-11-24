/**
 * Created by zhulijun on 2017/7/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Router from 'next/router'

import { checkLoginStatus } from '../../../../static/js/global';
import { basicConfig } from '../../../../static/js/config'

import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Badge from 'antd/lib/badge';


class SearchBox extends Component {
    shouldComponentUpdate(nextProps){
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.bottomInfo,
            {carNum : this.props.headers.carNum}
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.bottomInfo,
            {carNum : nextProps.headers.carNum}
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    searchProducts = () => {
        //Input不支持change事件
        let value = this.refs.search.refs.input.value;
        Router.push({
            pathname: '/products',
            as: '/products?searchName=' + value,
            query: {
                searchName: value
            }
        });
    };
    goShoppingCar(){
        if(checkLoginStatus()) {
            window.location.href = basicConfig.oldUrl + '/shop-cart-list.html';
        }else {
            window.location.href = basicConfig.oldUrl + '/account/login.html';
        }
    };

    render() {
        const {headers} = this.props;
        return (
            <div className="search-box">
                <div className="logo-wrapper" style={headers.bottomInfo ? headers.bottomInfo.logo ? {display:'block'} : {display:'none'}:null}>
                   <img src={headers.bottomInfo ? headers.bottomInfo.logo : ''} alt="logo"/>
                </div>
               
                <div className="input-wrapper">
                    <div className="search-wrap">
                        <Input ref="search" size="large" className="input" onPressEnter={this.searchProducts}  placeholder="Search entire store here..." />
                        <div className="btn-search" onClick={this.searchProducts}>
                            <Icon type="search" className="icon" />
                        </div>
                    </div>
                </div>
                <div className="shopping-car">
                    <span>Welcome to our online store！</span>
                    <div className="shopping-wrap" onClick={this.goShoppingCar}>
                         <Badge count={headers.carNum}>
                             <a><Icon type="shopping-cart"/></a>
                         </Badge>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({headers}) => ({
    headers
});

const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)