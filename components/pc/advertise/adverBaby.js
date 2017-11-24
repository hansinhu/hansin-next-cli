import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';

export default ({advList}) => (
	<div className="margint30">
		<Row>
			<Col span={20} offset={2}>
				<Row type="flex" justify="center" >
                    {
                        advList[0]?<Col key={0} className="ad-img-box" span={8}>
							<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
								<a className="ad-img-a ad-img-h" target="_blank" href={advList[0].linkUrl ||'javaScript:void(0);'}>
									<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
										<img className="adver-img" src={advList[0].picUrl}/>
									</LazyLoad>
									<div className="ad-img-cover">
										<div className="ad-cover-inner">
											<div className="inner-font">
												<span>More &gt;</span>
											</div>
										</div>
									</div>
								</a>
							</LazyLoad>
						</Col>:null
                    }
                    {
                        advList[1]?<Col key={1} className="ad-img-box" span={8}>
							<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
								<a className="ad-img-a ad-img-h" target="_blank" href={advList[1].linkUrl ||'javaScript:void(0);'}>
									<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
										<img className="adver-img" src={advList[1].picUrl}/>
									</LazyLoad>
									<div className="ad-img-cover">
										<div className="ad-cover-inner">
											<div className="inner-font">
												<span>More &gt;</span>
											</div>
										</div>
									</div>
								</a>
							</LazyLoad>
						</Col>:null
                    }
                    {
                        advList[2]?<Col key={2} className="ad-img-box" span={8}>
							<div className="ad-img-box" style={{height:"50%"}}>
								<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
									<a className="ad-img-a" target="_blank" href={advList[2].linkUrl ||'javaScript:void(0);'}>
										<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
											<img className="adver-img" src={advList[2].picUrl}/>
										</LazyLoad>
										<div className="ad-img-cover">
											<div className="ad-cover-inner">
												<div className="inner-font">
													<span>More &gt;</span>
												</div>
											</div>
										</div>
									</a>
								</LazyLoad>
							</div>
                            {
                                advList[3]?
									<div className="ad-img-box" style={{height:"50%"}}>
										<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
											<a className="ad-img-a" target="_blank" href={advList[3].linkUrl ||'javaScript:void(0);'}>
												<LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
													<img className="adver-img" src={advList[3].picUrl}/>
												</LazyLoad>
												<div className="ad-img-cover">
													<div className="ad-cover-inner">
														<div className="inner-font">
															<span>More &gt;</span>
														</div>
													</div>
												</div>
											</a>
										</LazyLoad>
									</div>:null
                            }
						</Col>:null
                    }
				</Row>
			</Col>
		</Row>
	</div>
)