import React, {
    Component
} from 'react';

class TabsOne extends Component {

    render() {
        let content = this.props.content
        return (

            <div className="box">
        		<div dangerouslySetInnerHTML={{__html:content}} />
        	</div>

        )
    }
}

export default TabsOne