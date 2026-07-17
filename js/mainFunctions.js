(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function setCurrentYear() {
    document.querySelectorAll("[data-current-year]").forEach(function (element) {
      element.textContent = String(new Date().getFullYear());
    });
  }

  function setupHeader() {
    const header = document.querySelector("[data-header]");
    const toggle = document.querySelector(".nav-toggle");
    const navigation = document.getElementById("site-navigation");

    if (!header) return;

    let ticking = false;
    function updateHeader() {
      header.classList.toggle("is-scrolled", window.scrollY > 24);
      ticking = false;
    }

    window.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(updateHeader);
    }, { passive: true });
    updateHeader();

    if (!toggle || !navigation) return;

    function closeNavigation() {
      toggle.setAttribute("aria-expanded", "false");
      navigation.classList.remove("is-open");
      document.body.classList.remove("nav-open");
    }

    toggle.addEventListener("click", function () {
      const opening = toggle.getAttribute("aria-expanded") !== "true";
      toggle.setAttribute("aria-expanded", String(opening));
      navigation.classList.toggle("is-open", opening);
      document.body.classList.toggle("nav-open", opening);
    });

    navigation.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNavigation);
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") closeNavigation();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 780) closeNavigation();
    });
  }

  function setupRevealAnimations() {
    const elements = document.querySelectorAll(".reveal");
    if (!elements.length) return;

    if (reduceMotion || !("IntersectionObserver" in window)) {
      elements.forEach(function (element) {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.12,
      rootMargin: "0px 0px -6% 0px"
    });

    elements.forEach(function (element) {
      observer.observe(element);
    });
  }

  function setupMemberTilt() {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    document.querySelectorAll("[data-tilt]").forEach(function (card) {
      card.addEventListener("pointermove", function (event) {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width - 0.5;
        const y = (event.clientY - bounds.top) / bounds.height - 0.5;
        card.style.setProperty("--rotate-x", `${(-y * 5).toFixed(2)}deg`);
        card.style.setProperty("--rotate-y", `${(x * 5).toFixed(2)}deg`);
      });

      card.addEventListener("pointerleave", function () {
        card.style.setProperty("--rotate-x", "0deg");
        card.style.setProperty("--rotate-y", "0deg");
      });
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replaceAll("&", "&amp;")
      .replaceAll("<", "&lt;")
      .replaceAll(">", "&gt;")
      .replaceAll('"', "&quot;")
      .replaceAll("'", "&#039;");
  }

  function toCalendarTimestamp(value) {
    return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function buildGoogleCalendarUrl(show) {
    const location = show.address || [show.venue, show.city].filter(Boolean).join(", ");
    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: show.title,
      dates: `${toCalendarTimestamp(show.start)}/${toCalendarTimestamp(show.end)}`,
      details: show.note || "Balaganist live",
      location: location,
      ctz: show.timezone || "Asia/Tokyo"
    });
    return `https://calendar.google.com/calendar/render?${params.toString()}`;
  }

  function escapeIcs(value) {
    return String(value || "")
      .replaceAll("\\", "\\\\")
      .replaceAll(";", "\\;")
      .replaceAll(",", "\\,")
      .replace(/\r?\n/g, "\\n");
  }

  function downloadCalendarFile(show) {
    const location = show.address || [show.venue, show.city].filter(Boolean).join(", ");
    const uid = `${show.id || Date.now()}@balaganist.com`;
    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Balaganist//Live Shows//EN",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:${escapeIcs(uid)}`,
      `DTSTAMP:${toCalendarTimestamp(new Date())}`,
      `DTSTART:${toCalendarTimestamp(show.start)}`,
      `DTEND:${toCalendarTimestamp(show.end)}`,
      `SUMMARY:${escapeIcs(show.title)}`,
      `LOCATION:${escapeIcs(location)}`,
      `DESCRIPTION:${escapeIcs(show.note || "Balaganist live")}`,
      "END:VEVENT",
      "END:VCALENDAR"
    ];

    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${show.id || "balaganist-show"}.ics`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.setTimeout(function () { URL.revokeObjectURL(url); }, 1000);
  }

  function renderShows() {
    const list = document.getElementById("event-list");
    const emptyState = document.getElementById("no-shows");
    if (!list) return;

    const data = window.BALAGANIST_SITE_DATA || {};
    const now = Date.now();
    const shows = Array.isArray(data.upcomingShows)
      ? data.upcomingShows
        .filter(function (show) {
          const finalTime = Date.parse(show.end || show.start);
          return Number.isFinite(finalTime) && finalTime >= now;
        })
        .sort(function (a, b) { return Date.parse(a.start) - Date.parse(b.start); })
      : [];

    if (!shows.length) return;
    if (emptyState) emptyState.classList.add("has-events");

    shows.forEach(function (show) {
      const startDate = new Date(show.start);
      const timezone = show.timezone || "Asia/Tokyo";
      const day = new Intl.DateTimeFormat("en", { day: "2-digit", timeZone: timezone }).format(startDate);
      const month = new Intl.DateTimeFormat("en", { month: "short", timeZone: timezone }).format(startDate);
      const time = new Intl.DateTimeFormat("en", { hour: "numeric", minute: "2-digit", timeZone: timezone }).format(startDate);
      const venueLine = [show.venue, show.city].filter(Boolean).join(" · ");

      const card = document.createElement("article");
      card.className = "event-card";
      card.innerHTML = `
        <time class="event-card__date" datetime="${escapeHtml(show.start)}">
          <strong>${escapeHtml(day)}</strong>
          <span>${escapeHtml(month)}</span>
        </time>
        <div class="event-card__content">
          <h3>${escapeHtml(show.title)}</h3>
          <p class="event-card__meta">${escapeHtml(venueLine)}${venueLine ? " · " : ""}${escapeHtml(time)}</p>
          ${show.note ? `<p class="event-card__meta">${escapeHtml(show.note)}</p>` : ""}
          <div class="event-card__actions"></div>
        </div>`;

      const actions = card.querySelector(".event-card__actions");

      if (show.ticketUrl) {
        const ticketLink = document.createElement("a");
        ticketLink.href = show.ticketUrl;
        ticketLink.target = "_blank";
        ticketLink.rel = "noopener noreferrer";
        ticketLink.textContent = "Tickets ↗";
        actions.appendChild(ticketLink);
      }

      if (show.mapUrl) {
        const mapLink = document.createElement("a");
        mapLink.href = show.mapUrl;
        mapLink.target = "_blank";
        mapLink.rel = "noopener noreferrer";
        mapLink.textContent = "Map ↗";
        actions.appendChild(mapLink);
      }

      const googleLink = document.createElement("a");
      googleLink.href = buildGoogleCalendarUrl(show);
      googleLink.target = "_blank";
      googleLink.rel = "noopener noreferrer";
      googleLink.textContent = "Google Calendar ↗";
      actions.appendChild(googleLink);

      const calendarButton = document.createElement("button");
      calendarButton.type = "button";
      calendarButton.textContent = "Download .ics";
      calendarButton.addEventListener("click", function () { downloadCalendarFile(show); });
      actions.appendChild(calendarButton);

      list.appendChild(card);
    });
  }

  function setFormStatus(element, message, isError) {
    if (!element) return;
    element.textContent = message;
    element.classList.toggle("is-error", Boolean(isError));
  }

  function setupContactForm() {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contact-status");
    if (!form) return;

    const nameField = form.elements.namedItem("name");
    const emailField = form.elements.namedItem("email");
    const messageField = form.elements.namedItem("message");
    const mathField = form.elements.namedItem("mathQuestion");

    let emailJsInitialized = false;

    function initializeEmailJs() {
      if (!window.emailjs || emailJsInitialized) return Boolean(window.emailjs);
      window.emailjs.init({ publicKey: "jGG5iqCZS9BqdhQuB" });
      emailJsInitialized = true;
      return true;
    }

    initializeEmailJs();

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (mathField.value.trim() !== "7") {
        setFormStatus(status, "That answer is not quite right. Please try again.", true);
        mathField.focus();
        return;
      }

      if (!initializeEmailJs()) {
        setFormStatus(status, "The message service could not load. Please try again in a moment.", true);
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;
      setFormStatus(status, "Sending…", false);

      try {
        await window.emailjs.send("service_iygu334", "template_7o3zivj", {
          from_name: nameField.value.trim(),
          from_email: emailField.value.trim(),
          reply_to: emailField.value.trim(),
          to_name: "Balaganist",
          message: messageField.value.trim()
        });
        form.reset();
        setFormStatus(status, "Message sent. Thank you!", false);
      } catch (error) {
        console.error("Contact form failed:", error);
        setFormStatus(status, "The message did not send. Please try again.", true);
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  function setupNewsletterForm() {
    const form = document.getElementById("newsletterForm");
    const status = document.getElementById("newsletter-status");
    if (!form) return;

    const emailField = form.elements.namedItem("emailNews");
    const mathField = form.elements.namedItem("checkRobotNews");

    const scriptUrl = "https://script.google.com/macros/s/AKfycbywXC-iq1fWgZA2vcWVH9l2HRbQ8xX4CnG5oOld5JWcg7enEqmUItMm7aUm_4SCSnIF/exec";

    form.addEventListener("submit", async function (event) {
      event.preventDefault();

      if (mathField.value.trim() !== "7") {
        setFormStatus(status, "That answer is not quite right. Please try again.", true);
        mathField.focus();
        return;
      }

      const submitButton = form.querySelector("button[type='submit']");
      submitButton.disabled = true;
      setFormStatus(status, "Joining…", false);

      try {
        const response = await fetch(scriptUrl, {
          method: "POST",
          redirect: "follow",
          headers: { "Content-Type": "text/plain;charset=utf-8" },
          body: JSON.stringify({
            emailNews: emailField.value.trim(),
            checkRobotNews: mathField.value.trim()
          })
        });

        if (!response.ok) throw new Error(`Subscription failed with ${response.status}`);
        form.reset();
        setFormStatus(status, "You’re on the list. Thank you!", false);
      } catch (error) {
        console.error("Newsletter subscription failed:", error);
        setFormStatus(status, "Could not subscribe right now. Please try again.", true);
      } finally {
        submitButton.disabled = false;
      }
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    setCurrentYear();
    setupHeader();
    setupRevealAnimations();
    setupMemberTilt();
    renderShows();
    setupContactForm();
    setupNewsletterForm();
  });
})();
