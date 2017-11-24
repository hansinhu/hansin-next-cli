
export default ({
	discount,brokerage
}) => (
	<div className={'tip-box'}>
      {
        discount?
        (
        <div className="tips">
			<div className="toy-tip-inner">{`${(10-discount.discountRate).toFixed(2)*10}%`}</div>
			<div className="toy-tip-inner">OFF</div>
         </div>):
        (<div className="tips">
          	<div className="toy-tip-inner">{`$${brokerage}`}</div>
          	<div className="toy-tip-inner">GET</div>
          </div>)
      }
    </div>
)