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

  // Improved handleScroll to handle an initial mid-position start
  function handleScroll(useInitial = false) {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrollPercentage = window.pageYOffset / scrollHeight;
    
    // Set the initial middle position if requested
    if (useInitial) {
      scrollPercentage = 0.5;  // Adjust this value to choose where the middle is
    }

    const newLeft = -img1.offsetWidth * scrollPercentage;
    adjustImagePositions(newLeft);
  }

  // Call with initial setup flag
  handleScroll(true);

  window.addEventListener("scroll", () => handleScroll());
});
