// ================================
//   LOLA — main.js
// ================================

// Global drag state
let isDragging = false;
let currentWindow = null;
let startX, startY, startLeft, startTop;

// ================================
// STAR TRAIL
// ================================

function createStar(x, y) {
  const stars = ['✦', '★', '✿', '♡', '✩'];
  const colors = ['#ff2d78', '#fff5a0', '#ffb3d9', '#e0b3ff', '#b3e5ff'];
  const star = document.createElement('div');
  star.innerHTML = stars[Math.floor(Math.random() * stars.length)];
  star.style.cssText = `
    position: fixed;
    left: ${x}px;
    top: ${y}px;
    color: ${colors[Math.floor(Math.random() * colors.length)]};
    font-size: ${Math.random() * 10 + 8}px;
    pointer-events: none;
    z-index: 9999;
    animation: starFade 0.6s ease-out forwards;
    transform: translate(-50%, -50%);
    font-family: sans-serif;
  `;
  document.body.appendChild(star);
  setTimeout(() => star.remove(), 600);
}

// ================================
// DRAGGABLE WINDOWS
// ================================

function makeDraggable(windowEl) {
  const titlebar = windowEl.querySelector('.window-titlebar');
  if (!titlebar) return;

  titlebar.addEventListener('mousedown', (e) => {
    if (e.target.classList.contains('win-btn')) return;
    isDragging = true;
    currentWindow = windowEl;
    startX = e.clientX;
    startY = e.clientY;
    const rect = windowEl.getBoundingClientRect();
    startLeft = rect.left;
    startTop = rect.top;
    windowEl.style.transform = 'none';
    windowEl.style.left = startLeft + 'px';
    windowEl.style.top = startTop + 'px';
    windowEl.style.zIndex = 200;
    windowEl.style.position = 'fixed';
  });
}

document.addEventListener('mousemove', (e) => {
  if (!isDragging || !currentWindow) return;
  const dx = e.clientX - startX;
  const dy = e.clientY - startY;
  currentWindow.style.left = (startLeft + dx) + 'px';
  currentWindow.style.top = (startTop + dy) + 'px';
  if (Math.random() > 0.4) createStar(e.clientX, e.clientY);
});

document.addEventListener('mouseup', () => {
  if (currentWindow) currentWindow.style.zIndex = 100;
  isDragging = false;
  currentWindow = null;
});

// ================================
// CLOSE WINDOW
// ================================

function closeWindow(id) {
  const el = document.getElementById(id);
  if (el) el.style.display = 'none';
}

// ================================
// INIT
// ================================

document.querySelectorAll('.window').forEach(makeDraggable);
