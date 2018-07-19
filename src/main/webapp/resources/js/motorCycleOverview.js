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

NIselfService.mcPolicySummary = {	
	mcPolicySummaryClick : function(e){
		$(e.currentTarget).toggleAttr('aria-selected', 'false','true').toggleAttr('aria-expanded', 'false','true').next().toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-summary');
		e.preventDefault();
	},
	jsMcPolicySummaryClick : function(e){
		$(e.currentTarget).toggleAttr('aria-selected', 'false','true').toggleAttr('aria-expanded', 'false','true').next().slideToggle('fast').toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-summary');
		e.preventDefault();
	}
}

$.fn.initMotorCyclePolicySummary = function () { 
	if(Modernizr.csstransitions){
		$('.auto-policy-summary__showmore','.auto-policy-summary').on('click', function(e) { NIselfService.mcPolicySummary.mcPolicySummaryClick(e) });
	}else{
		$('.auto-policy-summary__showmore','.auto-policy-summary').on('click', function(e) { NIselfService.mcPolicySummary.jsMcPolicySummaryClick(e) });
	}
};

$(function() { $.fn.initMotorCyclePolicySummary(); }); 
