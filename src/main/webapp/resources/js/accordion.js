var NIselfService = NIselfService || {};

NIselfService.accordion = {	
	accordionHeaderClick : function(e){
		if($(e.currentTarget).next().hasClass('accordion__panel--fixed')){
			$(e.currentTarget).toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false').parent().toggleClass('show-accordion');
			$(e.currentTarget).next().toggleAttr('aria-hidden', 'false', 'true');
			e.preventDefault();
		}
		else{
			$(e.currentTarget).toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false').next().slideToggle('fast').toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-accordion');
			e.preventDefault();
		}
	},
	jsAccordionHeaderClick : function(e){
		$(e.currentTarget).toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false').next().slideToggle('fast').toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-accordion');
		e.preventDefault();
	}
}

$(function ($) { 
	if(Modernizr.csstransitions){
		$('.accordion__header', '.accordion-container').on('click', function(e) { NIselfService.accordion.accordionHeaderClick(e) });
	}else{
		$('.accordion__header', '.accordion-container').on('click', function(e) { NIselfService.accordion.jsAccordionHeaderClick(e) });
	}
});