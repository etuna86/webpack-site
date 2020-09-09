$(document).ready(function() {
    $(".grayscale").hover(
        function () {
            $(this).addClass("grayscale-off");
        }, function () {
            $(this).removeClass("grayscale-off");
        }
    );
});

[].forEach.call(document.querySelectorAll('.toggleBodyNoScroll'), function(btn){
    btn.addEventListener('click', function() {
        document.body.classList.toggle('noscroll');
    })
})
  

$('.mobil-menu-btn').click(function () {
    $(this).toggleClass('opened');
    $('.mobile-menu').toggleClass('open');
})

$('.mobile-submenu-btn').click(function () {
    $(this).toggleClass('opened-btn');
    $(this).next().next('.mobile-submenu').toggleClass('open-submenu');
})

$('.list').click(function () {
    $('.mobile-menu').removeClass('open');
    $('.mobil-menu-btn').removeClass('opened');
})


var a=0;
$(window).scroll(function() {
    var scroll = $(window).scrollTop();
    if (scroll >= 200) {
        $( "header" ).addClass("header-white");
    } else {
        $( "header" ).removeClass("header-white");

    }

    if($('.counter-section').length > 0) {
        var oTop = $('.counter-section').offset().top - window.innerHeight;
        if (a == 0 && $(window).scrollTop() > oTop) {
            $('.counter-value').each(function() {
                var $this = $(this),
                    countTo = $this.attr('data-count');
                $({
                    countNum: $this.text()
                }).animate({
                        countNum: countTo
                    },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function() {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function() {
                            $this.text(this.countNum);
                            //alert('finished');
                        }
                    });
            });
            a = 1;
        }
    }
});

if (screen.width > 765) {
    window.onscroll = function() {scrollFunction()};
    function scrollFunction() {
        if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
            document.getElementById("gotopbtn").style.display = "block";
        } else {
            document.getElementById("gotopbtn").style.display = "none";
        }
    }

    $('#gotopbtn').click(function() {
        var gotopbtnElement=document.getElementById("gotopbtn");
        var rocketFire=gotopbtnElement.getElementsByTagName('b');
        rocketFire[0].style.display = "inline-block";
        setTimeout(function(){  rocketFire[0].style.display = "none"; }, 1100);
        console.warn("rocketFire",rocketFire);
        var body = $("html, body");
        body.stop().animate({scrollTop:0}, 1000, 'swing', function() {
        });
    });
}

$( window ).scroll(function() {
    $( ".counter-section" ).addClass("visibled");
});
$(".search-show-btn").click(function(){
    $(".search-text").toggleClass("slide");
});

$('#main-slider').owlCarousel({
    loop:true,
    margin:10,
    dots:true,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText:['<div class="slider-arrow-box"><img src="img/arrow-white.svg" /></div>','<div class="slider-arrow-box"><img src="img/arrow-white.svg" /></div>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})

$('#home-partners').owlCarousel({
    items:3,
    loop:true,
    margin:20,
    dots:true,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText:['<div class="slider-arrow-box"><img src="img/arrow-blue.svg" /></div>','<div class="slider-arrow-box"><img src="img/arrow-blue.svg" /></div>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:5
        },
        1000:{
            items:5
        }
    }
})

/*
$('.play').on('click',function(){
    $('#main-slider').trigger('play.owl.autoplay',[1000])
    $(this).addClass('close');
    $('.stop').removeClass('close');
})
$('.stop').on('click',function(){
    $('#main-slider').trigger('stop.owl.autoplay')
    $(this).addClass('close');
    $('.play').removeClass('close');
})
*/

/*
$('#information-notes').owlCarousel({
    items:1,
    loop:true,
    margin:15,
    dots:true,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText:['<div class="slider-arrow-box"><img src="img/arrow-white.svg" /></div>','<div class="slider-arrow-box"><img src="img/arrow-white.svg" /></div>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:1
        },
        1000:{
            items:1
        }
    }
})


$('#lawyers-on-subject').owlCarousel({
    items:5,
    loop:true,
    margin:15,
    dots:true,
    nav:true,
    autoplay:true,
    autoplayTimeout:3000,
    autoplayHoverPause:true,
    navText:['<div class="slider-arrow-box"><img src="img/arrow-blue.svg" /></div>','<div class="slider-arrow-box"><img src="img/arrow-blue.svg" /></div>'],
    responsive:{
        0:{
            items:1
        },
        600:{
            items:5
        },
        1000:{
            items:5
        }
    }
})
*/


$(".list").on('click', function(event) {
    event.preventDefault();
    var hash = this.hash ;
    $('html, body').animate({
        scrollTop:$(hash).offset().top
    },1000 );
});

$('#accordionExample').collapse({
    toggle: false
})



$('.owl-next').click(function () {
    var owlNext=document.getElementsByClassName('owl-next');
    var sliderArrowBoxNext=owlNext[0].getElementsByClassName('slider-arrow-box');
    var SliderRocketFire=sliderArrowBoxNext[0].getElementsByTagName('b');
    SliderRocketFire[0].style.display = "inline-block";
    setTimeout(function(){  SliderRocketFire[0].style.display = "none"; }, 200);
})

$('.owl-prev').click(function () {
    var owlPrev=document.getElementsByClassName('owl-prev');
    var sliderArrowBoxNext=owlPrev[0].getElementsByClassName('slider-arrow-box');
    var SliderRocketFire=sliderArrowBoxNext[0].getElementsByTagName('b');
    SliderRocketFire[0].style.display = "inline-block";
    setTimeout(function(){  SliderRocketFire[0].style.display = "none"; }, 200);
})


//greyscalemethod
/**/
/*
$('.img-border-radius').click(function (){
    alert("hover");
    $(this).addClass('grayscale-off');
});

$(document).ready(function () {
    $('.img-border-radius').click(function (){
        alert("hover");
        $(this).addClass('grayscale-off');
    });
    $('.grayscale').onmouseover(function () {
        alert("hover");
        $(this).addClass('grayscale-off');
    });


    $(".grayscale").hover(
        function () {
            alert("hover");
            $(this).addClass("grayscale-off");
        }, function () {
            $(this).removeClass("grayscale-off");
        }
    );
}
*/

