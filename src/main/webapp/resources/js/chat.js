/*
 * We need to load following values from properties files - 
 * 1. apikey - 
 * 		a. Test - yfj6ofwRAWen4wMIGzcbfkuU4C7mnuL4
 *      b. Prod - Dont know yet.
 * 2. baseURL - 
 *      a. Test - https://api-test.nwie.net:443/communication/
 *      b. PT/STAGING -	https://api-stage.nationwide.com:443/communication/	
 *      c. Prod - https://api.nationwide.com:443/communication/
 * 3. statsQueueObjectId suffix - 
 * 		a. For Test, suffix is mcr
 * 		b. For production, suffix is cmh_mcr_link
 * 4. contact us url
 * 
 * author - tiwarv1
 */
var NIselfService = NIselfService || {};

NIselfService.chat = {

	sessionInformation : {
		BU : "Web_Support",
		AppID : "CAM",
		firstName : "",
		lastName : "",
		nameSuffix : "",
		email : "",
		pageTitle : "",
		agreementNumber: ""
	},

	loadEnvProps : function() {
		var chatApiKey = $('#chatApiKey').val();
		var chatBaseUrl = $('#chatBaseUrl').val();
		var chatStatsQueueObjectIdSuffix = $('#chatStatsQueueObjectIdSuffix').val();

		console.log(chatApiKey + ' ' + chatBaseUrl + ' ' + chatStatsQueueObjectIdSuffix);

		return {
			baseUrl : chatBaseUrl,
			chatApiPath : 'chat/v1/WebSupport',
			multiStatApiPath : 'stat/v1/internal_statistics',
			apikey : chatApiKey,
			statsAgentsObjectId : NIselfService.chat.sessionInformation.BU + '_C2Chat_VAG',
			statsQueueObjectId : NIselfService.chat.sessionInformation.BU + '_C2Chat_VQ@' + chatStatsQueueObjectIdSuffix,
			defaultBU : NIselfService.chat.sessionInformation.BU
		};
	},
	
	initClickToChat : function() {
		var postInitCallback = function() {
			//User should not be able to initiate a chat when navigated from IAM to CAM.
			//c2chat.createChatWidget();
		};
		c2chat.initChat(postInitCallback, NIselfService.chat.sessionInformation, NIselfService.chat.loadEnvProps());
	},

	isWithinBusinessHours : function() {
		var FORMAT = 'hh:mm:ss';
		var NINE_AM = moment('09:00:00', FORMAT);
		var NINE_PM = moment('21:00:00', FORMAT);
		var FIVE_THIRTY_PM = moment('17:30:00', FORMAT);

		var agentTime = moment().tz("America/New_York");
		var dayOfTheWeek = agentTime.format('dddd');
		switch (dayOfTheWeek) {
		case 'Sunday':
			return false;
		case 'Saturday':
			return agentTime.isBetween(NINE_AM, FIVE_THIRTY_PM);
		default:
			return agentTime.isBetween(NINE_AM, NINE_PM);
		}
	},

	canChatBeDisplayed : function() {
		return NIselfService.chat.isWithinBusinessHours();
	},

	updateSessionInformation : function(sessionInfo) {
		$.each(sessionInfo, function(key, value) {
			if (sessionInfo[key]) {
				NIselfService.chat.sessionInformation[key] = value;
			}
		});
	},

	init : function() {
		var root = $(location).attr('origin');
		if (NIselfService.chat.canChatBeDisplayed()) {
			NIselfService.chat.initClickToChat();
		}
	}
};