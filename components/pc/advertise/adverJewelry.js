import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default ({advList}) => (
    <div className="margint30">
        <Row type="flex" justify="center">
            {
                advList.map((item,i)=>{
                    return <Col key={i} className="ad-img-box" span={6}>
                        <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                            <a className="ad-img-a" target="_blank" href={item.linkUrl ||'javaScript:void(0);'}>
                                <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                                    <img className="adver-img" src={item.picUrl}/>
                                </LazyLoad>
                                <div className="ad-img-cover-jewelry">
                                    <div className="ad-cover-inner">
                                        <div className="inner-font">
                                            <span>SHOP NOW</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </LazyLoad>
                    </Col>
                })
            }
        </Row>
    </div>
)