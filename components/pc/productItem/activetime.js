/**
 * Created by hansin on 2017/8/26.
 */
import React, {
  Component
} from 'react'
import {
  FormattedMessage
} from 'react-intl';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import {
  getCountDownTime
} from "../../../static/js/common"
import dynamic from 'next/dynamic'

const ToyTime = dynamic(
    import ('./activeTimeToy'));
const JewelryTime = dynamic(
    import ('./activeTimeJewelry'));
const DefaultTime = dynamic(
    import ('./activeTimeDefault'));


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
      time,
      skin
    } = this.props;

    if (!time || !this.state.initTime) {
      return null
    }else if(skin == 'toy'){
      return <ToyTime newTimeArr={this.state.newTimeArr}/>
    }else if(skin == 'jewelry' ){
      return <JewelryTime newTimeArr={this.state.newTimeArr}/>
    } else {
      return <DefaultTime newTimeArr={this.state.newTimeArr}/>
    }
  }
}


export default ActiveTime