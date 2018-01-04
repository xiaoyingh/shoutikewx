disable();
//输入时 i标签的图标隐藏
$('.mytext').focus(function(){
	$(this).parent().next().hide();
	$(this).css('outline','none');
	$(this).parents('.rows').removeClass('error');
	$('.mytext').blur(function(){
		$(this).parent().next().show();
		texts($(this));
	});
});

//监控select下拉框选中
$('.selects').each(function(){
//	$(this)[0].selectedIndex = -1;
//	$(this).removeSelected();
	$(this).change(function(){
		
		var $value = $(this).val();
		$(this).prev().children('p').html($value);
		$(this).parents('.rows').removeClass('error');
	});
});

//点击完善资料即可观看视频按钮
$('#mater_payform').submit(function(e){
	if(phones()||!texts($('#value2'))||!texts($('#pay_school'))||!selects($('#pay_year'))||!texts($('#pay_class'))){
		e.preventDefault();
		alert('请完善资料');
		phones();
		texts($('#value2'));
		texts($('#pay_school'));
		selects($('#pay_year'));
		texts($('#pay_class'));
	}
});
//电话号码是否绑定
function phones(){
	if($('.rows_phone p').html() == '未绑定'){
		$('.rows_phone p').parents('.rows').addClass('erro');
		return false;
	}else{
		return true;
	}
}
//select 选框判断是否有值
function selects(obj){
	if(obj.val() == null){
		obj.parents('.rows').addClass('error');
		return false;
	}else{
		obj.parents('.rows').removeClass('error');
		return true;
	}
}
//输入框验证
function texts(obj){
	if(obj.val() == ''){
		obj.parents('.rows').addClass('error');
		return false;
	}else{
		obj.parents('.rows').removeClass('error');
		return true;
	}
}
//所在地选择
mapselect();
function mapselect(){
	var city01 = '';
	var city02 = '';
	var city03 = '';
	$('#s_province').change(function(){
		$(this).parents('.txts').prev().children('p').html('');
		city01 = $(this).val();
		$(this).next().addClass('map_active');
		console.log(city01,$(this).next().css('z-index'));
		$(this).parents('.txts').prev().children('p').append(city01+'，');
		console.log($(this).next().children().length);
//		$(this).attr('size','1');
//		$(this).next().attr('size',$(this).next().children().length);
		
//		$(this).next().click();
//		expand($(this).next());
        disable();
	});
	
	$('#s_city').change(function(){
		city02 = $(this).val();
		$(this).prev().removeClass('map_active');
		$(this).next().addClass('map_active');
		console.log(city02,$(this).next().css('z-index'));
		$(this).parents('.txts').prev().children('p').append(city02+'，');
//		$(this).attr('size','1');
//		$(this).next().attr('size',$(this).next().children().length);
//		$(this).next().click();
		expand($(this).next());
        disable();
	});
//	
	$('#s_county').change(function(){
		city03 = $(this).val();
		$(this).prev().removeClass('map_active');
		$(this).removeClass('map_active');
        console.log(city03,$(this).next().css('z-index'));
        $(this).parents('.txts').prev().children('p').append(city03);
//      $(this).attr('size','1');
        disable();
	});

}
function expand(elem) {
    if (document.createEvent) {
        var e = document.createEvent("MouseEvents");
        e.initMouseEvent("mousedown", true, true, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
        elem[0].dispatchEvent(e);
    } else if (element.fireEvent) {
        elem[0].fireEvent("onmousedown");
    }
}

function disable(){
	$('#s_province option').eq(0).attr('disabled','disabled');
	$('#s_province option').eq(0).html('');
	$('#s_province option').eq(0).css('opacity','0');
	$('#s_city option').eq(0).attr('disabled','disabled');
	$('#s_city option').eq(0).html('');
	$('#s_city option').eq(0).css('opacity','0');
	$('#s_county option').eq(0).attr('disabled','disabled');
	$('#s_county option').eq(0).html('');
	$('#s_county option').eq(0).css('opacity','0');
}
