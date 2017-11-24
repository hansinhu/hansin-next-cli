import React, {
    Component
} from 'react'
import {
    bindActionCreators
} from 'redux'
import {
    connect
} from 'react-redux'
import Link from 'next/link'
import {
    changeMainImg
} from '../../../actions/detail/index'
import dynamic from 'next/dynamic'
const ImgMagnifier = dynamic(import('../../../components/pc/detail/ImgMagnifier'))
const DetailOprate = dynamic(import('../../../components/pc/detail/DetailOprate'))
const DetailTabs = dynamic(import('../../../components/pc/detail/DetailTabs'))
const CountDown = dynamic(import('../../../components/pc/detail/CountDown'))
const MoreInformation = dynamic(import('../../../components/pc/detail/moreInformation'))

// import ImgMagnifier from '../../../components/pc/detail/ImgMagnifier'
// import DetailOprate from '../../../components/pc/detail/DetailOprate'
// import DetailTabs from '../../../components/pc/detail/DetailTabs'
// import CountDown from '../../../components/pc/detail/CountDown'
// import MoreInformation from '../../../components/pc/detail/moreInformation'

import {
    getCookie
} from '../../../static/js/global'

var _breadcrumb = require('antd/lib/breadcrumb');
var _affix = require('antd/lib/affix');

class Index extends Component {

    shouldComponentUpdate(nextProps,nextState){
        const propsNow = Object.assign({},
            {detailData: this.props.detail.detailData},
            {index: this.props.detail.index},
        );
        const propsNext = Object.assign({},
            {detailData: nextProps.detail.detailData},
            {index: nextProps.detail.index},
        );
        return JSON.stringify(propsNow) !== JSON.stringify(propsNext);
    }

    render() {

        const {
            detail
        } = this.props;
        //面包屑导航
        let breadcrumb = [];
        let category_list = detail.detailData.categoryList || [];
        let shopId = getCookie('shopId') || null;
        if (category_list.length) {
            for (let i = category_list.length-1; i >=0; i--) {
                breadcrumb.push(<_breadcrumb.Item key={category_list[i].categoryId}><Link  prefetch href={{ pathname: '/products', query: { shopId: shopId, categoryId: category_list[i].categoryId }}}><a>{category_list[i].name}</a></Link></_breadcrumb.Item>)
            }
        }

        return (
            <div className="pd-contain">
                <div className="pd-wraper">
                    {(detail.detailData.shopId == null || detail.detailData.published == 'stop') ? <div className="published-stop"><img src="../../../static/img/nonexistent.png" alt=""/><div>Sorry, this item has been removed.</div></div> : <div>
                        <_breadcrumb className="pd-breadcrumb">
                            <_breadcrumb.Item><Link  prefetch href={{ pathname: '/', query: { shopId: shopId }}}><a>{'Home'}</a></Link></_breadcrumb.Item>
                            {breadcrumb.map(item =>(item))}
                        </_breadcrumb>
                        <div className="pd-top-con">
                            <ImgMagnifier changeMainImg={this.props.changeMainImg} index={detail.index} image_list={detail.detailData.imageList || []} ></ImgMagnifier>
                            <DetailOprate></DetailOprate>
                        </div>
                        <div>
                            <DetailTabs data={detail.detailData}></DetailTabs>
                        </div>
                    </div>}

                    <MoreInformation/>
                </div>
                {
                    (detail.detailData.discount && detail.detailData.discount.duration>0)?(
                            <_affix offsetBottom={0}>
                                <CountDown  time={detail.detailData.discount.duration}></CountDown>
                            </_affix>
                        ):null
                }

            </div>
        )

    }
}

const mapStateToProps = ({
    detail
}) => ({
    detail
});

const mapDispatchToProps = (dispatch) => {
    return {
        changeMainImg: bindActionCreators(changeMainImg, dispatch)
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(Index)