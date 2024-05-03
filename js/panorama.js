document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.panorama img');
    let isMouseDown = false;
    let startX, scrollStartX;

    function setScrollPosition(x) {
        let newLeft = scrollStartX + (x - startX);
        // Limit scrolling to the image boundaries
        newLeft = Math.min(newLeft, 0);
        newLeft = Math.max(newLeft, window.innerWidth - img.offsetWidth);
        img.style.left = `${newLeft}px`;
    }

    img.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX;
        scrollStartX = parseInt(img.style.left, 10) || 0;
        img.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        img.classList.remove('active');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        setScrollPosition(e.pageX);
    });

    // Add touch support for mobile devices
    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        scrollStartX = parseInt(img.style.left, 10) || 0;
        img.classList.add('active');
    });

    img.addEventListener('touchend', () => {
        img.classList.remove('active');
    });

    img.addEventListener('touchmove', (e) => {
        if (!img.classList.contains('active')) return;
        e.preventDefault();
        setScrollPosition(e.touches[0].pageX);
    });
});
