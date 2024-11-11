const gallery = document.getElementById('gallery');
const loadMore = document.getElementById('loadMore');
const removeLast = document.getElementById('removeLast');
const reverse = document.getElementById('reverse');
const clear = document.getElementById('clear');

let page = 1;
const limit = 4;
let imagesArray = [];

async function loadImages() {
    try {
        const response = await fetch(`https://picsum.photos/v2/list?page=${page}&limit=${limit}`);
        const images = await response.json();

        images.forEach(image => {
            const imgElement = document.createElement('img');
            imgElement.src = `https://picsum.photos/id/${image.id}/200/150`;
            gallery.appendChild(imgElement);
        });
        page++;
    } catch (error) {
        console.error('Помилка при завантаженні зображень:', error);
    }
}

loadMore.addEventListener('click', loadImages);

clear.addEventListener('click', () => {
    while (gallery.firstChild) {
        gallery.removeChild(gallery.firstChild);
    }
});

removeLast.addEventListener('click', () => {
    if (gallery.lastElementChild) {
        gallery.removeChild(gallery.lastElementChild);
    }
});

reverse.addEventListener('click', () => {
    if (gallery.children.length > 0) {
        const images = Array.from(gallery.children);
        images.reverse(); 
        gallery.innerHTML = '';
        images.forEach(img => gallery.appendChild(img));
    }
});
