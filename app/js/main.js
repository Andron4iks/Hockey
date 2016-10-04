$(document).ready(function() {

	var sync1 = $("#sync1");
  	var sync2 = $("#sync2");
  	var slidesPerPage = 4; //globaly define number of elements per page
  	var syncedSecondary = true;

  sync1.owlCarousel({
    items : 1,
    slideSpeed : 2000,
    nav: true,
    autoplay: false,
    dots: true,
    loop: true,
    responsiveRefreshRate : 200,
    navText: ["", ""],
  }).on('changed.owl.carousel', syncPosition);

  sync2
    .on('initialized.owl.carousel', function () {
      sync2.find(".owl-item").eq(0).addClass("current");
    })
    .owlCarousel({
    items : 6,
    margin:10,
    nav: true,
    responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        800:{
            items:3,
        },
        1200:{
            items:4,
        },
        1600:{
            items:6
        }

    },
    smartSpeed: 200,
    slideSpeed : 500,
    slideBy: slidesPerPage, //alternatively you can slide by 1, this way the active slide will stick to the first item in the second carousel
    responsiveRefreshRate : 100
  }).on('changed.owl.carousel', syncPosition2);

  function syncPosition(el) {
    //if you set loop to false, you have to restore this next line
    //var current = el.item.index;
    
    //if you disable loop you have to comment this block
    var count = el.item.count-1;
    var current = Math.round(el.item.index - (el.item.count/2) - .5);
    if(current < 0) {
      current = count;
    }
    if(current > count) {
      current = 0;
    }    
    //end block

    sync2
      .find(".owl-item")
      .removeClass("current")
      .eq(current)
      .addClass("current");
    var onscreen = sync2.find('.owl-item.active').length - 1;
    var start = sync2.find('.owl-item.active').first().index();
    var end = sync2.find('.owl-item.active').last().index();
    
    if (current > end) {
      sync2.data('owl.carousel').to(current, 100, true);
    }
    if (current < start) {
      sync2.data('owl.carousel').to(current - onscreen, 100, true);
    }
  }
  
  function syncPosition2(el) {
    if(syncedSecondary) {
      var number = el.item.index;
      sync1.data('owl.carousel').to(number, 100, true);
    }
  }
  
  sync2.on("click", ".owl-item", function(e){
    e.preventDefault();
    var number = $(this).index();
    sync1.data('owl.carousel').to(number, 300, true);
  });


	 $('.owl-carousel').owlCarousel({
        loop:true,
        margin:20,
        nav: true,
        navText: ["", ""],
         responsive:{
        0:{
            items:1,
        },
        600:{
            items:2,
        },
        800:{
            items:3,
        },
        1200:{
            items:4,
        },
        1600:{
            items:5
        }

    }

    })

	

	$(".bg_img").css("min-height", $(window).height());
  


	$('.text_column').ellipsis({
		  lines: 3,             // force ellipsis after a certain number of lines. Default is 'auto'
		  // ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
		  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
})
	$('.p_column').ellipsis({
		  lines: 3,             // force ellipsis after a certain number of lines. Default is 'auto'
		  // ellipClass: 'ellip',  // class used for ellipsis wrapper and to namespace ellip line
		  responsive: true      // set to true if you want ellipsis to update on window resize. Default is false
});

 $(".top_nav").on("click","a", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top-90;
        $('body,html').animate({scrollTop: top}, 1000);
    });

    var $menu = $("#top_header");

        $(window).scroll(function(){
            if ( $(this).scrollTop() > 750 && $menu.hasClass("top_header") ){
                $menu.slideUp('fast',function(){
                    $(this).removeClass("top_header")
                           .addClass("header_fixed")
                           .slideDown('fast');
                });
            } else if($(this).scrollTop() <= 750 && $menu.hasClass("header_fixed")) {
                $menu.slideUp('fast',function(){
                    $(this).removeClass("header_fixed")
                           .addClass("top_header")
                           .slideDown('fast');
                });
            }
        });
      $('.popup-youtube').magnificPopup({
    disableOn: 700,
    type: 'iframe',
    mainClass: 'mfp-fade',
    removalDelay: 160,
    preloader: false,

    fixedContentPos: false
  });

});