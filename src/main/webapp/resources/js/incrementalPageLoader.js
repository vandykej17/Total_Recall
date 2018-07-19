/*
 * Command queue according to the queuing & command patterns.
 * Commands are added to the queue and processed FIFO.
 * 
 * References:
 * 
 * http://en.wikipedia.org/wiki/Command_pattern
 * Ross Harmes, Dustin Diaz - Apress (2007), Pro JavaScript Design Patterns 
 * 
 */

var NWIE = NWIE || {};

NWIE.CommandQueue = function() {
	// Queued commands
	this.queue = [];

	//These are callback functions
	this.onComplete = null;
	this.onFailure = null;
	this.onFlush = null;
	  
	//Core properties
	this.conn = {};
	this.triggerOnFlush = true;
};

NWIE.CommandQueue.prototype.add = function(cmd) {
	this.queue.push(cmd);
};

NWIE.CommandQueue.prototype.flush = function() {
	if (!this.queue.length > 0) {
		this.onComplete = null;
		this.onFailure = null;
		this.onFlush = null;
		return;
	}
	
	if (this.triggerOnFlush === true) {
		this.triggerOnFlush = false;
		
		if (this.onFlush !== null) {
			this.onFlush();		  
		}		
	}

	//Scoping variable
	var that = this;
	
	var onSuccess = function(o, textStatus, jqXHR) {
		if (o != null) {
			if (typeof o == 'string' && o.indexOf("System Error") >= 0) {
				$('body').html(o);					
			} else {
				that.queue[0].responseData = o;
				that.queue[0].execute(o);
			}
		}
		
	  that.queue.shift();
	  
	  if (that.queue.length === 0) {
		if (that.onComplete !== null) {
		    that.onComplete();			
		}

	    return;
	  }

	  that.flush();
	};
	
	var onError = function(o) {
		if (that.queue.length > 0) {
			if (typeof that.queue[0].onError != null ) {
				that.queue[0].onError(o);
			}
		}
		
		that.queue.shift();
		
		if (that.queue.length === 0) {
			if (that.onComplete !== null) {
				that.onComplete();			
			}

			return;
		}
		
		that.flush();
	};	
	
	var executeNonAjaxCommand = function() {
		that.queue[0].execute();
		that.queue.shift();
		
		if (that.queue.length === 0) {
			if (that.onComplete !== null) {
				that.onComplete();			
			}
			
			return;
		}		
		that.flush();
	};
	
	//Non-Ajax Command
	if (this.queue[0]['url'] === null || this.queue[0]['url'].length == 0) {
		executeNonAjaxCommand();
	} else {
		this.conn = $.ajax({
			type: that.queue[0]['type'],
			cache: that.queue[0]['cache'],
			url: that.queue[0]['url'],
			context: that.queue[0]['context'],
			data: that.queue[0]['data'],
			success: onSuccess,
			error: onError,
			dataType: that.queue[0]['dataType']
		});
	}
};

/*
 * Command implementation of the command pattern
 * 
 * References:
 * 
 * http://en.wikipedia.org/wiki/Command_pattern
 * Ross Harmes, Dustin Diaz - Apress (2007), Pro JavaScript Design Patterns 
 */

NWIE.Command = function() {
	//Members and defaults
	this.type = 'POST';
	this.cache = false;
	this.url = '';
	this.context = document.body;
	this.data = {};
	this.dataType = 'html';
	this.execute = function(o){};
	this.onError = function(o){};
	this.onSuccess = function(o){};
	this.responseData = '';
};


var IncrementalPageLoader = IncrementalPageLoader || {};

var URL_RETRIEVE_INSURANCE_POLICIES = '/myaccount/portfolio/RetrieveInsurancePortfolioSummary.action';
var URL_RETRIEVE_INVESTMENTS = '/myaccount/portfolio/RetrieveInvestmentPortfolioSummary.action';
var URL_RETRIEVE_AUTHORIZED_POLICIES = '/myaccount/portfolio/RetrieveAuthorizedPortfolioSummary.action';
var URL_RETRIEVE_DISCLAIMER_SCHEDULED_PAY = '/myaccount/portfolio/DisclaimerForScheduledPayAction.action';
var URL_RETRIEVE_WEBTRENDS_TAGS = '/myaccount/portfolio/RetrieveWebTrendsTags.action';
var URL_RETRIEVE_ALERTS = '/myaccount/alert/RetrieveAlertsAction.action';
var URL_RETRIEVE_PROFILE_COMPLETENESS_POLICIES = '/myaccount/portfolio/RetrieveProfileCompleteness.action';
var TIMEOUT = 30000; //30 seconds

IncrementalPageLoader.showInsuranceLoadError = false;
IncrementalPageLoader.showInvestmentsLoadError = false;
IncrementalPageLoader.showAuthorizedLoadError = false;
IncrementalPageLoader.showAlertsLoadError = false;
IncrementalPageLoader.showProfileCompletenessLoadError = false;
IncrementalPageLoader.isTimeout = false;
IncrementalPageLoader.xhrPool = [];

IncrementalPageLoader.init = function () {
	setTimeout(IncrementalPageLoader.abortAjaxCalls, TIMEOUT);
}

IncrementalPageLoader.abortAjaxCalls = function () {
	IncrementalPageLoader.isTimeout = true;
	
	$(IncrementalPageLoader.xhrPool).each(
		function (index, jqXhr) {
			jqXhr.abort();
		}
	)
	
	IncrementalPageLoader.xhrPool = [];
}

IncrementalPageLoader.loadAlerts = function () {
	
	var cmdLoadAlerts = new NWIE.Command();
	cmdLoadAlerts.url = URL_RETRIEVE_ALERTS;
	cmdLoadAlerts.execute = function (response) {};
	cmdLoadAlerts.onError = function (response) {
		IncrementalPageLoader.showAlertsLoadError = true;		
	}

	var cmdQueue = new NWIE.CommandQueue();
	
	cmdQueue.onComplete = function () {

		if (IncrementalPageLoader.showAlertsLoadError) {
			$('#alerts').css('alertBox');
		} else {
			var alertResponse = $.trim(cmdLoadAlerts.responseData);
		   	if (alertResponse.length > 2) {
				$('#alerts').html(alertResponse);
				oAlertControls.setBindings();
			} else {
				$('#alerts').hide();
			}
		}
		
		alterNavErrors();
		InlineHelp.changeToolTipIdsToUnique();
		InlineHelp.init();
		IncrementalPageLoader.alterClaimsLinkEvent();
	}

	cmdQueue.add(cmdLoadAlerts);
	cmdQueue.flush();
}

IncrementalPageLoader.loadAccountSummary = function () {

	var cmdLoadProfileCompleteness = new NWIE.Command();
	cmdLoadProfileCompleteness.url = URL_RETRIEVE_PROFILE_COMPLETENESS_POLICIES;	
	cmdLoadProfileCompleteness.execute = function (response) {};
	cmdLoadProfileCompleteness.onError = function (response) {
		IncrementalPageLoader.showProfileCompletenessLoadError = true;		
	}
	
	var cmdLoadInsurance = new NWIE.Command();
	cmdLoadInsurance.url = URL_RETRIEVE_INSURANCE_POLICIES;	
	cmdLoadInsurance.execute = function (response) {};
	cmdLoadInsurance.onError = function (response) {
		IncrementalPageLoader.showInsuranceLoadError = true;		
	}
	
	var cmdLoadInvestments = new NWIE.Command();
	cmdLoadInvestments.url = URL_RETRIEVE_INVESTMENTS;
	cmdLoadInvestments.execute = function (response) {};
	cmdLoadInvestments.onError = function (response) {
		IncrementalPageLoader.showInvestmentsLoadError = true;		
	}
	
	var cmdLoadAuthorized = new NWIE.Command();
	cmdLoadAuthorized.url = URL_RETRIEVE_AUTHORIZED_POLICIES;
	cmdLoadAuthorized.execute = function (response) {};
	cmdLoadAuthorized.onError = function (response) {
		IncrementalPageLoader.showAuthorizedLoadError = true;		
	}
	
	var cmdLoadDisclaimerScheduledPay = new NWIE.Command();
	cmdLoadDisclaimerScheduledPay.url = URL_RETRIEVE_DISCLAIMER_SCHEDULED_PAY;
	cmdLoadDisclaimerScheduledPay.execute = function (response) {};
	
	var cmdLoadWebTrendsTags = new NWIE.Command();
	cmdLoadWebTrendsTags.url = URL_RETRIEVE_WEBTRENDS_TAGS;
	cmdLoadWebTrendsTags.execute = function (response) {};
	
	var cmdLoadAlerts = new NWIE.Command();
	cmdLoadAlerts.url = URL_RETRIEVE_ALERTS;
	cmdLoadAlerts.execute = function (response) {};
	cmdLoadAlerts.onError = function (response) {
		IncrementalPageLoader.showAlertsLoadError = true;		
	}

	var cmdQueue = new NWIE.CommandQueue();
	
	cmdQueue.onComplete = function () {
		$('#preloadSpinner').hide();
		
		if (IncrementalPageLoader.showInsuranceLoadError) {
			$('#insuranceLoadError').removeClass('displayNone');				
		} else {
			if (IncrementalPageLoader.isTimeout) {

			}
			
			$('#insurance').html(cmdLoadInsurance.responseData);
		}
					
		if (IncrementalPageLoader.showInvestmentsLoadError) {
			$('#investmentLoadError').removeClass('displayNone');				 
		} else {
			$('#investment').html(cmdLoadInvestments.responseData);
		}
		
		if (IncrementalPageLoader.showAuthorizedLoadError) {
			$('#authorizedLoadError').removeClass('displayNone');				 
		} else {
			$('#authorized').html(cmdLoadAuthorized.responseData);
		}
		
		if (!IncrementalPageLoader.showProfileCompletenessLoadError) {
			$('#profile-completeness').html(cmdLoadProfileCompleteness.responseData);
		}
		
		$('#disclaimerForScheduledPay').html(cmdLoadDisclaimerScheduledPay.responseData);
		
		var str = $.trim(cmdLoadWebTrendsTags.responseData).split('#');
		if (str.length >= 4) {
			for (var i = 3; i < str.length; i += 2) {
				str[i] = handleEmptyString(str[i]);
			}
			//Generate meta tags and inject into head for Maxymiser.
			injectMetaTags(str);
		}
		
		if (IncrementalPageLoader.showAlertsLoadError) {
			$('#alerts').css('alertBox');
		} else {
			var alertResponse = $.trim(cmdLoadAlerts.responseData);
		   	if (alertResponse.length > 2) {
				$('#alerts').html(alertResponse);
				oAlertControls.setBindings();
			} else {
				$('#alerts').hide();
			}
		}
	
		if ($('#insurance').length) {
			$('#productsSeparator').removeClass('no-display');
		}	
		
		alterNavErrors();
		InlineHelp.changeToolTipIdsToUnique();
		InlineHelp.init();
		IncrementalPageLoader.alterClaimsLinkEvent();
	}
	
	cmdQueue.add(cmdLoadInsurance);
	cmdQueue.add(cmdLoadInvestments);
	cmdQueue.add(cmdLoadAuthorized);
	cmdQueue.add(cmdLoadDisclaimerScheduledPay);
	cmdQueue.add(cmdLoadWebTrendsTags);
	cmdQueue.add(cmdLoadAlerts);
	cmdQueue.add(cmdLoadProfileCompleteness);
	cmdQueue.flush();
}

IncrementalPageLoader.alterClaimsLinkEvent = function () {
	$('.button-link').each(function() {
		if($(this).is('[data-claims-pkey]')) {
			$(this).click(function() {
				var policyKey = $(this).attr('data-claims-pkey');
				$('.claimLink').each(function() {
					var newpkeyText = "pkey=" + policyKey +"&"
					var hrefText = $(this).attr('href')
					var startIndex = hrefText.indexOf("pkey=");
					var endIndex = hrefText.indexOf("&",startIndex);
					var currentPkeyText = hrefText.substring(startIndex,endIndex+1);
					$(this).attr('href',hrefText.replace(currentPkeyText,newpkeyText));
				});
			});
		}
	});
}

function alterNavErrors() {
	var errors = $('.nav-options__error');
	if(errors.length > 0) {
		errors.each(function( index ) {
			var span = $(this).find("span");
			if(span.length > 0) {
				span.removeClass('line--primary');
			}
		});
	}
}

function handleEmptyString(param){
	if (param == ' '){
		return 'NULL';
	} else {
		return param;
	}
}

function injectMetaTags(tagsArray) {
	try {
		var metaString = "";
		for (var i = 0; i < tagsArray.length; i += 2) {
			var name = tagsArray[i].replace("DCSext.", "");
			var content = tagsArray[i + 1];
			metaString = metaString.concat("<meta name=\""+ name +"\" content=\""+ (content ? content : "NULL") +"\">");
		}
		if(metaString) {
			$("head").append(metaString);
		}
	} catch (err) {
		console.log("Error occurred while injecting meta tags into the summary page. Error - " + err.message);
	}
}
