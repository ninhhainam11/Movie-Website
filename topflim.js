class FilmPanel extends HTMLElement {
    connectedCallback() {
        const title = this.getAttribute('title') || 'Chưa có tiêu đề';
        const image = this.getAttribute('image') || 'Chưa có ảnh';

        this.innerHTML = `
            <img src="${image}" alt="Film poster" class="film-poster">
            <div class="film-title">${title}</div>
        `;
    }
}

customElements.define('film-panel', FilmPanel);
