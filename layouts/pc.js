import React from 'react'
import {injectIntl} from 'react-intl'
import Head from 'next/head'
import {basicConfig} from '../static/js/config'

var SkinlOneColor = '../static/css/skin/pc-skin-1/cover-color.css';
var SkinlTwoColor = '../static/css/skin/pc-skin-2/cover-color.css';
var SkinlThreeColor = '../static/css/skin/pc-skin-3/cover-color.css';
var WomenClothingSkin = '../static/css/skin/pc-skin-women-clothing/cover-color.css';
var JewelrySkin = '../static/css/skin/pc-skin-jewelry/cover-color.css';
var BabySkin = '../static/css/skin/pc-skin-baby/cover-color.css';
var ToySkin = '../static/css/skin/pc-skin-toy/cover-color.css';
var HardwareSkin = '../static/css/skin/pc-skin-hardware/cover-color.css';
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
            return WomenClothingSkin
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
    children,
    intl
}) => (
    <div>
        <Head>
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <meta property="fb:app_id" content={basicConfig.appId}/>
            <meta property="og:site_name" content="www.onloon.net"/>
            <meta property="og:type" content="website"/>
            <meta name="keywords" content={children.length?children[0].props.keywords:children.props.keywords}/>
            <meta name="description" content={children.length?children[0].props.description:children.props.description}/>
            <meta id="faceUrl" property="og:url" content={children.length?children[0].props.shareFb.shareUrl:children.props.shareFb.shareUrl}/>
            <meta id="faceTit" property="og:title" content={children.length?children[0].props.shareFb.shareContent:children.props.shareFb.shareContent}/>
            <meta id="faceImg" property="og:image" content={children.length?children[0].props.shareFb.shareImg:children.props.shareFb.shareImg}/>
            <meta id="faceDes" property="og:description" content={children.length?children[0].props.shareFb.shareContent:children.props.shareFb.shareContent}/>
            <link rel='stylesheet' href='../static/css/common.css' />
            <link rel='stylesheet' href='../static/css/index.css' />
            <link rel='stylesheet' href='../static/css/fonts/iconfont.css' />
            <link rel='stylesheet' href='../static/css/skin/pc-default/index.css' />
            {/*如果是ie 就加载polyfill.js   only-ie.css; 根据device加载skin.css;  根据color加载不同color.css*/ }
            {   children.length?(children[0].props.isIeBrowser?<link rel="stylesheet" type="text/css" href="../static/css/only-ie.css" />:null):
                    (children.props.isIeBrowser?<link rel="stylesheet" type="text/css" href="../static/css/only-ie.css" />:null)
            }
            {
                children.length?(children[0].props.isIeBrowser?<script src='../static/js/polyfill.min.js' />:null):
                    (children.props.isIeBrowser?<script src='../static/js/polyfill.min.js' />:null)
            }
            {
                children.length?<link rel='stylesheet' href={selectColor(children[0].props.skin)} />:
                    <link rel='stylesheet' href={selectColor(children.props.skin)} />
            }
            {<script src="https://og6593g2z.qnssl.com/fundebug.0.3.3.min.js"
                     apikey="3f9397b0e3502f8698c3167fef2d40ed51baaff2985a24475e288b43a9a5135b"></script>}
        </Head>
        <div className="main-wrapper">
            {/*<style dangerouslySetInnerHTML={{__html: selectSkin(children.props.skin)}} />*/}
            {children}
        </div>
    </div>
))