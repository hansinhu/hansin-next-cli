/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react';
import {
  toDecimal2
} from '../../../static/js/global';



class ProductPrice extends Component {

  render() {
    const {
      discount,
      price,
      priceMin,
      priceMax
    } = this.props;
    if (discount && discount.duration>0) {
      return (
        (<div >
            <span className="pro-price"><span className="dollar-tip"> $</span>{toDecimal2(priceMin*discount.discountRate*0.1) || ''}</span>
            <span className="old-price"><span className="dollar-tip"> $</span>{toDecimal2(priceMin) || ''}</span>
        </div>)
      )
    } else {
      return (
        <div>
            {
                (priceMin == priceMax)?
                    (<span className="pro-price"><span className="dollar-tip"> $</span>{toDecimal2(priceMin) || ''}</span>):
                    (<span className="pro-price"><span className="dollar-tip"> $</span>{toDecimal2(priceMin)}</span>)
            }
        </div>

      )
    }

  }
}


export default ProductPrice