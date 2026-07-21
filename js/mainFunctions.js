(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const memberProfiles = {
    ron: {
      name: "Ron J. Ward",
      role: "Guitars · Composition",
      image: "img/guitar-rec.jpg",
      alt: "Ron J. Ward playing guitar on stage",
      bio: "Ron J. Ward is a Japan-based composer, guitarist, producer and founder of Balaganist. His work spans game and media music, sound design, mixing and mastering, but rhythm is at the centre of it all—especially odd meters and grooves that feel natural rather than mathematical. In Balaganist, he writes the music and shapes its collision of progressive rock, jazz and sounds from around the world.",
      links: [
        { label: "Website", url: "https://ronjward.com/" },
        { label: "Instagram", url: "https://www.instagram.com/ronjward" },
        { label: "YouTube", url: "https://www.youtube.com/@RonJWard" }
      ]
    },

    joe: {
      name: "Joe Muntal",
      role: "Drums",
      image: "img/drums-rec.jpg",
      alt: "Joe Muntal playing drums on stage",
      bio: "Joe Muntal is a Tokyo-based drummer whose playing combines tight ensemble control with the punch and detail needed for Balaganist’s shifting meters. Beyond the band, he creates drum covers and arrangements of video-game music, bringing complex programmed material to life on an acoustic kit. That mixture of precision, groove and gamer curiosity makes him a natural fit for Balaganist.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/dr.bluntz" },
        { label: "Twitter", url: "https://twitter.com/JoeMuntal" },
        { label: "YouTube", url: "https://www.youtube.com/c/JoeMuntal" }
      ]
    },

    furuto: {
      name: "Furuto Koshino",
      role: "Bass",
      image: "img/bass-rec.jpg",
      alt: "Furuto Koshino playing bass",
      bio: "Furuto Koshino is a Japanese bassist working on both contrabass and electric bass. His performing world ranges through jazz, pop, fusion, R&B, Brazilian, Latin and gospel music, and he also leads his own groups. In Balaganist, he anchors the rhythmic puzzles while keeping the music warm, mobile and deeply grounded.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/furutokoshino_bass" },
        { label: "Ameblo", url: "https://ameblo.jp/swingman-bass/" }
      ]
    },

    andrew: {
      name: "Andrew Shive",
      role: "Violin",
      image: "img/vln-rec.jpg",
      alt: "Andrew Shive playing violin on stage",
      bio: "Andrew Shive is a versatile violinist active in Japan’s live and recording scene. His credits range from intimate session work to first-violin performance in a large orchestral production for MY FIRST STORY. With Balaganist, his violin can carry a lyrical melody, cut through the band like a lead voice or add the folk-coloured edge at the heart of its sound.",
      links: [
        { label: "Facebook", url: "https://www.facebook.com/andrew.shive/about" }
      ]
    },

    cody: {
      name: "Cody Carpenter",
      role: "Keyboard · Piano",
      image: "img/cody.jpg",
      alt: "Cody Carpenter playing keyboards",
      bio: "Cody Carpenter is an American keyboardist and composer, and the son of legendary filmmaker and composer John Carpenter. His work spans progressive rock, jazz fusion, electronic music, film and video-game scores. Under his own name and as Ludrium, he has developed a distinctly melodic and technically adventurous style. He also composes and performs alongside his father and Daniel Davies, and his virtuosic keyboard voice fits naturally into Balaganist’s cinematic harmonies and odd-meter turns.",
      links: [
        { label: "Instagram", url: "https://www.instagram.com/ludrium/" },
        { label: "Website", url: "https://www.ludrium.com/" }
      ]
    },

    kmetz: {
      name: "Kevin Kmetz",
      role: "Tsugaru Shamisen",
      image: "img/Kevin.jpg",
      alt: "Kevin Kmetz playing shamisen",
      bio: "Kevin Kmetz is a pioneering Tsugaru-shamisen player and bandleader who brings traditional Japanese technique into progressive rock and global fusion. He was the first foreign player to receive the Daijo Kazuo Award at the Kanagi national championship, and has led God of Shamisen while also performing with Estradasphere. His attack, speed and raw acoustic power give Balaganist an unmistakable extra edge.",
      links: [
        { label: "YouTube", url: "https://www.youtube.com/@kevinkmetz8374" },
        { label: "IMDb", url: "https://www.imdb.com/name/nm3607189/" }
      ]
    },

    carter: {
      name: "Kevin S. Carter",
      role: "Soprano Saxophone",
      image: "img/carter.jpg",
      alt: "Kevin Carter playing saxophone",
      bio: "Kevin S. Carter is the soprano saxophonist heard on Balaganist’s 2016 EP No. 1. A key voice in the band’s original studio lineup, his playing gives the music a bright, vocal lead sound that moves naturally between jazz phrasing and progressive-rock contours.",
      links: []
    },

    yunta: {
      name: "Yunta Ikemiya",
      role: "Percussion",
      image: "img/yunta.jpg",
      alt: "Yunta Ikemiya playing percussion",
      bio: "Yunta Ikemiya is a Tokyo-based percussionist active across jazz, African, Caribbean, Latin and improvised music. His projects include Septeto Bunga Tropis, JAZZ KLAXON, Yalaqwe, Irma Osno and Diablo Marino, alongside collaborations and percussion-led sessions throughout Tokyo. With Balaganist, he expands the groove beyond the drum kit, adding colour, motion and a global rhythmic vocabulary.",
      links: [
        { label: "Facebook", url: "https://www.facebook.com/yunta.ikemiya/" },
        { label: "Instagram", url: "https://www.instagram.com/yuntaikemiya/" },
        { label: "Blog", url: "https://yuntaikemiya.blogspot.com/p/profile.html" }
      ]
    },

    ruyman: {
      name: "Ruymán Martín Quintanal",
      role: "Keyboards · Production",
      image: "img/ruyman.jpg",
      alt: "Ruymán Martín Quintanal playing keyboards",
      bio: "Ruymán Martín Quintanal is a pianist, keyboardist, music producer and sound engineer with formal studies in piano and musicology. His work crosses composition, production and genre-blending electronic and urban music, including rap-flamenco experiments. As a Balaganist guest, he brings a producer’s ear for texture and a keyboardist’s harmonic range.",
      links: [
        { label: "SoundCloud", url: "https://soundcloud.com/ruyman-martin-quintanal" },
        { label: "LinkedIn", url: "https://www.linkedin.com/in/ruym%C3%A1n-mart%C3%ADn-quintanal-5743269b/" }
      ]
    }
  };

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

  function setupKineticTypography() {
    const titles = document.querySelectorAll("[data-kinetic-title]");
    if (!titles.length) return;

    const preparedTitles = [];

    titles.forEach(function (title) {
      const originalText = title.textContent.replace(/\s+/g, " ").trim();
      if (!originalText) return;

      title.classList.add("kinetic-title");

      if (reduceMotion) {
        title.classList.add("is-kinetic-visible");
        return;
      }

      const leadMeter = title.dataset.kineticLead === "11" ? 11 : 7;
      const requestedDelay = Number.parseInt(title.dataset.kineticDelay || "80", 10);
      const baseDelay = Number.isFinite(requestedDelay)
        ? Math.max(0, requestedDelay)
        : 80;
      const words = originalText.split(" ");
      const fragment = document.createDocumentFragment();
      let letterIndex = 0;

      words.forEach(function (wordText, wordIndex) {
        const word = document.createElement("span");
        word.className = "kinetic-word";
        word.setAttribute("aria-hidden", "true");

        Array.from(wordText).forEach(function (character) {
          const beatNumber = letterIndex + 1;
          const sevenPhase = letterIndex % 7;
          const elevenPhase = letterIndex % 11;
          const landsOnSeven = beatNumber % 7 === 0;
          const landsOnEleven = beatNumber % 11 === 0;
          const delay = baseDelay
            + letterIndex * 24
            + sevenPhase * 6
            + elevenPhase * 4
            + wordIndex * 42;

          const letter = document.createElement("span");
          const glyph = document.createElement("span");
          letter.className = "kinetic-letter";
          glyph.className = "kinetic-glyph";
          glyph.textContent = character;

          letter.style.setProperty("--kinetic-delay", `${delay}ms`);
          letter.style.setProperty(
            "--kinetic-hover-delay",
            `${(sevenPhase * 18 + elevenPhase * 9) % 150}ms`
          );

          if (landsOnSeven) {
            letter.classList.add("kinetic-letter--seven");
          }

          if (landsOnEleven) {
            letter.classList.add("kinetic-letter--eleven");
          }

          if (landsOnSeven && landsOnEleven) {
            letter.classList.add("kinetic-letter--both");
          }

          letter.appendChild(glyph);
          word.appendChild(letter);
          letterIndex += 1;
        });

        fragment.appendChild(word);

        if (wordIndex < words.length - 1) {
          fragment.appendChild(document.createTextNode(" "));
        }
      });

      title.setAttribute("aria-label", originalText);
      title.replaceChildren(fragment);
      title.style.setProperty(
        "--kinetic-meter-delay",
        `${baseDelay + Math.min(letterIndex * 24, 620)}ms`
      );
      title.classList.add("is-kinetic-ready", `kinetic-title--lead-${leadMeter}`);
      preparedTitles.push(title);
    });

    if (!preparedTitles.length) return;

    function revealTitle(title) {
      title.classList.add("is-kinetic-visible");
    }

    if (!("IntersectionObserver" in window)) {
      preparedTitles.forEach(revealTitle);
      return;
    }

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        revealTitle(entry.target);
        observer.unobserve(entry.target);
      });
    }, {
      threshold: 0.3,
      rootMargin: "0px 0px -8% 0px"
    });

    preparedTitles.forEach(function (title) {
      observer.observe(title);
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

  function setupAlbumExperience() {
  const albumObject = document.querySelector("[data-album-sleeve]");
  const albumCover = albumObject?.querySelector(".album-sleeve");
  const albumInsert = albumObject?.querySelector(".album-insert");
  const insertToggle = albumObject?.querySelector("[data-album-insert-toggle]");
  const modal = document.getElementById("album-modal");
  const modalSurface = modal?.querySelector(".album-modal__surface");
  const closeButton = modal?.querySelector("[data-album-modal-close]");
  const player = modal?.querySelector(".album-modal__player");
  const openButtons = document.querySelectorAll("[data-album-open]");

  if (
    !albumObject ||
    !albumCover ||
    !albumInsert ||
    !insertToggle ||
    !modal ||
    !modalSurface ||
    !closeButton ||
    !player ||
    !openButtons.length
  ) {
    return;
  }

  let lastTrigger = null;
  let tiltFrame = 0;
  let insertCloseTimer = null;

  function finishInsertClose() {
    albumObject.classList.remove("is-insert-closing");
    insertCloseTimer = null;
  }

  function setInsertOpen(open) {
    const wasOpen = albumObject.classList.contains("is-insert-open");

    if (insertCloseTimer !== null) {
      window.clearTimeout(insertCloseTimer);
      insertCloseTimer = null;
    }

    albumObject.classList.remove("is-insert-closing");

    if (open) {
      albumObject.classList.add("is-insert-open");
    } else if (wasOpen) {
      albumObject.classList.remove("is-insert-open");
      albumObject.classList.add("is-insert-closing");
      insertCloseTimer = window.setTimeout(finishInsertClose, 680);
    } else {
      albumObject.classList.remove("is-insert-open");
    }

    insertToggle.setAttribute("aria-expanded", String(open));
  }

    function resetTilt() {
      if (tiltFrame) {
        window.cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
      }

      albumCover.style.setProperty("--sleeve-rotate-x", "0deg");
      albumCover.style.setProperty("--sleeve-rotate-y", "0deg");
      albumCover.style.setProperty("--foil-x", "34%");
      albumCover.style.setProperty("--foil-y", "24%");
    }

    function finishClose() {
      document.body.classList.remove("album-open");

      if (player.getAttribute("src") !== "about:blank") {
        player.setAttribute("src", "about:blank");
      }

      if (lastTrigger) {
        lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
      }
    }

    function closeModal() {
      if (!modal.hasAttribute("open")) return;

      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
        modal.classList.remove("is-fallback");
        finishClose();
      }
    }

    function openModal(trigger) {
      lastTrigger = trigger;
      modalSurface.scrollTop = 0;
      document.body.classList.add("album-open");

      if (player.getAttribute("src") === "about:blank" && player.dataset.src) {
        player.setAttribute("src", player.dataset.src);
      }

      if (!modal.hasAttribute("open")) {
        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.classList.add("is-fallback");
          modal.setAttribute("open", "");
        }
      }
    }

    insertToggle.addEventListener("click", function () {
      setInsertOpen(insertToggle.getAttribute("aria-expanded") !== "true");
    });

    openButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openModal(button);
      });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    modal.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeModal();
    });

    modal.addEventListener("close", finishClose);

    if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
      albumCover.addEventListener("pointermove", function (event) {
        const bounds = albumCover.getBoundingClientRect();
        const x = Math.max(0, Math.min(1, (event.clientX - bounds.left) / bounds.width));
        const y = Math.max(0, Math.min(1, (event.clientY - bounds.top) / bounds.height));

        if (tiltFrame) window.cancelAnimationFrame(tiltFrame);

        tiltFrame = window.requestAnimationFrame(function () {
          albumCover.style.setProperty("--sleeve-rotate-x", `${((0.5 - y) * 6).toFixed(2)}deg`);
          albumCover.style.setProperty("--sleeve-rotate-y", `${((x - 0.5) * 8).toFixed(2)}deg`);
          albumCover.style.setProperty("--foil-x", `${(x * 100).toFixed(1)}%`);
          albumCover.style.setProperty("--foil-y", `${(y * 100).toFixed(1)}%`);
          tiltFrame = 0;
        });
      });

      albumCover.addEventListener("pointerleave", resetTilt);
      albumCover.addEventListener("blur", resetTilt);
    }
  }

  function setupMemberBios() {
    const modal = document.getElementById("member-modal");
    const modalSurface = modal?.querySelector(".member-modal__surface");
    const modalImage = document.getElementById("member-modal-image");
    const modalName = document.getElementById("member-modal-name");
    const modalRole = document.getElementById("member-modal-role");
    const modalBio = document.getElementById("member-modal-bio");
    const modalSocials = document.getElementById("member-modal-socials");
    const closeButton = modal?.querySelector("[data-member-modal-close]");
    const profileButtons = document.querySelectorAll("[data-member-profile]");

    if (
      !modal ||
      !modalSurface ||
      !modalImage ||
      !modalName ||
      !modalRole ||
      !modalBio ||
      !modalSocials ||
      !closeButton ||
      !profileButtons.length
    ) {
      return;
    }

    let lastTrigger = null;

    function finishClose() {
      document.body.classList.remove("bio-open");

      if (lastTrigger) {
        lastTrigger.focus({ preventScroll: true });
        lastTrigger = null;
      }
    }

    function closeModal() {
      if (!modal.hasAttribute("open")) return;

      if (typeof modal.close === "function") {
        modal.close();
      } else {
        modal.removeAttribute("open");
        finishClose();
      }
    }

    function createSocialLinks(links) {
      modalSocials.replaceChildren();

      if (!links.length) {
        const message = document.createElement("p");
        message.className = "member-modal__no-links";
        message.textContent = "No public profile links are currently available.";
        modalSocials.appendChild(message);
        return;
      }

      links.forEach(function (social) {
        const link = document.createElement("a");
        link.className = "member-modal__social-link";
        link.href = social.url;
        link.target = "_blank";
        link.rel = "noopener noreferrer";
        link.textContent = `${social.label} ↗`;
        modalSocials.appendChild(link);
      });
    }

    function openProfile(trigger) {
      const profileId = trigger.dataset.memberProfile;
      const profile = memberProfiles[profileId];

      if (!profile) return;

      modalImage.src = profile.image;
      modalImage.alt = profile.alt;
      modalName.textContent = profile.name;
      modalRole.textContent = profile.role;
      modalBio.textContent = profile.bio;
      createSocialLinks(Array.isArray(profile.links) ? profile.links : []);

      lastTrigger = trigger;
      modalSurface.scrollTop = 0;
      document.body.classList.add("bio-open");

      if (!modal.hasAttribute("open")) {
        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.setAttribute("open", "");
        }
      }
    }

    profileButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openProfile(button);
      });
    });

    closeButton.addEventListener("click", closeModal);

    modal.addEventListener("click", function (event) {
      if (event.target === modal) closeModal();
    });

    modal.addEventListener("cancel", function (event) {
      event.preventDefault();
      closeModal();
    });

    modal.addEventListener("close", finishClose);
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

        if (!response.ok) {
		  throw new Error(`Subscription failed with ${response.status}`);
		}

		const result = await response.json();

		if (result.result !== "success") {
		  throw new Error(result.message || "Subscription was rejected");
		}

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
    setupKineticTypography();
    setupRevealAnimations();
    setupMemberTilt();
    setupAlbumExperience();
    setupMemberBios();
    renderShows();
    setupContactForm();
    setupNewsletterForm();
  });
})();
