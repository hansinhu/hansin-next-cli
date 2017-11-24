const browser = {


    env: function(req) {

        var u = typeof window === 'undefined' ? req.headers['user-agent'] : navigator.userAgent;

        return {

            trident: u.indexOf('Trident') > -1 && u.indexOf('Mobile') == -1, //IE内核  ,支持IE8以上版本                                 


            webKit: u.indexOf('AppleWebKit') > -1 && u.indexOf('KHTML') > -1, //苹果、谷歌内核 、opera内核  、360内核                                     

            gecko: u.indexOf('Gecko') > -1 && u.indexOf('KHTML') == -1, //火狐内核                                  

            mobile: !!u.match(/AppleWebKit.*Mobile.*/) //是否为移动终端  

                || (!!u.match(/AppleWebKit/) && u.indexOf('KHTML') == -1) || (u.indexOf('Trident') > -1 && u.indexOf('Mobile') > -1) //诺基亚  
                || (u.indexOf('Opera') > -1 && u.indexOf('KHTML') == -1) //opera  
                || (!!u.match(/AppleWebKit/) && u.indexOf('Android') > -1), //针对一些国内平板自带浏览器  参数中没有MObile（苹果自带的有）                     

            ios: !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/), //ios终端                   

            android: u.indexOf('Android') > -1 || u.indexOf('Linux') > -1, //android终端或者uc浏览器                                   

            iPhone: u.indexOf('iPhone') > -1 || u.indexOf('Mac') > -1, //是否为iPhone或者QQHD浏览器                      

            iPad: u.indexOf('iPad') > -1, //是否iPad         

            webApp: u.indexOf('Safari') == -1, //是否web应该程序，没有头部与底部  

            google: u.indexOf('Chrome') > -1

        }

    }

};

export default browser;