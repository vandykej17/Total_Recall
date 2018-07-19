
function callEvents(url, pkey) {
	window.location.href = url + "?pkey=" + pkey;
}

function callUpdateAddress() {

	document.forms[m_form].action = "loadEditContactInfo.action";
    document.forms[m_form].method = "POST";
    document.forms[m_form].submit();	
	
}


$.fn.resetLocalStorageBeforeCMA = function () {
			localStorage.removeItem('NWJS_loadMasterQuoteResponsive_action>accordionStates');
			localStorage.removeItem('NWJS_VS_loadMasterQuoteResponsive_action>viewAllStates');
};

$(function() { $.fn.resetLocalStorageBeforeCMA(); });
