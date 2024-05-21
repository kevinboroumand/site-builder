if (a_x092969) {

    // Start loading icon 0.5 seconds into page load
    setTimeout(function () {
        $(".account-desktop").removeClass("no-icon");
        $(".account-desktop").addClass("loading");
    }, 200);

    function updateFavorites() {
        var favorites = document.getElementById('vg-favorites');
        if (favorites && parseInt(favorites.innerText, 10) > 0) {
            var accountDesktop = document.querySelector('.account-desktop');
            if (accountDesktop) {
                var newSpan = document.createElement('span');
                newSpan.setAttribute('id', 'num-of-favs');
                newSpan.innerText = favorites.innerText;
                accountDesktop.appendChild(newSpan);
            }
        }
    }
    // Account Dropdown
    function addAccountMenu() {
        const accountDiv = document.querySelector('.account-desktop');
        const isDesktop = window.innerWidth >= 1200;

        if (accountDiv && isDesktop) {
            const button = accountDiv.querySelector('button');
            const submenu = document.createElement('ul');
            submenu.className = 'submenu';
            submenu.style.opacity = '0';
            submenu.style.maxHeight = '0';
            submenu.style.overflow = 'hidden';
            submenu.style.transition = 'opacity 0.1s ease, max-height 0.3s ease';

            var userTitle = document.querySelector('.user-popup .user-title a');
            var userTitleText = userTitle ? userTitle.innerText : '0';
            var sscount = document.querySelector('.ss-count') ? document.querySelector('.ss-count').innerText : '0';
            var fpcount = document.querySelector('.fp-count') ? document.querySelector('.fp-count').innerText : '0';

            // Populate submenu and append it 2-3 seconds into page load
            var userTimeout = setTimeout(function () {
                var userTitle = document.querySelector('.user-popup .user-title a');
                var userTitleText = userTitle ? userTitle.innerText : '0';
                var sscount = document.querySelector('.ss-count') ? document.querySelector('.ss-count').innerText : '0';
                var fpcount = document.querySelector('.fp-count') ? document.querySelector('.fp-count').innerText : '0';

                if (userTitle) {
                    submenu.innerHTML = `
                <div class="user-vg">
                    <span id="name-vg">${userTitleText}</span>
                </div>
                <li class="logged-in"><a href="/member/saved_searches/"><span id="vg-saved-searches">${sscount}</span>Saved Searches</a></li>
                <li class="logged-in"><a href="/member/favorite_properties/"><span id="vg-favorites">${fpcount}</span>My Favorites</a></li>
                <div class="acct-btm">
                    <a href="/member/favorite_properties/"><button>My Account</button></a>
                    <a href="/member/logout/"><button>Log Out</button></a>
                </div>`;
                } else {
                    submenu.innerHTML = `
                        <div class="user-vg">
                            <span id="name-vg">Create Account</span>
                        </div>
                        <p>Create an account or login to view the latest Western PA area listings. Membership is totally free and you get all exclusive access to listings off market too.</p>
                        <div class="acct-btm">
                            <a onclick="toggleLoginPopup()" title="Login or Signup" aria-label="Login or Signup"><button>Login</button></a>
                            <a class="popup" href="/member/signup/"><button>Sign Up</button></a>
                        </div>`;
                }

                accountDiv.appendChild(submenu);
                updateFavorites();
                $(".account-desktop").removeClass("loading");
            }, 2000);  // or 3000 for 3 seconds


            button.addEventListener('click', function (event) {
                event.stopPropagation();
                if (submenu.style.opacity === '1') {
                    submenu.style.opacity = '0';
                    submenu.style.maxHeight = '0';
                    button.classList.remove('acct-open');
                    accountDiv.classList.add('closed');  // Add 'closed' class
                } else {
                    submenu.style.opacity = '1';
                    submenu.style.maxHeight = '400px';
                    button.classList.add('acct-open');
                    accountDiv.classList.remove('closed');  // Remove 'closed' class
                }
            });

            // New code to close the submenu when clicking outside
            document.addEventListener('click', function (event) {
                const isClickInside = submenu.contains(event.target) || button.contains(event.target);
                if (!isClickInside) {
                    submenu.style.opacity = '0';
                    submenu.style.maxHeight = '0';
                    button.classList.remove('acct-open');
                    accountDiv.classList.add('closed');  // Add 'closed' class
                }
            });
        } else {
            if (!isDesktop) {
                console.info('Screen width is less than 1200px, not initializing dropdown.');
            }
        }
    }

    // Call the function to apply the dropdown feature
    var userTimeout = setTimeout(function () {
        addAccountMenu();
    }, 250);

    var loginButton = document.querySelector('#login button');
    if (loginButton) {
        loginButton.addEventListener('click', function () {
            setTimeout(function () {
                var userTitle = document.querySelector('.user-title a');

                if (userTitle) {
                    var submenu = document.querySelector('.account-desktop .submenu');
                    var sscount = document.querySelector('.ss-count') ? document.querySelector('.ss-count').innerText : '0';
                    var fpcount = document.querySelector('.fp-count') ? document.querySelector('.fp-count').innerText : '0';
                    var userTitle = document.querySelector('.user-popup .user-title a') ? document.querySelector('.user-popup .user-title a').innerText : '0';

                    submenu.innerHTML = `
        <div class="user-vg">
        <span id="name-vg">`+ userTitle + `</span>
    </div>
    <li class="logged-in"><a href="/member/saved_searches/"><span id="vg-saved-searches">`+ sscount + `</span>Saved Searches</a></li>
                <li class="logged-in"><a href="/member/favorite_properties/"><span id="vg-favorites">`+ fpcount + `</span>My Favorites</a></li>
    <div class="acct-btm">
    <a href="/member/favorite_properties/"><button>My Account</button></a>
        <a href="/member/logout/"><button>Log Out</button></a></div>
            `;
                    updateFavorites();
                }
            }, 1500);
        });
    }


    $(".slideshow").css("display", "flex");


    /// Improve Property Images
    if (improvePics == true) {
        // improve property images
        if (document.querySelector('.property .property-thumb img.lida4py_thumb')) {
            var highresolutionInt = setInterval(function () {
                if (document.querySelector('.property .property-thumb img.lida4py_thumb').src.includes('/182x144/')) {
                    var num = document.querySelectorAll('.property .property-thumb img.lida4py_thumb').length;
                    for (var i = 0; i <= num; i++) {
                        if (document.querySelectorAll('.property')[i]) {
                            var src = "https://" + (document.querySelectorAll('.property .property-thumb img.lida4py_thumb')[i].src.split('/182x144/')[1]);
                            document.querySelectorAll('.property .property-thumb img.lida4py_thumb')[i].src = "https://t.realgeeks.media/resize/500x396/" + src;
                            document.querySelectorAll('.property .property-thumb img.lida4py_thumb')[i].srcset = "";
                        }
                    }
                    clearInterval(highresolutionInt);
                }
            }, 100);
        }

        // improve hero image or no search pages
        if (document.querySelector('#quicksearch-section.hero-search.search.no-search img')) {
            var highresolutionHero = setInterval(function () {
                if (document.querySelector('#quicksearch-section.hero-search.search.no-search img').src.includes('/0x720/')) {
                    var herosrc = "https://" + (document.querySelector('#quicksearch-section.hero-search.search.no-search img').src.split('/0x720/')[1]);
                    document.querySelector('#quicksearch-section.hero-search.search.no-search img').src = "https://t.realgeeks.media/resize/2000x/" + herosrc;
                    clearInterval(highresolutionHero);
                }
            }, 100);
        }
    }

    // Current Page Nav Link Class //////////////////////////
    $(document).ready(function () {
        var currentPagePath = window.location.pathname;
        $('.nav-ink').each(function () {
            var linkPath = $(this).prop('pathname');
            if (currentPagePath === linkPath) {
                $(this).addClass('current-page');
            }
        });
    });


    ////// Wrap Property Valuation and Mortgage Calculator ////////////////
    function wrapElementsWhenReady() {
        const elementsToWrap = $('.rg-valuation-root, .mortgage-column');

        if (elementsToWrap.length === 2) {
            var singlePropCity = $('meta[property="og:locality"]').attr('content');
            if (!$('meta[property="og:locality"]').length) {
                singlePropCity = '';
            }

            // Wrap both elements in a single .property-option-container div
            elementsToWrap.wrapAll('<div class="property-option-container"></div>');

            // Wrap each element separately in a .property-option div and prepend an h2
            elementsToWrap.each(function () {
                const propertyOption = $('<div class="property-option"></div>');
                $(this).appendTo(propertyOption);
                propertyOption.appendTo('.property-option-container');

                if ($(this).hasClass('rg-valuation-root')) {
                    propertyOption.prepend('<h2>See what your ' + singlePropCity + ' property is worth</h2>');
                }

                if ($(this).hasClass('mortgage-column')) {
                    propertyOption.prepend('<h2>Calculate the mortgage on this ' + singlePropCity + ' property</h2>');
                }
            });

            clearInterval(checkInterval);
        }
    }

    const checkInterval = setInterval(wrapElementsWhenReady, 500);

    function closeLearnMore() {
        if (document.querySelector('.area-page-about').classList.contains('collapsed')) {
            document.querySelector('.area-page-about').classList.remove('collapsed');
            document.querySelector('.learn-more').classList.add('close-btn');
            document.querySelector('.learn-more').innerText = "Collapse";

        } else {
            document.querySelector('.area-page-about').classList.add('collapsed');
            document.querySelector('.learn-more').classList.remove('close-btn');
            document.querySelector('.learn-more').innerText = "Read more";
        }

    }

    function closeLearnMore() {
        var areaPageAbout = (document.querySelector('.area-page-about').scrollHeight);

        if (document.querySelector('.area-page-about').classList.contains('collapsed')) {
            var areaPageAboutpx = areaPageAbout + 'px';
            document.querySelector('.area-page-about').classList.remove('collapsed');
            // $(".area-page-about").animate({
            //     maxHeight: areaPageAboutpx
            // }, 300);
            document.querySelector('.learn-more').classList.add('close-btn');
            document.querySelector('.learn-more').innerText = "Collapse";
        } else {
            document.querySelector('.area-page-about').classList.add('collapsed');
            // $(".area-page-about").animate({
            //     maxHeight: '400px'
            // }, 300);
            document.querySelector('.learn-more').classList.remove('close-btn');
            document.querySelector('.learn-more').innerText = "Read more";
        }
    };


    // Scroll User to top of page on gallery close click
    $(document).on("click", ".jqm_close", function () {
        $("html, body").scrollTop(0);
    });

    /// Current Page Highlighter ///

    $(document).ready(function () {
        var currentPagePath = window.location.pathname;
        $('.nav-ink').each(function () {
            var linkPath = $(this).prop('pathname');
            if (currentPagePath === linkPath) {
                $(this).addClass('current-page');
            }
        });
    });


    // diamond search box
    if (document.querySelector('#search-autocomplete')) {

        // add estimate autocomplete tab script
        if (document.querySelector('#raw-address')) {
            var sellertabscript = document.createElement('script');
            sellertabscript.onload = function () {
                ! function (e) {
                    var t, n = !1,
                        a = null;

                    function r() {
                        ! function (t) {
                            for (var n in t) document.getElementById(n).value = t[n];
                            e("#address #unit_number").val(e("#raw-unit").val())
                        }(a), e("#search button").addClass("loading"), e("#address").submit()
                    }
                    e(document).ready(function () {
                        t = new google.maps.places.Autocomplete(document.getElementById("raw-address")).setComponentRestrictions({
                            country: ["us"],
                        }), google.maps.event.addListener(t, "place_changed", function () {
                            (function (t) {
                                if (void 0 === t.street_number) {
                                    var n = e("#search #raw-address").val().match(/^\d+/);
                                    n && 1 === n.length && (t.street_number = n[0])
                                }
                            })(a = function (e) {
                                if (void 0 === e) return {};
                                if (void 0 === e.address_components) return {
                                    formatted: e.name
                                };
                                for (var t = {}, n = 0; n < e.address_components.length; n++) {
                                    var a = e.address_components[n],
                                        r = a.types[0];
                                    "street_number" === r ? t.street_number = a.long_name : "route" === r ? t.street_name = a.long_name : "postal_code" === r ? t.zip = a.long_name : "locality" === r ? t.city = a.long_name : "administrative_area_level_1" === r ? t.state = a.short_name : "country" === r && (t.country = a.short_name)
                                }
                                return t.formatted = e.formatted_address, t
                            }(t.getPlace())), n && r()
                        }), e("#search").submit(function (t) {
                            return t.returnValue = !1, t.preventDefault(), e("#search button").prop("disabled", !0),
                                function () {
                                    if (null !== a) return r();
                                    setTimeout(function () {
                                        var t, n;
                                        t = e("#search #raw-address").val(), n = e("#search #raw-unit").val(), "" !== t && (e("#address input[name=raw__address]").val(t), e("#address input[name=raw__unit]").val(n), 1) && r()
                                    }, 1e3), n = !0
                                }(), !1
                        })
                    })
                }($);
            };
            sellertabscript.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing&channel=realgeeks&client=gme-cinc";
            document.body.appendChild(sellertabscript); //or something of the likes
        }
        // end of adding seller tab script

        // add seller autocomplete tab script
        if (document.querySelector('#raw-address-sell')) {
            var sellertabscript = document.createElement('script');
            sellertabscript.onload = function () {
                ! function (e) {
                    var t, n = !1,
                        a = null;

                    function r() {
                        ! function (t) {
                            for (var n in t) document.getElementById(n).value = t[n];
                            e("#address #unit_number").val(e("#raw-unit").val())
                        }(a), e("#search button").addClass("loading"), e("#address").submit()
                    }
                    e(document).ready(function () {
                        t = new google.maps.places.Autocomplete(document.getElementById("raw-address-sell")).setComponentRestrictions({
                            country: ["us"],
                        }), google.maps.event.addListener(t, "place_changed", function () {
                            (function (t) {
                                if (void 0 === t.street_number) {
                                    var n = e("#search #raw-address-sell").val().match(/^\d+/);
                                    n && 1 === n.length && (t.street_number = n[0])
                                }
                            })(a = function (e) {
                                if (void 0 === e) return {};
                                if (void 0 === e.address_components) return {
                                    formatted: e.name
                                };
                                for (var t = {}, n = 0; n < e.address_components.length; n++) {
                                    var a = e.address_components[n],
                                        r = a.types[0];
                                    "street_number" === r ? t.street_number = a.long_name : "route" === r ? t.street_name = a.long_name : "postal_code" === r ? t.zip = a.long_name : "locality" === r ? t.city = a.long_name : "administrative_area_level_1" === r ? t.state = a.short_name : "country" === r && (t.country = a.short_name)
                                }
                                return t.formatted = e.formatted_address, t
                            }(t.getPlace())), n && r()
                        }), e("#search").submit(function (t) {
                            return t.returnValue = !1, t.preventDefault(), e("#search button").prop("disabled", !0),
                                function () {
                                    if (null !== a) return r();
                                    setTimeout(function () {
                                        var t, n;
                                        t = e("#search #raw-address-sell").val(), n = e("#search #raw-unit").val(), "" !== t && (e("#address input[name=raw__address]").val(t), e("#address input[name=raw__unit]").val(n), 1) && r()
                                    }, 1e3), n = !0
                                }(), !1
                        })
                    })
                }($);
            };
            sellertabscript.src = "https://maps.googleapis.com/maps/api/js?libraries=places,drawing&channel=realgeeks&client=gme-cinc";
            document.body.appendChild(sellertabscript); //or something of the likes
        }
        // end of adding seller tab script


        $('#address #diamond-search-btn').click(function () {
            if ($('#raw-address').val().length > 2) {
                var addressArray = $('#raw-address').val().split(', ');
                var formatted = $('#raw-address').val();
                var address = "";
                var city = "";
                var state = "";
                var country = "";
                if (addressArray.length == 1) {
                    address = addressArray[0];
                } else if (addressArray.length == 2) {
                    state = addressArray[0];
                    country = addressArray[1];
                    $('#state').val(state);
                    $('#country').val(country);
                } else if (addressArray.length == 3) {
                    city = addressArray[0];
                    state = addressArray[1];
                    country = addressArray[2];
                    $('#city').val(city);
                    $('#state').val(state);
                    $('#country').val(country);
                } else if (addressArray.length == 4) {
                    address = addressArray[0];
                    city = addressArray[1];
                    state = addressArray[2];
                    country = addressArray[3];
                    $('#street_number').val(address.match(/\d+/)[0]);
                    $('#street_name').val(address.replace(address.match(/\d+/)[0] + " ", ""));
                    $('#city').val(city);
                    $('#state').val(state);
                    $('#country').val(country);
                }
                $('#address').submit();
                // window.location.href = "/cma/property-valuation/custom/?city="+city+"&street_name="+address+"&country="+country+"&state="+state+"&formatted="+formatted;
            }
        });


        /////Sell tab popup/////
        $(function () {
            $('#address-sell #sell-one').click(function () {
                if ($("h6#area").length) {
                    var areaText = (document.querySelector("h6#area").textContent + ' ');
                } else {
                    var areaText = '';
                }
                $("form.contact-us").submit(function (e) {
                    e.preventDefault();
                });
                setTimeout(function () {
                    hideContactBoxes();
                    $("#message").val("Lead origin: " + currentURL);
                    $(".rg-modal-contact h2").text('Sell your ' + areaText + 'home with us');
                    $("#message").after('<h3 id="address">What is your address?</h3>');
                    $("h3#address").after('<textarea id="address" class="pac-target-input" rows="5" autocomplete="off">' + $('#raw-address-sell').val() + '</textarea>');
                    $("textarea#address").after('<h3 id="agent">Are you working with an agent?</h3>');
                    $("h3#agent").after('<select class="agent" name="agent" id="agent"><option value="No">No</option><option value="Yes">Yes</option></select>');
                    $("select#agent").after('<h3 id="addcomments">Comments?</h3>');
                    $("h3#addcomments").after('<textarea id="addcomments" class="comments" rows="5" placeholder="I need to sell soon. I have a new roof, etc."></textarea>');
                }, 1);
                setTimeout(function () {
                    var _form = document.querySelector(".rg-modal-contact");
                    $(".leftColumn input").click(function () {
                        var msg = document.querySelector("#message");
                        var msg1 = document.querySelector("textarea#address");
                        var msg2 = document.querySelector("select#agent");
                        var msg3 = document.querySelector("textarea#addcomments");

                        msg.value = msg.value + " | Address: " + msg1.value + " | Working with an agent?: " + msg2.value + " | Message: " + msg3.value;
                        return true;
                    });
                }, 100);
                $('form.contact-us').submit();
            });
        });
    }
    // end of diamond search box

    // NEIGHBORHOODS directory
    if (document.querySelector('#tabs a')) {
        $('#tabs a').click(function (e) {
            e.preventDefault();
            if ($(this).attr("id") != "current") {
                var id = $(this).attr("name");
                $("#current").removeAttr("id");
                $(this).attr('id', 'current');
                $('.neighbor-links #content div').hide();
                $('.neighbor-links #content ' + id).fadeIn();
            }
        });
    }

    // add slider for properties on area pages
    if (document.querySelector('#featured-listings-show')) {
        var slickScript = document.createElement('script');
        slickScript.onload = function () {
            $('.featured-listings-show-slider').slick({
                dots: true,
                infinite: true,
                fade: true,
                speed: 500,
                autoplay: true,
                autoplaySpeed: 7000,
                arrows: false,
                slidesToShow: 1,
                slidesToScroll: 1,
                customPaging: function (slider, i) {
                    var thumb = $(slider.$slides[i]).data();
                    return '<a class="dot number-slider-item">' + (i + 1) + '</a>';
                },
            });
        };
        slickScript.src = "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
        document.body.appendChild(slickScript); //or something of the likes
    }

    // Function to wrap navigation buttons in the btn-container
    function wrapNavigationButtons() {
        // Check if the navigation buttons are not wrapped in the btn-container
        if (!$('#featured-three-slides .slick-prev, #featured-three-slides .slick-next').parent().hasClass('btn-container')) {
            // Wrap the navigation buttons in a div with the class 'btn-container'
            $('#featured-three-slides .slick-prev, #featured-three-slides .slick-next').wrapAll('<div class="btn-container"></div>');
        }
    }

    // Initialize Slick slider when the document is ready
    $(document).ready(function () {
        // add slider for properties on area pages
        if (document.querySelector('#featured-three-slides')) {
            var slickScript = document.createElement('script');
            var autoplay = true;
            if (document.querySelector('#featured-three-slides').getAttribute('data-autoplay') == "true") {
                autoplay = true;
            }
            slickScript.onload = function () {
                $('#featured-three-slides').slick({
                    dots: false,
                    infinite: true,
                    speed: 500,
                    autoplay: true,
                    autoplaySpeed: 4000,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    responsive: [
                        {
                            breakpoint: 1400, // laptop breakpoint
                            settings: {
                                slidesToShow: 3,
                                slidesToScroll: 3,
                            }
                        },
                        {
                            breakpoint: 980, // tablet breakpoint
                            settings: {
                                slidesToShow: 2,
                                slidesToScroll: 2,
                            }
                        },
                        {
                            breakpoint: 600, // mobile breakpoint
                            settings: {
                                slidesToShow: 1,
                                slidesToScroll: 1,
                            }
                        }
                    ]
                });

                // Call the wrapNavigationButtons function after the slider is initialized
                wrapNavigationButtons();
            };
            slickScript.src = "//cdn.jsdelivr.net/npm/slick-carousel@1.8.1/slick/slick.min.js";
            document.body.appendChild(slickScript); //or something of the likes
        }
    });

    // Listen for window resize event and call wrapNavigationButtons
    $(window).on('resize', wrapNavigationButtons);


    ////// Thinking about selling block ////////////////
    $('div.row.property.results:nth-child(5)').after('<div class="resultblock"><div class="blockback"><div class="content"><h2>Thinking about selling?</h2><p>See what your home is worth today.</p><a class="button" href="/cma/property-valuation/">Enter Address</a></div></div></div>');


    ///// STATIC BUYER FORM ///////////////////////////////////////
    $(document).ready(function () {
        // Get the body container and footer elements
        var bodyContainer = $('.body-container');
        var footerElement = $('footer');

        // Check if a .vg-form element exists in the .body-container
        var vgFormExists = bodyContainer.find('.vg-forms').length > 0;

        // If a .vg-form element exists, remove it from the footer
        if (vgFormExists) {
            var vgFormInFooter = footerElement.find('.vg-forms');
            var threeCtasContainer = footerElement.find('.three-ctas-container');
            if (vgFormInFooter.length > 0) {
                vgFormInFooter.remove();
            }
            if (threeCtasContainer.length > 0) {
                threeCtasContainer.remove();
            }
        }

    });


    if ($(".vg-forms").length) {
        $(this).each(function (i, obj) {
            $(document).ready(function () {
                $(function () {
                    setInterval(constantChecker, 1);
                });

                function constantChecker() {
                    if ($("body.modal-closed").length) {
                        $(".rg-modal-contact").show();
                        $("#first-name").val("");
                        $("#last-name").val("");
                        $("#phone").val("");
                        $("#email").val("");
                        $("textarea#message").val("");
                    }
                }
                var formcomplete = false;
                $(this).on('click', '#vg-submit', function (e) {
                    let type = $(this).parents('.cta-form').find("#lead-type").text().toUpperCase();
                    var leadType = "====== " + type + " FORM LEAD SUBMISSION ======";
                    var $form = $(this).closest('.cta-form');
                    var fnamefield = $form.find("input[name='fname']").val();
                    var lnamefield = $form.find("input[name='lname']").val();
                    var emailfield = $form.find("input[name='email']").val();
                    var howsoonfield = $form.find("select[name='how-soon'] option:selected").val();

                    var allCustomFieldsMsg = "";

                    var allFields = $form.find("select, textarea, input[type=text], input[type=checkbox]:checked, input[type=radio]:checked"); var lastInputName = null;
                    for (var i = 0; i < allFields.length; i++) {
                        var includedInOldForm = ['fname', 'lname', 'email', 'how-soon'].includes(allFields[i].getAttribute('name'));
                        if (allFields[i] && allFields[i].value > "" && !includedInOldForm) {
                            checkorradio = ["checkbox", "radio"].includes(allFields[i].getAttribute('type'));
                            if (["checkbox", "radio"].includes(allFields[i].getAttribute('type'))) {
                                var text = allFields[i].parentElement.parentElement.firstChild.innerText;
                            } else {
                                var text = allFields[i].previousElementSibling.innerText;
                            }

                            var value = allFields[i].value;

                            if (checkorradio && lastInputName == allFields[i].getAttribute('name')) {
                                allCustomFieldsMsg += ', ' + value;
                            } else {
                                allCustomFieldsMsg += '\n ' + text + ": " + value;
                            }
                            lastInputName = allFields[i].getAttribute('name');
                        }
                    }

                    setTimeout(function () {
                        function hideAllButCaptcha() {
                            var input = $("input#vg-data").val();
                            $("#message").val(input);
                            $("#modal-container").removeClass("hidemodal");
                            $('.miranda-lb form .row:not(.row:has(.g-recaptcha-response), .row:has(.leftColumn), .row.name:has(.phone))').hide();
                            $('.miranda-lb h2').addClass("custom-form-h2");
                            $('.miranda-lb p').hide();
                            $('.miranda-lb h2').text("Almost there, " + fnamefield + "!");
                            $('<h3 class="custom-form-h3">We just need a good number to reach you</h3>').insertAfter('.miranda-lb h2');
                            $('.phone label').attr('style', 'display: none !important');
                            $('.phone').css({
                                "margin-bottom": "30px"
                            });
                            $(".phone input").attr("placeholder", "(___) 000-0000");
                            $("#first-name").val(fnamefield);
                            $("#last-name").val(lnamefield);
                            $("#email").val(emailfield);
                            $('select#how-soon option[value="' + howsoonfield + '"]').attr("selected", "selected");
                            $(".form-error").hide();
                        }

                        function showCaptcha() {
                            $('.row:has(.g-recaptcha-response)').show();
                        }


                        $("input#vg-data").val("\n" + leadType + allCustomFieldsMsg);

                        var checkAllFieldnotEmpty = true;
                        for (var i = 0; i < allFields.length; i++) {
                            if (allFields[i].className.includes('required') && !allFields[i].value > "") {
                                checkAllFieldnotEmpty = false
                            }
                        }

                        var incompleteFields = [];
                        var allFieldsCompleted = true;
                        var vgForms = $(".vg-forms .required");

                        if ($(".body-container .vg-forms").length) {
                            vgForms = $(".body-container .vg-forms .required");
                        }

                        vgForms.each(function () {
                            var input = $(this).siblings("input, select, textarea");
                            if ($(this).is("select")) {
                                var selectedOption = $(this).find(":selected");
                                if (selectedOption.val() === "" || selectedOption.is(":disabled")) {
                                    incompleteFields.push($(this).attr("name"));
                                    $(this).addClass("not-complete");
                                    $(this).on("change", function () {
                                        if ($(this).val() !== "" && !$(this).find(":selected").is(":disabled")) {
                                            $(this).removeClass("not-complete");
                                        }
                                    });
                                    allFieldsCompleted = false;
                                }
                            } else if (input.val() === "") {
                                incompleteFields.push(input.attr("name"));
                                input.addClass("not-complete");
                                input.on("input", function () {
                                    if ($(this).val() !== "") {
                                        $(this).removeClass("not-complete");
                                    }
                                });
                                allFieldsCompleted = false;
                            } else if ($(this).is("textarea") && $(this).val() === "") {
                                incompleteFields.push($(this).attr("name"));
                                $(this).addClass("not-complete");
                                $(this).on("input", function () {
                                    if ($(this).val() !== "") {
                                        $(this).removeClass("not-complete");
                                    }
                                });
                                allFieldsCompleted = false;
                            }
                        });

                        if (!allFieldsCompleted) {
                            console.log("Incomplete fields:", incompleteFields);
                        }

                        if (checkAllFieldnotEmpty) {
                            formcomplete = true;
                        } else {
                            formcomplete = false;
                        }
                        if (allFieldsCompleted == true) {
                            hideAllButCaptcha();
                            var showCaptchaInt = setInterval(function () {
                                if (document.querySelector('.row:has(.g-recaptcha-response)')) {
                                    showCaptcha();
                                    clearInterval(showCaptchaInt);
                                }
                            }, 10);
                            $(".leftColumn input").click(function () {
                                setTimeout(function () {
                                    if (!$('.miranda-lb > h2:contains("Almost")').length) {
                                        $(".rag-modal-close").click();
                                        $("html").append('<div class="form-cover"><h3>Submitting Request</h3></div>');
                                        setTimeout(function () {
                                            $('.form-cover h3').text("We have received your request. An agent will be in contact shortly!");
                                            $(".form-cover").addClass("form-submitted");
                                            setTimeout(function () {
                                                $('.form-cover').hide();
                                                // location.reload();
                                            }, 2000);
                                        }, 4000);
                                    }
                                }, 500);
                            });
                        }
                        if (allFieldsCompleted == false) {
                            $(".rag-modal-close").click();
                            $(".form-error").show();
                        }
                    }, 1);
                });
            });
        });
    }

    // Swap Sign Up Card in Footer 
    if (document.querySelector('.user-title-text') || document.querySelector('#sign-up-card') || document.querySelector('#logged-in-card')) {
        if (document.querySelector('.user-popup .user-title a')) {
            swapsigncards();
        }
        else {
            var userInterval = setInterval(function () {
                if (document.querySelector('.user-popup .user-title a')) {
                    swapsigncards();
                    clearInterval(userInterval);
                } else if (document.querySelector('.rg-modal.rg-modal-signup .rag-modal.rag-modal-backdrop .rag-modal-window .miranda-lb h2:not(.show-for-medium-up)') && document.querySelector('.rg-modal.rg-modal-signup .rag-modal.rag-modal-backdrop .rag-modal-window .miranda-lb h2:not(.show-for-medium-up)').innerHTML.includes("Thanks for signing up!")) {
                    document.querySelector('nav.top-nav .user-contact-icons .user a').click();
                    document.querySelector('nav.top-nav .user-contact-icons .user a').click();
                    swapsigncards();
                    clearInterval(userInterval);
                }
            }, 100);
        }

        var loginButton = document.querySelector('#login button');
        if (loginButton) {
            loginButton.addEventListener('click', function () {
                setTimeout(function () {
                    if (document.querySelector('.user-popup .user-title a')) {
                        swapsigncards();
                    }
                }, 2000);
            });
        }


        function swapsigncards() {
            var userTitle = document.querySelector('.user-popup .user-title a').text;
            if (document.querySelector('.body-content .user-title-text') || document.querySelector('.body-content #sign-up-card') || document.querySelector('.body-content #logged-in-card')) {
                document.querySelector('.user-title-text').innerText = userTitle;
                if (document.querySelector('#sign-up-card')) {
                    document.querySelector('#sign-up-card').classList.add('hidden');
                    document.querySelector('#sign-up-card').classList.remove('show');
                }
                if (document.querySelector('#logged-in-card')) {
                    document.querySelector('#logged-in-card').classList.add('show');
                    document.querySelector('#logged-in-card').classList.remove('hidden');
                }
            }
            if (document.querySelector('footer .user-title-text') || document.querySelector('footer #sign-up-card') || document.querySelector('footer #logged-in-card')) {
                document.querySelector('footer .user-title-text').innerText = userTitle;
                if (document.querySelector('footer #sign-up-card')) {
                    document.querySelector('footer #sign-up-card').classList.add('hidden');
                    document.querySelector('footer #sign-up-card').classList.remove('show');
                }
                if (document.querySelector('footer #logged-in-card')) {
                    document.querySelector('footer #logged-in-card').classList.add('show');
                    document.querySelector('footer #logged-in-card').classList.remove('hidden');
                }
            }
        }
    }

    /////Custom Form Variables//////
    var currentURL = window.location.pathname;
    var sell = document.querySelectorAll("a#sell");
    var buy = document.querySelectorAll("a#buy");
    var area = document.querySelectorAll("a#area");
    var contact = document.querySelectorAll('a.popup:not(#sell):not(#buy):not(#area):not(#listingbutton):not(#startoffer):not(#sell-one):not(#buy-submit)');

    function hideContactBoxes() {
        $('label:contains("Comments")').attr('style', 'display: none !important');
        $("textarea#message").attr('style', 'display: none !important');

    }

    /////Custom Forms w/ Lead Origin/////
    if (!$(".property-page").length) {
        $(function () {
            $(contact).click(function () {
                $("form.contact-us").submit(function (e) {
                    e.preventDefault();
                });
                setTimeout(function () {
                    var leadOrigin = "Lead origin: " + currentURL;
                    $(".leftColumn input").click(function () {
                        var msg = document.querySelector("#message");
                        msg.value = "--" + "\n" + "Message: " + msg.value + "\n" + leadOrigin;
                        return true;
                    });
                }, 100);
                $('form.contact-us').submit();
            });
        });
    }

    /////Sell Your Home Form/////
    $(function () {
        $(sell).click(function () {
            if ($("h6#area").length) {
                var areaText = (document.querySelector("h6#area").textContent + ' ');
            } else {
                var areaText = '';
            }
            $("form.contact-us").submit(function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                hideContactBoxes();
                $("#message").val("Lead origin: " + currentURL);
                $(".rg-modal-contact h2").text('Sell your ' + areaText + 'home with us');
                $("#message").after('<h3 id="address">What is your address?</h3>');
                $("h3#address").after('<textarea id="address" class="pac-target-input" rows="5" autocomplete="off" placeholder="123 Main St, ' + maincity + '"></textarea>');
                $("textarea#address").after('<h3 id="agent">Are you working with an agent?</h3>');
                $("h3#agent").after('<select class="agent" name="agent" id="agent"><option value="No">No</option><option value="Yes">Yes</option></select>');
                $("select#agent").after('<h3 id="addcomments">Comments?</h3>');
                $("h3#addcomments").after('<textarea id="addcomments" class="comments" rows="5" placeholder="I need to sell soon. I have a new roof, etc."></textarea>');
            }, 1);
            setTimeout(function () {
                $(".leftColumn input").click(function () {
                    var msg = document.querySelector("#message");
                    var msg1 = document.querySelector("textarea#address");
                    var msg2 = document.querySelector("select#agent");
                    var msg3 = document.querySelector("textarea#addcomments");

                    msg.value = "--" + "\n ==== SELLER FORM SUBMISSION ====" + "\n Address: " + msg1.value + "\n Working with an agent?: " + msg2.value + "\n Message: " + msg3.value + "\n" + msg.value;
                    return true;
                });
            }, 100);
            $('form.contact-us').submit();
        });
    });

    /////Buy a Home Form/////
    $(function () {
        $(buy).click(function () {
            if ($("#area").length) {
                var areaText = document.querySelector("#area").textContent;
            } else {
                var areaText = 'the area';
            }
            $("form.contact-us").submit(function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                hideContactBoxes();
                $(".rg-modal-contact h2").text('Buy a home in ' + areaText + ' with us');
                $("#message").val("Lead origin: " + currentURL);
                $("#message").after('<h3 id="address">What is your price range?</h3>');
                $("h3#address").after('<select name="pricerange" id="pricerange"><option value="$50,000-$250,000">$50,000-$250,000</option><option value="$250,000-$500,000">$250,000-$500,000</option><option value="$500,000-$800,000">$500,000-$800,000</option><option value="$800,000-$1,000,000">$800,000-$1,000,000</option><option value="$1,000,000-$1,500,000">$1,000,000-$1,500,000</option><option value="$1,500,000+">$1,500,000+</option></select>');
                $("select#pricerange").after('<h3 id="agent">Are you working with an agent?</h3>');
                $("h3#agent").after('<select name="agent" id="agent"><option value="No">No</option><option value="Yes">Yes</option></select>');
                $("select#agent").after('<h3 id="preapproved">Are you pre-approved for a loan?</h3>');
                $("h3#preapproved").after('<select name="preapproved" id="preapproved"><option value="No">No</option><option value="Yes">Yes</option><option value="I need to be pre-approved">I need to be pre-approved</option><option value="I am paying cash">I am paying cash</option></select>');
                $("select#preapproved").after('<h3 class="addcomments">Any specific needs?</h3>');
                $("h3.addcomments").after('<textarea id="addcomments" class="comments" rows="5" placeholder="At least 1,500sqft, at least 3 beds, etc. More info helps us help you better!"></textarea>');
            }, 1);
            setTimeout(function () {
                var _form = document.querySelector(".rg-modal-contact");
                $(".leftColumn input").click(function () {
                    var msg = document.querySelector("#message");
                    var msg2 = document.querySelector("select#agent");
                    var msg3 = document.querySelector("#addcomments");
                    var msg4 = document.querySelector("select#pricerange");
                    var msg5 = document.querySelector("select#preapproved");

                    msg.value = "--" + "\n ==== BUYER FORM SUBMISSION ====" + "\n Working with an agent?: " + msg2.value + "\n Pre-approved?: " + msg5.value + "\n Price Range: " + msg4.value + "\n Any specific needs?: " + msg3.value + "\n" + msg.value;
                    return true;
                });
            }, 100);
            $('form.contact-us').submit();
        });
    });

    ///// Area Home Form /////
    $(function () {
        $(area).click(function () {
            hideContactBoxes();
            var areaText = document.querySelector("#area").textContent;
            $("form.contact-us").submit(function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                $("#message").val("Lead origin: " + currentURL);
                $(".rg-modal-contact h2").text('Get help buying & selling in ' + areaText);
                $("#message").after('<h3 class="address">If you need to sell, what is your address?</h3>');
                $("h3.address").after('<textarea id="address" class="pac-target-input" rows="5" autocomplete="off" placeholder="123 Main St, ' + maincity + '"></textarea>');
                $("#address").after('<h3 class="agent">Are you working with an agent?</h3>');
                $("h3.agent").after('<select class="agent" name="agent" id="agent"><option value="Yes">Yes</option><option value="No">No</option></select>');
                $("select#agent").after('<h3 class="addcomments">Comments?</h3>');
                $("h3.addcomments").after('<textarea id="message2" class="comments" rows="5" placeholder="I need to sell soon. I have a new roof, etc."></textarea>');
            }, 1);
            setTimeout(function () {
                var _form = document.querySelector(".rg-modal-contact");
                $(".leftColumn input").click(function () {
                    var msg = document.querySelector("#message");
                    var msg1 = document.querySelector("#address");
                    var msg2 = document.querySelector("select#agent");
                    var msg3 = document.querySelector("#message2");

                    msg.value = msg.value + " | Address: " + msg1.value + " | Working with an agent?: " + msg2.value + " | Message: " + msg3.value;
                    return true;
                });
            }, 100);
            $('form.contact-us').submit();
        });
    });

    /////////////////////// Listing Page Forms ///////////////////////////////////
    var listingform = '<div class="small-12 medium-3 columns property-form light-theme">       <div class="property-form-cont">         <h6>Inquire or Start an Offer</h6>         <input type="text" name="first_name" placeholder="First Name">         <input type="text" name="last_name" placeholder="Last Name"><input type="email" name="email" placeholder="Email">         <a class="popup" id="listingbutton" href="/member/contact/"><button>Talk to Agent</button></a><a class="popup" id="startoffer" href="/member/contact/"><button>Get Pre-Approved</button></a><div class="miranda-lb errors">         </div>       </div>     </div>';
    var pendingform = '<div class="small-12 medium-3 columns property-form light-theme">       <div class="property-form-cont">         <h6>Inquire About This Pending Property</h6>         <input type="text" name="first_name" placeholder="First Name">         <input type="text" name="last_name" placeholder="Last Name"><input type="email" name="email" placeholder="Email">         <a class="popup" id="listingbutton" href="/member/contact/"><button>Get more info</button></a> <a href="/search/advanced_search/"><button>Search More Homes</button></a>      <div class="miranda-lb errors">         </div>       </div>     </div>';
    var soldform = '<div class="small-12 medium-3 columns property-form light-theme">       <div class="property-form-cont">         <h6>Inquire About This Sold Property</h6>         <input type="text" name="first_name" placeholder="First Name">         <input type="text" name="last_name" placeholder="Last Name"><input type="email" name="email" placeholder="Email">         <a class="popup" id="listingbutton" href="/member/contact/"><button>Get more info</button></a>     <div class="miranda-lb errors">         </div>       </div>     </div>';
    var pendingbanner = '<div class="statusbanner"><p>The seller has accepted an offer on this property. It is currently not available.</p></div>';
    var soldbanner = '<div class="statusbanner"><p>This property has been sold.</p></div>';

    //// Listing Statuses ////
    if ($(".prop-status-PENDING")[0]) {
        $('.fotorama')['after']($(pendingform));
        $(".slideshow").before(pendingbanner);
    } else if ($(".prop-status-CLOSED")[0] || $(".prop-status-SOLD")[0] || $(".sold-price-up")[0]) {
        $('.fotorama')['after']($(soldform));
        $(".slideshow").before(soldbanner);
    } else {
        $('.fotorama')['after']($(listingform));
    }
    var listingbutton = document.querySelector('a#listingbutton');
    var startoffer = document.querySelector('a#startoffer');
    var offerDescription = 'Please fill in as much details below to help us help you. A lender will be contacting you to review shortly after you inquire.';
    var listingInquiry = 'Please fill in as much details below so we can help you with any questions you have about this property. We will get back to you shortly.';

    /////Listing Page Home Form/////
    $(function () {
        $(listingbutton).click(function () {
            $("form.contact-us").submit(function (e) {
                e.preventDefault();
            });
            var listingname = document.querySelector('.property-form input[name="first_name"]').value;
            var listinglastname = document.querySelector('.property-form input[name="last_name"]').value;
            var listingemail = document.querySelector('.property-form input[name="email"]').value;
            if ($(".prop-address").length) {
                var propText = (document.querySelector(".prop-address").textContent);
            } else {
                var propText = 'this property';
            }
            setTimeout(function () {
                hideContactBoxes();
                $('#first-name').val(listingname);
                $('#last-name').val(listinglastname);
                $('#email').val(listingemail);
                $(".rg-modal-contact h2").text('Ask about ' + propText);
                $('p.contact-us-description').text(listingInquiry);
                $("#message").val("Lead origin: " + currentURL);
                $("#message").after('<h3 class="addcomments">Comments, Questions, Special Requests?</h3>');
                $("h3.addcomments").after('<textarea id="message2" class="comments" rows="5" placeholder="When can you tour next? How old is the roof? Etc."></textarea>');
            }, 1);
            setTimeout(function () {
                var _form = document.querySelector(".rg-modal-contact");
                $(".leftColumn input").click(function () {
                    var msg = document.querySelector("#message");
                    var msg1 = document.querySelector("#message2");

                    msg.value = msg.value + " | Comments: " + msg1.value;
                    return true;
                });
            }, 100);
            $('form.contact-us').submit();
        });
    });

    /////Start an Offer Form/////
    $(function () {
        $(startoffer).click(function () {
            var listingname = document.querySelector('.property-form input[name="first_name"]').value;
            var listinglastname = document.querySelector('.property-form input[name="last_name"]').value;
            var listingemail = document.querySelector('.property-form input[name="email"]').value;
            if ($(".prop-address").length) {
                var propText = (document.querySelector(".prop-address").textContent);
            } else {
                var propText = 'this property';
            }
            if ($("dd.price").length) {
                var propPrice = (document.querySelector("dd.price").textContent);
            } else {
                var propPrice = '$XXX,XXX';
            }
            $("form.contact-us").submit(function (e) {
                e.preventDefault();
            });
            setTimeout(function () {
                hideContactBoxes();
                $('#first-name').val(listingname);
                $('#last-name').val(listinglastname);
                $('#email').val(listingemail);
                $(".rg-modal-contact h2").text('Get Pre-Approved for ' + propText);
                $('p.contact-us-description').text(offerDescription);
                $("#message").after('<h3 id="agent">Are you working with an agent?</h3>');
                $("h3#agent").after('<select name="agent" id="agent"><option value="No">No</option><option value="Yes">Yes</option></select>');
                $("select#agent").after('<h3 id="preapproved">Are you pre-approved for a loan?</h3>');
                $("h3#preapproved").after('<select name="preapproved" id="preapproved"><option value="No">No</option><option value="Yes">Yes</option><option value="I need to be pre-approved">I need to be pre-approved</option><option value="I am paying cash">I am paying cash</option></select>');
                $("select#preapproved").after('<h3 class="addcomments">Any other questions?</h3>');
                $("h3.addcomments").after('<textarea id="addcomments" class="comments" rows="5" placeholder="Is there a offer review period? Do they have an inspection done? Etc."></textarea>');
            }, 1);
            setTimeout(function () {
                var _form = document.querySelector(".rg-modal-contact");
                $(".leftColumn input").click(function () {
                    var msg = document.querySelector("#message");
                    var msg2 = document.querySelector("select#agent");
                    var msg3 = document.querySelector("textarea#addcomments");
                    var msg5 = document.querySelector("select#preapproved");

                    msg.value = msg.value + " | Working with an agent?: " + msg2.value + " | Pre-approved?: " + msg5.value + " | Any questions?: " + msg3.value;
                    return true;
                });
            }, 100);
            $('form.contact-us').submit();
        });
    });

    $("span.number").each(function () {
        var $this = $(this);
        var $parent = $this.parents('.property');
        var $propertyThumb = $parent.find('.property-thumb');
        var text = $(this).text();
        if (text === 'PENDING') {
            $propertyThumb.addClass("pending");
        } else if (text === 'PENDING INSPECTION') {
            $propertyThumb.addClass("pendinginspection");
        }
    });

    /////////////////// Sign Up Form ///////////////////

    var singlePropCity = $('meta[property="og:locality"]').attr('content');
    var allFavBtns = document.querySelectorAll('.add_favorite_button');
    var allFavBtnsSearchPage = document.querySelectorAll('.search-results .add_favorite_button');
    var allSaveSearchBtns = document.querySelectorAll('.save-search');
    var allScheduleBtns = document.querySelectorAll('.schedule-showing a');

    /// Get Property City on Single Property Pages and capitalize
    function titleCase(str) {
        var splitStr = str.toLowerCase().split(' ');
        for (var i = 0; i < splitStr.length; i++) {
            splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
        }
        return splitStr.join(' ');
    }
    // Final City Result
    if (singlePropCity) {
        var metaCity = titleCase(singlePropCity);
    } else {
        var metaCity = "";
    }
    document.addEventListener('DOMContentLoaded', function () {
        if (document.querySelectorAll('meta[property="og:locality"]').length > 0) {
            setTimeout(function () {
                $(".rg-modal-signup h2").text('View this ' + metaCity + ' property & more exclusive listings.');
                clearInterval();
            }, 1);
            $(allFavBtns).on('click', function (e) {
                setTimeout(function () {
                    $(".rg-modal-signup h2").text('Save this ' + metaCity + ' property to your favorites.');
                }, 1);
            });
        }
    });

    $(allScheduleBtns).on('click', function (e) {
        setTimeout(function () {
            $(".rg-modal-signup h2").text('Tour this ' + metaCity + ' property with us.');
            $(".rg-modal-signup p:first-child").text("Please create an account first. We will reach out to confirm your requested date soon after.");
        }, 1);
    });

    $(allFavBtnsSearchPage).on('click', function (e) {
        setTimeout(function () {
            $(".rg-modal-signup h2").text('Save this property to your favorites.');
        }, 1);
    });
    $(allSaveSearchBtns).on('click', function (e) {
        setTimeout(function () {
            $(".rg-modal-signup h2").text('Create a saved search. Know about new listings before anyone.');
        }, 1);
    });


    if (document.querySelector("#market-snapshots")) {
        function marketSnap(areaType, areaMainCity) {
            var getHTML = function (url, callback) {
                // Feature detection
                if (!window.XMLHttpRequest) return;
                // Create new request
                var xhr = new XMLHttpRequest();
                // Setup callback
                xhr.onload = function () {
                    if (callback && typeof (callback) === 'function') {
                        callback(this.responseXML);
                    }
                }
                // Get the HTML
                xhr.open('GET', url);
                xhr.responseType = 'document';
                xhr.send();

            };

            const timeElapsed = Date.now();
            const today = new Date(timeElapsed);
            $('.today-date').text(today.toLocaleDateString());
            // up to 6 cities for market reports
            if (areaMainCity && document.querySelector("#market-snapshots")) {
                // get the details for market snapshots
                getHTML("/marketreport/?" + areaType + "=" + areaMainCity + "&list_price_min=50000&sold_within=6", function (response) {
                    if (response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(6)')[0]) {
                        var averageDOM = response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(6)')[0].innerText;
                        // Remove "days" and any leading/trailing whitespace
                        averageDOM = averageDOM.replace(/\s*days\s*/, '');
                    }
                    if (response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(4)')[0]) {
                        var averageLP = response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(4)')[0].innerText;
                    }
                    if (response.querySelectorAll('#market-report .row:last-of-type table tfoot tr td:nth-of-type(5)')[0]) {
                        var averageSP = response.querySelectorAll('#market-report .row:last-of-type table tfoot tr td:nth-of-type(5)')[0].innerText;
                    }

                    if (response.querySelectorAll('#market-report .row:nth-of-type(3) .result-count')[0]) {
                        var numberOfSL_array = response.querySelectorAll('#market-report .row:nth-of-type(3) .result-count')[0].innerText.split(" ").filter(Boolean);
                        var numberOfSL = numberOfSL_array[numberOfSL_array.indexOf('of') + 1];
                    }
                    if (response.querySelectorAll('#market-report .row:nth-of-type(1) .result-count')[0]) {
                        var numberOfAL_array = response.querySelectorAll('#market-report .row:nth-of-type(1) .result-count')[0].innerText.split(" ").filter(Boolean);
                        var numberOfAL = numberOfAL_array[numberOfAL_array.indexOf('of') + 1];
                    }
                    if (response.querySelectorAll('#market-report .row:nth-of-type(2) .result-count')[0]) {
                        var numberOfUL_array = response.querySelectorAll('#market-report .row:nth-of-type(2) .result-count')[0].innerText.split(" ").filter(Boolean);
                        var numberOfUL = numberOfUL_array[numberOfUL_array.indexOf('of') + 1];
                    }
                    if (!$(".oc-areas").length) {
                        if (response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(4)')[0]) {
                            document.querySelector("#market-snapshots .averageLP").innerText = averageLP;
                        }
                        if (response.querySelectorAll('#market-report .row:nth-of-type(3) .result-count')[0]) {
                            document.querySelector("#market-snapshots .numberOfSL").innerText = numberOfSL;
                        } else {
                            document.querySelector("#market-snapshots .numberOfSL").innerText = '0'
                        }
                        if (response.querySelectorAll('#market-report .row:last-of-type table tfoot tr td:nth-of-type(5)')[0]) {
                            document.querySelector("#market-snapshots .averageSP").innerText = averageSP;
                        }
                        if (response.querySelectorAll('#market-report table tfoot tr td:nth-of-type(6)')[0]) {
                            document.querySelector("#market-snapshots .averageDOM").innerText = averageDOM;
                        }
                        if (response.querySelectorAll('#market-report .row:nth-of-type(2) .result-count')[0]) {
                            document.querySelector("#market-snapshots .numberOfUL").innerText = numberOfUL;
                        }
                        else {
                            document.querySelector("#market-snapshots .numberOfUL").innerText = '0'
                        }
                        if (response.querySelectorAll('#market-report .row:nth-of-type(1) .result-count')[0]) {
                            document.querySelector("#market-snapshots .numberOfNL").innerText = numberOfAL;
                        } else {
                            document.querySelector("#market-snapshots .numberOfNL").innerText = '0'
                        }
                    }
                });
                // Get the current date
                var currentDate = new Date();

                // Create an array of month names
                var monthNames = [
                    "January", "February", "March", "April", "May", "June",
                    "July", "August", "September", "October", "November", "December"
                ];

                // Get the current month and year
                var currentMonth = monthNames[currentDate.getMonth()];
                var currentYear = currentDate.getFullYear();

                // Get all elements with the id "data-now"
                var dataNowElements = document.querySelectorAll("#data-now");

                // Loop through each element and update its content
                dataNowElements.forEach(function (element) {
                    // Create the desired text
                    var newText = currentMonth + " " + currentYear;

                    // Replace the text in the element
                    element.textContent = newText;
                });

            }
        }
    }






    if (document.querySelector('#area') && document.querySelector('#area').innerText.length > 2) {
        var areaElements = document.getElementsByClassName("area-name");
        areaLen = areaElements !== null ? areaElements.length : 0;
        for (i = 0; i < areaLen; i++) {
            areaElements[i].innerText = document.querySelector('#area').innerText;
        }
    }

    if (document.querySelector('.property.featured')) {
        var wrapper = null;
        if (document.querySelector('#featured-three-slides')) {
            wrapper = document.querySelector('#featured-three-slides');
            var featuredProperties = document.querySelectorAll('.property.featured');
            if (document.querySelector('#fp-replacement') && document.querySelector('#fp-replacement').innerText == "") {
                var featuredTitle = "Featured Properties";
                if (document.querySelector('.fp-header') && document.querySelector('.fp-header').innerText != "") {
                    featuredTitle = document.querySelector('.fp-header').innerText;
                }
                document.querySelector('#fp-replacement').innerText = featuredTitle;
            }

            featuredProperties.forEach(function (item) {
                item.classList.add("tile");
                item.classList.remove("row");
                wrapper.appendChild(item);
            })
        } else if (document.querySelector('#featured-listings-show')) {
            featuredListingShow();
            wrapper = document.querySelector('#featured-listings-show');
        }
        else {
            // Find all .property.featured elements and clone them
            const featuredProperties = document.querySelectorAll('.property.featured');
            const clonedProperties = Array.from(featuredProperties).map(property => property.cloneNode(true));

            // Find the .fp-header element and clone it
            const fpHeader = document.querySelector('.fp-header');
            const clonedHeader = fpHeader.cloneNode(true);

            // Find the .pagination_wrapper element
            const paginationWrapper = document.querySelector('.pagination_wrapper');

            // Create a new "featured-properties" element
            const featuredPropertiesContainer = document.createElement('div');
            featuredPropertiesContainer.classList.add('featured-properties');

            // Append the cloned fp-header element and cloned properties to the new container
            featuredPropertiesContainer.appendChild(clonedHeader);
            clonedProperties.forEach(property => featuredPropertiesContainer.appendChild(property));

            // Append the pagination wrapper to the new container
            if (paginationWrapper) {
                featuredPropertiesContainer.appendChild(paginationWrapper);
            }

            // Insert the new "featured-properties" element before the old .fp-header element in the DOM
            fpHeader.parentNode.insertBefore(featuredPropertiesContainer, fpHeader);


        }
    }

    if (document.querySelector('#condo-pages') && !document.querySelector('.property.featured')) {
        var noListings = '<div id="no-listings">There are currently no active listings in this building. <a href="#sell-form">Please inquire</a> to find out if there are any off market properties, or if you have any general questions</div>'
        $(noListings).insertBefore('#listing-alerts')
    }

    document.addEventListener("DOMContentLoaded", function () {
        if (window.location.pathname === "/cma/property-valuation/") {
            const div = document.createElement("div");
            const link = document.createElement("a");
            link.href = "/";
            link.textContent = "Go back to homepage";
            div.appendChild(link);
            const topbar = document.querySelector(".topbar .small-12");
            topbar.appendChild(div);
        }
    });



    ////END BRACKET
}
