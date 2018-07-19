function callMcPolicyOverviewButtonClickEBI(buttonClicked,callback)
{
	
	$.ajax({
        url: 'logEBIEventsForMc.action',
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