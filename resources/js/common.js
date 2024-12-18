

//모바일 왼쪽메뉴 열림/닫힘 (s)
var delta = 100;
var timer = null;
$( window ).on( 'resize', function() {
    clearTimeout( timer );
    timer = setTimeout( resizeDone, delta );
} );
//navmenu메뉴제어
function navMenu(handler1, handler2, obj, tgClass, siblingsClass, clickObj){
	console.log(handler1, handler2)
	$(obj).on(handler1, clickObj, function(){
		console.log(handler1)
		$(this).parent().addClass(tgClass).removeClass(siblingsClass).siblings().removeClass(tgClass).addClass(siblingsClass);	
	}).on(handler2, clickObj, function(){
		var depth2Ctrl  = $(this).parent().siblings().find(clickObj).next();
		if($(window).width() < 1100){
			//depth2Ctrl.hide();
			//$(this).next().show();
		}else{
			$('.nav_menu').on('mouseleave', function(){
				$(obj).removeClass(tgClass).removeClass(siblingsClass);
			});
		}
	})
}
function resizeDone() {
    var wrapScroll = '<div class="scroll_wrap">';
    var wrapDisplay = '<div class="left_menu">';
    var className = 'fix_menu_wrap';
    
    $('.scroll_wrap > *').unwrap();
	if($(window).width() < 767){ //mobile	
		$('.fix_menu_wrap > *').wrapAll(wrapScroll);
		if(!($('.scroll_wrap > .calendar_wrap').hasClass('on_menu'))){
			$('.scroll_wrap > .calendar_wrap').siblings().addClass('on_menu');
		}
		//$('.tab_cont_wrap, .gnb').hide();
	}else if($(window).width() > 767 && $(window).width() < 1100){ //tablet
		$('.fix_menu_wrap .nav, .fix_menu_wrap > .calendar_wrap, .scroll_wrap > .calendar_wrap').wrapAll(wrapScroll);
	}else{ //pc
		$('.fix_menu_wrap .on_menu').removeClass('on_menu');
		$('body').removeClass('scroll_hidden');
	}
	
}
resizeDone();
window.addEventListener( 'resize', function() {
    clearTimeout( timer );
    timer = setTimeout( resizeDone, delta );
}, false );




$(window).on('resize', function(){
	browerResize();
});
browerResize();
function browerResize(){
	if($(window).width() < 767){ //모바일
		//console.log('모바일')
	}else if($(window).width() > 767 && $(window).width() < 1100){ //테블릿
		//console.log('테블릿')
	}else{ //데스크탑
		navMenu('mouseover focusin', 'mouseout focusout', '.nav_menu > li, .nav_menu .depth2 > li', 'on', 'none', '> a');
	}
	if($(window).width() < 1100){ //모바일, 테블릿
		navMenu('focusein click', 'click', '.nav_menu > li, .nav_menu .depth2 > li', 'on', 'none', '> a');
	}
}


/* fix_menu */
$('.fix_menu .btn_menu, .fix_menu .btn_cal').on('click', function(){
	var $onMenu = $('.fix_menu, .fix_menu_wrap, .close_wrap');
	if($(this).hasClass('btn_cal')){
		$('.scroll_wrap > .calendar_wrap').addClass('on_menu').siblings().removeClass('on_menu');
	}else{
		$('.scroll_wrap > .calendar_wrap').removeClass('on_menu').siblings().addClass('on_menu');
	}
	$onMenu.addClass('on');
	$('body').addClass('scroll_hidden');
	$(this).addClass('on').siblings().removeClass('on');
	$('.nav_wrap').css('z-index','10');
	$('.close_wrap .btn_close').on('click', function(){
		$onMenu.removeClass('on');
		$('body').removeClass('scroll_hidden');
		$('.fix_menu > a').removeClass('on');
		$('.nav_wrap').removeAttr('style');
	});
});

//fix메뉴
$(window).scroll(function(){
	var $fixMenu = $('.fix_menu');
	var $logo = $('.nav_wrap .logo, .nav_wrap');
	if(!($('.fix_menu_wrap').hasClass('on'))){
		if($(window).scrollTop() > $logo.height()) {
			$fixMenu.addClass('on');
		}else{
			$fixMenu.removeClass('on');
		};
	}
	if($(window).scrollTop() > parseInt($logo.css('font-size'))){
		$logo.addClass('on');
	}else{
		$logo.removeClass('on');
	}
	
});

//search
$('.search_inp .inp, .search_inp .btn_search').on('focusin', function(){
	$('.search_wrap').addClass('on');
}).on('focusout', function(){
	$('.search_wrap').removeClass('on');
});

//tab_cont_category효과
$('.tab_cont > li > .bgclr_black, .tab_cont > li > a.cate_wrap').on('click', function (){
	if(!($(this).hasClass('btn_cal'))){
		$('.gal_trns').fadeOut(150).fadeIn(150);
	};
})

/* calendar */
$('.tab_cont .btn_cal').on('click', function (){
	$(this).toggleClass('on');
	$(this).next().toggle();
})
$('.tbl_calendar a.category').on('click', function (){
	$('.tbl_calendar a.category').removeClass('on');
	$(this).addClass('on');
	$('.cont_day').on('focusout', function (){
		$('.tbl_calendar a.category').removeClass('on');
	});
});
