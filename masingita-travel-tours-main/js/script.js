/* ==========================================================================
   MASINGITAS TRAVEL AND TOURS - SITE SCRIPT
   Loaded with "defer" on every page. Each feature first checks that the
   elements it needs exist, so one file can safely serve all pages.
   ========================================================================== */

(function () {
    "use strict";

    // Tell the CSS that JavaScript is running (used by the mobile menu).
    document.documentElement.classList.remove("no-js");
    document.documentElement.classList.add("js");

    /* ----------------------------------------------------------------------
       1. Mobile navigation toggle
       ---------------------------------------------------------------------- */
    function initNavToggle() {
        var toggle = document.querySelector(".nav-toggle");
        var nav = document.getElementById("site-nav");
        if (!toggle || !nav) return;

        toggle.addEventListener("click", function () {
            var open = nav.classList.toggle("is-open");
            toggle.setAttribute("aria-expanded", String(open));
            toggle.textContent = open ? "Close menu" : "Menu";
        });

        // Close the menu with the Escape key
        document.addEventListener("keydown", function (e) {
            if (e.key === "Escape" && nav.classList.contains("is-open")) {
                nav.classList.remove("is-open");
                toggle.setAttribute("aria-expanded", "false");
                toggle.textContent = "Menu";
                toggle.focus();
            }
        });
    }

    /* ----------------------------------------------------------------------
       2. Current year in the footer
       ---------------------------------------------------------------------- */
    function initYear() {
        var el = document.getElementById("year");
        if (el) el.textContent = new Date().getFullYear();
    }

    /* ----------------------------------------------------------------------
       3. Back-to-top button
       ---------------------------------------------------------------------- */
    function initBackToTop() {
        var btn = document.querySelector(".back-to-top");
        if (!btn) return;

        var ticking = false;
        window.addEventListener("scroll", function () {
            if (ticking) return;
            ticking = true;
            window.requestAnimationFrame(function () {
                btn.classList.toggle("is-visible", window.scrollY > 600);
                ticking = false;
            });
        }, { passive: true });

        btn.addEventListener("click", function () {
            window.scrollTo({ top: 0 });
            var skipTarget = document.getElementById("main-content");
            if (skipTarget) skipTarget.focus({ preventScroll: true });
        });
    }

    /* ----------------------------------------------------------------------
       4. Package filter and search (menu.html)
       ---------------------------------------------------------------------- */
    function initPackageFilter() {
        var list = document.getElementById("package-list");
        if (!list) return;

        var cards = list.querySelectorAll("[data-category]");
        var buttons = document.querySelectorAll(".filter-btn");
        var search = document.getElementById("package-search");
        var count = document.getElementById("result-count");
        var activeCategory = "all";

        function apply() {
            var term = search ? search.value.trim().toLowerCase() : "";
            var shown = 0;

            cards.forEach(function (card) {
                var matchesCategory = activeCategory === "all" ||
                    card.getAttribute("data-category") === activeCategory;
                var matchesSearch = term === "" ||
                    card.textContent.toLowerCase().indexOf(term) !== -1;
                var visible = matchesCategory && matchesSearch;
                card.hidden = !visible;
                if (visible) shown++;
            });

            if (count) {
                count.textContent = shown === 0
                    ? "No packages match your search. Try another word or request a custom itinerary below."
                    : "Showing " + shown + " of " + cards.length + " packages.";
            }
        }

        buttons.forEach(function (btn) {
            btn.addEventListener("click", function () {
                activeCategory = btn.getAttribute("data-filter");
                buttons.forEach(function (b) {
                    b.setAttribute("aria-pressed", String(b === btn));
                });
                apply();
            });
        });

        if (search) search.addEventListener("input", apply);
        apply();
    }

    /* ----------------------------------------------------------------------
       5. Enquiry form: pre-fill, date rules, live summary and validation
       ---------------------------------------------------------------------- */
    function initEnquiryForm() {
        var form = document.getElementById("enquiry-form");
        if (!form) return;

        var departure = document.getElementById("departure-date");
        var returnDate = document.getElementById("return-date");
        var travellers = document.getElementById("travellers");
        var service = document.getElementById("service");
        var summary = document.getElementById("trip-summary");
        var status = document.getElementById("form-status");

        // a) Pre-select the service when arriving from a package link,
        //    e.g. enquiry.html?service=safari
        var params = new URLSearchParams(window.location.search);
        var requested = params.get("service");
        if (requested && service.querySelector('option[value="' + CSS.escape(requested) + '"]')) {
            service.value = requested;
        }
        var pkg = params.get("package");
        var details = document.getElementById("details");
        if (pkg && details && details.value === "") {
            details.value = "I am interested in the " + pkg + ".";
        }

        // b) Dates cannot be in the past, and return must follow departure
        function isoDate(d) {
            var local = new Date(d.getTime() - d.getTimezoneOffset() * 60000);
            return local.toISOString().slice(0, 10);
        }
        var today = isoDate(new Date());
        departure.min = today;
        returnDate.min = today;
        departure.addEventListener("change", function () {
            returnDate.min = departure.value || today;
            updateSummary();
        });
        returnDate.addEventListener("change", updateSummary);
        travellers.addEventListener("input", updateSummary);
        service.addEventListener("change", updateSummary);

        // c) Live trip summary
        function updateSummary() {
            if (!summary) return;
            var parts = [];
            var count = parseInt(travellers.value, 10);
            if (count > 0) parts.push(count + (count === 1 ? " traveller" : " travellers"));
            if (service.value) parts.push(service.options[service.selectedIndex].text);
            if (departure.value && returnDate.value) {
                var nights = Math.round((new Date(returnDate.value) - new Date(departure.value)) / 86400000);
                if (nights > 0) parts.push(nights + (nights === 1 ? " night" : " nights"));
            }
            if (departure.value) {
                var days = Math.round((new Date(departure.value) - new Date(today)) / 86400000);
                if (days >= 0 && days < 42) {
                    parts.push("departing in " + days + " days. Tip: book soon, as short-notice trips have fewer options");
                }
            }
            summary.textContent = parts.length
                ? "Your trip so far: " + parts.join(" · ") + "."
                : "Fill in the form and a summary of your trip will appear here.";
        }
        updateSummary();

        // d) Friendly validation messages
        var rules = {
            fullname: function (v) { return v.trim().length >= 3 ? "" : "Please enter your full name."; },
            email: function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()) ? "" : "Please enter a valid email address, e.g. name@example.com."; },
            phone: function (v) { return /^\+?[0-9\s()-]{9,16}$/.test(v.trim()) ? "" : "Please enter a valid phone number, e.g. +27 82 123 4567."; },
            service: function (v) { return v ? "" : "Please choose the service you need."; },
            travellers: function (v) { var n = Number(v); return n >= 1 && n <= 100 ? "" : "Please enter between 1 and 100 travellers."; },
            "departure-date": function (v) { return !v || v >= today ? "" : "The departure date cannot be in the past."; },
            "return-date": function (v) {
                if (!v) return "";
                if (departure.value && v < departure.value) return "The return date must be after the departure date.";
                return "";
            }
        };

        function validateField(input) {
            var rule = rules[input.id];
            if (!rule) return true;
            var message = rule(input.value);
            var wrapper = input.closest(".field");
            var errorEl = document.getElementById(input.id + "-error");
            if (wrapper) wrapper.classList.toggle("has-error", message !== "");
            if (errorEl) errorEl.textContent = message;
            input.setAttribute("aria-invalid", String(message !== ""));
            return message === "";
        }

        Object.keys(rules).forEach(function (id) {
            var input = document.getElementById(id);
            if (!input) return;
            input.addEventListener("blur", function () { validateField(input); });
            input.addEventListener("input", function () {
                if (input.getAttribute("aria-invalid") === "true") validateField(input);
            });
        });

        // e) Submission: this is a front-end demo, so nothing is sent or stored
        form.addEventListener("submit", function (e) {
            e.preventDefault();
            var firstInvalid = null;
            Object.keys(rules).forEach(function (id) {
                var input = document.getElementById(id);
                if (input && !validateField(input) && !firstInvalid) firstInvalid = input;
            });

            status.hidden = false;
            if (firstInvalid) {
                status.className = "form-status error";
                status.textContent = "Please correct the highlighted fields before sending your enquiry.";
                firstInvalid.focus();
                return;
            }

            var name = document.getElementById("fullname").value.trim().split(" ")[0];
            status.className = "form-status success";
            status.textContent = "Thank you, " + name + "! Your enquiry has been checked and is ready. " +
                "(Demo site: no information was sent or saved. A real booking system would forward it to our consultants.)";
            status.focus();
            form.reset();
            updateSummary();
        });

        form.addEventListener("reset", function () {
            setTimeout(function () {
                form.querySelectorAll(".has-error").forEach(function (el) { el.classList.remove("has-error"); });
                form.querySelectorAll(".error-message").forEach(function (el) { el.textContent = ""; });
                updateSummary();
            }, 0);
        });
    }

    /* ----------------------------------------------------------------------
       6. Event countdowns (events.html)
       ---------------------------------------------------------------------- */
    function initEventCountdowns() {
        var events = document.querySelectorAll("[data-event-date]");
        if (!events.length) return;

        var today = new Date();
        today.setHours(0, 0, 0, 0);

        events.forEach(function (card) {
            var date = new Date(card.getAttribute("data-event-date") + "T00:00:00");
            var badge = card.querySelector(".countdown");
            var days = Math.round((date - today) / 86400000);
            if (!badge) return;

            if (days > 1) badge.textContent = "Departs in " + days + " days";
            else if (days === 1) badge.textContent = "Departs tomorrow";
            else if (days === 0) badge.textContent = "Departs today";
            else {
                badge.textContent = "This tour has already departed";
                card.classList.add("is-past");
            }
        });
    }

    /* ----------------------------------------------------------------------
       7. "Open now" status and today's hours (contact.html)
       Office hours are in South African Standard Time (UTC+2).
       ---------------------------------------------------------------------- */
    function initOpeningHours() {
        var badge = document.getElementById("open-status");
        if (!badge) return;

        // [open hour, close hour] per day, Sunday = 0
        var hours = { 0: null, 1: [8, 17], 2: [8, 17], 3: [8, 17], 4: [8, 17], 5: [8, 17], 6: [9, 13] };

        var now = new Date();
        var sast = new Date(now.getTime() + now.getTimezoneOffset() * 60000 + 2 * 3600000);
        var day = sast.getDay();
        var time = sast.getHours() + sast.getMinutes() / 60;
        var slot = hours[day];
        var open = slot && time >= slot[0] && time < slot[1];

        badge.textContent = open
            ? "Open now · closes at " + slot[1] + ":00 SAST"
            : "Closed right now · send an enquiry and we will reply when we open";
        badge.className = "status-badge " + (open ? "open" : "closed");

        var row = document.querySelector('.hours-table [data-days~="' + day + '"]');
        if (row) row.classList.add("today");
    }

    initNavToggle();
    initYear();
    initBackToTop();
    initPackageFilter();
    initEnquiryForm();
    initEventCountdowns();
    initOpeningHours();
})();
