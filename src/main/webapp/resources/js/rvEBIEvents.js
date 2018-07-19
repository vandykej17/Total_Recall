function callRvPolicyOverviewButtonClickEBI(buttonClicked,callback)
{
	$.ajax({
        url: 'logEBIEventsForRv.action',
        type: 'POST',
        async: true,
        dataType: 'html',
        data: { buttonClicked : buttonClicked},
        error: function() {
        	if (callback !== undefined){
        		callback();
        	}
        },
        success: function(html) {
        }
    });
	return true;
}
