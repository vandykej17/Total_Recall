/*
    Content Toggler
    Show/hides content as specified in the target elements by data attribute
    5/21/14 ~BV

    The target elements must have the attribute "toggler" with a value
    that is the selector of the content you want to show/hide when
    the trigger is clicked.

    Enable debug console logging by adding 'js=1' to URL parameter list

    Markup example:
    <a href="#" data-toggler="#mycontent" class="trigger">Show and hide</a>
    ...
    ...
    ...
    <div id="mycontent" style="display:none">
        ...some content...
    </div>



    Syntax:
    $(selector).toggler(options)


    Usage:
    $(".trigger").toggler();


    Options:
    Options should be passed as an object

    onShow              obj     Function that will fire when content is shown. Fires before show.
    onHide              obj     Function that will fire when content is hidden. Fires before hide.
    showEffect          obj     Function to handle any effects when content is opened. Default is $.slideToggle('fast')
    hideEffect          obj     Function to handle any effects when content is closed. Default is none.
    contentClose        str     Selector of element within the content that will be used as the "close content" click [.toggler-close]
    handleActiveClass   str     Class added to the target element when content is shown [active]
    handleInactiveClass str     Class added to the target element when content is hidden [inactive]
    childActiveClass    str     Class added to content element when content is shown [active]
    childInactiveClass  str     Class added to content element when content is hidden [inactive]

    Example:
    $(".accordion__header").toggler({
        contentClose: ".accordion-close",
        onShow:function(handle, content) {
            handle.parent().addClass("show-accordion");
        },

        onHide: function(handle, content) {
            handle.parent().removeClass("show-accordion");
        }
    });

*/

(function($){
    function debug(s) { if (typeof console !== "undefined" && (window.location.href.indexOf("js=") >= 0)) { console.log(s); } } // Module debug

    $.toggler = function(options){
        var local = this; // Store for scope

        // Init plugin, fires before loop
        local.init = function(){
            local.settings = $.extend({},$.toggler.defaultOptions, options); // Merge settings

            debug("\n> Toggler initialized with following settings");
            debug(local.settings);
        };



        /* Plugin action methods */

        // Bind actions
        local.bind = function(matchObj, contentObj) {
            // Handle click
            matchObj.off("click"); // Remove any existing clicks (undones legacy accordion)

            matchObj.on("click", function(e) {
                e.preventDefault();

                if (matchObj.hasClass(local.settings.handleActiveClass)) {
                    local.hideBoth(matchObj, contentObj);   
                } else {
                    local.showBoth(matchObj, contentObj);   
                }
            });

            // If defined, bind action to just hide within the content element
            if (local.settings.contentClose) {
                contentObj.find(local.settings.contentClose).on("click", function(e) {
                    e.preventDefault();
                    local.hideBoth(matchObj, contentObj);
                });
            }
        }      

        // Show connected content (open accordion)
        local.showBoth = function(handle, contentObj) {
            handle.removeClass(local.settings.handleInactiveClass);
            handle.addClass(local.settings.handleActiveClass);
            handle.attr("aria-expanded", "true").attr("aria-selected", "true");
            contentObj.attr("aria-hidden", "false").attr("aria-expanded", "true").attr("aria-selected", "true");

            // Fire callback, if any
            if (typeof local.settings.onShow == "function") {
                local.settings.onShow(handle, contentObj);
            }

            try{
            	var dataHideLabel = $(handle).attr('data-hidelabel');
                if(dataHideLabel!="See less" && dataHideLabel!=undefined) {
                	if (dataHideLabel == "Hide coverage by vehicle" && dataHideLabel!=undefined) {
                    	  vehicleCovrgLinkStatus.update(handle); 
                    } else {
                  	  viewAllStates.update(handle);
                    }
                }
            }catch(e){
            	
            }
            
            // Class content
            contentObj.removeClass(local.settings.childInactiveClass);
            contentObj.addClass(local.settings.childActiveClass);

            if (local.settings.showEffect) {
                local.settings.showEffect(contentObj);
            } else {
                contentObj.show();
            }
        }


        // Hide connected content (close accordion)
        local.hideBoth = function(handle, contentObj) {
            // Hide state for handle (accordion closed)
            handle.removeClass(local.settings.handleActiveClass);
            handle.addClass(local.settings.handleInactiveClass);
            handle.attr("aria-expanded", "false").attr("aria-selected", "false");
            contentObj.attr("aria-hidden", "true").attr("aria-expanded", "false").attr("aria-selected", "false");

            // Using click callback, if any
            if (typeof local.settings.onHide == "function") {
                local.settings.onHide(handle, contentObj);
            }       
           
            try{
            	var dataHideLabel = $(handle).attr('data-hidelabel');
            	if(dataHideLabel!="See less" && dataHideLabel!=undefined) {
            		if (dataHideLabel == "Hide coverage by vehicle" && dataHideLabel!=undefined) {
                  	  vehicleCovrgLinkStatus.update(handle); 
                  } else {
                	  viewAllStates.update(handle);
                  }
                	
                } 
            	
            }catch(e){
            	
            }
            
            // Class content
            contentObj.removeClass(local.settings.childActiveClass);
            contentObj.addClass(local.settings.childInactiveClass);                       

            if (local.settings.hideEffect) {
                local.settings.hideEffect(contentObj);
            } else {
                contentObj.hide();
            }
        }  

        // Init plugin
        local.init();
    };
    

    // Default options for plugin, overwrite with passed object
    $.toggler.defaultOptions = {
        onShow: false,
        onHide: false,
        showEffect: function(el) {
            el.slideToggle("fast");
        },
        hideEffect: false,
        contentClose: ".toggler-close",
        handleActiveClass: "active",
        handleInactiveClass: "inactive",
        childActiveClass: "active",
        childInactiveClass: "inactive"
    };
    

    // Define plugin namespace
    // Replace PLUGIN_NAME with what you want your plugin called 
    $.fn.toggler = function(options){
        var plugin     = (new $.toggler(options));

        
        return this.each(function(){
            // The Loop
            var matchObj    = $(this); // Element being match by selector
            var togglerData = matchObj.data("toggler");

            debug(". Toggler match found on: "+matchObj[0].className); 


            // Only attach if the item has toggler data attribute, otherwise skip
            if (togglerData) {
                var contentObj = $(togglerData); // Related content element

                // Check for start open flag
                if (matchObj.data("toggleropen")) {
                    plugin.showBoth(matchObj, contentObj);
                }

                // Binding
                plugin.bind(matchObj, contentObj);
            } else {
                debug("! Toggler data attribute not found, skipping");
            }
        });
    };
    
})(jQuery);