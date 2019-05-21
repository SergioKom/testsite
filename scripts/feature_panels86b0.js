(function($) {

    window.feature_panels = {

        init: function() {
            window.feature_panels.layout.init();
            window.feature_panels.twitter.init();
        },

        layout: {

            init: function() {
                if ($('.feature_panels ul li .panel_image_slideshow').length) {
                    $('.feature_panels ul li .panel_image_slideshow').each(function() {
                        
                        var related_caption_element = $(this).closest('li').find('.content')
                        $(related_caption_element).attr('data-default-caption', $(related_caption_element).html());
                        $(related_caption_element).html('');

                        var first_slide_caption = $('.panel_slide', this).eq(0).attr('data-caption');
                        if (first_slide_caption) {
                            $(related_caption_element).html(first_slide_caption);
                        } else {
                            $(related_caption_element).html($(related_caption_element).attr('data-default-caption'));
                        }

                        var mastersettings = {
                            fx:     'fade',
                            speed:    800,
                            timeout:  2500,
                            pause:   0,
                            slides: '>',
                            autoHeight: 'calc',
                            swipe: true
                        }
                        $(this).cycle(mastersettings);

                        var onfunction = $(this).on;
                        if (onfunction) {
                            // Method for jQuery Cycle 2 ONLY
                            // 
                            // Function fired directly before the slide changes
                            $(this).on('cycle-before', function(event, optionHash, outgoingSlideEl, incomingSlideEl, forwardFlag) {
                                var this_instance = $(this).closest('.panel_image_slideshow');
                                var current_caption = $(incomingSlideEl, this_instance).attr('data-caption');
                                if (current_caption) {
                                    $(related_caption_element).html(current_caption.replace(/\n/g,''));
                                } else {
                                    $(related_caption_element).html($(related_caption_element).attr('data-default-caption'));
                                }
                            });
                        }
                    });
                }
            }

        },

        twitter: {

            init: function() {

                if (false) {
                    $('#twitter_feed_timeline').each(function() {

                        var this_instance = this;
                        var username = 'privateviewsapp';
                        if ($(this).attr('data-twitter-username')) {
                           var username = $(this).attr('data-twitter-username').replace('@', '');
                        }
                        var container = $('.simple_item_list', this_instance);
                        var count = 3;
                        if (container.length > 0) {
                          var url = '/api/twitter/1.1/timeline/' + username + '/' + count + '/html/';
                           var params = {
                              'row_class': 'item'
                           };
                           $('.simple_item_list', this).hide();
                           $.ajax({
                               url : url,
                               dataType : "html",
                               data: params,
                                success : function(html) {
                                    container.html(html);
                                    $('.loader_simple', this_instance).hide();
                                    $('.simple_item_list .acms-tw-status-container', this_instance).addClass('description');
                                    $('.simple_item_list', this_instance).fadeIn();
                                },
                                error: function() {
                                    $('.loader_simple', this_instance).hide();
                                    $('.simple_item_list', this_instance).html('<span class="item" style="text-align:center">Please try again later</span>').fadeIn();
                                }
                           });
                        }
                    });
                }

                if (false) {
                    String.prototype.parseURL = function() {
                        return this.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&~\?\/.=]+/g, function(url) {
                        return url.link(url);
                        });
                    };

                    String.prototype.parseUsername = function() {
                        return this.replace(/[@]+[A-Za-z0-9-_]+/g, function(u) {
                        var username = u.replace("@","")
                        return u.link("http://twitter.com/"+username);
                        });
                    };

                    String.prototype.parseHashtag = function() {
                        return this.replace(/[#]+[A-Za-z0-9-_]+/g, function(t) {
                        var tag = t.replace("#","%23")
                        return t.link("http://search.twitter.com/search?q="+tag);
                        });
                    };

                    $('#twitter_feed_timeline').each(function() {

                        var this_instance = this;
                        var limit = 3;
                        var username = 'privateviewsapp';
                        if ($(this).attr('data-twitter-username')) {
                            var username = $(this).attr('data-twitter-username').replace('@', '');
                        }
                        var url = "/api/twitter/1.1/timeline/" + username + "/100/";
                        var feed = [];

                        $('.simple_item_list', this).hide();

                        $.ajax({
                            url : url,
                            dataType : "json",
                            success : function(data) {
                                feed = data;
                                var loopcount = 0;

                                for (i in feed) {
                                    var loopcount = loopcount + 1
                                    if(loopcount <= limit && feed.length >= i) {
                                        var this_item = '<span class="item"><span class="description">' + feed[i].text.parseURL().parseUsername().parseHashtag() + '</span></span>';
                                        $('.simple_item_list', this_instance).append(this_item);
                                    }
                                }

                                $('.loader_simple', this_instance).hide();
                                $('.simple_item_list', this_instance).fadeIn();
                            },
                            error: function() {
                                $('.loader_simple', this_instance).hide();
                                $('.simple_item_list', this_instance).html('<span class="item" style="text-align:center">Please try again later</span>').fadeIn();
                            }
                        });
                    });
                }

            }

        }

    };


    $(document).ready(function() {

        window.feature_panels.init();

    });

})(jQuery);


