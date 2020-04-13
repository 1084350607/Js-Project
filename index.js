function onInput(e) {
    if (e.target.value.trim() != '') {
		//利用Jsonp实现跨域
        let s = document.createElement('script');
		//在百度搜索API的response返回后调用callback函数
        s.src = 'http://www.baidu.com/su?&wd=' + encodeURI(this.value.trim()) + '&p=3&cb=fn';
        document.body.appendChild(s);
    }
	let ulList = document.getElementsByTagName('ul')[0];
	
	//如果没有输入内容，那么清空li
	if(!this.value.length){
		let lis = ulList.querySelectorAll('li');
		lis.forEach((li)=>{
			ulList.removeChild(li)
		})
		console.log("ddd")
	}
}
function getEvent(event){
	return event ? event : window.event;
}
//处理百度API返回的数据
function fn(data){
	
	let ulList = document.getElementsByTagName('ul')[0];
	let newUlist = document.createElement('ul');
	
	data.s.forEach((item)=>{
		let li = document.createElement('li');
		li.textContent = item;
		newUlist.appendChild(li)
	})
	
	document.getElementsByTagName('div')[0].replaceChild(newUlist, ulList);
	ulList = null;//gc垃圾回收

	newUlist.addEventListener('click',function(e){
		if(e.target.tagName.toLowerCase() === 'li'){
			let wd = e.target.innerHTML;
			window.open(`https://www.baidu.com/s?word=${wd}`)
		}
	})
	
	//清空页面的script
	let s = document.querySelectorAll('script');
	s.forEach((item)=>{
		document.body.removeChild(item)
	})
	
}

//清空placeholder
function clearPlaceholder(e){
	this.removeAttribute('placeholder');
}
//添加placeholder
function addPlaceholder(){
	this.placeholder = '在百度搜索,或者输入一个网址';
}
//回车跳转
function onKeydown(e){
	if(e.keyCode == '13'){
		let txtInput = document.getElementById('txtInput')
		let wd = txtInput.value;
		window.open(`https://www.baidu.com/s?word=${wd}`)
	}
}
window.onload = function(){
	let txtInput = document.getElementById('txtInput')
	txtInput.addEventListener('input', onInput);
	//获取焦点的时候清空placeholder
	txtInput.addEventListener('focus',clearPlaceholder)
	//失去焦点的时候添加placeholder
	txtInput.addEventListener('blur',addPlaceholder);
	//回车跳转
	txtInput.addEventListener('keydown',onKeydown)
}