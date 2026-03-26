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
        const msg = "The workshop does not open for strangers.";
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
   - Faint ghosted workshop tools etched in the background
     (gears, wrenches, rune symbols)
   - Rising embers/sparks floating upward
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

    /* =====================================================
       STATIC WORKSHOP TOOLS — etched ghosted in background
    ===================================================== */
    let tools = [];

    function initTools() {
        tools = [];
        const W = canvas.width;
        const H = canvas.height;

        // Scatter tools around the canvas at fixed positions
        // Each has: x, y, type, size, rotation, opacity
        const placements = [
            { x: W * 0.08,  y: H * 0.12, type: 'gear',   size: 38, rot: 0,    opacity: 0.055 },
            { x: W * 0.92,  y: H * 0.18, type: 'gear',   size: 28, rot: 0.4,  opacity: 0.045 },
            { x: W * 0.05,  y: H * 0.75, type: 'gear',   size: 44, rot: 0.8,  opacity: 0.05  },
            { x: W * 0.95,  y: H * 0.70, type: 'gear',   size: 32, rot: 1.2,  opacity: 0.05  },
            { x: W * 0.5,   y: H * 0.06, type: 'gear',   size: 22, rot: 0.2,  opacity: 0.035 },
            { x: W * 0.15,  y: H * 0.45, type: 'wrench', size: 50, rot: -0.4, opacity: 0.045 },
            { x: W * 0.88,  y: H * 0.42, type: 'wrench', size: 40, rot: 0.6,  opacity: 0.04  },
            { x: W * 0.3,   y: H * 0.88, type: 'wrench', size: 35, rot: 1.1,  opacity: 0.04  },
            { x: W * 0.72,  y: H * 0.92, type: 'wrench', size: 45, rot: -0.8, opacity: 0.045 },
            { x: W * 0.22,  y: H * 0.22, type: 'rune',   size: 20, rot: 0,    opacity: 0.06  },
            { x: W * 0.78,  y: H * 0.28, type: 'rune',   size: 18, rot: 0.3,  opacity: 0.055 },
            { x: W * 0.5,   y: H * 0.5,  type: 'rune',   size: 30, rot: 0.15, opacity: 0.035 },
            { x: W * 0.12,  y: H * 0.58, type: 'rune',   size: 16, rot: 0.6,  opacity: 0.05  },
            { x: W * 0.88,  y: H * 0.55, type: 'rune',   size: 22, rot: -0.2, opacity: 0.05  },
            { x: W * 0.38,  y: H * 0.15, type: 'rune',   size: 14, rot: 0.8,  opacity: 0.045 },
            { x: W * 0.65,  y: H * 0.82, type: 'rune',   size: 18, rot: -0.4, opacity: 0.05  },
        ];

        // Add slow rotation to gears
        placements.forEach(p => {
            tools.push({ ...p, currentRot: p.rot, rotSpeed: p.type === 'gear' ? (Math.random() * 0.003 + 0.001) : 0 });
        });
    }

    /* Draw a gear shape */
    function drawGear(ctx, x, y, radius, teeth, toothSize, rotation) {
        const inner = radius * 0.65;
        const holeR = radius * 0.25;
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
            const angle = (i / teeth) * Math.PI * 2;
            const nextAngle = ((i + 1) / teeth) * Math.PI * 2;
            const midAngle = angle + (nextAngle - angle) * 0.5;
            const toothAngle = (nextAngle - angle) * 0.3;

            ctx.lineTo(Math.cos(angle - toothAngle) * inner, Math.sin(angle - toothAngle) * inner);
            ctx.lineTo(Math.cos(angle - toothAngle) * (radius + toothSize), Math.sin(angle - toothAngle) * (radius + toothSize));
            ctx.lineTo(Math.cos(angle + toothAngle) * (radius + toothSize), Math.sin(angle + toothAngle) * (radius + toothSize));
            ctx.lineTo(Math.cos(angle + toothAngle) * inner, Math.sin(angle + toothAngle) * inner);
        }
        ctx.closePath();
        ctx.stroke();

        // Centre hole
        ctx.beginPath();
        ctx.arc(0, 0, holeR, 0, Math.PI * 2);
        ctx.stroke();

        // Cross inside hole
        ctx.beginPath();
        ctx.moveTo(-holeR * 0.7, 0); ctx.lineTo(holeR * 0.7, 0);
        ctx.moveTo(0, -holeR * 0.7); ctx.lineTo(0, holeR * 0.7);
        ctx.stroke();

        ctx.restore();
    }

    /* Draw a wrench shape */
    function drawWrench(ctx, x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        const headR = size * 0.28;
        const handleW = size * 0.09;
        const handleL = size * 0.75;

        // Handle
        ctx.beginPath();
        ctx.rect(-handleW / 2, -headR * 0.5, handleW, handleL);
        ctx.stroke();

        // Head — open circle with gap (wrench jaw)
        ctx.beginPath();
        ctx.arc(0, -headR * 0.5, headR, 0.4, Math.PI * 2 - 0.4);
        ctx.stroke();

        // Jaw gap lines
        ctx.beginPath();
        ctx.moveTo(-headR * 0.8, -headR * 0.5 - headR * 0.6);
        ctx.lineTo(-headR * 0.4, -headR * 0.5 - headR * 0.2);
        ctx.moveTo(headR * 0.8, -headR * 0.5 - headR * 0.6);
        ctx.lineTo(headR * 0.4, -headR * 0.5 - headR * 0.2);
        ctx.stroke();

        ctx.restore();
    }

    /* Draw a rune symbol */
    function drawRune(ctx, x, y, size, rotation) {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(rotation);

        // Outer circle
        ctx.beginPath();
        ctx.arc(0, 0, size, 0, Math.PI * 2);
        ctx.stroke();

        // Inner triangle
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            const px = Math.cos(angle) * size * 0.6;
            const py = Math.sin(angle) * size * 0.6;
            i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.stroke();

        // Centre dot
        ctx.beginPath();
        ctx.arc(0, 0, size * 0.15, 0, Math.PI * 2);
        ctx.fill();

        // Tick marks at triangle points extending to edge
        for (let i = 0; i < 3; i++) {
            const angle = (i / 3) * Math.PI * 2 - Math.PI / 2;
            ctx.beginPath();
            ctx.moveTo(Math.cos(angle) * size * 0.6, Math.sin(angle) * size * 0.6);
            ctx.lineTo(Math.cos(angle) * size, Math.sin(angle) * size);
            ctx.stroke();
        }

        ctx.restore();
    }

    /* =====================================================
       RISING EMBERS
    ===================================================== */
    const EMBER_COUNT = 50;
    let embers = [];

    function spawnEmber(randomY = false) {
        const type = Math.random();
        return {
            x: Math.random() * (canvas.width || 800),
            y: randomY ? Math.random() * (canvas.height || 600) : (canvas.height || 600) + 10,
            size: Math.random() * 2 + 0.5,
            speedY: Math.random() * 0.6 + 0.2,
            speedX: (Math.random() - 0.5) * 0.35,
            opacity: Math.random() * 0.55 + 0.1,
            life: 1.0,
            decay: Math.random() * 0.003 + 0.001,
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

    /* =====================================================
       DRAW LOOP
    ===================================================== */
    let auraRadius = 0;
    let t = 0;

    function draw() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        t += 0.01;

        /* Faint aura pulse */
        auraRadius += 0.3;
        if (auraRadius > Math.max(canvas.width, canvas.height) * 0.7) auraRadius = 0;
        ctx.beginPath();
        ctx.arc(canvas.width / 2, canvas.height / 2, auraRadius, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(90, 20, 160, 0.012)";
        ctx.fill();

        /* === DRAW STATIC TOOLS === */
        tools.forEach(tool => {
            ctx.save();
            ctx.globalAlpha = tool.opacity;
            ctx.strokeStyle = "rgba(160, 80, 255, 1)";
            ctx.fillStyle = "rgba(160, 80, 255, 1)";
            ctx.lineWidth = 1;

            // Slowly rotate gears
            tool.currentRot += tool.rotSpeed;

            if (tool.type === 'gear') {
                drawGear(ctx, tool.x, tool.y, tool.size, 8, tool.size * 0.18, tool.currentRot);
            } else if (tool.type === 'wrench') {
                drawWrench(ctx, tool.x, tool.y, tool.size, tool.currentRot);
            } else if (tool.type === 'rune') {
                drawRune(ctx, tool.x, tool.y, tool.size, tool.currentRot);
            }

            ctx.restore();
        });

        /* === DRAW EMBERS === */
        embers.forEach((e, i) => {
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
                const g = ctx.createRadialGradient(e.x, e.y, 0, e.x, e.y, e.size * 4);
                g.addColorStop(0,   `rgba(220, 140, 255, ${e.opacity})`);
                g.addColorStop(0.4, `rgba(150, 60, 220, ${e.opacity * 0.6})`);
                g.addColorStop(1,   `rgba(80, 20, 160, 0)`);
                ctx.fillStyle = g;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size * 4, 0, Math.PI * 2);
                ctx.fill();
                ctx.fillStyle = `rgba(240, 200, 255, ${e.opacity * 0.9})`;
                ctx.beginPath();
                ctx.arc(e.x, e.y, e.size * 0.8, 0, Math.PI * 2);
                ctx.fill();

            } else if (e.type === 'diamond') {
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
                const s = e.size * 2.5;
                ctx.strokeStyle = `rgba(160, 60, 240, ${e.opacity * 0.8})`;
                ctx.lineWidth = 0.5;
                ctx.beginPath();
                ctx.moveTo(e.x - s, e.y); ctx.lineTo(e.x + s, e.y);
                ctx.moveTo(e.x, e.y - s); ctx.lineTo(e.x, e.y + s);
                ctx.stroke();
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
