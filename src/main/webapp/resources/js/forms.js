var NIselfService = NIselfService || {};

/*
	Generic content toggle action
	
	Syntax:
	NIselfService.toggleContent.watch(containerSelector, triggerSelector, primaryCallback, secondaryCallbac);

	Use:
	NIselfService.toggleContent.watch("#container", ".toggle");

	This example will bind to .toggle class elements within #container only.
	This includes any .toggle class elements added later.

*/

NIselfService.toggleContent = {
	watch: function(container, trigger, callback, toggleCallback) {
		trigger   = trigger || ".toggle";

		// Class all associated content elements, used in hide/show later
		$(container+" "+trigger).each(function(k, el) {
			var toggleElement = "#"+$(el).data("hidden-target");
			$(toggleElement).addClass("toggle-content");
		});


		// Click bind on trigger elements
		$(container).on("click", trigger, function(e) {
			if (callback) {
				callback(e); // Use callback function if provided, pass event and that's all
			} else {
				var clicked = $(this);
				var content = $("#"+clicked.data('hidden-target'));
				//var show    = clicked.data("show").toString();

				// Clear any open content elements unless it has 'keepall' modifier
				if (!clicked.hasClass("toggle--keepall")) {
					$(container+" .toggle-content").hide();
				}

				// Select to show, hide or toggle based on modifiers
				if (!clicked.hasClass("toggle--close")) {
					if (!clicked.hasClass("toggle--show")) {
						content.toggle(); // Basic toggle if no modifiers
					} else {
						content.show(); // Always show
					}
				} else {
					content.hide(); // Always hide
				}

				// Prevent default event action unless 'stop' modifier class is present
				if (clicked.hasClass("toggle--stop")) {
					e.preventDefault();
				}

				// Call secondary callback if provided. Use when you need to customize on top of default action
				if (toggleCallback) {
					toggleCallback(e);
				}
			}
		});
	}
}


$.fn.initForms = function () { 
	$("input.watchChanges").change(function(){
		var target = $("#"+$(this).data('hidden-target'));

		if($(this).data("show").toString() === "true" && target.css('display') === "none"){
			target.slideToggle('fast');
		} else if($(this).data("show").toString() !== "true"){
			target.hide();
		} 
	});
	
	$("#reason").change(function(e){
		$(".removeReasonContentBlock").hide();
		//console.log("#"+$(this).val()+"Content");
		$("#"+$(this).val().replace(/ /g, "")+"Content").slideToggle('fast');
	});

	// For contact/garage pages
	NIselfService.toggleContent.watch("#change-contact-garage", ".toggle");
};




// This is for the message components with buttons
$("button.watchChanges").on("click", function(e) {
	e.preventDefault();

	var clicked = $(this);
	var target  = $("#"+clicked.data('hidden-target'));
	var show    = clicked.data("show").toString();
	var buttonContainer = clicked.parent();

	// Clear any display messages, show any hidden buttons
	$(".message-container--closeable").hide();
	$(".action-buttons-container--nobuttons").removeClass("action-buttons-container--nobuttons");

	// Toggle message and buttons
	if (show === "true") {
		// Show error, hide buttons
		$("body").addClass("show-overlay");
		buttonContainer.addClass("action-buttons-container--nobuttons");
		target.show();
	} else {
		// Hide error, show buttons
		target.hide();
		$("body").removeClass("show-overlay");
		$(".action-buttons-container--nobuttons").removeClass("action-buttons-container--nobuttons");
	}
});

$(function() { $.fn.initForms(); }); 
