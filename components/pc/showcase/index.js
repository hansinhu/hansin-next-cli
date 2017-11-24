import React, {
  Component
} from 'react'
import {
  connect
} from 'react-redux';
import {
  bindActionCreators
} from 'redux'


import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

import ProductItem from '../productItem'
import EmptyShowCase from './emptyshowcase'



class ShowCase extends Component {
  constructor(props) {
    super(props);
  };


  render() {
    const {
      home,
      showcaseList
    } = this.props;
    const showcase = showcaseList || [];
    const showcaseLoading = home.showcaseLoading;
    return (
      <div>
      {
        showcaseLoading?<EmptyShowCase/> : (
          <div className="showcase">
            {
              (showcase && (showcase.length)>0)?(<Row>
                        <Col span={20} offset={2}>
                          {
                            showcase.map((item,i)=>{
                                return item.itemList&&item.itemList.length?(<div key={i}>
                                  <h3 className="case-name">
                                    <div className="case-jewelry">
                                      <span></span>
                                    </div>
                                    <span>
                                      <span className="title-icon"><i className="title-i-1"></i><i></i></span>
                                      <i className="toy-icon"></i>
                                      <span>{item.name}</span>
                                      <i className="toy-icon"></i>
                                    </span>
                                  </h3>
                                  <Row type="flex" justify="left">
                                    {
                                      item.itemDetailList.map((list,n)=>{
                                        return <Col key={n} span={6} >
                                          {list?<ProductItem productinfo={list} />:null}
                                        </Col>
                                      })
                                    }
                                  </Row>
                                </div>):null
                              })
                          }
                      </Col>
                    </Row>):null
            }
          </div>)
      }
    </div>)
  }
}

const mapStateToProps = ({
  home,
  headers
}) => ({
  home,
  showcaseList: headers.showcaseList
});


export default connect(mapStateToProps, null)(ShowCase)