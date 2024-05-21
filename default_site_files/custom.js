////// CUSTOM BLOG ////////////////////////////////////////////////////////////////////////////////////////////////////
if (a_x092969) {
  ///// BLOG  ////////////////////////////////////////////////////////////////////////////////////////////////////
  if (location.href.indexOf("/blog/") != -1) {
    document.addEventListener('DOMContentLoaded', (event) => {

      ///// Progress Bar Scroll
      let processScroll = () => {
        let docElem = document.documentElement,
          docBody = document.querySelector('.blog-post'),
          scrollTop = docElem['scrollTop'] || docBody['scrollTop'],
          scrollBottom = (docElem['scrollHeight'] || docBody['scrollHeight']) - window.innerHeight,
          scrollPercent = scrollTop / scrollBottom * 100 + '%';
        document.getElementById("progress-bar").style.setProperty("--scrollAmount", scrollPercent);
      }
      document.addEventListener('scroll', processScroll);
      $(document).ready(function () {
        var shareMenu = document.querySelector('.share-menu');
        var facebookLinks = shareMenu.querySelectorAll('a[href*="facebook.com"]');
        var twitterLinks = shareMenu.querySelectorAll('a[href*="twitter.com"]');
        var linkedinLinks = shareMenu.querySelectorAll('a[href*="linkedin.com"]');
        if ($('#subscribe').length) {
          var youtubeLinks = document.querySelector('#subscribe').href;
        }

        var facebookHrefs = [];
        for (var i = 0; i < facebookLinks.length; i++) {
          facebookHrefs.push(facebookLinks[i].getAttribute('href'));
        }

        var twitterHrefs = [];
        for (var i = 0; i < twitterLinks.length; i++) {
          twitterHrefs.push(twitterLinks[i].getAttribute('href'));
        }

        var linkedinHrefs = [];
        for (var i = 0; i < linkedinLinks.length; i++) {
          linkedinHrefs.push(linkedinLinks[i].getAttribute('href'));
        }

        if (window.location.pathname > '/blog/' && document.location.href.indexOf('category') === -1 && !$('.blog.article').length) {
          $('body').append('<div id="progress-bar"></div>');
          if ($('#subscribe').length) {
            $('.blog-post .title').after('<div class="sidesocials"><a class="yt" href="' + youtubeLinks + '" target="blank" style=""><em class="fa fa-youtube fa-fw" style=""><span style="display: none;">Facebook</span></em></a><a class="fb" href="' + facebookHrefs + '" target="blank" style=""><em class="fa fa-facebook fa-fw" style=""><span style="display: none;">Facebook</span></em></a><a class="linkedin" href="' + linkedinHrefs + '" target="blank"><em class="fa fa-linkedin"><span style="display: none;">LinkedIn</span></em></a><a class="twitter" href="' + twitterHrefs + '" target="blank"><em class="fa fa-twitter"><span style="display: none;">Twitter</span></em></a></div>')

          } else if (!$('#subscribe').length) {
            $('.blog-post .title').after('<div class="sidesocials"><a class="fb" href="' + facebookHrefs + '" target="blank" style=""><em class="fa fa-facebook fa-fw" style=""><span style="display: none;">Facebook</span></em></a><a class="linkedin" href="' + linkedinHrefs + '" target="blank"><em class="fa fa-linkedin"><span style="display: none;">LinkedIn</span></em></a><a class="twitter" href="' + twitterHrefs + '" target="blank"><em class="fa fa-twitter"><span style="display: none;">Twitter</span></em></a></div>')

          }
        }
      });
      if (
        window.location.pathname === '/blog/' ||
        window.location.pathname.indexOf('/blog/category/') === 0 ||
        /^\/blog\/[^/]+\/[^/]+\//.test(window.location.pathname)
      ) {
        $(document).ready(function () {
          $(".body-content.blog").addClass("vg-blog-home");
          var categories = {}; // Store category counts
          var totalPosts = 0;
          // Find all .blog-post .post-content elements
          var currentURL = window.location.pathname;
          $(".blog-post").each(function () {
            // Existing code for categories
            var category = $(this).find(".category a").text().trim();

            // Skip this iteration if the category is "Exclusive Listings"
            if (category === "Exclusive Listings" && currentURL !== "/blog/category/exclusive-listings/") {
              $(this).css("display", "none");
              return true; // Continue to the next iteration
            }

            if (currentURL !== "/blog/category/exclusive-listings/") {
              $(".body-content .sidebar li").each(function () {
                if ($(this).text().trim() === "Exclusive Listings") {
                  $(this).css("display", "none");
                }
              });
            }

            var titleElement = $(this).find(".title");
            var titleText = titleElement.text();
            var titleLink = titleElement.find("a").attr("href");
            titleElement.remove();

            var postContent = $(this).find(".post-content");
            var blogMain = postContent.find(".blog-main");
            var firstImg = postContent.find("img").first();
            var imgUrl = firstImg.attr("src");

            /// OPEN HOUSE SIGN IN ////////////////////////////////////////////////////////////////
            if ($('.property-page')) {
              document.addEventListener('DOMContentLoaded', function () {
                var currentPropURL = window.location.href;
                var addOpenHouseLink = "?openhouse=Yes";
                var openHouseLink = currentPropURL + addOpenHouseLink;
                var par = new Proxy(new URLSearchParams(window.location.search), {
                  get: (searchParams, prop) => searchParams.get(prop),
                });
                let openhouse = par.openhouse;
                var openhouseaddress = $(".prop-address").text();
                fixedAddress = openhouseaddress.replace(/^\s+|\s+$/g, '');
                setTimeout(function () {
                  if ($("h2.user-title").length) {
                    $('<div class="small-12 columns"><div class="row"><a class="openhousesignin" href="' + openHouseLink + '">Open House Sign-In</a></div></div>').appendTo(".property-page");
                  }
                  if (openhouse == "Yes" && $("h2.user-title").length) {
                    var firstImage = $('.slideshow img').prop('src');
                    setTimeout(function () {
                      $(".sub-bar a.popup").click();
                      setTimeout(function () {
                        $(".rag-modal-close").hide();
                        var elements = document.querySelectorAll(".contact-us input");
                        for (var ii = 0; ii < elements.length; ii++) {
                          if (elements[ii].type == "text") {
                            elements[ii].value = "";
                          }
                        }
                        $("input#email").val("");
                        $(".rg-modal-contact").addClass("openhouse");
                        $(".miranda-lb h2").addClass("openhouseh2");
                        $('<h3>Please Sign In</h3>').insertAfter(".miranda-lb h2");
                        $(".miranda-lb h2").text('Welcome to ' + openhouseaddress);
                        $('.rag-modal-backdrop').css({
                          "background-image": "url(" + firstImage + ")",
                          "background-size": "cover"
                        });
                        $(".openhouse .contact-us textarea").val("I am visiting your open house at " + fixedAddress + ". Thank you!")
                        $('.leftColumn input').click(function () {
                          setTimeout(function () {
                            if ($('.miranda-lb h2:contains("Thanks")')) {
                              $(".openhouseh2").text("Enjoy your visit!");
                              $(".miranda-lb h3").hide();
                              setTimeout(function () {
                                location.reload();
                              }, 1000);
                            }
                          }, 200);
                        });
                      }, 800);
                    }, 1);
                  }
                }, 500);
              });
            }

            // Appending the specified URL to the existing src of the image
            var newImgUrl = "https://t.realgeeks.media/resize/1000x500/" + imgUrl;
            firstImg.attr("src", newImgUrl);

            // Find the first non-empty paragraph
            var firstParagraph = "";
            var paragraphs = this.querySelectorAll("p");
            for (var i = 0; i < paragraphs.length; i++) {
              var paragraphText = paragraphs[i].textContent.trim();
              if (paragraphText.length > 0) {
                firstParagraph = paragraphText;
                break;
              }
            }

            var readMore = '<a href="' + titleLink + '"><button>Read More</button></a>';

            if (blogMain.length > 0) {
              postContent.wrap('<a href="' + titleLink + '"></a>');
              postContent.empty().append(blogMain.wrap("<a class='blog-has-img' href='" + titleLink + "'></a>").parent());
              postContent.append("<div class='vg-blog-box'><h2>" + titleText + "</h2><p>" + firstParagraph + "</p>" + readMore + "</div>");
            } else if (firstImg.length > 0 && !$(this).find(".blog-main").length) {
              postContent.wrap('<a href="' + titleLink + '"></a>');
              postContent.empty().append(firstImg.wrap("<a class='blog-has-img' href='" + titleLink + "'></a>").parent());
              postContent.append("<div class='vg-blog-box'><h2>" + titleText + "</h2><p>" + firstParagraph + "</p>" + readMore + "</div>");
            } else {
              postContent.wrap('<a href="' + titleLink + '"></a>');
              postContent.empty().append("<a href='" + titleLink + "'><h2 class='blog-no-img'>" + titleText + "</h2></a>");
              postContent.append("<div class='vg-blog-box'><h2>" + titleText + "</h2><p>" + firstParagraph + "</p>" + readMore + "</div>");
            }

            // Further category logic, if you have any
            if (!categories[category]) {
              categories[category] = 1;
            } else {
              categories[category]++;
            }
            totalPosts++;
          });


          // Dynamic Category Changer //////////////

          // Dynamically build categories object from existing blog posts on the page
          var categories = {};
          $(".blog-post").each(function () {
            var post = $(this);
            post.find(".category a").each(function () {
              var category = $(this).text().trim();
              if (!categories[category]) {
                categories[category] = 0;
              }
              categories[category]++;
            });
          });

          // Generate category buttons
          var totalPosts = $(".blog-post").length;
          var categoryButtons = '<div class="category-buttons">';
          categoryButtons += '<button data-category="all" class="active">All (' + totalPosts + ')</button>';

          $.each(categories, function (category, count) {
            categoryButtons += '<button data-category="' + category + '">' + category + ' (' + count + ')</button>';
          });

          categoryButtons += '</div>';
          $("#cat-container").html(categoryButtons);



          var categoryButtonsContainer = $(categoryButtons);
          $("#cat-container").html(categoryButtonsContainer);

          var currentURL = window.location.pathname;

          $(".category-buttons button").on("click", function () {
            var selectedButton = $(this);

            $(".category-buttons button").removeClass("active");
            selectedButton.addClass("active");

            var selectedCategory = selectedButton.data("category");

            $(".blog-post:visible").animate({
              opacity: 0,
              marginTop: "200px"
            }, 400, function () {
              $(this).hide().css({ opacity: 1, marginTop: 0 });

              if (selectedCategory === "all") {
                $(".blog-post:hidden").show().animate({
                  opacity: 1,
                  marginTop: "0"
                }, 100);
              } else {
                $(".blog-post:hidden").filter(function () {
                  var categories = $(this).find(".category a").map(function () {
                    return $(this).text().trim();
                  }).get();
                  return categories.indexOf(selectedCategory) !== -1;
                }).show().animate({
                  opacity: 1,
                  marginTop: "0"
                }, 100);
              }
            });
          });




        });

      }
      $(function () {
        var styles = `
               .blog-time {
          width: 100%;
          padding: 20px;
          font-weight: 500;
          font-size: 17px;
          line-height: 26px;
          margin-bottom: 0px;
          position: relative;
          z-index: 10;
          color: rgb(0 0 0);
          background: #f5f5f5;
          height: auto;
          display: flex;
          text-transform: uppercase;
          align-items: center;
          justify-content: flex-start;
          grid-gap: 10px;
      }
      .post-content {
      position:relative;
      }
      .post-content h1, .post-content h2, .post-content h3, .post-content h4, .post-content h5, .post-content h6 {
      font-size:1.35rem;
      }
      .blog-time #time {
          color: ${brandColor};
          font-weight: 700;
          font-size: 30px;
          line-height: 26px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 100%;
      }
      #progress-bar {
          background: ${brandColor};
          position: fixed;
          top: 0;
          left: 0;
          transition: 300ms all;
          width: var(--scrollAmount);
          height: 4px;
          z-index: 999999;
      }
  @media (max-width:1025px) {
   #progress-bar {
    top: -50px;
   }
   #progress-bar.showitems {
    top: 75px;
   }
   .sidesocials {
    top:-100px;
   }
   .sidesocials.showitems {
    top:0;
   }
  }
      .blog-post .post-content .gradient {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          /*backdrop-filter: blur(1px);*/
          height: 100%;
          pointer-events: all;
          background: linear-gradient(rgba(255, 255, 255, 0),rgb(255 255 255 / 21%),rgb(255 255 255 / 92%),rgb(255 255 255 / 1));
      }
      .blog-post .post-content .read-more {
          position: absolute;
          left: 0;
          bottom: 20px;
          color: black;
          font-size: min(10vw,20px);
          text-transform: uppercase;
          width: auto;
          white-space: nowrap;
          background: white;
          padding: 15px 35px;
          border-radius: 0;
          transition: 300ms all;
          border: solid 1px black;
      }
      .blog-post .post-content .read-more:hover {
          background: black;
          color: white;
      }
  .sidesocials {
      position: fixed;
      z-index: 100;
      /* border-bottom: solid 4px #c4c4c4; */
      height: 75px;
      transition: 300ms all;
      right: 0;
      display: flex;
      flex-direction: row;
      /* box-shadow: 0px 0px 4px rgb(0 0 0 / 43%); */
      width: 100%;
  }
  @media (min-width:1025px) {
   .sidesocials {
    
   }
  }
  .sidesocials a {
      padding:10px;
      height: 100%;
      width: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
  }
  
  .sidesocials .fa:before {
      font-size: 20px;
      display: block;
      color: white;
      height: 100%;
  }
  
  .sidesocials .fb {
      background: #3b5998;
  }
  
  .sidesocials .yt {
      background: #e62117;
  }
  
  .sidesocials .twitter {
      background:#1DA1F2;
  }
  
  .sidesocials .linkedin {
      background:#0077b5;
  }
  
  .sidesocials a:hover {
         filter: brightness(0.8);
  }
  
  @media (min-width:1025px) {
      .sidesocials {
          z-index: 999;
          flex-direction: column!important;
          top: 50%;
          width: 60px;
          height: 200px;
          box-shadow: 0px 0px 10px rgb(0 0 0 / 36%);
      }
      
  }
  
  @media (max-width:1025px) {
   .hidenav {
   display:none!important;
  }
  }
    `;

        // var styleElement = $("<style />", {
        //   html: styles,
        //   type: "text/css"
        // });

        // $("head").append(styleElement);
      });
      window.addEventListener('scroll', function () {
        var progressBar = document.querySelector('#progress-bar');
        var sideSocials = document.querySelector('.sidesocials');
        var topOfViewport = window.pageYOffset || document.documentElement.scrollTop;
        if (topOfViewport < 100) {
          progressBar.classList.remove("showitems");
        } else {
          progressBar.classList.add("showitems");
        }
      });
    });
  }
  /// Market Snapshots ////////////////////////////////////////////////////////////////////////////////////////////////////
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
    /// Add advanced search button to diamond search
    const diamondElement = document.querySelector('#diamond-search');
    if (diamondElement) {
        const newElement = document.createElement('div');
        newElement.innerHTML = '<a href="/search/advanced_search/" class="header-bottom-btn"><button>Advanced Search</button></a>';
        diamondElement.appendChild(newElement);
    }


}
