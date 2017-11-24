import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default ({
	newTimeArr
}) => (
	<div className="time-box-jewelry">
    <div className="time-inner">
      <Row className="inner-box">
      <Col span={6}>
        <div className="time-count">
          <span>DAYS</span>
          <span className="time">{newTimeArr[0]}</span>
        </div>
      </Col>
      <Col span={6}>
        <div className="time-count">
          <span>HR</span>
          <span className="time">{newTimeArr[1]}</span>
        </div>
      </Col>
      <Col span={6}>
        <div className="time-count">
          <span>MIN</span>
          <span className="time">{newTimeArr[2]}</span>
        </div>
      </Col>
      <Col span={6}>
        <div className="time-count">
          <span>SEC</span>
          <span className="time">{newTimeArr[3]}</span>
        </div>
      </Col>
    </Row>
    
    </div>
  </div>
)