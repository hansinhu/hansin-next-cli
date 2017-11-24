/**
 * Created by hansin on 2017/8/26.
 */
import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'

const WhiteSpace = require('antd-mobile/lib/white-space');

class MBanner extends Component {

    render() {

        const {
            footerInfo,
            device
        } = this.props;

        const bannerinfo = footerInfo.banner || [];

        if (bannerinfo && bannerinfo.picUrl) {
            return (<div className="mbanner">
                        <div className="banner-img-box" >
                            <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                                <a target="_blank" href={bannerinfo.linkUrl  ||'javaScript:void(0);'}>
                                    <div className="adver-img" style={{backgroundImage:`url(${bannerinfo.picUrl})`}}></div>
                                </a>
                            </LazyLoad>
                        </div>
                        <WhiteSpace size="lg" />
                    </div>)
        } else {
            return null
        }

    }
}

const mapStateToProps = ({
    headers,
    home
}) => ({
    footerInfo: headers.footerInfo,
});

export default connect(mapStateToProps, null)(MBanner)