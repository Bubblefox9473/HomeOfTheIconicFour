console.log("JS IS LOADING");

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
    toggleBox(box);
}

/* === PASSWORD GATE === */
const correctPassword = "Vasteil"; // CHANGE THIS

function checkPassword() {
    const input = document.getElementById("passwordInput");
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

        const msg = "The workshop does not open for strangers.";
        errorMsg.textContent = msg;
        errorMsg.classList.add("glitch-text");
        errorMsg.setAttribute("data-text", msg);

        input.value = "";
    }
}

/* FIX: attach listener AFTER DOM loads */
window.addEventListener("DOMContentLoaded", () => {
    const input = document.getElementById("passwordInput");

    if (input) {
        input.addEventListener("keydown", function (e) {
            if (e.key === "Enter") checkPassword();
        });
    }
});

/* === PAGE TRANSITIONS === */
window.addEventListener("load", () => {
    document.body.style.opacity = "0";
    document.body.style.transition = "opacity 0.5s ease";

    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = "1";
            window.scrollTo(0, 0);
            const frame = document.querySelector('.frame');
            if (frame) frame.scrollTop = 0;
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

/* ============================================================
   WORKSHOP FORGE CANVAS EFFECT (KEPT YOUR FINAL VERSION ONLY)
   ============================================================ */
(function forgeEffect() {
    const frame = document.querySelector(".frame");
    if (!frame) return;

    const canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = frame.offsetWidth;
        canvas.height = frame.offsetHeight;
        initTools();
        initEmbers();
    }

    window.addEventListener("resize", resize);

    let tools = [];

    function initTools() {
        tools = [];
        const W = canvas.width;
        const H = canvas.height;

        const placements = [
            { x: W * 0.08, y: H * 0.12, type: "gear", size: 52, rot: 0, opacity: 0.22 },
            { x: W * 0.92, y: H * 0.18, type: "gear", size: 40, rot: 0.4, opacity: 0.18 }
        ];

        placements.forEach(p => {
            tools.push({ ...p, currentRot: p.rot, rotSpeed: p.type === "gear" ? 0.002 : 0 });
        });
    }

    const EMBER_COUNT = 50;
    let embers = [];

    function spawnEmber(randomY = false) {
        return {
            x: Math.random() * canvas.width,
            y: randomY ? Math.random() * canvas.height : canvas.height + 10,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.6 + 0.2,
            speedX: (Math.random() - 0.5) * 0.35,
            life: 1,
            decay: Math.random() * 0.003 + 0.001,
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01
        };
    }

    function initEmbers() {
        embers = [];
        for (let i = 0; i < EMBER_COUNT; i++) {
            embers.push(spawnEmber(true));
        }
    }

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        embers.forEach((e, i) => {
            e.wobble += e.wobbleSpeed;
            e.x += e.speedX + Math.sin(e.wobble) * 0.3;
            e.y -= e.speedY;
            e.life -= e.decay;

            if (e.life <= 0 || e.y < -20) {
                embers[i] = spawnEmber(false);
                return;
            }

            ctx.globalAlpha = e.life;
            ctx.beginPath();
            ctx.arc(e.x, e.y, e.size * 2, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(180, 80, 255, 0.7)";
            ctx.fill();
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
})();