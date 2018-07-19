oAlertControls = (function() {
	function showAlerts() {
		$('#overlay').on('click', function(e) {overlayClick(e)});
		var timeoutID = window.setTimeout( function(){
			$('.alerts-container').show();
			window.clearTimeout(timeoutID);
		}, 750);
	}

	function toggleAlerts(e) {
		if(!$(e.currentTarget).parent().hasClass('alerts-open')){
			$('.alerts-tab').parent().removeClass('alerts-open');
			$(e.currentTarget).parent().addClass('alerts-open');
		}
		else{
			$('.alerts-tab').parent().removeClass('alerts-open');
		}
	}

	function closeAlert(e) {
		var parentList = $(e.currentTarget).closest("ul");
		$(e.currentTarget).parent().remove();
		doAction(e);
		
		//Remove entire div if last list item is removed
		if (parentList.children("li").size() == 0) {
			$("#passiveAlertGrey").hide();
		} else {
			updateCounts(parentList);
		}
		
		return false;
	}
	
	function updateCounts(ul) {
		if (ul.children().size() == 1) {
			$("#closeAlertControl").html("Close alert");
			$("#alertCount").html("1 alert");
		} else {
			$("#alertCount").html(ul.children().size() + " alerts");
		}
	}
	
	function showSpinnerAndRedirect(e) {
		$('body').toggleClass('show-wait');
		$('#waitMessage').attr("tabindex",-1).focus();
		$('#waitMessage').show();
		$('body').keydown(function(ev) { if ( ev.which == 9 ) ev.preventDefault(); });
		return doAction(e);
	}

	function doAction(e) {
		var sUrl = $(e.currentTarget).attr("href");
		var sRedirect = $(e.currentTarget).attr("redirect");
		$.ajax({
			type: "POST",
			url: sUrl,
			complete: function(data, textStatus) {
				if(typeof sRedirect != "undefined") {
					window.location = sRedirect;
				}
			}
		});
		return false;
	}
	
	function showActiveAlert(alertName) {
		//Add code to make ajax call for previous alert event
		var ajaxUrl;
		if (alertName == "EMAIL_INVALID_FORMAT" || alertName == "EMAIL_HARD_BOUNCE") {
			ajaxUrl = "../alert/InputEmailInvalidAlert.action?operation=" + alertName;
		}else if (alertName == "MULTIPLE_REGISTRATION") {
			ajaxUrl = "../alert/ConsolidateRegistrationsAlert.action"
		}
		
		if (alertName == "MULTIPLE_REGISTRATION") {
			$.ajax({
				type: "POST",
				url: ajaxUrl,
				complete: function(data, status, response) {
					$('#multipleAccountsAlert').html(data.responseText);
					var alertDiv = $("div.alert-container--active");
					alertDiv.insertAfter("#timeoutWarning");
					alertDiv.show();
					alertDiv.attr("tabindex", -1).focus();
					alertDiv.keydown(function(e) { NIselfService.timeoutWarning.trapTabKey($(this),e);});
					$('#closeMultipleAccountsAlert').on('click', hideActiveAlert);
				}
			});
		} else if (ajaxUrl != null) {
			$.ajax({
				type: "POST",
				url: ajaxUrl
			});
			var alertDiv = $("div.alert-container--active");
			alertDiv.insertAfter("#timeoutWarning");
			alertDiv.show();
			alertDiv.attr("tabindex", -1).focus();
			alertDiv.keydown(function(e) { NIselfService.timeoutWarning.trapTabKey($(this),e);});
		} else {
			var alertDiv = $("div.alert-container--active");
			alertDiv.insertAfter("#timeoutWarning");
			alertDiv.show();
			alertDiv.attr("tabindex", -1).focus();
			alertDiv.keydown(function(e) { NIselfService.timeoutWarning.trapTabKey($(this),e);});
		}
		
		$("body").addClass("show-overlay");
		$("div.outer-container").attr("aria-hidden", true);
		$('#mobile-navigation-cam').attr("aria-hidden", true);
		$('#skip-to-main-content').attr("aria-hidden", true);
	}
	
	function bindFocusAndBlur() {
		$('.alert-container--active .has-error input, .alert-container--active .field-has-error').focus(function(e){
			$(this).addClass('is-active');
		});

		$('.alert-container--active .has-error input, .alert-container--active .field-has-error').blur(function(e){
			if($(this).val().length == 0){
				$(this).removeClass('is-active');
			}
		});
	}
	
	function showInlineErrorMessage() {
		var errorDiv = $("div.alert-message.fail");
		errorDiv.insertAfter("h1#skip-main-content");
		errorDiv.show();
		return false;
	}
	
	function overlayClick(e) {
		if ($('#overlay').hasClass('overlay-blocker')) {
			$('#timeoutWarning').focus();
		} else {
			$('div.alert-container--active').focus();
		}
	}
	
	function hideActiveAlert() {
		$("body").removeClass("show-overlay");
		$("div.alert-container--active").hide();
		$("div.outer-container").attr("aria-hidden", false);	
		$('#mobile-navigation-cam').attr("aria-hidden", false);	
		$('#skip-to-main-content').attr("aria-hidden", false);
	}
	
	function showSuccessMessage() {
		var errorDiv = $("div.alert-message.success");
		errorDiv.insertAfter("h1#skip-main-content");
		errorDiv.show();
		return false;
	}
	
	function hideErrorMessages() {
		$("div.alert-container--active div.field-group").removeClass("has-error");
		$("div.alert-container--active div.error-message").hide();
	}
	
	function submitUpdateEmail(e){
		if (EditEmailAddress.validateAddress($("#emailAlertInput").val()) != "continue") {
			validateEmailAndShowErrors();
			return false;
		}
		$(".alert-container--active").removeClass("message-container--modal");
		$('body').toggleClass('show-wait');
		$('#waitMessage').attr("tabindex",-1).focus();
		$('#waitMessage').show();
		$('body').keydown(function(ev) { if ( ev.which == 9 ) ev.preventDefault(); });
		$.ajax({
			type: "POST",
			url: $(e.currentTarget).attr('action'),
			data: $(e.currentTarget).closest('form').serialize(),	
			error: function() {
				//If call fails due to system error or similar
				hideActiveAlert();
				showInlineErrorMessage();
			},
			success: function(response, status, jqXHR){
				if (response == "success") {
					hideActiveAlert();					
					showSuccessMessage();
				} else if (response == "blank") {
					hideErrorMessages();
					$("div.alert-container--active div.field-group").addClass("has-error");
					$("#emailBlankError").show();
					bindFocusAndBlur();
				} else if (response == "invalid") {
					hideErrorMessages();
					$("div.alert-container--active div.field-group").addClass("has-error");
					$("#emailInvalidError").show();
					bindFocusAndBlur();
				} else if (response == "same") {
					hideErrorMessages();
					$("#emailAlertInput").removeClass("is-active");
					$("div.alert-container--active div.field-group").addClass("has-error");
					$("#sameEmailError").show();
					bindFocusAndBlur();
				} else {
					hideActiveAlert();
					showInlineErrorMessage();
				}
			},
			complete: function() {
				$('body').toggleClass('show-wait');
				$(".alert-container--active").addClass("message-container--modal");
				$('#waitMessage').hide();
			}
		});
		
		return false;
	}
	
	function removePassiveAlert(e)
	{
		var ajaxUrl = "../alert/UpdateAlertDeliveryStatus.action?";
		var params = "alertAction=Remove&alertId=16&alertName=PLENTI&alertType=Passive";
		
		$.ajax({
			type: "POST",
			url: ajaxUrl+params,
			complete: function(data, status, response) {
				closeAlert(e);
			}
		})
	}
	
	function openPlenti(e,url){
		window.open(url,"_blank");
		closeAlert(e);
	}
	
	
	function updateAlertDeliveryStatus(e){
		var ajaxUrl = "../alert/UpdateAlertDeliveryStatus.action?";
		var params;
		
		if (e.currentTarget.id == "plentiContinueToAccounts"){
			params = "alertAction=ContinueToAccounts&alertId=8&alertName=PLENTI&alertType=Active";
		} else if (e.currentTarget.id == "plentiLearnMore"){
			params = "alertAction=LearnMore&alertId=8&alertName=PLENTI&alertType=Active";
		} else if (e.currentTarget.id == "paperlessRemind") {
			params = "alertAction=RemindMeLater&alertId=2&alertName=ELECTRONIC_DOCUMENT_DELIVERY&alertType=Active";
		} else if (e.currentTarget.id == "eSigRemind") {
			params = "alertAction=Close&alertId=1&alertName=ESIGNATURE&alertType=Active";
		} else if (e.currentTarget.id == "nonSignableRemind") {
			params = "alertAction=Close&alertId=10&alertName=TRAILING_DOCUMENT&alertType=Active";
		} else if (e.currentTarget.id == "muaAddAccess") {
			params = "alertAction=MuaAddAccess&alertId=9&alertName=MUA&alertType=Active";
		} else if (e.currentTarget.id == "muaNoThanks") {
			params = "alertAction=MuaNoThanks&alertId=9&alertName=MUA&alertType=Active";
		} else if (e.currentTarget.id == "muaRemindMeLater") {
			params = "alertAction=MuaRemindMeLater&alertId=9&alertName=MUA&alertType=Active";
		}
		
		if (params != null) {
			$(".alert-container--active").removeClass("message-container--modal");
			$('body').toggleClass('show-wait');
			$('#waitMessage').attr("tabindex",-1).focus();
			$('#waitMessage').show();
			$('body').keydown(function(ev) { if ( ev.which == 9 ) ev.preventDefault(); });
			$.ajax({
				type: "POST",
				url: ajaxUrl + params,
				complete: function() {
					$('body').toggleClass('show-wait');
					$(".alert-container--active").addClass("message-container--modal");
					$('#waitMessage').hide();
					hideActiveAlert();
				}
			});
		}
		
		return false;
	}
	
	function validateEmailAndShowErrors(e) {
		
		setTimeout(function() {
			var operation = EditEmailAddress.validateAddress($("#emailAlertInput").val());
			hideErrorMessages();
			$("#emailAlertInput").removeClass("is-active");
			if (operation == "blank") {
				$("#emailBlankError").show();
				$("div.alert-container--active div.field-group").addClass("has-error");
				bindFocusAndBlur();
			} else if (operation == "invalid") {
				$("div.alert-container--active div.field-group").addClass("has-error");
				$("#emailInvalidError").show();
				bindFocusAndBlur();
			};
		}, 250);
	}
	
	function setBindings() {
		$('a.alerts-tab').on('click', toggleAlerts);
		$('a.alerts-btn-close').on('click', closeAlert);
		$('a.alerts-content-passiveplenti').on('click', removePassiveAlert);
		$('a.alerts-redirect').on('click', showSpinnerAndRedirect);
		$('#emailInvalidUpdateForm').on('submit', submitUpdateEmail);
		$('button.alerts-btn-update-status').on('click', updateAlertDeliveryStatus);
		$('#emailAlertInput').on('change', validateEmailAndShowErrors);
		showAlerts();
	}
	
	return {
		setBindings: setBindings,
		showActiveAlert: showActiveAlert
	};
})();