// Handle drag to change the song order of the playlist

function addDragHandler() {
    let song_info_node_collection = document.querySelectorAll('.song_info');
    song_info_node_collection.forEach((item) => {
        item.addEventListener('dragstart', handleDragStart);
        item.addEventListener('dragover', handleDragOver);
        item.addEventListener('dragleave', handleDragLeave);
        item.addEventListener('drop', handleDrop);
        item.addEventListener('dragend', handleDragEnd);
        item.querySelector('.song_delete').addEventListener('click', deleteSongFromPlaylist);
    });
}

let dragItem = null;

function handleDragStart(e) {
    dragItem = this;

    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.outerHTML);

    // Handle when drop the element, outerHTML won't carry the input value
    e.dataTransfer.setData('text/plain', this.querySelector('.song_des_wrap').value);
}

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    this.classList.add('overTop');
    this.style.borderTop = '2px solid yellow';

    e.dataTransfer.dropEffect = 'move';
    return false;
}

function handleDragLeave(e) {
    this.style.borderTop = '0px solid yellow';
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }

    if (dragItem != this) {
        this.parentNode.removeChild(dragItem);
        let dropHTML = e.dataTransfer.getData('text/html');
        let inputValue = e.dataTransfer.getData('text/plain');
        this.insertAdjacentHTML('beforebegin', dropHTML);
        this.previousSibling.querySelector('.song_des_wrap').value = inputValue;

        let dropElem = this.previousSibling;
        addDragHandler(dropElem);
    }
    this.style.borderTop = '0px solid yellow';
    return false;
}

function handleDragEnd(e) {
    this.style.borderTop = '0px solid yellow';
}
