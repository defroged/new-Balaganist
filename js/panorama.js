document.addEventListener('DOMContentLoaded', function() {
    const panorama = document.querySelector('.panorama');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    let isMouseDown = false;
    let startX, draggedX;

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

// Function to adjust image positions dynamically
function adjustImagePositions(x, y) {
    let baseX = x % img1.offsetWidth;
    let baseY = y;
    if (baseX > 0) {
        img1.style.transform = `translate(${baseX - img1.offsetWidth}px, ${baseY}px) scale(1.5)`;
        img2.style.transform = `translate(${baseX}px, ${baseY}px) scale(1.5)`;
    } else {
        img1.style.transform = `translate(${baseX}px, ${baseY}px) scale(1.5)`;
        img2.style.transform = `translate(${baseX + img1.offsetWidth}px, ${baseY}px) scale(1.5)`;
    }
}

    panorama.addEventListener('mousedown', (e) => {
        e.preventDefault(); // Prevents default drag behavior
        isMouseDown = true;
        startX = e.pageX;
        draggedX = parseInt(img1.style.left) || 0; // Get the current position of the first image
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
        let newLeft = draggedX + x;

        // Dynamically adjust the position of both images
        adjustImagePositions(newLeft);
    });

    // Adding touch support for mobile devices
    panorama.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents default mobile behaviors
        startX = e.touches[0].pageX;
        draggedX = parseInt(img1.style.left) || 0; // Get the current position for touch devices
        panorama.classList.add('active');
    });

    panorama.addEventListener('touchend', () => {
        panorama.classList.remove('active');
    });

    panorama.addEventListener('touchmove', (e) => {
        if (!panorama.classList.contains('active')) return;
        e.preventDefault(); // Prevents scrolling the whole page on touch devices
        const x = e.touches[0].pageX - startX;
        let newLeft = draggedX + x;

        // Similar logic as mousemove for touch devices
        adjustImagePositions(newLeft);
    });
});
