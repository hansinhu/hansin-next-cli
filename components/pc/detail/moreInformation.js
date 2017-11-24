import React, {
	Component
} from 'react';
import {
	bindActionCreators
} from 'redux'
import {
	connect
} from 'react-redux'
import {
	getHotProducts
} from '../../../actions/products/index'
var Row = require('antd/lib/row')
var Col = require('antd/lib/col')
import ProductItem from '../productItem/index.js'
//import stylesheet from './moreInformation.less'
class MoreInformation extends Component {

	componentDidMount() {
		let params = {
			categoryId: null,
			start: 0,
			size: 4
		};
		this.props.getHotProducts(params);
	}
	render() {
		let list = this.props.hotProducts
		return list && list.length ? (
			<div className="moreInformation">
		    	<h1>HOT PRODUCTS</h1>
		    	{
		    		<Row >{
	                  	list.map((item,index)=>(
	                     	<Col span={6} key={index}>
	                        	<div>
	                          		<ProductItem productinfo={item}/>
	                        	</div> 
	                     	</Col>
	                    	))
	                	}
                	</Row>
		    	}
        	</div>
		) : null
	}
}
const mapStateToProps = ({
	products
}) => ({
	hotProducts: products.hotProducts
});

const mapDispatchToProps = (dispatch) => {
	return {
		getHotProducts: bindActionCreators(getHotProducts, dispatch)
	}
};

export default connect(mapStateToProps, mapDispatchToProps)(MoreInformation)