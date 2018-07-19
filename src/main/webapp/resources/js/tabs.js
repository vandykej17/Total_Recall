var NIselfService = NIselfService || {};

NIselfService.tabs = {	
	tabsHeaderClick : function(e){
		$(e.currentTarget).siblings().removeClass('tabs__tab--active').find('a').attr('aria-expanded','false').attr('aria-selected','false');
		$('.tabs__panel','.tabs').hide().attr('aria-hidden','true');
		$(e.currentTarget).addClass('tabs__tab--active').find('a').attr('aria-expanded', 'true').attr('aria-selected','true');
		$('#' + $(e.currentTarget).find('a').attr('rel')).show().attr('aria-hidden','false').focus();
		e.preventDefault();
	}
}


$.fn.initTabs = function () {
		if (!$(".tabs__navigation").hasClass("tabs__navigation--links")) {
			$('.tabs__navigation .tabs__tab-container').on('click', function(e) { NIselfService.tabs.tabsHeaderClick(e) });
		}

		/*if (!window.location.hash) {
			$('.tabs__tab-container:first','.tabs').toggleClass('tabs__tab--active').find('a').toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false');
			$('.tabs__panel:first','.tabs').show().toggleAttr('aria-hidden', 'false','true');
		}*/
		
	
	/*if (window.location.hash) {
	  	var hash = window.location.hash.substring(1);
	  	var tabHeader = $(".tabs").find('[rel="'+hash+'"]');
	  	var tabPanel = $(".tabs").find('[name="'+hash+'"]');
	  	
	  	$('.tabs__panel','.tabs').hide();
	  	
	  	// Show requested panel via hash tag in URL & assign proper ARIA attributes
	  	$(tabHeader).attr('aria-expanded','true').attr('aria-selected','true').parents('li.tabs__tab-container').addClass('tabs__tab--active');
	  	$(tabPanel).show().attr('aria-hidden','false');
	}*/
};

$(function() { $.fn.initTabs(); }); 
