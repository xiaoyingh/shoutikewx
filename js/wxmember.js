
//选中VIP时间
//默认第一个
$('.vip_list .vipitem').eq(0).addClass('vip_active');
//滑动与触摸时的区分
$('.vip_list .vipitem').each(function(){
	touchs($(this));
	
});
//四个方向滑动函数封装
function touchs(obj){
	var startX = 0;
	var startY = 0;
	var moveEndX = 0;
	var moveEndY = 0;
	var X = 0;
	var Y = 0;
	obj.on('touchstart',function(e){
//		e.preventDefault();
		startX = 0;
	    startY = 0;
	    X = 0;
		Y = 0;
		startX = e.originalEvent.changedTouches[0].pageX,
        startY = e.originalEvent.changedTouches[0].pageY;
        
        obj.on("touchmove",function(e){
//		    e.preventDefault();
		    moveEndX = 0;
		    moveEndY = 0;
		    X = 0;
		    Y = 0;
		    moveEndX = e.originalEvent.changedTouches[0].pageX,
		    moveEndY = e.originalEvent.changedTouches[0].pageY,
		    X = moveEndX - startX,
		    Y = moveEndY - startY;
		});
		obj.on('touchend',function(e){
//	    	e.preventDefault();
	    	if(X == '0'&&Y == '0'){
	    		vipactive(obj);
	    	}
	    });
	});
	
	obj.on('touchend',function(e){
//  	e.preventDefault();
    	if(X == '0'&&Y == '0'){
    		vipactive(obj);
    	}
   });
}
//选中vip焦点
function vipactive(obj){
	$('.vip_list .vipitem').removeClass('vip_active');
	obj.addClass('vip_active');
}
