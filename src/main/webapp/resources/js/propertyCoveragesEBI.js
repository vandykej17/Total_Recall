$.fn.logPropertyCoverageSeeMoreCoverageEBI = function () {
	$(document).on("click",".coverages__workspace--seemore-trigger",function(e){
		$(".active").addClass("coverages__workspace--seeless-trigger");
		$(".active").removeClass("coverages__workspace--seemore-trigger");
		var scenario = "seeMore";
		var selectedSeemoreLinkName = $(this).attr("name");
		var selectedPropertyCoverage = selectedSeemoreLinkName.split("_")[1];
		$.ajax({
	        url: 'logPropertyCoveragesEbiForSeeMore.action',
	        type: 'POST',
	        async: true,
	        dataType: 'html',
	        data: {selectedPropertyCoverage : selectedPropertyCoverage, scenario : scenario},
		});	
	});
};

$.fn.seeLessLink = function () {
	$(document).on("click",".coverages__workspace--seeless-trigger",function(e){
		$(".inactive").addClass("coverages__workspace--seemore-trigger");
		$(".inactive").removeClass("coverages__workspace--seeless-trigger");
	});
}

$(function() { $.fn.logPropertyCoverageSeeMoreCoverageEBI(); });
$(function() { $.fn.seeLessLink(); });
