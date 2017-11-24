import React, {Component} from 'react'

import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {getDecoInfo , getShowCaseInfo} from '../../actions/headers/index';
import {getCouponList,receiveCoupon} from '../../actions/home/index';
import dynamic from 'next/dynamic'
const AutoCarousel = dynamic(
    import ('./carousel/carousel'));
const Advertise = dynamic(
    import ('./advertise/advertise'));
const Banner = dynamic(
    import ('./banner'));
const ShowCase = dynamic(
    import ('./showcase'));
const ActiveModal = dynamic(
    import ('./advertise/discountActive'));

// import AutoCarousel from './carousel/carousel';
// import Advertise from './advertise/advertise';
// import Banner from './banner';
// import ShowCase from './showcase';
// import ActiveModal from './advertise/discountActive';
class PcIndex extends Component {
    componentDidMount() {
       this.props.getDecoInfo();
       this.props.getShowCaseInfo();
    }

	render() {
		return (
			<div className="pc-home">
				<AutoCarousel />
                <Advertise />
                <ShowCase />
                <Banner />
                <ActiveModal receiveCoupon={this.props.receiveCoupon} getCouponList={this.props.getCouponList} couponData={this.props.home.couponData}/>
			</div>
		)
	}
}

const mapStateToProps = ({home}) => ({
    home
});

const mapDispatchToProps = (dispatch) => {
    return {
        getShowCaseInfo : bindActionCreators(getShowCaseInfo, dispatch),
        getDecoInfo: bindActionCreators(getDecoInfo, dispatch),
        getCouponList: bindActionCreators(getCouponList, dispatch),
        receiveCoupon: bindActionCreators(receiveCoupon, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(PcIndex)