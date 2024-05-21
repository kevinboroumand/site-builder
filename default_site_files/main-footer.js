if (a_x092969) {

    // Custom Message Params /////
    var msgparam = new Proxy(new URLSearchParams(window.location.search), {
        get: (searchParams, prop) => searchParams.get(prop),
    });
    let customListingResultHeader = msgparam.msg;
    if (customListingResultHeader) {
        const propertiesFoundAlt = document.querySelector(".properties-found-alt");
        if (customListingResultHeader.length > 0 && propertiesFoundAlt) {
            document.getElementById("ch2").textContent = customListingResultHeader;
        } else if (customListingResultHeader.length > 0 && !propertiesFoundAlt) {
            var headerCode = document.createElement("div");
            headerCode.className = "properties-found-alt";
            headerCode.style.paddingLeft = "0px";
            var headerTitle = document.createElement("h2");
            headerTitle.className = "h2";
            headerTitle.id = "ch2";
            headerTitle.style.fontSize = "1.5rem";
            headerTitle.style.fontWeight = "bold";
            headerTitle.textContent = customListingResultHeader;

            headerCode.appendChild(headerTitle);

            var resultsList = document.querySelector(".results-list");
            if (resultsList) {
                resultsList.parentNode.insertBefore(headerCode, resultsList);
            }
        }
    }

    if (document.querySelector('.property-page')) {
        let preventScrollToTop = function (event) {
            window.scrollTo(0, 10);
        };

        window.addEventListener('scroll', function () {
            if (window.scrollY === 0) {
                window.requestAnimationFrame(preventScrollToTop);
            }
        });
    }



    // Move property disclaimer to the footer ///////////////////////////////
    document.addEventListener('DOMContentLoaded', function () {
        if (document.getElementById('proplist_disclaimer')) {
            var proplistDisc = document.querySelector('#proplist_disclaimer');
            var footerProp = document.querySelector('#agent-specific');
            footerProp.parentNode.insertBefore(proplistDisc, footerProp);
            proplistDisc.style.display = 'block';
        }
    });

    /// Add valuation script to head if does not exist
    if (!document.querySelector('head script[src*="valuation"]') && document.querySelector('rg-valuation-root')) {
        (function () {
            var rg = document.createElement('script');
            rg.type = 'text/javascript';
            rg.async = true;
            rg.src = 'https://widgets.realgeeks.com/static/js/valuation_v4.min.js';
            var s = document.getElementsByTagName('script')[0];
            s.parentNode.insertBefore(rg, s);
        })();
    }

    if (document.querySelector('.area-page-about') && document.querySelector('.area-page-about').offsetHeight > 400) {
        document.querySelector('.area-page-about').classList.add('collapsed');
        learnMore = document.createElement('button');
        learnMore.classList.add('learn-more');
        learnMore.innerText = "Read more";
        learnMore.setAttribute('onclick', 'closeLearnMore()');

        document.querySelector('.area-page-about').appendChild(learnMore);

    }

    // Formatting Featured Properties Section
    function featuredListingShow() {

        if (document.querySelector('.property.featured')) {

            var featuredProperties = '<div class="featured-listings-show"><div class="container padding-80"><div class="featured-listings-show-slider">';

            var properitesHtml = document.querySelectorAll('.property.featured');

            for (var i = 2; i < properitesHtml.length; i++) {
                var propertySort = '.property.featured:nth-of-type(' + (i) + ')';
                var propertyAddress = document.querySelectorAll(propertySort + ' .address')[0].innerText;
                var propertyBg = "https://t.realgeeks.media/resize/2000x650/https://" + document.querySelectorAll(propertySort + ' img')[0].src.split('182x144/')[1];
                var propertyPrice = document.querySelectorAll(propertySort + ' .price')[0].innerText;
                var propertyAbout = document.querySelectorAll(propertySort + ' .featured-property-description p')[0].innerText;
                var propertyLink = document.querySelectorAll(propertySort + ' .property-thumb a')[0].href;
                var featuredTitle = "Featured Properties";
                if (document.querySelector('.fp-header').innerText != "") {
                    featuredTitle = document.querySelector('.fp-header').innerText;
                }
                var listMaxPrice = (propertyPrice.match(/\d/g).join('')) * 110 / 100;
                var viewSimilarListingsLink = "/search/results/?list_price_max=" + listMaxPrice;
                if (document.querySelector('#featured-listings-show').getAttribute('href')) {
                    viewSimilarListingsLink = document.querySelector('#featured-listings-show').getAttribute('href');
                }


                featuredProperties += '<div class="featured-listings-show-slider-item tile">' +
                    '            <div class="featured-listings-show-slider-image">' +
                    '               <a href="' + propertyLink + '"></a>' +
                    '               <img src="' + propertyBg + '" sizes="100vw">' +
                    '            </div>' +
                    '            <div class="featured-listings-show-slider-info">' +
                    '               <div class="featured-listings-show-slider-headline pre-title">' + featuredTitle +
                    '               </div>' +
                    '               <h2>' +
                    '                  ' + propertyAddress + '' +
                    '               </h2>' +
                    '               <span class="featured-listings-show-slider-price">' + propertyPrice + '</span>' +
                    '               <ul>';

                var featuredDetails = document.querySelectorAll(propertySort + ' .featured-details ul li');

                for (var i1 = 1; i1 < featuredDetails.length; i1++) {
                    var featuredDetailsSort = propertySort + ' .featured-details ul li:nth-of-type(' + (i1) + ')';
                    var featuredDetailNumber = document.querySelectorAll(featuredDetailsSort + ' .number')[0].innerText;
                    var featuredDetailTitle = document.querySelectorAll(featuredDetailsSort + ' .detail-title')[0].innerText;
                    featuredProperties += '              <li>' + featuredDetailNumber + ' ' + featuredDetailTitle + '</li>';
                    if (featuredDetailTitle == "Beds") {
                        viewSimilarListingsLink += "&beds_min=" + featuredDetailNumber;
                    }
                    if (featuredDetailTitle == "Baths") {
                        viewSimilarListingsLink += "&baths_min=" + featuredDetailNumber;
                    }
                }
                viewSimilarListingsLink += "&sort_latest=true";
                featuredProperties += '               </ul>' +
                    '               <div class="featured-listings-show-button-container">' +
                    '                  <a href="' + propertyLink + '" class="btn btn--primary-light ">View Listing</a>' +
                    '                  <a href="' + viewSimilarListingsLink + '" class="btn btn--secondary-dark button-one">' +
                    '                  View Similar Properties' +
                    '                  </a>' +
                    '               </div>' +
                    '            </div>' +
                    '         </div>';
            }

            featuredProperties += '</div></div></div>';

            if (document.querySelector("#featured-listings-show.pinned")) {
                if (document.querySelector('.body-container *:first-of-type').tagName == "H2") {
                    document.querySelector("#quicksearch-section").insertAdjacentHTML('afterend', featuredProperties);
                } else {
                    document.querySelector(".body-container").insertAdjacentHTML('afterend', featuredProperties);
                }
            } else {
                document.querySelector("#featured-listings-show").innerHTML = featuredProperties;
            }
        }
    }

    // Add Navigaton Bar
    if (document.querySelector(".top-nav")) {
        var sidebarnavlinks = '<ul class="sidemenu__nav">';
        for (var i = 1; i < document.querySelectorAll('nav.top-nav .nav li').length + 1; i++) {
            var textContent = document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').textContent;
            var link = document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('href');
            var popupclassname = '';
            if (document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('class') && document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('class').includes('popup')) {
                popupclassname = 'popup';
            }
            sidebarnavlinks += '<li class="sidemenu__nav-item"><a href="' + link + '" class="sidemenu__nav-link ' + popupclassname + '">' + textContent + '</a></li>';
        }
        sidebarnavlinks += "</ul>";

        var topNavLinks = '<ul>';
        for (var i = 1; i < document.querySelectorAll('nav.top-nav .nav li').length + 1; i++) {
            var textContent = document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').textContent;
            var link = document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('href');
            var popupclassname = '';
            if (document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('class') && document.querySelector('nav.top-nav .nav li:nth-of-type(' + i + ') a').getAttribute('class').includes('popup')) {
                popupclassname = 'popup';
            }
            topNavLinks += '<li class="navigation__item"><a href="' + link + '" class="nav-ink ' + popupclassname + '">' + textContent + '</a></li>';
        }
        topNavLinks += "</ul>";

        var vgnavinner = '<nav id="vg-navbar">' +
            '   <header class="header">';

        if (document.querySelector('#content-banner-hide-1')) {
            vgnavinner += '<div id="content-banner-hide-1" class="content-banner--container content-banner" role="banner">';
            vgnavinner += document.querySelector('#content-banner-hide-1').innerHTML;
            vgnavinner += "<style>.content-banner--container {height: 43px;}nav#vg-navbar:not(.showoriginalnav):not(.firsttopnav) {top: -143px;} @media (max-width: 700px){.content-banner--container {height: 75px;} nav#vg-navbar:not(.showoriginalnav):not(.firsttopnav) {top: -150px;}}@media only screen and (max-width: 737px){.hoz-inside {padding: 200px 24px 45px;}}</style></div>";
        }

        vgnavinner += '      <div class="container header__container">' +
            '         <div class="navbar">' +
            '            <a href="/">' +
            '              <div class="logo">' +
            '              </div>' +
            '            </a>' +
            '            <div class="navigation-wrapper">' +
            '               <div class="navigation">' + topNavLinks +
            '               </div>' +
            '               <button type="button" class="hamburger-component hamburger" onclick="toggleSidebarNav()">' +
            '               menu' +
            '               <span class="hamburger__bars"></span>' +
            '               </button>' +
            '               <div class="account-desktop closed no-icon"><button>Account</button></div>' +
            '            </div>' +
            '         </div>' +
            '      </div>' +
            '   </header>' +
            '</nav>' +
            '' +
            '' +
            '<div id="overlay-sidemenu-black"></div>' +
            '<div id="global-sidemenu" class="sidemenu">' +
            '   <div class="redesign sidemenu__wrap">' +
            '      <div class="sidemenu__header">' +
            '         <button class="sidemenu__close toggle" onclick="toggleSidebarNav()"></button>' +
            '      </div>' +
            '      <div class="sidemenu-footer">' +
            '         <ul class="socials grey-socials ">' +
            '            <li>' +
            '               <a onclick="toggleLoginPopup()" title="Login or Signup" aria-label="Login or Signup" class="socials__link"><i class="fas fa-user-circle"></i>Account</a>' +
            '            </li>' +
            '            <li>' +
            '               <a href="/member/contact/" data-type="CONTACT_US" class="socials__link popup"><i class="fas fa-phone-alt"></i>' +
            '               Contact Us' +
            '               </a>' +
            '            </li>' +
            '         </ul>' +
            '      </div>' +
            '      <div class="sidemenu">' + sidebarnavlinks + '</div>' +
            '   </div>' +
            '</div>';

        let vgnav = document.createElement("div");
        vgnav.innerHTML = vgnavinner;

        document.querySelector('body').prepend(vgnav);
        vgnav.outerHTML = vgnav.innerHTML


        // document.querySelector('.banner-navbar--container').remove();

        function toggleSidebarNav() {
            if (!document.querySelector('#global-sidemenu').className.includes('visible')) {
                document.querySelector('#global-sidemenu').classList.add('visible');
                document.querySelector('#overlay-sidemenu-black').classList.add('visible');
                document.querySelector('body').style.overflow = "hidden";
            } else {
                document.querySelector('#global-sidemenu').classList.remove('visible');
                document.querySelector('#overlay-sidemenu-black').classList.remove('visible');
                document.querySelector('body').style.overflow = "initial";
            }
        }

        function toggleLoginPopup() {
            document.querySelector('nav.top-nav .user-contact-icons li.user').click();
        }

        document.addEventListener('DOMContentLoaded', function () {
            $("#overlay-sidemenu-black").click(function () {
                toggleSidebarNav()
            });
            $("nav.top-nav .nav-container .user-popup").click(function (e) {
                const target = $(e.target);
                if (target.is('div.user-popup.show')) {
                    toggleLoginPopup()
                }
            });
        });

        styleNav();

        function styleNav() {
            if (
                document.querySelector("#quicksearch-section") && !document.querySelector("#quicksearch-section.no-search.no-image") && !window.location.pathname.startsWith("/blog/")) {
                ////// Clear Nav continue... //////////
                var mirandaWrapper = document.querySelector(".miranda-wrapper");
                var quickSearchSection = document.querySelector("#quicksearch-section");
                if (document.querySelector(".hoz-inside")) {
                    var hozInside = document.querySelector(".hoz-inside");
                }
                var logo = document.querySelector(".logo");
                var topNavAnshors = document.querySelectorAll(".header a");
                var topNav = document.querySelector(".header");
                var vgNav = document.querySelector("#vg-navbar");
                if (!mirandaWrapper.classList.contains('clearnav') && window.scrollY < 100) {
                    if (document.querySelector(".hoz-inside")) {
                        hozInside.classList.add("clearnav");
                    }
                    mirandaWrapper.classList.add("clearnav");
                    quickSearchSection.classList.add("clearnav");
                    logo.classList.add("clearnav");
                    for (i = 0; i < topNavAnshors.length; i++) {
                        topNavAnshors[i].classList.add("clearnav");
                    }

                    mirandaWrapper.classList.add("clearnav");
                    topNav.classList.add("clearnav");
                    vgNav.classList.add("clearnav");
                }

                var scrollYBefore = 0;
                document.addEventListener('scroll', function () {
                    if (window.scrollY >= 100) {
                        if (document.querySelector(".hoz-inside")) {
                            hozInside.classList.remove("clearnav");
                        }
                        mirandaWrapper.classList.remove("clearnav");
                        logo.classList.remove("clearnav");
                        for (i = 0; i < topNavAnshors.length; i++) {
                            topNavAnshors[i].classList.remove("clearnav");
                        }
                        topNav.classList.remove("clearnav");
                        topNav.classList.add("navshadow");
                        vgNav.classList.remove("clearnav");
                        if (scrollYBefore > window.scrollY) {
                            document.querySelector('nav#vg-navbar .header').classList.add("showoriginalnav");
                            document.querySelector('nav#vg-navbar').classList.add("showoriginalnav");
                            document.querySelector('.banner-navbar--container').classList.add("showoriginalnav");
                        } else {
                            document.querySelector('nav#vg-navbar .header').classList.remove("showoriginalnav");
                            document.querySelector('nav#vg-navbar').classList.remove("showoriginalnav");
                            document.querySelector('.banner-navbar--container').classList.remove("showoriginalnav");
                        }
                        scrollYBefore = window.scrollY;
                    } else if (window.scrollY <= 100) {
                        mirandaWrapper.classList.add("clearnav");
                        if (document.querySelector(".hoz-inside")) {
                            hozInside.classList.add("clearnav");
                        }
                        mirandaWrapper.classList.add("clearnav");
                        logo.classList.add("clearnav");
                        for (i = 0; i < topNavAnshors.length; i++) {
                            topNavAnshors[i].classList.add("clearnav");
                        }
                        topNav.classList.add("clearnav");
                        topNav.classList.remove("navshadow");
                        vgNav.classList.add("clearnav");
                    }
                });
            } else {
                var topNav = document.querySelector(".header");
                var vgNav = document.querySelector("#vg-navbar");
                vgNav.classList.add("noclearnav");
                if (window.scrollY <= 100) {
                    vgNav.classList.add("firsttopnav");
                }
                var scrollYBefore = 0;
                document.addEventListener('scroll', function () {
                    if (window.scrollY >= 100) {
                        topNav.classList.add("navshadow");
                        vgNav.classList.remove("firsttopnav");
                        if (scrollYBefore > window.scrollY) {
                            document.querySelector('nav#vg-navbar .header').classList.add("showoriginalnav");
                            document.querySelector('nav#vg-navbar').classList.add("showoriginalnav");
                            document.querySelector('.banner-navbar--container').classList.add("showoriginalnav");
                        } else {
                            document.querySelector('nav#vg-navbar .header').classList.remove("showoriginalnav");
                            document.querySelector('nav#vg-navbar').classList.remove("showoriginalnav");
                            document.querySelector('.banner-navbar--container').classList.remove("showoriginalnav");
                        }
                        scrollYBefore = window.scrollY;
                    } else if (window.scrollY <= 100) {
                        topNav.classList.remove("navshadow");
                        vgNav.classList.add("firsttopnav");
                    }
                });
            }
        }
    }


    // set dynamic background for quick search section
    if (window.innerWidth <= 737 && document.querySelector("#quicksearch-section") && !document.querySelector("#quicksearch-section.no-search")) {

        // Get the style element inside #quicksearch-section
        var quickSearchStyle = document.querySelector('#quicksearch-section style');

        // Get the background image URL from the style element
        var backgroundImageUrl = quickSearchStyle.textContent.match(/url\('(.*)'\)/)[1];

        document.querySelector('#quicksearch-section').style.setProperty("background", 'url("' + backgroundImageUrl + '") no-repeat scroll 50% 0% / cover padding-box border-box', "important");
        document.querySelector('#quicksearch-section').style.setProperty("background-size", 'cover', '!important');
    }

    // Add class for drop down search section
    var quickSearchForm = document.querySelector('#quicksearch-section form.autocomplete-form');

    if (document.querySelector('section#quicksearch-section .hoz-inside') && typeof quickSearchForm === 'undefined' || !quickSearchForm) {
        document.querySelector('#quicksearch-section').classList.add('dropsearch');
        // Create a new element with the given HTML string
        var advDiv = document.createElement('div');
        advDiv.innerHTML = '<div class="advanced-dropdown"><div class="inner-content"><div class="hero-ctas"><a href="/search/advanced_search/" class=""><button>Advanced Search</button></a></div></div></div>';

        // Select the target element
        var dropForm = document.querySelector('.dropsearch form');

        // Append the new element to the target element
        if (dropForm) {
            dropForm.appendChild(advDiv);
        }
    }

    // Bottom CTA addition
    document.addEventListener('DOMContentLoaded', function() {
        var bottomNavLinks = ''; // Initialize a string to store the HTML
        for (var i = 1; i <= document.querySelectorAll('.small-12.medium-8.columns.footer-section li').length; i++) {
            var textContent = document.querySelector('.small-12.medium-8.columns.footer-section li:nth-of-type(' + i + ') a').textContent;
            var link = document.querySelector('.small-12.medium-8.columns.footer-section li:nth-of-type(' + i + ') a').getAttribute('href');
            var popupclassname = '';
            if (document.querySelector('.small-12.medium-8.columns.footer-section li:nth-of-type(' + i + ') a').classList.contains('popup')) {
                popupclassname = 'popup';
            }
            bottomNavLinks += '<li><a href="' + link + '" class="' + popupclassname + '">' + textContent + '</a></li>';
        }
        
        // Append the generated HTML inside the .sitemap-column-left.user-links element
        document.querySelector('.sitemap-column-left.user-links').innerHTML += bottomNavLinks;
        
        });

    // Diamond Search Box //////////////////////////////////////////////////

    if (document.querySelector('section#quicksearch-section .autocomplete-form') && quickSearchForm) {
        // Get all elements with the class "hs-row"
        const rows = document.querySelectorAll('form.hs-row');

        rows.forEach(row => {
            row.style.display = 'none';
        });

        var diamondHTML = `
            <div id="diamond-search"><button type="button" for="tags-form"" class="active">Find a Home </button><button type="button" for="address">Home Value</button><button type="button" for="address-sell">Sell</button> <form action="/search/results/" id="tags-form" class="hs-row autocomplete-form active"><div class="search-section autocomplete-search-section"><div id="autocomplete-search-container" class="styled-select"><span class="error" style="display:none"></span><div id="move-form"></div>
            <button id="tags-diamond-search-btn">Search</button></div></div></form><form id="address" action="/cma/property-valuation/verify/" method="post" target="_parent"><input id="raw-address" name="s" class="typeahead tt-input" dir="auto" spellcheck="false" autocomplete="off" type="text" placeholder="Enter your address"><button type="button" id="diamond-search-btn">Continue</button><input id="street_number" name="address__street_number" type="hidden"> <input id="street_name" name="address__street_name" type="hidden"> <input id="unit_number" name="address__unit_number" type="hidden"> <input id="zip" name="address__zip" type="hidden"> <input id="city" name="address__city" type="hidden"> <input id="state" name="address__state" type="hidden"> <input id="country" name="address__country" type="hidden"> <input id="formatted" name="address__formatted" type="hidden"> <input name="raw__address" type="hidden"> <input name="raw__unit" type="hidden"></form><form id="address-sell"><input id="raw-address-sell" name="s" class="typeahead tt-input pac-target-input" dir="auto" spellcheck="false" autocomplete="off" type="text" placeholder="Enter your address"><a id="sell-one" class="popup" href="/member/contact/"><button type="button" id="diamond-search-btn">Continue</button></a></form></div>
            `

        document.querySelector('section#quicksearch-section .hoz-inside').insertAdjacentHTML('beforeend', diamondHTML);
        // Select the form with class 'autocomplete-form'
        var form = document.querySelector('.autocomplete-form');

        // Append the form to a new parent element
        // Replace 'newParentSelector' with the actual selector of the new parent element
        var newParent = document.querySelector('#move-form');
        newParent.appendChild(form);
        // Set the form to display: block
        form.style.display = 'block';


        var shrinksearchcontent = "Find homes first. Tour homes fast.";
        if (document.querySelector('#shrinknav')) {
            shrinksearchcontent = document.querySelector('#shrinknav').innerHTML;
        }

        document.addEventListener("DOMContentLoaded", function (event) {
            // switch between buy and sell in diamond search
            $('#diamond-search > button').click(function (e) {
                e.preventDefault();
                if (!$(this).hasClass('active')) {
                    $('#diamond-search > button').removeClass('active');
                    $(this).addClass('active');
                    $('#diamond-search form').removeClass('active');
                    $('#diamond-search form#' + $(this).attr('for')).addClass('active');

                    if ($(this).attr("for") == "tags-form") {
                        document.querySelector('#shrinknav').innerHTML = shrinksearchcontent;
                    } else if ($(this).attr("for") == "address") {
                        document.querySelector('#shrinknav').innerHTML = "See your " + mainarea + " home value";
                    } else if ($(this).attr("for") == "address-sell") {
                        document.querySelector('#shrinknav').innerHTML = "Sell your " + mainarea + " home for the best price";
                    }

                }
            })
        });
    }

}
