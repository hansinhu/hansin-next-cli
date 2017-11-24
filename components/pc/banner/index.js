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

var _row = require('antd/lib/row');
var _col = require('antd/lib/col');



class Banner extends Component {

    render() {

        const {
            footerInfo
        } = this.props;


        const bannerinfo = footerInfo.banner;

        if (bannerinfo && bannerinfo.picUrl) {
            return (<div className="banner">
                        
                        <_row >
                            <_col className="banner-img-box" span={20} offset={2}>
                                <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                                    <a target="_blank" href={bannerinfo.linkUrl  ||'javaScript:void(0);'}>
                                        <img className="banner-img" src={bannerinfo.picUrl}/>
                                    </a>
                                </LazyLoad>
                            </_col>
                        </_row>
                        <div className="banner-bottom"></div>
                    </div>)
        } else {
            return null
        }

    }
}

const mapStateToProps = ({
    headers
}) => ({
    footerInfo: headers.footerInfo
});

export default connect(mapStateToProps, null)(Banner)