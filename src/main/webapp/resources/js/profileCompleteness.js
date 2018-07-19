var oProfileCompleteness = (function($) {
	var constants = {
		identifierMapping :{
			"automatic-payments":"autoPaymentNoThanks" ,
			"text-alerts":"textAlertsNoThanks" ,
			"paperless":"paperlessNoThanks"
		}	
	},
		methods = (function() {
		var updateSessionNotToShowBanner = function() {
			$("#profile-completeness").hide();
			$.ajax({
				type: "POST",
				url: "/myaccount/portfolio/UpdateSessionNotToShowBanner.action",
				data: {showBanner: false},
				success: function(data, textStatus) {},
				complete: function(data, textStatus) {}
			});
		},
		fireEbi = function(linkId) {
			$.ajax({
				type: "POST",
				url: "/myaccount/portfolio/FireEbiForProfileCompleteness.action",
				data: {linkName: linkId},
				success: function(data, textStatus) {},
				complete: function(data, textStatus) {}
			});
		},
		updateStatusIndicators = function(linkId) {
			$.ajax({
				type: "POST",
				url: "/myaccount/portfolio/UpdateStatusIndicators.action",
				data: {linkName: linkId},
				dataType: "text",
				success: function(data, textStatus) {},
				complete: function(data, textStatus) {
					if (data.responseText == 3){
							$("#profile-completeness-dont-show-again").show();
							$("#profile-completeness-remind-me-later").hide();
						} else {
							$("#profile-completeness-remind-me-later").show();
							$("#profile-completeness-dont-show-again").hide();
						}
					}
			});
		},
		updateIndicatorContent = function(element) {
			var preferencesModuleContent = $(element).closest(".preferences-module-content");
			var preferencesTextElement = $(preferencesModuleContent).find(".preferences-text");
			var preferencesText = $(preferencesTextElement).data("noThanksText");
			$(preferencesTextElement).html(preferencesText);
			var profileCompletenessImage = $(preferencesModuleContent).find(".profile-completeness-image");
			var noThanksImageSrc = $(profileCompletenessImage).data("noThanksImage");
			$(profileCompletenessImage).attr("src", noThanksImageSrc);
			
		},
			init = function() {
				$(".close-icon, .profile-completeness-remind-me-later").click(function() {
					updateSessionNotToShowBanner();
					fireEbi("remindMeLater");
				});
				$(".preferences-no-thanks-link").click(function() {
					var id = $(this).data("identifier");
					fireEbi(constants.identifierMapping[id]);
					updateStatusIndicators(constants.identifierMapping[id]);
					updateIndicatorContent(this);
					if(constants.identifierMapping[id] == "autoPaymentNoThanks"){
						$("#automatic-payments-module-no-thanks-link").hide();
					}
					else if(constants.identifierMapping[id] == "textAlertsNoThanks"){
						$("#text-alerts-module-no-thanks-link").hide();
					}
					else if (constants.identifierMapping[id] == "paperlessNoThanks") {
						$("#paperless-module-no-thanks-link").hide();
					}
				});
				$("#profile-completeness-dont-show-again").click(function() {
					updateStatusIndicators("dontShowAgain");
					$("#profile-completeness").hide();
					fireEbi("dontShowAgain");
				});
			};
			
			return {
				init: init
			}
	})();
	
	return methods;
})(jQuery);