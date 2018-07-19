enquire.register("screen and (max-width:28.125em)", { //  450px
    deferSetup : true,
    setup : function() {
	    $('.auto-policy-summary__vehicles-drivers', ".auto-policy-summary").attr('aria-hidden', 'true');
	    $('.auto-policy-summary__showmore', ".auto-policy-summary").attr('aria-selected', 'false').attr('aria-expanded', 'false');
    },
    match : function() {
        // show sidebar
    },
    unmatch : function() {
        // hide sidebar
    },
    destroy : function() { },
    deferSetup : true
	});


var NIselfService = NIselfService || {};

NIselfService.rvPolicySummary = {	
	rvPolicySummaryClick : function(e){
		$(e.currentTarget).toggleAttr('aria-selected', 'false','true').toggleAttr('aria-expanded', 'false','true').next().toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-summary');
		e.preventDefault();
	},
	jsRvPolicySummaryClick : function(e){
		$(e.currentTarget).toggleAttr('aria-selected', 'false','true').toggleAttr('aria-expanded', 'false','true').next().slideToggle('fast').toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-summary');
		e.preventDefault();
	}
}

$.fn.initRvPolicySummary = function () { 
	if(Modernizr.csstransitions){
		$('.auto-policy-summary__showmore','.auto-policy-summary').on('click', function(e) { NIselfService.rvPolicySummary.rvPolicySummaryClick(e) });
	}else{
		$('.auto-policy-summary__showmore','.auto-policy-summary').on('click', function(e) { NIselfService.rvPolicySummary.jsRvPolicySummaryClick(e) });
	}
};

$(function() { $.fn.initRvPolicySummary(); }); 

function callEditCoveragesQuoteForRv(policyChangesAllowed) {
	  window.localStorage.clear();
	  if (policyChangesAllowed == "false") 
	  	{
			window.location.href="displayRVCoverages.action";
	  	}
	}
