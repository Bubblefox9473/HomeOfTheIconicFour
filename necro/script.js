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
    setTimeout(() => { overlay.style.display = "none"; }, 500);
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
const correctPassword = "PASSWORD"; // CHANGE: set Necro's password here
const input = document.getElementById("passwordInput");

function checkPassword() {
    const gate = document.getElementById("gate");
    const errorMsg = document.getElementById("error-msg");
    if (!input || !gate || !errorMsg) return;
    const value = input.value.trim();
    if (value === correctPassword) {
        gate.classList.add("fade-out");
        setTimeout(() => { gate.style.display = "none"; }, 600);
    } else {
        const box = document.querySelector(".gate-box");
        if (box) {
            box.classList.add("glitch");
            setTimeout(() => box.classList.remove("glitch"), 300);
        }
        const msg = "The workshop does not open for strangers."; // CHANGE: wrong password message
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

/* === PAGE TRANSITIONS === */
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    requestAnimationFrame(() => {
        requestAnimationFrame(() => {
            document.body.style.opacity = '1';
        });
    });
});

document.addEventListener('click', function(e) {
    const backBtn = e.target.closest('.back-btn');
    if (backBtn) {
        e.preventDefault();
        const href = backBtn.getAttribute('href');
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '0';
        setTimeout(() => { window.location.href = href; }, 500);
    }
});

/* ============================================================
   WORKSHOP FORGE CANVAS EFFECT
   Rising embers/sparks from the bottom — like a forge fire.
   Mix of glowing spark dots and tiny arcane symbols.
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
        initEmbers();
    }

    window.addEventListener("resize", resize);

    const EMBER_COUNT = 55;
    let embers = [];

    function spawnEmber(randomY = false) {
        const type = Math.random();
        return {
            x: Math.random() * (canvas.width || 800),
            y: randomY
                ? Math.random() * (canvas.height || 600)
                : (canvas.height || 600) + 10,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.7 + 0.2,   // rises upward
            speedX: (Math.random() - 0.5) * 0.4,  // gentle horizontal drift
            opacity: Math.random() * 0.6 + 0.1,
            life: 1.0,
            decay: Math.random() * 0.003 + 0.001,
            // Ember types:
            // < 0.6 = glowing spark dot
            // 0.6-0.8 = hollow diamond
            // > 0.8 = arcane cross/rune mark
            type: type < 0.6 ? 'spark' : type < 0.8 ? 'diamond' : 'rune',
            wobble: Math.random() * Math.PI * 2,
            wobbleSpeed: Math.random() * 0.03 + 0.01,
        };
    }

    function initEmbers() {
        embers = [];
        for (let i = 0; i < EMBER_COUNT; i++) {
            embers.push(spawnEmber(true));
        }
    }

    /* Slow aura pulse from center */
    let auraRadius = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Very faint aura pulse */
        auraRadius += 0.3;
        if (auraRadius > Math.max(canvas.width, canvas.height) * 0.7) auraRadius = 0;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, auraRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90, 20, 160, 0.015)";
        ctx.fill();

        /* Draw embers */
        embers.forEach((e, i) => {
            /* Update position */
            e.wobble += e.wobbleSpeed;
            e.x += e.speedX + Math.sin(e.wobble) * 0.3;
            e.y -= e.speedY;
            e.life -= e.decay;
            e.opacity = e.life * 0.55;

            if (e.life <= 0 || e.y < -20) {
                embers[i] = spawnEmber(false);
                return;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, e.opacity);

            if (e.type === 'spark') {
                /* Glowing ember dot with radial gradient */
                const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
                g.addColorStop(0,   `rgba(220, 140, 255, ${e.opacity})`);
                g.addColorStop(0.4, `rgba(150, 60, 220, ${e.opacity * 0.6})`);
                g.addColorStop(1,   `rgba(80, 20, 160, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
                ctx.fill();

                /* Bright core */
                ctx.fillStyle = `rgba(240, 200, 255, ${e.opacity * 0.9})`;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size * 0.8, 0, Math.PI * 2);
                ctx.fill();

            } else if (e.type === 'diamond') {
                /* Hollow rising diamond */
                const s = e.size * 3;
                ctx.strokeStyle = `rgba(180, 80, 255, ${e.opacity})`;
                ctx.lineWidth = 0.6;
                ctx.beginPath();
                ctx.moveTo(e.x, e.y - s);
                ctx.lineTo(e.x + s, e.y);
                ctx.lineTo(e.x, e.y + s);
                ctx.lineTo(e.x - s, e.y);
                ctx.closePath();
                ctx.stroke();

            } else {
                /* Arcane rune mark — small cross with dot */
                const s = e.size * 2.5;
                ctx.strokeStyle = `rgba(160, 60, 240, ${e.opacity * 0.8})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(e.x - s, e.y);
                ctx.lineTo(e.x + s, e.y);
                ctx.moveTo(e.x, e.y - s);
                ctx.lineTo(e.x, e.y + s);
                ctx.stroke();
                /* Center dot */
                ctx.fillStyle = `rgba(200, 100, 255, ${e.opacity * 0.6})`;
                ctx.beginPath();
                ctx.arc(e.x, e.y, 0.8, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
})();
