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
const correctPassword = "Noctis"; // CHANGE: set Noctis' password here
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
        const msg = "The void does not recognise you."; // CHANGE: wrong password message
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

    let canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = frame.offsetWidth;
        canvas.height = frame.offsetHeight;
        initStars();
    }

    window.addEventListener("resize", resize);

    /* === STARS === */
    const STAR_COUNT = 120;
    let stars = [];

    function initStars() {
        stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            stars.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 1.2 + 0.2,
                opacity: Math.random() * 0.6 + 0.1,
                twinkleSpeed: Math.random() * 0.02 + 0.005,
                twinkleOffset: Math.random() * Math.PI * 2,
                hollow: Math.random() > 0.75 // ~25% are hollow stars
            });
        }
    }

    /* === PULSING AURA === */
    let radius = 0;
    const maxRadius = () => Math.max(canvas.width, canvas.height) * 0.75;
    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.01;

        /* Draw aura pulse */
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(20, 60, 180, 0.03)";
        ctx.fill();
        ctx.strokeStyle = "rgba(40, 100, 220, 0.02)";
        radius += 0.5;
        if (radius > maxRadius()) radius = 0;

        /* Draw stars */
        stars.forEach((star, i) => {
            const twinkle = Math.sin(t * star.twinkleSpeed * 100 + star.twinkleOffset);
            const alpha = star.opacity + twinkle * 0.2;

            ctx.save();
            ctx.globalAlpha = Math.max(0, alpha);

            if (star.hollow) {
                /* Hollow four-pointed star shape */
                ctx.strokeStyle = `rgba(120, 180, 255, ${alpha})`;
                ctx.lineWidth = 0.5;
                drawHollowStar(ctx, star.x, star.y, star.radius * 2.5);
            } else {
                /* Solid dot star */
                ctx.fillStyle = `rgba(${150 + Math.floor(Math.random() * 30)}, ${180 + Math.floor(Math.random() * 40)}, 255, ${alpha})`;
                ctx.beginPath();
                ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    /* Draws a hollow 4-pointed star */
    function drawHollowStar(ctx, x, y, size) {
        ctx.beginPath();
        /* Vertical points */
        ctx.moveTo(x, y - size);
        ctx.lineTo(x, y + size);
        /* Horizontal points */
        ctx.moveTo(x - size, y);
        ctx.lineTo(x + size, y);
        /* Diagonal accents (smaller) */
        const d = size * 0.45;
        ctx.moveTo(x - d, y - d);
        ctx.lineTo(x + d, y + d);
        ctx.moveTo(x + d, y - d);
        ctx.lineTo(x - d, y + d);
        ctx.stroke();
    }

    resize();
    draw();
})();
