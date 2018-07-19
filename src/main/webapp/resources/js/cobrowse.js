var NIselfService = NIselfService || {};
NIselfService.cobrowse = {

	sessionInformation : {
		BU : "Web_Support",
		AppID : "CAM"
	},
	
	constants : {
		ebiPath: "/myaccount/portfolio/FireEbiForCobrowse.action",
		eventType : {
			initiate : "initiate",
			accept : "accept"
		}
	},
	
	setPageTitle: function() {
		//Find page sub title
		var pageTitle = $('title').text().trim();
		NIselfService.cobrowse.sessionInformation['pageTitle'] = pageTitle; 
	},
	
	callback : function(){
		var eventHooks = {
		   fireInitiate: function() {
		        var payload = {},
		        	root = $(location).attr('origin');
				payload.pageTitle = NIselfService.cobrowse.sessionInformation['pageTitle'];
				payload.eventType = NIselfService.cobrowse.constants.eventType.initiate;
				payload.addlInfo = NIselfService.cobrowse.eventHooksHelper.buildPayloadAddlInfo();
				payload.AppID = NIselfService.cobrowse.sessionInformation["AppID"];
				
				$.ajax({
					url : root + NIselfService.cobrowse.constants.ebiPath,
					dataType : 'json',
					cache : false,
					type: "POST",
					data: $.param(payload)
				});
		       },
		       fireAccept: function() {
			        var payload = {},
			        	root = $(location).attr('origin');
					payload.pageTitle = NIselfService.cobrowse.sessionInformation['pageTitle'];
					payload.eventType = NIselfService.cobrowse.constants.eventType.accept;
					payload.addlInfo = NIselfService.cobrowse.eventHooksHelper.buildPayloadAddlInfo();
					payload.AppID = NIselfService.cobrowse.sessionInformation["AppID"];
					
					$.ajax({
						url : root + NIselfService.cobrowse.constants.ebiPath,
						dataType : 'json',
						cache : false,
						type: "POST",
						data: $.param(payload)
					});
			       },
		     };
		
		return eventHooks
	},
	
	eventHooksHelper : {
		addlInfoKeysOrder : [
     		"AppID",
     		"BU"
     	],
	     	trimLengths : {
	     		firstName : 10,
	     		lastName : 10
	     	},
	     	replacePipesWithSpace : function (string) {
	     		return string.replace(/\|/g, " ");
	     	},
     		trimStringToLength : function (string, key) {
     			var trimLength = NIselfService.cobrowse.eventHooksHelper.trimLengths[key];
     			if (trimLength !== undefined) {
     				return string.substring(0, trimLength);
     			} else {
     				return string;
     			}
     		},
     		processInfo : function (info, key) {
	     		info = NIselfService.cobrowse.eventHooksHelper.replacePipesWithSpace(info);
	     		info = NIselfService.cobrowse.eventHooksHelper.trimStringToLength(info, key);
	     		return info;
	     	},
			updateArrayWithSessionInformation : function (addlInfoArr, key) {
				if (NIselfService.cobrowse.sessionInformation[key] !== "") {
					addlInfoArr.push(NIselfService.cobrowse.eventHooksHelper.processInfo(
							NIselfService.cobrowse.sessionInformation[key], key));
				}
				return addlInfoArr;
			},
			updateArrayWithSessionData : function(addlInfoArr, key) {
				addlInfoArr = NIselfService.cobrowse.eventHooksHelper.updateArrayWithSessionInformation(addlInfoArr, key);
        		return addlInfoArr;
        	},
		    buildPayloadAddlInfo : function () {
        		var addlInfoData = [];
	    		NIselfService.cobrowse.eventHooksHelper.addlInfoKeysOrder.forEach(function(key) {
	    			addlInfoData =  NIselfService.cobrowse.eventHooksHelper.updateArrayWithSessionInformation(addlInfoData, key);
	    		});
	    		return addlInfoData.join("|");
        	}
	},
	
	init : function(gcbScriptUrl, cobrowseUrl, cobrowseCssBrowser, cobrowseDebug) {
			NIselfService.cobrowse.setPageTitle();
			cobrowse.initCobrowse({
				gcbScriptURL: gcbScriptUrl,
				cobrowseServerURL: cobrowseUrl,
				cssBrowser: cobrowseCssBrowser,	// Set to true in dev
				debug: cobrowseDebug,	// Set to false to disable GCB server logs in the browser console
				eventHooks: NIselfService.cobrowse.callback()
			});
		}
}