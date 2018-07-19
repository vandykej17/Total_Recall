function suspendREFTRedirect(){
	window.location = suspendREFTLocation;
}
function easyPayRedirect(){
	window.location = paymentPreferencesLocation;
}
function setupAutomaticPaymentsLoad(){
	window.location = setupAutomaticPaymentsAction;
}
function editAutomaticPaymentsLoad(){
	window.location = editAutomaticPaymentsAction;
}
function openCurrentBill(docUrl){
	window.open(docUrl);
}
function paperlessRedirect(){
	window.location = paperlessURL;
}
function payBillRedirect(){
	window.location = payBillLocation;
}
function addPaymentMethodRedirect(){
	window.location = addPaymentMethodLocation;
}

function addRefundMethodRedirect(){
	window.location = addRefundMethodLocation;
}


function editPaymentMethod(paymentMethodIndexToEdit){
	var queryString = "&payMethodInd=" + paymentMethodIndexToEdit;
	window.location = editPaymentMethodAction + queryString;
}
function makePaymentMethodDefault(paymentMethodIndexToMakeDefault){
	var queryString = "&payMethodInd=" + paymentMethodIndexToMakeDefault;
	window.location = makePaymentMethodDefaultAction + queryString;
}

function removePaymentPreference(paymentPreferenceIndexToRemove){
	var queryString = "&payMethodInd=" + paymentPreferenceIndexToRemove;
	window.location = removePaymentMethodAction + queryString;
}

function removeRefundPreference(){
	window.location = removeRefundMethodAction;
}


function displayAuthorizationForm(){
	var authWindow = window.open("","");
	var selectedMethodType = $("#paymentMethodType").val();
	var modifier;
	if(selectedMethodType == "EFT"){
		modifier = "EFT";
	}else{
		modifier = "CC";
	}
	authWindow.document.write($("#"+modifier+"authorizationForm").html());
	$(authWindow.document.body).ready(function(){
		authWindow.document.title = "Authorization Form";
	});
	authWindow.document.close();
	return false;
}

function displayAuthorizationFormServer(){
	var authWindow = window.open("authorizationForm.action","");
	logEbieventAuthAgreement('406800098', 'Customers viewed the Authorization Agreement Form.');return false;
}

function makePaymentSubmit(pkey){
	var pkeyNameValue = "";
	
	if(pkey != null && pkey != ""){
		pkeyNameValue = "&pkey="+pkey;
	}
	
	window.location = payBillLocation + pkeyNameValue + "&referrer=payBillFromBillingLanding";
}
function reviewEditPaymentPreference(){
	proceed = validateAllFields();
	if(proceed){
		var queryString = $("#paymentMethod").serialize();
		queryString = queryString + "&entryPoint=managePaymentPreferences.action";
		$('.btnContinue').addClass("btnContinueDisabled");
		transShow();
		var url = "editPaymentPreferenceContinue.action";

		if($.browser.msie) {
			$("#screenExit").val("exit");
		}
		$.ajax({
		    url: url,
		    type: 'GET',
		    dataType: 'html',
		    data: queryString,
			error: function(){
			},
			success: function(html) {
				transHide();
				processHTMLResponse('CommonError', html);
				if($.browser.msie) {
					$("#screenExit").val("");
				}
                $('.btnContinue').removeClass("btnContinueDisabled");

			}
		});
	}
}

function logBillingEbiEvent(event){
	
	try{
		var eventId ;
		eventId = event;
		
		var params = "event:"+eventId+","+
					 "PRINT:1,"+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "JSESSION_ID:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "PREVIOUS_URL:NOT_LOGGED";
				
		logEbiEvent(params);
	}catch(e){
		
	}
}

function reviewPaymentPreference(){
	proceed = validateAllFields();
	$("#screenExit").val("exit");
	if(proceed){
		var queryString = $("#paymentMethod").serialize();
		queryString = queryString + "&entryPoint=managePaymentPreferences.action";
		$('.btnContinue').addClass("btnContinueDisabled");
		//transShow();
		var url = "";
		if ($("input:radio[name=PAYMENT_METHOD.paymentMethod]:checked").val() == "CC"){
			url = dpUrl+"/addPaymentPreferenceDP.action"
			//url = "addPaymentPreferenceDP.action";
		} else {
			url = "addPaymentPreferenceDP.action";
		}
	
		$("#paymentMethod").attr("action", url);
		$("#paymentMethod").submit();
		
		
	}
}

function hideShowDefault(prefKey) {
	if (prefKey == "0") {
		disableButton("#makeDefaultButton")
		$("#defaultMsg").css("visibility", "");
	} else {
		enableButton("#makeDefaultButton")
		$("#defaultMsg").css("visibility", "hidden");
	}
}

function logEbieventAuthAgreement(event, eventDesc){
	try{
		var eventId ;
		var ebiEventDescription
		eventId = event;
		ebiEventDescription = eventDesc;
		
		var params = "event:"+eventId+","+
					 "ebiEventDescription:"+ebiEventDescription+","+
					 "AUTH_AGREE:Y,"+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "JSESSION_ID:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "STATE:NOT_LOGGED,"+
					 "GUID:NOT_LOGGED,"+
					 "PREVIOUS_URL:NOT_LOGGED";
		logEbiEvent(params);
	}catch(e){
		
	}
}

function logEbiEventAuthAgreePrint(){
	var eventId = "406800102";
	var ebiEventDescription = "Customer selects the print on automatic payment enrollment confirmation page";
	
	try{		
		var params = "event:"+eventId+","+
					 "ebiEventDescription:"+ebiEventDescription+","+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "STATE:NOT_LOGGED,"+
					 "GUID:NOT_LOGGED,";
				
		logEbiEvent(params);
	}catch(e){
		
	}
	window.print();
}

function logEbiEventCancelAutoPayPrint(){
	var eventId = "406800113";
	var ebiEventDescription = "Number of customers printing cancel EasyPay confirmation page";
	
	try{		
		var params = "event:"+eventId+","+
					 "ebiEventDescription:"+ebiEventDescription+","+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "STATE:NOT_LOGGED,"+
					 "GUID:NOT_LOGGED,"+
					 "PREVIOUS_URL:NOT_LOGGED";
				
		logEbiEvent(params);
	}catch(e){
		
	}
	
	window.print();
}

function logEbiEventEditAutoPayPrint(){
	var eventId = "406800109";
	var ebiEventDescription = "Customer selects the 'Print' option from this page";
	
	try{		
		var params = "event:"+eventId+","+
					 "ebiEventDescription:"+ebiEventDescription+","+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "STATE:NOT_LOGGED,"+
					 "GUID:NOT_LOGGED,"+
					 "PREVIOUS_URL:NOT_LOGGED,"+
					 "JSESSION_ID:NOT_LOGGED";
				
		logEbiEvent(params);
	}catch(e){
		
	}
	window.print();
}

function logEbiEventBillingPrint(flow){
	var eventId = '';
	var ebiEventDescription = '';
	
	if(flow != undefined && flow != ''){
		if(flow == "addPayPref"){
			eventId = "406800088";
			ebiEventDescription = "Customer selects to print the add payment method confirmation";
		}else if(flow == "removePayPref"){
			eventId = "406800092";
			ebiEventDescription = "Customer selects the print option from the remove payment method confirm page";
		}else if(flow == "editPayPref"){
			eventId = "406800097";
			ebiEventDescription = "Customer selects the edit payment method confirmation print button";
		}else if(flow == "billingDetails"){
			eventId = "406800080";
			ebiEventDescription = "Cust. selects the \"Print\" link from the billing details page";
		}

		try{
			var params = "event:"+eventId+","+
						 "ebiEventDescription:"+ebiEventDescription+","+
						 "FULLPOLICYNB:NOT_LOGGED,"+
						 "SOURCE_SYSTEM:NOT_LOGGED,"+
						 "USER_ID:NOT_LOGGED,"+
						 "IP_ADDRESS:NOT_LOGGED,"+
						 "STATE:NOT_LOGGED,"+
						 "GUID:NOT_LOGGED,"+
						 "PREVIOUS_URL:NOT_LOGGED,"+
						 "JSESSION_ID:NOT_LOGGED";
					
			logEbiEvent(params);
		}catch(e){
			
		}
	}
	
	window.print();
}

function logEbiEventPayBillConfPrint(){
	var eventId = "406800122";
	var ebiEventDescription = "Customers who print confirmation page for pay bill";
	
	try{		
		var params = "event:"+eventId+","+
		 			 "ebiEventDescription:"+ebiEventDescription+","+
					 "FULLPOLICYNB:NOT_LOGGED,"+
					 "SOURCE_SYSTEM:NOT_LOGGED,"+
					 "USER_ID:NOT_LOGGED,"+
					 "IP_ADDRESS:NOT_LOGGED,"+
					 "STATE:NOT_LOGGED,"+
					 "GUID:NOT_LOGGED,"+
					 "PREVIOUS_URL:NOT_LOGGED";
				
		logEbiEvent(params);
	}catch(e){
		
	}
	
	window.print();
}

function cancelScheduledPaymentPageLoad(pkey){
	var pkeyNameValue = "";
	
	if(pkey != null && pkey != ""){
		pkeyNameValue = "&pkey="+pkey;
	}
	
	window.location = cancelScheduledPaymentLocation + pkeyNameValue + "&referrer=cancelScheduledPaymentFromBillingLanding";
}

function docBunkerRedirect(pkey){
	var pkeyNameValue = "";
	
	if(pkey != null && pkey != ""){
		pkeyNameValue = "?pkey="+pkey;
	}
	window.location = documentSummaryLocation + pkeyNameValue + "&isFromOriginalRequest=true";
}