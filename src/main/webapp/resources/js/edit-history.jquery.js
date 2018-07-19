/*
    Change History Breadcrumbs
    Binds various toggles for the "Make another change" option
    5/28/14 ~BV

    Syntax:
    $(selector).niEditHistory()


    Usage:
    $("#edit-history .accordion").niEditHistory();


    Options:
    No options available
*/
(function($){
    // Define plugin namespace
    // Replace PLUGIN_NAME with what you want your plugin called 
    $.fn.niEditHistory = function(options){
        return this.each(function(){
            // The Loop
            var loopObj = $(this);

            // Binds
            loopObj.find(".edit-history__makechanges--trigger").on("click", function(e) {
                e.preventDefault();
                var clicked       = $(this);

                clicked.hide();
                loopObj.find(clicked.data("content")).show();
            });

            loopObj.find(".edit-history__makechanges--option").on("change", function(e) {
                e.preventDefault();

                loopObj.find(".edit-history__makechange--content").hide();

                var clicked = $(this);
                var prefix  = clicked.data("prefix");
                var toshow  = prefix+clicked.val();

                loopObj.find(toshow).show();
            });

            loopObj.find(".edit-history__makechange--cancel").on("click", function(e) {
                e.preventDefault();
                loopObj.find(".edit-history__makechange--content").hide();
            });
        });
    };
    
})(jQuery);