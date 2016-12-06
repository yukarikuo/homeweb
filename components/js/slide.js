(function($){
$(function(){
	//definition
	var $slideImage = $('#slide_img > ul'),
		$slideBack = $('#slide_btn_back > a'),
		$slideNext = $('#slide_btn_next > a'),
		duration = 1000,
		easing = 'swing';
		
	//initialize
	$slideImage
		.css({
			positon : 'relative',
			overflow : 'hidden'
		})
		.children()
		.css({
			position : 'absolute',
			top:0,
			left:0,
			zIndex:0
		})
		.first()
		.addClass('current')
		.nextAll()
		.hide();
	
	function slide(e, $current, $next, operater)
	{
		
		//prevent default event
		if(!e.isDefaultPrevented()) e.preventDefault();
		
		deactivateButtons();
		
		$current
			.stop(true)
			.css({
				zIndex : 0
			})
			.animate({
				left : (operater * $current.width()) + 'px'
			}, duration, easing);
		
		$next
			.addClass('next')
			.stop(true)
			.show()
			.css({
				zIndex : 10,
				left : (operater * -1 * $next.width()) + 'px'
			})
			.animate({
				left : '0px'
			}, duration, easing, function(){
				$current
					.removeClass('current')
					.hide();
				
				$next
					.removeClass('next')
					.addClass('current');
					
				activateButtons();
			});
	}
	
	function slideBack(e)
	{
		var $current = $slideImage.children('.current'),
			$next = ($current.prev().length) ? $current.prev() : $slideImage.children().last();
		
		slide(e, $current, $next, 1);
		
		return false;
	}
	
	function slideNext(e)
	{
		var $current = $slideImage.children('.current'),
			$next = ($current.next().length) ? $current.next() : $slideImage.children().first();
			
		slide(e, $current, $next, -1);
		
		return false;
	}
	
	function doNothing(e)
	{
		if(!e.isDefaultPrevented()) e.preventDefault();
		return false;
	}
	
	function activateButtons(){
		$slideNext
			.unbind('click',doNothing)
			.css('cursor','pointer')
			.click(slideNext);
		
		$slideBack
			.unbind('click',doNothing)
			.css('cursor','pointer')
			.click(slideBack);
	}
	
	function deactivateButtons(){
		$slideNext
			.css('cursor','arrow')
			.click(doNothing)
			.unbind('click',slideNext);
		
		$slideBack
			.css('cursor','arrow')
			.click(doNothing)
			.unbind('click',slideBack);
	}
	
	//bind clicks
	activateButtons();
});
})(jQuery);