(function($) {

    window.app = {
        checkEmail: {
            check: function(which) {

                if ($(which).val() != "") {
                    var str=$(which).val();
                    var at="@";
                    var dot=".";
                    var lat=str.indexOf(at);
                    var lstr=str.length;
                    var ldot=str.indexOf(dot);

                    if (str.indexOf(at)==-1){
                       return false;
                    }

                    if (str.indexOf(at)==-1 || str.indexOf(at)==0 || str.indexOf(at)==lstr){
                       return false;
                    }

                    if (str.indexOf(dot)==-1 || str.indexOf(dot)==0 || str.indexOf(dot)==lstr){
                        return false;
                    }

                    if (str.indexOf(at,(lat+1))!=-1){
                        return false;
                    }

                    if (str.substring(lat-1,lat)==dot || str.substring(lat+1,lat+2)==dot){
                        return false;
                    }

                    if (str.indexOf(dot,(lat+2))==-1){
                        return false;
                    }

                    if (str.indexOf(" ")!=-1){
                        return false;
                    }

                    return true;
                }

                else {
                    return false;
                }
            }
        }
    }

    window.galleries = {

        init: function() {

            window.galleries.plugin_tweaks.init();
            window.galleries.device.init();
            window.galleries.layout.init();
            window.galleries.scroll_sections.init();
            window.galleries.navigation.init();
            window.galleries.responsive.init();
            window.galleries.lists.init();
            window.galleries.slideshow.init();
            window.galleries.artworks.init();
            window.galleries.image_gallery.init();
            window.galleries.artist_list_slideshow.init();
            window.galleries.cover_page_slideshow.init();
            window.galleries.slide_brightness.init();
            window.galleries.artist_list_preview.init();
            window.galleries.artist_list_columns.init();
            window.galleries.image_popup.init();
            window.galleries.publications.init();
            window.galleries.quicksearch.init();
            window.galleries.artist.init();
            //window.galleries.contact_form.init();
            window.galleries.contact_form_popup.init();
            window.galleries.mailinglist_signup_form_popup.init();
            window.galleries.mailing_list_form.init();
            window.galleries.google_map_popup.init();
            window.galleries.homepage_splash.init();
            window.galleries.pageload.init();
            window.galleries.parallax.init();
            window.galleries.prevent_user_image_save.init();
            window.galleries.cookie_notification.init();
            window.galleries.share_widget.init();

            // Fix for IE6-7 image link problem..
            // Image links in record lists are unclickable in IE6/7
            if (navigator.userAgent.indexOf('MSIE 7') > -1 || navigator.userAgent.indexOf('MSIE 6') > -1) {

                $('div.records_list a span.image img').click(function() {
                    var parent_a = $(this).parents('a');
                    if (!parent_a.hasClass('image_popup')) {
                        window.location.href = parent_a.attr('href');
                    }

                })

            }

        },


        sharing: {

            init: function() {
                window.modules.sharing.init();
            }

        },

        device: {

            init: function() {

                // Find out the current browser

                if ($.browser.name) {
                    var browserVersion = parseInt($.browser.version);
                    var browserName = $.browser.name;
                    if (browserVersion) {
                        $('body').addClass('browser-' + browserName);
                        $('body').addClass('browser-' + browserName + '-' + browserVersion);
                    }
                    if ($.browser.platform) {
                        $('body').addClass('platform-' + $.browser.platform);
                    }
                }

                // Find out if this is the Android default browser and add a class to the body
                // This is NOT a very good way of testing for this browser, but there does not seem to be a conclusive way to do it
                var nua = navigator.userAgent;
                var is_android_default_browser = ((nua.indexOf('Mozilla/5.0') > -1 && nua.indexOf('Android ') > -1 && nua.indexOf('AppleWebKit') > -1) && !(nua.indexOf('Chrome') > -1));
                if (is_android_default_browser) {
                    $('body').addClass('browser-android-internet');
                }

                // Find outo if this is a high res device and add a class to the body
                // This allows us to change graphics to high-res versions on compatible devices
                if (window.devicePixelRatio > 1) {
                    $('body').addClass('device-highres');
                }

                if (window.galleries.device.handheld()) {
                    $('body').addClass('device-handheld');
                } else {
                    $('body').addClass('device-desktop');
                }

            },

            handheld: function() {

                /* Detect mobile device */
                return (
                    //Uncomment to force for testing
                    //true ||

                    //Dev mode
                    (window.location.search.indexOf("?handheld=1") != -1) ||
                    //Detect iPhone
                    (navigator.platform.indexOf("iPhone") != -1) ||
                    //Detect iPod
                    (navigator.platform.indexOf("iPod") != -1) ||
                    //Detect iPad
                    (navigator.platform.indexOf("iPad") != -1) ||
                    //Detect Android
                    (navigator.userAgent.toLowerCase().indexOf("android") != -1) ||
                    //Detect Surface (ARM chip version e.g. low powered tablets) will also detect other windows tablets with the same chip
                    (navigator.userAgent.toLowerCase().indexOf("arm;") != -1 && navigator.userAgent.toLowerCase().indexOf("windows nt") != -1) ||
                    //Detect Opera Mini
                    (navigator.userAgent.toLowerCase().indexOf("opera mini") != -1) ||
                    //Detect Blackberry
                    (navigator.userAgent.toLowerCase().indexOf("blackberry") != -1) ||
                    //Detect webos
                    (navigator.userAgent.toLowerCase().indexOf("webos") != -1) ||
                    //Detect iemobile (old version of windows phone)
                    (navigator.userAgent.toLowerCase().indexOf("iemobile") != -1)
                );

            }

        },
        
        scroll_sections: {
            
            init: function() {
                $('.record-page-content-combined').each(function() {
                    var subnav = $(this).find('#sub_nav ul li a');
                    var sections = $(this).find('.scroll_section_container > section');
                    subnav.unbind('click.scroll_sections').bind('click.scroll_sections', function() {
                        $('body').addClass('window-forced-scroll-up');
	                    var this_type = $(this).attr('data-subsection-type');
	                    var related_item = sections.filter('[data-subsection-type="' + this_type + '"]');
	                    
	                    if (related_item.length) {
	                    	var direction = (related_item.offset().top > $(window).scrollTop() ? 'down' : 'up');
	                        if ($('#header').length > 0 && direction == 'up') {
	                        	var offset = 100;
	                            var offset = offset + $('#header').outerHeight();
	                        } else {
	                        	var offset = 40;
	                        }
                            if ($('#header.header_fixed').length > 0) {
                                var offset = offset + $('#header.header_fixed').outerHeight();
                            }
	                        if ($('#cms-frontend-toolbar-container').length > 0) {
	                            var offset = offset + $('#cms-frontend-toolbar-container').outerHeight();
	                        }
	                        var related_item_offset = related_item.offset().top - offset;
	                        var related_item_offset = (related_item_offset < 1 ? 0 : related_item_offset);
	                        $('html,body').animate(
	                            {scrollTop: related_item_offset},
	                            800,
	                            'easeInOutQuad',
	                            function() {
	                                $('body').delay(100).queue(function() {
	                                    $(this).removeClass('window-forced-scroll-up');
	                                    $(this).dequeue();
	                                });
	                            }
	                        );
	                    }
	                    return false;
                    });
                });
                    
            }  
        },


        layout: {

            init: function() {

                // Enable fitvids on embedded video
                if ($("#container").fitVids) {
                    $("#container").fitVids({ ignore: '.video_inline'});
                }

                //Depricated. Sites now use inline-block to center the nav
                if ($(window).width() >= 768) {
                    $('#top_nav.center').css('float', 'none');
                    window.galleries.layout.navigation_centered('#top_nav.center .topnav');
                }
                if ($('#header').hasClass('header_fixed')) {
                    window.galleries.layout.header_fixed();
                }
                if ($('.parallax-element').length && typeof $(window).parallax != 'undefined') {
                    $(window).parallax.setup();
                    $(window).trigger('scroll'); // Added by Dan H on 25/09/2018 to fix a pageload bug https://artlogic.monday.com/boards/117534001/pulses/114995279
                }
                
            },

            header_fixed: function() {

                $('body').addClass('layout-fixed-header');
                $(window).scroll(function() {
                    if ($(window).width() > 767) {
                         var is_active = $('#header').hasClass('page-scroll');
                         if ($(window).scrollTop() > 30 && !is_active) {
                             $('#header').addClass('page-scroll');
                         } else if ($(window).scrollTop() <= 30 && is_active) {
                             $('#header').removeClass('page-scroll');
                         } else {

                         }
                     } else {
                         $('#header').removeClass('page-scroll');
                     }
                 });

                 if ($('body').hasClass('site-type-template') && $('body').hasClass('layout-fixed-header') && $('body').hasClass('site-lib-version-1-0') && !$('body').hasClass('layout-hero-header') && ($('#header.header_fixed').css('position') == 'fixed' || $('#header.header_fixed').css('position') == 'absolute') && !$('#content #slideshow.fullscreen_slideshow').length) {
                     var minimum_margin = 30; // The minimum margin expected between the header and main content
                     var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                     var main_content_padding = parseInt($('#main_content').css('padding-top'));
                     if (header_height + minimum_margin > main_content_padding) {
                         $('#main_content').css('padding-top', header_height + minimum_margin + 'px');
                         $(window).bind("load", function() {
                             // If the header height has changed after the page 'load' event, update the main_content padding again
                             // e.g. the height may change after webfonts have properly loaded
                             if (($('#header').is(':visible') ? $('#header').outerHeight() : 0) != header_height) {
                                 var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                                 $('#main_content').css('padding-top', header_height + minimum_margin + 'px');
                             }
                         });
                     }
                 }

            },

            navigation_centered: function(element) {
                $(element).fadeTo(0, 0).css({'float': 'left', 'visibility': 'visible'});
                $(window).bind("load", function() {
                    $(element)
                        .css({
                            'width': $(element).width() + 2,
                            'margin': '0 auto',
                            'float': 'none'
                        })
                        .fadeTo(250, 1)
                    ;
                    $(element).css({'display': '', 'float': ''});
                });
            },

            content_follower: function(element, sticky_element) {
                var sticky_element = sticky_element && typeof sticky_element != 'undefined' ? sticky_element : false;

                /*  
                    Now uses css 'position:sticky' if supported. This may need to be applied to a *different* element
                    to the old js method. In which case, specify the original element first and the separate sticky_element for newer browsers.
                */
                if ($(element).length > 0){
                    
                    var supportsPositionSticky;
                    // Detect whether '@supports' CSS is supported, preventing errors in IE
                    var supports_supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);
                    if (supports_supportsCSS){
                        // Older Edge supports '@supports' but not position sticky
                        supportsPositionSticky = CSS.supports('position','sticky');
                        console.log('sticky supported');
                    } else {
                        //IE doesn't support '@supports' or 'object-fit', so we can consider them the same
                        supportsPositionSticky = false;
                    }


                    if (supportsPositionSticky || typeof supportsPositionSticky !== 'undefined') {

                        if (sticky_element) {
                            console.log('sticky added to sticky_element');
                            var $sticky = $(sticky_element);
                        } else {
                            console.log('sticky added to element');
                            var $sticky = $(element);
                        }

                        $sticky.addClass('content_follow_sticky');
                        var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        $sticky.css('top', header_height + 30);
                        
                        $(window).resize(function(){
                            console.log('re sticky');
                            var header_height = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                            $sticky.css('top', header_height + 30);
                        });

                    } else {

                        console.log('legacy content-follow');
                        var $scrolling_div = $(element);
                        // Older method
                        var offset = $scrolling_div.offset().top;
                        if ($('#header.header_fixed').length > 0) {
                            var offset = offset - $('#header.header_fixed').outerHeight();
                        }
                        if ($('#cms-frontend-toolbar-container').length > 0) {
                            var offset = offset - $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        $(window).scroll(function() {
                            var window_scroll_pos = $(window).scrollTop();
                            if(window_scroll_pos > offset) {
                                $scrolling_div.stop().animate({"marginTop": (window_scroll_pos - offset) + 10 + "px"}, "slow");
                            }
                            else if(window_scroll_pos == 0) {
                                $scrolling_div.stop().animate({"marginTop": (window_scroll_pos) + "px"}, "slow");
                            }
                        });
                    }

                }
            }


        },

        navigation: {

            init: function() {

                if ($('.navigation.navigation_expandable').size() > 0) {
                    window.galleries.navigation.expandable();
                }

            },

            expandable: function() {

                $('.navigation.navigation_expandable').each(function() {
                    var this_instance = $(this);
                    $('ul > li', this).each(function() {
                        if (false && $('.expandable_item_container ul li', this).size() == 1) {
                            $('> a', this).click(function() {
                                window.location.href = $(this).parent().find('.expandable_item_container ul li:eq(0) a').attr('href');
                                return false;
                            });
                        } else if ($('.expandable_item_container ul li', this).size() > 0) {
                            $('> a', this).click(function() {
                                $('.expandable_item_container', this_instance).slideUp();
                                $(this).parent().find('.expandable_item_container').slideDown();
                                return false;
                            });
                        }
                    });
                    $('ul li .expandable_item_container', this).each(function() {
                        if (!$(this).parent().hasClass('active')) {
                            $(this).hide();
                        }
                    });
                });

            }

        },

        responsive: {

            init: function() {
                if ($('body').hasClass('site-responsive')) {

                    window.galleries.responsive.navigation();
                    window.galleries.responsive.records_lists();

                }
            },

            navigation: function() {

                if ( $('body').hasClass('responsive-nav-slide-nav') ) {

                    if (!$('#responsive_slide_nav_wrapper').length) {
                        $('#header .navigation').wrapAll('<div id="responsive_slide_nav_wrapper"></div>');
                    }
                    if (!$('#slide_nav_reveal').length) {
                        $('<div id="slide_nav_reveal" tabindex="0" role="button">Menu</div>').appendTo('#header .inner');
                    }
                    
                    
                    // CUSTOM TIMING
                    var li_class_delay = 80;
                    
                    var custom_delay_attr = $('#responsive_slide_nav_wrapper').attr('data-nav-items-animation-delay');
                    if (typeof custom_delay_attr !== typeof undefined && custom_delay_attr !== false) {
                        if (custom_delay_attr){
                            li_class_delay = parseInt(custom_delay_attr);
                        }
                    }
                    
                    $('#top_nav_reveal, #slide_nav_reveal').click(function(e) {
                        
                        e.preventDefault();
                        
                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }
                        
                        if ($('body').hasClass('slide-nav-open')) {
                            $('body').removeClass('slide-nav-open');
                            setTimeout(function() {
                                $('body').removeClass('slide-nav-active');
                            }, 400);
                            $('#responsive_slide_nav_wrapper ul li, .header_social_links_mobile').removeClass('item-visible');
                            h.accessibility.on_popup_closing('#slide_nav_reveal');
                        } else {
                            $('body').addClass('slide-nav-active');
                            setTimeout(function() {
                                $('body').addClass('slide-nav-open');
                            }, 10);
                            h.accessibility.on_popup_opening('#responsive_slide_nav_wrapper', false, '#top_nav_reveal');
                            var delay = 0;
                            $('#responsive_slide_nav_wrapper ul li, .header_social_links_mobile').each(function() {
                                var $li = $(this);
                                setTimeout(function() {
                                    $li.addClass('item-visible');
                                }, delay += li_class_delay);
                            });
                        }
                    });
                    
                    // trigger above click function if the enter or space keys are pressed (for accessibility)
                    $('#slide_nav_reveal').keydown(function(event) {
                        var curElement = document.activeElement;
                        if ($(this)[0] === curElement && (event.keyCode === 13 || event.keyCode === 32)) {
                            event.preventDefault();
                            $(this).click();
                        }
                    });

                } else {

                    // Initialise the menu button

                    $('#top_nav_reveal').click(function() {
                        ///$('.parallax-mirror').animate({'margin-top': '300px'}, 300);
                        if ($('.topnav').css('display') == 'none') {
                            $('.topnav, #translations_nav, #header_quick_search').slideDown();
                            $('#header').addClass('responsive-nav-open');
                        } else {
                            $('.topnav, #translations_nav, #header_quick_search').slideUp(function() {
                                $(this).attr('style', '');
                            });
                            $('#header').removeClass('responsive-nav-open');
                        }
                        return false;
                    });


                } // end of if

            },

            records_lists: function() {

                $('.records_list').not('.columns_list').not('.tile_list').not('.reading_list').not('.records_list_noprocess').each(function() {
                    
                    if ($('> ul', this).length) {
                        // Remove extra ULs in lists, these are not responsive friendly
                        if ($('> ul', this).length > 1) {
                            $('> ul', this).replaceWith(function() {
                                return $(this).html();
                            });
                            $(this).wrapInner('<ul></ul>');
                        }

                        // Remove whitespace between list items (removes space between inline-block elements)
                        if ($('> ul > li', this).length > 1) {
                            $(this).html($(this).html().replace(/>\s+</g,'><'));
                        }

                        $(this).find('.records_list').each(function() {
                            // Run the same commands for any nested elements
                            if ($('> ul', this).length > 1) {
                                $('> ul', this).replaceWith(function() {
                                    return $(this).html();
                                });
                                $(this).wrapInner('<ul></ul>');
                            }
                            if ($('> ul > li', this).length > 1) {
                                $(this).html($(this).html().replace(/>\s+</g,'><'));
                            }
                        });

                        if ($('body.site-lib-version-1-0').length || !$('body[class*="site-lib-version"]').length) {
                            $('> ul > li', this).each(function() {
                                 $('.image', this).wrap('<span class="outer"></span>');
                                 $('.image', this).wrap('<span class="image_wrapper"></span>');
                                 $('.outer', this).prepend('<span class="fill"></span>');
                             });
                        }
                    }

                });

                $('.records_list.columns_list').each(function() {
                    // Remove whitespace between list items (removes space between inline-block elements)
                    $(this).html($(this).html().replace(/>\s+</g,'><'));
                });

                // Run the archimedes core init again, as removing spaces between elements will have removed any javascript events on the modified grid
                window.archimedes.archimedes_core.init();

                $(".records_list ul").each(function() {
                    var item_count = $( this ).children('li').length;
                    $(this).closest('.records_list').addClass('record-count-' + item_count);
                });

                window.galleries.responsive.dynamic_grid_image_size();
                $(window).resize(function() {
                    window.galleries.responsive.dynamic_grid_image_size();
                });

                window.galleries.responsive.tile_list_setup();
                var id;
                $(window).resize(function() {
                    clearTimeout(id);
                    id = setTimeout(resize_finished,400);
                });
                function resize_finished(){
                    window.galleries.responsive.tile_list_init();
                    window.galleries.responsive.tile_list_after_resize();
                }

            },

            tile_list_setup: function(context) {
                if (context && typeof context != 'undefined') {
                    var context = context;
                } else {
                    var context = 'body';
                }
                $('.records_list.tile_list', context).each(function() {
                    var original_html = $(this).html();
                    $(this).html('');
                    $(this).append('<div class="tile_list_formatted"></div>');
                    $(this).append('<div class="tile_list_original"></div>');
                    $('.tile_list_original', this).html(original_html).css('visibility', 'hidden');
                });
                window.galleries.responsive.tile_list_init();
            },

            tile_list_init: function() {
                $('.records_list.tile_list').each(function() {


                    if ($('.tile_list_original ul', this).length) {

                        // Check if the script has already been run before and set variables
                        if ($(this).hasClass('initialised')) {
                            init_rerun = true;
                            existing_formatted_list_column_count = $('.tile_list_formatted ul', this).length;
                        } else {
                            $(this).addClass('initialised');
                            init_rerun = false;
                        }

                        // Start initialising the new list

                        init_allowed = true;

                        $('.tile_list_original', this).removeClass('hidden');

                        tile_list_instance = $(this);
                        tile_list_width = $(this).width();
                        tile_list_column_width = Math.floor($('.tile_list_original ul', this)[0].getBoundingClientRect().width + parseInt($('.tile_list_original ul', this).css('margin-left')) + parseInt($('.tile_list_original ul', this).css('margin-right')));
                        var column_count = 3;
                        var column_count_calculated = Math.floor(tile_list_width / tile_list_column_width);
                        if (column_count_calculated < 7) {
                            var column_count = column_count_calculated;
                        }

                        if (init_rerun) {
                            // If the script is being run again, check if the column count is different to before. If not, stop the list from being rebuilt.
                            if (existing_formatted_list_column_count == column_count) {
                                init_allowed = false;
                            }
                        }

                        $('.tile_list_original', this).addClass('hidden');

                        if (init_allowed) {
                            var columns = {}
                            $.each(Array(column_count), function(index, value) {
                                columns[index] = {'height': 0, 'objects': []};
                            });

                            $('.tile_list_original li', this).each(function() {
                                if ($(this).attr('data-width') && $(this).attr('data-height')) {
                                    var height_to_width_factor = parseInt($(this).attr('data-width')) / tile_list_column_width;
                                    var relative_item_height = Math.ceil(parseInt($(this).attr('data-height')) / height_to_width_factor);
                                    lowest_height_index = 0;
                                    loop_current_lowest_height = columns[0]['height'];
                                    $.each(columns, function(index, value) {
                                        if ((value.height < loop_current_lowest_height)) {
                                            lowest_height_index = index;
                                            loop_current_lowest_height = value.height;
                                        }
                                    });
                                    columns[lowest_height_index]['height'] = columns[lowest_height_index]['height'] + relative_item_height;
                                    columns[lowest_height_index]['objects'].push($(this).clone().find('.video_inline').remove().end());
                                } else {
                                    console.log('Width and height of each image is required as a data attribute for this script work.');
                                }
                            });

                            $('.tile_list_formatted', tile_list_instance).html('');
                            $.each(columns, function(index, value) {
                                $('.tile_list_formatted', tile_list_instance).append('<ul></ul>');
                                $('.tile_list_formatted', tile_list_instance).find('ul:last-child').append(value.objects);
                            });
                            $('.tile_list_formatted', tile_list_instance).find('ul:last-child').addClass('last');
                            $('.tile_list_formatted', tile_list_instance).find('.video_inline').remove();
                            window.galleries.responsive.tile_list_after_init();
                        }
                    }

                    if ($(this).hasClass('scatter_list')) {
                        window.galleries.responsive.tile_list_scatter();
                    }
                });
            },

            tile_list_after_init: function() {
                
            },
            tile_list_after_resize: function() {
                
            },

            tile_list_scatter: function() {

                /* 
                    Scatter items are 'pulled' out of place to create a random effect.
                    The maximum they can deviate is the margin/padding of the column, this prevents them from touching.
                */
                var max_x_pull = ($('.tile_list_formatted ul').outerWidth(true) - $('.tile_list_formatted ul').outerWidth(false)) / 2;
                var min_x_pull = - max_x_pull;

                $('.tile_list_formatted ul').each(function() {
                    var $this = $(this);
                    var y_pull = window.galleries.responsive.tile_list_scatter_bounds((min_x_pull / 2),(max_x_pull * 2));
                    $this.css({
                        'padding-top': y_pull +'px'
                    });
                });

                $('.tile_list_formatted ul li').each(function() {
                    var $this = $(this);
                    var x_pull = window.galleries.responsive.tile_list_scatter_bounds(min_x_pull , max_x_pull);
                    $this.attr('data-x-pull',x_pull);
                    $this.css({
                        'transform':'translateX('+ x_pull +'px )',
                        'margin-bottom': max_x_pull * 2
                    });
                });

                if (!$('.tile_list').hasClass('scatter-list-initialised')){
                    window.setTimeout(function() {
                        $('.tile_list').addClass('scatter-list-initialised');
                    }, 1000);
                }

            },

            tile_list_scatter_bounds: function(min, max) {
                return Math.floor(Math.random() * (max - min + 1)) + min;
            },

            dynamic_grid_image_size: function() {

                if ($('body').hasClass('responsive-layout-forced-image-lists')) {
                    var selector_context = $('body.responsive-layout-forced-image-lists .records_list.image_list, body.responsive-layout-forced-image-lists .records_list.detail_list');
                    $(selector_context).each(function() {
                        $('li', this).each(function() {

                            // Save the original style as a data tag if it already has one
                            var image_span_el = $('.image > span', this);
                            if (typeof image_span_el.attr('data-style') !== typeof undefined && image_span_el.attr('data-style') !== false) {
                                var image_span_el_original_style = image_span_el.attr('data-style');
                            } else {
                                if (typeof image_span_el.attr('style') != typeof undefined && image_span_el.attr('style') != false) {
                                    var image_span_el_original_style = image_span_el.attr('style');
                                } else {
                                    var image_span_el_original_style = '';
                                }
                                image_span_el.attr('data-style', image_span_el_original_style);
                            }

                            // Add the dynamic heights for each image element if required
                            if ($('.fill', this).css('display') == 'block') {
                                var image_wrapper_height = $('.image_wrapper', this).height();
                                $('.image', this).attr('style', 'height:' + image_wrapper_height + 'px !important;');
                                $('.image > span', this).attr('style', 'height:' + image_wrapper_height + 'px !important;' + image_span_el_original_style);
                                $('.image span > img', this).attr('style', 'max-height:' + image_wrapper_height + 'px !important;');
                            } else if ($('.image, .image > span', this).attr('style')) {
                                if ($('.image, .image > span', this).attr('style').indexOf('height') > -1) {
                                    $('.image', this).attr('style', '');
                                    $('.image > span', this).attr('style', image_span_el_original_style);
                                }
                                $('.image img', this).attr('style', '');
                            }
                        });
                    });
                }

            },
            
        },

        lists: {

            init: function() {
                window.galleries.lists.ajax.init();
                window.galleries.lists.ajax.rewrite_links();
                window.galleries.lists.cleanup_whitespace.init();
                window.galleries.lists.css_image_cropping.init();
            },

            cleanup_whitespace: {
                init: function() {
                    $('.remove_html_whitespace').each(function() {
                        $(this).html($(this).html().replace(/>\s+</g,'><'));
                    });
                }
            },

            ajax: {

                init: function() {

                    ajax_list_loopcount = 0;
                    $('.records_list_ajax').each(function() {
                        if ($('ul li > a', this).size() > 0) {

                            ajax_list_loopcount = ajax_list_loopcount + 1;
                            $(this).attr('data-relative', String(ajax_list_loopcount));

                            var ajax_preview_area = '<div class="records_list_preview" data-relative="' + String(ajax_list_loopcount) + '"><div class="loader_simple">Loading</div><div class="ajax_content"></div></div>';

                            if ($(this).closest('.records_list_ajax').attr('data-ajax-preview-position') == 'top') {
                                $(this).before(ajax_preview_area);
                            } else {
                                $(this).after(ajax_preview_area);
                            }

                            if ($(this).attr('data-ajax-list-type') == 'hover') {
                                $('ul li > a', this).each(function() {
                                    var instance = $(this).closest('li');
                                    $(this)
                                        .mouseover(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                            $(this).closest('.records_list_ajax').animate({'min-height': 0}, 300, function() {
                                                window.galleries.lists.ajax.load(instance, '', true);
                                            });
                                            return false;
                                        })
                                        .mouseout(function() {
                                            $(this).closest('.records_list_ajax').stop().clearQueue();
                                        })
                                    ;
                                });
                            } else {
                                $('ul li > a', this).each(function() {
                                    $(this).addClass('ajax_link').click(function() {
                                        window.galleries.lists.ajax.load($(this).closest('li'));
                                        return false;
                                    });
                                });
                            }

                            if (window.location.hash && window.location.hash != '#' && window.location.hash != '#'+window.location.pathname && window.location.hash != '#undefined') {
                                var this_hash = window.location.hash.split('#')[1];
                                if (this_hash != window.location.pathname) {
                                    window.galleries.lists.ajax.load([], this_hash, false);
                                }
                            } else {
                                $('li:eq(0) > a', this).each(function() {
                                    // Display the first one by default
                                    window.galleries.lists.ajax.load($(this).closest('li'), '', true);
                                });
                            }

                        }
                    });

                },

                load: function(instance, url, background_load, no_scroll) {

                    if (!$(instance).closest('li').hasClass('active') || url) {

                        if ($(instance).length) {
                            var url_method = $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') && typeof $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') != 'undefined' ? $(instance).closest('.records_list_ajax').attr('data-ajax-list-url-type') : 'hash';
                        }
                        
                        if (url) {
                            url = url;
                            var preview_area = $('.records_list_preview');
                        } else {
                            url = $('a', instance).attr('href');
                            $(instance).closest('.records_list_ajax').find('ul li').removeClass('active');
                            $(instance).addClass('active');
                            var preview_area = $('.records_list_preview[data-relative=' + $(instance).closest('.records_list_ajax').attr('data-relative') + ']');
                        }

                        if ($(preview_area).is(':visible')) {

                            // Position the preview area so it can be seen by the user
                            if ($(instance).size() > 0) {
                                var top_offset = $(window).scrollTop() - $(instance).closest('.records_list_ajax').offset().top + 140;
                                if (top_offset < 0) {
                                    var top_offset = 0;
                                }
                                $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                            }

                            $('.loader_simple', preview_area).show();
                            $('.ajax_content', preview_area).fadeTo(0, 0);

                            window.galleries.lists.ajax.before(instance, preview_area, url);

                            $.ajax({
                                url: url,
                                data: 'modal=1',
                                cache: false,
                                dataType: 'html',
                                success: function(data) {
                                    $('.loader_simple', preview_area).hide();
                                    $('.ajax_content', preview_area).html(data).fadeTo(500, 1);
                                    $('#content, #content_module, #sidebar', preview_area).each(function() {
                                        $(this).attr('id', $(this).attr('id') + '_ajax');
                                    });
                                    $('.navigation', preview_area).remove();

                                    if (!background_load) {
                                        if ($(preview_area).offset().top > $(window).scrollTop() + ($(window).height() / 1.5)) {
                                            // Scrolls to the preview area if it is out of view (e.g. responsive version)
                                            $('html,body').animate(
                                                {scrollTop: $(preview_area).offset().top + (-140)},
                                                800,
                                                'easeInOutQuad'
                                            );
                                        }
                                    }

                                    if (false) {
                                                        // Removed as we are now just showing the preview area relative to the user scroll, this is done above the ajax call
                                                        if (!background_load) {
                                                            if ($(instance).size() > 0) {
                                                                $('html,body').animate(
                                                                    {scrollTop: $(instance).offset().top + (-180)},
                                                                    800,
                                                                    'easeInOutQuad'
                                                                );
                                                            }
                                                        }
                                                        if ($(instance).size() > 0) {
                                                            var top_offset = $(instance).offset().top - $(instance).closest('.records_list_ajax').offset().top;
                                                            $('.records_list_preview').animate({'padding-top': top_offset}, 0, 'easeInOutQuint');
                                                        }
                                    }
                                    if (url_method == 'full_url') {
                                       history.pushState(null, null, url);
                                    } else {
                                        window.location.hash = url;
                                    }
                                    window.galleries.lists.ajax.after(instance, preview_area, url);
                                }
                            });
                        }
                    }

                },

                before: function(original_instance, preview_area, url) {

                },

                after: function(original_instance, preview_area, url) {

                },

                rewrite_links: function() {
                    if (window.core.ajax_sections_link_rewrite) {
                        var t;
                        for (var i = 0; i < window.core.ajax_sections_link_rewrite.length; i ++) {
                            t = '/' + window.core.ajax_sections_link_rewrite[i] + '/';
                            if (window.location.pathname.substring(0, t.length) != t) {
                                $("a[href^='" + t + "']").not("a[href='" + t + "']").not('.ajax_link').each(function() {
                                    var new_href = '' + t + '#' + $(this).attr('href');
                                    $(this).attr('href', new_href);
                                });
                            }
                        }
                    }
                }

            },
            
            css_image_cropping: {
                /*
                    Simple polyfill for image grids that use object-fit css for 'soft' cropping.
                    Mostly required for all versions of Internet Explorer and older versions of Edge.
                */
                init: function() {
                    
                    var polyfill_images = '.records_list ul li img';
                    var verbose = false;

                    if ($(polyfill_images).length){
                        if (verbose){
                            console.log('css_image_cropping -- grid imgs on page');
                        }
                        var objectfitcover_on_page = $(polyfill_images).filter(function() {
                            // If css cropping is being used, we pass a flag - a font-family on an impossible pseudo-element (invisible) from user_custom.css
                            return window.getComputedStyle($(this)[0], ':first-letter').getPropertyValue('font-family') == ('object-fit');
                        });

                        if (objectfitcover_on_page.length) {
                            if (verbose){
                                console.log('css_image_cropping -- object-fit used in grid, polyfill checking for support');
                            }
                            
                            var supportsObjectfit;
                            
                            // Detect whether '@supports' CSS is supported, preventing errors in IE
                            var supports_supportsCSS = !!((window.CSS && window.CSS.supports) || window.supportsCSS || false);

                            if (supports_supportsCSS){
                                // Older Edge supports '@supports' but not object-fit
                                supportsObjectfit = CSS.supports('object-fit','cover');
                            } else {
                                //IE doesn't support '@supports' or 'object-fit', so we can consider them the same
                                supportsObjectfit = false;
                            }

                            if (!supportsObjectfit || typeof supportsObjectfit == 'undefined') {
                               
                                if (verbose){
                                    console.log('css_image_cropping -- polyfill running');
                                }
                                $(polyfill_images).each(function() {
                                    var $img = $(this);
                                    var imageURL = $img.attr('src');
                                    if (window.getComputedStyle($img[0], ':first-letter').getPropertyValue('font-family') == 'object-fit' && imageURL) {
                                        var bg_positioning = '50% 50%';
                                        if ($img.css('object-position')) {
                                            var positioning = $img.css('object-position');
                                        }
                                        $img.parent().addClass('objectfit-fallback-bg').css({'background-image':'url('+imageURL+')','background-position':bg_positioning});
                                        $img.css('visibility','hidden');
                                        
                                        if (!$('body').hasClass('objectfit-polyfill-active')){
                                            $('body').addClass('objectfit-polyfill-active')
                                        }
                                    }
                                });
                            } else {
                                if (verbose){
                                    console.log('css_image_cropping -- polyfill not required, object-fit supported');
                                }
                            }
                        }
                    }
                },
            },
        },

        pageload: {

            init: function() {
                if ($('body.pageload-splash-active').length > 0) {
                    $.pageload({
                       'splash_screen_enabled': true,
                       'body_classes_to_retain': '',
                       'ajax_navigation_enabled': false, // $('body').hasClass('pageload-ajax-enabled') ? true :
                       'splash_screen_primary_preload_images_selector': '#home_splash .content',
                       'splash_screen_secondary_preload_images_selector': '#home_splash #home_splash_image_container',
                       'splash_screen_click_to_close': $('body').hasClass('pageload-splash-pause') ? true : false,
                       // 'development_mode': true, 
                       'content_area_selector': '#container',
                       'preload_images_selector': '#slideshow li img, .parallax-image .parallax-image-inner .image, .feature_list .image, .header, #sidebar .image, #detail-slideshow .image, .svg, .fullscreen_slideshow .image',
                       'splash_screen_delay_after_complete': 1500
                    });
                }
            }

        },

        homepage_splash: {

            init: function() {
                //
                //
                // DEPRICATED - we now use the splash screen built into the pageload function above. This code may still be used on old customised sites.
                //
                //
                if (false) {
                                            if ($('#content.homepage_splash_intro').length && $('body.section-home').length && !$('body').hasClass('splash-pageload-active') && !h.getCookie('jquery_pageload_recent_visit')) {
                                                var site_title = '';
                                                if ($('#logo a').text()) {
                                                    var site_title = $('#logo a').text();
                                                }
                                                var container_class = '';
                                                var container_style = '';
                                                var content_class = '';
                                                var content_style = '';
                                                if ($('#content').attr('data-splash-intro-image')) {
                                                    var container_class = 'background_image_exists';
                                                    var container_style = 'background-image:url(' + $('#content').attr('data-splash-intro-image') + ');';
                                                }
                                                if ($('#content').attr('data-splash-intro-background-color')) {
                                                    var container_style = container_style + 'background-color:' + $('#content').attr('data-splash-intro-background-color') + ';';
                                                }
                                                if ($('#content').attr('data-splash-intro-text-color')) {
                                                    var content_style = content_style + 'color:' + $('#content').attr('data-splash-intro-text-color') + ';';
                                                }
                                                if ($('#content').attr('data-splash-intro-logo')) {
                                                    var content_class = 'logo_image_exists';
                                                    var content_style = content_style + 'background-image:url(' + $('#content').attr('data-splash-intro-logo') + ');';
                                                    if ($('#content').attr('data-splash-intro-logo-width')) {
                                                        var content_style = content_style + 'background-size:' + $('#content').attr('data-splash-intro-logo-width') + ' auto;';
                                                    }
                                                    if ($('#content').attr('data-splash-intro-logo-height')) {
                                                        var content_style = content_style + 'min-height:' + $('#content').attr('data-splash-intro-logo-height') + ' !important;';
                                                    }
                                                }
                                                $('#container').append('<div id="home_splash" class="' + container_class + '" style="opacity:0;' + container_style + '"><div class="inner"><div class="content ' + content_class + '" style="' + content_style + '">' + site_title + '</div></div></div>');
                                                $('#home_splash').fadeTo(400, 1);
                                                $('#home_splash').click(function() {
                                                    $('body').removeClass('splash-page-active');
                                                    $(this).clearQueue().fadeOut(400);
                                                });
                                                $('#home_splash').show(0, function() {
                                                    $(this).addClass('active');
                                                }).delay(2000).queue(function() {
                                                    $('body').removeClass('splash-page-active');
                                                }).dequeue().fadeOut(1500,function() {

                                                    $(this).removeClass('active');
                                                });
                                            }
                    }
            }

        },

        slideshow: {

            init: function() {

                if (window.galleries.device.handheld()) {
                    $('.hero-parallax-element').removeClass('hero-parallax-element');
                }

                $('#slideshow ul, #mirror-slideshow ul').each(function() {
                    
                    $(this).find('.cycle-sentinel').remove();

                    if (!$(this).hasClass('hero-parallax-element')) {
                        var autoHeight = 'calc';
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-autoheight-setting'))  {
                            var autoHeight = $("#slideshow").attr('data-cycle-autoheight-setting');
                        }

                        var slideshowtimeout = 5500;
                        // if ($("#slideshow, #mirror-slideshow").attr('data-cycle-timeout-setting'))  {
                        if ($("#slideshow").attr('data-cycle-timeout-setting'))  {
                            var slideshowtimeout = parseInt($("#slideshow").attr('data-cycle-timeout-setting'));
                        }

                        var newsettings;
                        if ($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'))  {
                            var newsettings = $.parseJSON($("#slideshow, #mirror-slideshow").attr('data-cycle-custom-settings'));
                        }
                        
                        window.galleries.slideshow.video_content($(this));

                        var mastersettings = {
                            fx:     'fade',
                            speed:    1200,
                            timeout:  slideshowtimeout,
                            pause:   0,
                            slides: '>',
                            autoHeight: autoHeight,
                            swipe: true
                        }

                        for (var newkey in newsettings) {
                            mastersettings[newkey] = newsettings[newkey];
                        }

                        var onfunction = $('#slideshow').on;
                        
                        if (onfunction) {
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-post-initialize', function(event, optionHash) {
                                var first_slide = $('>', this).not('.cycle-sentinel').filter(':eq(0)');
                                if (first_slide.find('.slide_video').length) {
                                    var plyr_loopcount = parseInt(first_slide.attr('data-plyr-index')) - 1;
                                    plyr_video_players[plyr_loopcount].play();
                                }
                                
                                // Slideshow pagination controls
                                if($('.fullscreen-slideshow-pagination-controls').length) {
                                    $('.fullscreen-slideshow-pagination-controls .btn-next').on('click', function() {
                                        $('#slideshow ul, #mirror-slideshow ul').cycle('next');
                                    });
                                    
                                    $('.fullscreen-slideshow-pagination-controls .btn-prev').on('click', function() {
                                        $('#slideshow ul, #mirror-slideshow ul').cycle('prev');
                                    });
                                }
                                
                                if ($('.slideshow_pager').length){
                                    $('.slideshow_pager').each(function() {
                                        var pager = $(this);
                                        pager.find('.slideshow-dot-wrapper:nth-child(1)').addClass('active');
                                        
                                        pager.find('.slideshow-dot-wrapper').each(function() {
                                            var dotwrapper = $(this);
                                            dotwrapper.click(function() {
                                                var paged_slideshow = dotwrapper.closest('.paged-slideshow-wrapper').find('ul');
                                                $(paged_slideshow).cycle(parseInt(dotwrapper.attr('data-rel')));
                                                pager.find('.slideshow-dot-wrapper').removeClass('active');
                                                dotwrapper.addClass('active');
                                                $(paged_slideshow).cycle('pause');
                                            });
                                        });
                                    });
                
                
                                }
                                
                                window.galleries.slideshow.initialized(event, optionHash);
                            });
                            // Function fired directly before the slide has changed
                            $('#slideshow ul, #mirror-slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($(outgoingSlideEl).find('.slide_video').length) {
                                    var plyr_loopcount = parseInt($(outgoingSlideEl).attr('data-plyr-index')) - 1;
                                    setTimeout(function() {
                                        plyr_video_players[plyr_loopcount].pause();
                                    }, 1000);
                                }
                                if ($(incomingSlideEl).find('.slide_video').length) {
                                    var plyr_loopcount = parseInt($(incomingSlideEl).attr('data-plyr-index')) - 1;
                                    plyr_video_players[plyr_loopcount].play();
                                }
                                
                                $('.slideshow-dot-wrapper.active').removeClass('active');
                                var next_dot = (optionHash.nextSlide).toString();
                                $('.slideshow-dot-wrapper[data-rel='+next_dot+']').addClass('active');
                                
                                window.galleries.slideshow.after(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
                            });
                        }

                        $('#slideshow ul, #mirror-slideshow ul').cycle(mastersettings);

                        $('#slideshow.paused, #mirror-slideshow.paused')
                            .each(function () {
                                pausePlay();
                            })
                        ;
                    }

                    window.galleries.slideshow.homepage_slideshow.init();
                });
            },

            initialized: function(event, optionHash) {
                
            },

            after: function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

            },
            
            video_content: function(instance) {
                plyr_loopcount = 0;
                $('.slide_has_video', instance).each(function () {
                    plyr_loopcount = parseInt(parseInt(plyr_loopcount) + parseInt(1));
                    $(this).attr('data-plyr-index', plyr_loopcount);
                    plyr_video_players = Plyr.setup('.slide_video', { 
                        captions: { 
                            active: true
                        },
                        muted: true,
                        loop: { active: true },
                        controls: [] //controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'] //['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'captions', 'settings', 'pip', 'airplay', 'fullscreen']
                    });
                    
                });  
            },

            homepage_slideshow: {

                init: function() {

                    if ($('#content #slideshow.fullscreen_slideshow').length) {
                        var header_size = ($('#header:not(.header_transparent)').is(':visible') ? $('#header').outerHeight() : 0);
                        if (!$('.parallax-mirror #slideshow').length && header_size > 0) {
                            $('#slideshow.fullscreen_slideshow').css('top', header_size);

                            $(window).bind("load", function() {
                                // If the header height has changed after the page 'load' event, update the main_content padding again
                                // e.g. the height may change after webfonts have properly loaded
                                var header_size = $('#header').outerHeight();
                                if (parseInt($('#slideshow.fullscreen_slideshow').css('top')) > header_size) {
                                    $('#slideshow.fullscreen_slideshow').css('top', header_size);
                                    window.galleries.slideshow.homepage_slideshow.process();
                                }
                            });
                        }
                        $('body').addClass('type-fullscreen');
                        window.galleries.slideshow.homepage_slideshow.process();
                        $(window).resize(function() {
                            window.galleries.slideshow.homepage_slideshow.process();
                        });

                        if ($('#content #slideshow.fullscreen_slideshow').hasClass('fullscreen_video')) {
                            var isMobile = window.galleries.device.handheld();
                            if (!isMobile) {
                                var videobackground_muted = false
                                if ($('#slideshow .fullscreen_slideshow_video').attr('data-muted') == "True"){
                                    videobackground_muted = true
                                }
                                var videobackground = new $.backgroundVideo($('#slideshow .fullscreen_slideshow_video'), {
                                    "align": "centerX",
                                    "width": 1920,
                                    "height": 1080,
                                    "path": "",
                                    "filename": $('#slideshow .fullscreen_slideshow_video').attr('data-video'),
                                    "container": "#slideshow .fullscreen_slideshow_video",
                                    "muted": videobackground_muted
                                    //"types": ["mp4","webm"]
                                });
                                if ($.browser.safari) {
                                    $('#video_background').get(0).play();
                                }
                            }
                        }
                    }
                },

                process: function() {

                    if ($('#slideshow.fullscreen_slideshow:not(.ignore-padding-top-js)').length) {
                        var cms_toolbar_height = 0;
                        if ($('#cms-frontend-toolbar-container').length) {
                            var cms_toolbar_height = $('#cms-frontend-toolbar-container').outerHeight();
                        }
                        // var header_offset = ($('#header').is(':visible') ? $('#header').outerHeight() : 0);
                        // if ($('#header').css('position') == 'fixed' || $('#header').css('position') == 'absolute') {
                        //     var header_offset = 0;
                        // }
                        var slideshow_offset_top = parseInt($('#content #slideshow.fullscreen_slideshow').offset().top);
                        var slideshow_height = $(window).height() - ($('#header').is(':visible') ? slideshow_offset_top : 0);
                        $('#content #slideshow.fullscreen_slideshow').height(slideshow_height);
                        $('#main_content').css('padding-top', $('#content #slideshow.fullscreen_slideshow').outerHeight(true) + slideshow_offset_top - cms_toolbar_height);
                        if (!window.galleries.device.handheld()) {
                            $('.fullscreen_slideshow_parallax').each(function() {
                                //$(this).parallax({imageSrc: $(this).attr('data-image-src')});
                            });
                        }
                    }

                }

            }

        },
        cover_page_slideshow: {

            init: function() {

                $('#cover_page_slideshow').each(function() {
                    
                    var cycleSpeed = 1200;
                    if ($('#cover_page_slideshow').attr('data-cycle-speed-setting'))  {
                        var cycleSpeed = $("#cover_page_slideshow").attr('data-cycle-speed-setting');
                    }

                    var cycleFx = 'fade';
                    if ($('#cover_page_slideshow').attr('data-cycle-fx-setting'))  {
                        var cycleFx = $("#cover_page_slideshow").attr('data-cycle-fx-setting');
                    }

                    var startingSlide = 0;
                    if ($('#cover_page_slideshow .item.item_starting_slide').length) {
                        var startingSlide = $('#cover_page_slideshow .item.item_starting_slide').index();
                    }

                    var slideshowtimeout = 6000;
                    if ($("#cover_page_slideshow").attr('data-cycle-timeout-setting'))  {
                        var slideshowtimeout = parseInt($("#cover_page_slideshow").attr('data-cycle-timeout-setting'));
                    }

                    $('body').addClass('type-cover-page type-fullscreen');
                    
                    var newsettings;
                        if ($("#cover_page_slideshow").attr('data-cycle-custom-settings'))  {
                            var newsettings = $.parseJSON($("#cover_page_slideshow").attr('data-cycle-custom-settings'));
                        }

                    var mastersettings = {
                        fx:       cycleFx,
                        //loader: 'wait',
                        speed:    cycleSpeed,
                        timeout:  slideshowtimeout,
                        pause:    0,
                        slides: '.item',
                        //autoHeight: 'calc',
                        autoHeight: false,
                        swipe: true,
                        startingSlide: startingSlide
                    }

                    for (var newkey in newsettings) {
                        mastersettings[newkey] = newsettings[newkey];
                    }
                    
                    $('#cover_page_slideshow ul').cycle(mastersettings);
                        
                    window.galleries.cover_page_slideshow.cover_page_pager();
                    window.galleries.cover_page_slideshow.cover_page_caption();
                });

            },
            cover_page_pager: function() {
                var $pager = $('#cover_page_slideshow_number');
                var onfunction = $('#cover_page_slideshow').on;
                if (onfunction) {
                    $('#cover_page_slideshow').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        var next_number = (optionHash.nextSlide + 1).toString();
                        $pager.find('.pager-number-current').text(next_number);
                    });
                }
                $('#cover_page_slideshow_button_prev').click(function() {
                    $('#cover_page_slideshow ul').cycle('pause');
                    $('#cover_page_slideshow ul').cycle('prev');
                });
                $('#cover_page_slideshow_button_next').click(function() {
                    $('#cover_page_slideshow ul').cycle('pause');
                    $('#cover_page_slideshow ul').cycle('next');
                });
            },
            cover_page_caption: function() {
              
                var $caption = $('#cover_page_slideshow_pager');
                var onfunction = $('#cover_page_slideshow').on;
                if (onfunction) {
                    $('#cover_page_slideshow').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        var this_instance = $caption.closest('#cover_page_slideshow_container').find('#cover_page_slideshow ul');
                        var this_caption = ($(incomingSlideEl, this_instance).attr('data-rel') && typeof $(incomingSlideEl, this_instance).attr('data-rel') != 'undefined' ? $(incomingSlideEl, this_instance).attr('data-rel') : $(incomingSlideEl, this_instance).attr('rel'));
                        if (this_caption && typeof this_caption != 'undefined') {
                            var this_caption = this_caption.replace(/\n/g,'');
                        }
                        $('#cover_page_slideshow_caption .content').html(this_caption);
                    });

                }
            }
        },

        slide_brightness: {

            init: function() {

                if ($("#logo").hasClass('auto_brightness_disabled')){

                    if ($("#logo").attr('data-logo-image-variant-light') && typeof $("#logo").attr('data-logo-image-variant-light') !== 'undefined') {
                        var logo = document.getElementById("#logo");
                        var logo_image_url = $("#logo").attr('data-logo-image-variant-light');
                        logo.pseudoStyle("after","background-image",logo_image_url);
                    }
                }

                var $slideshow_selector = $('#slideshow.fullscreen_slideshow.detect-slide-brightness ul, #cover_page_slideshow.detect-slide-brightness ul');
                var $addclass_element = $('body');
                
                $slideshow_selector.each(function() {
                    var $slideshow = $(this);
                    $slideshow.find('li').each(function() {
                        var $slide = $(this),
                            $image = $slide.find('.image');
                        if ($image.css('background-image') != 'none') {
                            $slide.addClass('fullscreen-slide-brightness-detected');
                            var bg_image = $image.css('background-image');
                            var image_src = bg_image.replace('url(','').replace(')','').replace(/\"/gi, "");

                            window.galleries.slide_brightness.image_brightness(image_src,function(lightordark) {
                                $slide.addClass('fullscreen-slide-image-'+lightordark);
                                if ($slide.hasClass('cycle-slide-active')){
                                    window.galleries.slide_brightness.slide_brightness_change_class($slide,$addclass_element);
                                }
                            });
                        }
                    });
                    window.galleries.slideshow.after = function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                        window.galleries.slide_brightness.slide_brightness_change_class(incomingSlideEl,$addclass_element);
                    }
                    var onfunction = $slideshow_selector.on;
                    if (onfunction) {
                        $slideshow_selector.on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            window.galleries.slide_brightness.slide_brightness_change_class(incomingSlideEl,$addclass_element);
                        });
                    }
                });

            },

            image_brightness: function detect(imageSrc, callback) {
                
                console.log(imageSrc);
                var fuzzy = 0.2;
                var img = document.createElement("img");
                img.crossOrigin = "Anonymous";
                img.src = imageSrc;
                img.style.display = "none";
                document.body.appendChild(img);

                img.onload = function() {
                    // create canvas
                    var canvas = document.createElement("canvas");
                    //create it at a third of the size
                    canvas.width = this.width;
                    canvas.height = this.height;

                    //brightness of the channel as is done in the HSV color space
                    var ctx = canvas.getContext("2d");
                    ctx.drawImage(this,0,0);
                    var imageData = ctx.getImageData(0,0,canvas.width,canvas.height);
                    var data = imageData.data;
                    var r,g,b, max_rgb;
                    var light = 0, dark = 0;

                    for(var x = 0, len = data.length; x < len; x+=4) {
                        r = data[x];
                        g = data[x+1];
                        b = data[x+2];
                        max_rgb = Math.max(Math.max(r, g), b);
                        /*if (max_rgb < 128) {*/
                        ///console.log(max_rgb);
                        if (max_rgb < 195) {
                            dark++;
                        } else {
                            light++;
                        }
                    }
                    var dl_diff = ((light - dark) / (this.width*this.height));
                    if (dl_diff + fuzzy < 0) {
                        callback('dark');
                    } else {
                        callback('light');
                    }
                }
            },

            slide_brightness_change_class: function (slide,$addclass_element){
                
                var $slide = $(slide);
                
                $addclass_element.removeClass('fullscreen-slide-light fullscreen-slide-dark');

                if ($slide.hasClass('fullscreen-slide-brightness-detected')){
                    if ($slide.hasClass('fullscreen-slide-image-dark')){
                        $addclass_element.addClass('fullscreen-slide-dark');
                    } else if ($slide.hasClass('fullscreen-slide-image-light')){
                        $addclass_element.addClass('fullscreen-slide-light');
                    }
                }
                setTimeout(function () {
                    if (! $addclass_element.hasClass('fullscreen-slide-brightness-transition')){
                        $addclass_element.addClass('fullscreen-slide-brightness-transition');
                    }
                }, 500);
                
            }
        },
        
        artist_list_preview: {

            init: function() {
                if (h.element_exists('#list_preview_slideshow') && !$('#list_preview_slideshow').hasClass('no-slideshow')) {

                    var selector = $("#list_preview_slideshow >").not('.cycle-sentinel');
                    var random_slide_index = Math.floor(Math.random() * selector.length);

                    if ($('#list_preview_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#list_preview_slideshow', '#sidebar');
                    }

                    var params = {
                        fx:     'fade',
                        speed:    400,
                        timeout:  4500,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {

                        },
                        after: function(cSlide, nSlide, options) {

                        },
                        slides: '>',
                        startingSlide: parseInt(random_slide_index),
                        autoHeight: 'calc'
                    };


                    //if($.browser.safari){
                    //    params["loader"] = "wait";
                    //}

                    $('#list_preview_slideshow').cycle(params);

                    if (!window.galleries.device.handheld()) {
                        $('#list_preview_navigation a').mouseover(function () {
                            if ($('#list_preview_slideshow').is(':visible')) {
                                $('#list_preview_slideshow').cycle('pause');
                                $('#list_preview_slideshow').cycle(parseInt($(this).attr('data-index')) - 1);
                                return false;
                            }
                        });
                    }
                    
                    window.galleries.artist_list_preview.sidebar_height();
                    
                    $(window).resize(function(){
                        window.galleries.artist_list_preview.sidebar_height();
                    });
                    
                }
            },
            sidebar_height: function(){
                var img_height = 0;
                $( window ).load( function() {
                   img_height = $("#sidebar .cycle-sentinel").height();
                   $('#sidebar').height(img_height);
                });
            },
            
        },
        artist_list_columns: {

            init: function() {
                
                
                if ($('.artists_list_dynamic_columns').length) {
                    
                    $('.artists_list_dynamic_columns .artist_list_section_wrapper').each(function(i) {

                        var $this = $(this);
                        var instance_number = (i + 1).toString();
                        var list_original_id = '#artists_list_original_wrapper_' + instance_number;
                        var list_formatted_id = '#artists_list_formatted_wrapper_' + instance_number;
                        
                        /*
                            1.  Format the column widths correctly. It takes the desktop column width as an 'ideal' size, and tries to maintain that as the
                                browser scales down. As each column becomes too small, the number of columns reduces.
                            
                            2.  Distributes the items into each column correctly. The items flow downwards then are broken into the next column. E.g 15 items / 5 column grid:
                                A   D   G   J   M
                                B   E   H   K   N
                                C   F   I   L   O
                                
                                --------------------------------------------------------
                            
                                E.g. 17 items / 5 column grid
                                
                                DISTRIBUTION METHOD A:
                                The script works out how to fill the columns as evenly as possible, then works out which columns should have more items.
                                Visually appears a bit like inline-block flowing (horizontal), although the items still actually flow vertically:
                                
                                A   D   G   J   M
                                B   E   H   K   N
                                C   F   I   L   O
                                P   Q
                                
                                
                                DISTRIBUTION METHOD B:
                                
                                A   E   I   M   Q
                                B   F   J   N
                                C   G   K   O
                                D   H   L   P
                        */

                        //Take the lists and break them into a hidden original list and container for our reformatted version.
                        $this.append('<div id="'+list_original_id.substring(1)+'" class="artists-list-original-wrapper">' + $this.html() + '</div>');
                        $this.children('ul').remove();
                        $this.append('<div id="'+list_formatted_id.substring(1)+'" class="artists-list-formatted-wrapper clearwithin"></div>');


                        // Ideal column width is influenced by the font size to ensure bunching of columns does not occur.
                        var ideal_column_width = 220;
                        var font_size = parseInt($('.artists-list-original-wrapper h2').css('font-size'));
                        ideal_column_width = ideal_column_width * (font_size / 13);

                        $(window).resize(function() {
                            
                            $(list_original_id).show();
                            $(list_formatted_id).html('');
                            
                            var columns;
                            var column_fill_method = 'a'; //OPTIONS A or B... EXPLAINED ABOVE
                            var container_width = parseInt($this.width());
                            
                            //How many desired columns fit within the container (at desktop size).
                            var initially_set_columns = Math.floor(container_width + 20) / $(list_original_id+' > ul').outerWidth();
                            
                            //How many columns actually fit within the container at the *current* viewport size.
                            var columns_that_fit = Math.floor(container_width / ideal_column_width);

                            //If we can use our desired amount, great - otherwise fit as many as possible in this viewport.
                            if (initially_set_columns >= columns_that_fit) {
                                columns = columns_that_fit;
                            } else {
                                columns = initially_set_columns;
                            }
                            
                            var column_width = 1 / columns * 100;
                            var total_items = $(list_original_id).find('li').length;
                            
                            
                            if (column_fill_method == 'a') {
                                /*
                                    DISTRIBUTION METHOD A:
                                    
                                    A   D   G   J   M
                                    B   E   H   K   N
                                    C   F   I   L   O
                                    P   Q
                                    
                                */
                                //Work out how many items would 'evenly' fill up the columns
                                var evenly_filled_items_number = Math.floor(total_items / columns);

                                // How many extra items are we left with? These to be evenly distributed across columns.
                                remainder = total_items % columns;

                            } else {
                                
                                /*
                                    DISTRIBUTION METHOD B:
                                    
                                    A   E   I   M   Q
                                    B   F   J   N
                                    C   G   K   O
                                    D   H   L   P
                                    
                                */
                                var evenly_filled_items_number = Math.ceil(total_items / columns);
                                remainder = 0;
                            }

                            
                            var current_item_index = 0;
                            for (var i = 0; i < columns; i++) {
                                var extra_items_in_col = 0;
                                if (remainder > 0) {
                                    var extra_items_in_col = 1;
                                    remainder = remainder - 1;
                                }
                                // Create columns with correct distribution.
                                $(list_formatted_id).append('<ul class="dynamic-column"></ul>');
                                $(list_original_id).find('li').slice(current_item_index, current_item_index + evenly_filled_items_number + extra_items_in_col).each(function() {
                                    var this_li_html = $(this).clone().wrap('<div>').parent().html();
                                    $(list_formatted_id+' ul:last-child').append(this_li_html);
                                });
                                var current_item_index = current_item_index + evenly_filled_items_number + extra_items_in_col;
                            }
                            $(list_formatted_id+' ul').css('width',column_width + '%');
                            $(list_original_id).hide();
                            
                            window.galleries.artist_list_preview.init();
                            
                        }).trigger('resize');
                    });

                }
            }
        },
        artist_list_slideshow: {

            init: function() {
                if (h.element_exists('#artist_list_slideshow') && !$('#artist_list_slideshow').hasClass('no-slideshow')) {

                    if ($('#artist_list_slideshow').hasClass('content_follow')) {
                        window.galleries.layout.content_follower('#artist_list_slideshow', '#sidebar');
                    }

                    $('#artist_list_slideshow ul').cycle({
                        fx:     'fade',
                        speed:    400,
                        timeout:  7000,
                        pause:   0,
                        before: function(cSlide, nSlide, options) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        after: function(cSlide, nSlide, options) {
                            link_id = nSlide.id.replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        },
                        slides: '>',
                        autoHeight: 'calc'
                    });

                    var onfunction = $('#artist_list_slideshow ul').on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly before the slide changes
                        $('#artist_list_slideshow ul').on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            $('#artist_list_slideshow_nav a').removeClass('active');
                            link_id = $(incomingSlideEl).attr('id').replace('artist_list_slideshow_', 'artist_list_');
                            $('#artist_list_slideshow_nav #' + link_id).addClass('active');
                        });
                    }

                    if ($('#artist_list_slideshow.slideshow_pause').size() > 0) {
                        $('#artist_list_slideshow ul').cycle('pause');
                    }

                    $('#artist_list_slideshow_nav a').mouseover(function () {
                        if ($('#artist_list_slideshow').is(':visible')) {
                            $('#artist_list_slideshow ul').cycle('pause');
                            $('#artist_list_slideshow ul').cycle(parseInt($(this).attr('id').split('artist_list_item')[1] - 1));
                            return false;
                        }
                    });

                }
            }
        },

        artworks: {

            init: function() {
                if ($('#artwork_description2_reveal_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_reveal_button();
                }
                if ($('#artwork_description2_hide_button').size() > 0) {
                    window.galleries.artworks.artwork_description2_hide_button();
                }
                if ($('#artist_list.artist_image_on_hover').size() > 0) {
                    window.galleries.artworks.artist_list_artist_image_on_hover();
                }
            },

            artwork_description2_reveal_button: function() {
                $('#artwork_description2_reveal_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideUp();
                    $(' #artwork_description2_hide_button').slideDown();
                    $('#artwork_description_2').slideDown();
                    $('#image_gallery').addClass('artwork_full_details_open');
                    return false;
                });
            },

            artwork_description2_hide_button: function() {
                $('#artwork_description2_hide_button').click(function() {
                    //$('#artwork_description').slideUp();
                    $(' #artwork_description2_hide_button').slideUp();
                    $(' #artwork_description2_reveal_button, #artwork_description_container').slideDown();
                    $('#artwork_description_2').slideUp();
                    $('#image_gallery').removeClass('artwork_full_details_open');
                    return false;
                });
            },

            artist_list_artist_image_on_hover: function() {
                $('#artist_list.artist_image_on_hover ul li a img')
                    .each(function() {
                        if (!$(this).closest('a').hasClass('no-hover')) {
                            $(this).mouseover(function() {
                                $(this).stop().clearQueue().fadeTo(300, 0.0001);
                            });
                            $(this).mouseout(function() {
                                $(this).fadeTo(500, 1);
                            });
                        }
                    })
                ;
            }

        },

        image_gallery: {

            init: function() {

                var first_load = true

                if (h.element_exists('.image_gallery_multiple') && h.element_exists('#secondary_image_thumbnails')) {
                    window.galleries.image_gallery.standard();
                }

                if (h.element_exists('#ig_slideshow')) {
                    window.galleries.image_gallery.dynamic();
                }

                if (h.element_exists('#ig_slider') || h.element_exists('.ig_slider')) {
                    window.galleries.image_gallery.slider.init();
                }

                if (h.element_exists('.detail_expand_grid') || h.element_exists('.detail_expand_grid')) {
                    window.galleries.image_gallery.detail_expand_grid.init();
                }

            },

            standard: function() {
                var overrideSettings;
                if ($('.image_gallery_multiple').attr('data-cycle-custom-settings'))  {
                    var overrideSettings = $.parseJSON($('.image_gallery_multiple').attr('data-cycle-custom-settings'));
                }

                var masterSettings = {
                    fx:       'fade',
                    speed:    600,
                    timeout:  12000,
                    paused:    true,
                    slides: '>',
                    autoHeight: 'calc',
                    swipe: true
                };

                for(var overrideSetting in overrideSettings) {
                    masterSettings[overrideSetting] = overrideSettings[overrideSetting];
                }

                $('.image_gallery_multiple').cycle(masterSettings);

                $('#secondary_image_thumbnails a')
                    .click(function() {
                        if ($(window).scrollTop() > $('.image_gallery_multiple').offset().top) {
                            $('html,body').animate(
                                {scrollTop: $('.image_gallery_multiple').offset().top + (-20)},
                                300,
                                'easeInOutQuad'
                            );
                        }
                        $('.image_gallery_multiple').cycle(parseInt($(this).attr('data-index')));
                        return false;
                    });
            },

            detail_expand_grid: {

                init: function() {
                    var selectors = '.detail_expand_grid';

                    $('li a', selectors).click(function() {
                        var wrapper = $(this).closest('li');
                        var hash = $(this).attr('href');
                        if (!$(wrapper).hasClass('active')) {
                            window.galleries.image_gallery.detail_expand_grid.load_work(wrapper, $(this).attr('href'));
                        }
                        return false;
                    });
                    var original_browser_width = $(window).width();
                    $(window).resize(function() {
                        if ($(window).width() != original_browser_width) {
                            $('.detail_expand_grid').each(function() {
                                if ($('.expander_detail', this).size() > 0) {
                                    $('.expander_detail', this).remove();
                                }
                                if ($('li', this).attr('style') && $('li', this).attr('style') != 'undefined') {
                                    $('li', this).removeClass('active').removeAttr('style');
                                }
                            });
                        }
                    });
                    $('> ul', selectors).addClass('loading');
                    $(window).bind("load", function() {
                        $('> ul', selectors).removeClass('loading');
                    });
                },

                load_work: function(wrapper, link) {

                    if ($(wrapper).closest('ul').hasClass('loading')) {

                        $(window).unbind("load.load_work_pre_click");
                        $(window).bind("load.load_work_pre_click", function() {
                            window.galleries.image_gallery.detail_expand_grid.load_work(wrapper, link);
                        });

                    } else {

                        $(wrapper).closest('ul').find('li').removeClass('active');
                        $(wrapper).addClass('active').addClass('loading');

                        if (typeof detail_expand_load_work_ajax_request != 'undefined') {
                            detail_expand_load_work_ajax_request.abort();
                        }

                        detail_expand_load_work_ajax_request = $.ajax({
                            url: link,
                            data: {'modal': '1'},
                            cache: false,
                            success: function(data) {

                                $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail').css('opacity', '0');
                                $(wrapper).append('<div class="expander_detail">' + data + '</div>');
                                window.galleries.contact_form_popup.init();
                                $(".expander_detail #image_container a, #secondary_image_thumbnails a").fancybox({
                                    'overlayShow': true,
                                    'overlayOpacity': 0.7,
                                    'overlayColor': '#d9d9d9',
                                    'imageScale': 'true',
                                    'zoomOpacity': 'true',
                                    prevEffect: 'fade',
                                    nextEffect: 'fade',
                                    closeEffect: 'fade',
                                    openEffect: 'fade',
                                    helpers : {
                                            title: {
                                                type: 'inside'
                                            }
                                        }
                                    });


                                $('.expander_detail', wrapper).waitForImages({
                                    finished: function() {
                                        window.setTimeout(function() {

                                            history.replaceState(null, null, link);
                                            //should clear on scroll - to be built

                                            window.galleries.contact_form_popup.init();
                                            window.galleries.sharing.init();
                                            
                                            window.galleries.image_popup.init();
                                            
                                            if (typeof addthis === 'undefined') { } else {
                                                addthis.toolbox('#social_sharing_links');
                                                addthis.update('share', 'url', $('#social_sharing_params').attr('data-url'));
                                                //addthis.url = $('#social_sharing_params').attr('data-url');

                                            }
                                            $(".expander_detail #content").each(function(){
                                                var id = $(this).attr('id')
                                                $(this).attr('id', 'ajax_' + id)
                                            });

                                            //change .image class to prevent dynamic grid sizing
                                            $(".expander_detail .image").each(function(){
                                                var base_class = $(this).attr('class')
                                                $(this).attr('class', 'ajax_' + base_class)
                                            });
                                            //scroll to show only half of clicked grid item
                                            var scroll_offset = $(wrapper).offset().top + ($(wrapper).height()/2 );
                                            if ($(window).width() <= 459) {
                                                var scroll_offset = $(wrapper).offset().top - 70;
                                            }
                                            var detail_above = $(wrapper).prevAll().find('.expander_detail');
                                            var existing_detail = $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail');

                                            // If there is already an expanded area above, work out the final scroll position once this area is removed
                                            if (detail_above.size() > 0 && detail_above.closest('li').offset().top != $(wrapper).offset().top) {
                                                var scroll_offset = scroll_offset - $(wrapper).prevAll().find('.expander_detail').height();
                                            }
                                            if (existing_detail.size() > 0 && existing_detail.closest('li').offset().top == $(wrapper).offset().top) {
                                                $(wrapper).addClass('no-animation');
                                            }

                                            $(wrapper).closest('ul').find('li').not(wrapper).find('.expander_detail').remove();

                                            var wrapper_height = $(wrapper).height();
                                            $(wrapper).closest('ul').find('li').css('height', wrapper_height);
                                            $(wrapper).css('height', $('#image_gallery', wrapper).outerHeight() + wrapper_height);

                                            $('.expander_detail,.expander_detail #content_module', wrapper).css({
                                                'height': $('.expander_detail #image_gallery', wrapper).outerHeight(),
                                                'opacity': '1'
                                            });
                                            $('.expander_detail #image_gallery', wrapper).append('<button class="close" aria-label="Close expanded detail view">Close</button>');
                                            $('.expander_detail .close', wrapper).click(function() {
                                                window.galleries.image_gallery.detail_expand_grid.close_work($(wrapper).closest('ul'));
                                                //remove listener which closes the detail using the escape key
                                                $(document).off('keydown.escKeyDown');
                                            });
                                            $('html,body').animate(
                                                {scrollTop: scroll_offset},
                                                400,
                                                'easeInOutQuad'
                                            );
                                            $(wrapper).removeClass('loading');
                                            $(wrapper).closest('ul').find('li').removeClass('no-animation');
                                            $('.expander_detail .ps_item a', wrapper).click(function(e) {
                                                e.preventDefault();
                                                if ($(this).hasClass('ps_next')) {
                                                    $(this).closest('.detail_expand_grid').find('ul li.active').next('li').find('a').trigger('click');
                                                } else if ($(this).hasClass('ps_previous')) {
                                                    $(this).closest('.detail_expand_grid').find('ul li.active').prev('li').find('a').trigger('click');
                                                }
                                            });
                                            $(".expander_detail #content_module #secondary_image_thumbnails a").attr('rel','group');

                                            window.galleries.artworks.init();
                                        }, 200);



                                        detail_expand_load_work_ajax_request = undefined;
                                    },
                                    waitForAll: true
                                });

                                $("#ajax_content_module #secondary_image_thumbnails a").fancybox({
                                    'overlayShow': true,
                                    'overlayOpacity': 0.7,
                                    'overlayColor': '#d9d9d9',
                                    'imageScale': 'true',
                                    'zoomOpacity': 'true',
                                    prevEffect: 'fade',
                                    nextEffect: 'fade',
                                    closeEffect: 'fade',
                                    openEffect: 'fade',
                                    helpers : {
                                            title: {
                                                type: 'inside'
                                            }
                                        }
                                    });
                                //window.galleries.image_gallery.standard();
                                if (h.element_exists('.store_item')){
                                    window.cart.add_to_cart($('.store_item .store_item_add_to_cart'));
                                    window.cart.remove_from_cart($('.store_item .store_item_remove_from_cart'));
                                }

                                /* 
                                Placeholder function to call after the AJAX event completes.
                                Functionality can be added in main.js with window.galleries.image_gallery.detail_expand_grid.afterLoadWork = function(){...}
                                */
                                window.galleries.image_gallery.detail_expand_grid.afterLoadWork();

                            }
                        });
                    }
                },

                afterLoadWork: function() {
                    
                    h.accessibility.closeWithEscapeKey('.expander_detail .close');
                    $('.detail_expand_grid ul li.active > a:first-child').attr("aria-expanded", "true").focus()

                },

                close_work: function(artworks_wrapper) {
                    if ($(artworks_wrapper).size() > 0) {
                        $(artworks_wrapper).find('.expander_detail').closest('li').each(function() {
                            $('.detail_expand_grid ul li.active > a:first-child').attr("aria-expanded", "false")
                            $('.expander_detail', this).css('height', '0').css('opacity', '0');
                            $('.expander_detail', this).remove();
                            $(this).removeClass('active').height($('> a', this).height());
                        });
                        $(artworks_wrapper).find('.expander_detail');
                        $('.detail_expand_grid ul li.active .artwork_detail_wrapper').removeAttr("tabindex");
                        $(document).off('keydown.escKeyDown');
                    }
                }

            },

            slider: {

                init: function() {
                    $('#ig_slider, .ig_slider').each(function() {
                        if (!$(this).hasClass('ig_slider_single_image')) {
                            window.galleries.image_gallery.slider.load(this);
                            window.galleries.image_gallery.slider.max_height();
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                                $('#ig_slider, .ig_slider').slick('setPosition');
                            });
                        } else {
                            window.galleries.image_gallery.slider.max_height();
                            $( window ).resize(function() {
                                window.galleries.image_gallery.slider.max_height();
                            });
                        }
                    });
                },

                load: function(ig_instance) {
                    var slide_count = $('.item', ig_instance).length;
                    var variable_width = true;
                    if (slide_count <= 2) {
                        var variable_width = false;
                    }
                    var startingSlide = 0;
                    if ($(ig_instance).find('.item.starting_slide').length) {
                        var startingSlide = $(ig_instance).find('.item.starting_slide').index();
                    }
                    $(ig_instance).slick({
                        infinite: true,
                        speed: 300,
                        slidesToShow: 1,
                        accessibility:true, //left right arrow keys
                        centerMode: true,
                        variableWidth: variable_width,
                        autoplay: false,
                        autoplaySpeed: 6000,
                        arrows:true,
                        centerPadding:'0',
                        lazyLoad: 'progressive',
                        initialSlide: startingSlide
                    });
                    // Before slide change
                    $(ig_instance).on('beforeChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = $(slick.target).closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            $('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).addClass('transition');
                        }
                    });
                    $(ig_instance).on('afterChange', function(slick, currentSlide){
                        ig_slideshow_wrapper = $(slick.target).closest('.ig_slider_container_wrapper');
                        if ($('#ig_slider_caption, .ig_slider_caption', ig_slideshow_wrapper).length){
                            window.galleries.image_gallery.slider.caption(ig_slideshow_wrapper);
                        }
                    });

                },

                max_height: function(){
                    $('#ig_slider, .ig_slider').each(function() {
                        var slick_carousel_container = $(this);
                        ////Use original image dimensions to scale proportionally
                        var slideshow_width = $(slick_carousel_container).width();
                        var windowHeight = $(window).height();


                        var slideshow_ratio = 1.8;
                        if( $(this).attr('data-slideshow-ratio') ){
                            slideshow_ratio = $(this).attr('data-slideshow-ratio');
                        }
                        //ideal slideshow height, a ratio of the width
                        var proportional_height = Math.floor(slideshow_width/slideshow_ratio);

                        var upperLimit = 550;
                        if ($(slick_carousel_container).attr('data-carousel-max-height')) {
                            upperLimit = $(slick_carousel_container).attr('data-carousel-max-height');
                        }

                        var set_height = upperLimit;
                        //if the proportional height can't fit into the window height, use the window height instead
                        if (proportional_height > windowHeight) {
                            proportional_height = windowHeight;
                        }
                        //allow the slideshow to scale proportionately, up to the upper limit
                        if (proportional_height < upperLimit) {
                            set_height = proportional_height;
                        } else {
                            set_height = upperLimit;
                        }
                        $('.item', this).each(function(){
                            var scaleRatio = set_height  /  $(this).data('imgheight');
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);
                            var scaledHeight = Math.round($(this).data('imgheight') * scaleRatio);
                            var scaledWidth = Math.round($(this).data('imgwidth') * scaleRatio);

                            $(this).height(scaledHeight).width(scaledWidth).find('img').height(scaledHeight).width(scaledWidth);
                        });
                        $('#ig_slider_container_outer, #ig_slider_container, #ig_slider, .ig_slider_container_outer, .ig_slider_container, .ig_slider, .ig_slider_container .slick-list, .ig_slider_container .slick-track, .feature_panels .panel_slider .slider_panel_fill').height(set_height);
                    });
                },

                caption: function(slick_carousel_wrapper){
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).removeClass('transition');
                    ////Load the caption into the caption space, from data attribute
                    var caption = $(".slick-slide.slick-center", slick_carousel_wrapper).attr('data-caption');
                    $('#ig_slider_caption, .ig_slider_caption', slick_carousel_wrapper).html(caption);
                }

            },

            dynamic: function() {

                var slideshow_selector = '.ig_slideshow_container';
                if ($(slideshow_selector).size() < 1) {
                    var slideshow_selector = '#ig_slideshow_container';
                }

                $(slideshow_selector).each(function() {

                    var onfunction = $('#ig_slideshow', this).on;
                    if (onfunction) {
                        // Method for jQuery Cycle 2 ONLY

                        // Function fired directly after the slideshow is initialized
                        $('#ig_slideshow', this).on('cycle-post-initialize', function(event, optionHash) {
                            window.setTimeout(function() {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                if ($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > 0 && $('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height() > $('#ig_slideshow', this_instance).height()) {
                                    $('#ig_slideshow', this_instance).height($('#ig_slideshow .item.cycle-slide:eq(0)', this_instance).find('img').height());
                                }
                            }, 400);
                        });

                        // Display the controller count
                        if ($('#ig_slideshow_controller_count').size() > 0) {
                            $('#ig_slideshow_controller_count').html('1 ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + $('#ig_slideshow >').not('cycle-sentinel').size());
                            if ($('#ig_slideshow >').not('cycle-sentinel').length < 2) {
                                $('#ig_slideshow_controller').addClass('ig_slideshow_controller_single_item');
                            }
                        }

                        // Display the first caption
                        // Dan - I have started working on adding an enquire button for the works slideshow layout 
                        var initial_caption = ($('#ig_slideshow > :eq(0)', this).attr('data-rel') && typeof $('#ig_slideshow > :eq(0)', this).attr('data-rel') != 'undefined' ? $('#ig_slideshow > :eq(0)', this).attr('data-rel') : $('#ig_slideshow > :eq(0)', this).attr('rel'));
                        // var initial_enquire_button = $('#ig_slideshow > :eq(0)', this).find('.enquire').clone();
                        if ($('#ig_slideshow .item.item_starting_slide').length) {
                            var initial_caption = ($('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') && typeof $('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') != 'undefined' ? $('#ig_slideshow .item.item_starting_slide', this).attr('data-rel') : $('#ig_slideshow .item.item_starting_slide', this).attr('rel'));
                            // var initial_enquire_button = $('#ig_slideshow .item.item_starting_slide', this).find('.enquire').clone();
                        }
                        if (initial_caption && typeof initial_caption != 'undefined') {
                            var initial_caption = initial_caption.replace(/\n/g,'');
                        }

                        $('#ig_slideshow_caption, .ig_slideshow_caption', this).html(initial_caption);

                        // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                        $('#ig_slideshow_caption_external').html(initial_caption);

                        // $('#ig_slideshow_enquire').html(initial_enquire_button);

                        // Function fired directly before the slide changes
                        $('#ig_slideshow', this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            var this_caption = ($(incomingSlideEl, this_instance).attr('data-rel') && typeof $(incomingSlideEl, this_instance).attr('data-rel') != 'undefined' ? $(incomingSlideEl, this_instance).attr('data-rel') : $(incomingSlideEl, this_instance).attr('rel'));
                            if (this_caption && typeof this_caption != 'undefined') {
                                var this_caption = this_caption.replace(/\n/g,'');
                            }
                            $('#ig_slideshow_caption, .ig_slideshow_caption', this_instance).html(this_caption);
                            // Optional: Some sites can include an external custom defined caption area, this doesn't relate to the current slideshow instance
                            $('#ig_slideshow_caption_external').html(this_caption);

                            // var this_enquire_button = $(incomingSlideEl, this_instance).find('.enquire').clone();
                            // console.log(this_enquire_button);
                            // $('#ig_slideshow_enquire').html(this_enquire_button);
                            // window.galleries.contact_form_popup.init();

                            if ($('#ig_slideshow_controller_count').size() > 0) {
                                $('#ig_slideshow_controller_count').html(optionHash.nextSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + optionHash.slideCount);
                            }
                            $('#ig_slideshow_thumbnails a', this_instance).removeClass('active');

                            var selected_slide_index = $('#ig_slideshow >', this_instance).not('.cycle-sentinel').index(incomingSlideEl);

                            // Use data-rel if available (changed for W3C compliance), otherwise fall-back to rel
                            if ($('#ig_slideshow_thumbnails a[data-rel=' + selected_slide_index + ']').length) {
                                var active_thumbnail = $('#ig_slideshow_thumbnails a[data-rel=' + selected_slide_index + ']');
                            } else {
                                var active_thumbnail = $('#ig_slideshow_thumbnails a[rel=' + selected_slide_index + ']');
                            }
                            active_thumbnail.addClass('active');
                        });

                        // Function fired directly after the slide has changed
                        $('#ig_slideshow', this).on('cycle-after', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {

                        });
                    }


                    var autoHeight = 'container';
                    if ($('#ig_slideshow', this).attr('data-cycle-autoheight-setting'))  {
                        var autoHeight = $("#ig_slideshow", this).attr('data-cycle-autoheight-setting');
                    }

                    var cycleSpeed = 1200;
                    if ($('#ig_slideshow', this).attr('data-cycle-speed-setting'))  {
                        var cycleSpeed = $("#ig_slideshow", this).attr('data-cycle-speed-setting');
                    }

                    var cycleFx = 'fade';
                    if ($('#ig_slideshow', this).attr('data-cycle-fx-setting'))  {
                        var cycleFx = $("#ig_slideshow", this).attr('data-cycle-fx-setting');
                    }

                    var startingSlide = 0;
                    if ($('#ig_slideshow .item.item_starting_slide').length) {
                        var startingSlide = $('#ig_slideshow .item.item_starting_slide').index();
                    }

                    var newsettings;
                    if ($('#ig_slideshow', this).attr('data-cycle-custom-settings'))  {
                        var newsettings = $.parseJSON($('#ig_slideshow', this).attr('data-cycle-custom-settings').replace(/'/g, '"'));
                    }

                    var mastersettings = {
                        fx:     cycleFx,
                        speed:    cycleSpeed,
                        timeout:  6000,
                        pause:    0,
                        before:   function(currSlideElement, nextSlideElement, options, forwardFlag) {
                            // Depricated: For jQuery Cycle 1 ONLY
                            if (options && typeof options != 'undefined') {
                                $('#ig_slideshow_caption, .ig_slideshow_caption').html($(this).attr('rel').replace(/\n/g,''));
                                if ($('#ig_slideshow_controller_count').size() > 0) {
                                    $('#ig_slideshow_controller_count').html(options.nextSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + options.slideCount);
                                }
                            }
                        },
                        after:   function(currSlideElement, nextSlideElement, options, forwardFlag) {
                            // Depricated: For jQuery Cycle 1 ONLY
                            if (options && typeof options != 'undefined') {
                                if ($('#ig_slideshow_controller_count').size() > 0) {
                                    $('#ig_slideshow_controller_count').html(options.currSlide + 1 + ' ' + $('#ig_slideshow_controller_count').attr('data-separator') + ' ' + options.slideCount);
                                }
                            }
                        },
                        slides: '>',
                        //autoHeight: 'calc',
                        autoHeight: autoHeight,
                        swipe: true,
                        startingSlide: startingSlide
                    }

                    for (var newkey in newsettings) {
                        mastersettings[newkey] = newsettings[newkey];
                    }


                    $('#ig_slideshow', this)
                        .cycle(mastersettings)
                        .each(function () {
                            if ($('.artwork_video_link', this).size() > 0) {
                                var artwork_video_object = $('.artwork_video_object', this);
                                $('.artwork_video_link', this).click(function () {
                                    $(this).hide();
                                    artwork_video_object.html($(this).attr('rel'));
                                    return false;
                                });
                            }

                            $(this).bind('cycle-initialized', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                if ($('.artwork_video_link', this).size() > 0) {
                                    var artwork_video_object = $('.artwork_video_object', this);
                                    $('.artwork_video_link', this).click(function () {
                                        $(this).hide();
                                        artwork_video_object.html($(this).attr('rel'));
                                        return false;
                                    });
                                }
                            });

                            // NEW CODE ////
                            var onfunction = $(this).on;
                            if (onfunction) {
                                $(this).on('cycle-post-initialize', function(event, optionHash) {
                                    window.galleries.image_gallery.initialized(event, optionHash);
                                });
                                // Function fired directly before the slide has changed
                                $(this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                    window.galleries.image_gallery.after(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag);
                                    if(history.replaceState && $(incomingSlideEl).attr('data-href')) {
                                        var new_url = $(incomingSlideEl).attr('data-href');
                                        history.replaceState(null, null, new_url);
                                    }
                                });
                            }




                        })
                    ;


                    $('#ig_slideshow_thumbnails a:eq(0)', this).addClass('active');

                    $('#ig_slideshow_thumbnails a', this).click(function () {
                        var this_instance = $(this).closest('#ig_slideshow_container');
                        $('#ig_slideshow .artwork_video_object', this_instance).html('');
                        $('#ig_slideshow .artwork_video_link', this_instance).show();
                        $('#ig_slideshow', this_instance).cycle('pause');

                        var slide_index = false;
                        if ($(this).attr('data-rel') && typeof $(this).attr('data-rel') != 'undefined') {
                            var slide_index = $(this).attr('data-rel');
                        } else if ($(this).attr('rel') && typeof $(this).attr('rel') != 'undefined') {
                            var slide_index = $(this).attr('rel');
                        }
                        if (slide_index) {
                            $('#ig_slideshow', this_instance).cycle(parseInt(slide_index));
                        }
                        return false;
                    });

                    if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller')) {
                        if (!$("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_disabled')) {

                            var scroller_type = '';
                            if ($("#ig_slideshow_thumbnails_container", this).hasClass('ig_thumbnails_type_scroller_click')) {
                                var scroller_type = 'clickButtons';
                            }

                            if (!window.galleries.device.handheld()) {

                                window.galleries.jscroller_start.init($("#ig_slideshow_thumbnails_container", this), scroller_type);

                                $(window).resize(function() {
                                    // TODO: Need to re-initialise this script on resize, but to do this we also need to find a way of destroying the function first
                                    // window.galleries.jscroller_start.init("#ig_slideshow_thumbnails_container");
                                });

                            } else {

                                $("#ig_slideshow_thumbnails_container", this).addClass('ig_thumbnails_type_scroller_handheld');

                            }

                            if ($('#ig_slideshow_thumbnails', this).width() < $('#ig_slideshow_thumbnails_container', this).width()) {
                                $('#ig_slideshow_thumbnails_container', this).addClass('ig_slideshow_thumbnails_inactive');
                            }

                        }
                    } else {

                        //count the ul's and add first and last classes
                        var ul_count = parseInt($('#ig_slideshow_thumbnails', this).find('ul').length) -1;
                        $('#ig_slideshow_thumbnails ul', this).eq(0).addClass('first');
                        $('#ig_slideshow_thumbnails ul', this).eq(ul_count).addClass('last');
                        //check if support for on method
                        if (onfunction) {
                            $( '#ig_slideshow_thumbnails', this).on( 'cycle-update-view', function( event, optionHash, slideOptionsHash, currentSlideEl) {
                                var this_instance = $(this).closest('#ig_slideshow_container');
                                $('#ig_slideshow_thumbnails_container', this_instance).removeClass('last_slide_active').removeClass('first_slide_active');
                                //slidecount
                                //optionHash.slideCount
                                //optionHash.currSlide
                                //console.log(optionHash.slideCount);
                                if (optionHash && typeof optionHash != 'undefined') {
                                    if (optionHash.slideCount > 1) {
                                        //check if current slide is last and add class
                                        if (optionHash.currSlide == optionHash.slideCount-1) {
                                            $('#ig_slideshow_thumbnails_container', this_instance).addClass('last_slide_active');
                                        }
                                        //check if current slide is the first add class first
                                        if (optionHash.currSlide == 0) {
                                            $('#ig_slideshow_thumbnails_container', this_instance).addClass('first_slide_active');
                                        }
                                    }
                                }
                            });
                        }//end of if onfunction


                        $('#ig_slideshow_thumbnails', this).cycle({
                            fx:      'scrollHorz',
                            speed:    500,
                            timeout:  1000,
                            slides: '>'
                        });
                        $('#ig_slideshow_thumbnails', this).cycle('pause');
                        $('#ig_slideshow_thumbnails_prev a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_thumbnails_next a', this).click(function () {
                            var this_instance = $(this).closest('#ig_slideshow_container');
                            $('#ig_slideshow_thumbnails', this_instance).cycle('next');
                            return false;
                        });
                    }

                    $('#ig_slideshow_controller').each(function() {
                        $('#ig_slideshow_controller_prev a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('prev');
                            return false;
                        });
                        $('#ig_slideshow_controller_next a').click(function() {
                            var this_instance = $('#ig_slideshow_container');
                            $('#ig_slideshow').cycle('pause').cycle('next');
                            return false;
                        });
                    });

                });

            },

            initialized: function() {

            },

            after: function() {

            }

        },

        jscroller_start: {

            init: function(element, scroller_type) {

                $(element).thumbnailScroller({
                    /* scroller type based on mouse interaction
                    values: "hoverPrecise", "hoverAccelerate", "clickButtons"
                    default: "hoverPrecise" */
                    scrollerType: scroller_type,
                    /* scroller orientation
                    values: "horizontal", "vertical"
                    default: "horizontal" */
                    scrollerOrientation:"horizontal",
                    /* scroll easing type only for "hoverPrecise" scrollers
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeOutCirc" */
                    scrollEasing:"easeOutCirc",
                    /* scroll easing amount only for "hoverPrecise" and "clickButtons" scrollers (0 for no easing)
                    values: milliseconds
                    default: 800 */
                    scrollEasingAmount:800,
                    /* acceleration value only for "hoverAccelerate" scrollers
                    values: integer
                    default: 2 */
                    acceleration:1,
                    /* scrolling speed only for "clickButtons" scrollers
                    values: milliseconds
                    default: 600 */
                    scrollSpeed:800,
                    /* scroller null scrolling area only for "hoverAccelerate" scrollers
                    0 being the absolute center of the scroller
                    values: pixels
                    default: 0 */
                    noScrollCenterSpace:80,
                    /* initial auto-scrolling
                    0 equals no auto-scrolling
                    values: amount of auto-scrolling loops (integer)
                    default: 0 */
                    autoScrolling:0,
                    /* initial auto-scrolling speed
                    values: milliseconds
                    default: 8000 */
                    autoScrollingSpeed:2000,
                    /* initial auto-scrolling easing type
                    available values here: http://jqueryui.com/demos/effect/easing.html
                    default: "easeInOutQuad" */
                    autoScrollingEasing:"easeInOutQuad",
                    /* initial auto-scrolling delay for each loop
                    values: milliseconds
                    default: 2500 */
                    autoScrollingDelay:500
                });
            }

        },

        image_popup: {

            init: function(custom_fancybox_options) {

                if( $('body.prevent_user_image_save').length > 0 ){
                    $('.image_popup').each(function(i){
                        var image_url = $('.image_popup').eq(i).attr('href');
                        $('.image_popup').eq(i).attr('data-fancybox-href', image_url).attr('href', "#");
                    });
                }
                reset_hash_on_close = false;

                var fancybox_options = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
                    // Fancybox 2.0 and above
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    
                    helpers : {
                        title: {
                            type: 'inside'
                        }
                    },
                    beforeLoad:function(current, previous) {
                        window.galleries.image_popup.beforeLoad(current, previous);

                        // Modify the fancybox caption to the hidden .fancybox-caption element if it exists. 
                        // The hidden element allows virtualurls to replace the href as the content is not encoded for use as an attribute.
                        this.title = ($(this.element).parent().find('.fancybox-caption').html() || $(this.element).data('fancybox-title'));
                        
                        if (window.location.hash.indexOf('#/image_popup/') == -1) {
                            original_page_hash = window.location.hash;
                        } else {
                            original_page_hash = false;
                        }
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        if (current.element.attr('data-fancybox-hash')) {
                            var image_popup_hash = '#/image_popup/' + current.element.attr('data-fancybox-hash') + '/';
                            location.replace(image_popup_hash);
                            reset_hash_on_close = true;
                        }
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        $('.zoomContainer').remove();
                        if (popup_has_zoom) {
                            $('.fancybox-wrap').addClass('elevatezoom-enabled');
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 0,
                                zoomWindowHeight: 0
                            });
                        }
                        // add ARIA landmark
                        $('.fancybox-skin').attr("role", 'region').attr("aria-label", 'image popup');
                        // add image alt tag
                        var imgAlt = $(this.element).find("img").attr("alt");
                        var dataAlt = $(this.element).data("alt");
                        if (imgAlt) {
                            $(".fancybox-image").attr("alt", imgAlt);
                        } else if (dataAlt) {
                            $(".fancybox-image").attr("alt", dataAlt);
                        }
                        // focus trap the popup
                        h.accessibility.on_popup_opening('.fancybox-skin', false, '.fancybox-close');
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                        if ($('.powerzoom_image').length) {
                            if ($('.fancybox-image').powerzoom) {
                                $('.powerzoom_image').hide();
                                $('.powerzoom_image').powerzoom("destroy");
                            }
                        }

                        if (reset_hash_on_close == true) {
                            if(history.pushState) {
                                var original_page_state = ((original_page_hash.length) ? original_page_hash : ' ');
                                history.pushState(null, null, original_page_state);
                            } else {
                                original_page_state = ((original_page_hash.length) ? original_page_hash : '#/');
                                location.hash = original_page_state;
                            }
                        }
                        h.accessibility.on_popup_closing();

                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                    }
                };
                
                // Filter out certain descendents
                var image_popup_elements = $('a.image_popup, a.fancybox').filter(function() {
                    return !$(this).closest('.tile_list_formatted').length;
                });
                
                $(image_popup_elements).each(function() {
                    $(this).addClass('fancybox-filtered');
                });
                
                $('.fancybox-filtered').fancybox(fancybox_options);
                
                $(image_popup_elements).click(function() {
                    // For accessibility - tracks which element to refocus on
                    try {
                        h.accessibility.global_variables.element_to_refocus_to = $(this);
                    } catch(error) {
                        console.error(error);
                    }
                });
                
                // Apply special rules to descendents of tile lists, so the images show in their original order
                $('.tile_list_formatted a.image_popup').click(function() {
                     var this_href = $(this).attr('data-fancybox-href') && typeof $(this).attr('data-fancybox-href') != 'undefined' ? $(this).attr('data-fancybox-href') : $(this).attr('href');
                     var related_element = $('.tile_list_original a.image_popup[href="' + this_href + '"], .tile_list_original a.image_popup[data-fancybox-href="' + this_href + '"]');
                     if (related_element && typeof related_element != 'undefined') {
                        related_element.trigger('click');
                        return false;
                     }
                });

                has_been_clicked = false;

                var fancybox_options_with_zoom = {
                    overlayShow: true,
                    overlayOpacity: 0.7,
                    overlayColor: '#d9d9d9',
                    imageScale: 'true',
                    zoomOpacity: 'true',
                    // Fancybox 2.0 and above
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',

                    helpers : {
                        title: {
                            type: 'inside'
                        }
                    },
                    beforeLoad:function(current, previous) {
                        window.galleries.image_popup.beforeLoad(current, previous);
                    },
                    afterLoad: function(current, previous) {
                        popup_has_zoom = $(current.element).hasClass('image_popup_zoom');
                        if (popup_has_zoom) {
                            big_image_link = current.element.attr('data-popup_zoom_image');
                        }
                        popup_has_zoom_buttons = $(current.element).hasClass('image_popup_zoom_buttons');
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            if ((current.element.attr('href') && current.element.attr('href') != "#")){
                                original_image_link = current.element.attr('href')
                            } else {
                                original_image_link = current.element.attr('data-fancybox-href');
                            }
                            $('.fancybox-inner').text('');
                            $('.fancybox-inner').html('<div class="fancybox-image disabled"><span class="powerzoom-lowres" style="background-image:url(' + original_image_link +' );"><span class="powerzoom-lowres-upscale"></span></span></div>');
                            big_image_link = current.element.attr('data-popup_zoom_image');

                            $('.fancybox-inner').append('<div class="powerzoom_controls loading powerzoom-initial"><div class="powerzoom_pan"><div class="zoom-button pz_n"><i class="fa fa-chevron-up"></i></div><div class="zoom-button pz_s"><i class="fa fa-chevron-down"></i></div><div class="zoom-button pz_e"><i class="fa fa-chevron-right"></i></div><div class="zoom-button pz_w"><i class="fa fa-chevron-left"></i></div></div><div class="powerzoom_loading_indicator zoom-button powerzoom_zoom"> <span class="loading-dots"><i class="fa fa-circle"></i><i class="fa fa-circle"></i><i class="fa fa-circle"></i></span></div> <button id="zoomOutButton" class="zoomOutButton zoom-button powerzoom_zoom" aria-label="Zoom out"><i class="fa fa-search-minus"></i></button><button id="zoomInButton" class="zoomInButton zoom-button powerzoom_zoom" aria-label="Zoom in"><i class="fa fa-search-plus"></i></button><button id="zoomResetButton" class="zoomResetButton zoom-button powerzoom_zoom" aria-label="Reset zoom"><i class="fa fa-repeat"></i></button></div>');
                            $('.fancybox-image').append('<img src="" class="powerzoom-highres powerzoom-min powerzoom-transition preloading"/>');

                            $('.powerzoom_controls .zoom-button, .powerzoom-lowres').click(function(event) {
                                if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                                    $('.powerzoom_controls').addClass('showloader');
                                    has_been_clicked = true;
                                }
                            });
                            $('img.powerzoom-highres').attr('src', big_image_link).on('load', function() {
                                $('.powerzoom_controls .zoom-button, .powerzoom-lowres').unbind('click');
                                var original_image_width = $('img.powerzoom-highres').width();
                                var original_image_height = $('img.powerzoom-highres').height();
                                $(this).addClass('loaded');
                                if ($(window).width() > 950) {
                                    $('.powerzoom-lowres-upscale').css({'background-image': "url(" + big_image_link + ")"});
                                    setTimeout(function(){
                                        $('.powerzoom-lowres').css({'background-image': "none"});
                                    },3000);
                                }

                                window.galleries.image_popup.powerzoom(original_image_width,original_image_height);
                                if (has_been_clicked) {
                                    $('.powerzoom_controls #zoomInButton.zoom-button').trigger('click');
                                }
                            });
                        }
                        window.galleries.image_popup.afterLoad(current, previous);
                    },
                    afterShow: function() {
                        window.galleries.image_popup.afterShow();
                        $('.zoomContainer').remove();
                        if (popup_has_zoom) {
                            $('.fancybox-wrap').addClass('elevatezoom-enabled');
                            $('.fancybox-image').addClass('elevatezoom').attr( "data-zoom-image", big_image_link);
                            $(".elevatezoom").elevateZoom({
                                zoomType: "inner",
                                cursor: "default",
                                zoomWindowFadeIn: 200,
                                zoomWindowFadeOut: 200,
                                zoomWindowWidth: 1100,
                                zoomWindowHeight: 800
                            });
                        }
                        if (popup_has_zoom_buttons) {
                            $('body').addClass('fancybox-powerzoom');
                            $('.fancybox-image').css('line-height', $('.fancybox-inner').height() + 'px');
                            //window.galleries.image_popup.powerzoom();
                        }
                        // add ARIA landmark
                        $('.fancybox-skin').attr("role", 'region').attr("aria-label", 'image popup');
                        // add image alt tag
                        var imgAlt = $(this.element).find("img").attr("alt");
                        var dataAlt = $(this.element).data("alt");
                        if (imgAlt) {
                            $(".powerzoomFrame img").attr("alt", imgAlt);
                        } else if (dataAlt) {
                            $(".powerzoomFrame img").attr("alt", dataAlt);
                        }
                        // focus trap the popup
                        h.accessibility.on_popup_opening('.fancybox-skin', false, '.fancybox-close');
                    },
                    beforeClose: function() {
                        window.galleries.image_popup.beforeClose();
                        h.accessibility.on_popup_closing();
                    },
                    afterClose: function() {
                        window.galleries.image_popup.afterClose();
                        $('.zoomContainer').remove();
                        $('body').removeClass('fancybox-powerzoom');
                        $('.powerzoom_controls').addClass('initial');
                        $('.powerzoom-lowres').removeClass('hidden');
                        $('.powerzoom-highres').addClass('preloading');
                    }
                };

                if (custom_fancybox_options && typeof custom_fancybox_options !== 'undefined') {
                    $.extend(fancybox_options, custom_fancybox_options)
                }

                //Additional fancybox settings, for powerzoom only
                fancybox_options_with_zoom['width'] = '100%';
                fancybox_options_with_zoom['height'] = '100%';
                fancybox_options_with_zoom['autoSize'] = false;
                fancybox_options_with_zoom['type'] = 'html';
                fancybox_options_with_zoom['content'] = '<div></div>';
                fancybox_options_with_zoom['closeClick'] = false;
                fancybox_options_with_zoom['arrows'] = false;
                fancybox_options_with_zoom['helpers'] = {overlay:{closeClick: false},title: null};

                $("a.image_popup_zoom_buttons").fancybox(fancybox_options_with_zoom);

                 if (window.location.hash.indexOf('/image_popup/') == 1) {
                     window.galleries.image_popup.detect_popup_hash();
                 }

            },

            beforeLoad: function(current, previous) {
                //call this in main.js
            },
            afterLoad: function(current, previous) {
                //call this in main.js
            },
            afterShow: function() {
                //call this in main.js
            },
            beforeClose: function() {
                //call this in main.js
            },
            afterClose: function() {
                //call this in main.js
            },

            powerzoom: function (original_image_width, original_image_height) {

                $('.powerzoom_controls').addClass('loaded').removeClass('loading');

                function get_framesize() {
                    var window_width = $('.fancybox-inner').width();
                    var window_height = $('.fancybox-inner').height();
                    return {w: window_width, h: window_height};
                }

                function min_max_zoom() {

                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    if (powerzoom.percent > 1.99){
                        $('.powerzoom_controls').addClass('powerzoom-max');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-max');
                    }
                    if (powerzoom.percent == powerzoom.minPercent){
                        $('.powerzoom_controls').addClass('powerzoom-min');
                    } else {
                        $('.powerzoom_controls').removeClass('powerzoom-min');
                    }
                }

                $( window ).resize(function() {
                    setTimeout(function(){
                        var new_height = get_framesize().h
                        var new_width = get_framesize().w
                        $('.powerzoom-highres').powerzoom({width: new_width, height:new_height });
                        $('.fancybox-image').css('line-height', new_height + 'px');
                        var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    },600);
                });

                //CHECK FRAME SIZE TO RENDER ZOOM AREA
                var height = get_framesize().h
                var width = get_framesize().w


                //RENDER ZOOM AREA AT CORRECT SIZE
                $('.powerzoom-highres').powerzoom({
                    zoom: 5,
                    maxZoom: 2,
                    zoomTouch: 40,
                    maxZoomTouch:2,
                    image_width: original_image_width,
                    image_height: original_image_height,
                    width: width,
                    height: height,
                    controls: '<span style="display:none;"></span>'
                });

                $(".powerzoom-highres").mousedown(function() {
                    $(this).removeClass('powerzoom-transition');
                    return false;
                });
                //SAVE ZOOM OBJECT AS VARIABLE, AND UPDATE ALL PARAMETERS
                var powerzoom = $('.powerzoom-highres').data('powerzoom');


                //LOAD HI-RES IF CLICK ON LOW-RES VERSION
                $('.powerzoom-lowres').click(function(event) {
                    if ($('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                          //show loader
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    }
                });

                $('.powerzoom_controls .zoom-button').click(function(event) {

                    $('.powerzoom-highres').addClass('powerzoom-transition');
                    var powerzoom = $('.powerzoom-highres').data('powerzoom');
                    var scrollValue = 300
                    var curX = powerzoom.img_left
                    var curY = powerzoom.img_top
                    if ($(this).hasClass('zoomInButton') && $('.powerzoom_controls').hasClass('powerzoom-initial')) {
                        has_been_clicked = true;
                        if ($('.powerzoom_controls').hasClass('loaded')){
                            window.setTimeout(function() {
                                $('.powerzoom_controls').removeClass('powerzoom-initial showloader');
                                $('.powerzoom-lowres').hide().addClass('hidden');
                                $('.powerzoom-highres').hide().removeClass('preloading').fadeIn();
                            }, 400);
                        } else {
                          //show loader
                            $('.powerzoom_controls').addClass('showloader');
                        }
                        powerzoom.update();
                    } else if ($(this).hasClass('pz_w')){
                        powerzoom.drag({startX: curX, startY: curY, dx: scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_e')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: -scrollValue, dy: 0});
                    } else if ($(this).hasClass('pz_n')) {
                        powerzoom.drag({startX: curX, startY: curY, dx: 0, dy: scrollValue});
                    } else if ($(this).hasClass('pz_s')) {
                        powerzoom.drag({startX: curX, startY: curY , dx: 0, dy: -scrollValue});
                    } else if ($(this).hasClass('zoomInButton')) {
                        powerzoom.zoomIn();
                    } else if ($(this).hasClass('zoomOutButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomOutButton')) {
                        powerzoom.zoomOut();
                    } else if ($(this).hasClass('zoomResetButton') && $('.powerzoom_controls').hasClass('powerzoom-min')) {
                        if (!$('.powerzoom_controls').hasClass('powerzoom-initial')){
                            $('.powerzoom_controls').addClass('powerzoom-initial');
                            $('.powerzoom-highres').hide().addClass('hidden');
                            $('.powerzoom-lowres').hide().fadeIn().removeClass('hidden');
                        }
                    } else if ($(this).hasClass('zoomResetButton')) {
                        powerzoom.zoom(0);
                    }

                });

                $('.powerzoom-highres').powerzoom().on('powerzoom', function (e, result) {
                    min_max_zoom();
                });

                powerzoom.update();

            },

            detect_popup_hash: function() {
                //detect image_popup hash on load and
                //trigger click for relevant image popup
                var hash_segments = window.location.hash.split('/');
                if (hash_segments.length >= 3 && hash_segments[1] == 'image_popup'){
                    $('a[data-fancybox-hash="' + hash_segments[2] + '"]').trigger('click');
                }

            }

        },

        quicksearch: {

           init: function() {
               
               if ($('body.site-lib-version-1-0').length || !$('body[class*="site-lib-version-"]').length) {

                   /*   Legacy websites (version 1.0) use an ID for the search reveal. This has been changed to a class
                        (see the 'else' below) for flexibility and to enable multiple search fields. */
                    
                    if ($('#header_quick_search').length) {
                        $('#header_quick_search .inputField')
                            .each(function() {
                                if ($(this).attr('data-default-value') && !$(this).val()) {
                                    $(this).val($(this).attr('data-default-value'));
                                }
                                if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$(this).attr('data-width', '68');
                                    //$(this).width(0);
                                }
                            })
                            .focus(function(){
                                if ($('#header_quick_search .inputField').val() == $('#header_quick_search .inputField').attr('data-default-value')){
                                    $('#header_quick_search .inputField').val( '' ).closest('#header_quick_search').addClass('active');
                                    $('#top_nav').addClass('header_quick_search_reveal_open');
                                    $('body').addClass('header_quick_search_open');
                                }
                            })
                            .blur(function(){
                                if ($('#header_quick_search .inputField').val() == ''){
                                    if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                        //$(this).animate({'width': '0'});
                                    }
                                    $('#header_quick_search .inputField').val( $('#header_quick_search .inputField').attr('data-default-value') ).closest('#header_quick_search').removeClass('active');
                                    $('#top_nav').removeClass('header_quick_search_reveal_open');
                                    $('body').removeClass('header_quick_search_open');
                                }
                            })
                        ;
                        $('#header_quick_search #header_quicksearch_btn').click(function() {
                            if (!$('#header_quicksearch_field').val() || $('#header_quicksearch_field').val() == $('#header_quicksearch_field').attr('data-default-value')) {

                                if ($('#header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$('#header_quicksearch_field').animate({'width': $('#header_quicksearch_field').attr('data-width') + 'px'});
                                }
                                $('#header_quicksearch_field').select().focus();
                                return false;
                            } else {
                                $('#header_quicksearch_form')[0].submit()
                            }

                            $(this).closest('form').submit();
                            return false;
                        });
                    }

                } else {
                    
                    // Lib version 2.0 websites onwards use this block, and a new header.mako template.
                    if ($('.header_quick_search').length) {
                        $('.header_quick_search .inputField')
                            .each(function() {
                                if ($(this).attr('data-default-value') && !$(this).val()) {
                                    $(this).val($(this).attr('data-default-value'));
                                }
                                if ($('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$(this).attr('data-width', '68');
                                    //$(this).width(0);
                                }
                            })
                            .focus(function(){
                                if ($('.header_quick_search .inputField').val() == 'Search'){
                                    $('.header_quick_search .inputField').val( '' ).closest('.header_quick_search').addClass('active');
                                    $('#top_nav').addClass('header_quick_search_reveal_open');
                                    $('body').addClass('header_quick_search_open');
                                }
                            })
                            .blur(function(){
                                if ($('.header_quick_search .inputField').val() == ''){
                                    if ($('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                        //$(this).animate({'width': '0'});
                                    }
                                    $('.header_quick_search .inputField').val('Search').closest('.header_quick_search').removeClass('active');
                                    $('#top_nav').removeClass('header_quick_search_reveal_open');
                                    $('body').removeClass('header_quick_search_open');
                                }
                            })
                        ;
                        $('.header_quick_search #header_quicksearch_btn').click(function() {
                            if (!$('.header_quicksearch_field').val() || $('.header_quicksearch_field').val() == $('.header_quicksearch_field').attr('data-default-value')) {

                                if ($('.header_quick_search').hasClass('header_quick_search_reveal')) {
                                    //$('#header_quicksearch_field').animate({'width': $('#header_quicksearch_field').attr('data-width') + 'px'});
                                }
                                $('.header_quicksearch_field').select().focus();
                                return false;
                            } else {
                                $('.header_quicksearch_form')[0].submit()
                            }

                            $(this).closest('form').submit();
                            return false;
                        });
                    }
                    
                }

                $('#quicksearch_field')
                    .each(function() {
                        if ($(this).attr('data-default-value') && !$(this).val()) {
                            $(this).val($(this).attr('data-default-value'));
                        }
                    })
                    .click(function() {
                        if ($('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value') || $('#quicksearch_field').val() == 'Search...') {
                            $('#quicksearch_field').val('');
                        }
                        $('#quicksearch_field').addClass('active');
                    })
                ;

                $('#quicksearch_btn').click(function() {
                    if (!$('#quicksearch_field').val() || $('#quicksearch_field').val() == $('#quicksearch_field').attr('data-default-value')) {
                        h.alert('You have not entered a search term!');
                        $('#quicksearch_field').select();
                    } else {
                        $('#quicksearch_form')[0].submit()
                    }
                });

           }

        },

        publications: {
            init: function() {
                //$(".publications_show_samples").click(function() {
                    $("a.fancybox_gallery").fancybox();
                //    $("a.fancybox_gallery#sample_image_1").click();
                //})
            }
        },

        artist: {
            init: function() {
                window.galleries.artist.enquire.init();
            },

            enquire: {
                init: function() {
                    if ($('#artist_enquire_form.errorOccurred').size() != 0) {
                            h.alert('Error: Some of the information entered was missing or incorrect.');
                    } else if ($('#artist_enquire_form.captchaError').size() != 0) {
                            h.alert('Error: The text entered did not match the image. Please try again.');
                    }
                },

                check_form: function() {
                        if ($('#f_name').val()=='') {
                                h.alert('Please enter your name.');
                                return false
                        } else if (window.app.checkEmail.check('#f_email') == false) {
                                h.alert('Please enter a valid email address.');
                                return false
                        } else if ($('#f_message').val()=='') {
                                h.alert('Please enter a message.');
                                return false
                        } else if ($('#captcha_answer').val()=='') {
                                h.alert('Ooops! The text entered did not match the image. Please try again.');
                                return false
                        }

                        return true;

                },

                submit: function() {

                    if (window.galleries.artist.enquire.check_form()) {
                        document.artist_enquire_form.submit();
                    }

                }
            }
        },

        cookie_notification: {

            init: function () {
                var cookie_settings = {
                    time_to_wait: 2000
                };
                var custom_cookie_settings = $('#cookie_notification').data('cookie-notification-settings') || {};
                $.extend(cookie_settings, custom_cookie_settings);

                $('#cookie_notification').each(function () {
                    var notification_cookie = h.getCookie('cookie_notification_dismissed');
                    if (!notification_cookie) {
                        // Display the cookie notification after a set amount of time
                        setTimeout(function () {
                            $('#cookie_notification').addClass('active')
                        }, cookie_settings.time_to_wait)

                        // Accept btn event listener
                        $('#cookie_notification_accept').click(
                            window.galleries.cookie_notification.cookie_notification_accept_btn_callback
                        );
                    }
                    else {
                        $(this).hide();
                    }
                });
            },

            cookie_notification_accept_btn_callback: function (e) {
                h.setCookie('cookie_notification_dismissed', '1', 365);
                /* Display:none the banner once it's transformed off the screen 
                    - do this instead of $.hide because it's janky */
                $('#cookie_notification').on('transitionend', function (te) {
                    if (te.originalEvent.propertyName == 'transform') {
                        $('#cookie_notification').hide();
                    }
                });
                $('#cookie_notification').removeClass('active');
                e.preventDefault();
            }
        },

        depricated_contact_form: {

            init: function(which) {

                $('#contact_form .link a, #contact_form .button a').click(function () {
                        if (window.galleries.depricated_contact_form.doOnSubmit()) {
                                $('#contact_form').submit();
                        }
                        return false;
                });

                if ($('#contact_form.errorOccurred').size() != 0) {
                        window.location = '#contact_form';
                        h.alert('Please fill in the required information.');
                } else if ($('#contact_form.captchaError').size() != 0) {
                        window.location = '#contact_form';
                        h.alert('The verification text did not match the image.');
                }
            },

            doOnSubmit: function() {

                    if ($('#f_name').val()=='') {
                            h.alert('Please enter your name.');
                            return false
                    } else if ($('#f_email').val()=='') {
                            h.alert('Please enter your email address.');
                            return false
                    } else if ($('#f_email').val()!='' && window.app.checkEmail.check('#f_email') == false) {
                            h.alert('Please enter a valid email address.');
                            return false
                    } else if ($('#f_phone').val()=='') {
                            h.alert('Please enter your phone number.');
                            return false
                    } else if ($('#f_occupation').val()=='') {
                            h.alert('Please enter your occupation.');
                            return false
                    } else if ($('#f_organisation').val()=='') {
                            h.alert('Please enter your occupation.');
                            return false
                    } else if ($('#f_address').val()=='') {
                            h.alert('Please enter your address.');
                            return false
                    } else if ($('#f_message').val()=='') {
                            h.alert('Please enter your message.');
                            return false
                    }

                    return true;

            }

        },

        contact_form_popup: {

            init: function() {

                window.galleries.contact_form_popup.inline();
                window.galleries.contact_form_popup.custom();

                $('a[href$="/contact/form/"], .website_contact_form')
                    .unbind()
                    .each(function() {
                        if ($(this).hasClass('website_contact_form')) {
                            $(this).attr('href', '/contact/form/?modal=1');
                        } else {
                            $(this).attr('href', $(this).attr('href') + '?modal=1');
                        }
                    })
                    .addClass('website_contact_form')
                    .click(function() {
                        
                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }

                        if (window.ga) {
                            // Track the click in Analytics
                            ga('send', {
                              'hitType': 'event',
                              'eventCategory': 'Contact form popup',
                              'eventAction': window.location.pathname,
                              'eventLabel': $(document).attr('title')
                            });
                        }

                        var additional_field_content = $(this).attr('data-contact-form-details');
                        var additional_field_image = $(this).attr('data-contact-form-image');
                        var additional_field_parent_id = $(this).attr('data-contact-form-parent-id');
                        var additional_field_type = $(this).attr('data-contact-form-type');

                        var form_url_params = '?modal=1';
                        if (additional_field_parent_id) {
                            var form_url_params = form_url_params + '&id=' + additional_field_parent_id;
                        }

                        var url_prefix = '';
                        if (typeof window.archimedes.proxy_dir != 'undefined') {
                            var url_prefix = window.archimedes.proxy_dir;
                        }

                        $.fancybox.open(
                            url_prefix + '/contact/form/' + form_url_params,
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                keys: {close: null},
                                afterShow: function() {
                                    // focus on first input field
                                    $('.fancybox-inner form').find('*').filter(':input:visible:first').focus();
                                    window.galleries.contact_form_popup.after_popup();
                                    if (additional_field_content) {
                                        if ($('#contact_form #contact_form_item_preview').length) {
                                            $('#contact_form #contact_form_item_preview .inner').html('<div class="content">' + decodeURIComponent(additional_field_content) + '</div>');
                                            if (additional_field_image) {
                                                var website_domain = '';
                                                if (additional_field_image.substr(0,7) != 'http://' && additional_field_image.substr(0,8) != 'https://') {
                                                    var website_domain = 'http://' + document.location.host;
                                                }
                                                $('#contact_form #contact_form_item_preview .inner').prepend('<div class="image"><img src="' + website_domain + additional_field_image + '" alt="' + jQuery(decodeURIComponent(additional_field_content)).text() + '"/></div>');
                                            }
                                            $('#contact_form #contact_form_item_preview').slideDown(function() {
                                                if ($(window).height() < $('.fancybox-wrap').height()) {
                                                    $.fancybox.update();
                                                }
                                            });
                                            $('#contact_form #f_product').val(encodeURIComponent($('#contact_form #contact_form_item_preview').html()));
                                            $('#contact_form #form_type').val('Enquiry form');
                                            $('#contact_form #email_type').val('enquiry-form');
                                            if (additional_field_type && typeof additional_field_type != 'undefined') {
                                                $('#contact_form #form_type_name').val(additional_field_type);
                                            } else {
                                                $('#contact_form #form_type_name').val('enquiry');
                                            }
                                        } else {
                                            $('#contact_form #f_message').val(additional_field_content);
                                        }
                                    }
                                    h.accessibility.on_popup_opening('.fancybox-opened .fancybox-skin', false, '.fancybox-wrap .fancybox-close');
                                },
                                
                                afterClose: function () {
                                    h.accessibility.on_popup_closing();
                                }
                            }
                        );

                        return false;
                    })
                ;

            },

            custom: function() {

                $('#contact_form_custom').each(function() {
                    $('#contact_form_custom .link a, #contact_form_custom .button a').click(function() {
                        window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                        return false;
                    });
                });

            },

            inline: function() {

                $('#contact_form_inline').each(function() {
                    $.ajax({
                        url: "/contact/form/",
                        data: 'modal=1&inline=1',
                        cache: false,
                        dataType: 'html',
                        success: function(data) {
                            $('#contact_form_inline').html(data);
                            $('#contact_form .link a, #contact_form .button a').click(function() {
                                window.galleries.contact_form_popup.submit_form($(this).closest('#contact_form'));
                                return false;
                            });
                        }
                    });
                });

            },

            after_popup: function() {

                window.archimedes.archimedes_core.analytics.track_campaigns.set_forms();
                
                $('#contact_form .link a').click(function() {
                    var instance = $(this).closest('#contact_form');
                    if (!instance.hasClass('submitting')) {
                        window.galleries.contact_form_popup.submit_form(instance);
                    }
                    return false;
                });

            },

            submit_form: function(instance) {

                if (instance) {
                    $('.button', instance).addClass('loader');
                    $(instance).addClass('submitting');
                    
                    data = {};

                    field_validation_error = false;

                    $('input, select, textarea', instance).each(function() {
                        if ($(this).closest('.form_row').hasClass('form_row_required')) {
                            if ($(this).is(':radio')) {
                                var checked_radio = $('input[name="' + $(this).attr('name') + '"]:checked').val();
                                if (!checked_radio || typeof checked_radio == 'undefined') {
                                    field_validation_error = true;
                                }
                            } else if ($(this).is(':text') || $(this).is(':textarea')) {
                                if ($(this).val() == '') {
                                    field_validation_error = true;
                                }
                            }
                        }
                        if ($(this).is(':radio')) {
                            var checked_radio = $('input[name="' + $(this).attr('name') + '"]:checked').val();
                            if (!checked_radio || typeof checked_radio == 'undefined') {
                                var checked_radio = '';
                            }
                            data[$(this).attr('name')] = checked_radio;
                        } else if ($(this).attr('name') == 'f_message') {
                            data[$(this).attr('name')] = $(this).val().replace(/\n/g, '<br />');
                        } else {
                            data[$(this).attr('name')] = $(this).val().replace(/\n/g, '<br />');
                        }
                    });
                    
                    if (field_validation_error) {
                        $(instance).removeClass('submitting');
                        $('.error_row', instance).text('Please fill in all the required fields').attr("role", "alert");
                        window.galleries.effects.pulsate($('.error_row', instance));
                        return;
                    }
                    
                    window.archimedes.archimedes_core.analytics.track_campaigns.save_form_data($(instance));

                    //data = encodeURI(data); // Encode form data so that unicode characters work
                    data['originating_page'] = encodeURIComponent(window.location.pathname + window.location.search);
                    
                    $.ajax({
                        url: "/contact/form/process/",
                        data: data,
                        cache: false,
                        type: 'POST',
                        dataType: 'json',
                        success: function(data) {
                            $('.button', instance).removeClass('loader');
                            $(instance).removeClass('submitting');
                            if (data['success'] == 1) {
                                $.fancybox(('/contact/form/?modal=1&complete=1'), window.galleries.fancybox.ajax_defaults());

                                $('input, select, textarea', instance).each(function() {
                                    $(this).val('');
                                });

                                if (window.fbq && typeof window.fbq != 'undefined') {
                                    // Track in Facebook Pixel
                                    fbq('track', 'Lead');
                                }
                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                      'hitType': 'event',
                                      'eventCategory': 'Contact form submit success',
                                      'eventAction': window.location.pathname,
                                      'eventLabel': $(document).attr('title')
                                    });
                                }

                                window.galleries.contact_form_popup.after_submit();
                            } else {
                                var error_message = '';
                                if (data['error_message'] && typeof data['error_message'] != 'undefined') {
                                    var error_message = data['error_message'];
                                }
                                if (error_message) {
                                    $('.error_row', instance).text($('<div>' + error_message + '</div>').text());
                                }

                                if (window.ga) {
                                    // Track in Analytics
                                    ga('send', {
                                      'hitType': 'event',
                                      'eventCategory': 'Contact form submit error',
                                      'eventAction': window.location.pathname,
                                      'eventLabel': $(document).attr('title')
                                    });
                                }

                                window.galleries.effects.pulsate($('.error_row', instance));
                            }
                        }
                    });
                }

            },

            after_submit: function() {

            }

        },

        mailinglist_signup_form_popup: {

            init: function() {

                $('a.mailinglist_signup_popup_link')
                    .click(function() {
                        // For accessibility - tracks which element to refocus on
                        try {
                            h.accessibility.global_variables.element_to_refocus_to = $(this);
                        } catch(error) {
                            console.error(error);
                        }
                        var element_link = $(this).attr('href');
                        $.fancybox.open(
                            element_link + '?simplified=1',
                            {
                                type: 'iframe',
                                autoSize: false,
                                height: 'auto',
                                width: 400,
                                height: 465,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                afterShow: function() {
                                    // Close modal using esc key
                                    $("iframe.fancybox-iframe").contents().on("keyup.mailingsEsc", function(event){
                                    	if (event.keyCode == 27){
                                    		$.fancybox.close(true)
                                    	}
                                    });
                                    window.galleries.mailinglist_signup_form_popup.after_popup();
                                    // For accessibility - focus trap
                                    var mailingListElement = $("iframe.fancybox-iframe").contents().find('#artlogic_mailinglist_signup_form');
                                    h.accessibility.on_popup_opening(mailingListElement, '.fancybox-wrap .fancybox-close');
                                },
                                afterClose: function () {
                                    h.accessibility.on_popup_closing();
                                    $("iframe.fancybox-iframe").contents().off( ".mailingsEsc" );
                                }
                            }
                        );

                        return false;
                    })
                ;

                //
                // DEPRICATED METHOD
                //
                $('a#mailinglist_signup_popup_link')
                    .click(function() {

                        $.fancybox.open(
                            '/contact/mailinglist_signup/?modal=1',
                            {
                                type: 'ajax',
                                autoSize: false,
                                height: 'auto',
                                width: 420,
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                wrapCSS: 'fancybox_ajax_popup',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 200,
                                openSpeed: 400,
                                afterShow: function() {
                                    window.galleries.mailinglist_signup_form_popup.after_popup();
                                }
                            }
                        );

                        return false;
                    })
                ;

                if( $('a.mailinglist_signup_popup_link.auto_popup').length ){
                    var timeout = 1000;
                    var expiry = 3600;
                    var classes = $('a.mailinglist_signup_popup_link.auto_popup').attr('class').split(/\s+/);
                    for (i=0; i<classes.length; i++){
                        if(classes[i].indexOf('timeout') !== -1 ){
                            timeout =  parseFloat(classes[i].replace('timeout-', ''))*1000;
                        }
                        else if(classes[i].indexOf('expiry') !== -1 ){
                            expiry =  parseFloat(classes[i].replace('expiry-', ''));
                        }

                    }
                    console.log('expiry');
                    console.log(expiry);
                    setTimeout(function() {
                        if(!h.getCookie('shown_mailing_list_popup')){
                            $('a.mailinglist_signup_popup_link').trigger('click');
                            h.setCookie('shown_mailing_list_popup', 'true', '', expiry); // Set cookie for chosen seconds
                        }
                    }, timeout);
                    

                }
                

            },

            after_popup: function() {
                window.galleries.mailing_list_form.init();
            }

        },

        mailing_list_form: {

            _send_url: '/mailing-list/artlogicmailings/send/',
            _error_messages: '',

            init: function() {
                var self = this;
                $('#mailing_list_form, .mailing_list_form')
                    .unbind()
                    .each(function() {
                        $('.field', this)
                            .each(function() {
                                $(this).val($(this).attr('data-default-value'));
                            })
                            .focus(function() {
                                if ($(this).val() == $(this).attr('data-default-value')) {
                                    $(this).addClass('active').val('');
                                }
                            })
                            .blur(function() {
                                if ($(this).val() == '') {
                                    $(this).removeClass('active').val($(this).attr('data-default-value'));
                                }
                            })
                        ;
                        $('.submit_button', this).click(function() {
                            $(this).closest('form').submit();
                            return false;
                        });
                        $('input, textarea', this).keypress(function(event) {
                            if (event.which == 13) {
                                $(this).closest('form').submit();
                                return false;
                            }
                        });
                    })
                    .submit(function(e){
                        e.preventDefault();
                        if ($("#mailing_list_form, #artlogic_mailinglist_signup_form").hasClass("submit_disabled")) {
                            return false;
                        } else {
                            $("#mailing_list_form, #artlogic_mailinglist_signup_form").addClass("submit_disabled");
                        }
                        self._send_form($(this).closest('form'));
                    })
                ;
            },

            _form_data: function(instance) {

                var data = {}
                $('input, textarea', instance).each(function() {
                    if ($(this).val() != $(this).attr('data-default-value')) {
                        if($(this).attr('type')=='checkbox'){
                            if ($(this).prop('checked')) {
                                (data[$(this).attr('name')]) ? data[$(this).attr('name')] += ','+$(this).val() :  data[$(this).attr('name')] = $(this).val();
                            }
                        } else {
                            data[$(this).attr('name')] = $(this).val();
                        }
                    } else {
                        data[$(this).attr('name')] = '';
                    }
                });
                return data;
            },

            _clear_form_data: function(instance) {
                $('input:not([type="checkbox"], [type="submit"]), textarea', instance).each(function() {
                    $(this).val($(this).attr('data-default-value'));
                });
                $('input[type="checkbox"]', instance).each(function() {
                    if ($(this).attr('data-autoset') && typeof $(this).attr('data-autoset') != 'undefined') {
                        // Dont reset this as it was auto set as checked
                    } else {
                        $(this).prop('checked', false);
                    }
                });
                $('.error', instance).text('').hide();
            },

            _mandatory_fields: function(instance) {
                var self = this,
                    flag = true;
                $('input[type!="hidden"], textarea', instance).each(function(i) {
                    var currentInput = $('input[type!="hidden"], textarea', instance).eq(i);
                    if (currentInput.attr('required') && currentInput.val() == '') {
                        currentInput.addClass('required-field');
                        flag = false;
                    } else {
                        currentInput.removeClass('required-field');
                    }
                });
                if (!flag) {
                    var error_message = $(instance).attr('data-field-error') && typeof $(instance).attr('data-field-error') != 'undefined' ? $(instance).attr('data-field-error') : 'Please fill in all required fields.';
                    self._set_error(error_message);
                    return false;
                }
                return flag;
            },

            _email_is_valid: function(instance) {
                var self = this,
                    flag = false,
                    email = self._form_data(instance)['email'];

                if (!self._form_data(instance)['email']) {
                    flag = false;
                } else if (email.indexOf('@') > -1 && email.split('@')[1].indexOf('.') > -1 && email.indexOf(' ') == -1) {
                    flag = true;
                }

                /* Set error message */
                if (!flag) {
                     self._set_error('Please enter a valid email address.');
                     return false
                }
                return flag;


            },

            _emails_match: function(instance) {

                // We are NOT matching the emails on this form
                return true;

                var self = window.galleries.mailing_list_form,
                    flag = false;

                self._form_data(instance)['email2'] == self._form_data(instance)['email'] ? flag = true : flag = false;

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email addresses do not match.');
                }
                return flag;
            },

            _email_not_exists: function(instance) {

                var self = window.galleries.mailing_list_form,
                    flag = false;

                $.ajax({
                    url: '/mailing-list/artlogicmailings/email_exists/',
                    type: "POST",
                    dataType: 'json',
                    data: {'email': self._form_data(instance)['email']},
                    success: function(data){
                        flag = data['exists'] ? flag = false : flag = true;
                    },
                    error: function(jqXHR,textStatus,errorThrown){
                        console.log(errorThrown);
                    },
                    async: false
                });

                /* Set error message */
                if (!flag) {
                    self._set_error('Your email address already exists on our mailing list.');
                }
                return flag;
            },

            _set_error: function(error) {
                this._error_messages = error;
            },

            _display_error: function(instance) {
                var self = this;
                error_messages_str = '' + self._error_messages + ''
                error_element = $('.error', instance);
                if (!error_element.length) {
                    // Fall back to error container outside the mailing list form
                    error_element = $('.error');
                }
                $(error_element).text(error_messages_str);
                window.galleries.effects.pulsate($(error_element));
            },

            _send_form: function(instance) {
                var self = this;
                
                if (self._mandatory_fields(instance) && self._email_is_valid(instance) && self._email_not_exists(instance) && self._emails_match(instance)) {
                    $.ajax({
                        url: self._send_url,
                        type: "POST",
                        dataType: 'json',
                        data: self._form_data(instance),
                        success: function(data) {
                            if (data.success) {
                                var thanks_message_heading = $(instance).attr('data-field-thanks-heading') && typeof $(instance).attr('data-field-thanks-heading') != 'undefined' ? $(instance).attr('data-field-thanks-heading') : 'Thank you';
                                var thanks_message_content = $(instance).attr('data-field-thanks-content') && typeof $(instance).attr('data-field-thanks-content') != 'undefined' ? $(instance).attr('data-field-thanks-content') : 'You have been added to our mailing list';
                                h.alert('<h2>' + thanks_message_heading + '</h2> ' + thanks_message_content + '.');
                                self._clear_form_data(instance);
                            } else {
                                self._set_error('There was a problem adding you to the mailing list, please check the form and try again.');
                                if (data.error_message) {
                                    self._set_error(data.error_message);
                                }
                                self._display_error(instance);
                            }
                            $("#mailing_list_form, #artlogic_mailinglist_signup_form").removeClass("submit_disabled");
                        }
                    });
                } else {
                    self._display_error(instance);
                    $("#mailing_list_form, #artlogic_mailinglist_signup_form").removeClass("submit_disabled");
                }
            }
        },

        google_map_popup: {

            init: function() {

                $('#footer .website_map_popup')
                    .addClass('website_map_popup')
                    .click(function() {

                        $.fancybox.open(
                            '/contact/map/?modal=1',
                            {
                                type: 'iframe',
                                autoSize: false,
                                width: 900,
                                height: '90%',
                                arrows: false,
                                prevEffect: 'fade',
                                nextEffect: 'fade',
                                closeEffect: 'fade',
                                openEffect: 'fade',
                                prevSpeed: 750,
                                nextSpeed: 750,
                                closeSpeed: 300,
                                openSpeed: 750,
                                iframe     : {
                                   preload : false // this will prevent to place map off center
                                },
                                afterLoad: function () {

                                    $(".fancybox-overlay").addClass("no_max_height");
//                                    if ($(this.element).hasClass("i300")) {
//                                        $.extend(this, f300);
//                                        $(".fancybox-overlay").addClass("iphone_300");
//                                    } else if ($(this.element).hasClass("i420")) {
//                                        $.extend(this, f420);
//                                        $(".fancybox-overlay").addClass("iphone_420");
//                                    }
                                }

                            }
                        );

                        return false;
                    })
                ;

            }

        },

        effects: {

            pulsate: function(effect_element) {
                $(effect_element)
                    .clearQueue()
                    .hide()
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                    .fadeTo(250, 0)
                    .fadeTo(250, 1)
                ;
            }

        },

        fancybox: {

            ajax_defaults: function() {
                return {
                    type: 'ajax',
                    autoSize: false,
                    height: 'auto',
                    width: 495,
                    arrows: false,
                    prevEffect: 'fade',
                    nextEffect: 'fade',
                    closeEffect: 'fade',
                    openEffect: 'fade',
                    wrapCSS: 'fancybox_ajax_popup',
                    prevSpeed: 750,
                    nextSpeed: 750,
                    closeSpeed: 300,
                    openSpeed: 750,
                    afterShow: function() {

                    }
                }
            }

        },

        plugin_tweaks: {

            init: function() {
                $('#mc_embed_signup .mc-field-group #mce-EMAIL').not('[name]').attr('name', 'EMAIL');
                if ($('body').hasClass('page-param-type-simplified')) {
                    $('#mc_embed_signup > form[target="_blank"]').each(function() {
                        // $(this).submit(function() {
                        //     window.parent.$.fancybox.close();
                        // });
                    });
                }
            }

        },

        parallax: {

            init: function() {
                if (!window.galleries.device.handheld()) {
                    $('.parallax-element').each(function() {
                        $(this).parallax({imageSrc: $(this).attr('data-image-src')});
                    });
                }
            }

        },

        prevent_user_image_save: {

            init: function() {
                if ( $('body.prevent_user_image_save').length > 0 ) {
                    $('.image a, .records_list a, .image-wrapper a').attr('draggable', 'false');
                }
            }

        },
        
        share_widget: {
            
            init: function() {

                $('#social_sharing_links').each(function() {
                    $('.link a', this)
                        .unbind()
                        .blur(function() {
                            var element_context = $(this).closest('.share_links');
                            if (element_context.hasClass('active')) {
                                element_context.addClass('closing').removeClass('active');
                                element_context.delay(400).queue(function() {
                                    $(this).removeClass('closing');
                                    $(this).dequeue();
                                });
                            }
                        })
                        .click(function() {
                            if ($(this).closest('.share_links').hasClass('active') || $(this).closest('.share_links').hasClass('closing')) {
                                $(this).closest('.share_links').removeClass('active');
                            } else {
                                $(this).closest('.share_links').addClass('active');
                                $(this).focus();
                            }
                            return false;
                        })
                    ;
                    $('.social_links_item a', this).unbind().click(function() {
                        if ($(this).attr('href').indexOf('http') == 0) {
                            var new_window = window.open($(this).attr('href'), 'social_media_share', 'width=600,height=500');
                            return false;
                        }
                    });
                });

            }

        }
        
    }

    $(document).ready(function() {

        window.galleries.init();

    });


})(jQuery);
