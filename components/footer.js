/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {
    Component
} from 'react'
import {
    connect
} from 'react-redux'

import Footer from './pc/footer/footer';
import FooterMobile from './mobile/footer/footer';

class _Footer extends Component {
    constructor(props) {
        super(props);
    };
    componentDidMount() {}
    render() {
        const {
            home
        } = this.props;
        return (
            <div>
                {home.device === 'pc' ? <div id="pFooter"><Footer /></div> : (home.device === 'mobile' ?<div id="mFooter"><FooterMobile /></div>:null)}
            </div>
        )
    }
}

const mapStateToProps = ({
    home
}) => ({
    home
});


export default connect(mapStateToProps)(_Footer)