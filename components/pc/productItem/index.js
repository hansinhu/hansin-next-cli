/**
 * Created by hansin on 2017/8/26.
 */
import React, {Component} from 'react'
import Router from 'next/router'
import {connect} from 'react-redux';
import {FormattedMessage} from 'react-intl';
import dynamic from 'next/dynamic'

import {
  scoreFormat
} from "../../../static/js/common"

import {addToCard, collectGoods, cancelCollectGoods} from '../../../actions/detail/index';
import {bindActionCreators} from 'redux'
import ProductModal from './pro-modal'
import Link from 'next/link'
import { getCarNum } from '../../../actions/headers/index';

const ToyItem = dynamic(
    import ('./itemToy'));
const JewelryItem = dynamic(
    import ('./itemJewelry'));
const DefaultItem = dynamic(
    import ('./itemDefault'));

import Message from 'antd/lib/message';



class ProductsItem extends Component {
  state = {
    width: 250,
    total: 0,
    totalPrice: 0,
    visible: false,
    btnLoading: false,
    confirmLoading: false,
    favorited: false,
    itemId:''
  }
  showModal = () => {
    //判断是否是否有规格的产品，有规格则跳到详情
    let size = this.props.productinfo.specList;
    let inventory = this.props.productinfo.inventory;
    if ((inventory <=0) || (size && size.length>1)) {
      Router.push({
        pathname: '/detail',
        query: {
          itemId: this.props.productinfo.itemId
        }
      })
    } else {
      var specId = "0";
      if(size && size.length == 1){
        specId = size[0].id;
      }
      this.setState({
        btnLoading: true
      })
      let params = {
        itemId: this.props.productinfo.itemId,
        price: this.props.productinfo.price,
        specId: specId,
        quantity: 1
      }
      this.props.addToCard(params).then((res) => {
        this.setState({
            btnLoading: false
          });
        if(res&&res.data.success){
          this.setState({
            visible: true,
            total:res.data.data.cartCount,
            totalPrice: res.data.data.cartTotalPrice
          });
          this.props.getCarNum();
        }
      })
    }
  }



  cancelHideModal = () => {
    this.setState({
      visible: false,
    });
  }

  //收藏商品
  storeProduct = () => {
    let itemId = this.props.productinfo.itemId;
    let info = this.props.productinfo;
    if (this.state.favorited) {
      //取消收藏
      this.props.cancelCollectGoods({
        itemId
      }).then((res) => {
        if (res && res.data.success) {
          this.setState({
            favorited: !this.state.favorited
          })
          info.favorited = false;
          Message.success('Cancel Collect Success');
        }
      })
    } else {
      //收藏接口
      this.props.collectGoods({
        itemId
      }).then((res) => {
        if (res && res.data.success) {
          this.setState({
            favorited: !this.state.favorited
          })
          info.favorited = true;
          Message.success('Add Collect Success');
          }
      })
    }

  }

  getDeviceWidth = () => {
    //this.timer && clearTimeout(this.timer);
    var flex = document.querySelectorAll('.flex-width')[0];
    //this.timer = setTimeout(() => {
      if (!flex) {
        return
      }
      let parentWidth = flex && flex.offsetWidth;
      parentWidth = (parentWidth > 380) ? 380 : parentWidth;
      this.setState({
        width: parentWidth
      })
    //}, 10)

  }

  componentDidMount() {
    if (this.props.home.device === 'pc') {
      this.timer && clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.getDeviceWidth();
      },200)
      window.addEventListener('resize', this.getDeviceWidth);

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
    const btnHeight = this.props.btnHeight || 40;
    const skin = this.props.home.skin;
    const bottomPrice = (skin == 'c3');



    if (product) {
        return (
          <div className="pro-box margint40" key={product.itemId}>
            { this.getItem(product,skin, bottomPrice, this.state.btnLoading,this.state.favorited,this.showModal,this.storeProduct) }
            <ProductModal 
              show={this.state.visible} 
              product={product} 
              close={this.cancelHideModal} 
              totalPrice={this.state.totalPrice}
              total={this.state.total}/>
        </div>)
    } else {
      return null
    }
  }

  getItem(product,skin, bottomPrice, btnLoading,favorited,showModal,storeProduct){
    if(skin == 'toy'){
      return <ToyItem 
              product={product} 
              skin={skin} 
              bottomPrice={bottomPrice} 
              btnLoading={btnLoading} 
              favorited={favorited} 
              showModal={showModal} 
              storeProduct={storeProduct}/>
    }else if(skin == 'jewelry'){
      return <JewelryItem 
              product={product} 
              skin={skin} 
              bottomPrice={bottomPrice} 
              btnLoading={btnLoading} 
              favorited={favorited} 
              showModal={showModal} 
              storeProduct={storeProduct}/>

    }else{
      return <DefaultItem 
              product={product} 
              skin={skin} 
              bottomPrice={bottomPrice} 
              btnLoading={btnLoading} 
              favorited={favorited} 
              showModal={showModal} 
              storeProduct={storeProduct}/>
    }
  }
}

const mapStateToProps = ({
  home,headers
}) => ({
  home,headers
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