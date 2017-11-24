/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react';



class ActiveTips extends Component {
  render() {
    const type = this.props.type;
    const money = this.props.money;
    const discount = this.props.discount;
    if (!money && !discount) {
      return null
    } else {
      return (
        <div className={'tip-box'}>
          {
            discount?
            (
              <div>
                <div className="tips">SALE</div>
                <div className="tips-count">{`-${(10-discount.discountRate).toFixed(2)*10}%`}</div>
              </div>):
            (<div>
              <div className="tips">GET</div>
              <div className="tips-count">{'$'+money}</div>
            </div>)
          }
          
        </div>
      )
    }
  }
}


export default ActiveTips