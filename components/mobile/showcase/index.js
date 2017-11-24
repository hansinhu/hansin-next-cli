/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'

import ProductItem from '../productItem';


class ShowCase extends Component {
  constructor(props) {
    super(props);
  };

  state = {
    width: 750
  }

  render() {
    const {
      isFb,
      device,
      showcaseList
    } = this.props
    const showcase = showcaseList;
    if(isFb&&showcase&&showcase.length){
      for(let i = 0;i<showcase.length;i++){
        showcase[i].showIndex = false;
        if(showcase[i].itemDetailList && showcase[i].itemDetailList.length){
          showcase[i].itemDetailList.map((n)=>{
            if(n.toFacebook){
              showcase[i].showIndex = true;
            }
          })
        }
      }
    }
    
    return (
      <div>
          {
            showcase?(<div className="mshowcase">
                  {
                    showcase.map((item,i)=>{
                        return item.itemList&&item.itemList.length?(<div key={i}>
                          <h3 className="mcase-name" style={{display:(item.showIndex||!isFb)?'block':"none"}}>{item.name}</h3>
                          {
                            (item.showIndex||!isFb)?
                            <div>
                              {/*先判断是否isFb? 如果是Fb端 还需要判断商品是否同步到Fb：toFabcebook*/
                                item.itemDetailList.map((list,i)=>{
                                  return isFb?
                                  (!list.toFacebook?
                                    null:
                                      <div className='showcase-item-fb' key={i} style={{ overflow: "hidden"}}>
                                        <ProductItem productinfo={list}/>
                                    </div>):
                                  (<div className='showcase-item' key={i} style={{ overflow: "hidden"}}>
                                      <ProductItem productinfo={list}/>
                                  </div>)
                                })
                              }
                            </div>:null
                          }
                        </div>):null
                      })
                  }
              </div>):null
          }
        </div>
    )
  }
}

const mapStateToProps = ({
  home,
  headers
}) => ({
  showcase: home.showcase,
  isFb: home.isFb,
  showcaseList: headers.showcaseList
});

export default connect(mapStateToProps, null)(ShowCase)