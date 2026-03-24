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
const correctPassword = "Vasteil"; // CHANGE: set Necro's password here
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

/* === ARCANE WORKSHOP CANVAS EFFECT ===
   Floating purple dust particles rising upward,
   plus a slow pulsing arcane aura ring.
*/
(function workshopEffect() {
    const frame = document.querySelector(".frame");
    if (!frame) return;

    let canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
    const ctx = canvas.getContext("2d");

    function resize() {
        canvas.width = frame.offsetWidth;
        canvas.height = frame.offsetHeight;
        initParticles();
    }

    window.addEventListener("resize", resize);

    /* === FLOATING DUST PARTICLES === */
    const PARTICLE_COUNT = 60;
    let particles = [];

    function initParticles() {
        particles = [];
        for (let i = 0; i < PARTICLE_COUNT; i++) {
            particles.push(spawnParticle(true));
        }
    }

    function spawnParticle(randomY = false) {
        return {
            x: Math.random() * canvas.width,
            y: randomY ? Math.random() * canvas.height : canvas.height + 5,
            size: Math.random() * 1.5 + 0.4,
            speed: Math.random() * 0.4 + 0.1,
            opacity: Math.random() * 0.5 + 0.05,
            drift: (Math.random() - 0.5) * 0.3, // horizontal drift
            // Some particles are hollow diamond shapes
            diamond: Math.random() > 0.8
        };
    }

    /* === AURA PULSE === */
    let radius = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        /* Aura pulse */
        const maxR = Math.max(canvas.width, canvas.height) * 0.75;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, radius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(80, 20, 160, 0.025)";
        ctx.fill();
        radius += 0.4;
        if (radius > maxR) radius = 0;

        /* Particles */
        particles.forEach((p, i) => {
            p.y -= p.speed;
            p.x += p.drift;
            p.opacity -= 0.0008;

            if (p.y < -10 || p.opacity <= 0) {
                particles[i] = spawnParticle(false);
                return;
            }

            ctx.save();
            ctx.globalAlpha = Math.max(0, p.opacity);

            if (p.diamond) {
                /* Hollow diamond */
                ctx.strokeStyle = `rgba(160, 80, 255, ${p.opacity})`;
                ctx.lineWidth = 0.5;
                const s = p.size * 3;
                ctx.beginPath();
                ctx.moveTo(p.x, p.y - s);
                ctx.lineTo(p.x + s, p.y);
                ctx.lineTo(p.x, p.y + s);
                ctx.lineTo(p.x - s, p.y);
                ctx.closePath();
                ctx.stroke();
            } else {
                /* Soft glow dot */
                const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size * 3);
                gradient.addColorStop(0, `rgba(160, 80, 255, ${p.opacity})`);
                gradient.addColorStop(1, `rgba(80, 20, 160, 0)`);
                ctx.fillStyle = gradient;
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
                ctx.fill();
            }

            ctx.restore();
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
})();
