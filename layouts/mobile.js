/**
 * Created by zhulijun on 2017/7/17.
 */

import React from 'react'
import {injectIntl} from 'react-intl'
import Head from 'next/head'
import {basicConfig} from '../static/js/config'

var SkinlOneColor = '../static/css/skin/mobile-skin-1/cover-color.css';
var SkinlTwoColor = '../static/css/skin/mobile-skin-2/cover-color.css';
var SkinlThreeColor = '../static/css/skin/mobile-skin-3/cover-color.css';
var WomemClothingSkin = '../static/css/skin/mobile-skin-women-clothing/cover-color.css';
var JewelrySkin = '../static/css/skin/mobile-skin-jewelry/cover-color.css';
var BabySkin = '../static/css/skin/mobile-skin-baby/cover-color.css';
var ToySkin = '../static/css/skin/mobile-skin-toy/cover-color.css';
var HardwareSkin = '../static/css/skin/mobile-skin-hardware/cover-color.css';
const selectColor = (type) => {
    switch (type) {
        case 'c3':
            return SkinlOneColor
            break;
        case 'luggage':
            return SkinlTwoColor
            break;
        case 'male':
            return SkinlThreeColor
            break;
        case 'female':
            return WomemClothingSkin
            break;
        case 'jewelry':
            return JewelrySkin
            break;
        case 'baby':
            return BabySkin
            break;
        case 'toy':
            return ToySkin
            break;
        case 'hardware':
            return HardwareSkin
            break;
        default:
            return SkinlOneColor
    }
}

export default injectIntl(({
    children
}) => (
    <div>
        <Head>
            <title>mobile</title>
            <meta property="fb:app_id" content={basicConfig.appId}/>
            <meta property="og:site_name" content="www.onloon.net"/>
            <meta property="og:type" content="website"/>
            <meta id="faceUrl" property="og:url" content={children.length?children[0].props.shareFb.shareUrl:children.props.shareFb.shareUrl}/>
            <meta id="faceTit" property="og:title" content={children.length?children[0].props.shareFb.shareContent:children.props.shareFb.shareContent}/>
            <meta id="faceImg" property="og:image" content={children.length?children[0].props.shareFb.shareImg:children.props.shareFb.shareImg}/>
            <meta id="faceDes" property="og:description" content={children.length?children[0].props.shareFb.shareContent:children.props.shareFb.shareContent}/>
            <meta content="yes" name="apple-mobile-web-app-capable" />
            <meta content="yes" name="apple-touch-fullscreen" />
            <meta content="telephone=no" name="format-detection" />
            <script src="https://og6593g2z.qnssl.com/fundebug.0.3.3.min.js"
                    apikey="3f9397b0e3502f8698c3167fef2d40ed51baaff2985a24475e288b43a9a5135b"></script>
            <script src="../static/js/px2rem.js"></script>
            <link rel='stylesheet' href='../static/css/mobile.css' />
            <link rel='stylesheet' href='../static/css/fonts/iconfont.css' />
            <link rel='stylesheet' href='../static/css/skin/mobile-default/index.css' />
            {
                children.length?<link rel='stylesheet' href={selectColor(children[0].props.skin)} />:
                <link rel='stylesheet' href={selectColor(children.props.skin)} />
            }
            {/*<script src="//as.alipayobjects.com/g/component/fastclick/1.0.6/fastclick.js"></script>*/}

        </Head>
    
        <div className="main-wrapper">
            {/*<style dangerouslySetInnerHTML={{__html: selectSkin(children.props.skin)}} />*/}
            <div className="mobile-content">
                {children}
            </div>
        </div>

    </div>
))