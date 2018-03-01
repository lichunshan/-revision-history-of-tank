function delRepeat(arr,str){
	if(arr.indexOf(str)==-1){
		arr.push(str);
	}
	return arr;
}

function findOne(arr,str){
	for(var i=0;i<arr.length;i++){
		if(arr[i]==str){
			return true;
		}
	}
}