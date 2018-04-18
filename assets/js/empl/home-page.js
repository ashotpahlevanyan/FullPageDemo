// Set variables to use for position control of morphs on large and normal screens
$(document).ready(function() {
    window.currentWidth = $(window).width();
    $(window).trigger('resize');
});
$(window).resize(function() {
    var newWidth = $(window).width();
    if (newWidth > 1366) {
        posNormal = '291px';
        posToTop = '180px';
        morphSvgWrapperPosToTop = '160px';
        ellipsePosToTop = '800px';
    } else if (992 < newWidth && newWidth <= 1366) {
        posNormal = '207px';
        posToTop = '130px';
        morphSvgWrapperPosToTop = '40px';
        ellipsePosToTop = '340px';
    } else if (768 <= newWidth && newWidth <= 992) {
        posNormal = '170px';
        posToTop = '110px';
        morphSvgWrapperPosToTop = '30px';
        ellipsePosToTop = '300px';
    };

    if (newWidth < 768) {
        $(document).ready(function() {
            $('#fullPage').fullpage();
            $.fn.fullpage.destroy('all');
            $('.shapeContainer').appendTo('#firstSlideContent');
        });
        var shiftAmount = $('header').outerHeight();

        $(window).on('scroll load', function () {
            var scrollTo = $(this).scrollTop();

            $('.content').each(function() {
                var top = $(this).offset().top;
                var bottom = top + $(this).outerHeight();

                // Morphing shape moves up slightly, and the portal appears below it.
                if ($(this).attr('id') == "one" && scrollTo > top + 75) {
                    $(".shapeContainer").addClass("fixed");
                } else if ($(this).attr('id') == "one" && scrollTo < top + 75) {
                    $(".shapeContainer").removeClass("fixed");
                }

                // Morphing shape resolves slowly to circle, positioned over the portal and Control indicators/benefitsNav positions
                if ($(this).parent().attr('id') == "content3" && scrollTo >= top) {
                    $("#content1 .shapeWrapper .morphSvgWrapper").fadeOut(100);
                    $("#content1 .shapeWrapper .portal").css({
                        "visibility": "hidden"
                    });
                    $("#content3 .shapeWrapper").addClass("show");

                    $('.indicators').addClass("position");
                    $('.benefitsNav').removeClass("fixed");
                    $('.navWrapper').css("position", "static");
                } else if ($(this).parent().attr('id') == "content3" && scrollTo < top) {
                    $("#content1 .shapeWrapper .morphSvgWrapper").show();
                    $("#content1 .shapeWrapper .portal").removeAttr("style");
                    $("#content3 .shapeWrapper").removeClass("show");

                    $('.indicators').removeClass("position");
                }

                // Control benefitsNav positions
                if ($(this).parent().attr('id') == "content4" && scrollTo >= top) {
                    $('.benefitsNav').addClass("fixed");
                } else if ($(this).parent().attr('id') == "content4" && scrollTo < top) {
                    $('.benefitsNav').removeClass("fixed");
                } else if ($(this).parent().attr('id') == "content6" && scrollTo >= top + 110 ) {
                    $('.benefitsNav').removeClass("fixed");
                }
            });
        });
    } else {
        // fullpage customization
        $('.shapeContainer').appendTo('.landingPage');
        $('#fullPage').fullpage({
            sectionSelector: '.vertical-scrolling',
            navigation: true,
            controlArrows: false,
            scrollingSpeed: 1000,
            lockAnchors: true,
            anchors: ['firstSection', 'secondSection', 'thirdSection', 'fourthSection', 'fifthSection', 'sixthSection', 'seventhSection'],

            afterLoad: function(anchorLink, index) {
                // Showing indicators for intro
                $('#fp-nav').show().addClass('indicators');
                
                // Adding active for the first indicator item
                $('.indicators li:first-child a').addClass('focus');
                // Removing active from the first indicator item
                if (index > 1) {
                    $('.indicators li:first-child a').removeClass('focus');
                }
                
                // Hiding indicators when the page is out of the intro frame
                if (index > 3) {
                    $('.indicators').hide();
                }
                // Hiding morphSVG, showing ellipse shape on 3rd frame
                if (index == 3) {
                    $("svg").fadeOut(200);
                    $(".ellipseShape").fadeIn(400);
                }

                // Hiding benefits nav when we're on last frame
                if (index == 7) {
                    $('.benefitsNav').hide();
                }
            },

            onLeave: function(index, nextIndex, direction) {
                activateNavItem($('.benefitsNav').find('li').eq(nextIndex-1));

                // When we scroll from the 1st frame to 2nd MorphSVG animating to top and showing the portal under it
                if (index == 1 && direction =='down') {
                    $('.indicators li:first-child a').removeClass('focus');
                    $('.shapeContainer').animate({top: posToTop}, 400);
                    $(".portal").fadeIn(800);
                }

                // When we scroll from 2nd to the 1st frame MorphSVG animating to its default position and hiding the portal
                if (index == 2 && direction =='up') {
                    $('.shapeContainer').animate({top: posNormal}, 400);
                    $(".portal").fadeOut(400);
                }
                // When we scroll to the 3rd frame from 2nd Fading MorphSVG to ellipse shape
                if(index == 2 && direction =='down') {
                    $("svg").fadeOut(200);
                    $(".ellipseShape").fadeIn(400);
                }

                // When we scroll to the 2nd frame from 3rd Fading to MorphSVG from ellipse shape
                if (index == 3 && direction =='up') {
                    $("svg").fadeIn(400);
                    $(".ellipseShape").fadeOut(200);
                }
                // When we scroll from 3rd to 4th frame the ellipse shape gets into the portal and is being fade out, the intro indicators are hiding, benefits nav is being shown
                if (index == 3 && direction =='down') {
                    $(".portal").fadeOut(100);
                    $('.morphSvgWrapper').animate({top: morphSvgWrapperPosToTop}, 400);
                    $('.ellipseShape').animate({top: ellipsePosToTop}, 400);
                    $('.benefits .shapeWrapper').fadeIn(1000);
                    $('.indicators').hide();
                    $('.benefitsNav').fadeIn(1000);
                }
                
                // When we scroll from 4th to 3rd frame the benefits navis being hidden, the intro indicators are shown, ellipse shape gets out the portal and is being positioned in the frame
                if (index == 4 && direction =='up') {
                    $('.morphSvgWrapper').animate({top: '0'}, 400);
                    $('.ellipseShape').animate({top: '0'}, 400);
                    $(".portal").fadeIn(200);
                    $('.benefits .shapeWrapper').fadeOut(800);
                    $('.indicators').fadeIn(400);
                    $('.benefitsNav').hide();
                }

                // When we scroll from 6th to 7th frame, the benefits nav is being hidden
                if (index == 6 && direction =='down') {
                    $('.benefitsNav').hide();
                }

                // When we scroll from 7th to 6th frame, the benefits nav is being shown
                if (index == 7 && direction =='up') {
                    $('.benefitsNav').fadeIn(1000);
                }

                // Speed control when we scroll to footer
                if (index == 7 && direction =='down') {
                    $.fn.fullpage.setScrollingSpeed(500);
                }
            },

            // Benefits nav control
            afterRender: function() {
                activateNavItem($('.benefitsNav').find('li').eq($('.section.active').index()))
            }
        }); 

        // Scrolling frame to benefits nav section 
        $('.navItem').click(function() {
            var destination = $(this).closest('li');
            $.fn.fullpage.moveTo(destination.index() + 1);
        });

        // Activate benefits nav item
        function activateNavItem(item) {
            item.addClass('active').siblings().removeClass('active');
        }
    };
    window.currentWidth = newWidth;
});
