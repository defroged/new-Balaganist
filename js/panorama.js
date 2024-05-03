document.addEventListener('DOMContentLoaded', function() {
    const panorama = document.querySelector('.panorama');
    const img1 = document.getElementById('img1');
    const img2 = document.getElementById('img2');
    let isMouseDown = false;
    let startX, startY, draggedX, draggedY;

    function adjustImagePositions(x, y) {
        let baseX = (draggedX + (x - startX)) % img1.offsetWidth;
        let baseY = draggedY + (y - startY);

        if (baseX > 0) {
            img1.style.transform = `translate(${baseX - img1.offsetWidth}px, ${baseY}px) scale(1.5)`;
            img2.style.transform = `translate(${baseX}px, ${baseY}px) scale(1.5)`;
        } else if (baseX < -img1.offsetWidth) {
            img1.style.transform = `translate(${baseX + img2.offsetWidth}px, ${baseY}px) scale(1.5)`;
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
        startY = e.pageY;
        draggedX = 0;  // Reset on new mouse down
        draggedY = 0;  // Reset on new mouse down
        panorama.classList.add('active');
        panorama.style.cursor = 'grabbing';
    });

    document.addEventListener('mouseup', (e) => {
        isMouseDown = false;
        panorama.classList.remove('active');
        panorama.style.cursor = 'grab';
        // Update dragged positions to the last known positions to start from there next time
        draggedX += e.pageX - startX;
        draggedY += e.pageY - startY;
    });

    document.addEventListener('mousemove', (e) => {
        if (!isMouseDown) return;
        adjustImagePositions(e.pageX, e.pageY);
    });

    // Adding touch support for mobile devices
    panorama.addEventListener('touchstart', (e) => {
        e.preventDefault(); // Prevents default mobile behaviors
        startX = e.touches[0].pageX;
        startY = e.touches[0].pageY;
        draggedX = 0; // Reset on new touch start
        draggedY = 0; // Reset on new touch start
        panorama.classList.add('active');
    });

    panorama.addEventListener('touchend', (e) => {
        panorama.classList.remove('active');
        draggedX += e.touches[0].pageX - startX;
        draggedY += e.touches[0].pageY - startY;
    });

    panorama.addEventListener('touchmove', (e) => {
        if (!panorama.classList.contains('active')) return;
        adjustImagePositions(e.touches[0].pageX, e.touches[0].pageY);
    });
});
