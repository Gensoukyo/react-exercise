function dataFormat(t) {
	var date = new Date(t);
	var current=new Date();
	var isThisYear=date.getFullYear()===current.getFullYear();
	var isThisMonth=date.getMonth()===current.getMonth();
	var isToday=isThisYear&&isThisMonth&&date.getDate()===current.getDate()
	var Y = isThisYear?'':date.getFullYear() + '年';
	    var M = isToday?'':(date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '月';
	    var D = isToday?'':(date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + '日 ';
	    var h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
	    var m = (date.getMinutes() <10 ? '0' + date.getMinutes() : date.getMinutes());
	    return Y+M+D+h+m;
}

export default dataFormat;