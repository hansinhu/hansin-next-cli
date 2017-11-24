/**
 * Created by zhulijun on 2017/7/17.
 */
import React, { Component } from 'react'

import TopInfo from './topInfo'
import SearchBox from './search'
import MenuGroup from './menu'

import Affix from 'antd/lib/affix';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            atTop: true    //菜单栏是否在顶部
        }
    };

    MenuBeTo = (affixed) => {
        this.setState({
            atTop: !affixed
        })
    };

    render() {
        return (
            <div>
                <TopInfo />
                <SearchBox />
                <Affix onChange={this.MenuBeTo}>
                    <MenuGroup atTop={this.state.atTop}/>
                </Affix>
            </div>
        )
    }
}

export default Header

