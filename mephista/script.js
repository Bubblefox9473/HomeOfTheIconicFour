/* ============================================================
THE ICONIC FOUR — script.js
Currently handles card click navigation.
Add any future interactivity here.
============================================================ */

/* === CARD NAVIGATION === */
/* Cards use anchor tags so clicking navigates automatically.
This script is here for any future JS you want to add,
e.g. a loading transition before navigating. */

/* OPTIONAL: Add a fade-out transition before navigating to a character page */
document.querySelectorAll(’.card’).forEach(card => {
card.addEventListener(‘click’, function (e) {
// Remove this block if you want instant navigation
e.preventDefault();
const href = this.getAttribute(‘href’);
document.body.style.transition = ‘opacity 0.4s ease’;
document.body.style.opacity = ‘0’;
setTimeout(() => {
window.location.href = href;
}, 400); // matches transition duration above
});
});

/* === PAGE LOAD FADE IN === */
/* Makes the page fade in smoothly when arriving from a character page */
window.addEventListener(‘load’, () => {
document.body.style.opacity = ‘0’;
document.body.style.transition = ‘opacity 0.4s ease’;
requestAnimationFrame(() => {
requestAnimationFrame(() => {
document.body.style.opacity = ‘1’;
});
});
});