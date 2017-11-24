import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import LazyLoad from 'react-lazyload';
import PlaceholderComponent from '../../Placeholder';
var _carousel = require('antd-mobile/lib/carousel');
// import {
//     Carousel
// } from 'antd-mobile';

class MCarousel extends Component {
    constructor(props) {
        super(props);
    };

    render() {
        const imgList = this.props.footerInfo.turnPlay;
        const { isFb } = this.props;

        if (imgList && imgList.length>1) {
            return (
                <div>
                <_carousel
                    className="m-carousel"
                    autoplay={true}
                    infinite
                    selectedIndex={1}
                    swipeSpeed={35}
                >
                    {imgList.map((item,i) => (
                        <a target="_blank" href={item.linkUrl ||'javaScript:void(0);'} key={i}>
                            <div className={isFb?"fcarousel-img":"mcarousel-img"} style={{backgroundImage:`url(${item.picUrl})`}}>
                            </div>
                        </a>
                    ))}
                </_carousel>
            </div>
            );
        }else if(imgList && imgList.length == 1){
            return (
                <div>
                <div
                    className="m-carousel"
                >
                    {imgList.map((item,i) => (
                        <a target="_blank" href={item.linkUrl ||'javaScript:void(0);'} key={i}>
                            <div className={isFb?"fcarousel-img":"mcarousel-img"} style={{backgroundImage:`url(${item.picUrl})`}}>
                            </div>
                            
                        </a>
                    ))}
                </div>
            </div>
            );
        } else {
            return null
        }

    }
}

const mapStateToProps = ({
    home,
    headers
}) => ({
    isFb: home.isFb,
    footerInfo: headers.footerInfo
});

export default connect(mapStateToProps, null)(MCarousel)