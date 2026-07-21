(function () {
  "use strict";

  const PANORAMA_URL = "img/balaganist-panorama.webp";
  const START_YAW = -60;
  const FULL_ROTATION = 360;

  /* A slightly wider view so the panorama feels less zoomed in. */
  const TARGET_VERTICAL_FOV = 62;
  const MAX_HORIZONTAL_FOV = 100;
  const MIN_HORIZONTAL_FOV = 28;

  /* Time-based smoothing works consistently at different frame rates. */
  const PAN_FOLLOW_SPEED = 6.5;
  const MAX_FRAME_DELTA = 50;
  const YAW_EPSILON = 0.01;
  const FALLBACK_EPSILON = 0.0001;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  document.addEventListener("DOMContentLoaded", function () {
    const panorama = document.querySelector(".panorama");
    const img1 = document.getElementById("img1");
    const img2 = document.getElementById("img2");
    if (!panorama || !img1 || !img2) return;

    let viewer = null;
    let viewerLayer = null;
    let viewerReady = false;
    let viewerFailed = false;
    let targetYaw = START_YAW;
    let currentYaw = START_YAW;
    let targetFallbackProgress = 0;
    let currentFallbackProgress = 0;
    let yawFrame = null;
    let fallbackFrame = null;
    let resizeFrame = null;
    let lastYawFrameTime = null;
    let lastFallbackFrameTime = null;
    let fallbackImageWidth = 0;

    function getScrollProgress() {
      const maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      return Math.min(1, Math.max(0, window.scrollY / maxScroll));
    }

    function normalizeYaw(yaw) {
      return ((yaw + 180) % 360 + 360) % 360 - 180;
    }

    function getHorizontalFov() {
      const aspect = window.innerWidth / Math.max(1, window.innerHeight);
      const verticalRadians = TARGET_VERTICAL_FOV * Math.PI / 180;
      const horizontalRadians = 2 * Math.atan(Math.tan(verticalRadians / 2) * aspect);
      const horizontalDegrees = horizontalRadians * 180 / Math.PI;
      return Math.min(MAX_HORIZONTAL_FOV, Math.max(MIN_HORIZONTAL_FOV, horizontalDegrees));
    }

    function measureFallbackImage() {
      const measuredWidth = img1.getBoundingClientRect().width;
      fallbackImageWidth = measuredWidth > 0
        ? measuredWidth
        : Math.max(1, window.innerHeight * 2);
    }

    function positionFallback(progress) {
      if (!fallbackImageWidth) {
        measureFallbackImage();
      }

      const left = -fallbackImageWidth * progress;
      img1.style.transform = `translate3d(${left}px, 0, 0)`;
      img2.style.transform = `translate3d(${left + fallbackImageWidth}px, 0, 0)`;
    }

    function getFrameBlend(timestamp, previousTimestamp) {
      const elapsed = previousTimestamp === null
        ? 1000 / 60
        : Math.min(
            MAX_FRAME_DELTA,
            Math.max(1, timestamp - previousTimestamp)
          );

      return 1 - Math.exp(-PAN_FOLLOW_SPEED * elapsed / 1000);
    }

    function renderFallback(timestamp) {
      fallbackFrame = null;

      if (viewerReady) {
        lastFallbackFrameTime = null;
        return;
      }

      const difference =
        targetFallbackProgress - currentFallbackProgress;

      if (reduceMotion || Math.abs(difference) <= FALLBACK_EPSILON) {
        currentFallbackProgress = targetFallbackProgress;
      } else {
        currentFallbackProgress += difference * getFrameBlend(
          timestamp,
          lastFallbackFrameTime
        );
      }

      lastFallbackFrameTime = timestamp;

      if (
        Math.abs(targetFallbackProgress - currentFallbackProgress) <=
        FALLBACK_EPSILON
      ) {
        currentFallbackProgress = targetFallbackProgress;
      }

      positionFallback(currentFallbackProgress);

      if (currentFallbackProgress !== targetFallbackProgress) {
        fallbackFrame = window.requestAnimationFrame(renderFallback);
      } else {
        lastFallbackFrameTime = null;
      }
    }

    function scheduleFallback() {
      if (viewerReady || fallbackFrame !== null) return;

      lastFallbackFrameTime = null;
      fallbackFrame = window.requestAnimationFrame(renderFallback);
    }

    function renderYaw(timestamp) {
      yawFrame = null;

      if (!viewerReady || !viewer) {
        lastYawFrameTime = null;
        return;
      }

      const difference = targetYaw - currentYaw;

      if (reduceMotion || Math.abs(difference) <= YAW_EPSILON) {
        currentYaw = targetYaw;
      } else {
        currentYaw += difference * getFrameBlend(
          timestamp,
          lastYawFrameTime
        );
      }

      lastYawFrameTime = timestamp;

      if (Math.abs(targetYaw - currentYaw) <= YAW_EPSILON) {
        currentYaw = targetYaw;
      }

      /*
       * Pitch is already locked to zero in the viewer configuration,
       * so only yaw needs to be updated while scrolling.
       */
      viewer.setYaw(normalizeYaw(currentYaw), false);

      if (currentYaw !== targetYaw) {
        yawFrame = window.requestAnimationFrame(renderYaw);
      } else {
        lastYawFrameTime = null;
      }
    }

    function scheduleYaw() {
      if (!viewerReady || yawFrame !== null) return;

      lastYawFrameTime = null;
      yawFrame = window.requestAnimationFrame(renderYaw);
    }

    function updateFromScroll() {
      const progress = reduceMotion ? 0 : getScrollProgress();
      targetFallbackProgress = progress;
      targetYaw = START_YAW + FULL_ROTATION * progress;
      scheduleFallback();
      scheduleYaw();
    }

    function handleResize() {
      if (resizeFrame !== null) {
        window.cancelAnimationFrame(resizeFrame);
      }

      resizeFrame = window.requestAnimationFrame(function () {
        resizeFrame = null;

        measureFallbackImage();
        positionFallback(currentFallbackProgress);

        if (!viewerReady || !viewer) return;

        const horizontalFov = getHorizontalFov();

        viewer.resize();
        viewer.setHfovBounds([horizontalFov, horizontalFov]);
        viewer.setHfov(horizontalFov, false);
        viewer.setPitch(0, false);
      });
    }

    function keepFlatFallback(error) {
      if (viewerFailed) return;
      viewerFailed = true;
      viewerReady = false;
      panorama.classList.add("is-fallback");

      if (viewer) {
        try { viewer.destroy(); } catch (_) { /* Pannellum may already be torn down. */ }
        viewer = null;
      }
      if (viewerLayer) {
        viewerLayer.remove();
        viewerLayer = null;
      }

      img1.hidden = false;
      img2.hidden = false;
      updateFromScroll();
      if (error) console.warn("360° viewer unavailable; using the flat scrolling panorama.", error);
    }

    function initializeViewer() {
      if (!window.pannellum) throw new Error("Pannellum did not load.");

      const horizontalFov = getHorizontalFov();
      viewerLayer = document.createElement("div");
      viewerLayer.className = "panorama-viewer";
      panorama.appendChild(viewerLayer);

      viewer = window.pannellum.viewer(viewerLayer, {
        type: "equirectangular",
        panorama: PANORAMA_URL,
        autoLoad: true,
        yaw: normalizeYaw(START_YAW),
        pitch: 0,
        minPitch: 0,
        maxPitch: 0,
        hfov: horizontalFov,
        minHfov: horizontalFov,
        maxHfov: horizontalFov,
        draggable: false,
        mouseZoom: false,
        keyboardZoom: false,
        disableKeyboardCtrl: true,
        showControls: false,
        showFullscreenCtrl: false,
        orientationOnByDefault: false,
        compass: false,
        horizonPitch: 0,
        horizonRoll: 0,
        ignoreGPanoXMP: true,
        backgroundColor: [0.035, 0.035, 0.039]
      });

      viewer.on("load", function () {
        if (viewerFailed) return;
        currentYaw = targetYaw;
        viewer.setPitch(0, false);
        viewer.setYaw(normalizeYaw(currentYaw), false);
        viewerReady = true;
        panorama.classList.add("is-viewer-ready");
        viewerLayer.classList.add("is-ready");

        window.setTimeout(function () {
          if (!viewerReady) return;
          img1.hidden = true;
          img2.hidden = true;
        }, 500);
        scheduleYaw();
      });

      viewer.on("error", function (message) {
        keepFlatFallback(new Error(String(message)));
      });
    }

    img1.addEventListener("load", handleResize, { once: true });
    window.addEventListener("scroll", updateFromScroll, { passive: true });
    window.addEventListener("resize", handleResize);
    updateFromScroll();
    positionFallback(0);

    try {
      initializeViewer();
    } catch (error) {
      keepFlatFallback(error);
    }
  });
})();
