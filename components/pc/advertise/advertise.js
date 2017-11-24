/**
 * Created by hansin on 2017/8/26.
 */
import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux';
import dynamic from 'next/dynamic'
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'
const ToyAdver = dynamic(
    import ('./adverToy'));
const BabyAdver = dynamic(
    import ('./adverBaby'));
const DefaultAdver = dynamic(
    import ('./adverDefault'));
const JewelryAdver = dynamic(
    import ('./adverJewelry'));

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';



class Advertise extends Component {

    componentWillUpdate() {}

    render() {
        const advList = this.props.footerInfo.fourAd || [];
        const {skin} = this.props;

        if (advList && (advList.length)>0) {
            if(skin=='toy'){
                return <ToyAdver advList={advList}/>
            }else if(skin=='baby'){
                return <BabyAdver advList={advList}/>
            }else if(skin=='jewelry'){
                return <JewelryAdver advList={advList}/>
            }else{
                return <DefaultAdver skin={skin} advList={advList}/>
            }
        } else {
            return null
        }


    }
}

const mapStateToProps = ({headers, home}) => ({
    footerInfo: headers.footerInfo,
    skin: home.skin
});

export default connect(mapStateToProps, null)(Advertise)