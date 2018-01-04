
//未注册优惠码 点击课程的弹窗效果
$('#wxyzm').blur(function(){
	yhm($(this));
});
$('#wxyzm').focus(function(){
	$(".error2").html('');
	$(".error2").hide();
	$(".error2").removeClass('error2');
});

//点击提交扶贫优惠码
$('.yzm_btn').on('touchstart',function(){
	if(!yhm($('#wxyzm'))){
		alert('登录失败');
		return false;
	}else{
		//注册成功
		console.log('注册成功');
	}
	
});

//优惠码验证
function yhm(obj){
	var Pval = obj.val();
	
	reg1 = /^STK\d{15}$/;
  
	if (Pval == ''){
	      $('#error').addClass("error2");
	      $(".error2").html("*请填写优惠码");
	      $(".error2").show();

	}else if (Pval.length != 18||!(reg1.test(Pval))) {
	      $('#error').addClass("error2");
	      $(".error2").html("*优惠码为以STK开头后面是数字的18个字符");
	      $(".error2").show();
	}else {
	  	
	//	$.post("gethelpCode.action","HelpCode="+Pval,function(date){
	//		
	//		if(date.length<5){
	//			$(".error2").hide();
	//	        $('#error').addClass("checkedN");
	//	        alert("绑定成功。");
	////		    $('.fpzc').css('display','none');
	////          $('.login-mask').css('display','none');
	//	        return true;	
	//		}else{
	//			$('#error').addClass("error2");
	//	        $(".error2").html("优惠码错误");
	//	        $(".error2").show();
	////	        $("#preferential").val("");
	//	       
	//		}
	//	});
	    return true;
	}
	return false;
}
