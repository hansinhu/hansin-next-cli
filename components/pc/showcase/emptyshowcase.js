/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

class EmptyShowCase extends Component {

  render() {
    const showcase = [{
      item_list: [1, 2, 3, 4]
    }, {
      item_list: [1, 2, 3, 4]
    }]
    return (
      <div className="showcase">
            {
                <Col span={20} offset={2}>
                  {
                    showcase.map((item,i)=>{
                        return (<div key={i} className="empty-showcase-box"> 
                          <Row type="flex" justify="left"  gutter={8}>
                            {
                              item.item_list.map((item,i)=>{
                                return <Col key={i} span={6} style={{ overflow: "hidden"}}>
                                  <div className="empty-showcase">
                                      <div className="empty-top"></div>
                                      <div className="empty-bottom"></div>
                                  </div>
                                </Col>
                              })
                            }
                          </Row>
                        </div>)
                      })
                  }
              </Col>
            }
          </div>
    )
  }
}


export default EmptyShowCase