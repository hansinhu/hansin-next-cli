
export default ({
	discount,brokerage
}) => (
	<div className={'tip-box'}>
      {
        discount?
        (
        <div className="bay-tips">
			<div className="toy-tip-count">{`-${(10-discount.discountRate).toFixed(2)*10}%`}</div>
			<div className="toy-tip-font">SALE</div>
         </div>):
        (<div className="bay-tips">
          	<div className="toy-tip-count">{`$${brokerage}`}</div>
          	<div className="toy-tip-font">GET</div>
          </div>)
      }
    </div>
)