import React ,{Component} from 'react';

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import {addGoods,deleteGoods } from '../../../actions/detail/index';
var _icon = require('antd/lib/icon');

class ClickLike extends Component {

	state = {
		good:this.props.commentItem.good,
		num:0,
    }
	
	//点赞
	clickLike = () =>{
		let commentId=this.props.commentItem.commentId
		if (this.state.good) {
			//取消点赞
		    this.props.deleteGoods({commentId})
		    	.then(res=>{
                    if(res.data.success){
                        this.setState({
		            		good: !this.state.good,
		            		num: this.state.num-1
		          		})
                    }
                }).catch((error) => {

                });
		} else {
		    //点赞
		    this.props.addGoods({commentId})
		    	.then(res=>{
                    if(res.data.success){
                        this.setState({
			          		good: !this.state.good,
			          		num: this.state.num+1
			        	})
                    }
                }).catch((error) => {
					
                });
		}
	}
	
	
    componentDidMount() {

    }
    render() {
    	let commentItem=this.props.commentItem;
        return(
        	<div>
        		<_icon type={this.state.good?"like":'like-o'} onClick={this.clickLike} style={{fontSize:16,marginLeft:770,cursor:'pointer',color: this.state.good ? '#F4D739' : '#ccc',}}/>{`(${commentItem.goodCount+this.state.num})`}
        	</div>
		)
    }
}

const mapStateToProps = ({
  detail
}) => ({
  detail
});

const mapDispatchToProps = (dispatch) => {
  return {
    addGoods: bindActionCreators(addGoods, dispatch),
    deleteGoods: bindActionCreators(deleteGoods, dispatch),
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(ClickLike)