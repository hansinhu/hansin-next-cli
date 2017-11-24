import React, {
    Component
} from 'react';

import TabsThreeTop from './tabsThree-top'
import TabsThreeBottom from './tabsThree-bottom'

class TabsThree extends Component {

    render() {
        let data = this.props.data;
        return (
            <div>
        		{data?
        			<TabsThreeTop topData={data}/>:null
        		}
        		{data?
        			<TabsThreeBottom/>:null
        		}
        		
        	</div>
        )
    }
}

export default TabsThree