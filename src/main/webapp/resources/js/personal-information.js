var Device = {
	getDevicePrint : function() {
		return encode_deviceprint();
	}
};

var EditEmailAddress = {
		
	init: function() {
		$("#email_accordion").on("clearErrors", function(e) {
			EditEmailAddress.clearErrors();
		});
		
		$("#emailAddressHeader").click(function(e) {
			if($(this).attr('aria-expanded') === "false") {
				EditEmailAddress.expandAccordion();
			}
		});

		$("#emailEdit").click(function() {
			EditEmailAddress.expandAccordion();
		});
		
		EditEmailAddress.validation();
		
		$("#email").blur(function() {
			$(this).validateEmails.doValidate(this);
		});
		
		$("#confirmEmail").blur(function() {
			$(this).validateEmails.doValidate(this);
		});
		
 		$("#editEmailForm").on("submit", function() {
 			var emailValid = $($("#email")[0]).validateEmails.doValidate($("#email")[0]);
 			var confirmEmailValid = $($("#confirmEmail")[0]).validateEmails.doValidate($("#confirmEmail")[0]);
 			
 			if (emailValid && confirmEmailValid) {
 				NIselfService.inlineModal.continueClick();
 			} else {
 				return false;
 			}
 		});
	},
	
	expandAccordion: function() {
		var originalEmail = $("#displayedEmailAddress").text();
		$("#email, #confirmEmail").val(originalEmail);
		EditEmailAddress.fireEBIEvent();
	},
	
	clearErrors: function() {
		$("#actionErrorDiv, #emailErrorMsg, #confirmEmailErrorMsg").hide();
		$("#email_group, #confirmEmail_group").removeClass("has-error");
	},
	
	fireEBIEvent: function() {
		$.ajax({
			type: "POST",
			url: "/myaccount/profile/fireEBIForEmailAddressEdit.action"
		});
	},
	
	validateAddress: function(address) {
		var addressValid = "continue";
		
		var emailRegex = /^[a-z0-9-!#$%&_+`{}|']+(?:\.[a-z0-9-!#$%&_+`{}|']+)*@(?:[a-z0-9-]+)(?:\.[a-z0-9]{2,})+$/ig;
		if (address.length > 80 || address.indexOf("@") > 64 || !emailRegex.test(address)) {
			addressValid = "invalid";
		}
		
		if (address.length == 0) {
			addressValid = "blank";
		}
		
		return addressValid;
	},
	
	validation: function() {
		new function() {
			var emailRegex = /^[a-z0-9-!#$%&_+`{}|']+(?:\.[a-z0-9-!#$%&_+`{}|']+)*@(?:[a-z0-9-]+)(?:\.[a-z0-9]{2,})+$/i;
		
			$.fn.validateEmails = {
				doValidate : function(o) {
					var valid = false;
					
					if ((o.value != "")) {
						if (o.value.length > 80 || o.value.indexOf("@") > 64 || !emailRegex.test(o.value)) {
							if (o.id == 'email') {
								doError(o, 'Check the email address format.');
							} else if (o.id == 'confirmEmail') {
								doError(o, 'Check the confirm email address format.');
							}
						} else {
							if (o.id == 'email' && o.value == $("#displayedEmailAddress").text()) {
								doError(o, 'The email address you entered must be different than your old email address.');
							} else {
								doSuccess(o);
								valid = true;
							}
						}
					} else {
						if (o.id == 'email') {
							doError(o, 'Email address is required.');
						} else if (o.id == 'confirmEmail') {
							doError(o, 'Confirm email address is required.');
						}
					}
					
					return valid;
				}
			};
		
			function doSuccess(o) {
				setTimeout( function () {
					$('#' + o.id + '_group').removeClass("has-error");
					$('#' + o.id + 'ErrorMsg').html("");
					$('#' + o.id + 'ErrorMsg').removeClass("before-sprite error-message");
					$('#' + o.id + 'ErrorMsg').hide();
					if (!$("#email_group, #confirmEmail_group").hasClass("has-error")) {
						$("#actionErrorDiv").hide();
					}
				}, 250);
			}
		
			function doError(o, m) {
				setTimeout( function () {
					$('#' + o.id + '_group').addClass("has-error");
					$('#' + o.id + 'ErrorMsg').html('<ul class="errorMessage"><li><span>' + m + '</span></li></ul>');
					$('#' + o.id + 'ErrorMsg').addClass("before-sprite error-message");
					$('#' + o.id + 'ErrorMsg').show();
					$("#actionMessageDiv").hide();
					$("#action-error").html("<ul class='errorMessage'><li><span>Please check the information and try again.</span></li></ul>");
					$("#actionErrorDiv").show();
				}, 250);
			}
		}
	}
};

var EditUsername = {
	init: function() {
		$("#username_accordion").on("clearErrors", function(e) {
			EditUsername.clearErrors();
		});
		$("#usernameHeader").click(function(e) {
			if($(this).attr('aria-expanded') === "false") {
				EditUsername.expandAccordion();
			}
		});
		$("#usernameEditBtn").click(function() {
			EditUsername.expandAccordion();
		});
		$(".suggestedUser").click(function() {
			$("#newUsername").addClass("is-active");
			$("#newUsername").attr("value", $(this).text());
		});
		$("#usernameEditConfirmationBtn").click(function(){
			EditUsername.completeUsernameUpdate();
		});
	},
	
	expandAccordion: function() {
		var originalUsername = $("#displayedUsername").text();
		$("#newUsername").val(originalUsername);
	},
	
	clearErrors: function() {
		$("#actionErrorDiv, #newUsernameErrorMsg, #usernameEditCurrentPasswordErrorMsg, #suggestedUsernames").hide();
		$("#newUsernameFieldError,#usernameEditCurrentPasswordFieldError").removeClass("has-error");
	},
	
	showUsernameConfirmationAlert: function() {
		if($("#loginUser").val() === 'true') {
			oAlertControls.showActiveAlert();
		}
	},
	
	completeUsernameUpdate: function(){
		$.ajax({
			type: "POST",
			url: "/myaccount/Logout.action"
		});
	}
};
	
var UserPasswordEdit = {
	init: function () {
		$("#password_accordion").on("clearErrors", function(e) {
			UserPasswordEdit.clearErrors();
		});
		
		UserPasswordEdit.validation();
		
		$("#passwordEditCurrentPassword").blur(function() {
			$(this).validatePasswords.init(this);
		});
		
		$("#newPassword").blur(function() {
			$(this).validatePasswords.init(this);
		});
		
		$("#retypePassword").blur(function() {
			$(this).validatePasswords.init(this);
		});
	},

	clearErrors: function() {
		$("#actionErrorDiv, #passwordEditCurrentPassword_msg, #newPassword_msg, #retypePassword_msg").hide();
		$("#passwordEditCurrentPassword_group, #newPassword_group, #retypePassword_group").removeClass("has-error");
	},
	
	validation: function() {
		new function() {
			var specChar = /[\s\^\&\*\(\)\<\>\"\'\%]/;
			var numOfChar = /^.{6,30}$/;
			var numAndSpecChar = /(?=.*[0-9\~\`\!\@\#\$\[\]\_\-\+\=\:\;\?\.\,\|\{\}])/;
		
			$.fn.validatePasswords = {
				init : function(o) {
					if (o.id == 'passwordEditCurrentPassword') {
						this.currentPassword(o)
					};
					if (o.id == 'newPassword') {
						this.newPassword(o)
					};
					if (o.id == 'retypePassword') {
						this.retypePassword(o)
					};
				},
				currentPassword : function(o) {
					if ((o.value != "")) {
						doSuccess(o);
					} else {
						doError(o, 'Current password is required.');
					}
				},
				newPassword : function(o) {
					if ((o.value != "")) {
						if (!o.value.match(specChar)) {
							if ((o.value.match(numOfChar))) {
								if ((o.value.match(numAndSpecChar))) {
									doSuccess(o);
								} else {
									doError(o,'Check password format rules.');
								}
							} else {
								doError(o,'Check password format rules.');
							}
						} else {
							doError(o,'Check password format rules.');
						}
					} else {
						doError(o, 'New password is required.');
					}
				},
				retypePassword : function(o) {
					if ((o.value != "")) {
						if (!o.value.match(specChar)) {
							if ((o.value.match(numOfChar))) {
								if ((o.value.match(numAndSpecChar))) {
									doSuccess(o);
								} else {
									doError(o,'Check password format rules.');
								}
							} else {
								doError(o,'Check password format rules.');
							}
						} else {
							doError(o,'Check password format rules.');
						}
					} else {
						doError(o, 'Confirm new password is required.');
					}
				}
			};
		
			function doSuccess(o) {
				setTimeout( function () {
					$('#' + o.id + '_group').removeClass("has-error");
					$('#' + o.id + '_msg').html("");
					$('#' + o.id + '_msg').removeClass("before-sprite error-message");
					$('#' + o.id + '_msg').hide();
					if (!$("#passwordEditCurrentPassword_group, #newPassword_group, #retypePassword_group").hasClass("has-error")) {
						$("#actionErrorDiv").hide();
					}
				}, 250);
			}
		
			function doError(o, m) {
				setTimeout( function () {
					$('#' + o.id + '_group').addClass("has-error");
					$('#' + o.id + '_msg').html('<ul class="errorMessage"><li><span>' + m + '</span></li></ul>');
					$('#' + o.id + '_msg').addClass("before-sprite error-message");
					$('#' + o.id + '_msg').show();
					$("#actionMessageDiv").hide();
					$("#action-error").html("<ul class='errorMessage'><li><span>Please check the information and try again.</span></li></ul>");
					$("#actionErrorDiv").show();
				}, 250);
			}
		}
	}
};

var EsaLink = {
	init: function() {
		$("#esaLink").click(function() {
			EsaLink.fireEBIEvent();
		});
	},
	
	// Fire eBI event when the link for ESA is clicked
	fireEBIEvent: function() {
		$.ajax({
			type: "POST",
			url: "/myaccount/profile/fireEBIForElectronicServicesAgreement.action"
		});
	}
};

/**
 * Masking and unmasking the PIN value
 */
oPinNumberMasking = {
		numberMask: function(element) {
			if(element.prev('input').attr('type') == 'password'){
				oPinNumberMasking.changeMask(element.prev('input'), 'text');
			}
			else {
				oPinNumberMasking.changeMask(element.prev('input'), 'password');
			}
			return false;
		},
		changeMask :function(x, type) {
			  if(x.prop('type') == type)
			      return x; 
			  try {
			      return x.prop('type', type); // IE security will not allow this
			  } catch(e) {
			      var html = $("<div>").append(x.clone()).html();
			      var regex = /type=(\")?([^\"\s]+)(\")?/; //matches type=text or type="text"
			      var tmp = $(html.match(regex) == null ?
			          html.replace(">", ' type="' + type + '">') :
			          html.replace(regex, 'type="' + type + '"') );
			      tmp.data('type', x.data('type') );
			      var events = x.data('events');
			      var cb = function(events) {
			          return function() {
			              //Bind all prior events
			              for(i in events)
			              {
			                  var y = events[i];
			                  for(j in y)
			                      tmp.bind(i, y[j].handler);
			              }
			          }
			      }(events);
			      x.replaceWith(tmp);
			      setTimeout(cb, 10); 
			      return tmp;
			  }
		}
};

//Pin Validator - Accepting on Numeric values
oPinNumberFormatter = {
		pinOnlyNumeric : function(keyCode, thisObject) {
			var val = thisObject.val();
			if (keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 8 && keyCode != 46) {
				val = val.replace(/[^0-9]/g, "");
				thisObject.val(val);
			}
		},
};

var EditPin = {		
		init : function() {
			$("#pinHeader").click(function(e) {
				if($(this).attr('aria-expanded') === "false") {
				EditPin.fireEBIEvent();
				}
			});
			
			$("#pinEditBtn").click(function() {
				EditPin.fireEBIEvent();
			});
			
		},
		
		fireEBIEvent: function() {
			$.ajax({
				type: "POST",
				url: "/myaccount/profile/fireEBIForPinEdit.action"
			});
		}
		
	}; 

var oRemovePinOverlay = {
	config : {
		leavePageLink : null
	},
	
	init : function() {
		$('#removePinYesBtn').attr("href", oRemovePinOverlay.config.leavePageLink);
		$('#removePinYesBtn, #removePinNoBtn').click(function() {
			oRemovePinOverlay.hideOverlay();
		});
		
		$("#pin_accordion").on("clearErrors", function(e) {
			oRemovePinOverlay.clearErrors();
		});
	},
	
	clearErrors: function() {
		$("#actionErrorDiv, #pinEditCurrentPassword_msg,#newPin_msg").hide();
		$("#pinEditCurrentPassword_group, #newPin_group").removeClass("has-error");
	},

	showOverlay : function() {
		
		$('body').addClass('show-overlay');
		$('#removePinOverlayContainer').show();

		$('#removePinOverlayContainer').find('[class*="hidden"]').focus();
		$('#removePinOverlayTabCapture').keydown(function(e) {
			oRemovePinOverlay.trapTabKey(e);
		});
		$('#overlay, #removePinOverlay').on('click', function() {
			$('#removePinNoBtn').focus();
		});
	},

	hideOverlay : function() {
		$('#removePinOverlayContainer').hide();
		$('body').removeClass('show-overlay');
	},

	trapTabKey : function(evt) {
		if (evt.which == 9) {
			var focusableItems = $('#removePinNoBtn, #removePinYesBtn');
			var focusedItem = jQuery(':focus');
			var numberOfFocusableItems = focusableItems.length;
			var focusedItemIndex = focusableItems.index(focusedItem);

			if (evt.shiftKey) {
				if (focusedItemIndex == 0) {
					focusableItems.get(numberOfFocusableItems - 1).focus();
					evt.preventDefault();
				}
			} else {
				if (focusedItemIndex == numberOfFocusableItems - 1) {
					focusableItems.get(0).focus();
					evt.preventDefault();
				}
			}
		}
	}
}; 

var oPinSuccessOverlay = {
		config : {
			leavePageLink : null
		},

		init : function() {
			$('#successAndPinOverlayContinue').click(function() {
				oPinSuccessOverlay.hideOverlay();
			});
		},

		showOverlay : function() {
			
			$("#pin_accordion").on("clearErrors", function(e) {
				oPinSuccessOverlay.clearErrors();
			});
		
			$('body').addClass('show-overlay');
			$('#successPinOverlayContainer').show();

			$('#successPinOverlayContainer').find('[class*="hidden"]').focus();
			$('#successPinOverlayTabCapture').keydown(function(e) {
				oPinSuccessOverlay.trapTabKey(e);
			});
		},
		
		clearErrors: function() {
			$("#actionErrorDiv, #pinEditCurrentPassword_msg,#newPin_msg").hide();
			$("#pinEditCurrentPassword_group, #newPin_group").removeClass("has-error");
		},
		
		hideOverlay : function() {
			$('#successPinOverlayContainer').hide();
			$('body').removeClass('show-overlay');
		},

		trapTabKey : function(evt) {
			if (evt.which == 9) {
				var focusedItem = jQuery(':focus');
				var numberOfFocusableItems = focusableItems.length;
				var focusedItemIndex = focusableItems.index(focusedItem);

				if (evt.shiftKey) {
					if (focusedItemIndex == 0) {
						focusableItems.get(numberOfFocusableItems - 1).focus();
						evt.preventDefault();
					}
				} else {
					if (focusedItemIndex == numberOfFocusableItems - 1) {
						focusableItems.get(0).focus();
						evt.preventDefault();
					}
				}
			}
		}
	}; 

var EditPhoneNumber = {
		
		init: function() {
			$("#phonenumber_accordion").on("clearErrors", function(e) {
				EditPhoneNumber.clearErrors();
			});
			$("#phoneNumberHeader").click(function(e) {
				if($(this).attr('aria-expanded') === "false") {
					EditPhoneNumber.expandAccordion();
				}
			});
			// Fire eBI event when edit email button is clicked
			$("#phoneEdit").click(function() {
				EditPhoneNumber.expandAccordion();
			});
			
			$("#phoneNumber").on("blur", EditPhoneNumber.validatePhoneNumberShowErrors);
			
			$("#phoneNumber").keyup(function(e) {
				EditPhoneNumber.fixupPhoneSeperators(e.keyCode, $(this));
	        });
	 		
	 		$("#editPhoneNumberForm").on("submit", function() {
	 			if (EditPhoneNumber.validatePhoneNumber($("#phoneNumber").val()) == "continue") {
	 				NIselfService.inlineModal.continueClick();
	 			} else {
	 				return false;
	 			}
	 		});
		},
		
		expandAccordion: function() {
			var phonenumber = $("#displayedPhoneNumber").text();
			$("#phoneNumber").val(phonenumber);
			//EditPhoneNumber.fireEBIEvent();
		},
		
		clearErrors: function() {
			$("#actionErrorDiv, #phoneNumberErrorMsg").hide();
			$("#phoneNumberFieldError").removeClass("has-error");
		},
		
		validatePhoneNumber: function(phoneNumber) {
			var phoneNumberValid = "continue";
			var phoneNumberWithoutFormatting = phoneNumber.replace(/-/g,"");
			
			var phoneNumberRegex = /^[2-9]\d{2}[2-9]\d{6}$/;
			if (phoneNumberWithoutFormatting.length > 10 || !phoneNumberRegex.test(phoneNumberWithoutFormatting)) {
				phoneNumberValid = "invalid";
			}
			
			if (phoneNumberWithoutFormatting.length == 0) {
				phoneNumberValid = "blank";
			}
			
			return phoneNumberValid;
		},
		
		validatePhoneNumberShowErrors: function() {
			setTimeout(function() {
				var operation = EditPhoneNumber.validatePhoneNumber($("#phoneNumber").val());
				$("#phoneNumberErrorMsg").hide();
				$("#actionErrorDiv").hide();
				$("#phoneNumberFieldError").removeClass("has-error");
				
				if (operation == "blank") {
					$("#phoneNumberFieldError").addClass("has-error");
					$("#phoneNumberErrorMsg").html("<ul class='errorMessage'><li><span>Phone number is required.</span></li></ul>");
					$("#phoneNumberErrorMsg").show();
					$("#actionMessageDiv").hide();
					$("#action-error").html("<ul class='errorMessage'><li><span>Please check the information and try again.</span></li></ul>");
					$("#actionErrorDiv").show();
				} else if (operation == "invalid"){
					$("#phoneNumberFieldError").addClass("has-error");
					$("#phoneNumberErrorMsg").html("<ul class='errorMessage'><li><span>Check the phone number format.<br />Please provide a U.S. based number that can receive text messages.</span></li></ul>");
					$("#phoneNumberErrorMsg").show();
					$("#actionMessageDiv").hide();
					$("#action-error").html("<ul class='errorMessage'><li><span>Please check the information and try again.</span></li></ul>");
					$("#actionErrorDiv").show();
				}
			}, 250);
		},
		
		fixupPhoneSeperators : function(keyCode, thisObject) {
			var val = thisObject.val();
			if (keyCode != 37 && keyCode != 38 && keyCode != 39 && keyCode != 40 && keyCode != 8 && keyCode != 46) {
				var firstPosition = val.charAt(0);
				var fifthPosition = val.charAt(4);
				val = val.replace(/[^0-9]/g, "");
				thisObject.val(val);
				if (thisObject.val().length == 3) {
					thisObject.val(EditPhoneNumber.fixupPhoneLengthThree(thisObject.val(), firstPosition));
				} else {
					if (thisObject.val().length == 4 || thisObject.val().length == 5) {
						thisObject.val(EditPhoneNumber.fixupPhoneLengthFourFive(thisObject.val()));
					} else {
						if (thisObject.val().length == 6) {
							thisObject.val(EditPhoneNumber.fixupPhoneLengthSix(thisObject.val()));
						} else {
							if (thisObject.val().length > 6) {
								thisObject.val(EditPhoneNumber.fixupPhoneLengthGreaterThanSix(thisObject.val()));
							}
						}
					}
				}
			}
		},
		fixupPhoneLengthThree : function(phoneNumber, originalFirstChar) {
			var newValue = phoneNumber;
			var temp = phoneNumber;
			newValue = temp + "-"
			return newValue;
		},
		fixupPhoneLengthFourFive : function(phoneNumber) {
			var newValue = phoneNumber;
			var temp = phoneNumber;
			newValue = temp.substring(0, 3) + "-" + temp.substring(3);
			return newValue;
		},
		fixupPhoneLengthSix : function(phoneNumber) {
			var newValue = phoneNumber;
			var temp = phoneNumber;
			newValue = temp.substring(0, 3) + "-" + temp.substring(3) + "-";
			return newValue;
		},
		fixupPhoneLengthGreaterThanSix : function(phoneNumber) {
			var newValue = phoneNumber;
			var temp = phoneNumber;
			newValue = temp.substring(0, 3) + "-" + temp.substring(3, 6) + "-" + temp.substring(6,10);
			return newValue;
		}
}