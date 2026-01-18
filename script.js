const viewport = document.getElementById('viewport');
const gallery = document.getElementById('gallery');
const frame = document.getElementById('deviceFrame');
const buttons = document.querySelectorAll('.controls button');

let tabletLandscape = true;
let currentView = 'laptop';

/* ACTIVE BUTTON */
function setActive(text) {
    buttons.forEach(b => b.classList.remove('active'));
    [...buttons].find(b => b.textContent.includes(text))?.classList.add('active');
}

/* SET VIEW */
function setView(type) {
    currentView = type;

    if (type === 'laptop') {
        viewport.style.maxWidth = '1200px';
        gallery.style.gridTemplateColumns = 'repeat(3,1fr)';
        frame.style.borderRadius = '30px';
        setActive('Laptop');
    }

    if (type === 'tablet') {
        viewport.style.maxWidth = tabletLandscape ? '820px' : '600px';
        gallery.style.gridTemplateColumns = 'repeat(2,1fr)';
        frame.style.borderRadius = '40px';
        setActive('Tablet');
    }

    if (type === 'phone') {
        viewport.style.maxWidth = '390px';
        gallery.style.gridTemplateColumns = '1fr';
        frame.style.borderRadius = '50px';
        setActive('iPhone');
    }
}

/* TABLET ROTATE */
function toggleTablet() {
    tabletLandscape = !tabletLandscape;
    if (currentView === 'tablet') setView('tablet');
}

/* AUTO DETECT */
function autoDetect() {
    const w = window.innerWidth;
    if (w <= 480) setView('phone');
    else if (w <= 900) setView('tablet');
    else setView('laptop');
}
window.addEventListener('resize', autoDetect);
autoDetect();

/* SWIPE (MOBILE) */
let startX = 0;

viewport.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
});

viewport.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    const diff = endX - startX;

    if (Math.abs(diff) > 50) {
        if (diff < 0) {
            if (currentView === 'laptop') setView('tablet');
            else if (currentView === 'tablet') setView('phone');
        } else {
            if (currentView === 'phone') setView('tablet');
            else if (currentView === 'tablet') setView('laptop');
        }
    }
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');

let zoom = 1;

/* FOTO KLIKKEN */
document.querySelectorAll('.gallery img').forEach(img => {
    img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        zoom = 1;
        applyZoom();
    });
});

/* ZOOM */
function zoomIn() {
    zoom = Math.min(zoom + 0.2, 4);
    applyZoom();
}

function zoomOut() {
    zoom = Math.max(zoom - 0.2, 1);
    applyZoom();
}

function applyZoom() {
    lightboxImg.style.transform = `scale(${zoom})`;
}

/* SLUITEN */
function closeLightbox() {
    lightbox.style.display = 'none';
    lightboxImg.src = '';
}

/* SLUIT MET ESC */
document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeLightbox();
});