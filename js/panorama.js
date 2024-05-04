document.addEventListener("DOMContentLoaded", function() {
  const panorama = document.querySelector(".panorama");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");
  let isInitialLoad = true;  // Track if we're at initial load

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

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = window.pageYOffset / scrollHeight;

    // If it's the initial load, simulate the scroll position as middle
    if (isInitialLoad) {
      scrollPercentage = 0.5; // Mid point to start
      isInitialLoad = false; // Reset the flag after setting initial position
    }

    const newLeft = -img1.offsetWidth * scrollPercentage;
    adjustImagePositions(newLeft);
  }

  // Initial setup for a middle start
  handleScroll();

  window.addEventListener("scroll", handleScroll);
});
