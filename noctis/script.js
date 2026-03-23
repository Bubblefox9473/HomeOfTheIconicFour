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

/* === EXPANDABLE BOXES — leave alone === */
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
const correctPassword = "Brotherhood"; // CHANGE: set the password here
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
        const msg = "Wrong password."; // CHANGE: wrong password message
        errorMsg.textContent = msg;
        errorMsg.classList.add("glitch-text");
        errorMsg.setAttribute("data-text", msg);
        input.value = "";
    }
}

/* === ENTER KEY SUPPORT — leave alone === */
if (input) {
    input.addEventListener("keydown", function (e) {
        if (e.key === "Enter") checkPassword();
    });
}

/* === AURA CANVAS EFFECT === */
/* CHANGE: tweak the rgba color values to match your character's theme */
/* e.g. rgba(255, 0, 0, 0.05) is red — change the first three numbers for a different color */
(function auraEffect() {
    const frame = document.querySelector(".frame");
    if (!frame) return;
    let canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = frame.offsetWidth;
        canvas.height = frame.offsetHeight;
    }
    window.addEventListener("resize", resize);
    resize();

    let radius = 0;
    const maxRadius = Math.max(canvas.width, canvas.height) * 0.8;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(200, 200, 200, 0.03)"; // CHANGE: aura fill color
        ctx.fill();
        ctx.strokeStyle = "rgba(200, 200, 200, 0.02)"; // CHANGE: aura stroke color
        radius += 0.6;
        if (radius > maxRadius) radius = 0;
        requestAnimationFrame(draw);
    }
    draw();
})();