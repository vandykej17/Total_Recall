function EbiCommon(){
	this.logEbiEvent = logEbiEvent;
	this.logEbieventWithID = logEbieventWithID;
}

var ebiCommon = new EbiCommon();

function logEbiEvent(params){
	var destUrl = "ebiEventTrigger.action";

	$.ajax({
	   	 url: destUrl,
	   	 type: 'GET',
	   	 async: true,
	   	 dataType: 'html',
		 data: {parameters: params},
		 error: function(e){	
		 },  
		 success: function(html) {	
		 }
	}); 
	
	return true;
}
function logEbieventWithID(eventID, ebiEventDescription){
	var params = "event:" + eventID +","+
	 			 "ebiEventDescription:"+ ebiEventDescription +"";
	logEbiEvent(params);
}