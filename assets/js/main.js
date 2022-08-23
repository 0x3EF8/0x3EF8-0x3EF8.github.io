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


//BLOG

let selectedItem,
    itemTL,
    overlayTL,
    scrollTL,
    isExpanded = false;

const timeline = document.querySelector(".timeline");
const items = document.querySelectorAll(".timeline-item");
const itemImages = document.querySelectorAll(
    ".timeline-item > .timeline-photo");

const itemHeadlines = document.querySelectorAll(
    ".timeline-item > .timeline-headline");

const overlay = document.querySelector(".timeline-overlay");
const backButton = document.querySelector(".timeline-back");

for (item of items) {
    const randomId = Math.random().
    toString(36).
    replace(/[^a-z]+/g, "").
    substr(2, 10);
    item.setAttribute("data-timeline", randomId);

    item.addEventListener("click", e => {
        handleItemClick(randomId);
    });

    item.addEventListener("mouseover", e => {
        if (!isExpanded && e.target.tagName === "IMG") {
            e.target.parentNode.children.length > 1 &&
                TweenMax.fromTo(
                    e.target.parentNode.children[1],
                    1, { opacity: 0, scaleX: 0.5, scaleY: 0.1, y: -70 }, { opacity: 1, scaleX: 1, scaleY: 1, y: -5, ease: Back.easeOut });

            TweenMax.to(e.target, 30, { scale: 2 });
            TweenMax.to(e.target.parentNode, 4, {
                boxShadow: "0 30px 70px rgba(0,0,0,.45)"
            });

        }
    });

    item.addEventListener("mouseout", e => {
        if (!isExpanded && e.target.tagName === "IMG") {
            e.target.parentNode.children.length > 1 &&
                TweenMax.to(e.target.parentNode.children[1], 1, {
                    opacity: 0,
                    scaleX: 1,
                    scaleY: 1,
                    y: 100
                });

            TweenMax.to(e.target, 1, { scale: 1 });
            TweenMax.to(e.target.parentNode, 1, {
                boxShadow: "0 10px 30px rgba(0,0,0,.2)"
            });

        }
    });
}

function handleItemClick(id) {
    if (overlayTL !== undefined) {
        overlayTL.progress(0);
        overlayTL.pause();
    }

    if (!isExpanded) {
        isExpanded = true;
        const item = document.querySelector(`[data-timeline=${id}]`);
        const itemHeadline = item.querySelector(".timeline-headline");
        const itemSubTitle = item.querySelector(".timeline-subtitle");
        const itemContent = item.querySelector(".timeline-content");
        const itemPhoto = item.querySelector(".timeline-photo");
        const itemCTA = item.querySelector(".timeline-cta");
        const itemExcerpt = item.querySelector(".timeline-excerpt");
        const itemChildContents = document.querySelectorAll(
            `[data-timeline=${id}] .timeline-content > *`);

        const itemPhotoImg = itemPhoto.querySelector("img");
        const unSelectedItems = document.querySelectorAll(
            `[data-timeline]:not([data-timeline=${id}])`);

        const unSelectedChildItems = document.querySelectorAll(
            `[data-timeline]:not([data-timeline=${id}]) > *:not(.timeline-photo)`);

        const itemOffsetTop = item.getBoundingClientRect().y * -1;
        selectedItem = item;
        TweenMax.to(itemPhotoImg, 1, { scale: 1 });

        TweenMax.to(itemCTA, 0.5, { opacity: 0 });
        TweenMax.to(itemPhoto, 1, { boxShadow: "0 10px 30px rgba(0,0,0, .2)" });

        for (_i of items) {
            _i.classList.remove("is-active");
        }

        timeline.classList.add("is-expanded");
        item.classList.add("is-active");
        backButton.classList.add("is-active");

        itemTL = new TimelineMax({ paused: false });

        itemTL.
        set(timeline, { maxWidth: 760 }).
        set(items, { clearProps: "all" }).
        set(itemSubTitle, { clearProps: "all" }).
        set(itemPhoto, { clearProps: "all" }).
        set(itemHeadline, { clearProps: "all" }).
        to(unSelectedChildItems, 0.3, { y: 40, opacity: 0 }).
        to(
            itemHeadline,
            0.5, {
                opacity: 0,
                left: 0,
                top: "30vh",
                width: "100%",
                textAlign: "center"
            },

            "-=.35").

        set(itemExcerpt, { display: "none" }).
        to(unSelectedItems, 0.2, { opacity: 0 }, "-=.35").
        add("itemExpand").
        to(timeline, 0.5, { maxWidth: "100%" }, "itemExpand").
        to(
            item,
            0.8, { y: itemOffsetTop, width: "100%", height: "60vh" },
            "itemExpand").

        to(itemHeadline, 1, { top: 0, height: "100vh", padding: 0 }, "-=.3").
        to(itemPhoto, 1, { borderRadius: 0, height: "100vh" }, "itemExpand").
        add("resize").
        to(
            itemHeadline,
            1, {
                height: 100,
                opacity: 1,
                fontSize: "calc(.4vw + 10px)",
                backgroundColor: "rgba(45, 45, 45, 0.8)"
            },

            "resize").

        to(itemPhoto, 1, { height: 150 }, "resize").
        set(itemPhoto, { height: 150, position: "sticky", top: 0 }).
        set(itemHeadline, { position: "sticky", top: 0 }).
        set(item, {
            y: 0,
            height: "auto",
            marginTop: 0,
            clearProps: "transform"
        }).

        set(unSelectedItems, { display: "none" }).
        set(timeline, { paddingBottom: 0 }).
        set(itemContent, { display: "block", top: 50 }).
        set(window, { scrollTo: { y: 0 } }).
        fromTo(itemContent, 0.4, { opacity: 0, y: 70 }, { opacity: 1, y: 0 }).
        staggerFromTo(
            itemChildContents,
            0.7, { opacity: 0, y: 20 }, { opacity: 1, y: 0 },
            0.1,
            "-=.3");

    }
}

backButton.addEventListener("click", () => {
    if (isExpanded) {
        timeline.classList.remove("is-expanded");
        selectedItem.classList.remove("is-active");
        backButton.classList.remove("is-active");
        overlayTL = new TimelineMax({
            paused: false,
            onComplete: () => {
                itemTL.progress(0);
                itemTL.pause();
                TweenMax.staggerFromTo(
                    items,
                    0.9, { opacity: 0, y: 30 }, { opacity: 1, y: 0 },
                    0.04,
                    () => {
                        isExpanded = false;
                    });

                TweenMax.set(itemHeadlines, { clearProps: "all" });
            }
        });


        overlayTL.
        to(selectedItem, 0.3, { opacity: 0 }).
        to(overlay, 0.6, { height: "110vh", ease: Expo.easeOut }, "+=.2").
        to(overlay, 0.6, { height: 0, top: "100%", ease: Expo.easeOut });
    }
});

  // disable right click
    document.addEventListener('contextmenu', event => event.preventDefault());
 
    document.onkeydown = function (e) {
 
        // disable F12 key
        if(e.keyCode == 123) {
            return false;
        }
 
        // disable I key
        if(e.ctrlKey && e.shiftKey && e.keyCode == 73){
            return false;
        }
 
        // disable J key
        if(e.ctrlKey && e.shiftKey && e.keyCode == 74) {
            return false;
        }
 
        // disable U key
        if(e.ctrlKey && e.keyCode == 85) {
            return false;
        }
    }
