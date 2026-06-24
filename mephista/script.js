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
  overlay.classList.add("show");
}

function closeImage() {
  const overlay = document.getElementById("overlay");

  if (!overlay) return;

  overlay.classList.remove("show");
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
  toggleBox(box);
}

/* === PASSWORD GATE === */
const correctPassword = "Template"; // change password here
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

    errorMsg.textContent = "Access denied.";
    input.value = "";
  }
}

if (input) {
  input.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
      checkPassword();
    }
  });
}

/* === NEUTRAL WHITE AURA EFFECT === */
(function auraEffect() {
  const frame = document.querySelector(".frame");
  if (!frame) return;

  let canvas = frame.querySelector("#aura-canvas");

  if (!canvas) {
    canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
  }

  const ctx = canvas.getContext("2d");

  let radius = 0;

  function resize() {
    canvas.width = frame.offsetWidth;
    canvas.height = frame.offsetHeight;
  }

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 255, 255, 0.025)";
    ctx.fill();

    radius += 0.5;

    if (radius > maxRadius) {
      radius = 0;
    }

    requestAnimationFrame(draw);
  }

  window.addEventListener("resize", resize);

  resize();
  draw();
})();