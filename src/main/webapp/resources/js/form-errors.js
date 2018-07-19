$(document).ready(function(){
	$('.has-error input, .field-has-error').focus(function(e){
		$(this).addClass('is-active');
	});

	$('.has-error input, .field-has-error').blur(function(e){
		if($(this).val().length){

		} else {
			$(this).removeClass('is-active');
		}
	});
});
