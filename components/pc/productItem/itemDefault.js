import {FormattedMessage} from 'react-intl';
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
        <div className="flex-width">
            <Link  href={'/detail?itemId='+product.itemId} as={'/detail?itemId='+product.itemId} >
                <div className="pro-img-box">
                    {(product.discount||product.brokerage)?<ActiveTips skin={skin}  discount={product.discount} brokerage={product.brokerage||0} />:null}
                    {(product.discount&&product.discount.duration>0)?<ActiveTime  time={product.discount.duration||0} />:null}

                    <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                        <img className="pro-img pro-img-origin" src={product.image||' '} />
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
                <Col span={bottomPrice?24:15} style={{flex: 1}}>{
                    <div className="pro-name" >
                        <ProductsName number={bottomPrice?50:35} name={product.name || ' '} itemId={product.itemId}/>
                    </div>
                }
                </Col>
                <Col span={bottomPrice?0:9} style={{fontSize:16,textAlign:'right',lineHeight:"22px",width: '50%'}}>
                {
                  bottomPrice?null:<ProductPrice {...product}></ProductPrice>
                }
                </Col>
            </Row>
            <div className="pro-oprate">
                {
                    product.comment?<Rate style={{fontSize:16}} allowHalf disabled defaultValue={scoreFormat(product.comment.avgscore) || 0} />:
                    <Rate style={{fontSize:16}} allowHalf disabled defaultValue={0} />
                }

                <span onClick={storeProduct} className="icons fr">
                  <Icon type={favorited?"heart":'heart-o'} style={{ fontSize: 16,marginTop: 10 }} />
                </span>

                <span className="icons fr">
                  <Link href={{ pathname: '/detail', query: { itemId: product.itemId||' ' }}}>
                    <a title="detail"> <Icon type="eye-o" style={{ fontSize: 20,marginTop: 8 }}/> </a>
                  </Link>
                </span>
            </div>
            <div className="pro-btn">
              <Row gutter={8} style={{height:50,overflow:'hidden'}}>
                <Col span={bottomPrice?12:0} style={{lineHeight:"40px"}}>
                {
                  bottomPrice?<ProductPrice {...product}></ProductPrice>:null
                }
                </Col>
                <Col span={bottomPrice?12:24}>{
                    <Button size="large" loading={btnLoading} onClick={showModal} type="primary" style={{width:"100%",height:40}}>
                        <Icon type="shopping-cart" style={{display:btnLoading?'none':''}} />
                        <FormattedMessage id='addtocart' description='btn' defaultMessage='ADD TO CART1'/>
                    </Button>
                }
                </Col>
              </Row>
            </div>
          </div>
      </div>
)