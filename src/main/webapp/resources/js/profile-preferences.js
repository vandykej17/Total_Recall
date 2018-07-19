$(function ($) {
	// For "see more" toggle (plugin)
	$(".seeMoreLink").toggler({
		hideEffect: function(el) {
			el.slideToggle("fast");
		},
		onShow:function(handle, content) {
			togglerLabelSwap(handle);
		},

		onHide: function(handle, content) {
			//togglerLabelSwap(handle, 1);					
		}
	});
	
	var run = 0;
	$("[data-type='toggler']").on('click', function(e) {
		var dataTarget = $(this).data("toggler");
		var expandedAccordian = $(".nav-options-container.show-edit");
		e.preventDefault();
		if (oNavigationAlert.hasModifiedData(expandedAccordian.find('form')) && run <1) {
			oNavigationAlert.appendOverlay(function () {
				oNavigationAlert.resetFormData(expandedAccordian.find('form'));
				run++
				$(e.currentTarget).trigger(e);
			});
		} else {
			run = 0;
			$(".nav-options-edit-container").not($(dataTarget)).hide().parents('.nav-options-container').removeClass('show-edit');
			$(".nav-options-edit-container").not($(dataTarget)).parents('.nav-options-container').find('.nav-options-container__header-container').find('[data-type="toggler"]').attr('aria-expanded', 'false').attr('aria-selected', 'false');
			$(".nav-options-edit-container").not($(dataTarget)).parents('.nav-options-container').find('.nav-options-edit-container').attr('aria-hidden', 'true'); 
			$(dataTarget).slideToggle('fast').parents('.nav-options-container').toggleClass('show-edit');
			$(dataTarget).css('overflow', '');
			$(e.currentTarget).parents('.nav-options-container').find('.nav-options-container__header-container').find('[data-type="toggler"]').toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false');
			$(dataTarget).toggleAttr('aria-hidden', 'false','true');
			oNavigationAlert.setInitialData($(dataTarget).find('form'));
			expandedAccordian.trigger('clearErrors');
		}
	});
	
	if($('#expandedSection').val() != null) {
		var expandedSection = $('#expandedSection').val();
		$('[data-label='+ expandedSection +']').slideToggle('fast').parents('.nav-options-container').toggleClass('show-edit');
		$('[data-label='+ expandedSection +']').parents('.nav-options-container').find('.nav-options-container__header-container').find('[data-type="toggler"]').toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false');
		$('[data-label='+ expandedSection +']').toggleAttr('aria-hidden', 'false','true');
	}
});