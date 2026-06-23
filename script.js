document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function (e) {

        if (this.classList.contains('locked-card')) {
            e.preventDefault();
            return;
        }

        e.preventDefault();
        const href = this.getAttribute('href');

        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';

        setTimeout(() => {
            window.location.href = href;
        }, 500);
    });
});

window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});

/* === DRAGGABLE SIDE SCROLL === */
const sideScroll = document.querySelector(".side-scroll");

let isDown = false;
let startX;
let scrollLeft;

sideScroll.addEventListener("mousedown", (e) => {
  isDown = true;
  sideScroll.classList.add("dragging");
  startX = e.pageX - sideScroll.offsetLeft;
  scrollLeft = sideScroll.scrollLeft;
});

sideScroll.addEventListener("mouseleave", () => {
  isDown = false;
  sideScroll.classList.remove("dragging");
});

sideScroll.addEventListener("mouseup", () => {
  isDown = false;
  sideScroll.classList.remove("dragging");
});

sideScroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();

  const x = e.pageX - sideScroll.offsetLeft;
  const walk = (x - startX) * 1.5;
  sideScroll.scrollLeft = scrollLeft - walk;
});