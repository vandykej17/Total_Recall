var NIselfService = NIselfService || {};
// jQuery formatted selector to search for focusable items
var focusableElementsString ="a[href], button:not([disabled])";

function handleFormSubmitEvent(){
	$('body').toggleClass('show-wait');
	$('.form-container').toggleAttr('aria-hidden', 'true','false');
	$('#waitMessage').attr("tabindex",-1).focus();
	$('body').keydown(NIselfService.disableTab);			
	//Commented following line. navigationObject is null.
	//navigationObject.submitAction();
	
}

NIselfService.disableTab = function (e) {
	if ( e.which == 9 ) e.preventDefault(); 
}

NIselfService.inlineModal = {	
	continueClick : function(e){
		handleFormSubmitEvent();
	},
	cancelNoClick : function(e){
		$('body').toggleClass('show-cancel');
		$('.form-content').toggleAttr('aria-hidden', 'true','false');
	},
	cancelYesClick : function(e){
		window.location.href = 'index.html'
	},
	trapTabKey : function(obj,evt){
		// if tab or shift-tab pressed
		if ( evt.which == 9 ) {
			// get list of all children elements in given object
			var o = obj.find('*');

			// get list of focusable items
			var focusableItems;
			focusableItems = o.filter(focusableElementsString).filter(':visible')
			// get currently focused item
			var focusedItem;
			focusedItem = jQuery(':focus');
			
			// get the number of focusable items
			var numberOfFocusableItems;
			numberOfFocusableItems = focusableItems.length

			// get the index of the currently focused item
			var focusedItemIndex;
			focusedItemIndex = focusableItems.index(focusedItem);
	
			if (evt.shiftKey) {
				//back tab
				// if focused on first item and user preses back-tab, go to the last focusable item
				if(focusedItemIndex==0 || focusedItemIndex ==-1){
					focusableItems.get(numberOfFocusableItems-1).focus();
					evt.preventDefault();
				}
				
			} else {
				//forward tab
				// if focused on the last item and user preses tab, go to the first focusable item
				if(focusedItemIndex==numberOfFocusableItems-1|| focusedItemIndex == -1){
					focusableItems.get(0).focus();
					evt.preventDefault();				
				}
			}
		}
	}
}

$(function ($) { 
	$('#usernameContinue').on('click', function(e) { NIselfService.inlineModal.continueClick(e) });
	$('#passwordContinue').on('click', function(e) { NIselfService.inlineModal.continueClick(e) });
	$('#btnCancelNo').on('click', function(e) { NIselfService.inlineModal.cancelNoClick(e) });
	$('#btnCancelYes').on('click', function(e) { NIselfService.inlineModal.cancelYesClick(e) });
});


