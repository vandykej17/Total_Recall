/*
    Coverages Price Picker
    Used on the edit coverages worksheet when selecting deductibles and other price options
    5/21/14 ~BV

    Syntax:
    $(selector).coveragesPicker(options)


    Usage:
    $(".coverage-picker").coveragesPicker();


    Options:
    Options should be passed as an object

    onClick         obj     Function applied when a click is made to a tile anchor [false]


    Example:
    $(".coverage-picker").coveragesPicker({
        onClick: function(e) {
            e.preventDefault();
            alert("I made a selection");
        }
    });

*/


$.fn.initCoveragePicker = function(){
    $.picker = function(el, options){
        var local = this; // Store for scope

        // Init plugin, fires before loop
        local.init = function(){
            local.settings = $.extend({},$.picker.defaultOptions, options); // Merge settings
       
        };

        function debug(str) {
            if (local.settings.debug) { console.log(str); } 
        }



        /* Plugin action methods */

        // Bind actions
        local.bind = function(matchObj) {
            matchObj.find(".coverage-picker__tile--link").on("click", function(e) {
                var clicked = $(this);
                // Toggle active styles on tiles
                //clicked.closest(".coverage-picker").find(".coverage-picker__tile").removeClass("coverage-picker__tile--selected");
                //clicked.closest(".coverage-picker__tile").addClass("coverage-picker__tile--selected");

                // Using click callback, if any
                if (typeof local.settings.onClick == "function") {
                    local.settings.onClick(e, clicked);
                }
            });            

        }      

        // Init plugin
        local.init();
    };
    
    /* Add Plugin to jQuery */
    // Default options for plugin, overwrite with passed object
    $.picker.defaultOptions = {
        debug: false
    };
    

    // Define plugin namespace
    // Replace PLUGIN_NAME with what you want your plugin called 
    $.fn.coveragePicker = function(options){
        //return this.each(function(){
           
            // The Loop
            var plugin     = (new $.picker(this, options));

            plugin.bind($(this)); // 
        //});
    };
    
};

$(function() { $.fn.initCoveragePicker(); }); 
