import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {
  FormattedMessage
} from 'react-intl';

export default ({
	newTimeArr
}) => (
	<div className="time-box">
    <div className="time-inner">
      <Row className="inner-box">
      <Col span={6}><span className="time-count">{newTimeArr[0]}</span></Col>
      <Col span={6}><span className="time-count">{newTimeArr[1]}</span></Col>
      <Col span={6}><span className="time-count">{newTimeArr[2]}</span></Col>
      <Col span={6}><span className="time-count">{newTimeArr[3]}</span></Col>
    </Row>
    <Row className="inner-box">
      <Col span={6}><span><FormattedMessage id='day' description='day' defaultMessage='DAYS'/></span></Col>
      <Col span={6}><span><FormattedMessage id='hr' description='hr' defaultMessage='HR'/></span></Col>
      <Col span={6}><span><FormattedMessage id='min' description='min' defaultMessage='MIN'/></span></Col>
      <Col span={6}><span><FormattedMessage id='sec' description='sec' defaultMessage='SEC'/></span></Col>
    </Row>
    </div>
  </div>
)