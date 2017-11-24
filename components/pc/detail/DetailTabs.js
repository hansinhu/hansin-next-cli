import React, {
	Component
} from 'react';



import TabsOne from './tabsOne'
import TabsTwo from './tabsTwo'
import TabsThree from './tabsThree'
import TabsEmpty from './tabsEmpty'

import Tabs from 'antd/lib/tabs';
//var _tabs = require('antd/lib/tabs');

const TabPane = Tabs.TabPane;



class DetailTabs extends Component {

	state = {
		isShowOneEmpty: false,
		isShowTwoEmpty: true,
		isShowThreeEmpty: true,

	}

	render() {
		let data = this.props.data;
		return (
			<div className="tabs">
        		<Tabs defaultActiveKey="1" onchange={()=>{}}>
				    <TabPane tab="DETAILS" key="1">
				    	{this.props.data.content?<TabsOne content={this.props.data.content}/>:<TabsEmpty/>}
				    </TabPane>
				    <TabPane tab="MORE INFORMATION" key="2">
				    	{
				    		this.props.data.attributeList!=''?
				    		<TabsTwo attributeList={data.attributeList}/>:
				    		<TabsEmpty/>
				    	}
				    </TabPane>
				    <TabPane tab={`REVIEWS(${data.comment!=undefined?data.comment.totalCount:0})`} key="3">
				    		<TabsThree data={data}/>
				    </TabPane>
				</Tabs>
        	</div>

		)
	}
}
export default DetailTabs