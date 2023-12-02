document.addEventListener('DOMContentLoaded', function () {
    // Query the element
    const ele = document.getElementById('dragMe');

    // The ghost element
    let ghostEle;

    ele.addEventListener('dragstart', function (e) {
        ghostEle = document.createElement('div');
        ghostEle.classList.add('dragging');
        ghostEle.innerHTML = 'I am flying';
        document.body.appendChild(ghostEle);

        e.dataTransfer.setDragImage(ghostEle, 0, 0);
    });

    ele.addEventListener('dragend', function (e) {
        document.body.removeChild(ghostEle);
    });
});