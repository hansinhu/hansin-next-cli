import ProductsName from './name'
import ProductPrice from './price'
import ActiveTips from './activetips'
import ActiveTime from './activetime'
import ProductModal from './pro-modal'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Rate from 'antd/lib/rate';
import Button from 'antd/lib/button';
import {
  scoreFormat
} from "../../../static/js/common"

export default ({
	product,skin,bottomPrice,btnLoading,favorited,showModal,storeProduct
}) => (
      <div className="pro-box-inner">
              {(product.discount||product.brokerage)?<ActiveTips skin={skin}  discount={product.discount} brokerage={product.brokerage||0} />:null}
              <div className="flex-width">
                  <Link  href={'/detail?itemId='+product.itemId} as={'/detail?itemId='+product.itemId} >
                      <div className="pro-img-box">
                          {(product.discount&&product.discount.duration>0)?<ActiveTime skin={skin}  time={product.discount.duration||0} />:null}
                          <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                              <img className="pro-img pro-img-origin" src={product.image||' '} alt="product"/>
                          </LazyLoad>
                          {
                                product.imageList&&product.imageList[1]?
                                  <img className="pro-img pro-img-change" src={product.imageList[1]}  alt="product"/>:
                                  <img className="pro-img pro-img-reverse" src={product.image}  alt="product"/>
                              }
                      </div>
                  </Link>
              </div>

              <div className="pro-info">
                  <Row gutter={8} style={{height:50,overflow:'hidden',display: 'flex'}}>
                      <Col span={18} style={{flex: 1}}>{
                          <div className="pro-name" >
                              <ProductsName number={bottomPrice?50:35} name={product.name || ' '} itemId={product.itemId}/>
                          </div>
                      }
                      </Col>
                      <Col span={6} style={{fontSize:16,textAlign:'right',lineHeight:"22px"}}>
                        <Button size="large" loading={btnLoading} onClick={showModal} type="primary" style={{minWidth:50,height:40,fontSize:24,padding:'0 10px'}}>
                              <Icon type="shopping-cart" style={{display:btnLoading?'none':''}} />
                        </Button>
                      </Col>
                  </Row>
                  <Row>
                    <Col span={12}>
                      <ProductPrice {...product}></ProductPrice>
                    </Col>
                    <Col span={12}>
                      <div className="pro-oprate">
                        <div style={{textAlign:'right'}}>
                          {
                              product.comment?<Rate style={{fontSize:16}} allowHalf disabled defaultValue={scoreFormat(product.comment.avgscore) || 0} />:
                              <Rate style={{fontSize:16}} allowHalf disabled defaultValue={0} />
                          }
                        </div>
                          <span onClick={storeProduct} className="icons fr">
                            <Icon type={favorited?"heart":'heart-o'} style={{ fontSize: 16,marginTop: 10 }} />
                          </span>
                          <span className="icons fr">
                            <Link href={{ pathname: '/detail', query: { itemId: product.itemId||' ' }}}>
                              <a title="detail"> <Icon type="eye-o" style={{ fontSize: 20,marginTop: 8 }}/> </a>
                            </Link>
                          </span>
                      </div>
                    </Col>
                  </Row>
                </div>
            </div>
)