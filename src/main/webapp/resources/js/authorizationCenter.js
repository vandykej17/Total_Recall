var AuthorizationCenter = {
	constants: null,
	dirty: null,
	cancel: false,
	currentPage: '',
	
	loadAuthCenter: function(elementId, guid) {
		AuthorizationCenter.constants = require('authorization-center-constants');
		
		var bootstrapModule = require('authorization-center-bootstrapper');
		var bootstrapper = new bootstrapModule.Bootstrapper();
		var $injector = bootstrapper.loadAuthorizationCenter({
			rootElementId: elementId,
			config: {
				GUID: guid
			}
		});
		
		if ($injector !== null) {
			$('meta[name="WT.er"]').remove();
			$('head').append( '<meta name="WT.cg_s" content="[Manage Authorized User]">' );
			AuthorizationCenter.addEventListeners($injector.get('$rootScope'));
		} else {
			//Error loading widget
			$('head').append( '<meta name="WT.er" content="[MUA Unavailable]">' ); 
		}
	},
	
	isAuthWidgetLoaded : function() {
		if (typeof angular !== 'undefined') {
			try {
				angular.module('authorization-center');
				return true
			} catch (err) {
				return false;
			}
		}
		
		return false;
	},
	
	addEventListeners: function($rootScope) {
		$rootScope.$on(AuthorizationCenter.constants.EVENTS.NAVIGATION_CONFIRMATION, function(event, args) { AuthorizationCenter.showConfirmation(event, args, $rootScope) });
		$rootScope.$on(AuthorizationCenter.constants.EVENTS.DIRTY, AuthorizationCenter.handleDirtyEvent);
		$rootScope.$on(AuthorizationCenter.constants.EVENTS.STATE_CHANGE, AuthorizationCenter.handleStateChange);
		$rootScope.$on(AuthorizationCenter.constants.EVENTS.RESPONSE_CODE, AuthorizationCenter.handleResponseCode);
		$rootScope.$on('$stateChangeStart', function(event, args) { AuthorizationCenter.handleBrowserEvent(event, args, $rootScope) });
	},
	
	handleDirtyEvent: function(event, args) {
		AuthorizationCenter.dirty = args;
	}, 
	
	handleResponseCode: function(event, args) {
		if (args === '0000') {
			$('meta[name="WT.cg_s"]').attr('content', '[Manage Authorized User]');
		} else if (args === '4000') {
			$('head').append( '<meta name="WT.er" content="[MUA Unavailable]">' ); 
		} else if (args === '4002') {
			$('head').append( '<meta name="WT.er" content="[Organization]">' ); 
		} else if (args === '4001') {
			$('head').append( '<meta name="WT.er" content="[No Eligible AU]">' ); 
		} else if (args === '5510' || args === '5518' || args === '5519') {
			$('head').append( '<meta name="WT.er" content="[ECIF]">' );
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');
		} else if (args === '5530' || args === '5531') {
			$('head').append( '<meta name="WT.er" content="[Auth DB]">' );
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');
		} else if (args === '5540' || args === '5541') {
			$('head').append( '<meta name="WT.er" content="[FileNet]">' );
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');
		} else if (args === '5570') {
			$('head').append( '<meta name="WT.er" content="[Temporary Account]">' );
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');
		} else if (args === '5542' || args === '5543'){
			$('head').append( '<meta name="WT.er" content="[HP Extream]">' );
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');
		}
	}, 

	handleStateChange: function(event, args, toParams, fromState) {
		if (args.name !== 'saveFailure') {
			$('meta[name="WT.er"]').remove();
		}
		if (args.name === 'modifyAccess') {
			if (!toParams.user.hasAccess()) {
				$('meta[name="WT.cg_s"]').attr('content', '[Add Authorized User]');
			} else {
				$('meta[name="WT.cg_s"]').attr('content', '[Edit Authorized User]');
			}
		} else if (args.name === 'accessAgreement') {
			$('meta[name="WT.cg_s"]').attr('content', '[Access Level Agreement]');
		} else if (args.name === 'confirmation') {
			$('meta[name="WT.cg_s"]').attr('content', '[Confirmation]');
		} else if (args.name === 'systemError') {
			$('meta[name="WT.cg_s"]').attr('content', '[Error]');  //  Needed?
		}
		AuthorizationCenter.currentPage = args.name;
		AuthorizationCenter.cancel = false;
		NIselfService.timeoutWarning.timeoutWarningAngularEvent
	}, 
	
	showConfirmation: function(event, args, $rootScope) {
		AuthorizationCenter.cancel = true;
		oNavigationAlert.appendOverlay(function() {
			$rootScope.$emit(AuthorizationCenter.constants.EVENTS.NAVIGATE, args);
		});
	},
	
	handleBrowserEvent: function(event, args, $rootScope) {
		if ((AuthorizationCenter.currentPage === 'modifyAccess' || AuthorizationCenter.currentPage === 'addUser') && AuthorizationCenter.dirty && args.name !== 'accessAgreement' && args.name !== 'modifyAccess' && !AuthorizationCenter.cancel) {
			AuthorizationCenter.cancel = true;
			event.preventDefault();
			oNavigationAlert.appendOverlay(function() {
				$rootScope.$emit(AuthorizationCenter.constants.EVENTS.NAVIGATE, {type:'state',url:'manageUsers'});
			});
		}
	}
};