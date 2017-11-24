
import React, {
    Component
} from 'react'

class ImgList extends Component {

    render(){

        return (
            <div className="">
                <ul className="img-list">
                    {this.props.image_list.map((item,index) => (
                        <li key={item+index} >
                            <img src={item} alt="img" />
                        </li>
                    ))}
                </ul>
            </div>
        )
    }
}

export default ImgList