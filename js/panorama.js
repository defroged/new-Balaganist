document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.panorama img');
    let isMouseDown = false;
    let startX, scrollLeft;

    img.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX - img.offsetLeft;
        scrollLeft = img.offsetLeft;
    });

    img.addEventListener('mouseleave', () => {
        isMouseDown = false;
    });

    img.addEventListener('mouseup', () => {
        isMouseDown = false;
    });

    img.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.pageX - img.offsetLeft;
        const walk = (x - startX) * 3; //scroll-speed
        img.style.left = `${scrollLeft + walk}px`;
    });

    // Optional: Add touch support for mobile devices
    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX - img.offsetLeft;
        scrollLeft = img.offsetLeft;
    });

    img.addEventListener('touchmove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        const x = e.touches[0].pageX - img.offsetLeft;
        const walk = (x - startX) * 3; //scroll-speed
        img.style.left = `${scrollLeft + walk}px`;
    });
});
