document.addEventListener("DOMContentLoaded", function() {
  const panorama = document.querySelector(".panorama");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  function adjustImagePositions(newLeft) {
    if (newLeft > 0) {
      img1.style.left = `${newLeft - img1.offsetWidth}px`;
      img2.style.left = `${newLeft}px`;
    } else if (newLeft < -img1.offsetWidth) {
      img1.style.left = `${newLeft + img2.offsetWidth}px`;
      img2.style.left = `${newLeft}px`;
    } else {
      img1.style.left = `${newLeft}px`;
      img2.style.left = `${newLeft + img1.offsetWidth}px`;
    }
  }

  const initialPosition = -img1.offsetWidth / 3;
  adjustImagePositions(initialPosition);

  let lastScrollY = window.pageYOffset;
  let targetLeft = initialPosition;
  let currentLeft = initialPosition;

  function easeOutQuad(t) {
    return t * (2 - t);
  }

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = window.pageYOffset / scrollHeight;
    const startPosition = -img1.offsetWidth / 3;
    targetLeft = startPosition + (-img1.offsetWidth * scrollPercentage);
  }

  function animate() {
    currentLeft += (targetLeft - currentLeft) * 0.1; // Adjust the easing factor (0.1) to make it smoother or sharper
    adjustImagePositions(currentLeft);
    requestAnimationFrame(animate);
  }

  window.addEventListener("scroll", handleScroll);
  requestAnimationFrame(animate);
});