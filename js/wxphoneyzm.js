
//绑定手机号
//点击获取验证码效果
var jssec = 60;
var iw = 0;
var is = "loading";
var timer;

ControlBinding();
function ControlBinding() {
	//点击获取验证码代码
    $("#getKey").on('touchstart',function () {
    	
        if ("disabled" == $("#getKey").attr("disabled")) {
 
            return false;
        }
        //发送短信。成功：60秒计时器。到时后才能重发
        SendCode();
        //changes(); 短信成功后 才调用 
    });

    //手机号栏失去焦点
//  $('#myUserName').blur(function(){
//		checkPhone($(this));
//		console.log(checkPhone($(this)));
//	});

    //手机号栏获得焦点
    $("#myUserName").focus(function () {
    	$(this).css('outline','none');
    	$(".error").hide();
        $('.error').removeClass("error");
        //手机号栏失去焦点
        $('#myUserName').blur(function(){
			checkPhone($(this));
			console.log(checkPhone($(this)));
		});
    });
    
    /*验证码失去焦点
    $('#code').blur(function(){
    	$('#cSpan').show();
		checkCode($("#codeSpan"));
	});
    //验证码获取焦点
    $('#code').focus(function(){
		$('#cSpan').hide();
	});*/
    
    //短信验证码 获取焦点
    $('#CheckCode').focus(function(){
    	$(this).css('outline','none');
		$('#randomSpan').html('');
	});
	//点击注册 提交form表单
	fnzc();
}

//点击获取验证码后 等待发送时 加载状态
function wait() {
    if (iw++ < 3) {
        is += ".";
    } else {
        is = "loading";
        iw = 0;
    }
    $("#getKey").attr("disabled", true);
    $("#getKey").text(is);
    timer = setTimeout('wait()', 1000);//调用自身实现
}
//点击获取验证码后 60秒内效果不能在点击  输入验证码框 可以输入 60秒后才能点击重新发送
function changes() {
	//如果过了60秒后 按钮的disabled为 true  即可再点 否则 为false 不能再点 然后移出输入验证码栏的 disabled 可以输入
   
	var s = jssec + "秒后重发";
    jssec--;
    if (jssec > -1) {
        timer = setTimeout('changes()', 1000);//调用自身实现
        $("#getKey").attr("disabled", true);
    }
    else {
        s = "重新发送";
        $("#getKey").attr("disabled", false);
        clearTimeout(timer);
    }
    //移除
    $("#CheckCode").removeAttr("disabled");
    $("#zc-btn").removeAttr("disabled");

    $("#getKey").text(s);
}

//如果验证码和手机号码都正确 可以点击 获取验证码 然后注册登录
function SendCode() {
	
	var phone=$("#myUserName").val();
	console.log(phone);
	console.log(checkPhone($('#myUserName')));

    if (!checkPhone($('#myUserName'))) { return; };
   
    clearTimeout(timer);
    wait();
    /*
    $.post("SendCodeSMS.action","telephone="+phone,function (data) {
    	clearTimeout(timer);
    
        if (data) { //如果有返回值 也就是后台接收到数据 就调用 changes 让输入框可以输入 并且 获取验证码按钮不能点击 60秒后 才能点击
       	changes();	
        } else {
        	$('#myUserName').next().addClass("error");
            $(".error").html("请直接登录！");
            $(".error").css("color","red"); 
            $(".error").show();
            $("#getKey").text("获取验证码");
            $("#getKey").attr("disabled", false);
        }
    });*/
}

//点击确定按钮时 form表单提交
function fnzc(){
	console.log(!checkPhone($("#myUserName")),);
	
    $('#reg-form').submit(function(e){
    	//判断 手机号 短信验证码只要有一个没有填或选中 就注册失败
		if(!checkPhone($("#myUserName"))){
//		    console.log(!checkPhone($("#myUserName")),!checkCode());
			alert('绑定失败');
			e.preventDefault();
			return false;
			
		}else{
			//注册成功跳转到完善资料页面
			//$('#reg-form').submit();
			var phone=$("#myUserName").val();
			$.post("addUsers.action","telephone="+phone+"&password="+pwd,function(data) {
		   	});
			alert('绑定成功');
            e.preventDefault();
		}
	});
}


//手机号码验证
function checkPhone(obj) {
    reg = /^1[3|4|5|7|8][0-9]\d{4,8}$/i;//验证手机正则(输入前7位至11位)

    if (obj.val().length == 0) {
        $('#error').addClass("error");
        $(".error").html("手机号不能为空！");
        $(".error").show();
    }
    else if (obj.val().length < 11) {
        $('#error').addClass("error");
        $(".error").html("手机号长度有误！");
        $(".error").show();
    }
    else if (!reg.test(obj.val())) {
        $('#error').addClass("error");
        $(".error").html("请输入正确的手机号!");
        $(".error").show();
    }else{
    	return true;
    }
    return false;
}
