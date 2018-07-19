// For each element selected in this jQuery object,
// set the attribute 'name' to either 'onValue' or 'offValue'
// depending on the value of 'on. If 'on' is omitted,
// toggle the attribute of each element independently
// between 'onValue' and 'offValue'.
// If the selected value (either 'onValue' or 'offValue') is
// null or undefined, remove the attribute.
jQuery.fn.toggleAttr = function( name, onValue, offValue, on ) {
	
	function set( $element, on ) {
	    var value = on ? onValue : offValue;
	    return value == null ?
	        $element.removeAttr( name ) :
	        $element.attr( name, value );
	}
	return on !== undefined ?
	    set( this, on ) :
	    this.each( function( i, element ) {
	        var $element = $(element);
	        set( $element, $element.attr(name) !== onValue );
	    });
};