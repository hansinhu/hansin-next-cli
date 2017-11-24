/**
 * Created by hansin on 2017/8/26.
 */
import React, {Component} from 'react'

import {basicConfig} from '../../../../static/js/config'
import {checkLoginStatus} from '../../../../static/js/global';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {doSignOut} from '../../../../actions/headers/index';
import {setLanguage, setSkin, setColor} from '../../../../actions/home/index';
import {FormattedMessage} from 'react-intl';

import Icon from 'antd/lib/icon';
import Select from 'antd/lib/select';
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
            url: window.location
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
    }

    login() {
        window.location.href = basicConfig.oldUrl + '/account/login.html';
    }

    register() {
        window.location.href = basicConfig.oldUrl + '/account/register.html';
    }

    handleChange = (value) => {
        this.props.setLanguage(value)
    };

    render() {
        const { headers ,home} = this.props;
        const info = headers.bottomInfo ? headers.bottomInfo.shopExtInfo || {} : '';
        const userInfo = headers.userInfo;

        return (
            <div className="top-info top-info3 ">
                <div className="logo-wrapper fl" style={headers.bottomInfo.logo ? {display:'block'} : {display:'none'}}>
                    <img src={headers.bottomInfo.logo} alt="logo"/>
                </div>

                <div className="nav-info fr">
                    {/*<Select defaultValue={home.language} style={{ width: 70 }} onChange={this.handleChange}>*/}
                        {/*<Option value="en_US">English</Option>*/}
                        {/*<Option value="zh_CN">中文</Option>*/}
                    {/*</Select>*/}

                    <div className="nav-item nav-item-extra">
                        <Icon type="phone" className="icon" />
                        <span>{ info.phone }</span>
                    </div>
                    <div className="nav-item" onClick={this.goShoppingCar}>
                        <Icon type="shopping-cart"  className="icon"/>
                        <span>({headers.carNum || 0})</span>
                    </div>

                    <div className="nav-item" onClick={() => this.userCenter()} style={headers.isLogined ? {display:'inline'} : {display:'none'}}>
                        <Icon type="user" className="icon" />
                        <span className="login-user">{userInfo.nickName}</span>
                    </div>

                    <div style={headers.isLogined ? {display:'none'} : {display:'inline'}}>
                        <div className="nav-item"  onClick={() => this.login()}>
                            <Icon type="user" className="icon" />
                            <span><FormattedMessage id='header_signIn' description='signIn' defaultMessage='Sign In'/></span>
                        </div>
                        <em><FormattedMessage id='header_or' description='or' defaultMessage='or'/></em>
                        <div className="nav-item" onClick={() => this.register()}>
                            <span><FormattedMessage id='header_signUp' description='signUp' defaultMessage='Sign Up'/></span>
                        </div>
                    </div>

                    <div className="nav-item" style={headers.isLogined ? {display:'inline'} : {display:'none'}}>
                        <span onClick={() => this.signOut()}>
                            <FormattedMessage id='header_signOut' description='signOut' defaultMessage='Sign Out'/>
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