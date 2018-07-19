var NWJS = NWJS || {};


/*
	NWJS Global Module
	Utility helpers that are not dependent on any given project or context.

	Include this after all other plugins, then extend this object with per-context JS modules.
*/

NWJS.Global = (function($, Modernizr) {
	function debug(s) {	if (typeof console !== "undefined" && (window.location.href.indexOf("js=") >= 0)) { console.log(s); } } // Module debug


/*
| Automatic toggler bindings
| Requires toggler plugin
|
*/
	




	// Basic accordion
	var accordion = function() {
		if($.toggler) {
			$(".accordion .accordion__header").toggler({
				contentClose: ".accordion-close",
				onShow:function(clicked, content) {
					clicked.parent().addClass("show-accordion");
				},

				onHide: function(clicked, content) {
					clicked.parent().removeClass("show-accordion");
				}
			});
		}
	}

	// Any links classed with 'toggler'
	var togglerLinks = function() {
		if($.toggler) {
			$(".toggler").toggler();
		}
	}


	var toggler = {
		bind: function() {
			if($.toggler) {
				$(".toggler").toggler();
			}
		},

		// Looks for 'data-showlabel' to use as text when toggle trigger is open, replaces with original text when closed
		// *.togglerLabelSwap(obj clickedElement, [bool hideEvent]); // Syntax
		// *.togglerLabelSwap(clicked); // Displays 'open' text label
		// *.togglerLabelSwap(clicked, 1); // Displays 'closed' text label
		labelSwap: function(clicked, hideAction) {
			if (hideAction) {
				clicked.find(".toggler-label").html($.data(clicked, "showlabel"));
			} else {
				$.data(clicked, "showlabel", clicked.find(".toggler-label").html());
				clicked.find(".toggler-label").html(clicked.data("hidelabel"));
			}
		}
	}




	// Generic onready for public reference
	var onready = function() {
		accordion();
		toggler.bind();
	}





/*
	Tab capture
	Will capture tab keydown actions and limit them to the specified element

	Syntax:
	NWJS.Global.tabCaptureOn(messageContainerSelector);
	NWJS.Global.tabCaptureOff(void);

	Use:
	NWJS.Global.tabCaptureOn("#mymessage"); // Limits tabbing within selector only
	NWJS.Global.tabCaptureOff(); // Removes all tab capturing (restores to pre-capture state)
*/
	var tabCapture = {
		activeSelector: false,
		init: function(focusSelector) {
			debug("Adding tab capture to "+focusSelector);

			tabCapture.activeSelector = focusSelector;

			$(tabCapture.activeSelector).attr("tabindex",-1).focus();
			$(tabCapture.activeSelector).off("keydown.tabcapture");
			$(tabCapture.activeSelector).on("keydown.tabcapture", function(e) { tabCapture.capture($(this),e);});
		},

		capture: function(obj,evt) {
			if (evt.which == 9) {
				// get list of all children elements in given object
				var o = obj.find('*');
				var focusableItems = o.filter("a[href], button:not([disabled])").filter(':visible'); // get list of focusable items
				var focusedItem    = $(':focus');
				var numberOfFocusableItems = focusableItems.length;
				var focusedItemIndex       = focusableItems.index(focusedItem);

				if (evt.shiftKey) {
					//back tab
					if(focusedItemIndex==0){
						focusableItems.get(numberOfFocusableItems-1).focus();
						evt.preventDefault();
					}

				} else {
					//forward tab
					if(focusedItemIndex==numberOfFocusableItems-1){
						focusableItems.get(0).focus();
						evt.preventDefault();
					}
				}
			}
		},

		release: function() {
			$(tabCapture.activeSelector).off("keydown.tabcapture");
		}
	} // END tabCapture	





/*
	Full page modal overlay
	Show/hide/toggle the full page overlay that comes with opacity.
	Does not include any styles. Use corresponding stylesheet rules.

	Use:
	NWJS.Global.showOverlay();
	NWJS.Global.hideOverlay();
	NWJS.Global.toggleOverlay();	
	NWJS.Global.overlayWaitMessage(); // Includes overlay message
*/
	var pageOverlay = {
		vars: {
			exists: false
		},

		check: function() {
			if (!pageOverlay.vars.exists) {
				pageOverlay.vars.exists = $(".overlay").size();

				if (pageOverlay.vars.exists <= 0) {
					debug("Overlay element not found, appending to <body>");					
					$("body").append('<div class="overlay" tabindex="-1"></div>');
				}
			}
		},

		show: function() {
			pageOverlay.check();
			$("body").addClass("show-overlay");
		},

		hide: function() {
			$("body").removeClass("show-overlay");
		},

		toggle: function() {
			pageOverlay.check();

			$("body").toggleClass("show-overlay");
		},

		waitMessage: function(message, offsetPercent) {
			NWJS.Global.showOverlay();

			if (!offsetPercent) { offsetPercent = 35; }
			if (!message) { message = "Please wait..."; }

			var dialogOffset = (window.innerHeight * (offsetPercent / 100));	
			var offset       = ($(window).scrollTop() + dialogOffset);

			// If element does not exist, insert into body
			if (parseInt($(".wait-overlay").size()) > 0) {
				$(".wait-overlay span").html(message);
				$(".wait-overlay").css("display","");
			} else {
				$("body").append('<div id="waitPopUp" role="alert" aria-live="assertive" class="wait-overlay overlay-child"><span>'+message+'</span></div>');
			}

			$(".wait-overlay").css("top",offset+"px");
		}
	}	


/*
| Module onReady and public methods
|
*/

	// Module onready, these will fire on *every* page
	$(function() {
		accordion();
		toggler.bind();

		// Adds .innerHeight property if it doesn't exist, for certain browsers
		if (!window.innerHeight) Object.defineProperty(window, 'innerHeight', {
	        get: function () { return html.clientHeight }
	    });
	});

	// Only returned values will be public to other modules
    return {
    	onready: onready,					// Generic onready load for global bindings (used in content callback)
		showOverlay: pageOverlay.show,		// NWJS.Global.showOverlay(void)
		hideOverlay: pageOverlay.hide,		// NWJS.Global.hideOverlay(void)
		overlayWaitMessage: pageOverlay.waitMessage, // NWJS.Global.overlayWaitMessage([str message, int offset percent])
		toggleOverlay: pageOverlay.toggle,	// NWJS.Global.toggleOverlay(void)        
		tabCaptureOn: tabCapture.init,	    // NWJS.Global.tabCaptureOn(str selector)
		tabCaptureOff: tabCapture.release,	// NWJS.Global.tabCaptureOff(void)
		togglerLabelSwap: toggler.labelSwap
    };

}(jQuery, Modernizr));
