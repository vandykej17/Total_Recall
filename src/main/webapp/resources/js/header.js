var NIselfService = NIselfService || {};

NIselfService.header = (function ($) {	
	var constants = {
		classSelector: {
			hideNavigationBar: "hide-navigation-bar",
			hideDropdownDesktop: "hide-dropdown-desktop",
			hideDropdownMobile: "hide-mobile",
			showNavigationBar: "show-nav",
			showDropdownDesktop: "show-profile",
			showDropdownMobile: "show-utility-mobile",
			ariaExpanded: "aria-expanded",
			trueValue: "true",
			falseValue: "false"
		},
		$object: {
			$navigationDrawer: $(".mobile-navigation"),
			$desktopProfileDrawer: $(".profile-panel"),
			$mobileProfileDrawer: $(".utility-panel--mobile"),
			$navigationDrawerButton: $(".mobile-nav-button"),
			$desktopProfileButton: $(".btn-profile"),
			$mobileProfileButton: $(".btn-mobile-profile"),
			$overlay: $(".overlay"),
			$body: $("body")
		}
	},
		methods = (function() {
			var toggleDrawerDisplay = function(visibilityCheck, openCallback, closeCallback, $drawer) {
				  if (!(visibilityCheck())) {
					  openCallback($drawer);
				  } else {
					  closeCallback($drawer);
				  }
			},
				listenCallback = {
					menuClick: function(e) {
						e.preventDefault();
						
						toggleDrawerDisplay(drawers.mobileNavigation.isVisible, drawers.mobileNavigation.open, drawers.mobileNavigation.close, constants.$object.$navigationDrawer);
						
						constants.$object.$body.toggleClass(constants.classSelector.showNavigationBar);
					
						if (constants.$object.$body.hasClass(constants.classSelector.showDropdownMobile)) {
							constants.$object.$body.toggleClass(constants.classSelector.showDropdownMobile);
						}
					},
					profileClick: function(e) {
						e.preventDefault();
					  
						toggleDrawerDisplay(drawers.desktopProfile.isVisible, drawers.desktopProfile.open, drawers.desktopProfile.close, constants.$object.$desktopProfileDrawer);
					  
						constants.$object.$body.toggleClass(constants.classSelector.showDropdownDesktop);
					},
					mobileProfileClick: function(e) {
						e.preventDefault();
				
						toggleDrawerDisplay(drawers.mobileProfile.isVisible, drawers.mobileProfile.open, drawers.mobileProfile.close, constants.$object.$mobileProfileDrawer);
						
						constants.$object.$body.toggleClass(constants.classSelector.showDropdownMobile);
						
						if (constants.$object.$body.hasClass(constants.classSelector.showNavigationBar)) {
							constants.$object.$body.toggleClass(constants.classSelector.showNavigationBar);
						}
					},
					overlayClick: function(e) {	
						if (constants.$object.$body.hasClass(constants.classSelector.showNavigationBar)) {
							constants.$object.$body.toggleClass(constants.classSelector.showNavigationBar);
							constants.$object.$mobileProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
							return false;
						}
						
						if (constants.$object.$body.hasClass(constants.classSelector.showDropdownDesktop)) {
							constants.$object.$body.toggleClass(constants.classSelector.showDropdownDesktop);
							constants.$object.$mobileProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
							return false;
						}
					
						if (constants.$object.$body.hasClass(constants.classSelector.showDropdownMobile)) {
							constants.$object.$body.toggleClass(constants.classSelector.showDropdownMobile);
							constants.$object.$mobileProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
							return false;
						}
					},
				},
				drawers = (function() {
					var drawerMethods = {
						openDrawer: function($drawer, htmlClass) {
							$drawer.removeClass(htmlClass);
						},
						closeDrawer: function($drawer, htmlClass) {
							$drawer.addClass(htmlClass);
						}
					},
						mobileNavigation = {
							open: function($mobileNavigation) {
								drawerMethods.openDrawer($mobileNavigation, constants.classSelector.hideNavigationBar);
								constants.$object.$navigationDrawerButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.trueValue);
								//this fixed an issue with smoothness regarding showing the left navigation bar in Chrome and Firefox; IE works without this call.
								$mobileNavigation.is(":visible");
							},
							close: function($mobileNavigation) {
								$mobileNavigation.filter(":not(.hide-navigation-bar)").one("transitionend", function() {
									drawerMethods.closeDrawer($mobileNavigation, constants.classSelector.hideNavigationBar);
									constants.$object.$navigationDrawerButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
								});
							},
							isVisible: function() {
								return constants.$object.$body.hasClass(constants.classSelector.showNavigationBar);
							}
						},
						desktopProfile = {
							open: function($desktopProfileDrawer) {
								drawerMethods.openDrawer($desktopProfileDrawer, constants.classSelector.hideDropdownDesktop);
								constants.$object.$desktopProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.trueValue);
							},
							close: function($desktopProfileDrawer) {
								drawerMethods.closeDrawer($desktopProfileDrawer, constants.classSelector.hideDropdownDesktop);
								constants.$object.$desktopProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
							},
							isVisible: function() {
								return constants.$object.$body.hasClass(constants.classSelector.showDropdownDesktop);
							}
						},
						mobileProfile = {
							open: function($mobileProfileDrawer) {
								drawerMethods.openDrawer($mobileProfileDrawer, constants.classSelector.hideDropdownMobile);
								constants.$object.$mobileProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.trueValue);
							},
							close: function($mobileProfileDrawer) {
								drawerMethods.closeDrawer($mobileProfileDrawer, constants.classSelector.hideDropdownMobile);
								constants.$object.$mobileProfileButton.attr(constants.classSelector.ariaExpanded, constants.classSelector.falseValue);
							},
							isVisible: function() {
								return constants.$object.$body.hasClass(constants.classSelector.showDropdownMobile);
						}
						};
					
					return {
						mobileNavigation : mobileNavigation,
						desktopProfile : desktopProfile,
						mobileProfile : mobileProfile
					};
				})(),
				leavingDrawerOrButtonBrowserCompatibility = function($navigationDrawer, $buttonForDrawer, elementGainingFocus) {
					return !($navigationDrawer.has(elementGainingFocus).length) && !($buttonForDrawer.is(elementGainingFocus));
				},
				leavingDrawerOrButton = function($navigationDrawer, $buttonForDrawer, e) {
					if (e.relatedTarget !== null) { /* Chrome and Firefox support event.relatedTarget on focusout */
						return leavingDrawerOrButtonBrowserCompatibility($navigationDrawer, $buttonForDrawer, $(e.relatedTarget));
					} else { /* Internet Explorer does not support event.relatedTarget but treats document.activeElement similar to it */
						return leavingDrawerOrButtonBrowserCompatibility($navigationDrawer, $buttonForDrawer, $(document.activeElement));
					}
				},
				navigationTabKey = (function () {
					var methods = (function() {
						var setupTabHandling = function($buttonForDrawer, tabbableItemsCallback, closeCallback, $navigationDrawer, drawerVisibilityCheck) {
							
							$buttonForDrawer.add($navigationDrawer).focusout(function(e) {
								if (drawerVisibilityCheck()) {
									if (leavingDrawerOrButton($navigationDrawer, $buttonForDrawer, e)) {
										tabbableItemsCallback(e);
									}
								} else {
									closeCallback($navigationDrawer);
								}
							});
						},
							setupNavigation = function() {
								setupTabHandling(
									constants.$object.$navigationDrawerButton,
									listenCallback.menuClick,
									drawers.mobileNavigation.close,
									constants.$object.$navigationDrawer,
									drawers.mobileNavigation.isVisible
								);
							},
							setupDesktopProfile = function() {
								setupTabHandling(
									constants.$object.$desktopProfileButton,
									listenCallback.profileClick,
									drawers.desktopProfile.close,
									constants.$object.$desktopProfileDrawer,
									drawers.desktopProfile.isVisible
								);
							},
							setupMobileProfile = function() {
								setupTabHandling(
									constants.$object.$mobileProfileButton,
									listenCallback.mobileProfileClick,
									drawers.mobileProfile.close,
									constants.$object.$mobileProfileDrawer,
									drawers.mobileProfile.isVisible
								);
							},
							createEventListeners = function() {
								setupNavigation();
								setupDesktopProfile();
								setupMobileProfile();
							},
							init = function() {
								createEventListeners();
							};
						return {
							init: init
						};
					})();
					
					return {
						init: methods.init
					};
				})(),
				createEventListeners = function() {
					constants.$object.$mobileProfileButton.on('click', function(e) { listenCallback.mobileProfileClick(e) });
					constants.$object.$navigationDrawerButton.on('click', function(e) { listenCallback.menuClick(e) });
					constants.$object.$desktopProfileButton.on('click', function(e) { listenCallback.profileClick(e) });
					constants.$object.$overlay.on('click', function(e) { listenCallback.overlayClick(e) });
				},
				init = function() {
					navigationTabKey.init();
					createEventListeners();
				};
				
			return {
				init: init
			};
		})();
	return {
		init: methods.init
	};
})(jQuery);