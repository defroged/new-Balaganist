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

  // Set the initial position of the panorama image to the middle
  const initialPosition = -img1.offsetWidth / 2;
  adjustImagePositions(initialPosition);

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = window.pageYOffset / scrollHeight;
    const newLeft = -img1.offsetWidth * scrollPercentage;
    adjustImagePositions(newLeft);
  }

  window.addEventListener("scroll", handleScroll);
});