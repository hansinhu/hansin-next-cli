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

class MAdvertise extends Component {

  componentWillUpdate() {}

  render() {

    const advList = this.props.footerInfo.fourAd;
    const isFb = this.props.isFb;
    if (isFb) {
      return (<div>
        {
            (advList)?(<div className="margint5">
                {
                  advList.map((item,i)=>{
                          return <div key={i} className='madv-item-fb' style={{ overflow: "hidden"}}>
                            <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                                <a target="_blank" href={item.linkUrl ||'javaScript:void(0);'}>
                                  <img className="madver-img" src={item.picUrl}/>
                                </a>
                              </LazyLoad>
                          </div>
                  })
                }
            </div>):null
          }
      </div>)
    } else {
      return (
        <div>
          {
            (advList)?(<div className="margint5">
                  {
                    advList.map((item,i)=>{
                      return <div key={i} className="mad-img-box" >
                          <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                            <a target="_blank" href={item.linkUrl}>
                              <img className="madver-img" src={item.picUrl}/>
                            </a>
                          </LazyLoad>
                        </div>
                    })
                  }
            </div>):null
          }
        </div>
      )
    }

  }
}

const mapStateToProps = ({
  headers,
  home
}) => ({
  footerInfo: headers.footerInfo,
  isFb: home.isFb
});

export default connect(mapStateToProps, null)(MAdvertise)