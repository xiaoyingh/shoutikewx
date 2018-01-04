//初始化
var str = '你还要我怎样, 词：薛之谦 ,曲：薛之谦 ,演唱：薛之谦, 你停在了这条我们熟悉的街, 把你准备好的台词全念一遍, 我还在逞强 ,说着谎, 也没能力遮挡 ,你去的方向, 至少分开的时候我落落大方, 我后来都会选择绕过那条街, 又多希望在另一条街能遇见, 思念在逞强 不肯忘 ,怪我没能力跟随 你去的方向, 若越爱越被动 越要落落大方, 你还要我怎样 要怎样, 你突然来的短信就够我悲伤 ,我没能力遗忘, 你不用提醒我 ,哪怕结局就这样 ';
var timer;
var num = 1; //默认播放 图片转动 
var isPlaying = true; //音频播放状态 true播放中 
var $width = 0; //进度条的宽度
var slider = 10; //进度条总宽度 可移动的范围是（0-10rem）
var curmargin = 0.34;//进度条圆点本身的margin-left
var player = $("#audio")[0]; /*jquery对象转换成js对象*/
var container = document.querySelector('.singerimg');
var $image = container.querySelector('img');
var playingBtn = document.getElementById('playing_btn');
//初始化
fntimer();
console.log(player.buffered.end);

lyric(str);
//自動播放
document.addEventListener('DOMContentLoaded', function () { 
	function audioAutoPlay() {
		player.play();   
		document.addEventListener("WeixinJSBridgeReady", function () {
			player.play();
		}, false); 
	}    
	audioAutoPlay();
});
//禁止回彈
//window.onload = function(){
//	document.body.addEventListener("touchmove",function(event){
//      event.preventDefault();
//  });
//};
//暂停效果
playingBtn.addEventListener('click',function bindEvent(){
    if (num == 1){ /*如果已经播放*/
   	    player.pause();/*暂停*/
        clearInterval(timer);
        this.style.background = 'url(../../img/audio/playing_btn.png) no-repeat center';
        this.style.backgroundSize = '2.04rem 2.04rem';
        this.style.webkitBackgroundSize = '2.04rem 2.04rem';
        num++;
	    pause();
        return num;
    }else {
        player.play(); /*播放*/
        fntimer();
        this.style.background = 'url(../../img/audio/play_stop.png) no-repeat center';
        this.style.backgroundSize = '2.04rem 2.04rem';
        this.style.webkitBackgroundSize = '2.04rem 2.04rem';
        num=1;
        play();
        return num;
    }
});
//上一个音频
$('#prev_btn').on('click',function(){
	alert('进入上一个音频');
});
//下一个音频
$('#next_btn').on('click',function(){
	alert('进入下一个音频');
});

//进度条移动
fnslider();
function fnslider(){
	$('#cur-btn').on('touchstart',function(e){
		
		var disx = 0;
	    var movedisx = 0;
	    var nowtime = 0;
	    var nowleft = $width;
		clearInterval(timer);
		//点击圆点时 当前的left值
		disx = e.originalEvent.targetTouches[0].pageX*2/50;
		$('.wx_wrap').on('touchmove',function(e){

			//鼠标或者手指移动的距离
			movedisx = e.originalEvent.targetTouches[0].pageX*2/50;
	        $width  = movedisx - disx + nowleft;
			if($width < 0)$width = 0;
			if($width > slider)$width = slider;
			$('#process-cur').css('width',$width+'rem');
	        $('#cur-btn').css('left',$width+'rem');
	        //根据移动的距离计算出需要播放的当前时间
	        nowtime = $width/slider*player.duration;
	        sToM(nowtime,$('#currentTime'));
		});
		$('.wx_wrap').on('touchend',function(e){
			//return false;
			//鼠标手指抬起时 设置改变当前播放时间
			var $currentTime = $width/slider*player.duration;
			player.currentTime = $currentTime;
			if('fastSeek' in player){
			    player.fastSeek($currentTime);//改变audio.currentTime的值
			    //alert(player.currentTime);
			}else if(player.seekable.start(0)<= $currentTime <=player.seekable.end(0)){
				//获得第一个以秒计的音频可寻址范围（部分）：
				player.currentTime = $currentTime;
			}else{
				//如果以上都不满足 就设置播放时间为缓冲到最大位置的时间
				//player.buffered表示音频已缓冲部分的
				player.currentTime = player.buffered.end(player.buffered.length-1);
			}
			fntimer();
			$('.wx_wrap').off('touchmove');
			$('.wx_wrap').off('touchend');
		});
	});
	
	$('#process-bar').on('click',function(e){
		
		var w = e.originalEvent.targetTouches[0].pageX;
		//alert(w);
		
	});
	
}


//字幕
function lyric(lyric){
	$('.audio_lrc ul').html('');
	var lrc = lyric.split(',');
    for (var i = 0; i < lrc.length; i++) {
        $('<li>').html(lrc[i]==''?'&nbsp':lrc[i]).appendTo($('.audio_lrc ul'));
    }
}
  
//每隔一秒获取当前播放时间 放到页面
function fntimer(){
	timer = setInterval(function(){
		//当前时间转成分秒
		sToM(player.currentTime,$('#currentTime'));
		sToM(player.duration,$('#total-time'));
		//进度条
		$width = player.currentTime/player.duration*slider;
		$('#process-cur').css('width',$width+'rem');
		$('#cur-btn').css('left',$width+'rem');
		if(player.currentTime == player.duration){
			clearInterval(timer);
//			$(this).css('background-position-y','-13.98rem');
			alert('播放结束跳转下一页');
		}
	},1000);
}

//切换字幕
$('.music_menu').on('click',function(){
	if($(this).attr('data-onoff')=='false'){
		$(this).attr('data-onoff','true');
		$('.audio_center').hide();
		$('.lrc_mask').show();
		$(this).css('background','url(../../img/audio/lrcicon01.png) no-repeat center');
		$(this).css('background-size','1.12rem 0.72rem');
		$(this).css('-webkit-background-size','1.12rem 0.72rem');
	}else{
		$(this).attr('data-onoff','false');	
		$('.lrc_mask').hide();
		$('.audio_center').show();
		$(this).css('background','url(../../img/audio/lrcicon.png) no-repeat center');
		$(this).css('-webkit-background-size','1.12rem 0.72rem');
	}
});
//选集
$('.loop').on('click',function(){
	$('.footer').hide();
//	$('.mask_list').slideDown();
    $('.sel_title').hide();
	$('.mask_list').show();
	
});
//选集菜单关闭
$('.lists_close').on('click',function(){
	$('.footer').show();
//	$('.mask_list').slideUp();
    $('.sel_title').show();
	$('.mask_list').hide();
});

//分钟转化成秒
function minToSec (StrTime) {
    var arr=StrTime.split(':');
    var sec=parseFloat((parseFloat(arr[0])*60+parseFloat(arr[1])).toFixed(2));
    return sec;
}
//将秒换算成分钟 换算后放入相应标签里函数
function sToM (sec,name) {
	var m=Math.floor(sec/60);
	var s=Math.floor(sec%60);	
	name.html(toZero (m)+':'+toZero (s));
}
//补零函数
function toZero(n){
    return n<10? '0'+n:''+n;
}
//暂停图片动画
function pause() {
    var iTransform = getComputedStyle($image).transform;
    var cTransform = getComputedStyle(container).transform;
    container.style.transform = cTransform === 'none'? iTransform: iTransform.concat(' ', cTransform);
    $image.classList.remove('anmiting');
}
function play() {
    $image.classList.add('anmiting');
}

