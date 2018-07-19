$(function ($) {
	AndroidUtils.enforceMaxLength();
});

var AndroidUtils = {
	enforceMaxLength: function(){
		var ua = navigator.userAgent.toLowerCase();
		var isAndroid = ua.indexOf("android") > -1;
		
		if(isAndroid) {
			$("input[maxlength]").on('change keyup', function() {
				var maxlength = $(this).attr('maxlength');
				var value = $(this).val();
				
				if (value.length > maxlength) {  
				    $(this).val(value.slice(0, maxlength));
				}
			});
		}
	}	
};