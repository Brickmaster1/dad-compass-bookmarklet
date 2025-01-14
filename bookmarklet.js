javascript: (() => {
    var highestZIndex = 0;

    Array.from(document.querySelectorAll('*')).forEach(function (el) {
        var zIndex = parseInt(getComputedStyle(el).zIndex, 10);
        if (!isNaN(zIndex) && zIndex > highestZIndex) {
            highestZIndex = zIndex;
        }
    });

    const mainWidget = document.createElement('floating-widget');

    let isDragging = false;
    let offsetX, offsetY;

    mainWidget.setAttribute('class', 'floating-widget');
    mainWidget.setAttribute('style', `
        width: 20%;
        aspect-ratio: 1;
        z-index: ${highestZIndex + 1};
        position: fixed;
        left: 0px;
        top: 0px;
        background-color: #d00;
        cursor: move;
    `);

    const closeButton = document.createElement('button');
    closeButton.setAttribute('style', `
        width: 20%;
        aspect-ratio: 1;
        background-color: #fff;
        left: 0px;
        top: 0px;
    `);
    closeButton.addEventListener('click', (e) => {
        mainWidget.remove();
    });

    mainWidget.appendChild(closeButton);

    mainWidget.addEventListener('mousedown', (e) => {
        isDragging = true;
        offsetX = e.clientX - mainWidget.getBoundingClientRect().left;
        offsetY = e.clientY - mainWidget.getBoundingClientRect().top;
    });
    
    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            mainWidget.style.left = e.clientX - offsetX + 'px';
            mainWidget.style.top = e.clientY - offsetY + 'px';
        }
    });
    
    document.addEventListener('mouseup', (e) => {
        isDragging = false;
    });
    
    document.body.appendChild(mainWidget);
})();
