export function renderImages(images, gallery) {
  gallery.innerHTML = '';
  images.forEach(hit => {
    const item = document.createElement('li');
    item.classList.add('gallery-item');

    const link = document.createElement('a');
    link.href = hit.largeImageURL;
    link.dataset.caption = hit.tags;

    const img = document.createElement('img');
    img.src = hit.webformatURL;
    img.alt = hit.tags;

    const stats = document.createElement('div');
    stats.classList.add('image-stats');
    stats.innerHTML = `
          <div><p class="stat-title">Likes</p><p class="stat-text">${hit.likes}</p></div>
          <div><p class="stat-title">Views</p><p class="stat-text">${hit.views}</p></div>
          <div><p class="stat-title">Comments</p><p class="stat-text">${hit.comments}</p></div>
          <div><p class="stat-title">Downloads</p><p class="stat-text">${hit.downloads}</p></div>
        `;

    link.appendChild(img);
    item.appendChild(link);
    item.appendChild(stats);
    gallery.appendChild(item);
  });
}
