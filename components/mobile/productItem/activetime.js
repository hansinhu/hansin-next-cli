/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react'
var _row = require('antd/lib/row');
var _col = require('antd/lib/col');
import {
  getCountDownTime
} from "../../../static/js/common"


class ActiveTime extends Component {
  state = {
    initTime: 0,
    newTimeArr: []
  }

  componentDidMount() {
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

  //不用的是时候将其解绑
  componentWillUnmount() {
    this.timer && clearInterval(this.timer);
  }


  render() {
    const {
      time
    } = this.props;

    if (!time || !this.state.initTime) {
      return <span></span>
    } else {
      return (
        <div className="time-box">
          <div className="time-inner">
            <_row >
            <_col span={6}><span className="time-count">&nbsp;&nbsp;{this.state.newTimeArr[0]}</span></_col>
            <_col span={6}><span className="time-count">{this.state.newTimeArr[1]}</span></_col>
            <_col span={6}><span className="time-count">{this.state.newTimeArr[2]}</span></_col>
            <_col span={6}><span className="time-count">{this.state.newTimeArr[3]}&nbsp;&nbsp;</span></_col>
          </_row>
          <_row >
            <_col span={6}><span>&nbsp;&nbsp;DAYS</span></_col>
            <_col span={6}><span>HR</span></_col>
            <_col span={6}><span>MIN</span></_col>
            <_col span={6}><span>SEC&nbsp;&nbsp;</span></_col>
          </_row>
          </div>

        </div>
      )

    }



  }
}


export default ActiveTime