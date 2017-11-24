/**
 * Created by hansin on 2017/8/26.
 */
import React, {Component} from 'react'

import {basicConfig} from '../../../../static/js/config'
import { checkLoginStatus} from '../../../../static/js/global';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import Router from 'next/router'
import {doSignOut} from '../../../../actions/headers/index';
import {setLanguage, setSkin, setColor} from '../../../../actions/home/index';
import {FormattedMessage} from 'react-intl';
import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
import Badge from 'antd/lib/badge';
import Input from 'antd/lib/input';
const Option = Select.Option;


class TopInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            url: ''
        }
    };

    shouldComponentUpdate(nextProps) {
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.bottomInfo,
            {carNum : this.props.headers.carNum},
            this.props.headers.userInfo
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.bottomInfo,
            {carNum : nextProps.headers.carNum},
            nextProps.headers.userInfo
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    componentDidMount() {
        this.setState({
            url: window.location,
        });
    }
    signOut() {
        this.props.doSignOut();
    }

    goShoppingCar() {
        if (checkLoginStatus()) {
            window.location.href = basicConfig.oldUrl + '/shop-cart-list.html';
        } else {
            window.location.href = basicConfig.oldUrl + '/account/login.html';
        }
    };
    userCenter() {
        if (checkLoginStatus()) {
            window.location.href = basicConfig.oldUrl + '/usercenter/my-account-setting.html';
        } else {
            window.location.href = basicConfig.oldUrl + '/account/login.html';
        }
    };
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

    render() {
        const { headers} = this.props;
        const userInfo = headers.userInfo;

        return (
            <div className="top-info top-info-hardware">
                <div className="fl">
                    <div className="logo-wrapper">
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
                </div>

                <div className="fr">
                    <div className="nav-item shopping-wrap" onClick={this.goShoppingCar}>
                        <Badge count={headers.carNum}>
                            <a><Icon type="shopping-cart"/></a>
                        </Badge>
                    </div>

                    <Icon type="user" className="icon" />
                    <div className="nav-item" onClick={() => this.userCenter()}  style={headers.isLogined ? {display:'inline-block',cursor: 'pointer'} : {display:'none'}}>
                        <span className="login-user common-link">{userInfo.nickName}</span>
                    </div>

                    <div className="nav-item">
                        <span style={headers.isLogined ? {display:'none'} : {display:'inline-block'}}>
                            <a className="common-link" href={ basicConfig.oldUrl + '/account/login.html?callback=' + this.state.url}>
                                <FormattedMessage id='header_signIn' description='signIn' defaultMessage='Sign In'/>
                            </a>
                            <em> <FormattedMessage id='header_or' description='or' defaultMessage='or'/> </em>
                            <a className="common-link" href={ basicConfig.oldUrl + '/account/register.html?callback=' + this.state.url}>
                                <FormattedMessage id='header_signUp' description='signUp' defaultMessage='Sign Up'/>
                            </a>
                        </span>
                        <span style={headers.isLogined ? {display:'inline-block',cursor:'pointer'} : {display:'none'}}>
                            <span className="common-link" onClick={() => this.signOut()}>
                                <FormattedMessage id='header_signOut' description='signOut' defaultMessage='Sign Out'/>
                            </span>
                        </span>
                    </div>
                </div>
            </div>
        )
    }
}
const mapStateToProps = ({
    headers,
    home
}) => ({
    headers,
    home
});

const mapDispatchToProps = (dispatch) => {
    return {
        doSignOut: bindActionCreators(doSignOut, dispatch),
        setLanguage: bindActionCreators(setLanguage, dispatch),
        setSkin: bindActionCreators(setSkin, dispatch),
        setColor: bindActionCreators(setColor, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TopInfo)