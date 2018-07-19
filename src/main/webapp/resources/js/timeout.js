/*
 | Session timeout show/hide
 |
 */

var NIselfService = NIselfService || {};

// jQuery formatted selector to search for focusable items
var focusableElementsString = "a[href], button:not([disabled])";

var sess_pollInterval = 60000;

// How many minutes the session is valid for
var sess_expirationMinutes = 19;

// How many minutes before the warning prompt
var sess_warningMinutes = 16;
var sess_intervalID;
var sess_lastActivity;
var timeoutPopUpShown = false;

NIselfService.timeoutWarning = {
	hide : function() {
		$("body").removeClass("show-timeout");
		$('#timeoutWarning').slideUp();
		$('#timeoutWarning').hide();
		timeoutPopUpShown = false;
	},
	timeoutWarningContinueClick : function(e) {
		$("#screenExit").val("exit");
		NIselfService.timeoutWarning.hide();
		callTimeoutAction();
		$.fn.callTimeOut();
		if(confirmationPageAction !="loadConfirmation.action.Confirmation" ) {
			$("#screenExit").val("");
		}
	},
	timeoutWarningLogoutClick : function() {
		if(typeof uploadInProgress != "undefined")
		{
			uploadInProgress = false;
		}
		c2chat.cleanChatSessionData();
		$("#screenExit").val("exit");
		window.location.href = 'logout.action';
	},
	unauthenticatedTimeoutWarningLogoutClick : function() {
		if(typeof uploadInProgress != "undefined")
		{
			uploadInProgress = false;
		}
		$("#screenExit").val("exit");
		window.location.href = 'logout.action';
	},
	trapTabKey : function(obj, evt) {
		// if tab or shift-tab pressed
		if (evt.which == 9) {
			// get list of all children elements in given object
			var o = obj.find('*');

			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(focusableElementsString).filter(
					':visible')
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
				// back tab if focused on first item and user press back-tab, go to the last focusable item
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}

			} else {
				// forward tab if focused on the last item and user press tab, go to the first focusable item
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}
	}
}

function callTimeoutAction() {
    $.ajax({
        url: 'timeout.action',
        type: 'GET',
        async: false,
        dataType: 'html',
        data: {},
        error: function() {
        },
        success: function(html) {
        }
    });
}

function initSessionMonitor() {
	sess_lastActivity = new Date();
	sessClearInterval();
	sessSetInterval();

/*	
 * This code is used for mouse move and key press. 
 * Currently there is now requirement for this but 
 * we have just added here for future use for this code.
 * 
 * $(this).mousemove(function(e) {
		if(!timeoutPopUpShown) {
			sessKeyPressed(e);	
		}
	});
	$(this).keypress(function(e) {
		if(!timeoutPopUpShown) {
			sessKeyPressed(e);	
		}
	});*/
}
function sessSetInterval() {
	sess_intervalID = setInterval('sessInterval()', sess_pollInterval);
}
function sessClearInterval() {
	clearInterval(sess_intervalID);

}
function sessKeyPressed(e) {
	sess_lastActivity = new Date();
}

function sessInterval() {
	var now = new Date();	
	// get milliseconds of differences
	var diff = now - sess_lastActivity;	
	// get minutes between differences
	var diffMins = (diff / 1000 / 60);
	if (diffMins >= sess_warningMinutes) {
		if (diffMins >= sess_expirationMinutes) {		
			$("#screenExit").val("exit");
			if(typeof uploadInProgress != "undefined")
			{
				uploadInProgress = false;
			}
			if(typeof c2chat != "undefined")
			{
				c2chat.cleanChatSessionData();
			}
			
			window.location.href = 'sessionExpired.action';
		} else {
			// warn before expiring. Stop the timer. Prompt for attention
			//sessClearInterval();
			if(!timeoutPopUpShown) {
				$('#timeoutWarning').show();
				$('body').toggleClass('show-timeout');
				//$('.form-content').toggleAttr('aria-hidden', 'true', 'false');
				$('#timeoutWarning').attr("tabindex", -1).focus();
				var currentCancelMsgParentDiv = $("#timeoutWarning");
				$(currentCancelMsgParentDiv).css({
					"position" : "absolute",
					"top" : "200px",
					"maxWidth" : "1200px"
				});
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				$('#timeoutWarning').keydown(function(e) {
					NIselfService.timeoutWarning.trapTabKey($(this), e);
				});	
				timeoutPopUpShown = true;
			}
		}
	}
}

$.fn.callTimeOut = function () {
	initSessionMonitor();
};

$.fn.initButtonsTimeOut = function() {
	$('#timeoutWarningContinue').on('click', function(e) {
		NIselfService.timeoutWarning.timeoutWarningContinueClick(e)
	});
	$('#timeoutWarningLogout').on('click', function(e) {
		NIselfService.timeoutWarning.timeoutWarningLogoutClick(e)
	});
	$('#unauthenticatedTimeoutWarningLogoutClick').on('click', function(e) {
		NIselfService.timeoutWarning.unauthenticatedTimeoutWarningLogoutClick(e)
	});
};

$(function() {
	$.fn.callTimeOut();
	$.fn.initButtonsTimeOut();
});