document.addEventListener("DOMContentLoaded", function () {
  const panorama = document.querySelector(".panorama");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  if (!panorama) return;

  const PANORAMA_URL = "img/balaganist_Panorama.jpg";
  const PANNELLUM_VERSION = "2.5.7";
  const PANNELLUM_CSS = `https://cdn.jsdelivr.net/npm/pannellum@${PANNELLUM_VERSION}/build/pannellum.css`;
  const PANNELLUM_JS = `https://cdn.jsdelivr.net/npm/pannellum@${PANNELLUM_VERSION}/build/pannellum.js`;
  const START_YAW = -60;
  const FULL_ROTATION = 360;
  const MAX_HORIZONTAL_FOV = 90;
  const TARGET_VERTICAL_FOV = 65;

  let viewer = null;
  let viewerReady = false;
  let fallbackStarted = false;
  let targetYaw = START_YAW;
  let currentYaw = START_YAW;
  let yawFrame = null;
  let resizeFrame = null;

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function normalizeYaw(yaw) {
    return ((yaw + 180) % 360 + 360) % 360 - 180;
  }

  function getScrollProgress() {
    const maxScroll = Math.max(
      1,
      document.documentElement.scrollHeight - window.innerHeight
    );

    return Math.min(1, Math.max(0, window.scrollY / maxScroll));
  }

  function getHorizontalFov() {
    const aspect = window.innerWidth / Math.max(1, window.innerHeight);
    const verticalRadians = TARGET_VERTICAL_FOV * Math.PI / 180;
    const horizontalRadians = 2 * Math.atan(
      Math.tan(verticalRadians / 2) * aspect
    );
    const horizontalDegrees = horizontalRadians * 180 / Math.PI;

    return Math.min(MAX_HORIZONTAL_FOV, Math.max(25, horizontalDegrees));
  }

  function handleScroll() {
    targetYaw = START_YAW + FULL_ROTATION * getScrollProgress();

    if (reduceMotion) currentYaw = targetYaw;
    scheduleYawRender();
  }

  function scheduleYawRender() {
    if (!viewerReady || yawFrame !== null) return;
    yawFrame = window.requestAnimationFrame(renderYaw);
  }

  function renderYaw() {
    yawFrame = null;

    if (!viewerReady) return;

    const difference = targetYaw - currentYaw;
    currentYaw = reduceMotion || Math.abs(difference) < 0.01
      ? targetYaw
      : currentYaw + difference * 0.1;

    viewer.setYaw(normalizeYaw(currentYaw), false);

    if (Math.abs(targetYaw - currentYaw) >= 0.01) scheduleYawRender();
  }

  function handleResize() {
    if (!viewerReady) return;

    window.cancelAnimationFrame(resizeFrame);
    resizeFrame = window.requestAnimationFrame(function () {
      const horizontalFov = getHorizontalFov();
      viewer.setHfovBounds([horizontalFov, horizontalFov]);
      viewer.setHfov(horizontalFov, false);
      viewer.resize();
    });
  }

  function loadStylesheet(url) {
    return new Promise(function (resolve, reject) {
      const existing = document.querySelector(`link[href="${url}"]`);
      if (existing) {
        resolve();
        return;
      }

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = url;
      link.onload = resolve;
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  function loadScript(url) {
    return new Promise(function (resolve, reject) {
      if (window.pannellum) {
        resolve();
        return;
      }

      const script = document.createElement("script");
      script.src = url;
      script.onload = resolve;
      script.onerror = reject;
      document.head.appendChild(script);
    });
  }

  function startFlatFallback() {
    if (fallbackStarted || !img1 || !img2) return;
    fallbackStarted = true;
    viewerReady = false;

    if (yawFrame !== null) {
      window.cancelAnimationFrame(yawFrame);
      yawFrame = null;
    }

    window.removeEventListener("scroll", handleScroll);
    window.removeEventListener("resize", handleResize);

    if (viewer) {
      viewer.destroy();
      viewer = null;
    }

    panorama.replaceChildren(img1, img2);
    panorama.removeAttribute("aria-hidden");
    [
      "position",
      "inset",
      "width",
      "height",
      "overflow",
      "pointer-events",
      "z-index"
    ].forEach(function (property) {
      panorama.style.removeProperty(property);
    });

    let fallbackTarget = -img1.offsetWidth / 3;
    let fallbackCurrent = fallbackTarget;

    function positionImages(newLeft) {
      const imageWidth = img1.offsetWidth;
      const wrappedLeft = ((newLeft % imageWidth) + imageWidth) % imageWidth;
      const firstLeft = wrappedLeft - imageWidth;

      img1.style.left = `${firstLeft}px`;
      img2.style.left = `${firstLeft + imageWidth}px`;
    }

    function updateFallbackTarget() {
      fallbackTarget = -img1.offsetWidth / 3 - img1.offsetWidth * getScrollProgress();
    }

    function animateFallback() {
      fallbackCurrent += (fallbackTarget - fallbackCurrent) * 0.1;
      positionImages(fallbackCurrent);
      window.requestAnimationFrame(animateFallback);
    }

    updateFallbackTarget();
    window.addEventListener("scroll", updateFallbackTarget, { passive: true });
    window.addEventListener("resize", updateFallbackTarget);
    window.requestAnimationFrame(animateFallback);
  }

  function initializeViewer() {
    if (!window.pannellum) throw new Error("Pannellum did not load.");

    const horizontalFov = getHorizontalFov();

    panorama.replaceChildren();
    panorama.setAttribute("aria-hidden", "true");
    panorama.style.position = "fixed";
    panorama.style.inset = "0";
    panorama.style.width = "100%";
    panorama.style.height = "100vh";
    panorama.style.overflow = "hidden";
    panorama.style.pointerEvents = "none";
    panorama.style.zIndex = "-1";

    viewer = window.pannellum.viewer(panorama, {
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
      backgroundColor: [0.102, 0.106, 0.114]
    });

    viewer.on("load", function () {
      handleScroll();
      currentYaw = targetYaw;
      viewer.setPitch(0, false);
      viewer.setYaw(normalizeYaw(currentYaw), false);
      viewerReady = true;
      scheduleYawRender();
    });

    viewer.on("error", function (message) {
      console.error("Panorama failed to load:", message);
      startFlatFallback();
    });

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleResize);
  }

  Promise.all([
    loadStylesheet(PANNELLUM_CSS),
    loadScript(PANNELLUM_JS)
  ]).then(initializeViewer).catch(function (error) {
    console.error("360° viewer unavailable; using the flat panorama fallback.", error);
    startFlatFallback();
  });
});
