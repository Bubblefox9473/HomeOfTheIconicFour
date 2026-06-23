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
let moved = false;
let startX;
let scrollLeft;

sideScroll.addEventListener("mousedown", (e) => {
  isDown = true;
  moved = false;
  startX = e.pageX - sideScroll.offsetLeft;
  scrollLeft = sideScroll.scrollLeft;
});

sideScroll.addEventListener("mouseup", () => {
  isDown = false;
});

sideScroll.addEventListener("mouseleave", () => {
  isDown = false;
});

sideScroll.addEventListener("mousemove", (e) => {
  if (!isDown) return;

  const x = e.pageX - sideScroll.offsetLeft;
  const walk = (x - startX) * 1.5;

  if (Math.abs(walk) > 5) {
    moved = true;
    e.preventDefault();
  }

  sideScroll.scrollLeft = scrollLeft - walk;
});

sideScroll.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", (e) => {
    if (moved) {
      e.preventDefault();
    }
  });
});

document.querySelectorAll(".side-card").forEach((card) => {
  card.addEventListener("dragstart", (e) => {
    e.preventDefault();
  });
});