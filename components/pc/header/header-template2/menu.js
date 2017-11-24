/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {
    Component
} from 'react'
import Link from 'next/link'
import {
    connect
} from 'react-redux'
import Router from 'next/router'
import {setNavIndex} from '../../../../actions/headers/index';
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl';
import { getCookie } from '../../../../static/js/global';

import Icon from 'antd/lib/icon';
import Menu from 'antd/lib/menu';
import Input from 'antd/lib/input';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;
const Search = Input.Search;

class MenuGroup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showSearch: false,
            showMenu: false,
            changeStyle: false,
        }
    };
    shouldComponentUpdate(nextProps, nextState) {
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.menuList,
            {navIndex: this.props.headers.navIndex},
            {shopId: this.props.home.shopId},
            {language: this.props.home.language},
            {isMonitor: this.props.home.isMonitor},
            {showSearch: this.state.showSearch},
            {showMenu: this.state.showMenu},
            {changeStyle: this.state.changeStyle},
            {atTop: this.props.atTop}
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.menuList,
            {shopId: nextProps.home.shopId},
            {navIndex: nextProps.headers.navIndex},
            {language: nextProps.home.language},
            {isMonitor: nextProps.home.isMonitor},
            {showSearch: nextState.showSearch},
            {showMenu: nextState.showMenu},
            {changeStyle: nextState.changeStyle},
            {atTop: nextProps.atTop}
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    handleClick = (e, type) => {
        this.props.setNavIndex(e.key);
        switch (e.key) {
            case '0':
                Router.push({
                    pathname: '/',
                    as: '/',
                    query: {
                        shopId: this.props.home.shopId
                    }
                });
                break;
            case '3':
                Router.push({
                    pathname: '/products',
                    as: '/products?type=top',
                    query: {
                        type: 'top'
                    }
                });
                break;
            case '4':
                Router.push({
                    pathname: '/products',
                    as: '/products?type=new',
                    query: {
                        type: 'new'
                    }
                });
                break;
            case '5':
                Router.push({
                    pathname: '/company',
                    as: '/company'
                });
                break;
            case '6':
                Router.push({
                    pathname: '/contact',
                    as: '/contact'
                });
                break;
        }
    };
    setData = (data) => {
        if(data.categoryId == '1') {
            Router.push({
                pathname: '/products',
                as: '/products'
            });
        }else {
            let id;
            if(data.isAll){
                id = data.categoryId.substring(2);
            }else {
                id =  data.categoryId;
            }
            this.props.setNavIndex(id);
            Router.push({
                pathname: '/products',
                as: '/products?categoryId='+ id,
                query: {
                    categoryId: id
                }
            });
        }
    };

    handleSearch = (value) => {
        Router.push({
            pathname: '/products',
            as: '/products?searchName=' + value,
            query: {
                searchName: value
            }
        });
    };
    toggleShowSearch = () => {
        this.setState({
            showSearch: !this.state.showSearch
        });
    };
    changeFather = () => {
        this.setState({
            changeStyle: !this.state.changeStyle
        });
    }

    render() {
        const {headers, home} = this.props;
        let navIndex = headers.navIndex;
        const menuList = headers.menuList;
        for(let i=0;i<menuList.length;i++){
            if(menuList[i].subList.length>0){
                if(menuList[i].subList[0].categoryId.substring(2) == navIndex) {
                    navIndex = menuList[i].subList[0].categoryId
                }
            }
        }

        return (
            <div className={this.props.atTop ? 'nav-wrapper nav-wrapper-2' : 'nav-wrapper nav-wrapper-2 nav-wrapper-common'}>
                <div className="nav-content" style={this.state.showSearch ? {opacity: 0} : {width:'100%',opacity: 1}} >
                    <div className="nav-content-inner">
                        <Menu
                            onClick={this.handleClick}
                            selectedKeys={[navIndex]}
                            mode="horizontal">
                            <Menu.Item key="0">
                                <div className="nav-font">
                                    <FormattedMessage id='header_nav0' description='nav' defaultMessage='HOME1'/>
                                    <div className="selected-nav" style={navIndex == '0' ? {display:'inline-flex'} : {display:'none'}}>
                                        <Icon type="caret-up" />
                                    </div>
                                </div>
                            </Menu.Item>

                            {this.renderSubMenu(menuList,navIndex)}

                            <Menu.Item key="3">
                                <div className="nav-font">
                                    <FormattedMessage id='header_nav2' description='nav' defaultMessage='TOP SELLING'/>
                                    <div className="selected-nav" style={navIndex == '3' ? {display:'inline-flex'} : {display:'none'}}>
                                        <Icon type="caret-up" />
                                    </div>
                                </div>
                            </Menu.Item>
                            <Menu.Item key="4">
                                <div className="nav-font">
                                    <FormattedMessage id='header_nav3' description='nav' defaultMessage='NEW ARRIVALS'/>
                                    <div className="selected-nav" style={navIndex == '4' ? {display:'inline-flex'} : {display:'none'}}>
                                        <Icon type="caret-up" />
                                    </div>
                                </div>
                            </Menu.Item>
                            <Menu.Item key="5">
                                <div className="nav-font">
                                    <FormattedMessage id='header_nav4' description='nav' defaultMessage='COMPANY  PROFILE'/>
                                    <div className="selected-nav" style={navIndex == '5' ? {display:'inline-flex'} : {display:'none'}}>
                                        <Icon type="caret-up" />
                                    </div>
                                </div>
                            </Menu.Item>
                            <Menu.Item key="6">
                                <div className="nav-font">
                                    <FormattedMessage id='header_nav5' description='nav' defaultMessage='CONTACT US'/>
                                    <div className="selected-nav" style={navIndex == '6' ? {display:'inline-flex'} : {display:'none'}}>
                                        <Icon type="caret-up" />
                                    </div>
                                </div>
                            </Menu.Item>
                        </Menu>

                        <Search
                            className="input-extra input-placeholder"
                            placeholder="Search entire store here..."
                            onSearch={value => this.handleSearch(value)}
                            style={home.isMonitor ? {display:'inline-block'} : {display:'none'}}
                        />

                        <div className="search-wrapper" onClick={this.toggleShowSearch}>
                            <Icon type="search"  className="input-extra-small"  style={home.isMonitor ? {display:'none'} : {display:'inline-block'}} />
                        </div>
                    </div>
                </div>

                <div className="show-search" style={this.state.showSearch ? {width:'100%',opacity: 1} : {opacity: 0}} >
                    <Search
                        className="input-extra-inner input-placeholder"
                        placeholder="Search entire store here..."
                        onSearch={value => this.handleSearch(value)}
                    />
                    <Icon type='close' className="btn-close" onClick={this.toggleShowSearch}/>
                </div>
            </div>
        );
    }

    renderSubMenu(menuList, navIndex) {
        if (menuList.length > 0) {
            return ( 
                <SubMenu title = {<span className="nav-font">
                        <FormattedMessage id='header_nav1' description='nav' defaultMessage='PRODUCTS'/>
                        <Icon style={{marginLeft:5}} type="down" />
                         <div className="selected-nav" style={navIndex == '1' ? {display:'inline-flex'} : {display:'none'}}>
                            <Icon type="caret-up" />
                        </div>
                    </span>}> 
                    {menuList.map((item, i) => {
                    if (item.subList.length) { //有二级分类
                        return (<SubMenu key={item.categoryId} title={item.name} className={this.state.changeStyle ? 'menu-subMenu-item ': 'menu-subMenu-item'}>
                                {
                                    item.subList.map((cat, n) => {
                                        return <Menu.Item key={cat.categoryId}>
                                            <div onClick={()=>this.setData(cat)}  onMouseOver={() => {this.changeFather()}}  onMouseOut={() => {this.changeFather()}}>
                                                <a title={cat.name}>{cat.name}</a>
                                            </div>
                                        </Menu.Item>
                                    })
                                }
                            </SubMenu>)
                    } else {
                        return <Menu.Item key={item.categoryId} className="menu-subItem">
                            <div onClick={()=>this.setData(item)}>
                                <a title={item.name}>{item.name}</a>
                            </div>
                        </Menu.Item>
                    }})
            } 
            </SubMenu>
        );
        } else {
            return (
                <Menu.Item key="1">
                    <Link href='/products' as='/products'>
                        <a className="nav-font">
                            <FormattedMessage id='header_nav1' description='nav' defaultMessage='PRODUCTS'/>
                            <div className="selected-nav" style={navIndex == '1' ? {display:'inline-flex'} : {display:'none'}}>
                                <Icon type="caret-up" />
                            </div>
                        </a>
                    </Link>
                </Menu.Item>
            );
        }
    }

}



const mapStateToProps = ({
    headers,
    home,
    company
}) => ({
    headers,
    home,
    company
});

const mapDispatchToProps = (dispatch) => {
    return {
        setNavIndex: bindActionCreators(setNavIndex, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MenuGroup)