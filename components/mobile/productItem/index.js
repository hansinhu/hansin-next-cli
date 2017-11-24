/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react'
import Router from 'next/router'
import {
  connect
} from 'react-redux';
import {
  addToCard,
  collectGoods,
  cancelCollectGoods
} from '../../../actions/detail/index';
import {
  bindActionCreators
} from 'redux'
import ProductsName from './name'
import ActiveTips from './activetips'
import ActiveTime from './activetime'
import Link from 'next/link'
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'
var _button = require('antd-mobile/lib/button');
var _toast = require('antd-mobile/lib/toast');
var _icon = require('antd/lib/icon');
import { getCarNum } from '../../../actions/headers/index';



class ProductsItem extends Component {
  state = {
    width: 250,
    confirmLoading: false,
    favorited: false
  }
  showModal = () => {
    //判断是否是否有规格的产品，有规格则跳到详情
    let size = this.props.productinfo.specList;
    if (size && size.length>1) {
      if(this.props.home.isFb){
          Router.push({
              pathname: '/detail',
              query: {
                  itemId: this.props.productinfo.itemId,
                  isFb:1
              }
          })
      }else {
          Router.push({
              pathname: '/detail',
              query: {
                  itemId: this.props.productinfo.itemId
              }
          })
      }
    } else {
      var specId = "0";
      if(size && size.length == 1){
        specId = size[0].id;
      }
      let params = {
        itemId: this.props.productinfo.itemId,
        price: this.props.productinfo.price,
        specId: specId,
        quantity: 1
      }
      this.props.addToCard(params).then((res) => {
        if(res&&res.data.success){
            this.props.getCarNum();
          _toast.info('Add Success !', 1);
        }
      })
    }
  }


  getDeviceWidth = () => {
    this.timer && clearTimeout(this.timer);
    //this.timer = setTimeout(() => {
      let flex = document.querySelectorAll('.flex-width')[0];
      if(!flex) return;
      let parentWidth = document.querySelectorAll('.flex-width')[0].offsetWidth;
      this.setState({
        width: parentWidth
      })
    //}, 300)
  };
    toDetail = (id) =>{
        if(this.props.home.isFb){
            Router.push({
                pathname: '/detail',
                query: {
                    itemId: id,
                    isFb:1
                }
            })
        }else {
            Router.push({
                pathname: '/detail',
                query: {
                    itemId: id
                }
            })
        }
    };


    componentDidMount() {
    if (this.props.home.device === 'mobile') {
      window.addEventListener('resize', this.getDeviceWidth);
      this.getDeviceWidth();
      this.setState({
        favorited: this.props.productinfo.favorited
      })
    }
  }

  componentWillUnmount() {
      clearTimeout(this.timer);
      window.removeEventListener('resize', this.getDeviceWidth);

    }

  componentWillReceiveProps(nextProps) {
    this.setState({
      favorited: nextProps.productinfo.favorited
    })
  }

  render() {
    const product = this.props.productinfo;
    const {isFb} = this.props.home

    //toFacebook 代表同步到facebook
    if (product && (product.toFacebook || !isFb)) {
      return (
        <div className="mpro-box" >
          <div className="flex-width">
            <div className="pro-img-box" span={6}  style={{height:this.state.width}}  onClick={()=>this.toDetail(product.itemId)}>
                <ActiveTips discount={product.discount} money={product.brokerage||0} />
                {product.discount?<ActiveTime time={product.discount.duration||0} />:null}
                <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                        <img className="adver-img" src={product.image}/>
                </LazyLoad>
            </div>
          </div>
          <div className="pro-info">
              <div style={{overflow:'hidden'}}>
                <div className="pro-name">
                  {product.name?<ProductsName name={product.name}  itemId={product.itemId}/>:null}
                </div>
                <div>
                  {
                    product.discount?
                    (<div>
                      <span className="pro-price">{(" $" + product.discount.amount) || ''}</span>
                      <span className="old-price">{(" $" + product.priceMin) || ''}</span>
                    </div>):
                    (<div>
                      <span className="pro-price">{("$" + product.priceMin) || ''}</span>
                    </div>)
                  }
                </div>
              </div>
            
              <div className="pro-btn">
                <div className="m-pro-btn" onClick={this.showModal}><_icon type="shopping-cart" /> ADD TO CART </div>
              </div>
          </div>
        </div>
      )
    } else {
      return null;
    }

  }
}

const mapStateToProps = ({
  home
}) => ({
  home
});

const mapDispatchToProps = (dispatch) => {
  return {
    addToCard: bindActionCreators(addToCard, dispatch),
    collectGoods: bindActionCreators(collectGoods, dispatch),
    cancelCollectGoods: bindActionCreators(cancelCollectGoods, dispatch),
      getCarNum: bindActionCreators(getCarNum ,dispatch)
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ProductsItem)