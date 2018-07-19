var carousel;
var landingViewport;
var landingCarousel;

IP = {
	initialize: function(){
		$('.accordion .keyHeader').on('click', function(e){ IP.accordionKeyClick(e) });
		$('#carousel .slider-option').on('click', function(e){ IP.carouselNavClick(e) });
	},
	accordionKeyClick : function(e){
		if(!$(e.currentTarget).parent().hasClass('on')){
			$('.accordion .keyHeader').parent().removeClass('on');
			$(e.currentTarget).parent().addClass('on');
		}
		else{
			$('.accordion .keyHeader').parent().removeClass('on');
		}
	},
	carouselNavClick: function(e){
		$('#carousel .slider-option').removeClass("selected");
		$(e.currentTarget).addClass("selected");
		var carouselPos = $(e.currentTarget).parent().index();
		localStorage.setItem("carouselPos", carouselPos);
	}
}

$.fn.initIP = function () {
	IP.initialize();

	carousel = $('#carousel');
	carousel.owlCarousel({
		items:5,
		pagination:false,
		navigation:true,
		navigationText: ["",""],
		itemsDesktop: false,
	    itemsDesktopSmall: [960,3],
	    itemsTablet: [768,2],
	    itemsMobile: [640,1],
	    rewindNav:false
	});	

	landingViewport = $('#landing-viewport');
	landingViewport.owlCarousel({
		singleItem:true,
		pagination:false,
		navigation:true,
		navigationText: ["",""],
	    addClassActive:true,
	    afterMove: function(e){
	    	var index = $('#landing-viewport .owl-item.active').index();
	    	landingCarousel.trigger('owl.goTo', index);
	    	$('#landing-carousel .slider-option').removeClass("selected");
			$($('#landing-carousel .slider-option')[index]).addClass("selected");
	    },
	    autoPlay:5000
	});

	landingCarousel = $('#landing-carousel');
	landingCarousel.owlCarousel({
		items:5,
		pagination:false,
		navigation:true,
		navigationText: ["",""],
		itemsDesktop: false,
		itemsDesktopSmall: false,
		itemsTablet: [768,4],
	    itemsMobile: [623,1],
	    rewindNav:false
	});

	$('.owl-item').on('keyup', function(e){
        if(event.keyCode == 37){ carousel.prev(); }
        else if(event.keyCode == 39){ carousel.next(); }
        else{ e.preventDefault(); }
    });


	$('#landing-viewport .owl-item').on("click", function(e){
    	var carouselPos = $(this).index();
		localStorage.setItem("carouselPos", carouselPos);
    })
    $('#landing-carousel .owl-item').on("click", function(e){
    	var carouselPos = $(this).index();
		localStorage.setItem("carouselPos", carouselPos);
    })
    $('#landing-carousel .owl-prev').on("click", function(e){
    	landingViewport.trigger('owl.prev');
    })
    $('#landing-carousel .owl-next').on("click", function(e){
    	landingViewport.trigger('owl.next');
    })

    if(localStorage.carouselPos){
		$('#carousel .slider-option').removeClass("selected");
		$($('#carousel .owl-item')[localStorage.carouselPos]).find('.slider-option').addClass("selected");
		carousel.trigger('owl.goTo', localStorage.carouselPos);
		localStorage.removeItem("carouselPos");
	}
};
$(function() { $.fn.initIP(); }); 
