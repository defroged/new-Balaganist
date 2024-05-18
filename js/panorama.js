document.addEventListener("DOMContentLoaded", function() {
  const panorama = document.querySelector(".panorama");
  const img1 = document.getElementById("img1");
  const img2 = document.getElementById("img2");

  function adjustImagePositions(newLeft) {
    const imgWidth = img1.offsetWidth;
    if (newLeft > 0) {
      img1.style.left = `${newLeft - imgWidth}px`;
      img2.style.left = `${newLeft}px`;
    } else if (newLeft < -imgWidth) {
      img1.style.left = `${newLeft + imgWidth}px`;
      img2.style.left = `${newLeft}px`;
    } else {
      img1.style.left = `${newLeft}px`;
      img2.style.left = `${newLeft + imgWidth}px`;
    }
  }

  function updateInitialPosition() {
    const imgWidth = img1.offsetWidth;
    const initialPosition = -imgWidth / 3;
    adjustImagePositions(initialPosition);
    return initialPosition;
  }

  let initialPosition = updateInitialPosition();
  let targetLeft = initialPosition;
  let currentLeft = initialPosition;

  function handleScroll() {
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = window.pageYOffset / scrollHeight;
    const imgWidth = img1.offsetWidth;
    const startPosition = -imgWidth / 3;
    targetLeft = startPosition + (-imgWidth * scrollPercentage);
  }

  function animate() {
    currentLeft += (targetLeft - currentLeft) * 0.1;
    adjustImagePositions(currentLeft);
    requestAnimationFrame(animate);
  }

  let previousHeight = window.innerHeight;

  window.addEventListener("resize", function() {
    const newHeight = window.innerHeight;
    if (newHeight !== previousHeight) {
      const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercentage = window.pageYOffset / scrollHeight;
      const imgWidth = img1.offsetWidth;
      const startPosition = -imgWidth / 3;
      targetLeft = startPosition + (-imgWidth * scrollPercentage);
      previousHeight = newHeight;
    }
  });

  window.addEventListener("scroll", handleScroll);
  requestAnimationFrame(animate);
});
