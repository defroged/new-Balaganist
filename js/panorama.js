document.addEventListener('DOMContentLoaded', function() {
    const img = document.querySelector('.panorama img');
    let startX, startY, scrollLeft, scrollTop;

    img.addEventListener('mousedown', (e) => {
        startX = e.pageX;
        startY = e.pageY;
        scrollLeft = window.pageXOffset;
        scrollTop = window.pageYOffset;
        img.classList.add('active');
    });

    img.addEventListener('mouseup', () => {
        img.classList.remove('active');
    });

    img.addEventListener('mousemove', (e) => {
        if (!img.classList.contains('active')) return;
        e.preventDefault();
        const x = e.pageX - startX;
        window.scrollBy(-x, 0);
    });

    // Add touch support for mobile devices
    img.addEventListener('touchstart', (e) => {
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        scrollLeft = window.pageXOffset;
        scrollTop = window.pageYOffset;
        img.classList.add('active');
    });

    img.addEventListener('touchend', () => {
        img.classList.remove('active');
    });

    img.addEventListener('touchmove', (e) => {
        if (!img.classList.contains('active')) return;
        e.preventDefault();
        const x = e.touches[0].pageX - startX;
        window.scrollBy(-x, 0);
    });
});
