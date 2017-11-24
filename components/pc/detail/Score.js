
import React, {
    Component
} from 'react'

var _icon = require('antd/lib/icon');
var Rate = require('antd/lib/rate');

class Score extends Component {

    render() {
        let score = this.props.comment.avgscore || 0;
        score = (score%1) > 0.5 ? score=Math.floor(score) + 1 : (score%1) > 0?Math.floor(score) + 0.5:score ;
        return (
            <div className="star-list">
                <Rate className="stars" disabled allowHalf value={score} />
                <span className="comment-count">{`${this.props.comment.totalCount || 0} Reviews`}</span>

            </div>
        )
    }
}

export default Score