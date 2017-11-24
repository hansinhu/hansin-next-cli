/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Router from 'next/router'

import {setSearchIn} from '../../../../actions/products/index'
import {checkLoginStatus} from '../../../../static/js/global';
import {basicConfig} from '../../../../static/js/config'

import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';
import Badge from 'antd/lib/badge';
const Search = Input.Search;


class SearchBox extends Component {
    shouldComponentUpdate(nextProps) {
        const moveProcessPropsNow = Object.assign({}, {
            logo: this.props.headers.bottomInfo
        }, {
            carNum: this.props.headers.carNum
        });
        const moveProcessPropsNext = Object.assign({}, {
            logo: nextProps.headers.bottomInfo
        }, {
            carNum: nextProps.headers.carNum
        });
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }


    handleSearch = (value) => {
        this.props.setSearchIn(value)
        Router.push({
            pathname: '/products',
            as: '/products?searchName=' + value,
            query: {
                searchName: value
            }
        });
    };

    goShoppingCar() {
        if (checkLoginStatus()) {
            window.location.href = basicConfig.oldUrl + '/shop-cart-list.html';
        } else {
            window.location.href = basicConfig.oldUrl + '/account/login.html';
        }
    };

    render() {
        const {
            headers
        } = this.props;
        return (
            <div className="search-box search-box-5">
                <div className="logo-wrapper" style={headers.bottomInfo.logo ? {display:'block'} : {display:'none'}}>
                   <img src={headers.bottomInfo.logo} alt="logo"/>
                </div>

                <div className="shopping-wrap" onClick={this.goShoppingCar}>
                    <Badge count={headers.carNum}>
                        <a><Icon type="shopping-cart"/></a>
                    </Badge>
                </div>
                <div className="input-wrap">
                    <Search
                        placeholder="Search entire store here..."
                        className="input-extra"
                        onSearch={value => this.handleSearch(value)}
                    />
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    headers
}) => ({
    headers
});

const mapDispatchToProps = (dispatch) => {
    return {
        setSearchIn: bindActionCreators(setSearchIn, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)