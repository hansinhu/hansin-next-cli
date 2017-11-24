/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react'
var _carousel = require('antd/lib/carousel');
import {
  connect
} from 'react-redux';
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'

class AutoCarousel extends Component {
  constructor(props) {
    super(props);
  };

  render() {
    const imgList = this.props.footerInfo.turnPlay || [];
    const showcaseLoading = this.props.home.showcaseLoading;
    //const imgList = [];
    if (imgList && (imgList.length)>0) {
      return (
        <div className="pc-carousel">
          <_carousel autoplay>
            {
              imgList.map((item,i)=>{
                return (<div className="carousel" key={i}>
                  <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                      <a target="_blank" href={item.linkUrl ||'javaScript:void(0);'}>
                        <img className="carousel-img" src={item.picUrl} alt="carousel"/>
                      </a>
                  </LazyLoad>
                </div>)
              })
            }
          </_carousel>
                  
      </div>
      )
    }else if(showcaseLoading){
      return <div className="empty-carousel"></div>

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
  home,
});

export default connect(mapStateToProps, null)(AutoCarousel)
  //export default AutoCarousel