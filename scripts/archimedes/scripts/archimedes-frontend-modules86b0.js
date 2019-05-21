// Core frontend JS for Archimedes modules //
// ----------------------------------------- //


(function($) {

	window.modules = {
	
		init_all: function() {
			this.shared.init();
			this.attachments.init();
			this.comments.init();
                        this.messages.init();
			this.reviews.init();
                        this.picture_gallery.init();
                        this.media_gallery.init();
                        this.faq.init();
                        this.sharing.init();
		},
		
		shared: {
		
			init: function() {
				$('.module a.void').attr('href', 'javascript:void(0)');
				$('.module a.submit-btn')
				    .attr('href', 'javascript:void(0)')
				    .click(function() {
				        var data = modules.shared.parse_el_data(this)
				        //console.log('submit ' + data.form_selector);
				        $(data.form_selector)[0].submit();
				    });
				 $('.module div.toggle-editable').click(function() {
				     $('.module div.toggle-editable').removeClass('active');
				     $(this).addClass('active');
				 });
			},
			
			reveal_rows_speed: function(no_of_rows) {
				// the speed at which the extra rows open is
				// governed by the number of invisible rows...
				var ms_per_row = 170;
				var max_time = 1000;
				var speed = (200 * no_of_rows);
				if (speed > max_time) {
					speed = max_time;
				}
				return speed;
			},
				      			
			get_el_id: function(el) {
				return $(el).closest('.module').attr('id');
			},
			
			parse_el_data: function(el) {
				var el_id = this.get_el_id(el);
				var el_selector = '#' + el_id;
				var container_id = el_id + '_container';
				var container_selector = '#' + container_id;
				var rows_id = el_id + '_rows';
				var rows_selector = '#' + rows_id;
				var form_id = el_id + '_form';
				var form_selector = '#' + form_id;
				var rows_data = [null, null, null];
				if ($(el_selector).attr('data-role')) {
					rows_data = $(el_selector).attr('data-role').split(' ');
				}
				var data = {
					el_id: el_id,
					el_selector: el_selector,
					container_id: container_id,
					container_selector: container_selector,
					rows_id: rows_id,
					rows_selector: rows_selector,
					form_id: form_id,
					form_selector: form_selector,
					no_of_rows: rows_data[0],
					show_rows: rows_data[1],
					max_rows: rows_data[2]
				};
				return data;
			}
		
		},
		
		attachments: {
		
			init: function() {
				$('.module-attachments').each(function() {
					var data = modules.shared.parse_el_data(this);
					$(data.el_selector)
						.wrap('<div id="' + data.container_id + '"></div>');
					$(data.el_selector + ' a.attach-link')
						.click(function() {
							modules.attachments.on_btn_click(this);
						});
				});
				$('.module-attachments a.submit-btn')
					.click(function() {
						var data = modules.shared.parse_el_data(this);
						var form_id = data.el_id + '_form';
						$('#' + form_id)[0].submit();
					});
				// 'browse' button is called different things on 
				// different browsers...
				if ($.browser.safari) {
				    $('.module-attachments .browse-text').html('Choose File');
				} else if ($.browser.opera) {
				    $('.module-attachments .browse-text').html('Choose');
				} else if ($.browser.chrome) {
				    $('.module-attachments .browse-text').html('Choose File');
				}
				$('.module-attachments a.row-save-btn')
					.click(function() {
						var form_el = $(this).closest('form');
						form_el.submit();
					});
				$('.module-attachments a.row-remove-btn')
					.click(function() {
						var form_el = $(this).closest('form');
						var filename = $(form_el)[0].filename.value;
						$.prompt("Are you sure you want to remove this file? This action cannot " +
							"be undone.", {
								buttons: {
									'Cancel': false,
									'Permanently remove file': true
								},
								callback: function(bool) {
									if (bool) {
										$(form_el)[0]._remove.value = filename;
										form_el.submit();
									}
								}
							});
					});
			},
			
			on_btn_click: function(el) {
				data = modules.shared.parse_el_data(el);
				$(data.el_selector + ' .add_btn_container').hide();
				$(data.el_selector + ' .single-uploader').slideDown(600);
			},
			
			show_content: function(el_id) {
				var html = $('#' + el_id).html();
				h.alert(html);
			}
		
		},
		
		comments: {
		
			init: function() {
				$('.module-comments .module-comments-reveal-rows-button a')
					.attr('href', 'javascript:void(0)')
					.click(function() {
						$(this).closest('.module-comments-reveal-rows-button').hide();
						$(this).closest('.module-comments').find('.module-comments-rows-container').slideDown();
					})
				;
				$('.module-comments .more-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.comments.show_more(this);});
				$('.module-comments .less-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.comments.show_less(this);});
				if ($('.module-comments .rows div.featured').length == 0) {
					// if there are no featured comments, hide the 
					// 'Sort by Editor pick' option
					$('.module-comments a.link-sort-featured').remove();
					$('.module-comments a.link-sort-latest').closest('li').addClass('active');
				}
				$('.module-comments a.link-sort-featured')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.comments.resort(this, 'featured');});
				$('.module-comments a.link-sort-rating')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.comments.resort(this, 'rating');});
				$('.module-comments a.link-sort-latest')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.comments.resort(this, 'latest');});
				if (h.element_exists('.module-comment-submitted')) {
					var html = $('.module-comment-submitted').html();
					$('.module-comment-submitted').html(''); // clear it
					h.alert(html);
				}
			},
				      			
			get_el_id: function(el) {
				return $(el).closest('.module-comments').attr('id');
			},
			
			resort: function(el, sort_value) {
				var data = modules.shared.parse_el_data(el);
				$(data.el_selector + ' .less-link').hide();
				$(data.el_selector + ' .more-link').show();
				$(data.el_selector + ' li').removeClass('active');
				$(el).closest('li').addClass('active');
				var url = $(data.el_selector + ' #module-get-path').val();
				$(data.rows_selector).load(url, {
					'order_by': sort_value,
					'reload': 1
				});
			},
			
			show_more: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .more-link').hide();
					$(data.el_selector + ' .less-link').show();
					$(data.el_selector + ' .more-items').slideDown(speed);
				});
			},
			
			show_less: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .less-link').hide();
					$(data.el_selector + ' .more-link').show();
					$(data.el_selector + ' .more-items').slideUp(speed);
				});
			}
		
		},

                picture_gallery: {
                    init: function() {
                        if (h.element_exists('#picture_gallery')) {
                            $('#picture_gallery .slideshow')
                                .cycle({
                                    fx:         'fade',
                                    speed:      1200,
                                    timeout:    5000,
                                    pause:      0,
                                    before:     function(currSlideElement, nextSlideElement, options) {
                                        $('#slideshow_caption').html($(this).attr('rel'));
                                        $('#picture_gallery #slideshow_thumbnails li a').removeClass('active');
                                        $('#picture_gallery #slideshow_thumbnails li a span').stop().hide(0).fadeTo(0, 0);

                                        next_slide_id = $(nextSlideElement).attr('id').split('pg_slide_')[1];
                                        next_slide_thumb_id = '#pg_thumb_' + next_slide_id;
                                        $(next_slide_thumb_id + ' a', '#picture_gallery #slideshow_thumbnails').addClass('active');
                                        $(next_slide_thumb_id + ' a span', '#picture_gallery #slideshow_thumbnails').show(0).fadeTo(200, 0.92);

                                        next_slide_thumb_container = $(next_slide_thumb_id + ' a span').closest('ul').attr('rel');
                                        if (next_slide_thumb_container) {
                                            $('#picture_gallery #slideshow_thumbnails').cycle(parseInt(next_slide_thumb_container));
                                        }
                                    }
                                });

                            $('#picture_gallery #slideshow_thumbnails a')
                                .click(function () {
                                    $(this).fadeTo(0, 1);
                                    $('#picture_gallery .slideshow').cycle('pause');
                                    if ($(this).attr('rel')) {
                                        $('#picture_gallery .slideshow').cycle(parseInt($(this).attr('rel')));
                                    }
                                    return false;
                                })
                                .mouseover(function () {
                                    if ($(this).hasClass('active')) {
                                        $(this).fadeTo(0, 1);
                                    } else {
                                        $(this).fadeTo(100, 0.7);
                                    }
                                })
                                .mouseout(function () {
                                    $(this).fadeTo(250, 1);
                                })
                            ;

                            $('#picture_gallery #slideshow_thumbnails').cycle({
                                fx:      'scrollHorz',
                                speed:    500,
                                timeout:  1000
                            });
                            $('#picture_gallery #slideshow_thumbnails').cycle('pause');
                            $('#picture_gallery #slideshow_thumbnails_prev a').click(function () {
                                $('#picture_gallery .slideshow').cycle('pause');
                                $('#picture_gallery #slideshow_thumbnails').cycle('prev');
                                return false;
                            });
                            $('#picture_gallery #slideshow_thumbnails_next a').click(function () {
                                $('#picture_gallery .slideshow').cycle('pause');
                                $('#picture_gallery #slideshow_thumbnails').cycle('next');
                                return false;
                            });
                        }
                    }
                },

                media_gallery: {
                    init: function() {
                        if (h.element_exists('#media_gallery')) {
                            $('#media_gallery .slideshow')
                                .cycle({
                                    fx:         'fade',
                                    speed:      1200,
                                    timeout:    5000,
                                    pause:      0,
                                    before:     function(currSlideElement, nextSlideElement, options) {
                                        $('#slideshow_caption').html($(this).attr('rel'));
                                        $('#media_gallery #slideshow_thumbnails li a').removeClass('active');
                                        $('#media_gallery #slideshow_thumbnails li a span').stop().hide(0).fadeTo(0, 0);

                                        next_slide_id = $(nextSlideElement).attr('id').split('pg_slide_')[1];
                                        next_slide_thumb_id = '#pg_thumb_' + next_slide_id;
                                        $(next_slide_thumb_id + ' a', '#media_gallery #slideshow_thumbnails').addClass('active');
                                        $(next_slide_thumb_id + ' a span', '#media_gallery #slideshow_thumbnails').show(0).fadeTo(200, 0.92);

                                        next_slide_thumb_container = $(next_slide_thumb_id + ' a span').closest('ul').attr('rel');
                                        if (next_slide_thumb_container) {
                                            $('#media_gallery #slideshow_thumbnails').cycle(parseInt(next_slide_thumb_container));
                                        }
                                    }
                                });

                            $('#media_gallery #slideshow_thumbnails a')
                                .click(function () {
                                    $(this).fadeTo(0, 1);
                                    $('#media_gallery .slideshow').cycle('pause');
                                    if ($(this).attr('rel')) {
                                        $('#media_gallery .slideshow').cycle(parseInt($(this).attr('rel')));
                                    }
                                    return false;
                                })
                                .mouseover(function () {
                                    if ($(this).hasClass('active')) {
                                        $(this).fadeTo(0, 1);
                                    } else {
                                        $(this).fadeTo(100, 0.7);
                                    }
                                })
                                .mouseout(function () {
                                    $(this).fadeTo(250, 1);
                                })
                            ;

                            $('#media_gallery #slideshow_thumbnails').cycle({
                                fx:      'scrollHorz',
                                speed:    500,
                                timeout:  1000
                            });
                            $('#media_gallery #slideshow_thumbnails').cycle('pause');
                            $('#media_gallery #slideshow_thumbnails_prev a').click(function () {
                                $('#media_gallery .slideshow').cycle('pause');
                                $('#media_gallery #slideshow_thumbnails').cycle('prev');
                                return false;
                            });
                            $('#media_gallery #slideshow_thumbnails_next a').click(function () {
                                $('#media_gallery .slideshow').cycle('pause');
                                $('#media_gallery #slideshow_thumbnails').cycle('next');
                                return false;
                            });
                        }
                    }
                },

		messages: {

			init: function() {
				$('.module-messages .more-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.messages.show_more(this);});
				$('.module-messages .less-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.messages.show_less(this);});
				if ($('.module-messages .rows div.featured').length == 0) {
					// if there are no featured comments, hide the
					// 'Sort by Editor pick' option
					$('.module-messages a.link-sort-featured').remove();
					$('.module-messages a.link-sort-latest').closest('li').addClass('active');
				}
				$('.module-messages a.link-sort-featured')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.messages.resort(this, 'featured');});
				$('.module-messages a.link-sort-rating')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.messages.resort(this, 'rating');});
				$('.module-messages a.link-sort-latest')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.messages.resort(this, 'latest');});
				if (h.element_exists('.module-message-submitted')) {
					var html = $('.module-message-submitted').html();
					$('.module-message-submitted').html(''); // clear it
					h.alert(html);
				}
			},

			get_el_id: function(el) {
				return $(el).closest('.module-messages').attr('id');
			},

			resort: function(el, sort_value) {
				var data = modules.shared.parse_el_data(el);
				$(data.el_selector + ' .less-link').hide();
				$(data.el_selector + ' .more-link').show();
				$(data.el_selector + ' li').removeClass('active');
				$(el).closest('li').addClass('active');
				var url = $(data.el_selector + ' #module-get-path').val();
				$(data.rows_selector).load(url, {
					'order_by': sort_value,
					'reload': 1
				});
			},

			show_more: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .more-link').hide();
					$(data.el_selector + ' .less-link').show();
					$(data.el_selector + ' .more-items').slideDown(speed);
				});
			},

			show_less: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .less-link').hide();
					$(data.el_selector + ' .more-link').show();
					$(data.el_selector + ' .more-items').slideUp(speed);
				});
			}

		},
		
		reviews: {
		
			init: function() {
				$('.module-reviews .module-reviews-reveal-rows-button a')
					.attr('href', 'javascript:void(0)')
					.click(function() {
						$(this).closest('.module-reviews-reveal-rows-button').hide();
						$(this).closest('.module-reviews').find('.module-reviews-rows-container').slideDown();
					})
				;
				$('.module-reviews .more-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.reviews.show_more(this);});
				$('.module-reviews .less-link a')
					.attr('href', 'javascript:void(0)')
					.each(function() {modules.reviews.show_less(this);});
				if ($('.module-reviews .rows div.featured').length == 0) {
					// if there are no featured reviews, hide the 
					// 'Sort by Editor pick' option
					$('.module-reviews a.link-sort-featured').remove();
					$('.module-reviews a.link-sort-latest').closest('li').addClass('active');
				}
				$('.module-reviews a.link-sort-featured')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.reviews.resort(this, 'featured');});
				$('.module-reviews a.link-sort-rating')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.reviews.resort(this, 'rating');});
				$('.module-reviews a.link-sort-latest')
					.attr('href', 'javascript:void(0)')
					.click(function() {modules.reviews.resort(this, 'latest');});
				if (h.element_exists('.module-review-submitted')) {
					var html = $('.module-review-submitted').html();
					$('.module-review-submitted').html(''); // clear it
					h.alert(html);
				}
			},
				      			
			get_el_id: function(el) {
				return $(el).closest('.module-reviews').attr('id');
			},
			
			resort: function(el, sort_value) {
				var data = modules.shared.parse_el_data($(el));
				$(data.el_selector + ' .less-link').hide();
				$(data.el_selector + ' .more-link').show();
				$(data.el_selector + ' li').removeClass('active');
				$(el).closest('li').addClass('active');
				var url = $(data.el_selector + ' #module-get-path').val();
				$(data.rows_selector).load(
                                        url,
                                        {
                                            'order_by': sort_value,
                                            'reload': 1,
                                            'exclude_ids': $('.module-reviews').find('#reviews-exclude-ids').val()
                                        },
                                        function() {
                                            window.modules.reviews.after_resort();
                                        }
                                );
			},

                        after_resort: function() {
                                
                        },
			
			show_more: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .more-link').hide();
					$(data.el_selector + ' .less-link').show();
					$(data.el_selector + ' .more-items').slideDown(speed);
				});
			},
			
			show_less: function(el) {
				var data = modules.shared.parse_el_data(el);
				var speed = modules.shared.reveal_rows_speed(data.no_of_rows - data.show_rows);
				$(el).click(function() {
					$(data.el_selector + ' .less-link').hide();
					$(data.el_selector + ' .more-link').show();
					$(data.el_selector + ' .more-items').slideUp(speed);
				});
			}
		
		},

                faq: {
                        init: function() {
                               $('.module-faq .faq_question a').click(function() {
                                   var faq_id = $(this).closest('.module-faq .faq_question').attr('id');
                                   //note the hyphenated "faq-answer-" this is because i wanted to avoid faq_answer-[id] scenario!!
                                   $(".module-faq #faq-answer-" + faq_id).slideToggle(500);
                                   $(this).closest('.module-faq .faq_item').toggleClass('active');
                               });
                        }
                },
                
                sharing: {

                    init: function(popup_init){

                        if (h.element_exists('#social_sharing_links')) {

                            var social_sharing_links = $('#social_sharing_links');

                            if(!social_sharing_links.hasClass('inline')){
                                // Move the pop-up div '#social_sharing_links_popup_vertical' before to the </body>
								
                                
                                if (!popup_init){
                                	if ($('body > #social_sharing').length) {
	                                    $('body > #social_sharing').remove();
	                                }
	                                $('#social_sharing').detach().appendTo('body');
								} else {
									if ($('body > #social_sharing').length) {
	                                    $('body > #social_sharing').remove();
	                                }
									$('#popup_container #social_sharing').detach().appendTo('body');
									var social_sharing_links = $('#social_sharing_links');
									social_sharing_links.find('a').attr('target', '_blank');
								}

                                $('.share_link a').unbind().click(function(e) {

                                    e.preventDefault();

                                    var change_url = $(this).attr('data-url');
                                    var change_description = $(this).attr('data-description');
                                    var change_title = $(this).attr('data-title');
                                    if(change_url){
                                    	// ** ADDTHIS IS NOW DEPRECATED **
                                        // addthis.update('share', 'url', change_url);
                                        // addthis.url = change_url;
                                    }
                                    // ** ADDTHIS IS NOW DEPRECATED **
                                    // if(change_description){addthis.update('share', 'description', change_description);}
                                    // if(change_title){addthis.update('share', 'title', change_title)};
                                    // addthis.toolbox(".addthis_toolbox");
                                    var div_buttom = $(this).parent();
                                    

                                    if(social_sharing_links.hasClass('close')){


                                         var windowHeight = $('body').outerHeight();
                                         var scrollTop = $(window).scrollTop();
                                         var top = 0;
                                         var left = 0;

                                         // HIGHTS FOR ABOVE-BELOW
                                         var bodyBorder = $('body').outerHeight() - $('body').height();
                                         if ($('#cms-frontend-toolbar').length) {
                                             bodyBorder = bodyBorder - $('#cms-frontend-toolbar-container').height();
                                         }
                                         var topValueButtonShare = div_buttom.offset().top;
                                         var heighValueShareButton = div_buttom.outerHeight();
                                         var bottonDistanceShareButton= scrollTop + windowHeight  - topValueButtonShare - heighValueShareButton - bodyBorder;
                                         var heightItem = social_sharing_links.outerHeight();

                                         // WIDTHS FOR LEFT-RIGHT
                                         var windowWidth = $(window).width();
                                         var offsetLeftShareButton = div_buttom.offset().left;
                                         var widthShareButton = div_buttom.outerWidth();
                                         var sharing_element_width = social_sharing_links.outerWidth();

                                         // POPUP VERTICAL
                                         if( social_sharing_links.hasClass('popup_vertical')){
                                             // Calculating whether pop-up should appear above or below
                                             if(bottonDistanceShareButton < heightItem){
                                                 // ABOVE THE BOTTOM
                                                 top = topValueButtonShare + bodyBorder - heightItem;
                                                 social_sharing_links.css('bottom', '0px');
                                                 $('#social_sharing').css({'width': sharing_element_width + 29  + 'px', 'top': top,  'height': heightItem + 'px'});
                                             }else{
                                                 // BELOW THE BOTTOM
                                                 top = topValueButtonShare + bodyBorder + heighValueShareButton;
                                                 social_sharing_links.css("bottom", "auto");
                                                 $('#social_sharing').css({'width': sharing_element_width + 29  + 'px', 'top': top ,  'height': heightItem + 'px'});
                                             }

                                            // Calculating whether pop-up should appear left or right
                                             if(windowWidth - offsetLeftShareButton - widthShareButton < sharing_element_width){
                                                 //        |+SHARE|
                                                 // ###############
                                                 // ###############
                                                left = offsetLeftShareButton - sharing_element_width + widthShareButton;
                                                $('#social_sharing').css({"left": left + "px"})
                                             }else{
                                                 // |+SHARE|
                                                 // ###############
                                                 // ###############
                                                 $('#social_sharing').css({"left": offsetLeftShareButton + "px"});
                                                 //social_sharing_links.css({"left": offsetLeftShareButton + "px"})
                                             }
                                             social_sharing_links.slideToggle(300);
                                             $('#social_sharing').css('opacity','0');
                                             $('#social_sharing').animate({opacity:'1'},400);

                                        }

                                        // INLINE POPUP
                                        else if( social_sharing_links.hasClass('inline_popup')){

                                            if(bottonDistanceShareButton - heighValueShareButton < heightItem){

                                                // ABOVE THE BOTTOM
                                                top = topValueButtonShare + bodyBorder - heightItem;
                                                social_sharing_links.css({"top": top + "px"})
                                            }else{
                                                // BELOW THE BOTTOM
                                                top = topValueButtonShare + heighValueShareButton + bodyBorder;
                                                social_sharing_links.css({"top": top + "px"});
                                            }
                                            if(windowWidth - offsetLeftShareButton - widthShareButton < sharing_element_width){
                                                //        |+SHARE|
                                                // ###############
                                                // ###############
                                                if(windowWidth < 500){
                                                    social_sharing_links.css({"left": offsetLeftShareButton + "px"});
                                                }else{
                                                    left = offsetLeftShareButton - sharing_element_width + widthShareButton;
                                                    social_sharing_links.css({"left": left + "px"})
                                                }
                                            }else{
                                                // |+SHARE|
                                                // ###############
                                                // ###############
                                                social_sharing_links.css({"left": offsetLeftShareButton + "px"})
                                            }
                                            social_sharing_links.fadeToggle(200);
                                        }

                                        social_sharing_links.removeClass('close');

                                        // CLOSE SHARINGPOP-UP WHEN YOU CLICK IN OTHER SITE OF THE BROWSER
                                        $(document).mouseup(function (e){
                                            if (!social_sharing_links.is(e.target) && !$('.share_link a').is(e.target) && !social_sharing_links.hasClass('close')){
                                                if(social_sharing_links.hasClass('inline_popup')){
                                                    social_sharing_links.fadeToggle(200);
                                                }else if( social_sharing_links.hasClass('popup_vertical')){
                                                    social_sharing_links.slideToggle(300, function(){
                                                         $('#social_sharing').css({"height": "0px"})
                                                    });

                                                    $('#social_sharing').css('opacity','1');
                                                    $('#social_sharing').animate({opacity:'0'},400);
                                                }
                                                $(social_sharing_links).addClass('close');
                                            }
                                        });

                                    }else{
                                        // ACTION DEPEND OF GALLERY_SETTING: inline_popup,popup_vertical
                                        if(social_sharing_links.hasClass('inline_popup')){
                                            social_sharing_links.fadeToggle(200);
                                        }else if( social_sharing_links.hasClass('popup_vertical')){
                                            social_sharing_links.slideToggle(300, function(){
                                                 $('#social_sharing').css({"height": "0px"})
                                            });
                                            $('#social_sharing').css('opacity','1');
                                            $('#social_sharing').animate({opacity:'0'},400);
                                        }
                                        social_sharing_links.addClass('close');
                                    }
                                });
                            }
                        }
                    }
                }
	
	};
	
	
	$(document).ready(function() {
	
		modules.init_all();
			
	});
	

})(jQuery);