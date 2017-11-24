import React, {Component} from 'react'
import pageWithIntl from '../components/PageWithIntl'
import Head from 'next/head'
import {bindActionCreators} from 'redux'
import {initStore} from '../store'
import withRedux from 'next-redux-wrapper'
import dynamic from 'next/dynamic'

//PC端组件
//import Layout from '../layouts/pc';
const Layout = dynamic(
    import ('../layouts/pc'));
const PcIndex = dynamic(
    import ('../components/pc/index-pc.js'));
//import PcIndex from '../components/pc/index-pc.js';

//手机端组件
import MLayout from '../layouts/mobile'
const MobileIndex = dynamic(
    import ('../components/mobile/index-mobile.js'));
//import MobileIndex from '../components/mobile/index-mobile.js';

import {newDevice, getIntDevice, getSkin, setMonitor} from '../actions/home/index'
import Wapper from '../components/wapper'
import PureRenderMixin from 'react-addons-pure-render-mixin';

class IndexWapper extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    render() {
        const {device,skin} = this.props.home;
        const {headers} = this.props;
        if (device === "pc") {
            return (
                <Layout>

                    <PcIndex {...this.props.home}></PcIndex>
                    <Head>
                        <title>HOME-{headers.bottomInfo.name}</title>
                    </Head>
                </Layout>)
        } else if (device === 'mobile') {
            return (
                <MLayout>

                    <MobileIndex {...this.props.home}></MobileIndex>
                    <Head>
                        <title>HOME-{headers.bottomInfo.name}</title>
                    </Head>
                </MLayout>
            )
        } else {
            return null
        }

    }
}

const mapStateToProps = ({
    home,headers
}) => ({
    home,headers
})


const mapDispatchToProps = (dispatch) => {
    return {
        newDevice: bindActionCreators(newDevice, dispatch),
        getIntDevice: bindActionCreators(getIntDevice, dispatch),
        getSkin: bindActionCreators(getSkin, dispatch),
        setMonitor: bindActionCreators(setMonitor, dispatch),
    }
};

export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(pageWithIntl(Wapper(IndexWapper)));