/**
 * Created by hansin on 2017/8/26.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import Router from 'next/router'
import {setShowMenu, setShowSearch, getCarNum, setNavIndex, getMenuList, getUserInfo, doSignOut ,setLogined} from '../../../actions/headers/index';

import {setHomeShowMenu} from '../../../actions/home/index';

import {bindActionCreators} from 'redux'
import {checkLoginStatus} from '../../../static/js/global';
import {basicConfig} from '../../../static/js/config'

var Icon = require('antd/lib/icon');
var Badge = require('antd/lib/badge');


class TopInfo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nickName: '',
            showSub: false,
            url: ''
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.menuList,
            {
                showMenu: this.props.headers.showMenu
            }, {
                navIndex: this.props.headers.navIndex
            }, {
                showSearch: this.props.headers.showSearch
            }, {
                showSub: this.state.showSub
            }, {
                carNum: this.props.headers.carNum
            },
            this.props.headers.userInfo
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.menuList, {
                showMenu: nextProps.headers.showMenu
            }, {
                navIndex: nextProps.headers.navIndex
            }, {
                showSearch: nextProps.headers.showSearch
            }, {
                showSub: nextState.showSub
            }, {
                carNum: nextProps.headers.carNum
            },
            nextProps.headers.userInfo
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    componentDidMount() {
        if (checkLoginStatus()) {
            this.props.getCarNum();
            this.props.getUserInfo();
            this.props.setLogined(true);
        }
        if(this.props.headers.fetchMenu){
            this.props.getMenuList();
        }
        this.setState({
            url: window.location,
        });
    }
    toggleMenu = () => {
        if(this.props.headers.navIndex == '1' || this.props.headers.navIndex.length > 1){
            this.setState({
                showSub: true
            });
        }
        this.props.setShowMenu(!this.props.headers.showMenu);
        this.props.setHomeShowMenu(!this.props.headers.showMenu);

        if(this.props.headers.showMenu){
            this.setState({
                showSub: false
            });
        }
    };

    goBack = () => {
        window.history.back();
    };

    showSearch = () => {
        this.props.setShowSearch(true);
        this.props.setShowMenu(false);
    };

    goShoppingCar = () => {
        this.props.setShowMenu(false);
        let url = this.props.home.isFb ? basicConfig.oldFbUrl: basicConfig.oldMobileUrl;
        if (checkLoginStatus()) {
            if(this.props.home.isFb){
                window.location.href = url + '/shop-cart-list.html';
            }else {
                window.location.href = url + '/shoppingcart.html';
            }

        } else {
            window.location.href = url + '/account/login.html';
        }
    };

    goUserCenter = () => {
        let url = this.props.home.isFb ? basicConfig.oldFbUrl: basicConfig.oldMobileUrl;
        if (checkLoginStatus()) {
            if(this.props.home.isFb){
                window.location.href = url + '/usercenter/my-account-setting.html';
            }else {
                window.location.href = url + '/user/index.html';
            }
        }else {
            window.location.href = url + '/account/login.html';
        }
    };

    showSub = () => {
        this.setState({
            showSub: !this.state.showSub
        });
    };
    setTab = (tab) => {
        this.props.setNavIndex(tab);
        switch (tab) {
            case 0:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/',
                        as: '/?isFb=1',
                        query: {
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/',
                        as: '/'
                    });
                }
                break;
            case 1:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/products',
                        as: '/products?isFb=1',
                        query: {
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/products',
                        as: '/products'
                    });
                }
                break;
            case 3:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/products',
                        as: '/products?type=top&isFb=1',
                        query: {
                            type: 'top',
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/products',
                        as: '/products?type=top',
                        query: {
                            type: 'top'
                        }
                    });
                }
                break;
            case 4:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/products',
                        as: '/products?type=new&isFb=1',
                        query: {
                            type: 'new',
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/products',
                        as: '/products?type=new',
                        query: {
                            type: 'new'
                        }
                    });
                }
                break;
            case 5:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/company',
                        as: '/company?isFb=1',
                        query: {
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/company',
                        as: '/company'
                    });
                }
                break;
            case 6:
                if(this.props.home.isFb){
                    Router.push({
                        pathname: '/contact',
                        as: '/contact?isFb=1',
                        query: {
                            isFb: 1
                        }
                    });
                }else {
                    Router.push({
                        pathname: '/contact',
                        as: '/contact'
                    });
                }
                break;
        }
    };
    setData = (i,data) => {
        this.props.setNavIndex(data.categoryId);
        if(data.categoryId == '1') {
            if(this.props.home.isFb){
                Router.push({
                    pathname: '/products',
                    as: '/products?isFb=1',
                    query: {
                        isFb: 1
                    }
                });
            }else {
                Router.push({
                    pathname: '/products',
                    as: '/products'
                });
            }
        }else {
            if(this.props.home.isFb){
                Router.push({
                    pathname: '/products',
                    as: '/products?isFb=1&categoryId='+ data.categoryId,
                    query: {
                        categoryId: data.categoryId,
                        isFb: 1
                    }
                });
            }else {
                Router.push({
                    pathname: '/products',
                    as: '/products?categoryId='+ data.categoryId,
                    query: {
                        categoryId: data.categoryId
                    }
                });
            }
        }
    };

    signOut = () => {
        this.props.doSignOut();
    };

    render() {
        const {headers,home} = this.props;
        const menuList = headers.menuList;
        const navIndex = headers.navIndex;
        const userInfo = headers.userInfo;

        return (
            <div>
                <div className="top-info" style={headers.showSearch == true ?{}:{width:'100%'}}>
                    <div className="nav-left" onClick={()=>this.toggleMenu()} >
                        <Icon type={headers.showMenu ? 'close' : 'bars'} />
                    </div>
                    {/*<div className="nav-left" onClick={()=>this.goBack()} style={ navIndex == '0' ? {display:'none'} : {display:'block'}}>*/}
                        {/*<Icon type='left' />*/}
                    {/*</div>*/}
                    <div className="nav-right">
                        <Icon className="nav-item" type="search" onClick={() => this.showSearch()}/>
                        <div className="nav-item"  onClick={this.goShoppingCar}>
                            <Badge count={headers.carNum} className = {home.isFb ? 'bedge-count bedge-fb' : 'bedge-count bedge-mobile'}>
                                <Icon className="nav-shop" type="shopping-cart" />
                            </Badge>
                        </div>
                    </div>
                </div>

                <div className="border-content"></div>

                <div className="draw_menu_cover" style={headers.showMenu ? {display:'block'} : {display:'none'}} onClick={()=>this.toggleMenu()}></div>
                <div className="draw_menu" style={headers.showMenu ? (home.isFb? {width: '50%'} : {width:'80%'}) : {}} >
                    <div className="menu-head">
                        <Icon type="user" />
                        <div className="company-name" onClick={this.goUserCenter}>{userInfo.nickName}</div>
                    </div>

                    <div className="menu-items">
                        <div className="item" key="0" onClick={() => this.setTab(0)}>
                            <div className={ navIndex == '0' ? 'item-wrap item-wrap-active' : 'item-wrap'} >
                                <div className="item-name">HOME</div>
                                <Icon className="menu-check" type={navIndex == '0' ? 'check' : ''}/>
                            </div>
                        </div>
                        {this.renderSubMenu(menuList,navIndex)}
                        <div className="item" key="3" onClick={() => this.setTab(3)}>
                            <div className={ navIndex == '3' ? 'item-wrap item-wrap-active' : 'item-wrap'}>
                                <div className="item-name">TOP SELLING</div>
                                <Icon className="menu-check" type={navIndex == '3' ? 'check' : ''}/>
                            </div>
                        </div>
                        <div className="item" key="4" onClick={() => this.setTab(4)}>
                            <div className={ navIndex == '4' ? 'item-wrap item-wrap-active' : 'item-wrap'}>
                                <div className="item-name">NEW ARRIVALS</div>
                                <Icon className="menu-check" type={navIndex == '4' ? 'check' : ''}/>
                            </div>
                        </div>
                        <div className="item" key="5" onClick={() => this.setTab(5)}>
                            <div className={ navIndex == '5' ? 'item-wrap item-wrap-active' : 'item-wrap'}>
                                <div className="item-name">COMPANY  PROFILE</div>
                                <Icon className="menu-check" type={navIndex == '5' ? 'check' : ''}/>
                            </div>
                        </div>
                        <div className="item" key="6" onClick={() => this.setTab(6)}>
                            <div className={ navIndex == '6' ? 'item-wrap item-wrap-active' : 'item-wrap'}>
                                <div className="item-name">CONTACT US</div>
                                <Icon className="menu-check" type={navIndex == '6' ? 'check' : ''}/>
                            </div>
                        </div>
                    </div>
                    <div className="menu-footer"  style={headers.showMenu ? (home.isFb? {width: '50%'} : {width:'80%'}) : {}}>
                        <div style={headers.isLogined ? {display:'none'} : {display:'block'}}>
                            <a href={(home.isFb ? basicConfig.oldFbUrl:basicConfig.oldMobileUrl) + '/account/login.html?callback=' + this.state.url}>
                                <div className="footer-item footer-item-first">Sign in</div>
                            </a>
                            <a href={(home.isFb ? basicConfig.oldFbUrl:basicConfig.oldMobileUrl) + '/account/register.html?callback=' + this.state.url}>
                                <div className="footer-item footer-item-extra">Sign up</div>
                            </a>
                        </div>
                        <div onClick={this.signOut} style={headers.isLogined ? {display:'block'} : {display:'none'}}>
                            <span>Sign Out</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    renderSubMenu(menuList, navIndex) {
        if (menuList.length > 0) { //有一级分类
            return (
                <div className="item " key="1" >
                    <div className="item-extra" onClick={()=>this.showSub()}>
                        <div className="item-wrap">
                            <div className="item-name">PRODUCTS</div>
                            <Icon className="menu-icon" type={this.state.showSub ? 'up' : 'down'} />
                        </div>
                    </div>
                    {menuList.map((item, i) => {
                        return (<div onClick={() => this.setData(i,item)} style={this.state.showSub ? {height:'1.15rem',padding:'0.2rem 0 0.2rem 0.26667rem'} : {}} className="item-sub1" key={i} >
                            <div className={navIndex == item.categoryId ? 'item-active' : ''}>
                                <div className="item">{item.name}</div>
                                <Icon className="menu-check" type={ navIndex == item.categoryId ? 'check' : ''}/>
                            </div>
                        </div>)
                    })
                    }
                </div>
            );
        } else {
            return (
                <div className="item" key="1" onClick={() => this.setTab(1)}>
                    <div className={ navIndex == '1' ? 'item-wrap item-wrap-active' : 'item-wrap'}>
                        <div className="item-name">PRODUCTS</div>
                        <Icon className="menu-check" type={navIndex == '1' ? 'check' : ''}/>
                    </div>
                </div>
            );
        }
    }
}


const mapStateToProps = ({
    headers,home
}) => ({
    headers,home
});

const mapDispatchToProps = (dispatch) => {
    return {
        setShowSearch: bindActionCreators(setShowSearch, dispatch),
        setShowMenu: bindActionCreators(setShowMenu, dispatch),
        getCarNum: bindActionCreators(getCarNum, dispatch),
        setNavIndex: bindActionCreators(setNavIndex, dispatch),
        getMenuList: bindActionCreators(getMenuList, dispatch),
        setHomeShowMenu: bindActionCreators(setHomeShowMenu, dispatch),
        getUserInfo: bindActionCreators(getUserInfo, dispatch),
        doSignOut: bindActionCreators(doSignOut, dispatch),
        setLogined: bindActionCreators(setLogined, dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TopInfo)