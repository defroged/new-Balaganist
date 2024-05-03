document.addEventListener('DOMContentLoaded', function() {
    const panorama = document.querySelector('.panorama');
    const img = document.querySelector('.panorama img');
    let isMouseDown = false;
    let startX, startY, scrollStartX, scrollStartY;

    function setScrollPosition(x, y) {
        let newLeft = scrollStartX + (x - startX);
        let newTop = scrollStartY + (y - startY);

        // Apply the new positions
        img.style.left = `${newLeft}px`;
        img.style.top = `${newTop}px`;
    }

    img.addEventListener('mousedown', (e) => {
        isMouseDown = true;
        startX = e.pageX;
        startY = e.pageY;
        scrollStartX = parseInt(img.style.left, 10) || 0;
        scrollStartY = parseInt(img.style.top, 10) || 0;
        panorama.classList.add('active');
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        panorama.classList.remove('active');
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault();
        setScrollPosition(e.pageX, e.pageY);
    });

    // Add touch support for mobile devices
    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        scrollStartX = parseInt(img.style.left, 10) || 0;
        scrollStartY = parseInt(img.style.top, 10) || 0;
        panorama.classList.add('active');
    });

    img.addEventListener('touchend', () => {
        panorama.classList.remove('active');
    });

    img.addEventListener('touchmove', (e) => {
        if (!panorama.classList.contains('active')) return;
        e.preventDefault();
        setScrollPosition(e.touches[0].pageX, e.touches[0].pageY);
    });
});
