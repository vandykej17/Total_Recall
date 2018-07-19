/*
 | Session timeout show/hide.
 */
var NIselfService = NIselfService || {};

NIselfService.timeoutWarning = {	
	config: {
		millisecondsForTimeoutWarningPopUp: 17*60*1000,
		millisecondsToExpireAfterPopUp: 2.75*60*1000,
		popupWindowTimeOut: null,
		newSessionTimeOut: null,
		focusableElementsString: "a[href], button:not([disabled]), input[type=text]:not([disabled])" // jQuery formatted selector to search for focusable items.
	},
	show: function() {
		$(".message-container--modal").not("#timeoutWarning").each(function() {
			$(this).removeClass("message-container--modal");
		});

		//Find foresee survey close button and click it if present
		if ($("a.fsrCloseBtn").length > 0) {
			$("a.fsrCloseBtn")[0].click();
		}
		
		// Check if preferences tab is opened and close it before showing session timeout warning
		if ($("body").hasClass("show-profile")){
			$("body").removeClass("show-profile");
		}
		
		$("#timeoutWarning").slideDown('fast');
		$("body").addClass("show-overlay");
		$("div.outer-container").attr("aria-hidden", true);
		$('#mobile-navigation-cam').attr("aria-hidden", true);
		$('#skip-to-main-content').attr("aria-hidden", true);
		$("html, body").animate({scrollTop: ($("body").offset().top)}, 250); // Scrolls to top
		$('#timeoutWarning').attr("tabindex",-1).focus();
		//$(document).off('keydown');
		$(document).on('keydown', function(e) { NIselfService.timeoutWarning.trapTabKey($('#timeoutWarning'),e);});
		NIselfService.timeoutWarning.config.popupWindowTimeOut = setTimeout(NIselfService.timeoutWarning.sessionExpired, NIselfService.timeoutWarning.config.millisecondsToExpireAfterPopUp);
		$('#overlay').addClass('overlay-blocker');
	},
	sessionExpired: function() {
		window.location.href = '/myaccount/SessionExpired.action'
	},
	hide: function() {
		
		$('#overlay').removeClass('overlay-blocker');
		
		$(".alert-container--active, .modal-window").each(function() {
			$(this).addClass("message-container--modal");
		});
		
		$('#timeoutWarning').slideUp(400, function() {
			if ($(".message-container--modal:visible").length == 0) {
				$("body").removeClass("show-overlay");
				$("div.outer-container").attr("aria-hidden", false);
				$('#mobile-navigation-cam').attr("aria-hidden", false);
				$('#skip-to-main-content').attr("aria-hidden", false);
			}
		});
		$(document).off('keydown');
		if ($('#navigationAlert').is(':visible')) {
			$(document).on('keydown', function(e) { NIselfService.inlineModal.trapTabKey($('#navigationAlertTabCapture'),e) } );
		}
	},
	timeoutWarningContinueClick: function (){
		NIselfService.timeoutWarning.hide();
		window.clearTimeout(NIselfService.timeoutWarning.config.popupWindowTimeOut);
		newSessionTimeOut = setTimeout(NIselfService.timeoutWarning.show, NIselfService.timeoutWarning.config.millisecondsForTimeoutWarningPopUp);
		$.ajax({
			type: "POST",
			url: "/myaccount/SessionManagement.action"
		});
	},
	timeoutWarningAngularEvent: function (){
		window.clearTimeout(newSessionTimeOut);
		newSessionTimeOut = setTimeout(NIselfService.timeoutWarning.show, NIselfService.timeoutWarning.config.millisecondsForTimeoutWarningPopUp);
		$.ajax({
			type: "POST",
			url: "/myaccount/SessionManagement.action"
		});
	},
	timeoutWarningLogoutClick: function (){
		window.location.href = '/myaccount/Logout.action'
	},
	trapTabKey : function(obj,evt){
		// if tab or shift-tab pressed
		if ( evt.which == 9 ) {
			// get list of all children elements in given object
			var o = obj.find('*');

			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(NIselfService.timeoutWarning.config.focusableElementsString).filter(':visible')
			// get currently focused item
			var focusedItem;
			focusedItem = jQuery(':focus');
			
			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length

			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);
	
			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if(focusedItemIndex==0 || focusedItemIndex == -1){
					focusableItems.get(numberOfFocusableItems-1).focus();
					evt.preventDefault();
				}
			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if(focusedItemIndex==numberOfFocusableItems-1|| focusedItemIndex == -1){
					focusableItems.get(0).focus();
					evt.preventDefault();				
				}
			}
		}
	},
	
	overlayClick: function(e) {
		$('#timeoutWarning').focus();
	},
	
	init: function() {
		newSessionTimeOut = setTimeout(NIselfService.timeoutWarning.show, NIselfService.timeoutWarning.config.millisecondsForTimeoutWarningPopUp);
		$('#timeoutWarningContinue').on('click', function(e) { NIselfService.timeoutWarning.timeoutWarningContinueClick(e) });
		$('#timeoutWarningLogout').on('click', function(e) { NIselfService.timeoutWarning.timeoutWarningLogoutClick(e) });
		$('#overlay').on('click', function(e) {NIselfService.timeoutWarning.overlayClick(e)});
	}
}
