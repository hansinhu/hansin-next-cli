/**
 * Created by hansin on 2017/8/26.
 */
import React, {
	Component
} from 'react';
import {
	addToCard,
	collectGoods,
	cancelCollectGoods
} from '../../../actions/detail/index';
import {
	bindActionCreators
} from 'redux'
import {
	basicConfig
} from '../../../static/js/config'
import {fSpecStr} from '../../../static/js/common'
import Modal from 'antd/lib/modal';
import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Button from 'antd/lib/button';



class ProductsModal extends Component {

	okHideModal = () => {
		this.props.close();
		window.location.href ='/b2c-trade/shop-cart-list.html';
	}

	render() {
		const {
			product,
			show,
			specKeys
		} = this.props;
		if(product){
			return (
				<div className="modal-cover" style={{width:show?'100%':'0',height:show?'100%':'0',opacity:show?'1':'0'}}>
					<div className="pro-modal" style={{opacity:show?'1':'0'}}>
						<Icon 
							onClick={this.props.close}
							className="modal-close" 
							type="close" 
							style={{fontSize:18,float:"right",cursor:"pointer"}}/>
		              <h2 className="modal-pro-title">
		              	<Icon style={{fontSize:22,verticalAlign: "middle"}} type="check-circle"/>
		                <span>&nbsp;&nbsp;Product successfully added to your shopping cart</span>
		              </h2>
		              <Row style={{marginTop:15,marginBottom:15}}>
		                  <Col span={10} style={{textAlign:'center'}}>
		                      <div className="modal-img-box">
		                          <img className="modal-pro-img" src={product.image ||' '} alt="productimg"/>
		                      </div>
		                  </Col>
		                  <Col span={14} style={{textAlign:'left'}}>
		                      <p className="modal-pro-name">{product.name||' '}</p>
		                      {
		                      	specKeys?(<p className="modal-pro-size"><span>{fSpecStr(specKeys)}</span></p>):
		                      	((product.specList&&product.specList.length)?(<p className="modal-pro-size"><span>{fSpecStr(product.specList[0].specKey)}</span></p>):null)
		                      }
		                      <p className="modal-pro-size"><span>Quality:</span><span>{"1"}</span></p>
		                      <p className="modal-pro-size"><span>Total:</span><span>${product.discount?product.discount.amount:product.price}</span></p>
		                  </Col>
		              </Row>
		              <div style={{height:36,borderTop:"1px solid #ccc"}}>
		              	<h2 className="modal-cart">
		                  <Icon type="shopping-cart"/>
		                  <span>&nbsp;&nbsp;There are {this.props.total} items in your cart.</span>
		              	</h2>
		              	<div className="modal-total-pro">
		                  <span>TOTAL PRODUCTS :</span><span>${this.props.totalPrice}</span>
		              	</div>
		              </div>
		              
		              <div className="modal-footer">
		              	<Button onClick={this.props.close} style={{marginRight:15,height:40}}>CONTINUE SHOPPING</Button>
		              	<Button onClick={this.okHideModal} type="primary" style={{height:40}}>PROCEED TO CHECKOUT</Button>
		              </div>
		          </div>
			</div>
			)
		}else{
			return null;
		}
		

	}
}


export default ProductsModal