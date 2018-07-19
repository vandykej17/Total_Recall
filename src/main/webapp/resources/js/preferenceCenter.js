var PreferenceCenter = {

	// Global Vars -------------------------

	constants: null,
	browser: null,
	loaded: null,
	$api: null,

	// Main Functions ----------------------

	init: function (loadError) {
		try {
			if (loadError) {
				// Script loading error; log and page level error
				PreferenceCenter.showError(loadError);
			} else {
				// Find list of navigation elements for unsaved changes modal
				// (before Pref Center injects widget elements)
				var navigationElements = $("input, a, img, span").filter(function () {
					return PreferenceCenter.isRedirectButton(this) || PreferenceCenter.isRedirectAnchor(this) || PreferenceCenter.isParentElementRedirect(this);
				});

				// Attempt to load Preference Center
				var loaded = PreferenceCenter.loadPreferenceCenter();

				if (loaded) {
					// Bind unsaved changes modal event(s)
					navigationElements.bind('click', PreferenceCenter.navigationClickEvent);
				}
			}
		} catch (exception) {
			PreferenceCenter.showError("PreferenceCenter.init() exception: " + exception.toString());
		}
	},

	loadPreferenceCenter: function () {
		PreferenceCenter.loaded = false;
		var spinnerToggleCounter = 0;

		var ctToken = $("#ctToken").val();
		var ecn = $("#ecn").val();
		var experience = $("#experience").val();
		var viewType = $("#viewType").val();

		if (ctToken && typeof angular !== 'undefined') {
			try {
				// Get modules
				PreferenceCenter.constants = require('preference-center-constants');
				PreferenceCenter.browser = require('bowser');
				var bootstrapModule = require('preference-center-bootstrapper');

				// Bootstrap application
				var bootstrapper = new bootstrapModule.Bootstrapper();
				var injector = bootstrapper.loadPreferenceCenter(this.getBootStrapConfig(viewType, ctToken, ecn, experience));

				if (injector !== null) {
					// Get widget API
					PreferenceCenter.$api = injector.get('apiService');

					// Start event listeners
					PreferenceCenter.$api.addEventListener(PreferenceCenter.constants.EVENTS.SPINNER, PreferenceCenter.spinnerEvent);

					// Retrieve preferences
					PreferenceCenter.$api.getPreferences();

					PreferenceCenter.loaded = true;
				} else {
					// Bootstrapping failed
					PreferenceCenter.showError("Angular $injector is undefined; widget could not be bootstrapped.");
				}
			} catch (exception) {
				PreferenceCenter.showError("PreferenceCenter.loadPreferenceCenter() exception: " + exception.toString());
			}
		} else {
			// Virtual token not available or vendor libraries not loaded
			if (typeof angular === 'undefined') {
				PreferenceCenter.showError("Angular library is undefined; cannot load widget.");
			} else {
				PreferenceCenter.showError("ClearTrust token not available; cannot load widget.");
			}
		}

		return PreferenceCenter.loaded;
	},

	getBootStrapConfig: function (viewType, ctToken, ecn, experience) {
		var bootstrapConfig = {
			rootElementId: 'preference-container',
			config: {
				consumer: {
					consumerId: 'CAM',
					authToken: ctToken,
					authRealm: PreferenceCenter.constants.AUTHORIZATION.MEMBER.REALM,
					experience: experience
				},
				customer: {
					ecn: ecn
				},
				features: {
					showPleaseWaitSpinner: false,
					showConfirmationMessages: true,
					showCallToActionMessages: true,
					showCSRFooter: false,
					showEDDAFooter: true,
					enableEmailSelection: true,
					enableEDDASelection: true,
					enableGoPaperless: true,
					enableMarketingEmailUnsubscribe: false,
					enableRetrieveErrorRedirect: false
				}
			}
		};

		if (viewType === "commercial") {
			bootstrapConfig.config.components = {
				niPreferences: {
					enabled: false
				},
				nfPreferences: {
					enabled: false
				},
				commercialPreferences: {
					enabled: true,
					accordion: {
						expanded: false,
						collapsible: true
					},
					features: {
						showSaveButton: true,
						showCancelButton: true,
						showEligiblePolicies: false,
						showIneligiblePolicies: true,
					}
				},
				marketingPreferences: {
					enabled: false
				}
			};

		} else {
			bootstrapConfig.config.components = {
				niPreferences: {
					enabled: true,
					accordion: {
						expanded: false,
						collapsible: true
					},
					features: {
						showSaveButton: true,
						showCancelButton: true,
						showIneligibleBillingAccounts: false,
						showEligiblePolicies: false
					}
				},
				nfPreferences: {
					enabled: true,
					accordion: {
						expanded: false,
						collapsible: true
					},
					features: {
						showSaveButton: true,
						showCancelButton: true
					}
				},
				commercialPreferences: {
					enabled: false
				},
				marketingPreferences: {
					enabled: true,
					accordion: {
						expanded: false,
						collapsible: true
					},
					features: {
						showSaveButton: true,
						showCancelButton: true,
						showUnsubscribeAll: true,
						enableUnsubAllRedirect: false
					}
				}
			};
		}

		return bootstrapConfig;
	},

	logException: function (message) {
		var dataStr = "application=\"preference-center-cam\", consumerId=\"CAM\", userAgent=\"" + navigator.userAgent +
			"\", parsedBrowser=\"" + PreferenceCenter.buildBrowserString() + "\", logLevel=\"exception\", message=\"" + message.toString() + "\"";

		$.ajax({
			cache: false,
			contentType: "application/x-www-form-urlencoded",
			url: "/myaccount/preferences/PreferenceCenterLogger.action",
			type: "POST",
			data: "preferenceCenterLogData=" + encodeURIComponent(dataStr)
		});
	},

	// Helpers -----------------------------

	navigationClickEvent: function (event) {
		event.preventDefault();
		$('div[id="overlay"]').click();

		PreferenceCenter.$api.checkForUnsavedChanges(event, confirmCallback);

		function confirmCallback() {
			$(event.target).unbind('click', PreferenceCenter.navigationClickEvent);
			oButtonLogic.processEventLink(event);
		}
	},

	processEventLink: function (event) {
		if (oNavigationAlert.clickedButtonHasAdditionalLogic(event)) {
			oNavigationAlert.determineAdditionalButtonLogic(event)();
		}

		if (PreferenceCenter.isRedirectAnchor(event.target)) {
			window.location = event.target.getAttribute('href');
		} else if (PreferenceCenter.isParentElementRedirect(event.target)) {
			window.location = event.target.parentElement.getAttribute('href');
		} else {
			$(event.target).trigger("click", [true]);
		}
	},

	isRedirectButton: function (element) {
		return (element.tagName === 'INPUT' && element.getAttribute('type').toLowerCase() === "submit");
	},

	isRedirectAnchor: function (element) {
		return (element.tagName === 'A' &&
			element.getAttribute('href') !== null &&
			element.getAttribute('href').substring(0, 1) !== '#' &&
			element.target.toLowerCase() !== '_blank');
	},

	isParentElementRedirect: function (element) {
		return (element.tagName === 'IMG' || element.tagName === 'SPAN') &&
			PreferenceCenter.isRedirectAnchor(element.parentElement);
	},

	spinnerEvent: function (event, args) {
		if (args.showSpinner === true && !PreferenceCenter.isSpinnerVisible()) {
			PreferenceCenter.showSpinner();
		} else if (args.showSpinner === false && PreferenceCenter.isSpinnerVisible()) {
			PreferenceCenter.removeSpinner();
		}
	},

	showSpinner: function () {
		if (!PreferenceCenter.isSpinnerVisible()) {
			setTimeout(function () {
				$('body').addClass('show-wait');
				$('body').keydown(PreferenceCenter.disableTab);
			}, 100);
		}
	},

	removeSpinner: function () {
		if (PreferenceCenter.isSpinnerVisible()) {
			setTimeout(function () {
				$('body').removeClass('show-wait');
				$('body').off('keydown', PreferenceCenter.disableTab);
			}, 100);
		}
	},

	showError: function (error) {
		if (error) {
			PreferenceCenter.logException(error);
		}

		$('#errorContent').show();
		$('#preference-container').hide();
	},

	isSpinnerVisible: function () {
		return $('body').hasClass('show-wait');
	},

	disableTab: function (e) {
		if (e.which == 9) e.preventDefault();
	},

	buildBrowserString: function () {
		var browserStr = '';

		if (PreferenceCenter.browser && PreferenceCenter.browser.name) {
			var browserName = PreferenceCenter.browser.name;
			var browserVersion = PreferenceCenter.browser.version;
			var browserMobile = PreferenceCenter.browser.mobile ? ' (Mobile)' : '';
			var browserTablet = PreferenceCenter.browser.tablet ? ' (Tablet)' : '';

			browserStr = browserName + ' ' + browserVersion + browserMobile + browserTablet;
		}

		return browserStr;
	}
};