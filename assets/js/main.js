!(function($) {
    "use strict";

    // Nav Menu
    $(document).on('click', '.nav-menu a, .mobile-nav a', function(e) {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var hash = this.hash;
            var target = $(hash);
            if (target.length) {
                e.preventDefault();

                if ($(this).parents('.nav-menu, .mobile-nav').length) {
                    $('.nav-menu .active, .mobile-nav .active').removeClass('active');
                    $(this).closest('li').addClass('active');
                }

                if (hash == '#header') {
                    $('#header').removeClass('header-top');
                    $("section").removeClass('section-show');
                    if ($('body').hasClass('mobile-nav-active')) {
                        $('body').removeClass('mobile-nav-active');
                        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                        $('.mobile-nav-overly').fadeOut();
                    }
                    return;
                }

                if (!$('#header').hasClass('header-top')) {
                    $('#header').addClass('header-top');
                    setTimeout(function() {
                        $("section").removeClass('section-show');
                        $(hash).addClass('section-show');

                    }, 350);
                } else {
                    $("section").removeClass('section-show');
                    $(hash).addClass('section-show');
                }

                $('html, body').animate({
                    scrollTop: 0
                }, 350);

                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }

                return false;

            }
        }
    });

    // Activate/show sections on load with hash links
    if (window.location.hash) {
        var initial_nav = window.location.hash;
        if ($(initial_nav).length) {
            $('#header').addClass('header-top');
            $('.nav-menu .active, .mobile-nav .active').removeClass('active');
            $('.nav-menu, .mobile-nav').find('a[href="' + initial_nav + '"]').parent('li').addClass('active');
            setTimeout(function() {
                $("section").removeClass('section-show');
                $(initial_nav).addClass('section-show');
            }, 350);
        }
    }

    // Mobile Navigation
    if ($('.nav-menu').length) {
        var $mobile_nav = $('.nav-menu').clone().prop({
            class: 'mobile-nav d-lg-none'
        });
        $('body').append($mobile_nav);
        $('body').prepend('<button type="button" class="mobile-nav-toggle d-lg-none"><i class="icofont-navigation-menu"></i></button>');
        $('body').append('<div class="mobile-nav-overly"></div>');

        $(document).on('click', '.mobile-nav-toggle', function(e) {
            $('body').toggleClass('mobile-nav-active');
            $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
            $('.mobile-nav-overly').toggle();
        });

        $(document).click(function(e) {
            var container = $(".mobile-nav, .mobile-nav-toggle");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                if ($('body').hasClass('mobile-nav-active')) {
                    $('body').removeClass('mobile-nav-active');
                    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
                    $('.mobile-nav-overly').fadeOut();
                }
            }
        });
    } else if ($(".mobile-nav, .mobile-nav-toggle").length) {
        $(".mobile-nav, .mobile-nav-toggle").hide();
    }

    // jQuery counterUp
    $('[data-toggle="counter-up"]').counterUp({
        delay: 10,
        time: 1000
    });

    // Skills section
    $('.skills-content').waypoint(function() {
        $('.progress .progress-bar').each(function() {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {
        offset: '80%'
    });

    // Testimonials carousel (uses the Owl Carousel library)
    $(".testimonials-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            },
            900: {
                items: 3
            }
        }
    });

    // Porfolio isotope and filter
    $(window).on('load', function() {
        var portfolioIsotope = $('.portfolio-container').isotope({
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows'
        });

        $('#portfolio-flters li').on('click', function() {
            $("#portfolio-flters li").removeClass('filter-active');
            $(this).addClass('filter-active');

            portfolioIsotope.isotope({
                filter: $(this).data('filter')
            });
        });

    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function() {
        $('.venobox').venobox({
            'share': false
        });
    });

    // Portfolio details carousel
    $(".portfolio-details-carousel").owlCarousel({
        autoplay: true,
        dots: true,
        loop: true,
        items: 1
    });

})(jQuery);
// Typing effects 
var theText = $(".typer").data("text"),
    theTextLength = theText.length,
    n = 0,
    theTyper = setInterval(function() {
        $(".typer").each(function() {
            $(this).html($(this).html() + theText[n]);
        });
        n += 1;
        if (n === theTextLength) {
            clearInterval(theTyper);
        }
    }, 80);


// Mouse effects 
document.addEventListener('mousemove', e => {

    let bubles = document.createElement('bubles');
    let x = e.pageX;
    let y = e.pageY;
    bubles.style.left = x + "px";
    bubles.style.top = y + "px";
    let size = Math.random() * 50;
    bubles.style.width = 1 + size + "px";
    bubles.style.height = 1 + size + "px";

    document.body.appendChild(bubles);
    setTimeout(function() {
        bubles.remove();
    }, 1100);
});



// read more

let noOfCharac = 50;
let contents = document.querySelectorAll(".rmtarget");
contents.forEach(content => {
    //If text length is less that noOfCharac... then hide the read more button
    if (content.textContent.length < noOfCharac) {
        content.nextElementSibling.style.display = "none";
    } else {
        let displayText = content.textContent.slice(0, noOfCharac);
        let moreText = content.textContent.slice(noOfCharac);
        content.innerHTML = `${displayText}<span class="dots">...</span><span class="hide more">${moreText}</span>`;
    }
});

function readMore(btn) {
    let post = btn.parentElement;
    post.querySelector(".dots").classList.toggle("hide");
    post.querySelector(".more").classList.toggle("hide");
    btn.textContent == "Read More" ? btn.textContent = "Read Less" : btn.textContent = "Read More";
}

// Audio
function toggleAudio() {
    var audioElement = document.getElementById('player')
    var soundOn = document.getElementById('play')
    var soundOff = document.getElementById('pause')
    if (audioElement.paused) {
        audioElement.play();
        $(soundOn).show();
        $(soundOff).hide();
    } else {
        audioElement.pause();
        $(soundOn).hide();
        $(soundOff).show();
    }
}

// Time 

const clock = () => {
    let date = new Date();
    let hrs = date.getHours();
    let mins = date.getMinutes();
    let secs = date.getSeconds();
    let period = "AM";
    if (hrs == 0) {
        hrs = 12;
    } else if (hrs >= 12) {
        hrs = hrs - 12;
        period = "PM";
    }
    hrs = hrs < 10 ? "0" + hrs : hrs;
    mins = mins < 10 ? "0" + mins : mins;
    secs = secs < 10 ? "0" + secs : secs;

    let time = `${hrs}:${mins}:${secs}:${period}`;
    document.getElementById("clock").innerText = time;
    setTimeout(clock, 1000);
};

clock();

//Date

const date = () => {

    let dayArray = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
    let date = new Date();
    let day = date.getDate();
    let dayname = date.getDay();
    let year = date.getFullYear();

    document.getElementById('date').innerHTML = `${dayArray[dayname]}, ${day}, ${year} `
}

date();
