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
const correctPassword = "Mainframe"; // CHANGE: set Dark's password here
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
        }, 500);
    } else {
        const box = document.querySelector(".gate-box");
        if (box) {
            box.classList.add("glitch");
            setTimeout(() => box.classList.remove("glitch"), 250);
        }
        const msg = "ACCESS DENIED"; // CHANGE: wrong password message
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

/* ============================================================
   FALLING CODE RAIN CANVAS EFFECT
   Subtle matrix-style columns of characters falling downward.
   Kept dim so it doesn't compete with the content.
   ============================================================ */
(function codeRainEffect() {
    const frame = document.querySelector(".frame");
    if (!frame) return;

    const canvas = document.createElement("canvas");
    canvas.id = "aura-canvas";
    frame.prepend(canvas);
    const ctx = canvas.getContext("2d");

    // Characters used in the rain — mix of code symbols and binary
    const CHARS = "01アイウエオカキクケコ{}[]()<>/\\;:=+-*&|!?#@$%~^".split("");

    const FONT_SIZE = 12;
    let columns = [];

    function resize() {
        canvas.width = frame.offsetWidth;
        canvas.height = frame.offsetHeight;
        initColumns();
    }

    function initColumns() {
        const colCount = Math.floor(canvas.width / FONT_SIZE);
        columns = [];
        for (let i = 0; i < colCount; i++) {
            columns.push({
                y: Math.random() * -canvas.height, // start above canvas at random heights
                speed: Math.random() * 0.6 + 0.2, // slow and controlled — not chaotic
                opacity: Math.random() * 0.12 + 0.02, // very dim
                length: Math.floor(Math.random() * 12 + 6), // trail length
                chars: Array.from({ length: 20 }, () => CHARS[Math.floor(Math.random() * CHARS.length)]),
                charTimer: 0
            });
        }
    }

    window.addEventListener("resize", resize);

    function draw() {
        // Fade out previous frame with semi-transparent black
        ctx.fillStyle = "rgba(0, 4, 1, 0.18)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = `${FONT_SIZE}px 'Courier New', monospace`;

        columns.forEach((col, i) => {
            col.y += col.speed;
            col.charTimer++;

            // Randomly refresh one char in the column's array
            if (col.charTimer % 8 === 0) {
                const idx = Math.floor(Math.random() * col.chars.length);
                col.chars[idx] = CHARS[Math.floor(Math.random() * CHARS.length)];
            }

            // Draw the trail
            for (let j = 0; j < col.length; j++) {
                const charY = col.y - j * FONT_SIZE;
                if (charY < 0 || charY > canvas.height) continue;

                // Head of the column is brighter
                const isHead = j === 0;
                const alpha = isHead ? col.opacity * 4 : col.opacity * (1 - j / col.length);

                ctx.fillStyle = isHead ? `rgba(180, 255, 200, ${Math.min(alpha, 0.5)})` : `rgba(0, 200, 50, ${alpha})`;

                const char = col.chars[j % col.chars.length];
                ctx.fillText(char, i * FONT_SIZE, charY);
            }

            // Reset column when it falls off screen
            if (col.y - col.length * FONT_SIZE > canvas.height) {
                col.y = Math.random() * -200;
                col.speed = Math.random() * 0.6 + 0.2;
                col.opacity = Math.random() * 0.12 + 0.02;
                col.length = Math.floor(Math.random() * 12 + 6);
            }
        });

        requestAnimationFrame(draw);
    }

    resize();
    draw();
})();
