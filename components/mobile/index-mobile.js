import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getDecoInfo,getShowCaseInfo} from '../../actions/headers/index';
import {getCouponList,receiveCoupon} from '../../actions/home/index';
import dynamic from 'next/dynamic'
const MCarousel = dynamic(
    import ('./carousel/index'));
const MAdvertise = dynamic(
    import ('./advertise/advertise'));
const MBanner = dynamic(
    import ('./banner'));
const MShowCase = dynamic(
    import ('./showcase'));
const MActiveModal = dynamic(
    import ('./advertise/discountActive'));
// import MCarousel from './carousel/index';
// import MAdvertise from './advertise/advertise';
// import MBanner from './banner';
// import MShowCase from './showcase';
// import MActiveModal from './advertise/discountActive';

class MobileIndex extends Component {
    componentDidMount() {
        this.props.getDecoInfo();
        this.props.getShowCaseInfo();
    }

	render() {
		return (
			<div className="m-home">
				<MCarousel></MCarousel>
				<MAdvertise></MAdvertise>
				<MShowCase></MShowCase>
				<MBanner></MBanner>
				<MActiveModal 
					receiveCoupon={this.props.receiveCoupon} 
					getCouponList={this.props.getCouponList} 
					couponData={this.props.home.couponData}></MActiveModal>
			</div>
		)
	}
}


const mapStateToProps = ({home}) => ({
   home
});

const mapDispatchToProps = (dispatch) => {
    return {
    	getShowCaseInfo: bindActionCreators(getShowCaseInfo, dispatch),
        getDecoInfo: bindActionCreators(getDecoInfo, dispatch),
        getCouponList: bindActionCreators(getCouponList, dispatch),
        receiveCoupon: bindActionCreators(receiveCoupon, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(MobileIndex)