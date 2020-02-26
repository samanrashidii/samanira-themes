$(document).ready(function(){

// Navigation Section Change //

var aChildren = $(".navigation li").children();
var aArray = [];
for (var i=0; i < aChildren.length; i++) {    
  var aChild = aChildren[i];
  var ahref = $(aChild).attr('href');
  aArray.push(ahref);
};

$(window).scroll(function(){

  var windowPos = $(window).scrollTop();
  var windowHeight = $(window).height();
  var docHeight = $(document).height();

  for (var i=0; i < aArray.length; i++) {
    var theID = aArray[i];
    var divPos = $(theID);
    if (divPos.length) {
      if($(window).width() > 980){
        var divPos = divPos.offset().top - 70;
      } else{
        var divPos = divPos.offset().top - 84;
      } 
    }
    if($(window).width() > 980){
      var divHeight = $(theID).height() + 70;
    } else{
      var divHeight = $(theID).height() + 84;
    } 
    if (windowPos >= divPos && windowPos < (divPos + divHeight)) {
        $("a[href='" + theID + "']").parent().addClass("menu__item--current").siblings().removeClass("menu__item--current");
    } else {
        $("a[href='" + theID + "']").parent().removeClass("menu__item--current");
    }
  }
});

// Navigation Scroll //

$('.navigation a').click(function(event) {
  var id = $(this).attr("href");
  var target = $(id).offset().top;
  if($(window).width() > 980){
    $('html, body').animate({
        scrollTop: target - 69
    }, 1000, 'easeInExpo');
  } else{
    $('html, body').animate({
        scrollTop: target - 83
    }, 1000, 'easeInExpo');
  }
  event.preventDefault();
});

// Menu

(function() {
	[].slice.call(document.querySelectorAll('.menu')).forEach(function(menu) {
		var menuItems = menu.querySelectorAll('.menu__link'),
		setCurrent = function(ev) {
			ev.preventDefault();
			var item = ev.target.parentNode;
			if (classie.has(item, 'menu__item--current')) {
				return false;
			}
			classie.remove(menu.querySelector('.menu__item--current'), 'menu__item--current');
			classie.add(item, 'menu__item--current');
		}
	});
})(window);

// Sticky Header //

$(window).scroll(function(){

	if($(window).scrollTop() > 20){
		$('.header').addClass('sticky');
	} else{
		$('.header').removeClass('sticky');
	}	

});

// Slider //

var slider = new MasterSlider();
slider.setup('masterslider' , {
  width:1920,
  height:800,
  loop:true,
  autoplay:true,
  fullwidth:true,
  overPause:false,
  centerControls:false,
  speed:16,
  view:'fade'
});
slider.control('bullets' ,{autohide:false });

// Carousel //

$(".carousel").owlCarousel({
  responsive: true,
  stopOnHover: true,
  autoPlay: 3000,
  pagination: true,
  navigation : true,
  items : 3,
  itemsDesktop : [1199,3],
  itemsDesktopSmall : [1100,2],
  itemsTablet: [760,1],
  itemsMobile : false
});

// Video Player for Youtube //

var player;

function onYouTubeIframeAPIReady() {
  player = new YT.Player('video', {
    events: {
      'onReady': onPlayerReady
    }
  });
}

function onPlayerReady(event) {
  var playButton = document.getElementById("play-video");
  playButton.addEventListener("click", function() {
    player.playVideo();
  });
}

var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

$('#play-video').on('click', function(){
  $('.video-layer').fadeOut();
});

// Grid Isotope //

$('img').on('load', function(){
  $('.grid').isotope({
    itemSelector: '.grid-item',
    layoutMode: 'masonry',
    isOriginLeft: true,
    percentPosition: true,
    transitionDuration: '0.5s'
  });
  $('.isotope-tabs a').on( 'click', function() {
    $('.isotope-tabs').find('.active').removeClass('active');
    $(this).addClass('active');
    $filterValue = $(this).attr('data-filter');
    $('.grid').isotope({ filter: $filterValue });
  });
})

// Lightbox //

$(".gallery-item").fancybox({
  padding: 0,
  openEffect : 'elastic',
  openSpeed  : 350,
  closeEffect : 'elastic',
  closeSpeed  : 350
});

$(".open-lightbox").fancybox({padding:7});

// Form Validate //

$('.number-field').numeric();

$('.contact_form').validate({
  rules: {
    name: {
      required: true,
      minlength: 2
    },
    email: {
      required: true,
      minlength: 5,
      email:true
    },
    mobile: {
      required: true,
      minlength: 5,
      number:true
    },
    subject: {
      required: true,
      minlength: 2
    },
    message: {
      required: true,
      minlength: 8
    },
  },
  messages: {
    name: "Please enter your name",
    email: "Please enter your email address",
    mobile: "Please enter your mobile number",
    subject: "Please enter your message subject",
    message: "Please write your message"
  },
  errorPlacement: function(error, element) {
    error.insertAfter(element);
  },
  submitHandler: function (form) {
    if($('.samanira_secure').val() == '') {
    	$('.contact_form :input').prop('disabled', true);
		$('.thank-you').fadeIn();
    } else {
      $('.contact_form input[type="submit"]').prop('disabled', true);
      return false;
    }
  }

});

// Mobile Items //

$('.nav-toggle').on('click', function(){
  $('.navigation').toggleClass('active');
  $('body').toggleClass('hidden-overflow');
});

$('.menu__link').on('click', function(){
  if($('.navigation').hasClass('active')){
    $('.navigation').removeClass('active');
    $('body').removeClass('hidden-overflow');
    $('.nav-toggle').removeClass('active');
  }
});

// Show Hand Helper

$.fn.isScrollable = function () {
    return this[0].scrollWidth > this[0].clientWidth;
};

if($(window).width() < 560){
  if($('.isotope-tabs').isScrollable()){
    $('.isotope-tabs').append('<span class="hand"></span>');
    var handScroll = (function() {
      var executed = false;
      return function () {
        if (!executed) {
          executed = true;
          var item_width = $('.isotope-tabs').outerWidth();
          $('.hand').addClass('shown');
          setTimeout(function(){
            $('.hand').addClass('active');
            $(".isotope-tabs").animate({scrollLeft: item_width}, 2100);
          },500);
          setTimeout(function(){
            $(".isotope-tabs").animate({scrollLeft: 0}, 600);
            setTimeout(function(){
              $('.hand').removeClass('active');
              setTimeout(function(){
                $('.hand').removeClass('shown');
              },500);
            },2000);
          },500);
        }
      };
    })();
  }

  $(window).scroll(function(){
    var windowPos = $(window).scrollTop();
    var windowHeight = $(window).height();
    var docHeight = $(document).height();
    var divPos = $('.has-isotope').offset().top;
    var divHeight = $('.has-isotope').height();
      if(windowPos >= divPos && windowPos < (divPos + divHeight)) {
        handScroll();
      }
  });  
}

// Hide Header on on scroll down //

var didScroll;
var lastScrollTop = 0;
var delta = 5;
var navbarHeight = $('.header').outerHeight();

$(window).scroll(function(event){
  didScroll = true;
});

setInterval(function() {
  if (didScroll) {
    hasScrolled();
    didScroll = false;
  }
}, 250);

function hasScrolled() {
  var st = $(this).scrollTop();
  
  if(Math.abs(lastScrollTop - st) <= delta)
      return;
  if (st > lastScrollTop && st > navbarHeight){
    // Scroll Down
    $('.header').removeClass('nav-down').addClass('nav-up');
  } else {
    // Scroll Up
    if(st + $(window).height() < $(document).height()) {
      $('.header').removeClass('nav-up').addClass('nav-down');
    }
  }
  lastScrollTop = st;
}

// Google Map //

var map;
var studiotime = new google.maps.LatLng(42.4943981,45.451405);

function initialize() {

  var roadAtlasStyles = [
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f7f1df"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "hue": "#ff0000"
            },
            {
                "weight": "1.25"
            }
        ]
    },
    {
        "featureType": "landscape.natural",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#d0e3b4"
            }
        ]
    },
    {
        "featureType": "landscape.natural.terrain",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "poi.attraction",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "hue": "#ff0000"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#fbd3da"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#bde6ab"
            }
        ]
    },
    {
        "featureType": "poi.place_of_worship",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffe15f"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#efd151"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "black"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "labels",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.airport",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#cfb2db"
            }
        ]
    },
    {
        "featureType": "transit.station.bus",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text",
        "stylers": [
            {
                "weight": "10.00"
            }
        ]
    },
    {
        "featureType": "transit.station.rail",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#00c0ff"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#a2daf2"
            }
        ]
    }
]

var mapOptions = {
  zoom: 5,
  scrollwheel: false,
  center: studiotime,
  mapTypeControlOptions: {
      mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
  }
};

map = new google.maps.Map(document.getElementById('map_canvas'),
mapOptions);

var mapCanvas = document.getElementById('map_canvas');
var myLatlng = new google.maps.LatLng(41.7943981,44.822222);
var image = 'images/icons/marker.png';
var marker = new google.maps.Marker({
position: myLatlng,
map: map,
icon: image

});

marker.setAnimation(google.maps.Animation.BOUNCE);
var styledMapOptions = {
    
};

var usRoadMapType = new google.maps.StyledMapType(
roadAtlasStyles, styledMapOptions);

map.mapTypes.set('usroadatlas', usRoadMapType);
map.setMapTypeId('usroadatlas');
}

var getDirection = (function(marker) {
  var executed = false;
  return function() {
    if (!executed) {
      executed = true;
      initialize();
    }
  };
})();

$('.get-direction').on('click', function(){
  getDirection();
});

});