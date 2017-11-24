
import React, {
    Component
} from 'react'
import { toDecimal2 } from '../../../static/js/global'
var _select = require('antd/lib/select');
const Option = _select.Option;


class Specification extends Component {

    render() {

        let spec = this.props.detail.detailData.specDeclareList || [];
        let spec_list = this.props.detail.detailData.specList || [];
        let rate = this.props.detail.detailData.discount ? Number(toDecimal2(this.props.detail.detailData.discount.discountRate*0.1)) : 1;

        let aId = []; //规格 ul id
        let aAvtiveIndex = [].concat(this.props.detail.specData.activeIndex); //选中样式的下标，初始0
        let aSpecNameVal = [].concat(this.props.detail.specData.specKeyVal); //选中的规格及值
        let specKey = ''; //各个规格及值拼接的字符串

        for(let i=0;i<spec.length;i++) {
            aId.push('SPEC'+spec[i].name);
        }
        if(aAvtiveIndex.length == 0) {
            for(let i=0;i<spec.length;i++) {
                aAvtiveIndex.push(null)
            }
        }

        function handleChange(index1,index2,that) {
            if(aAvtiveIndex[index1] == null) {
                aAvtiveIndex[index1] = index2;
            }
            //切换样式
            let arr = document.querySelectorAll('#SPEC'+index1+' li');
            arr[aAvtiveIndex[index1]].classList.remove('active');
            aAvtiveIndex[index1] = index2;
            arr[index2].classList.add('active');

            //匹配
            aSpecNameVal[index1].val = spec[index1].valueList[index2].value;
            //拼接specKey
            for(let i=0;i<aSpecNameVal.length;i++){
                if(aSpecNameVal[i].val != '') {
                    specKey += aSpecNameVal[i].name + '=' + aSpecNameVal[i].val + ',';
                }
            }
            if(specKey.length >1) {
                specKey = specKey.slice(0,specKey.length-1)
            }

            //同步价格
            let invertory = null;
            for(let i=0;i<spec_list.length;i++) {
                if(spec_list[i].specKey == specKey) {
                    that.props.setSpecData({activeIndex: aAvtiveIndex, specKeyVal: aSpecNameVal});
                    that.props.setSpecItem(spec_list[i]);
                    that.props.setShowPrice({price: toDecimal2(spec_list[i].price*rate), oldPrice: toDecimal2(spec_list[i].price), rate: rate});
                    invertory = spec_list[i].inventory;
                    break;
                }
            }
            specKey = '';
            /*if(that.props.detail.goodsNum > that.props.detail.specItem.inventory && invertory) {
                that.props.setGoodsNum(invertory)
            }*/
        }

        return (
            <div>
                <ul className="spec-list">
                    {spec_list.length > 0 && spec.map((item,index1) => (
                        <li key={`spec-list${index1}`}>
                            <div className="spec-name">{item.name.toUpperCase()}: </div>
                            <ul className="list-con" id={`SPEC${index1}`}>
                                {item.valueList.map((value,index2) => (
                                    <li className={index2 == aAvtiveIndex[index1] ? 'active' : ''} key={`spec-list${index1}${index2}`} onClick={()=>{handleChange(index1,index2,this)}}>
                                        {value.img ? <div><img className="spec-img" src={value.img}/> <span className="spec-value">{value.value}</span></div> : <div className="spec-val">{value.value}</div>}
                                    </li>
                                ))}
                            </ul>

                        </li>

                    ))}
                </ul>

            </div>
        )
    }
}

export default Specification