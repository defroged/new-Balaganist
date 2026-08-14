(function () {
  "use strict";

  if (window.NodeList && !window.NodeList.prototype.forEach) {
    window.NodeList.prototype.forEach = Array.prototype.forEach;
  }

  if (window.Element && !window.Element.prototype.remove) {
    window.Element.prototype.remove = function () {
      if (this.parentNode) this.parentNode.removeChild(this);
    };
  }

  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hasFinePointer = window.matchMedia && window.matchMedia("(pointer: fine)").matches;

  function replaceElementChildren(element, child) {
    while (element.firstChild) {
      element.removeChild(element.firstChild);
    }

    if (child) element.appendChild(child);
  }

  function restoreFocus(element) {
    if (!element) return;

    try {
      element.focus({ preventScroll: true });
    } catch (_) {
      element.focus();
    }
  }

  // Add credits and stories by replacing the blank strings in this object.
  // Blank values are omitted from the public detail cards until they are confirmed.
  const albumDetailProfiles = {
    album: {
      eyebrow: "Album details",
      title: "EP #1",
      meta: "Balaganist · 2016 · Four tracks",
      sections: [
        {
          title: "Album credits",
          fields: {
            "Produced by": "Ron J. Ward",
            "Executive producer": "",
            "Recorded by": "",
            "Recorded at": "",
            "Mixed by": "Ron J. Ward",
            "Mastered by": "Ron J. Ward",
            "Artwork / design": "Itamar Heifetz",
            "Photography": "Takafumi Koda",
            "Label / catalog": "Self-released",
            "Release year": "2016"
          }
        },
        {
          title: "Inside the album",
          layout: "wide",
          fields: {
            "Background / story": "EP #1 was self-released in 2016, one year after Ron J. Ward founded Balaganist in Tokyo.",
            "Recording notes": "",
            "Fun facts": "",
            "Special thanks": ""
          }
        }
      ]
    },

    "zen-hummus": {
      eyebrow: "Track 01",
      title: "Zen & Hummus",
      meta: "08:11 · EP #1",
      sections: [
        {
          title: "Track credits",
          fields: {
            "Composed by": "",
            "Arranged by": "",
            "Guitar": "",
            "Bass": "",
            "Drums": "",
            "Violin": "",
            "Saxophone": "",
            "Keyboards": "",
            "Percussion": "",
            "Additional musicians": "",
            "Produced by": "Ron J. Ward",
            "Recorded by": "",
            "Recorded at": "",
            "Mixed by": "Ron J. Ward",
            "Mastered by": "Ron J. Ward"
          }
        },
        {
          title: "Behind the track",
          layout: "wide",
          fields: {
            "Background / story": "",
            "Recording notes": "",
            "Fun facts": "",
            "Time signature(s)": "",
            "Gear / sounds": ""
          }
        }
      ]
    },

    "slap-happy": {
      eyebrow: "Track 02",
      title: "Slap Happy",
      meta: "05:18 · EP #1",
      sections: [
        {
          title: "Track credits",
          fields: {
            "Composed by": "",
            "Arranged by": "",
            "Guitar": "",
            "Bass": "",
            "Drums": "",
            "Violin": "",
            "Saxophone": "",
            "Keyboards": "",
            "Percussion": "",
            "Additional musicians": "",
            "Produced by": "Ron J. Ward",
            "Recorded by": "",
            "Recorded at": "",
            "Mixed by": "Ron J. Ward",
            "Mastered by": "Ron J. Ward"
          }
        },
        {
          title: "Behind the track",
          layout: "wide",
          fields: {
            "Background / story": "",
            "Recording notes": "",
            "Fun facts": "",
            "Time signature(s)": "",
            "Gear / sounds": ""
          }
        }
      ]
    },

    nomuzo: {
      eyebrow: "Track 03",
      title: "Nomuzo",
      meta: "05:48 · EP #1",
      sections: [
        {
          title: "Track credits",
          fields: {
            "Composed by": "",
            "Arranged by": "",
            "Guitar": "",
            "Bass": "",
            "Drums": "",
            "Violin": "",
            "Saxophone": "",
            "Keyboards": "",
            "Percussion": "",
            "Additional musicians": "",
            "Produced by": "Ron J. Ward",
            "Recorded by": "",
            "Recorded at": "",
            "Mixed by": "Ron J. Ward",
            "Mastered by": "Ron J. Ward"
          }
        },
        {
          title: "Behind the track",
          layout: "wide",
          fields: {
            "Background / story": "",
            "Recording notes": "",
            "Fun facts": "",
            "Time signature(s)": "",
            "Gear / sounds": ""
          }
        }
      ]
    },

    five: {
      eyebrow: "Track 04",
      title: "Five",
      meta: "05:00 · EP #1",
      sections: [
        {
          title: "Track credits",
          fields: {
            "Composed by": "",
            "Arranged by": "",
            "Guitar": "",
            "Bass": "",
            "Drums": "",
            "Violin": "",
            "Saxophone": "",
            "Keyboards": "",
            "Percussion": "",
            "Additional musicians": "",
            "Produced by": "Ron J. Ward",
            "Recorded by": "",
            "Recorded at": "",
            "Mixed by": "Ron J. Ward",
            "Mastered by": "Ron J. Ward"
          }
        },
        {
          title: "Behind the track",
          layout: "wide",
          fields: {
            "Background / story": "",
            "Recording notes": "",
            "Fun facts": "",
            "Time signature(s)": "",
            "Gear / sounds": ""
          }
        }
      ]
    }
  };

  const memberProfiles = {
    ron: {
      name: "Ron J. Ward",
      role: "Guitars · Composition",
      image: "img/guitar-rec.jpg",
      alt: "Ron J. Ward playing guitar on stage",
      bio: "Ron J. Ward is a Japan-based composer, guitarist, producer and founder of Balaganist, which he formed in Tokyo in 2015. His work spans game and media music, sound design, mixing and mastering, but rhythm is at the centre of it all—especially odd meters and grooves that feel natural rather than mathematical. In Balaganist, he writes most of the music and shapes its beautiful collision of progressive rock, jazz and sounds from around the world.",
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
      name: "Kevin Carter",
      role: "Soprano Saxophone",
      image: "img/carter.jpg",
      alt: "Kevin Carter playing saxophone",
      bio: "Kevin Carter is the soprano saxophonist heard on Balaganist’s 2016 EP #1. A key voice in the band’s original studio lineup, his playing gives the music a bright, vocal lead sound that moves naturally between jazz phrasing and progressive-rock contours.",
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

  function setupAmbientEffects() {
    const panels = document.querySelectorAll(".section-shell");

    if (!hasFinePointer || reduceMotion) return;

    document.body.classList.add("has-fine-pointer");

    let ambientFrame = null;
    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight * 0.38;

    function renderAmbientLight() {
      const x = Math.max(0, Math.min(100, pointerX / Math.max(1, window.innerWidth) * 100));
      const y = Math.max(0, Math.min(100, pointerY / Math.max(1, window.innerHeight) * 100));

      document.documentElement.style.setProperty("--ambient-x", x.toFixed(2) + "%");
      document.documentElement.style.setProperty("--ambient-y", y.toFixed(2) + "%");
      ambientFrame = null;
    }

    window.addEventListener("mousemove", function (event) {
      pointerX = event.clientX;
      pointerY = event.clientY;

      if (ambientFrame === null) {
        ambientFrame = window.requestAnimationFrame(renderAmbientLight);
      }
    });

    panels.forEach(function (panel) {
      let panelFrame = null;
      let localX = 50;
      let localY = 30;

      function renderPanelSpotlight() {
        panel.style.setProperty("--spotlight-x", localX.toFixed(2) + "%");
        panel.style.setProperty("--spotlight-y", localY.toFixed(2) + "%");
        panelFrame = null;
      }

      panel.addEventListener("mousemove", function (event) {
        const bounds = panel.getBoundingClientRect();
        localX = (event.clientX - bounds.left) / Math.max(1, bounds.width) * 100;
        localY = (event.clientY - bounds.top) / Math.max(1, bounds.height) * 100;
        panel.classList.add("is-pointer-active");

        if (panelFrame === null) {
          panelFrame = window.requestAnimationFrame(renderPanelSpotlight);
        }
      });

      panel.addEventListener("mouseleave", function () {
        panel.classList.remove("is-pointer-active");
      });
    });
  }

  function setupJourneyRail() {
    const rail = document.querySelector("[data-journey-rail]");
    const progress = document.querySelector("[data-journey-progress]");
    const links = document.querySelectorAll("[data-journey-link]");

    if (!rail || !progress || !links.length) return;

    const sections = [];
    links.forEach(function (link) {
      const section = document.getElementById(link.getAttribute("data-journey-link"));
      if (section) sections.push({ link: link, section: section });
    });

    if (!sections.length) return;

    let frame = null;

    function updateJourneyRail() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || 0;
      const scrollRange = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const pageProgress = Math.max(0, Math.min(1, scrollTop / scrollRange));
      const focusLine = window.innerHeight * 0.52;
      let activeSection = null;

      progress.style.transform = "scaleY(" + pageProgress.toFixed(4) + ")";

      sections.forEach(function (item) {
        if (item.section.getBoundingClientRect().top <= focusLine) {
          activeSection = item.section.id;
        }
      });

      sections.forEach(function (item) {
        const active = item.section.id === activeSection;
        item.link.classList.toggle("is-active", active);

        if (active) {
          item.link.setAttribute("aria-current", "true");
        } else {
          item.link.removeAttribute("aria-current");
        }
      });

      frame = null;
    }

    function scheduleJourneyUpdate() {
      if (frame !== null) return;
      frame = window.requestAnimationFrame(updateJourneyRail);
    }

    window.addEventListener("scroll", scheduleJourneyUpdate, { passive: true });
    window.addEventListener("resize", scheduleJourneyUpdate);
    updateJourneyRail();
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
      replaceElementChildren(title, fragment);
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
    if (reduceMotion || !hasFinePointer) return;

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
    const albumCover = albumObject ? albumObject.querySelector(".album-sleeve") : null;
    const albumInsert = albumObject ? albumObject.querySelector(".album-insert") : null;
    const insertToggle = albumObject ? albumObject.querySelector("[data-album-insert-toggle]") : null;
    const trackButtons = document.querySelectorAll("[data-bandcamp-track]");
    const player = document.getElementById("bandcamp-player");
    const playerStatus = document.getElementById("bandcamp-selection-status");
    const playerSurface = document.querySelector("[data-signal-player]");
    const playerState = document.querySelector("[data-player-state]");
    const playerTrackTitle = document.querySelector("[data-player-track-title]");
    const playerTrackMeta = document.querySelector("[data-player-track-meta]");

    if (!trackButtons.length || !player || !playerSurface) return;

    let tiltFrame = 0;
    let insertCloseTimer = null;
    let pendingTrack = null;

    function finishInsertClose() {
      if (!albumObject) return;
      albumObject.classList.remove("is-insert-closing");
      insertCloseTimer = null;
    }

    function setInsertAccessibility(open) {
      if (!albumInsert) return;

      albumInsert.setAttribute("aria-hidden", open ? "false" : "true");
      albumInsert.querySelectorAll("button, a").forEach(function (control) {
        if (open) {
          control.removeAttribute("tabindex");
        } else {
          control.setAttribute("tabindex", "-1");
        }
      });
    }

    function setInsertOpen(open) {
      if (!albumObject || !insertToggle) return;
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
      setInsertAccessibility(open);
    }

    function resetTilt() {
      if (!albumCover) return;

      if (tiltFrame) {
        window.cancelAnimationFrame(tiltFrame);
        tiltFrame = 0;
      }

      albumCover.style.setProperty("--sleeve-rotate-x", "0deg");
      albumCover.style.setProperty("--sleeve-rotate-y", "0deg");
      albumCover.style.setProperty("--foil-x", "34%");
      albumCover.style.setProperty("--foil-y", "24%");
    }

    function setTrackButtonState(trackId, loading) {
      trackButtons.forEach(function (trackButton) {
        const selected = trackButton.getAttribute("data-bandcamp-track") === trackId;
        const hint = trackButton.querySelector(".signal-player__track-copy small");

        trackButton.classList.toggle("is-selected", selected);
        trackButton.classList.toggle("is-loading", selected && loading);
        trackButton.setAttribute("aria-pressed", selected ? "true" : "false");

        if (hint) {
          if (!selected) {
            hint.textContent = "Load track";
          } else {
            hint.textContent = loading ? "Loading Bandcamp…" : "Selected track";
          }
        }
      });
    }

    function playBandcampTrack(button) {
      const trackId = button.getAttribute("data-bandcamp-track");
      const trackTitle = button.getAttribute("data-track-title") || "Selected track";
      const trackNumber = button.getAttribute("data-track-number") || "";
      const trackDuration = button.getAttribute("data-track-duration") || "";
      const baseUrl = player.getAttribute("data-bandcamp-base");

      if (!trackId || !baseUrl) return;

      setTrackButtonState(trackId, true);
      pendingTrack = {
        id: trackId,
        title: trackTitle,
        number: trackNumber,
        duration: trackDuration
      };

      playerSurface.classList.add("has-selection");
      playerSurface.classList.add("is-loading");

      if (playerState) playerState.textContent = "Loading Bandcamp";
      if (playerTrackTitle) playerTrackTitle.textContent = trackTitle;
      if (playerTrackMeta) {
        playerTrackMeta.textContent = "Track " + trackNumber + (trackDuration ? " · " + trackDuration : "");
      }

      player.title = "Play " + trackTitle + " by Balaganist on Bandcamp";
      player.setAttribute(
        "src",
        baseUrl + "track=" + encodeURIComponent(trackId) + "/autoplay=true/transparent=true/"
      );

      if (playerStatus) {
        playerStatus.textContent = "Loading “" + trackTitle + "”…";
      }
    }

    if (insertToggle) {
      setInsertAccessibility(albumObject.classList.contains("is-insert-open"));

      insertToggle.addEventListener("click", function () {
        setInsertOpen(insertToggle.getAttribute("aria-expanded") !== "true");
      });
    }

    trackButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        playBandcampTrack(button);
      });
    });

    player.addEventListener("load", function () {
      if (!pendingTrack) return;

      setTrackButtonState(pendingTrack.id, false);
      playerSurface.classList.remove("is-loading");

      if (playerState) playerState.textContent = "Track loaded";

      if (playerStatus) {
        playerStatus.textContent = "“" + pendingTrack.title + "” is ready. Press play below if it did not start automatically.";
      }

      pendingTrack = null;
    });

    if (albumCover && !reduceMotion && hasFinePointer) {
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

  function setupAlbumDetails() {
    const modal = document.getElementById("album-details-modal");
    const modalCard = modal ? modal.querySelector(".album-details-card") : null;
    const closeButton = modal ? modal.querySelector("[data-album-details-close]") : null;
    const eyebrow = document.getElementById("album-details-eyebrow");
    const title = document.getElementById("album-details-title");
    const meta = document.getElementById("album-details-meta");
    const sectionsContainer = document.getElementById("album-details-sections");
    const detailButtons = document.querySelectorAll("[data-album-detail]");

    if (
      !modal ||
      !modalCard ||
      !closeButton ||
      !eyebrow ||
      !title ||
      !meta ||
      !sectionsContainer ||
      !detailButtons.length
    ) {
      return;
    }

    let lastTrigger = null;

    function renderSections(sections) {
      const fragment = document.createDocumentFragment();

      sections.forEach(function (sectionData) {
        const populatedLabels = Object.keys(sectionData.fields).filter(function (label) {
          const value = sectionData.fields[label];
          return value !== null && typeof value !== "undefined" && String(value).trim();
        });

        if (!populatedLabels.length) return;

        const section = document.createElement("section");
        const heading = document.createElement("h3");
        const fields = document.createElement("dl");

        section.className = "album-details-card__section";
        if (sectionData.layout === "wide") {
          section.classList.add("album-details-card__section--wide");
        }

        heading.textContent = sectionData.title;
        fields.className = "album-details-card__fields";

        populatedLabels.forEach(function (label) {
          const text = String(sectionData.fields[label]).trim();
          const row = document.createElement("div");
          const term = document.createElement("dt");
          const description = document.createElement("dd");

          row.className = "album-details-card__field";
          term.textContent = label;
          description.textContent = text;

          row.appendChild(term);
          row.appendChild(description);
          fields.appendChild(row);
        });

        section.appendChild(heading);
        section.appendChild(fields);
        fragment.appendChild(section);
      });

      replaceElementChildren(sectionsContainer, fragment);
    }

    function finishClose() {
      document.body.classList.remove("album-details-open");
      modal.classList.remove("is-fallback");

      if (lastTrigger) {
        restoreFocus(lastTrigger);
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

    function openDetails(trigger) {
      const profile = albumDetailProfiles[trigger.dataset.albumDetail];
      if (!profile) return;

      eyebrow.textContent = profile.eyebrow;
      title.textContent = profile.title;
      meta.textContent = profile.meta;
      renderSections(profile.sections);

      lastTrigger = trigger;
      modalCard.scrollTop = 0;
      document.body.classList.add("album-details-open");

      if (!modal.hasAttribute("open")) {
        if (typeof modal.showModal === "function") {
          modal.showModal();
        } else {
          modal.classList.add("is-fallback");
          modal.setAttribute("open", "");
          closeButton.focus();
        }
      }
    }

    detailButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        openDetails(button);
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

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-fallback")) {
        closeModal();
      }
    });
  }

  function setupMemberBios() {
    const modal = document.getElementById("member-modal");
    const modalSurface = modal ? modal.querySelector(".member-modal__surface") : null;
    const modalImage = document.getElementById("member-modal-image");
    const modalName = document.getElementById("member-modal-name");
    const modalRole = document.getElementById("member-modal-role");
    const modalBio = document.getElementById("member-modal-bio");
    const modalSocials = document.getElementById("member-modal-socials");
    const closeButton = modal ? modal.querySelector("[data-member-modal-close]") : null;
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
      modal.classList.remove("is-fallback");

      if (lastTrigger) {
        restoreFocus(lastTrigger);
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
      replaceElementChildren(modalSocials);

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
          modal.classList.add("is-fallback");
          modal.setAttribute("open", "");
          closeButton.focus();
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

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && modal.classList.contains("is-fallback")) {
        closeModal();
      }
    });
  }

  function escapeHtml(value) {
    return String(value || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function toCalendarTimestamp(value) {
    return new Date(value).toISOString().replace(/[-:]/g, "").replace(/\.\d{3}Z$/, "Z");
  }

  function buildGoogleCalendarUrl(show) {
    const location = show.address || [show.venue, show.city].filter(Boolean).join(", ");
    const params = {
      action: "TEMPLATE",
      text: show.title,
      dates: toCalendarTimestamp(show.start) + "/" + toCalendarTimestamp(show.end),
      details: show.note || "Balaganist live",
      location: location,
      ctz: show.timezone || "Asia/Tokyo"
    };
    const query = Object.keys(params).map(function (key) {
      return encodeURIComponent(key) + "=" + encodeURIComponent(params[key]);
    }).join("&");

    return "https://calendar.google.com/calendar/render?" + query;
  }

  function escapeIcs(value) {
    return String(value || "")
      .replace(/\\/g, "\\\\")
      .replace(/;/g, "\\;")
      .replace(/,/g, "\\,")
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
    document.body.removeChild(link);
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
    setupAmbientEffects();
    setupJourneyRail();
    setupHeader();
    setupKineticTypography();
    setupRevealAnimations();
    setupMemberTilt();
    setupAlbumExperience();
    setupAlbumDetails();
    setupMemberBios();
    renderShows();
    setupContactForm();
    setupNewsletterForm();
  });
})();
