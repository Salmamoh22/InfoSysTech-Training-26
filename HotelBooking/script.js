/* =====================================================
   script.js
   Makes the site interactive:
   1) Sidebar show/hide (hamburger icon)
   2) "Learn More" -> opens hotel-details.html for that hotel
   3) On hotel-details.html, fills the page with the right
      hotel's info based on the URL (?hotel=...)
   ===================================================== */

document.addEventListener("DOMContentLoaded", function () {

  /* -----------------------------------------
     1) SIDEBAR TOGGLE
     Click the hamburger (☰) to show/hide the
     sidebar and let the main content take the
     freed-up space.
  ----------------------------------------- */
  const sidebar = document.getElementById("sidebar");
  const sidebarToggle = document.getElementById("sidebarToggle");
  const mainContent = document.getElementById("mainContent");

  if (sidebar && sidebarToggle) {
    // Smooth animation for the collapse/expand
    sidebar.style.transition = "transform 0.3s ease";
    if (mainContent) {
      mainContent.style.transition = "margin-left 0.3s ease";
    }

    // Remember the sidebar's natural width so we know how
    // much space to give back to the main content.
    const sidebarWidth = sidebar.offsetWidth;
    let sidebarHidden = false;

    sidebarToggle.addEventListener("click", function () {
      sidebarHidden = !sidebarHidden;

      if (sidebarHidden) {
        sidebar.style.transform = `translateX(-${sidebarWidth}px)`;
        if (mainContent) mainContent.style.marginLeft = "0";
      } else {
        sidebar.style.transform = "translateX(0)";
        if (mainContent) mainContent.style.marginLeft = "";
      }
    });
  }

  /* -----------------------------------------
     2) "EXPLORE HOTELS" -> SCROLL TO LISTINGS
     Both Explore Hotels buttons (hero + featured
     section) jump down to the #explore section
     where the hotel cards live.
  ----------------------------------------- */
  const exploreButtons = document.querySelectorAll(".explore-btn");
  const exploreSection = document.getElementById("explore");
  exploreButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  /* -----------------------------------------
     3) "LEARN MORE" -> HOTEL DETAILS PAGE
     Every Learn More button has a data-hotel
     attribute (e.g. data-hotel="tolip") that
     matches an id in js/hotels-data.js
  ----------------------------------------- */
  const learnMoreButtons = document.querySelectorAll(".learn-more-btn");
  learnMoreButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      const hotelId = btn.getAttribute("data-hotel");
      if (hotelId) {
        window.location.href = `hotel-details.html?hotel=${encodeURIComponent(hotelId)}`;
      }
    });
  });

  /* -----------------------------------------
     4) FILL IN HOTEL DETAILS PAGE
     Only runs on hotel-details.html (it looks
     for a #hotelDetails element; if it's not
     found on the page, this block does nothing).
  ----------------------------------------- */
  const detailsContainer = document.getElementById("hotelDetails");
  if (detailsContainer && typeof HOTELS !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const hotelId = params.get("hotel");
    const hotel = HOTELS.find(function (h) { return h.id === hotelId; });

    if (hotel) {
      document.title = hotel.name + " - HotelHub";
      document.getElementById("hotelImage").src = hotel.image;
      document.getElementById("hotelImage").alt = hotel.name;
      document.getElementById("hotelName").textContent = hotel.name;
      document.getElementById("hotelStars").textContent = hotel.stars;
      document.getElementById("hotelLocation").textContent = hotel.location;
      document.getElementById("hotelPrice").textContent = hotel.price;
      document.getElementById("hotelDescription").textContent = hotel.description;
    } else {
      // No matching hotel found (bad or missing link)
      detailsContainer.innerHTML =
        '<div class="text-center py-5">' +
        '<h3>Hotel not found</h3>' +
        '<p class="text-muted">Please go back and choose a hotel from the list.</p>' +
        '<a href="index.html" class="btn btn-primary rounded-pill">Back to Hotels</a>' +
        "</div>";
    }
  }

});