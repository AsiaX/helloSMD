require('./zepto.min');
require('./zepto-tap');

getTextFromUrl();
function getTextFromUrl(){
	var src = window.location.href;
	var selectText = src.split('selectText=')[1];
	selectText = decodeURI(selectText);
	console.log(selectText);
	if(selectText == 'undefined' || selectText ==""){
		console.log(selectText);
	}else{
		$('.searchinp').val(selectText);
		getSelectData(selectText);
	}
}

$('#searchBtn').on('touchstart',function(){
	var selectInp = $('.searchinp').val();
	if(selectInp){
		getSelectData(selectInp);
	}else{
		alert('请输入关键字!');
	}
})

function getSelectData(selectInp){
	var params = {selectText:selectInp}
	$.ajax({
		url:'http://datainfo.duapp.com/shopdata/selectGoodes.php',
		type:'get',
		data:params,
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			$('#thelist').html(" ");
			if(data==0){
				$('.noGoods').show().text('没有搜索到相关商品!');
				return;
			}
			if(data.length){
				$.each(data,function(i){
					var oldPrice = parseInt(data[i].price*data[i].discount*0.1);
					var oLi = $("<li><dl><dt><img src="+data[i].goodsListImg+"></dt><dd><h3>"+data[i].goodsName+"</h3><div><b class='price'>￥"+oldPrice+"</b><span class='oldprice'>￥"+data[i].price+"</span></div><span class='discount'>"+data[i].discount+"折</span><a href='#'></a></dd></dl></li>")
					$('#thelist').append(oLi);
					$('.noGoods').hide();
				});
			}else{
				$('.noGoods').show().text('没有搜索到相关商品!');
			}
		}
	})
}



