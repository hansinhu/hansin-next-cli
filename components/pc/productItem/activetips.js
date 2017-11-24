/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react';
import {
  FormattedMessage
} from 'react-intl';
import ToyActive from './activeTipToy'
import BabyActive from './activeTipBaby'
import HardwareActive from './activeTipHardware'


class ActiveTips extends Component {
  render() {
    const type = this.props.type;
    const brokerage = this.props.brokerage;
    const discount = this.props.discount;
    const skin = this.props.skin;
    if (!brokerage && !discount) {
      return null
    }else if(!brokerage && discount && discount.duration<0){
      return null
    }else if(skin == 'toy'){
      return <ToyActive brokerage={brokerage} discount={discount}/>
    }else if(skin == 'baby'){
      return <BabyActive brokerage={brokerage} discount={discount}/>
    }else if(skin == 'hardware'){
      return <HardwareActive brokerage={brokerage} discount={discount}/>
    } else if (skin == 'male' || skin == 'c3') {
      return <div className={'tip-box-skint'}>
          {
            discount?
            (
              <div>
                <div className="tips-skint">{`${(10-discount.discountRate).toFixed(2)*10}%`} <FormattedMessage id='off' description='off' defaultMessage='off'/></div>
              </div>):
            (<div>
              <div className="tips-skint"><FormattedMessage id='get' description='get' defaultMessage='GET'/> {`$${brokerage}`}</div>
            </div>)
          }
          
        </div>
    } else if (skin == 'luggage') {
      return (
        <div className={'tip-box-two'}>
          {
            discount?
            (
              <div>
                <div className="tips"><FormattedMessage id='sale' description='sale' defaultMessage='SALE'/></div>
                <div className="tips-count">{`-${(10-discount.discountRate).toFixed(2)*10}%`}</div>
              </div>):
            (<div>
              <div className="tips">GET</div>
              <div className="tips-count">{'$'+brokerage}</div>
            </div>)
          }
          
        </div>
      )
    }else if(skin == 'jewelry'){
      return (
        <div className={'tip-box-jewelry'}>
          {
            discount?
            (
              <div className="tip-inner-jewelry">
                <span className="tips-count">{`${(10-discount.discountRate).toFixed(2)*10}% off`}</span>
              </div>):
            (<div className="tip-inner-jewelry">
              <span className="tips-count">{'$'+brokerage + ' GET'}</span>
            </div>)
          }
        </div>
      )
    } else {
      return (
        <div className={'tip-box'}>
          {
            discount?
            (
              <div>
                <div className="tips"><FormattedMessage id='sale' description='sale' defaultMessage='SALE'/></div>
                <div className="tips-count">{`-${(10-discount.discountRate).toFixed(2)*10}%`}</div>
              </div>):
            (<div>
              <div className="tips">GET</div>
              <div className="tips-count">{'$'+brokerage}</div>
            </div>)
          }
          
        </div>
      )
    }
  }
}


export default ActiveTips