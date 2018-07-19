oCommonIframe = {
	navigateTopLocation: function () {
		if (frames) {
			if(top != self) {
				top.location=self.location;
			}
		}				
	}
}

oPopupModule = {
	oPopupClasses:{sm:"popup-sm",med:"popup-med",lg:"popup-lg",full:"popup-full"},
	oPopupSizes:{sm:"height=400,width=527",med:"height=600,width=575",lg:"height=620,width=780",full:""},
	oWindowAttrs:"status=1,resizable=1,scrollbars=1",
	oPopupOffset:{top:"25",left:"25"},

	init:function() {
		$.each(this.oPopupClasses, function(key, value) {
			$("a." + value).click( function(){
				var top = oPopupModule.oPopupOffset.top;
				var left = oPopupModule.oPopupOffset.left;
				oPopupModule.oPopupOffset.top = eval(top) + 25;
				oPopupModule.oPopupOffset.left = eval(left) + 25;
				var parameters = oPopupModule.oWindowAttrs + ",top=" + top + ",left=" + left + "," + oPopupModule.oPopupSizes[key];
				if (oPopupModule.oPopupClasses[key]!="popup-full") { window.open(this.href, "popup", parameters).focus(); }
				else { window.open(this.href, "popup").focus(); }
				return false;
			});
		});
	}
};

oContactUs = {
	writeGenericAgentPhoto: function(imageUrl, staticContentLocation, div,imgIndex) {
		$('#' + div).html("<img id=\"imgGenericAgentPhoto "+ imgIndex +" \" src='" + imageUrl + "' alt='Generic Agent Photo' onError='src=\"" + staticContentLocation + "/myaccount/includes/images/n-eagle.png\"' class='img'>");
	}
}

oPaperlessTerms = {
	submitForm:function (formAction) {
		var formActionUrl = '/myaccount/profile/' + formAction;
		$('#ModalForm').attr('action', formActionUrl);	
		$('#ModalForm').submit();
	}
}

oNavigationAlert = {
	overlayContainer: '#navigationAlertContainer',
	overlayHtml: '<div class="modal-window message-container--modal nw-gcb-dom-control" id="navigationAlert" role="alert" aria-live="assertive" aria-hidden="false" style="display:block;">' +
		'<h2 id="modalTitle">Unsaved Changes</h2>' +
		'<div class="modal-content group">' +
		'<p id="modalContent">Are you sure you want to cancel/leave this page? Any changes will not be saved.</p>' +
		'<div class="clear"></div>' +
		'<div id="navigationAlertTabCapture">'+
		'<a href="#" id="focusForAria" class="hidden" aria-describedby="modalTitle modalContent" >modal title</a>'+
		'<a href="#" class="button-link preferred equal-width button-right" id="btnCancelNo" >No</a>' +
		'<a href="#" class="button-link non-preferred equal-width button-left" id="btnCancelYes">Yes</a>' +
		'</div>' +
		'</div>' +
		'</div>',

		
	setInitialData: function(form) {
		$(form).find('input[type="text"],input[type="password"],select').each(
			function() {
				$(this).data('initialValue', $(this).val());
			}
		);
		$(form).find('input[type="radio"]').each(
			function() {
				$(this).data('initialValue', $(this).prop('checked'));
			}
		);
	},
	
	resetFormData: function(form) {
		$(form).find('input[type="text"],input[type="password"],select').each(
			function() {
				$(this).val($(this).data('initialValue'));
			}
		);
		$(form).find('input[type="radio"]').each(
			function() {
				$(this).prop('checked', $(this).data('initialValue'));
			}
		);
	},
	
	hasModifiedData: function(form) {
		var modified = false;
		
		$(form).find('input[type="text"],input[type="password"],select').each(
			function() {
				if (($(this).data('initialValue') != $(this).val())) {
					if(($(this).data('initialValue') != undefined)){
					modified = true;
					return;
					}
				}
		});
		$(form).find('input[type="radio"]').each(
			function() {
				if ($(this).data('initialValue') != $(this).prop('checked')) {
					modified = true;
					return;
				}
		});
		return modified;
	},

	appendOverlay: function(onYes) {
		$(oNavigationAlert.overlayContainer).empty();
		$(oNavigationAlert.overlayContainer).html(oNavigationAlert.overlayHtml);
		$('body').addClass('show-overlay');
		$("div.outer-container").attr("aria-hidden", true);
		$('#mobile-navigation-cam').attr("aria-hidden", true);
		$('#skip-to-main-content').attr("aria-hidden", true);
		$('#skip-to-main-content').attr("tabindex", "0");
		$(oNavigationAlert.overlayContainer).off('click', '#btnCancelNo');
		$(oNavigationAlert.overlayContainer).on('click', '#btnCancelNo', function (event) {
			if (AuthorizationCenter.isAuthWidgetLoaded() && AuthorizationCenter.dirty) {
				AuthorizationCenter.cancel = false;
			}
			event.preventDefault();
			if ($('body').hasClass('show-profile')) {
				$('#btnProfile').trigger('click');
			}
			oNavigationAlert.hideOverlay(oNavigationAlert.overlayContainer);
		});
		$(oNavigationAlert.overlayContainer).off('click', '#btnCancelYes');
		$(oNavigationAlert.overlayContainer).on('click', '#btnCancelYes', function (event) {
			event.preventDefault();
			oNavigationAlert.hideOverlay(oNavigationAlert.overlayContainer);
			if (typeof onYes == 'function') {
				onYes();
			}
		});
		$('#focusForAria').show();
		$('#focusForAria').focus();
		$('#focusForAria').hide();
		$(document).off('keydown');
		$(document).on('keydown', function(e) { NIselfService.inlineModal.trapTabKey($('#navigationAlertTabCapture'),e) } );
		$('#overlay, #navigationAlert').on('click', function() {
			if ($('#overlay').hasClass('overlay-blocker')) {
				$('#timeoutWarning').focus();
			} else {
				$('#btnCancelNo').focus();
			}
		});
	},

	hideOverlay: function() {
		$('body').removeClass('show-overlay');
		$("div.outer-container").attr("aria-hidden", false);
		$('#mobile-navigation-cam').attr("aria-hidden", false);
		$('#skip-to-main-content').attr("aria-hidden", false);
		$('#skip-to-main-content').attr("tabindex", "1");
		$(document).off('keydown');
		$(oNavigationAlert.overlayContainer).empty();
	},
	
	isAuthCenterDirty: function(event) {
		var dirty = false;
		
		if (AuthorizationCenter.isAuthWidgetLoaded() && AuthorizationCenter.dirty) {
			dirty = true;
			AuthorizationCenter.cancel = true;
		}
		
		return dirty;
	},
	
	init: function() {
		$('a').not('[href^="#"]').not('[target="_blank"]').not('.popup-sm,.popup-med,.popup-lg,.popup-full').on('click', function(event) {
			// Check for preference center being loaded because it has its own code for button manipulation.  See preferenceCenter.js
			if (!PreferenceCenter.loaded) {
				event.preventDefault();
				var accordionContainer = $(".nav-options-container.show-edit");
				if (oNavigationAlert.hasModifiedData(accordionContainer.find('form')) || oNavigationAlert.isAuthCenterDirty(event)) {
					oNavigationAlert.appendOverlay(function() { oButtonLogic.processEventLink(event); });
				} else {
					oButtonLogic.processEventLink(event);
				}
			}
		});
	}
}

oDateUtil = {
	dateConvert: function(){
		var lastLoginTime = $('#unformattedLastLoginTime').val(); 
	    if (lastLoginTime != null && lastLoginTime != '') {
	    	var estDate = moment.tz(lastLoginTime, 'YYYY-MM-DDThh:mm:ss', 'America/New_York').toDate();
	    	var localTime = moment(estDate).format('MM/DD/YY h:mma');
	    	$('#lastLoginTime').html(localTime); 
	    }
	    
	},
	
	refresh: function() {
	    if ($('#lastLoginTime').length == 1) {
	    	$('#utilityNameWelcome').addClass("utility-name__LLT");
	    	$('#utilityNameWelcome').removeClass("utility-name__welcome");
	    	$('#lastLoginTimeContainer').removeClass("hidden");
	    } else {
	    	$('#utilityNameWelcome').addClass("utility-name__welcome");
	    	$('#utilityNameWelcome').removeClass("utility-name__LLT");
	    }
	},
	
	getLastLogin: function() {
		var lastLoginTime = $('#unformattedLastLoginTime').val(); 
		if (lastLoginTime != null && lastLoginTime != '') {
			oDateUtil.dateConvert();
			oDateUtil.refresh();
		}
		else {
			$.ajax({
				type: 'POST',
				url: '/myaccount/portfolio/RetrieveUserAccountData.action',
				cache: false,
				success: function(data, status) {
					$('#unformattedLastLoginTime').val(data);
					oDateUtil.dateConvert();
					oDateUtil.refresh();
				}
			});
		}
	}
}

$(document).ready(function(){
	oPopupModule.init();
	oNavigationAlert.init();
	oDateUtil.getLastLogin();
});