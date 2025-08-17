
/* Year in footer */
document.addEventListener('DOMContentLoaded', () => {
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Dynamically set the name
  const name = 'Jorge André'; // Change this to update the name globally
  document.querySelectorAll('[data-dynamic-name]').forEach(el => {
    el.textContent = name;
  });

  // Dynamically set the footer name
  const footerNameEl = document.querySelector('[data-footer-name]');
  if (footerNameEl) footerNameEl.textContent = name;
});

/* Modals: open/close */
function openModal(target){
  const modal = document.querySelector(target);
  if (!modal) return;
  modal.setAttribute('aria-hidden', 'false');
  const closeables = modal.querySelectorAll('[data-close]');
  closeables.forEach(el => el.addEventListener('click', () => closeModal(modal)));
  document.addEventListener('keydown', escClose);
  // focus trap start
  const focusable = modal.querySelector('button, [href], input, textarea, [tabindex]:not([tabindex="-1"])');
  focusable && focusable.focus();
}
function closeModal(modal){
  modal.setAttribute('aria-hidden', 'true');
  const iframe = modal.querySelector('iframe');
  if (iframe) {
    iframe.src = iframe.src; // reset src to stop playback
  }

  document.removeEventListener('keydown', escClose);
}

function escClose(e){
  if (e.key === 'Escape'){
    const open = document.querySelector('.modal[aria-hidden="false"]');
    if (open) closeModal(open);
  }
}

/* Attach modal triggers */
document.addEventListener('click', (e)=>{
  const card = e.target.closest('[data-modal-target]');
  if (card){
    const target = card.getAttribute('data-modal-target');
    openModal(target);
  }
});

document.addEventListener('keydown', (e)=>{
  if (e.key === 'Enter'){
    const el = document.activeElement;
    if (el && el.matches('[data-modal-target]')){
      openModal(el.getAttribute('data-modal-target'));
    }
  }
});

/* Filters with smooth fade */
(function(){
  const btns = Array.from(document.querySelectorAll('.filter-btn'));
  const items = Array.from(document.querySelectorAll('.project'));
  if (!btns.length || !items.length) return;

  function setActive(btn){
    btns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    btns.forEach(b => b.setAttribute('aria-pressed', b === btn ? 'true' : 'false'));
  }

  function applyFilter(filter){
    items.forEach((item, i) => {
      const matches = filter === 'all' || item.classList.contains(filter);
      if (matches){
        // staggered show
        setTimeout(()=> item.classList.remove('hide'), i * 12);
      } else {
        item.classList.add('hide');
      }
    });
  }

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      setActive(btn);
      applyFilter(btn.dataset.filter);
    });
  });
})();

// Select all <img> elements in your document
const imgs = document.querySelectorAll("img");

// Loop through each one and preload
imgs.forEach(img => {
  const preloader = new Image();
  preloader.src = img.src;
});






