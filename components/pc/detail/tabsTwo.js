import React, {
	Component
} from 'react';



class TabsTwo extends Component {

	render() {
		let attributeList = this.props.attributeList;
		if (attributeList) {
			return (
				<div>
	    			{attributeList.map((item,i)=>(
	        			<div key={i} className={`tabsTwoBox ${i%2==0?'backgroundColor':''}`}>
							<span className="floatStyle1" title={item.name}>{item.name} :</span>
                        	<span className="floatStyle2" title={item.value}>{item.value}</span>
                        </div>
					))}
				    		
	        	</div>
			)
		} else {
			return <span></span>
		}

	}
}

export default TabsTwo