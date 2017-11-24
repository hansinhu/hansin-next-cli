
export default ({
	discount,brokerage
}) => (
	<div className={'tip-box-skint'}>
    {
      discount?
      (
        <div>
          <div className="tips-skint">{`SALE -${(10-discount.discountRate).toFixed(2)*10}%`}</div>
        </div>):
      (<div>
        <div className="tips-skint">GET {`$${brokerage}`}</div>
      </div>)
    }
    
  </div>
)