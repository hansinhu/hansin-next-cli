/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {Component} from 'react'
import TopInfo from './topInfo'
import SearchBox from './search'
import {connect} from 'react-redux'

class Header extends Component {
    shouldComponentUpdate(nextProps){
        const moveProcessPropsNow = Object.assign({},
            {logo: this.props.headers.bottomInfo}
        );
        const moveProcessPropsNext = Object.assign({},
            {logo: nextProps.headers.bottomInfo}
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    render() {
        const {headers} = this.props;
        return (
            <div>
                <TopInfo/>
                <SearchBox />
                <div className="logo-wrapper"  style={(headers.showMobileLogo && headers.bottomInfo.logo) ? {display:'block'} : {display:'none'}}>
                    <img className="logo" src={headers.bottomInfo.logo} alt="logo"/>
                </div>
            </div>
        )
    }
}

const mapStateToProps = ({
    headers
}) => ({
    headers
});

const mapDispatchToProps = (dispatch) => {
    return {}
};
export default connect(mapStateToProps, mapDispatchToProps)(Header)