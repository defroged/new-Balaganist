(function () {
  "use strict";

  const PANORAMA_URL = "img/balaganist-panorama.webp";
  const START_YAW = -60;
  const FULL_ROTATION = 360;
  const TARGET_VERTICAL_FOV = 50;
  const MAX_HORIZONTAL_FOV = 78;
  const MIN_HORIZONTAL_FOV = 26;

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

    function positionFallback(progress) {
      const imageWidth = img1.getBoundingClientRect().width || window.innerHeight * 2;
      const left = -imageWidth * progress;
      img1.style.transform = `translate3d(${left}px, 0, 0)`;
      img2.style.transform = `translate3d(${left + imageWidth}px, 0, 0)`;
    }

    function renderFallback() {
      fallbackFrame = null;
      if (viewerReady) return;

      const difference = targetFallbackProgress - currentFallbackProgress;
      currentFallbackProgress = reduceMotion || Math.abs(difference) < 0.0001
        ? targetFallbackProgress
        : currentFallbackProgress + difference * 0.085;
      positionFallback(currentFallbackProgress);

      if (Math.abs(targetFallbackProgress - currentFallbackProgress) >= 0.0001) {
        fallbackFrame = window.requestAnimationFrame(renderFallback);
      }
    }

    function scheduleFallback() {
      if (viewerReady || fallbackFrame !== null) return;
      fallbackFrame = window.requestAnimationFrame(renderFallback);
    }

    function renderYaw() {
      yawFrame = null;
      if (!viewerReady || !viewer) return;

      const difference = targetYaw - currentYaw;
      currentYaw = Math.abs(difference) < 0.01
        ? targetYaw
        : currentYaw + difference * 0.085;
      viewer.setYaw(normalizeYaw(currentYaw), false);
      viewer.setPitch(0, false);

      if (Math.abs(targetYaw - currentYaw) >= 0.01) {
        yawFrame = window.requestAnimationFrame(renderYaw);
      }
    }

    function scheduleYaw() {
      if (!viewerReady || yawFrame !== null) return;
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
      window.cancelAnimationFrame(resizeFrame);
      resizeFrame = window.requestAnimationFrame(function () {
        positionFallback(currentFallbackProgress);
        if (!viewerReady || !viewer) return;
        const horizontalFov = getHorizontalFov();
        viewer.setHfovBounds([horizontalFov, horizontalFov]);
        viewer.setHfov(horizontalFov, false);
        viewer.setPitch(0, false);
        viewer.resize();
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
