import React ,{Component} from 'react';

var _rate = require('antd/lib/rate');

class TabsThreeTop extends Component {

    render() {
    	let data=this.props.topData;
    	let dataList=[]
		if(data.commentInfoVO) {
            for(var i=data.commentInfoVO.length-1;i>=0;i--){
                dataList.push(data.commentInfoVO[i])
            }
		}
		let emptyList=[5,4,3,2,1]
		let score = data.comment?(data.comment.avgscore || 0):null;
        //score >= Math.floor(score) + 0.5 ? score=Math.floor(score) + 0.5 : null;
        score = (score%1) > 0.5 ? score=Math.floor(score) + 1 : (score%1) > 0?Math.floor(score) + 0.5:score ;
        return(
        	<div>
        		<div className='contentStyle'>
		    		<div className="leftBox">
		    			<span className='spanStyle'>Average Rating</span>
		    			<_rate style={{fontSize:16}} allowHalf disabled value={score} />
		    			<span className='spanStyle'>{`${data.comment?(data.comment.avgscore).toFixed(2):null} out of 5`}</span>
		    		</div>
		    		<div className="rightBox">
		    			{
		    				
		    					dataList!=''?(
		    						dataList.map((item,i)=>(
				    					<div key={i}>
									    			<span className="starStyle">{`${item.score} Stars`}</span>
									    			<span className="Rectangle">
									    				<span className="Rectangle glassStyle" style={{width:(item.count/data.commentCount)*100+'%'}}></span>
									    			</span>
									    			<span className="numStyle">{item.count}</span>
									    		</div>
                            		))
		    					):(
		    						emptyList.map((item,i)=>(
				    					<div key={i}>
									    			<span className="starStyle">{`${item} Stars`}</span>
									    			<span className="Rectangle">
									    			</span>
									    			<span className="numStyle">0</span>
									    		</div>
                            		))
		    					)
		    			}
		    		</div>
		    		
		    	</div>
		    	<span className="line"></span>
        	</div>
		)
    }
}

export default TabsThreeTop