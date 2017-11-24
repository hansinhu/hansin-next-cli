/**
 * Created by zhulijun on 2017/7/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'


class SearchBox extends Component {
    shouldComponentUpdate(nextProps){
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.bottomInfo,
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.bottomInfo,
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    render() {
        const {headers} = this.props;
        return (
            <div className="search-box" style={headers.bottomInfo.logo ? {display:'block'} : {display:'none'}}>
                <div className="logo-wrapper logo-wrapper-2">
                   <img src={headers.bottomInfo.logo} alt="logo"/>
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