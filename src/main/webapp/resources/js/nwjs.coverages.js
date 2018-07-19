var NWJS = NWJS || {};


/*
	Edit Coverages Workspace Module

	Bindings and configurations should be declared in this file.
	Any ajax/fetching should be done as callbacks within plugin calls.

*/

NWJS.Coverages = (function($, Modernizr) {



/*
| Local helper methods
|
*/
	var module = {
		onready: function() {

		},

		// Looks for 'data-showlabel' to use as text when toggle trigger is open, replaces with original text when closed
		// *.togglerLabelSwap(obj clickedElement, [bool hideEvent]); // Syntax
		// *.togglerLabelSwap(clicked); // Displays 'open' text label
		// *.togglerLabelSwap(clicked, 1); // Displays 'closed' text label
		togglerLabelSwap: function(clicked, hideAction) {
			if (hideAction) {
				clicked.find(".toggler-label").html($.data(clicked, "showlabel"));
			} else {
				$.data(clicked, "showlabel", clicked.find(".toggler-label").html());
				clicked.find(".toggler-label").html(clicked.data("hidelabel"));
			}
		},

		// Scrolls to element on the page
		scrollPageTo: function(element, speed, offset) {
			if (!speed) { speed = 400; }
			if (!offset) { offset = 0; }
			
			$("html, body").animate({scrollTop: ($(element).offset().top + offset)}, speed);
		},

		// Alias for overlay wait message
		waitRefresh: function(url) {
			NWJS.Global.overlayWaitMessage("Please wait...");
			NWJS.Global.tabCaptureOn(".wait-overlay");

			// Timeout for prototype only, not for build/production
			var delay = Math.floor((Math.random() * 4000) + 1800);
			setTimeout(function() { document.location = url; }, delay);

			// Uncomment for build/production, immediate redirect
			// document.location = url;

		}	
	}
	

/*
| Click2Chat proactive modal
| Activates modal and handles cancel button click
|
*/
	var click2chat = {
		init: function() {
			if($(window).width() < 800 || !$("#proactiveChatSection").is(':visible') || $("#click2chat__modal").length == 0 || $('#proactiveChatEligible').length == 0 || $('#proactiveChatEligible').prop("value") == 'false' || click2chat.isClick2ChatAlreadyInitiated())
			{
				return;
			}
			if (!window.innerHeight) Object.defineProperty(window, 'innerHeight', {
		        get: function () { return html.clientHeight }
		    });

			var dialogOffset = (window.innerHeight * .40);	
			var offset  = ($("body").scrollTop() + dialogOffset);

			NWJS.Global.showOverlay();
			$("#click2chat__modal").css("top",offset);

			NWJS.Global.tabCaptureOn("#click2chat__modal .click2chat");

			click2chat.bind();
			$("#waitPopUp").css("display","none");
		},


		bind: function() {
			$("#click2chat__modal a,button").on("click", function(e) {
				NWJS.Global.hideOverlay();
				NWJS.Global.tabCaptureOff();
			});
		},
		
		isClick2ChatAlreadyInitiated: function() {
			try
		    {
				 if(oWin && !oWin.closed)  
				 {
					 return true;
				 }
		    }
		    catch (e)
		    {
		    }
		    if (opener && !opener.closed){
				return true;
			}
		    return false;
		}
	}


/*
| Edit coverages actions
| Bindings and handling for coverage changes, comparisons and policy edits
|
*/
	// Variants are for prototype demos only, not needed in build/production
	var editCoveragesVariants = {
		change: function() {
			$(".coverage-picker__tile--link").off("click");
			$(".coverage-picker").coveragePicker({
				onClick: function(e, clicked) {
					e.preventDefault();

					if (location.pathname.indexOf("html") < 0) {
						module.waitRefresh("page_coverages_p1.php?version=error#module9");
					} else {
						module.waitRefresh("page_coverages_p1_error.html#module9");
					}
				}
			});
		},

		error: function() {
			$(".coverage-picker__tile--link").off("click");
			$(".coverage-picker").coveragePicker({
				onClick: function(e, clicked) {
					e.preventDefault();
					if (location.pathname.indexOf("html") < 0) {
						module.waitRefresh("page_coverages_p1.php?version=change#module9");
					} else {
						module.waitRefresh("page_coverages_p1_change.html#module9");
					}
				}
			});
		}
	}




	// Base class
	var editCoverages = {
		init: function(variant) {
			editCoverages.bind();

			// Variant switch for prototyping only, not for build/production
			switch(variant) {
				case "change":
					editCoveragesVariants.change();
					break;

				case "error":
					editCoveragesVariants.error();
					break;
			}

			
		},


		// View binding
		bind: function() {
			// Additional click bind on accordion handle for save state
			
			$(".coverages-worksheet .accordion__header").on("click", function(e) {

			});
			

			// Dismiss upsell bar and consider this pill
			$(".accordion__cma--close").on("click", function(e) {
				e.preventDefault();

				// Slide up the message bar
				// Hide the picker pill
				$(this).closest(".accordion__cma").slideToggle("fast");
				$(this).closest(".accordion").find(".coverage-picker__indicator--bottom").hide();

				// Ajax call here for dismissing 

			});


			// For "see more" toggle (plugin)
			$(".coverages__workspace--seemore-trigger").toggler({
				contentClose: ".seemore-close",
				hideEffect: function(el) {
					el.slideToggle("fast");
				},
				onShow:function(handle, content) {
					module.togglerLabelSwap(handle);
				},

				onHide: function(handle, content) {
					module.togglerLabelSwap(handle, 1);					
				}
			});


			// For "view all" toggle (plugin)
			$(".coverages__workspace--viewall-trigger").toggler({
				contentClose: ".viewall-close",
				showEffect: false,
				onShow: function(el) {
					el.closest(".coverages__options").find(".coverages__options--picker").hide();

					$.data(el, "showlabel", el.html());
					el.html(el.data("hidelabel"));
				},
				onHide: function(el) {
					el.closest(".coverages__options").find(".coverages__options--picker").show();
					el.html($.data(el, "showlabel"));			
				}
			});


			// For "view all" toggle (plugin)
			$(".coverages__workspace--carcompare-trigger").toggler({
				contentClose: ".carcompare-close",
				hideEffect: function(el) {
					el.slideToggle("fast");
				},
				onShow: function(el) {
					module.togglerLabelSwap(el);
				},
				onHide: function(el) {
					module.togglerLabelSwap(el, 1);
				}
			});


			// Price picker (plugin)
			if (typeof $.coveragePicker != "undefined") {
				$(".coverage-picker").coveragePicker({
					onClick: function(e, clicked) {
						e.preventDefault();

						// Condition for Prototype only
						if (location.pathname.indexOf("html") < 0) {
							module.waitRefresh("page_coverages_p1.php?version=change#module1");
						} else {
							module.waitRefresh("page_coverages_p1_change.html#module1");
						}
					}
				});
			}



			// Coverage dropdown reaction
			$(".coverages__workspace--viewall select").on("change", function(e) {


			});


			// Vehicle carousel setup + click handling (plugin)
			if (typeof $.vehicleCarousel != "undefined") {
				$(".vehicle-carousel").vehicleCarousel({
			        onClick: function(el) {
			            // Action for carousel click, switch tabs or redirect
			        }
			    });
			}
		}

	}




	// Module onready
	$(function() {
		module.onready();
	});

    return {
        editCoverages: editCoverages.init,
        click2chatModal: click2chat.init
    };

}(jQuery, Modernizr));
