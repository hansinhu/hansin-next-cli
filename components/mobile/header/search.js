/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {Component} from 'react'
import {connect} from 'react-redux'
import {setShowSearch} from '../../../actions/headers/index';
import {bindActionCreators} from 'redux'
import Router from 'next/router'

import Icon from 'antd/lib/icon';
import Input from 'antd/lib/input';

class SearchBox extends Component {
    shouldComponentUpdate(nextProps) {
        const moveProcessPropsNow = Object.assign({}, {
            showSearch: this.props.headers.showSearch
        });
        const moveProcessPropsNext = Object.assign({}, {
            showSearch: nextProps.headers.showSearch
        });
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    searchProducts = () => {
        //_input不支持change事件
        let value = this.refs.search.refs.input.value;
        if(this.props.home.isFb){
            Router.push({
                pathname: '/products',
                as: '/products?isFb=1&searchName=' + value,
                query: {
                    searchName: value,
                    isFb: 1
                }
            });
        }else {
            Router.push({
                pathname: '/products',
                as: '/products?searchName=' + value,
                query: {
                    searchName: value
                }
            });
        }
    };
    hideSearch = () => {
        this.props.setShowSearch(false)
    };

    render() {
        const {headers} = this.props;
        const showSearch = headers.showSearch;
        return (
            <div className="search-box" style={showSearch ?{ width:'100%'}:{}}>
                
                <div className="input-wrapper">
                    <Input ref="search" size="large" className="input" onPressEnter={this.searchProducts}  placeholder="Search entire store here..." />
                </div>
                <div className="close">
                    <Icon type="search" className="search-icon" onClick={this.searchProducts} />
                    <Icon type='close' onClick={()=>this.hideSearch()}/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({headers,home}) => ({
    headers,home
});

const mapDispatchToProps = (dispatch) => {
    return {
        setShowSearch: bindActionCreators(setShowSearch, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(SearchBox)