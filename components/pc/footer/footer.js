/**
 * Created by zhulijun on 2017/7/17.
 */
import React, {Component} from 'react'
import Link from 'next/link';
import {connect} from 'react-redux'

import { checkLoginStatus ,getCookie} from '../../../static/js/global';
import { getCarNum ,getUserInfo , getMenuList ,setLogined } from '../../../actions/headers/index';
import {bindActionCreators} from 'redux'
import {FormattedMessage} from 'react-intl';

import Row from 'antd/lib/row';
import Col from 'antd/lib/col';
import Icon from 'antd/lib/icon';
import Modal from 'antd/lib/modal';

class Footer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            color: 'white',
            modalVisible: false,
        }
    };

    shouldComponentUpdate(nextProps, nextState) {
        const moveProcessPropsNow = Object.assign({},
            this.props.headers.bottomInfo,
            {language: this.props.home.language},
            {skin: this.props.home.skin},
            {color: this.state.color},
            {modalVisible: this.state.modalVisible}
        );
        const moveProcessPropsNext = Object.assign({},
            nextProps.headers.bottomInfo,
            {language: nextProps.home.language},
            {skin: nextProps.home.skin},
            {color: nextState.color},
            {modalVisible: nextState.modalVisible}
        );
        return JSON.stringify(moveProcessPropsNow) !== JSON.stringify(moveProcessPropsNext);
    }

    componentDidMount() {
        if(checkLoginStatus()) {
            this.props.getCarNum();
            this.props.getUserInfo();
            this.props.setLogined(true)
        }
        if(this.props.headers.fetchMenu){
            this.props.getMenuList();
        }

        let skin = this.props.home.skin;
        let color = this.props.home.color;
        if(skin == 'hardware' || skin == 'baby' || skin == 'toy' || skin == 'default' || skin == 'female' || (skin == 'male' && (color == 'red' || color == 'black'))){
            this.setState({
                color: 'white'
            });
        }else {
            this.setState({
                color: 'grey'
            });
        }
    }

    showModal = () => {
        this.setState({
            modalVisible: true
        });
    };
    handleCancel = () => {
        this.setState({
            modalVisible: false,
        });
    }

    render() {
        const {headers,home} = this.props;
        const info = headers.bottomInfo.shopExtInfo || {};

        return (
            <div className="footer-wrapper">
                <div className="footer-content">
                    <Row gutter={32}>
                        <Col span={7} offset={2} >
                            <div className="col-content0">
                                {home.skin == 'luggage' ?
                                    <div>
                                        <h2 className="title">
                                            <span><FormattedMessage id='footer_about' description='ABOUT' defaultMessage='ABOUT'/></span>
                                        </h2>
                                        <p>{info.intro}</p>
                                        {info.facebookUrl ? (<a href={info.facebookUrl} target="_blank"><img src="../../static/img/footer/facebook_active.png" /></a>) : (<img src={`../../static/img/footer/facebook_${this.state.color}.png`} />)}
                                        {info.twitterUrl ? (<a href={info.twitterUrl} target="_blank"><img src="../../static/img/footer/twitter_active.png" /></a>) : (<img src={`../../static/img/footer/twitter_${this.state.color}.png`} />)}
                                        {info.insUrl ? (<a href={info.insUrl} target="_blank"><img src="../../static/img/footer/instagram_active.png" /></a>) : (<img src={`../../static/img/footer/instagram_${this.state.color}.png`} />)}
                                        {info.pinsUrl ? (<a href={info.pinsUrl} target="_blank"><img src="../../static/img/footer/pinterest_active.png" /></a>) : (<img src={`../../static/img/footer/pinterest_${this.state.color}.png`} />)}
                                        {info.youtobeUrl ? (<a href={info.youtobeUrl} target="_blank"><img src="../../static/img/footer/youtube_active.png" /></a>) : (<img src={`../../static/img/footer/youtube_${this.state.color}.png`} />)}
                                    </div> :
                                    <div>
                                        <span className="title-line" style={home.skin == 'jewelry' ? {display:'block'} : {display:'none'}}></span>
                                        <h2 className="title">
                                            <span className="title-icon"><i className="title-i-1"></i><i></i></span>
                                            <span><FormattedMessage id='footer_support' description='SUPPORT' defaultMessage='SUPPORT'/></span>
                                            {home.skin == 'female' ?
                                                <div>
                                                    <img src={`../../../static/img/footer/female-${home.color}.png`} />
                                                </div> : ''
                                            }
                                        </h2>
                                        <div className="support">
                                            <Icon type="phone" className="font"/>
                                            <p className="p-info">{info.phone}</p>
                                        </div>
                                        <div className="support">
                                            <Icon type="mail"  className="font"/>
                                            <p className="p-info">{info.email}</p>
                                        </div>
                                        <div className="support">
                                            <i className="iconfont icon-whatsapp font"></i>
                                            <p className="p-info">{info.whatsapp}</p>
                                        </div>
                                        <div className="support">
                                            <Icon type="environment-o"  className="font"/>
                                            <p className="p-info">{info.address}</p>
                                        </div>
                                    </div>
                                }
                            </div>
                        </Col>
                        <Col span={7}>
                            <div className="col-content1">
                                <span className="title-line" style={home.skin == 'jewelry' ? {display:'block'} : {display:'none'}}></span>
                                <h2 className="title">
                                    <span className="title-icon"><i className="title-i-1"></i><i></i></span>
                                    <span><FormattedMessage id='footer_links' description='QUICK LINKS' defaultMessage='QUICK LINKS'/></span>
                                    {home.skin == 'female' ?
                                        <div>
                                            <img src={`../../../static/img/footer/female-${home.color}.png`} />
                                        </div> : ''
                                    }

                                </h2>
                                <div className="link-wrapper">
                                    <Link href="/">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav0' description='nav' defaultMessage='HOME1'/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="link-wrapper">
                                    <Link href="/products">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav1' description='nav' defaultMessage='PRODUCTS'/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="link-wrapper">
                                    <Link href="/products?type=top">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav2' description='nav' defaultMessage='TOP SELLING'/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="link-wrapper">
                                    <Link href="/products?type=new">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav3' description='nav' defaultMessage='NEW ARRIVALS'/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="link-wrapper">
                                    <Link href="/company">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav4' description='nav' defaultMessage='COMPANY  PROFILE'/>
                                        </div>
                                    </Link>
                                </div>
                                <div className="link-wrapper">
                                    <Link href="/contact">
                                        <div className="p-extra">
                                            <FormattedMessage id='header_nav5' description='nav' defaultMessage='CONTACT US'/>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </Col>
                        <Col span={7} >
                            <div className="col-content2">
                                {home.skin == 'luggage' ?
                                    <div>
                                        <h2 className="title">
                                            <span><FormattedMessage id='footer_support' description='SUPPORT' defaultMessage='SUPPORT'/></span>
                                        </h2>
                                        <div className="support">
                                            <Icon type="phone" className="font"/>
                                            <p className="p-info">{info.phone}</p>
                                        </div>
                                        <div className="support">
                                            <Icon type="mail"  className="font"/>
                                            <p className="p-info">{info.email}</p>
                                        </div>
                                        <div className="support">
                                            <i className="iconfont icon-whatsapp font"></i>
                                            <p className="p-info">{info.whatsapp}</p>
                                        </div>
                                        <div className="support">
                                            <Icon type="environment-o"  className="font"/>
                                            <p className="p-info">{info.address}</p>
                                        </div>
                                    </div> :
                                    <div>
                                        <span className="title-line" style={home.skin == 'jewelry' ? {display:'block'} : {display:'none'}}></span>
                                        <h2 className="title">
                                            <span className="title-icon"><i className="title-i-1"></i><i></i></span>
                                            <span><FormattedMessage id='footer_about' description='ABOUT' defaultMessage='ABOUT'/></span>
                                            {home.skin == 'female' ?
                                                <div>
                                                    <img src={`../../../static/img/footer/female-${home.color}.png`} />
                                                </div> : ''
                                            }
                                        </h2>
                                        <p>{info.intro}</p>
                                        {info.facebookUrl ? (<a href={info.facebookUrl} target="_blank"><img src="../../static/img/footer/facebook_active.png" /></a>) : (<img src={`../../static/img/footer/facebook_${this.state.color}.png`} />)}
                                        {info.twitterUrl ? (<a href={info.twitterUrl} target="_blank"><img src="../../static/img/footer/twitter_active.png" /></a>) : (<img src={`../../static/img/footer/twitter_${this.state.color}.png`} />)}
                                        {info.insUrl ? (<a href={info.insUrl} target="_blank"><img src="../../static/img/footer/instagram_active.png" /></a>) : (<img src={`../../static/img/footer/instagram_${this.state.color}.png`} />)}
                                        {info.pinsUrl ? (<a href={info.pinsUrl} target="_blank"><img src="../../static/img/footer/pinterest_active.png" /></a>) : (<img src={`../../static/img/footer/pinterest_${this.state.color}.png`} />)}
                                        {info.youtobeUrl ? (<a href={info.youtobeUrl} target="_blank"><img src="../../static/img/footer/youtube_active.png" /></a>) : (<img src={`../../static/img/footer/youtube_${this.state.color}.png`} />)}
                                    </div>
                                }
                            </div>
                        </Col>
                    </Row>
                </div>
                <div className="rights">
                    <span>ONLOON © All Rights Reserved. POWERED BY ONLOON</span>
                    <span className="terms" onClick={this.showModal}>User Terms </span>
                    <span className="service-buy fr">
                        <img src="../../static/img/footer/credit-cards.png" alt="0"/>
                    </span>
                </div>

                <Modal
                    title="Privacy policy"
                    footer={null}
                    onCancel={this.handleCancel}
                    visible={this.state.modalVisible}>
                    <p>Onloon.cn respects your privacy and secures your online safety seriously ,In order to&nbsp; provide you
                        with the best products, efficient customer service, and fast updates, we record a variety of
                        information from your visit to our site. To better protect your privacy, we’d like to explain our
                        online information practices and the way your information is collected and used.</p>

                    <p className="title">Onloon Privacy Policy</p>

                    <p>Thank you for accessing the website of longxi Information Technology Co., Ltd
                        ,(http://www.Onloon.cn/). We respect your privacy and want to protect your personalinformation. To
                        learn more, please read our Privacy Notice.This Privacy Notice explains how we collect, use, and
                        (under certain conditions) disclose your personalinformation. This Privacy Notice also explains the
                        steps we have taken to secure your personal information.Finally, this Privacy Notice explains your
                        options regarding the collection, use, and disclosure of your personal information. By visiting our
                        Site, you accept the practices described in this Notice.This Privacy Notice applies only to this
                        Site. This privacy policy does not necessarily apply to our offline collection of your personal
                        information. Please see below for details. We are not responsible for the content or privacy
                        practices on any non-Onloon.com website to which this Site links to or that links to our site.</p>

                    <p className="title">INFORMATION COLLECTION AND USEAGE</p>

                    <p>1. Information Collection. We collect information from you in several different ways on this Site.
                        One goal in collecting personal information from you is to provide an efficient, meaningful, and
                        customized experience.For example, we can use your personal information to:

                        * Help make this Site easier for you to use by not having to enter information once again
                        * Help you quickly find information, products, and services.
                        * Help us create content on this Site that is most relevant to you.
                        * Alert you to new information, products, and services that we offer.</p>

                    <p> (a) Registration and Ordering. Before using certain parts of this Site or ordering products, you
                        must complete online registration. During registration, you will be prompted to provide us with
                        certain personal information,including your name, living address, gender, shipping and billing
                        address(es), phone number, email address, and credit card number.These kinds of personal information
                        are used for billing purposes, to fulfill your orders,to communicate with you about your order and
                        our site, and for internal marketing purposes. If we encounter a problem when processing your order,
                        we may use the personal information you provide to contact you.</p>

                    <p> (b) Email Addresses. Several locations of the Site permit you to enter your email address for
                        purposes including:free promotional notices;to answer your request to inform you with a new brand,or
                        new product style;to sign up for our email newsletter. Your participation in a contest is completely
                        voluntary, and you may choose whether to participate and disclose information to us. We use this
                        information to notify contest winners and to award prizes.We may post the names and cities of
                        contest winners on our Site.</p>

                    <p> (c) Cookies and Other Technology.Like many sites,this Site employs cookies and web beacons(also
                        known as clear GIF technology or "action tags") to speed your navigation of the Site, recognize you
                        and your access privileges, and track your Site usage.</p>

                    <p> (i) Cookies are small pieces of information that are stored as text files by your Internet browser
                        on your computer's hard drive. Most Internet browsers are initially set to accept cookies. You can
                        set your browser to refuse cookies from websites or to remove cookies from your hard drive, but if
                        you do, you will not be able to access or use portions of this Site. We have to use cookies to
                        enable you to select products, place them in an online shopping cart, and to purchase those
                        products. If you do this, we keep a record of your browsing activity and purchase.THIS SITE'S
                        COOKIES DO NOT AND CANNOT INFILTRATE A USER'S HARD DRIVE TO GATHER A USER'S CONFIDENTIAL
                        INFORMATION. Our cookies are not "spyware."</p>

                    <p> (ii) Web beacons assist in delivering cookies and help us determine whether a web page on this Site
                        has been viewed and, if so, how many times. For example, any electronic image on this Site, such as
                        an ad banner, can&nbsp; function as a web beacon.</p>

                    <p>(iii) We may use third-party advertising companies to help us tailor site content to users or to
                        serve ads on our behalf. These companies may employ cookies and web beacons to measure advertising
                        effectiveness (such as which web pages are visited or what products are purchased and in what
                        amount). Any information that these third parties collect via cookies and web beacons is not linked
                        to any personal information collected by us.

                    </p>

                    <p> (d) Log Files.As is true of most websites,the Site server automatically recognizes the Internet URL
                    from which you access this Site. We may also log your Internet protocol ("IP") address, Internet
                    service provider, and date/time stamp for system administration, order verification, internal
                    marketing, and system troubleshooting purposes. (An IP address may indicate the location of your
                    computer on the Internet.)</p>

                    <p> (e) Age. We respect children's privacy. We do not knowingly or intentionally collect personal
                        information from children under age 13. Elsewhere on this Site, you have represented and warranted
                        that you are either 18 years of age or using the Site with the supervision of a parent or guardian.
                        If you are under the age of 13, please do not submit any personal information to us, and rely on a
                        parent or guardian to assist you.</p>

                    <p>(f) Product Reviews. You may choose to submit a product review. If you post a review, we will ask for
                        your email address and geographic location. If you submit a review, your geographic location will be
                        visible to other users (your email address will be kept private). Also, any personally identifiable
                        information that you submit as part of the review can be read or used by other visitors to the Site.
                        We are not responsible for any personally identifiable information that you choose to submit as part
                        of your review. We believe you can post a helpfulreview without disclosing any personal information.
                    </p>

                    <p className="title">2. Information Use and Disclosure.</p>

                    <p>(a) Internal Use.We use your personal information to process your order and provide you with
                        customer service.We may internally use your personal information to improve our Site's content and
                        layout, to improve our outreach and for our own marketing efforts (including marketing our services
                        and products to you), and to determine general marketplace information about visitors to this Site.</p>

                    <p>(b) Communications with You: We will use your personal information to communicate with you about our
                        site,and your orders and deliveries. Also, we may send you a confirmation email when you register
                        with us. We may send you a service-related announcement on the rare occasions when it is necessary
                        (for example,if we must temporarily suspend our service for maintenance.) Also, you may submit your
                        email address for reasons such as to request us to notify you when we receive a new brand, new
                        product style, or product;to sign up for our email newsletter and special offers. If you submit your
                        email address, we will use it to deliver the information to you. We always permit you to unsubscribe
                        or opt out of future emails (see opt out section below for more details). Because we have to
                        communicate with you about orders that you choose to place,you cannot opt out of receiving emails
                        related to your orders.</p>

                    <p>(c) External Use. We want to provide you with excellent service and to offer you a great selection —
                        we primarily sell merchandise, not information. We do not sell, rent, trade, license, or otherwise
                        disclose your specific personal information or financial information to anyone, except that:</p>

                    <p>(i) As do most catalog and Internet wholesalers, we sometimes use others to perform specific
                        functions on our behalf. When we disclose information to these service providers, we disclose
                        information to help them to perform their service. For example, in order to deliver products to you,
                        we must share some information. We partner with third parties (such as DHL, and UPS) to ship
                        products, to ensure delivery, and so that we can obtain feedback, improve the quality of our
                        service, and measure and improve the quality of the service of the third party. In the example of
                        shippers, we provide them some personally identifiable information such as your name, shipping
                        address, email, and phone number.</p>

                    <p>(ii) Similarly, to help you buy products and provide customer service to you, we must provide your
                        credit card number to financial-services corporations such as credit-card processors and issuers.
                        When we submit your credit card number for authorization, we use state-of-the-art data encryption to
                        protect your information. (More on this below in the Data Security section.)</p>

                    <p>(iii) We may be required to disclose such information in response to requests from law-enforcement
                        officials conducting investigations, subpoenas, a court order, or if we are otherwise required to
                        disclose such information by law. We also will release personal information where disclosure is
                        necessary to protect our legal rights, enforce our Terms of Use or other agreements, or to protect
                        ourselves or others. For example, we may share information to reduce the risk of fraud or if someone
                        uses or attempts to use our Site for illegal reasons or to commit fraud.</p>

                    <p>(iv) We will not sell (or trade or rent) personally identifiable information to other companies as
                        part of ourregular course of business. However, it is possible that we might acquire or merge with
                        or be acquired by another company or that we might dispose of some or all of our assets. If that
                        happens, your personalinformation may be disclosed to another company, but that disclosure will be
                        subject to the Privacy Notice in effect.</p>

                    <p>(v) We may share non-personal information (such as the number of daily visitors to a particular web
                        page,or the size of an order placed on a certain date) with third parties such as advertising
                        partners. This information does not directly personally identify you or any user.</p>

                    <p className="title"> DATA SECURITY</p>

                    <p>This Site incorporates physical, electronic, and administrative procedures to safeguard the
                        confidentiality of your personal information, including Secure Sockets Layer ("SSL") for all
                        financial transactions through this&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Site. We use SSL encryption to protect your personal
                        information online, and we also take several steps to protect your personal information in our
                        facilities. Access to your personal information is restricted. Only employees who need access to
                        your personal information to perform a specific job are granted access to your personal information.
                        Finally, we rely on third-party service providers for the physical security of some of our computer
                        hardware. We believe that their security procedures are adequate. For example, when you visit our
                        Site, you access servers that are kept in a secure physical environment, behind a locked cage and an
                        electronic firewall.</p>

                    <p>While we use industry-standard precautions to safeguard your personal information, we cannot
                        guarantee complete security. 100% complete security does not presently exist anywhere online or
                        offline.</p>

                    <p className="title"> OPT OUT/CORRECTIONS</p>

                    <p> Upon your request, we will (a) correct or update your personal information; (b) stop sending emails
                        to your email address; and/or (c) disable your account to prevent any future purchases through that
                        account.You can make these requests at the customer information section, or by telephoning, or
                        emailing your request to Onloon's Customer Support department at service@Onloon.com . Please do not
                        email your credit card number or other sensitive information.</p>

                    <p className="title"> OFFLINE COLLECTION, USE &amp; DISCLOSURE OF INFORMATION</p>

                    <p> As you might expect from Onloon.com the majority of information that we collect is obtained through
                        our Site, and this Privacy Policy applies only to that online collection of personal information. We
                        also try to protect the privacy of you personal information that is collected offline. For example,
                        customers may call us to place an order or to ask questions. During the call, we will ask only for
                        the personal information we need in order to place the order or to answer the question. When we need
                        to store information (such as order information), we will enter it into our database through SSL
                        encryption (See the Data Security section above for more information). There are other ways we could
                        learn of personal information offline (for example,we suppose someone could send us a letter
                        including some return address information), and this Policy does not discuss or try to predict all
                        of those methods or uses. As mentioned, we primarily sell merchandise, not information, and we will
                        try to treat offline collection, uses, and disclosures consistently with our relevant online
                        practices.</p>

                    <p className="title"> UPDATES TO THIS POLICY</p>

                    <p>If we change or update this Privacy Notice, we will post changes and updates on this Site so that
                        you will always be aware of what information we collect, use, and disclose. We encourage you to
                        review this Privacy Notice from time to time so you will know if the Privacy Notice has been changed
                        or updated. If you have any questions about the Privacy Notice, please contact us at (86)571
                        88334512.www.Onloon.com is aware that the security of your private information from the use of our
                        website is an important concern. We take the protection of your personal data very seriously.
                        Therefore we would like you to know what data we maintain and what data we discard. With this
                        privacy notice, we would like to inform you about our security measures.Collection and processing of
                        personal data We collect personal data only when you provide it to us, through registration,
                        completion of forms or e-mails,as part of an order for products or services, inquiries or requests
                        about materials being ordered and similar situations in which you have chosen to provide the
                        information to us. The database and its contents remain at our company and stay with data processors
                        or servers acting on our behalf and responsible to us. Your personal data will not be passed on by
                        us for use by third parties in any form whatsoever, unless we have obtained your consent or are
                        legally required to do so. We will retain control of and responsibility for the use of any personal
                        data you disclose to us. Some of this data may be stored or processed at computers located in other
                        jurisdictions, such as the United States, whose data protection laws may differ from the
                        jurisdiction in which you live. In such cases, we will ensure that appropriate protections are in
                        place to require the data processor in that country to maintain protections on the data that are
                        equivalent to those that apply in the country in which you live.</p>

                    <p className="title">Purposes of Use</p>

                    <p>The data we collect will only be used for the purpose of supplying you with the requested products
                        or services or for other purposes for which you have given your consent, except where otherwise
                        provided by law.</p>

                    <p className="title">What do we use your information for?</p>

                    <p className="title">Any of the information we collect from you may be used in one of the following ways:</p>

                    <p> • To personalize your experience
                        (your information helps us to better respond to your individual needs)</p>

                    <p> • To improve our website</p>
                    <p>(we continually strive to improve our website offerings based on the information and feedback we
                        receive from you)</p>

                    <p> • To improve customer service</p>
                    <p>(your information helps us to more effectively respond to your customer service requests and support
                        needs)</p>

                    <p> • To process transactions</p>
                    <p> Your information, whether public or private, will not be sold, exchanged, transferred, or given to
                        any other company for any reason whatsoever, without your consent, other than for the express
                        purpose of delivering the purchased product or service requested by the customer.</p>

                    <p> • To send periodic emails</p>

                    <p> The email address you provide for order processing, may be used to send you information and updates
                        pertaining to your order, in addition to receiving occasional company news, updates, related product
                        or service information, etc.</p>

                    <p>Note: If at any time you would like to unsubscribe from receiving future emails, we include detailed
                        unsubscribe instructions at the bottom of each email.</p>

                    <p>• To administer a contest, promotion, survey or other site feature</p>
                    <p> Choice and Opt-Out
                        If you no longer wish to receive the Company's promotional communications, you may "opt-out" of
                        receiving them by following the instructions included in each communication or by e-mailing the
                        Company</p>
                </Modal>
            </div>
        )
    }
}

const mapStateToProps = ({
    headers,
    home
}) => ({
    headers,
    home
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCarNum: bindActionCreators(getCarNum, dispatch),
        getUserInfo: bindActionCreators(getUserInfo, dispatch),
        getMenuList: bindActionCreators(getMenuList, dispatch),
        setLogined: bindActionCreators(setLogined ,dispatch)
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(Footer)