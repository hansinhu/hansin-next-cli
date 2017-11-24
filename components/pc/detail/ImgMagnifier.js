
import React, {
    Component
} from 'react'
import LazyLoad from 'react-lazyload'
import PlaceholderComponent from '../../Placeholder'
var _icon = require('antd/lib/icon');

class ImgMagnifier extends Component {
    constructor(){
        super();
        this.state = {
            upBtnDisable: false,
            downBtnDisable: false,
            upNum:0,
            downNum:0
        }
    }
    componentDidMount() {
        let mask = document.getElementById('mask');
        let style = mask.currentStyle ? mask.currentStyle : window.getComputedStyle(mask, null);
        this.setState({
            maskWidth: style.height.split('px')[0]
        })
    }

    changeStatus(str) {
        document.getElementById('mask').style.display = str;
        document.getElementById('bigImgCon').style.display = str;
    }

    offsetTop ( elem ){
        let top = elem.offsetTop;
        let parent = elem.offsetParent;
        while(parent){
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        return top;
    };
    offsetLeft ( elem ){
        let left = elem.offsetLeft;
        let parent = elem.offsetParent;
        while( parent){
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        return left;
    };

    mouseMove(event) {
        let mainImg = document.getElementById('mainImg'),
            mask = document.getElementById('mask'),
            bigImg = document.getElementById('bigImg'),
            showImgHeight = 600;
        if(document.querySelector('#mainImg img') && document.querySelector('#mainImg img').clientHeight) {
            showImgHeight = document.querySelector('#mainImg img').clientHeight > 600 ? 600 : document.querySelector('#mainImg img').clientHeight;
        }
        //计算放大镜的left值和top值
        let left = event.pageX - this.offsetLeft(mainImg) - this.state.maskWidth/2;
        let top = event.pageY - this.offsetTop(mainImg) - this.state.maskWidth/2;

        if(left < 0){
            left = 0
        }else if(left > mainImg.clientWidth - mask.clientWidth){
            left = mainImg.clientWidth- mask.clientWidth;
        }

        if(top < 0) {
            top = 0;
        } else if(top > mainImg.clientHeight - mask.clientHeight){
            top = mainImg.clientHeight - mask.clientHeight;
        }
        mask.style.left = left+'px';
        mask.style.top = top+'px';
        let rate = bigImg.clientWidth/mainImg.clientWidth;
        bigImg.style.left = -rate*left+'px';
        bigImg.style.top = -rate*top+(600-showImgHeight)+'px';
    }

    changeShowImg(index,that) {
        let aImg = document.querySelectorAll('#PDImgList li');
        aImg[that.props.index].classList.remove('active');
        aImg[index].classList.add('active');
        that.props.changeMainImg(index)
    }

    moveImgList(dirction) {
        let tar = document.getElementById('PDImgList');
        let startTop = 23;
        let curTop = tar.offsetTop;
        let firstFlag = false;
        let upNum = 0;
        //可操作性且是第一次
        if(this.props.image_list.length > 5 && this.state.upNum ==0 && this.state.downNum == 0) {
            firstFlag = true;
            upNum = this.props.image_list.length-5;
            this.setState({upNum: this.props.image_list.length-5, downBtnDisable: true})
        }
        if(dirction == 'up') {
            if(firstFlag) {
                this.setState({upBtnDisable: upNum-1? false : true, downBtnDisable: false, upNum:upNum-1, downNum:this.state.downNum+1});
                tar.style.top = (curTop - 113)+'px';
                return false;
            }
            if(this.state.upNum){ //tar.clientHeight - (startTop-curTop) > 556
                this.setState({upBtnDisable: this.state.upNum-1? false : true, downBtnDisable: false, upNum:this.state.upNum-1, downNum:this.state.downNum+1});
                tar.style.top = (curTop - 113)+'px';
            }else {
                this.setState({upBtnDisable: true})
            }
        }else{
            if(this.state.downNum) { //tar.clientHeight - 556 - startTop-curTop > 556
                this.setState({downBtnDisable: this.state.downNum-1? false : true, upBtnDisable: false, upNum:this.state.upNum+1, downNum:this.state.downNum-1});
                tar.style.top = (curTop + 113)+'px';
            }else {
                this.setState({downBtnDisable: true})
            }
        }
    }

    render() {
        return (
            <div className="magnifier-wrap">
                <div className="magnifier-con">
                    <div className="img-list-con">
                        <button className="up-arrow arrow-btn" disabled={this.state.upBtnDisable} onClick={()=>{this.moveImgList('up',this)}} type="button"><_icon type="up"></_icon></button>
                        <button className="down-arrow arrow-btn" disabled={this.state.downBtnDisable} onClick={()=>{this.moveImgList('down',this)}} type="button"><_icon type="down"></_icon></button>
                        <ul className="img-list" id="PDImgList">
                            {this.props.image_list.map((item,index) => (
                                <li key={item+index} onClick={() => {this.changeShowImg(index,this)}} className={index == 0 ? 'active' : ''}>
                                    {/*<LazyLoad placeholder={<PlaceholderComponent />}>*/}
                                        <img src={item} alt="img" />
                                    {/*</LazyLoad>*/}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="img-big" id="mainImg" onMouseOver={() => {this.changeStatus('block')}} onMouseOut={() => {this.changeStatus('none')}}
                        onMouseMove={(event) => {this.mouseMove(event)}}>
                        <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                            <img src={this.props.image_list[this.props.index] || null}/>
                        </LazyLoad>
                        <div className="mask" id="mask"></div>
                    </div>
                </div>
                <div className="big-img-com" id="bigImgCon">
                    <LazyLoad offset={[-200, 0]} placeholder={<PlaceholderComponent />} >
                        <img id="bigImg" src={this.props.image_list[this.props.index] || null} alt="img"/>
                    </LazyLoad>
                </div>

            </div>
        );
    }
}

export default ImgMagnifier