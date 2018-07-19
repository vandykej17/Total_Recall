function callBoatPolicyOverviewButtonClickEBI(buttonClicked)
{
	$.ajax({
        url: 'logEBIEventsForBoat.action',
        type: 'POST',
        async: true,
        dataType: 'html',
        data: { buttonClicked : buttonClicked},
        error: function() {
        },
        success: function(html) {
        }
    });
	return true;
}