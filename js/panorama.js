document.addEventListener('DOMContentLoaded', function() {
    const panorama = document.querySelector('.panorama');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    let isMouseDown = false;
    let startX, scrollStartX;

    panorama.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevents default drag behavior
        isMouseDown = true;
        startX = e.pageX;
        scrollStartX = parseInt(panorama.style.left, 10) || 0;
        panorama.classList.add('active');
        panorama.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', () => {
        isMouseDown = false;
        panorama.classList.remove('active');
        panorama.style.cursor = 'grab';
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        e.preventDefault(); // Prevents text selection or any other default behavior while dragging
        const x = e.pageX - startX;
        let newLeft = scrollStartX + x;

        // Reset position to create an infinite loop effect
        if (newLeft > 0) {
            scrollStartX -= img1.offsetWidth;
            newLeft -= img1.offsetWidth;
        } else if (newLeft < -img1.offsetWidth) {
            scrollStartX += img1.offsetWidth;
            newLeft += img1.offsetWidth;
        }
        panorama.style.left = `${newLeft}px`;
    });

    // Adding touch support for mobile devices
    panorama.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents default mobile behaviors
        startX = e.touches[0].pageX;
        scrollStartX = parseInt(panorama.style.left, 10) || 0;
        panorama.classList.add('active');
    });

    panorama.addEventListener('touchend', () => {
        panorama.classList.remove('active');
    });

    panorama.addEventListener('touchmove', (e) => {
        if (!panorama.classList.contains('active')) return;
        e.preventDefault(); // Prevents scrolling the whole page on touch devices
        const x = e.touches[0].pageX - startX;
        let newLeft = scrollStartX + x;

        // Reset position to create an infinite loop effect
        if (newLeft > 0) {
            scrollStartX -= img1.offsetWidth;
            newLeft -= img1.offsetWidth;
        } else if (newLeft < -img1.offsetWidth) {
            scrollStartX += img1.offsetWidth;
            newLeft += img1.offsetWidth;
        }
        panorama.style.left = `${newLeft}px`;
    });
});
