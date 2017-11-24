import React, {
    Component
} from 'react'
import Head from 'next/head'
import pageWithIntl from '../components/PageWithIntl'
import Wapper from '../components/wapper'
import {
    initStore
} from '../store'
import {
    bindActionCreators
} from 'redux'
import withRedux from 'next-redux-wrapper'
import {
    newDevice
} from '../actions/home/index'
import Layout from '../layouts/pc';
import SkinTag from '../components/skinTag'

class belowIE9 extends Component {
    render() {
        return (
            <Layout>
                <SkinTag  {...this.props.home} />
                <div>
                <Head>
                    <title>belowIe9</title>
                    <meta name='viewport' content='width=device-width, initial-scale=1' />
                    <link rel='stylesheet' href='../static/css/belowIE9.css' />
                </Head>
                <div className="content">
                    <div className="content-txt">Your current version of the browser is too low, may cause the site not to be able to properly access! In order for you to use the site features, please use the following browsers.</div>{/*您当前的浏览器版本过低,可能导致网站不能正常访问! 为了您能正常使用网站功能,请使用以下这些浏览器。*/}
                    <div className="content-right">
                        <div>
                            <div className="item">
                                <a href="http://www.google.cn/chrome/browser/desktop/index.html">
                                    <div className="img-content">
                                        <img src="../static/img/belowIE9/chrome.jpg" />
                                    </div>
                                    <span>Chrome</span>
                                </a>
                            </div>
                            <div className="item">
                                <a href="http://www.firefox.com.cn/">
                                    <div className="img-content">
                                        <img src="../static/img/belowIE9/firefox.jpg" />
                                    </div>
                                    <span>Firefox</span>
                                </a>
                            </div>
                            <div className="item">
                                <a href="http://rj.baidu.com/soft/detail/12966.html">
                                    <div className="img-content">
                                        <img src="../static/img/belowIE9/safari.jpg" />
                                    </div>
                                    <span>Safari</span>
                                </a>
                            </div>
                            <div className="item">
                                <a href="http://rj.baidu.com/soft/detail/14917.html">
                                    <div className="img-content">
                                        <img src="../static/img/belowIE9/ie.jpg" />
                                    </div>
                                    <span>IE10 and above</span>
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            </Layout>

        )
    }
}

const mapStateToProps = ({
    home
}) => ({
    home
})


const mapDispatchToProps = (dispatch) => {
    return {
        newDevice: bindActionCreators(newDevice, dispatch),
    }
};


export default withRedux(initStore, mapStateToProps, mapDispatchToProps)(pageWithIntl(belowIE9));