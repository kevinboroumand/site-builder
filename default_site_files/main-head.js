var mainarea = "[AREA]";
maincity = mainarea;
var mode = "prod";
var diamondSearchAll = true;
var improvePics = true;
var makeOfferForm = true;
var a_x092969 = false;
var underDevelopment = true;

if (underDevelopment = true) {
function handleCookiesAndPermissions() {
  var a_x092969 = true;
  // Cookies
  function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
  }

  function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  // Set Cookies for Dev/Prod
  const paramsvar = new URLSearchParams(window.location.search);
  if (paramsvar.has('mode') && (paramsvar.get('mode') != 'live')) {
    if (paramsvar.get('mode') == 'dev') {
      setCookie('mode', 'dev', 3);
    } else {
      setCookie('mode', 'prod', 3);
    }
  }

  // Set Permission
  if (getCookie('mode') && getCookie('mode') == 'dev') {
    a_x092969 = true;
  }

  // If not permitted
  if (!a_x092969) {
    style = document.createElement('style');
    style.innerHTML = '.vg-content {display:none;}';
    document.querySelector('head').append(style);

    // Get all the link elements in the head of the document
    const headLinks = document.head.querySelectorAll('link[rel="stylesheet"]');

    // Loop through all the link elements and remove any that contain "main.css" or "custom.css" in their href attribute
    headLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href.includes('main.css') || href.includes('custom.css')) {
        link.remove();
      }
    });
  }
  // If permitted
  else if (a_x092969) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'https://kit.fontawesome.com/02aff5b35a.css';
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);

    style = document.createElement('style');
    style.innerHTML = '.old-content {display:none;}';
    document.querySelector('head').append(style);

    if (underDevelopment == true) {
      // Set cookie to view new/old site button
      const cookieName = "dev-switch";
      const cookieValue = "true";

      // set the expiration date to 14 days from now
      const expirationDate = new Date();
      expirationDate.setDate(expirationDate.getDate() + 14);

      // create the cookie string
      const cookieString = `${cookieName}=${cookieValue};expires=${expirationDate.toUTCString()};path=/`;

      // set the cookie
      document.cookie = cookieString;

      // Create old site button
      window.addEventListener("DOMContentLoaded", function () {
        // create the "dev-mode" div
        const devModeDiv = document.createElement("div");
        devModeDiv.id = "dev-mode";
        if (window.self === window.top) {
          document.body.appendChild(devModeDiv);
        }
        // remove any existing URL parameters
        const urlWithoutParams = window.location.href.split("?")[0];

        // create the link inside the div
        const devModeLink = document.createElement("a");
        devModeLink.href = `${urlWithoutParams}?mode=prod`;
        devModeLink.textContent = "View Old Site";
        devModeDiv.appendChild(devModeLink);

        // add a click event listener to the link
        devModeLink.addEventListener("click", (event) => {
          event.preventDefault();
          window.location.href = `${urlWithoutParams}?mode=prod`;
        });
      });
      document.addEventListener("DOMContentLoaded", function () {
        const errorContainer = document.querySelector(".error-container");
        if (errorContainer) {
          const styleElement = document.createElement("style");
          styleElement.innerHTML = `
      .error-dev {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: black;
        z-index: 9999999;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        flex-direction: column;
        margin: auto;
        padding: 30px;
      }

      .error-dev h3 {
        color: white;
        font-size: min(10vw,40px);
      }

      .error-dev p {
        color: #fcfcfc;
        margin: auto;
        margin-top: 0;
        margin-bottom: 0;
        max-width: 500px;
      }

      body .error-dev a {
        text-decoration: none!important;
        color: white!important;
        background: blue;
        padding: 10px 40px;
        border-radius: 40px;
        margin-top: 40px;
      }
    `;

          document.head.appendChild(styleElement);

          const body = document.querySelector('body');
          while (body.firstChild) {
            body.removeChild(body.firstChild);
          }

          const errorDiv = document.createElement("div");
          errorDiv.className = "error-dev";
          errorDiv.innerHTML = `
      <h3>Sorry, that link didn't work.</h3>
      <p>This site is a Vanity Geeks sandbox site. If you are seeing this and are expecting a page, it's most likely because only the real version of your site will display it.</p>
      <a href="#" onclick="history.back();">Go Back</a>
    `;

          document.body.appendChild(errorDiv);
        }
      });

    }
  }

  // Allow view of new design button from old site
  const isDevSwitchPresent = document.cookie.indexOf("dev-switch=true") !== -1;
  if (isDevSwitchPresent && getCookie('mode') == 'prod' && underDevelopment == true) {
    window.addEventListener("DOMContentLoaded", function () {
      // Create new site button
      const devModeDiv = document.createElement("div");
      devModeDiv.id = "dev-mode";
      // If the current window is not embedded in an iframe
      if (window.self === window.top) {
        document.body.appendChild(devModeDiv);
      }

      // remove any existing URL parameters
      const urlWithoutParams = window.location.href.split("?")[0];

      // create the link inside the div
      const devModeLink = document.createElement("a");
      devModeLink.href = `${urlWithoutParams}?mode=dev`;
      devModeLink.textContent = "View New Site";
      devModeDiv.appendChild(devModeLink);

      // add a click event listener to the link
      devModeLink.addEventListener("click", (event) => {
        event.preventDefault();
        window.location.href = `${urlWithoutParams}?mode=dev`;
      });
      // create a variable containing the CSS
      var devModeCSS = `#dev-mode {
    position: fixed;
    bottom: 100px;
    right: 0px;
    z-index: 999999;
}

#dev-mode a {
    padding: 10px 20px;
    background: #ffffff;
    color: black!important;
    text-decoration: none!important;
    border: solid 1px #cbcbcb;
    position: relative;
    border-right: none;
    border-top-left-radius: 40px;
    border-bottom-left-radius: 40px;
    text-transform: uppercase;
    letter-spacing: 2px;
    box-shadow: 7px 4px 10px 2px rgb(0 0 0 / 32%);
    transition: 300ms all;
}

#dev-mode a:hover {padding-right: 17px;background: whitesmoke;font-size: 15px;}`;

      // create a <style> element
      var style = document.createElement("style");

      // set the text of the <style> element to the variable containing the CSS
      style.textContent = devModeCSS;

      // append the <style> element to the <head> element
      document.head.appendChild(style);

    });
  }
}
handleCookiesAndPermissions();
}

//// Add a back home link to the topbar
if (window.location.pathname === "/cma/property-valuation/") {
  document.addEventListener("DOMContentLoaded", function () {
    const div = document.createElement("div");
    div.classList.add("back-home"); // Add "back-home" class to the div
    const link = document.createElement("a");
    link.href = "/";
    link.textContent = "Home";
    div.appendChild(link);
    const topbar = document.querySelector(".topbar .small-12");
    topbar.prepend(div);
  });
}

// Remove QuickSearch and add loading div to blog pages
if (
  a_x092969 && window.location.pathname === '/blog/' ||
  window.location.pathname.indexOf('/blog/category/') === 0 ||
  /^\/blog\/[^/]+\/[^/]+\//.test(window.location.pathname)
) {
  // Remove QuickSearch
  var style = document.createElement("style");
  style.innerHTML = "#quicksearch-section { display: none !important; }";
  document.head.appendChild(style);

  // JavaScript to insert initial CSS for .blog
  var style = document.createElement("style");
  style.setAttribute("id", "initial-blog-style"); // Set a unique ID
  style.innerHTML = ".blog { display: none !important; }";
  document.head.appendChild(style);

  document.addEventListener("DOMContentLoaded", function () {
    // Create the loading div
    const loadingDiv = document.createElement("div");
    loadingDiv.className = "loading-container";
    loadingDiv.innerHTML = '<div class="loading-icon"></div>';

    // Insert the loading div before the .blog element
    const blogElement = document.querySelector(".blog");
    blogElement.insertAdjacentElement("beforebegin", loadingDiv);

    // JavaScript to change display to flex after a delay
    setTimeout(function () {
      blogElement.style.display = "flex";

      // Remove the initial display none CSS
      var initialStyle = document.getElementById("initial-blog-style");
      if (initialStyle) {
        document.head.removeChild(initialStyle);
      }

      // Remove the loading div
      loadingDiv.remove();
    }, 500);
  });
}