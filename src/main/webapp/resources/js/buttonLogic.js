var oButtonLogic = (function($) {
    var constants = {
        buttonLogicData: {
            "logout": function () {
                if (typeof c2chat !== "undefined") {
                    c2chat.cleanChatSessionData();
                }
            }
        }
    },
        methods = (function() {
            var redirect = (function() {
                var checkRedirect = (function() {
                    var isRedirectAnchor = function(element) {
                        return (element.tagName === "A"
                            && element.getAttribute("href") !== null
                            && element.getAttribute("href").substring(0, 1) !== "#"
                            && element.target.toLowerCase() !== "_blank");
                    },
                        isParentElementRedirect = function(element) {
                            return (element.tagName === "IMG" || element.tagName === "SPAN")
                                && isRedirectAnchor(element.parentElement);
                        };

                    return {
                        isRedirectAnchor: isRedirectAnchor,
                        isParentElementRedirect: isParentElementRedirect
                    };
                })(),
                    goToLink = function(event) {
                        if (checkRedirect.isRedirectAnchor(event.target)) {
                            window.location = event.target.getAttribute("href");
                        } else if (checkRedirect.isParentElementRedirect(event.target)) {
                            window.location = event.target.parentElement.getAttribute("href");
                        } else {
                            $(event.target).trigger("click", [true]);
                        }
                    };

                return {
                    checkRedirect: checkRedirect,
                    goToLink: goToLink
                };
            })(),
                additionalLogic = {
                    clickedButtonHasAdditionalLogic: function(event) {
                        return constants.buttonLogicData.hasOwnProperty(event.target.id);
                    },
                    processAdditionalButtonLogic: function(event) {
                        constants.buttonLogicData[event.target.id]();
                    },
                },
                processEventLink = function(event) {
                    if (additionalLogic.clickedButtonHasAdditionalLogic(event)) {
                        additionalLogic.processAdditionalButtonLogic(event);
                    }
                    
                    redirect.goToLink(event);
                };

            return {
                processEventLink: processEventLink
            };
        })();

    return {
        processEventLink: methods.processEventLink
    };
})(jQuery);