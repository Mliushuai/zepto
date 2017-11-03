//http://shzhou.weijikong.com/goods/info/index.html?goodsInfoId=xxx&account=xxx
$(document).ready(function() {
	var agoodsInfo = {};//商品
    // 截取url
    function getPath(p){
    	var pt = p.substr(1,p.length);
    	var arr1 = pt.split("&");
    	var arr2 =[];
    	for (var i = 0; i < arr1.length; i++) {
    		var newarr=arr1[i].split('=');
    		arr2.push(newarr[1]);
    	}
    	return arr2;
    }
    var oldsmg=getPath(window.location.search);
    console.log(oldsmg);
	$.ajax({
		// data:{"":},
    	dataType:"JSON",
    	type:"GET",
    	url:"getGoodsById.action?agoodsInfo.id="+oldsmg[0],
    	success:function(data) {
    		console.log(data);
    		if (data.success === true) {
    			agoodsInfo = data.agoodsInfo;
        		// 获取后台数据
         		$("header").append("<img src="+agoodsInfo.picture+">");
         		$('.sec-tit-left').append( agoodsInfo.name+"<img src='images/shoper.png' alt='"+agoodsInfo.name+"'>" );
         		$(".shoper_min").append(agoodsInfo.supplierName);
    		    $('.sec-mon').append("&yen;<span class='price'>"+agoodsInfo.price+"</span>");
    		    $('#news').append("<p class='news_tit'>商品描述</p><p class='news_cont'>"+agoodsInfo.description+"</p>");
    			 //提交订单触发事件
         		$('.submit-but').click(function(mysqls){
         			//验证
         			var adm=$('#add-name').val();
    			          if (adm.length<=0) {
    			              alert('请输入联系人姓名');
    			              return;
    			          }
    			     var pho=$('#phone').val();
    			          if (pho.length<=0) {
    			              alert('请输入联系人电话');
    			              return;
    			          }
    			     var adr=$('#addre').val();
    			          if (adr.length<=0) {0 
    			              alert('请输入您的地址');
    			          return;
    			          }
    			     var num=$('#numbs').val();
    			          if (num.length<=0||num<=0) {
    			              alert('数量必须大于0');
    			              return;
    			          }
    			     var mysqls="?abillInfo.goodsInfoId="+agoodsInfo.id+
    			     "&abillInfo.account="+oldsmg[1]+
    			     "&abillInfo.manName="+adm+
    			     "&abillInfo.manTel="+pho+
    			     "&abillInfo.manAddress="+adr+
    			     "&abillInfo.num="+num+
    			     "&abillInfo.money="+num*agoodsInfo.price+
    			     "&abillInfo.price="+agoodsInfo.price;
    			  $.ajax({
    			  	//data:{"abillInfo.goodsInfoId":agoodsInfo.id,"abillInfo.manName":adm,"abillInfo.manName":pho,"abillInfo.manAddress":adr,"abillInfo.num":num},
    			  	url:'submitBill.action'+mysqls,
    			  	dataType:"JSON",
    			    type:'POST',
    			    async:false, 
    			  	success:function(data){
    			  		if (data.success === true) {
    			  			// $('#detail').fadeOut(600);
    			  			$('#myform')[0].reset();//清空表单
    			  			$('.money').html(0);//合计设为0
    			  		}
    			 		
    			  	}
    			  })        
         		})
    		}else{
    			alert("获取数据失败！");
    			return;
    		}
    		
    	}
	})
});																							