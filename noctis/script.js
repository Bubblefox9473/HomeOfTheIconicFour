/* === PAGE TRANSITIONS === */
window.addEventListener("load", () => {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      document.body.style.opacity = "1";
    });
  });
});

document.addEventListener("click", function (e) {
  const backBtn = e.target.closest(".back-btn");

  if (backBtn) {
    e.preventDefault();
    const href = backBtn.getAttribute("href");

    document.body.style.transition = "opacity 0.5s ease";
    document.body.style.opacity = "0";

    setTimeout(() => {
      window.location.href = href;
    }, 500);
  }
});

/* === IMAGE OVERLAY === */
function openImage(img) {
  const overlay = document.getElementById("overlay");
  const overlayImg = document.getElementById("overlay-img");

  if (!overlay || !overlayImg) return;

  overlayImg.src = img.src;
  overlay.style.display = "flex";

  void overlay.offsetWidth;

  overlay.classList.add("show");
}

function closeImage() {
  const overlay = document.getElementById("overlay");

  if (!overlay) return;

  overlay.classList.remove("show");

  setTimeout(() => {
    overlay.style.display = "none";
  }, 500);
}

/* === EXPANDABLE BOXES === */
function toggleBox(box) {
  if (!box) return;

  box.classList.toggle("expanded");

  if (box.classList.contains("expanded")) {
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

function togglePower(box) {
  if (!box) return;

  box.classList.toggle("expanded");

  if (box.classList.contains("expanded")) {
    box.scrollIntoView({ behavior: "smooth", block: "nearest" });
  }
}

/* === PASSWORD GATE === */
const correctPassword = "Noctis";
const input = document.getElementById("passwordInput");

function checkPassword() {
  const gate = document.getElementById("gate");
  const errorMsg = document.getElementById("error-msg");

  if (!input || !gate || !errorMsg) return;

  const value = input.value.trim();

  if (value === correctPassword) {
    gate.classList.add("fade-out");

    setTimeout(() => {
      gate.style.display = "none";
    }, 600);
  } else {
    const box = document.querySelector(".gate-box");

    if (box) {
      box.classList.add("glitch");
      setTimeout(() => box.classList.remove("glitch"), 300);
    }

    const msg = "The void does not recognise you.";
    errorMsg.textContent = msg;
    errorMsg.classList.add("glitch-text");
    errorMsg.setAttribute("data-text", msg);
    input.value = "";
  }
}

if (input) {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") checkPassword();
  });
}

/* === STARFIELD + AURA CANVAS === */
(function spaceEffect() {
  const frame = document.querySelector(".frame");
  if (!frame) return;

  let canvas = frame.querySelector("#aura-canvas");

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
  }

  const ctx = canvas.getContext("2d");

  const STAR_COUNT = 140;
  let stars = [];
  let radius = 0;
  let t = 0;

  function resize() {
    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight;
    initStars();
  }

  function initStars() {
    stars = [];

    for (let i = 0; i < STAR_COUNT; i++) {
      stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.25 + 0.2,
        opacity: Math.random() * 0.6 + 0.12,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
        hollow: Math.random() > 0.76
      });
    }
  }

  function maxRadius() {
    return Math.max(canvas.width, canvas.height) * 0.75;
  }

  function drawHollowStar(ctx, x, y, size) {
    ctx.beginPath();

    ctx.moveTo(x, y - size);
    ctx.lineTo(x, y + size);

    ctx.moveTo(x - size, y);
    ctx.lineTo(x + size, y);

    const d = size * 0.45;

    ctx.moveTo(x - d, y - d);
    ctx.lineTo(x + d, y + d);

    ctx.moveTo(x + d, y - d);
    ctx.lineTo(x - d, y + d);

    ctx.stroke();
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    t += 0.01;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(20, 60, 180, 0.035)";
    ctx.fill();

    radius += 0.55;

    if (radius > maxRadius()) {
      radius = 0;
    }

    stars.forEach((star) => {
      const twinkle = Math.sin(t * star.twinkleSpeed * 100 + star.twinkleOffset);
      const alpha = Math.max(0, star.opacity + twinkle * 0.2);

      ctx.save();
      ctx.globalAlpha = alpha;

      if (star.hollow) {
        ctx.strokeStyle = `rgba(120, 180, 255, ${alpha})`;
        ctx.lineWidth = 0.5;
        drawHollowStar(ctx, star.x, star.y, star.radius * 2.5);
      } else {
        ctx.fillStyle = `rgba(165, 195, 255, ${alpha})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      ctx.restore();
    });

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  resize();
  draw();
})();