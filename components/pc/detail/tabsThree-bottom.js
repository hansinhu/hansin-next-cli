import React, {
    Component
} from 'react';

import {
    bindActionCreators
} from 'redux'
import TabsEmpty from './tabsEmpty'
import {
    basicConfig
} from '../../../static/js/config'
import {
    fSpecStr
} from '../../../static/js/common'
import Router from 'next/router'
import {
    connect
} from 'react-redux';
import {
    getCommentList
} from '../../../actions/detail/index';

import {
    getNewDate
} from '../../../static/js/global'
import ClickLike from './clickLike'
//import { Pagination } from 'antd'
import Pagination from 'antd/lib/pagination'
var _icon = require('antd/lib/icon');
var _rate = require('antd/lib/rate');


class TabsThreeBottom extends Component {
    changePage = (page, pageSize) => {
        this.props.getCommentList({
            orderby: 'newest',
            itemId: Router.query.itemId, //'d6bf9be0fce141afadfa83dad3c9384c',
            pageNum: page,
            pageSize: pageSize
        })
        
        this.getScrollTop()
    }
    
    getScrollTop = () =>{
	    document.documentElement.scrollTop=1067
	}

    render() {
        let comtentList = this.props.commentList;
        let listData = [];
        if (comtentList.list) {
            for (var i = 0; i < comtentList.list.length; i++) {
                listData.push(comtentList.list[i])
            }
        }
        return (
            <div>
            	<div onScroll={this.getScrollTop}>
            		{	
	        			listData!=''?(
	        				listData.map((item,i)=>{
		        				return <div className="bottomBox" key={i}>
						        			<div className="bottomLeftBox">
						        				{
								    				<_rate style={{fontSize:16}} allowHalf disabled defaultValue={item.score || 0} />
								    			}
						        				<p className="bought">{item.user?item.user.nickname:''}</p>
						        				
						        				<p className="say">{fSpecStr(item.speckeys)}</p>
						        			</div>
						        			<div className="bottomRightBox">
						        				<div className="rightBox_Top">
						        					<p className="date">{item.gmtCreate?getNewDate(new Date(item.gmtCreate)):0}</p>
						        					<ClickLike commentItem={item}></ClickLike>
						        				</div>
						        				<p className="content">{item.content}</p>
						        				{
						        					item.reply?(
						        						<p className="content reply" style={{background:'#f2f2f2'}}><img className="replyImg" src="../../static/img/shapeCopy.png"/><span className="replyFont">&nbsp;Reply:&nbsp;&nbsp;</span>{item.reply.content}</p>
						        					):null
						        				}
						        				
						        			</div>
						        			<span className="bottomLine"></span>
						        		</div>
	        				})
	        			):<TabsEmpty/>
	        		}
            	</div>
        		
        		{
        			listData!=''?<Pagination defaultCurrent={comtentList.pageNum} total={comtentList.total} pageSize={comtentList.pageSize} onChange={(page, pageSize)=>{this.changePage(page, pageSize)}}/>:null
        		}
        	</div>
        )
    }
}

const mapStateToProps = ({
    detail
}) => ({
    commentList: detail.commentList
});

const mapDispatchToProps = (dispatch) => {
    return {
        getCommentList: bindActionCreators(getCommentList, dispatch),
    }
};
export default connect(mapStateToProps, mapDispatchToProps)(TabsThreeBottom)