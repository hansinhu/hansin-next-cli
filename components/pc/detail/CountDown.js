import React ,{Component} from 'react';
import Link from 'next/link'
//import stylesheet from './countDown.less'
import { getCountDownTime } from "../../../assets/js/common"

class TabsThree extends Component {

	state = {
		initTime: 0,
    	newTimeArr: []
    }
    componentDidMount() {
    	if(this.props.time){
    		this.setState({
		      	initTime: this.props.time
		    })	
	    	if (!this.timer) {
		      	this.timer = setInterval(
		        	() => {
			          if (this.state.initTime == 0) return;
			          this.setState({
			            newTimeArr: getCountDownTime(this.state.initTime),
			          })
			          let nextTime = this.state.initTime - 1;
			          this.setState({
			            initTime: nextTime
			          })
		        	},
		        	1000
		      	);
		    }
    	}
    }
    
    //不用的是时候将其解绑
  	componentWillUnmount() {
    	this.timer && clearInterval(this.timer);
  	}

    render() {
    	const {
	      time
	    } = this.props;
	    if (!time) {
	      return <span></span>
	    } else {
	        return(
	        	<div className="timeBox">
					<div className="time">
						<div className="leftTextBox">
							<p className="title">DON'T MISS OUT!</p>
							<p className="p1">Shop all our top brands now</p>
						</div>
						<div className="centerTimeBox">
							<dl>
								<dt>{this.state.newTimeArr[0]}</dt>
								<dd>DAYS</dd>
							</dl>
							<dl>
								<dt>{this.state.newTimeArr[1]}</dt>
								<dd>HOURS</dd>
							</dl>
							<dl>
								<dt>{this.state.newTimeArr[2]}</dt>
								<dd>MINUTES</dd>
							</dl>
							<dl>
								<dt>{this.state.newTimeArr[3]}</dt>
								<dd>SECONDS</dd>
							</dl>
						</div>
						<div className="rightAllBox">
							<Link prefetch href='/products'><a>VIEW ALL EVENTS  >></a></Link>
						</div>
					</div>
	        	</div>
			)
	    }
    }
}

export default TabsThree