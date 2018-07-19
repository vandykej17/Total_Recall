var KEY_CODES = {
		TAB: 9,
		UP_ARROW: 38,
		DOWN_ARROW: 40
};

function MobileKeyBoardNavigation(params) {
	this.$hamburgerButton = $(params.hamburgerButton);
	this.$focusOnStart = $(params.focusOnStart);
	this.$lastMenuElement = $(params.lastMenuElement);
}

MobileKeyBoardNavigation.prototype.initialize = function() {
	this._setHamburgerClickListener();
	this._setLeaveNavListeners();
};

MobileKeyBoardNavigation.prototype._setHamburgerClickListener = function() {
	this.$hamburgerButton.on('click', function() {
		this.$focusOnStart.focus();
	}.bind(this));
};

MobileKeyBoardNavigation.prototype._setLeaveNavListeners = function() {
	this._setShiftTabOutListener();
	this._setTabOutListener();
	this._setArrowUpOutListener();
	this._setArrowDownOutListener();
};

MobileKeyBoardNavigation.prototype._setShiftTabOutListener = function() {
	this._setLeaveNavListener({
		$target: this.$focusOnStart,
		condition: function(event) { return event.keyCode === KEY_CODES.TAB && event.shiftKey; }
	});
};

MobileKeyBoardNavigation.prototype._setArrowUpOutListener = function() {
	this._setLeaveNavListener({
		$target: this.$focusOnStart,
		condition: function(event) { return event.keyCode === KEY_CODES.UP_ARROW; }
	});
};

MobileKeyBoardNavigation.prototype._setTabOutListener = function() {
	this._setLeaveNavListener({
		$target: this.$lastMenuElement,
		condition: function(event) { return event.keyCode === KEY_CODES.TAB && !event.shiftKey; }
	});
};

MobileKeyBoardNavigation.prototype._setArrowDownOutListener = function() {
	this._setLeaveNavListener({
		$target: this.$lastMenuElement,
		condition: function(event) { return event.keyCode === KEY_CODES.DOWN_ARROW; }
	});
};

MobileKeyBoardNavigation.prototype._setLeaveNavListener = function(params) {
	params.$target.on('keydown', function(event) {
		if(params.condition(event)) {
			event.preventDefault();
			this._closeNavBar();
		}
	}.bind(this));
};

MobileKeyBoardNavigation.prototype._closeNavBar = function() {
	$('body').removeClass('show-nav');
	this.$hamburgerButton.focus();
};	