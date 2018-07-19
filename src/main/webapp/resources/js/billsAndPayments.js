function loadBillsAndPayments(referringPage){
	if(billingDetailsUrl != null){
		billingDetailsUrl = billingDetailsUrl.replace(/&amp;/g, '&');
		
		if(referringPage != undefined || referringPage != null || referringPage != ''){
			billingDetailsUrl = billingDetailsUrl+"&referringPage="+referringPage;
		}
	}

	$.ajax({
        url: billingDetailsUrl,
        type: 'POST',
        async: true,
        dataType: 'html',
        data: { calling : 'policyOverview'},
        error: function() {
        },
        success: function(html) {
        	if(html.indexOf("BILLS_AND_PAYMENTS_SUCCESS") > 0){
        		$("#billsAndPayments").html(html);
        	}else{
        		$("#noBillsAndPayments").show();
        		$("#billsAndPayments").hide();
        	}
        }
    });
}