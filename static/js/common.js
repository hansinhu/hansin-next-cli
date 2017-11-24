//获取倒计时时间
/*input 123345555
 *output [365,24,60,0]
 */
export const getCountDownTime = (second_time) => {
	if (second_time) {
		var second = parseInt(second_time) % 60;
		var min = parseInt(second_time / 60) % 60;
		var hour = parseInt(parseInt(second_time / 60) / 60) % 24;
		var day = parseInt(parseInt(parseInt(second_time / 60) / 60) / 24) + '';
		if(day<0 || hour<0 || min<0 ||second<0){
			return [0,0,0,0]
		}
		if (hour < 10) {
			hour = "0" + hour;
		}
		if (min < 10) {
			min = "0" + min;
		}
		if (second < 10) {
			second = "0" + second;
		}
		
		return new Array(day, hour, min, second);
	}
};

export const scoreFormat = (avgeScore) => {
	var score = avgeScore || 0;
    score >= Math.floor(score) + 0.5 ? score=Math.floor(score) + 0.5 : null;
    return score;
};
/**处理产品规格**/
export const fSpecStr = (specKeys)=>{
    var specStr = '';
    var specArr = [];

    if(specKeys){
        for(var key in specKeys){
            specArr.push(key+":"+specKeys[key]);
        }
        specStr = specArr.join(' ')
        return specStr;
    }else {
        return "";
    }
}