/**
 * Created by zhulijun on 2017/7/17.
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import Spin from 'antd/lib/spin'

class Loading extends Component {
    render() {
        const {loading ,home} = this.props;
        return (
            <Spin size="large" className={(home.device == 'mobile' && !home.isFb) ? 'loading loading-mobile' : 'loading'}  style={loading ? {display:'block'} : {display:'none'}}/>
        )
    }
}

const mapStateToProps = ({loading ,home }) => ({
    loading: loading.loading,
    home
});

export default connect(mapStateToProps)(Loading)