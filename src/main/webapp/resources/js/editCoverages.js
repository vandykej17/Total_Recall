var editMode = false;
var fastRateErrorCount=0;
var focusedDiv ="";
function createMapForCoverages(key, val) {
var index = -1;
key = key.replace(/&amp;/g,"&");
   for(var i=0; i<keyArray.length; i++){
	            if(keyArray[i]==key){
	                index = i;
	            }
	        }


	if(index == -1){
		keyArray.push(key);
		valArray.push(val);
	}
	else{
	if(valArray[index]!=val){
		valArray[index]=val;
	}
	}
	
}

function callFastRateJson(coverageKey, coverageLimit,id,name) {
	
	clearFastRateErrors(coverageKey);
	$('#action-primary').attr("disabled",false);
	$('#action-primary').removeClass('button--disabled');
	var firstVehicleId = document.getElementById('firstVehicleId').value;
	var mode = 'fastrate';
	var index = -1;
	   for(var i=0; i<keyArray.length; i++){
		            if(keyArray[i]==coverageKey){
		                index = i;
		            }
		        }
	if(index != -1){	  
		valArray[index] = coverageLimit;
	}
	var scrollToIdDiv= $("[name='"+name+"']").parents('div[id^="module"]').attr("id");
	focusedDiv = $("#"+scrollToIdDiv).offset().top;
	
	NWJS.Global.overlayWaitMessage();
	$.ajaxSettings.traditional = true;
	$.ajax({
	    url: 'quickRateOnEdit.action',
	    type: 'POST',
	    dataType: 'html',
	    cache: false,
	    data: {keyArray : keyArray, valArray : valArray, mode:mode, firstVehicleId:firstVehicleId, coverageKey: coverageKey},
	    success: function(html){
	    	if(html.indexOf('CommonError') != -1){
	    			$('#serverError').html(html);
		        	NWJS.Global.hideOverlay();
		        	selectLastSelectedButton(coverageLimit,coverageKey,id);
		        	processFastRateErrors(coverageKey);
		        	showCMAs();
		        }else {
			    	NWJS.Global.hideOverlay();
			    	$('#bodyContent').html(html);
			    }
	    },
	    error: function(){
	    }
	    });  
}

function selectLastSelectedButton(coverageLimit,coverageKey,id){
	var idSelected= coverageKey+"|"+coverageLimit;
	var idForParentOf = $("[id='"+idSelected+"']").parent().parent().attr("id");
	if(idForParentOf != undefined) {
	var idForParentOfWithoutHyphen = idForParentOf.split("_")[0];
	idForParentOfWithoutHyphen= idForParentOfWithoutHyphen+"_";
	$('[id^=' + idForParentOfWithoutHyphen + ']').removeClass("coverage-picker__tile--selected");
	$("[id^='"+coverageKey+"']").text("Select");
	$("[id^='"+coverageKey+"']").parent().removeClass("coverage-picker__tile--selected");
	$("[id='"+idSelected+"']").text("Selected");
	$("[id='"+idSelected+"']").parent().parent().addClass("coverage-picker__tile--selected");
	}
}

function processFastRateErrors(coverageKey) {
	$('#action-primary').attr("disabled",true);
	$('#action-primary').addClass('button--disabled');
	var fastRateErrorStringJS = document.getElementById('fastRateErrorString').value;
	var vehicleId = coverageKey.split('_');
	
	if(fastRateErrorStringJS != null && fastRateErrorStringJS != "") {
		var errorList = fastRateErrorStringJS.split('#');
		var error;

		for(error=0; error <errorList.length -1 ; ++error) {
			var errorKeyAndValue = errorList[error].split(':');
			if (errorKeyAndValue[0].indexOf('_') != -1) {
				NWJS.Coverages.click2chatModal();
				var errorKeys = errorKeyAndValue[0].split('_');
				var errorValue = errorKeyAndValue[1];
				for (var i in errorKeys) {
					if(document.getElementById('error_'+ errorKeys[i] + '_' + vehicleId[1]) != null) {
						var accordionfooterId = document.getElementById('message_'+errorKeys[i]+ '_' + vehicleId[1]);
						var errorBadgeId = document.getElementById('error_'+ errorKeys[i] + '_' + vehicleId[1]).previousElementSibling.firstChild;
						var vehicleCarousel = document.getElementById('carousel_' + vehicleId[1]);
						$(vehicleCarousel).addClass('error');
					} else if(document.getElementById('error_'+ errorKeys[i]) !=null) {
						var accordionfooterId = document.getElementById('message_'+errorKeys[i]);
						var errorBadgeId = document.getElementById('error_'+ errorKeys[i]).previousElementSibling.firstChild;
					}
					
					$(errorBadgeId).addClass('coverages__icon--alert');
					if (accordionfooterId != null ) {
						$(accordionfooterId).append('<li>' + errorKeyAndValue[1] + '</li>' );
						$(accordionfooterId).parent().parent().parent().show();
						removeDuplicateItems(accordionfooterId);
					}else{
						var accordionFooterArray = document.querySelectorAll('[id^="message_'+errorKeys[i]+'"]');
						var errorBadgeArray  = document.querySelectorAll('[id^="error_'+errorKeys[i] +'"]');
						var vehicleCarouselArray  = document.querySelectorAll('[id^="carousel_"]');
						var index;

						for(index = 0; index < accordionFooterArray.length; ++index) {
							$(accordionFooterArray[index]).append('<li>' + errorKeyAndValue[1] + '</li>' );
							$(accordionFooterArray[index]).parent().parent().parent().show();
							removeDuplicateItems(accordionFooterArray[index]);
						}
						jQuery.each(errorBadgeArray , function( i, val ) {
							if(val != null) {
								var header = $(val)[0].previousElementSibling.firstChild;
								$(header).addClass('coverages__icon--alert');
							}
						});
					}
				}
			}else {
				singleAccordionError(coverageKey,errorKeyAndValue);
			}
		}
	}
	
	fastRateErrorCount = $(".coverages__icon--alert").length;
	$('#errors').show();
	$('#errors').html("<span>" + fastRateErrorCount + "</span> Error Notifications");
	$('#estimatedDecreasedPremium').hide();
	$('#estimatedIncreasedPremium').hide();
	$('.compare-Vehicle-ExpandedLimit').hide();
	fastRateErrorCount = 0;
	fastRateErrorStringJS=null;
}

function singleAccordionError(coverageKey,errorKeyAndValue){
	var errorKey = errorKeyAndValue[0].split('_');
	var errorValue = errorKeyAndValue[1];
	
				if (coverageKey.indexOf('_IC') != -1) {
					var vehicleId = coverageKey.split('_');
					var accordionfooterId = document.getElementById('message_'+errorKey+ '_' + vehicleId[1]);
					var errorBadgeId = document.getElementById('error_'+ errorKey + '_' + vehicleId[1]).previousElementSibling.firstChild;
					var vehicleCarousel = document.getElementById('carousel_' + vehicleId[1]);
					$(vehicleCarousel).addClass('error');
				}else {
						var accordionfooterId = document.getElementById('message_'+errorKey);
						var errorBadgeId = document.getElementById('error_'+ errorKey).previousElementSibling.firstChild;
				}
				$(errorBadgeId).addClass('coverages__icon--alert');
				if ( accordionfooterId != null) {
						$(accordionfooterId).append( '<li>' + errorKeyAndValue[1]  + '</li>');
						$(accordionfooterId).parent().parent().parent().show();
						removeDuplicateItems(accordionfooterId);
				}
				
}


$.fn.initEditCoverages = function () { 
	$('.coverages__workspace--seemore-trigger').each(function(){
		var contentObj =$(this).attr('id');
		if(contentObj!= undefined){
			$(this).siblings('div.coverages__workspace--seemore').attr('id','seemore'+contentObj);
		}
	})
};


function onLoadFunction(){
	var accordionToBeExpanded = document.getElementById('accordionToBeExpanded').value;
	showCMAs();
	if(accordionToBeExpanded == "")
	{
		return;
	}
	var divIdForAnchor= $('#'+accordionToBeExpanded).children().find("a");
	var anchorId = divIdForAnchor.attr("id");
	$("#"+anchorId).toggleAttr('aria-expanded', 'true','false').toggleAttr('aria-selected', 'true','false').next().next().slideToggle('fast').toggleAttr('aria-hidden', 'false','true').parent().toggleClass('show-accordion');
	accordionStates.update(divIdForAnchor);
	scrollToCoverages(anchorId);
}

function scrollToCoverages(id) { 
  // Scroll
  $('html,body').animate({scrollTop: $("#"+id).offset().top},'slow');
};

function scrollToCoveragesFocus() {
	if(focusedDiv !="" && focusedDiv != undefined){
		$('html,body').animate({scrollTop: focusedDiv},'fast');
		focusedDiv ="";
	}
};

function showVehicleCoverages(vehicleID) {	
	 document.getElementById('firstVehicleId').value = vehicleID;
    $('.vehicleAccordion').show();
    $('.vehicleAccordion').not('[id^=' + vehicleID + ']').hide();
}

$(function() { $.fn.initEditCoverages(); });

function lTrim(value){
	if (value == null) { 
		return null; 
	}
	for(var i=0; value.charAt(i)==" " || value.charAt(i)== "\t" || value.charAt(i) == "\n"; i++);
	return value.substring(i, value.length);
}

function rTrim(value){
	if (value == null) { 
		return null; 
	}
	for(var i=value.length-1; value.charAt(i)==" " || value.charAt(i)== "\t" || value.charAt(i) == "\n"; i--);
	return value.substring(0, i+1);
}

function trim(value){ 
	return lTrim( rTrim(value) );
}

function removeDuplicateItems(id) {

	if (id != null || id != undefined) {
		var items = id.getElementsByTagName("li");
		var seen = {};
		for ( var i = 0; i < items.length; ++i) {
			// do something with items[i], which is a <li> element
			var txt = $(items[i]).text();
			if (seen[txt])
				$(items[i]).remove();
			else
				seen[txt] = true;
		}
	}
}

function showCMAs(){
	if(document.getElementById('cmaHiddenFields') != undefined && document.getElementById('cmaHiddenFields') != null)
	{
		var cmasToShow = $('#cmaHiddenFields').children('input');
		for(var i=0; i<$('#cmaHiddenFields').children('input').length; i++){
			var cmaId = $('#cmaHiddenFields').children('input')[i].id;
			var cmaMessage = $('#cmaHiddenFields').children('input')[i].value;
			if (cmaMessage != 'Consider this coverage' && cmaMessage.indexOf('month') == "-1")
			{
				cmaMessage = cmaMessage + "&cent/month";
			}
			var cmaSectionToShow = cmaId.substring(0, cmaId.indexOf('Hidden'));
			var badgeLength = 0;
			var considerThisExists = false;
			try {
				badgeLength = $('#' + cmaSectionToShow).parents(0).children('.accordion__header').children('.coverages__summary-container--badge').length;
				considerThisExists = ($('#' + cmaSectionToShow).parents(0).children('.accordion')[0].innerHTML.indexOf('coverage-picker__indicator--bottom') != -1);
			}
			catch(e){}
			if(badgeLength == 0 || considerThisExists)
			{
				$('#' + cmaSectionToShow).show();
				document.getElementById(cmaSectionToShow).innerHTML = cmaMessage + '<span class="accordion__cma--close" onclick="handleCMADisposition(\''  +  cmaId +  '\');"><a href="#">No thanks</a></span>';
			}
			else
			{
				$('#' + cmaSectionToShow).hide();
				document.getElementById(cmaSectionToShow).innerHTML = '';
			}
		}
	}
	
}

function handleCMADisposition(cmaId){
	logDispositionEvent('NotIntrested', 'No Thanks', cmaId);
	if(cmaId.indexOf('vehicle') != -1)
	{
		var cmaPrefix = cmaId.substring(0, cmaId.indexOf('_'));
		for(var i=0; i<$('#cmaHiddenFields').children('input').length; i++){
			var otherCmaId = $('#cmaHiddenFields').children('input')[i].id;
			if(otherCmaId != cmaId && otherCmaId.indexOf(cmaPrefix) != -1)
			{
				var cmaSectionToHide = otherCmaId.substring(0, otherCmaId.indexOf('Hidden'));
				$('#' + cmaSectionToHide).hide();
			}
		}
	}
	decrementCMACount();
}

function decrementCMACount(){
	var numberOfCMAs = parseInt(document.getElementById('cmaCount').innerHTML);
	if(numberOfCMAs == 1)
	{
		$('#covderageConsiderations').hide();
	}
	else
	{
		numberOfCMAs = numberOfCMAs - 1;
		document.getElementById('cmaCount').innerHTML = numberOfCMAs;
	}
}

function logDispositionEvent(isIntrested, link, coverage){
	$.ajax({
        url: 'logCmaEvents.action',
        type: 'POST',
        async: true,
        dataType: 'html',
        data: { cma : coverage, isInterested : isIntrested, link : link},
        error: function() {
        },
        success: function(html) {
        	$("#dispositionDiv").html(html);
        }
    });
}

$.fn.hideSeeMoreLink = function () {
	$.each($('.coverages__workspace--seemore-trigger'), function() { 
		if(!$(this).prev().hasClass("coverages__workspace--seemore")){
	    	$(this).hide();
	    }
	});
};

$(function() { $.fn.hideSeeMoreLink(); });


function clearFastRateErrors(coverageKey) {
	
	if(document.getElementById('fastRateErrorString') != null || document.getElementById('fastRateErrorString') != undefined) {
	var fastRateErrorStringJS = document.getElementById('fastRateErrorString').value;
	
	if(fastRateErrorStringJS != null && fastRateErrorStringJS != "") {

		var errorList = fastRateErrorStringJS.split('#');
		
		var error;

		for(error=0; error <errorList.length -1 ; ++error) {
			
				var errorKeyAndValue = errorList[error].split(':');
					if (errorKeyAndValue[0].indexOf('_') != -1) {
						var errorKeys = errorKeyAndValue[0].split('_');
						var errorValue = errorKeyAndValue[1];
							for (var i in errorKeys) {
									if (coverageKey.indexOf('_IC') != -1) {
										var vehicleId = coverageKey.split('_');
										var accordionfooterId = document.getElementById('message_'+errorKeys[i]+ '_' + vehicleId[1]);
										if(document.getElementById('error_'+ errorKeys[i] + '_' + vehicleId[1]) != null) {
											var errorBadgeId = document.getElementById('error_'+ errorKeys[i] + '_' + vehicleId[1]).previousElementSibling.firstChild;
										}
										var vehicleCarousel = document.getElementById('carousel_' + vehicleId[1]);
										$(vehicleCarousel).removeClass('error');
									}else {
											var accordionfooterId = document.getElementById('message_'+errorKeys[i]);
											if(document.getElementById('error_'+ errorKeys[i]) != null) {
												var errorBadgeId = document.getElementById('error_'+ errorKeys[i]).previousElementSibling.firstChild;
											}
									}
									$(errorBadgeId).removeClass('coverages__icon--alert');
									if (accordionfooterId != null ) {
										$(accordionfooterId).append('<li>' + errorKeyAndValue[1] + '</li>' );
										$(accordionfooterId).parent().parent().parent().hide();
										clearErrorsCoverage(accordionfooterId);
								}else{
									var accordionFooterArray = document.querySelectorAll('[id^="message_'+errorKeys[i]+'"]');
									var errorBadgeArray  = document.querySelectorAll('[id^="error_'+errorKeys[i] +'"]');
									var vehicleCarouselArray  = document.querySelectorAll('[id^="carousel_"]');
									var index;
										for(index = 0; index < accordionFooterArray.length; ++index) {
											$(accordionFooterArray[index]).append('<li>' + errorKeyAndValue[1] + '</li>' );
											$(accordionFooterArray[index]).parent().parent().parent().hide();
											clearErrorsCoverage(accordionFooterArray[index]);
										}
										
										jQuery.each(errorBadgeArray , function( i, val ) {
											if(val != null) {
												var header = $(val)[0].previousElementSibling.firstChild;
												$(header).removeClass('coverages__icon--alert');
											}
										});
										
								}
									
							}
					}else {
						var errorKey = errorKeyAndValue[0].split('_');
						var errorValue = errorKeyAndValue[1];
						
									if (coverageKey.indexOf('_IC') != -1) {
										var vehicleId = coverageKey.split('_');
										var accordionfooterId = document.getElementById('message_'+errorKey+ '_' + vehicleId[1]);
										var errorBadgeId = document.getElementById('error_'+ errorKey + '_' + vehicleId[1]).previousElementSibling.firstChild;
										var vehicleCarousel = document.getElementById('carousel_' + vehicleId[1]);
										$(vehicleCarousel).removeClass('error');
									}else {
											var accordionfooterId = document.getElementById('message_'+errorKey);
											var errorBadgeId = document.getElementById('error_'+ errorKey).previousElementSibling.firstChild;
									}
									$(errorBadgeId).removeClass('coverages__icon--alert');
									if ( accordionfooterId != null) {
											$(accordionfooterId).append( '<li>' + errorKeyAndValue[1]  + '</li>');
											$(accordionfooterId).parent().parent().parent().hide();
											clearErrorsCoverage(accordionfooterId);
									}
						}
		}
		
		$('#errors').hide();
		fastRateErrorCount = 0;
		fastRateErrorStringJS=null;
	}
	
	}
}

function clearErrorsCoverage(id) {

	if (id != null || id != undefined) {
		var items = id.getElementsByTagName("li");
		for ( var i = 0; i < items.length; ++i) {
				$(items[i]).remove();
		}
	}
}
