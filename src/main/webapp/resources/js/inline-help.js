var InlineHelp = {
	init: function() {
		$(".tooltip__toggle").on("click", function(e) {
			e.preventDefault();

			var clicked   = $(this);
			var tooltipId = clicked.attr("href");
			var toToggle  = $(tooltipId);

			if (toToggle.hasClass("tooltip--active")) {
				clicked.removeClass("tooltip__toggle--active");
				toToggle.removeClass("tooltip--active");
			} else {
				clicked.addClass("tooltip__toggle--active");			
				toToggle.addClass("tooltip--active");
			}
		});
	},
		
	changeToolTipIdsToUnique: function() {
		$(".line").each(function( index ) {
			var tooltipToggleId = $(this).find(".tooltip__wrapfix > a");
			var tooltipHelpId = $(this).find(".tooltip");
			
			if(tooltipToggleId.length > 0 && tooltipHelpId.length > 0) {
			
				tooltipToggleId.attr("href","#" + tooltipHelpId.attr("id") + "_" + index);

				tooltipToggleId.attr("id", tooltipToggleId.attr("id") + "_" + index)
			
				tooltipHelpId.attr("id", tooltipHelpId.attr("id") + "_" + index);
			
			}
		});
	}
}