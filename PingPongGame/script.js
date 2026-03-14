const canvas      = document.getElementById("pong");
const ctx         = canvas.getContext("2d");
const bgCanvas    = document.getElementById("bg-canvas");
const bgCtx       = bgCanvas.getContext("2d");
const startScreen = document.getElementById("start-screen");
const gameOverScr = document.getElementById("game-over");
const scoreDisp   = document.getElementById("score-display");
const scoreEl     = document.getElementById("current-score");
const hsEl        = document.getElementById("high-score");

let score      = 0;
let playerName = "";
let highScore  = JSON.parse(localStorage.getItem('pongHS')) || { name: "", score: 0 };
let gameOver      = false;
let readyToRetry  = false;
let animId     = null;

const PAD = { x: canvas.width / 2 - 55, y: canvas.height - 18, w: 110, h: 10, dx: 0 };
const BALL = { x: canvas.width / 2, y: canvas.height / 2, r: 9, speed: 5, vx: 5, vy: 5 };
const MAX_SPEED = 13;
const ACCEL = 0.22;

const particles = [];
function initBg() {
    bgCanvas.width  = window.innerWidth;
    bgCanvas.height = window.innerHeight;
    particles.length = 0;
    for (let i = 0; i < 80; i++) {
        particles.push({
            x: Math.random() * bgCanvas.width,
            y: Math.random() * bgCanvas.height,
            r: Math.random() * 1.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.3,
            vy: (Math.random() - 0.5) * 0.3,
            alpha: Math.random() * 0.5 + 0.1
        });
    }
}

function drawBg() {
    bgCtx.clearRect(0, 0, bgCanvas.width, bgCanvas.height);
    for (const p of particles) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0) p.x = bgCanvas.width;
        if (p.x > bgCanvas.width) p.x = 0;
        if (p.y < 0) p.y = bgCanvas.height;
        if (p.y > bgCanvas.height) p.y = 0;
        bgCtx.beginPath();
        bgCtx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        bgCtx.fillStyle = `rgba(0,255,231,${p.alpha})`;
        bgCtx.fill();
    }
    bgCtx.strokeStyle = "rgba(0,255,231,0.03)";
    bgCtx.lineWidth = 1;
    const step = 60;
    for (let x = 0; x < bgCanvas.width; x += step) {
        bgCtx.beginPath(); bgCtx.moveTo(x, 0); bgCtx.lineTo(x, bgCanvas.height); bgCtx.stroke();
    }
    for (let y = 0; y < bgCanvas.height; y += step) {
        bgCtx.beginPath(); bgCtx.moveTo(0, y); bgCtx.lineTo(bgCanvas.width, y); bgCtx.stroke();
    }
    requestAnimationFrame(drawBg);
}

initBg();
drawBg();
window.addEventListener("resize", initBg);

function showScreen(el) {
    [startScreen, gameOverScr].forEach(s => s.classList.remove("active"));
    if (el) el.classList.add("active");
}

function updateScoreDisplay() {
    scoreEl.textContent = score;
    const hsName = highScore.name ? ` · ${highScore.name}` : "";
    hsEl.textContent = highScore.score + hsName;
}

function popScore(el) {
    el.classList.remove("pop");
    void el.offsetWidth; 
    el.classList.add("pop");
}

function resetBall() {
    BALL.x = canvas.width / 2;
    BALL.y = canvas.height / 2;
    BALL.speed = 5;
    BALL.vx = (Math.random() > 0.5 ? 1 : -1) * BALL.speed;
    BALL.vy = BALL.speed;
}

function render() {
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#060612";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.setLineDash([8, 12]);
    ctx.strokeStyle = "rgba(0,255,231,0.08)";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.stroke();
    ctx.setLineDash([]);

    const gPad = ctx.createLinearGradient(PAD.x, PAD.y, PAD.x + PAD.w, PAD.y);
    gPad.addColorStop(0,   "rgba(0,255,231,0.15)");
    gPad.addColorStop(0.5, "rgba(0,255,231,1)");
    gPad.addColorStop(1,   "rgba(0,255,231,0.15)");
    ctx.shadowColor = "#00ffe7";
    ctx.shadowBlur  = 18;
    ctx.fillStyle   = gPad;
    ctx.beginPath();
    ctx.roundRect(PAD.x, PAD.y, PAD.w, PAD.h, 5);
    ctx.fill();

    ctx.shadowColor = "#00ffe7";
    ctx.shadowBlur  = 28;
    const gBall = ctx.createRadialGradient(BALL.x, BALL.y, 0, BALL.x, BALL.y, BALL.r);
    gBall.addColorStop(0, "#ffffff");
    gBall.addColorStop(0.4, "#00ffe7");
    gBall.addColorStop(1,   "rgba(0,255,231,0.1)");
    ctx.fillStyle = gBall;
    ctx.beginPath();
    ctx.arc(BALL.x, BALL.y, BALL.r, 0, Math.PI * 2);
    ctx.fill();

    ctx.shadowBlur  = 0;
    ctx.shadowColor = "transparent";
}

function update() {
    PAD.x += PAD.dx;
    if (PAD.x < 0) PAD.x = 0;
    if (PAD.x + PAD.w > canvas.width) PAD.x = canvas.width - PAD.w;

    BALL.x += BALL.vx;
    BALL.y += BALL.vy;

    if (BALL.y - BALL.r < 0)                       BALL.vy = Math.abs(BALL.vy);
    if (BALL.x - BALL.r < 0)                       BALL.vx = Math.abs(BALL.vx);
    if (BALL.x + BALL.r > canvas.width)            BALL.vx = -Math.abs(BALL.vx);

    if (
        BALL.vy > 0 &&
        BALL.y + BALL.r >= PAD.y &&
        BALL.y - BALL.r <= PAD.y + PAD.h &&
        BALL.x + BALL.r >= PAD.x &&
        BALL.x - BALL.r <= PAD.x + PAD.w
    ) {
        BALL.speed = Math.min(BALL.speed + ACCEL, MAX_SPEED);
        const hitPos = (BALL.x - (PAD.x + PAD.w / 2)) / (PAD.w / 2); 
        BALL.vx = hitPos * BALL.speed;
        BALL.vy = -BALL.speed;
        score++;

        if (score > highScore.score) {
            highScore = { name: playerName, score };
            localStorage.setItem('pongHS', JSON.stringify(highScore));
        }
        updateScoreDisplay();
        popScore(scoreEl);
    }

    if (BALL.y - BALL.r > canvas.height) {
        triggerGameOver();
    }
}

function gameLoop() {
    if (!gameOver) {
        update();
        render();
        animId = requestAnimationFrame(gameLoop);
    }
}

function startGame() {
    playerName = document.getElementById("player-name").value.trim().toUpperCase() || "PLAYER";
    score = 0;
    gameOver = false;
    PAD.x = canvas.width / 2 - PAD.w / 2;
    resetBall();
    showScreen(null);
    scoreDisp.style.display = "flex";
    canvas.style.display = "block";
    updateScoreDisplay();
    if (animId) cancelAnimationFrame(animId);
    gameLoop();
}

function resetGame() {
    readyToRetry = false;
    score = 0;
    gameOver = false;
    PAD.x = canvas.width / 2 - PAD.w / 2;
    resetBall();
    canvas.style.display = "block";
    scoreDisp.style.display = "flex";
    showScreen(null);
    updateScoreDisplay();
    if (animId) cancelAnimationFrame(animId);
    gameLoop();
}

function triggerGameOver() {
    gameOver = true;
    cancelAnimationFrame(animId);
    canvas.style.display = "none";
    scoreDisp.style.display = "none";

    const hsLabel = highScore.name ? ` · ${highScore.name}` : "";
    document.getElementById("go-player").textContent    = playerName;
    document.getElementById("go-score").textContent     = score;
    document.getElementById("go-highscore").textContent = highScore.score + hsLabel;
    readyToRetry = true;
    showScreen(gameOverScr);
}


canvas.addEventListener("mousemove", e => {
    const rect = canvas.getBoundingClientRect();
    PAD.x = e.clientX - rect.left - PAD.w / 2;
    if (PAD.x < 0) PAD.x = 0;
    if (PAD.x + PAD.w > canvas.width) PAD.x = canvas.width - PAD.w;
});

const IGNORED_KEYS = ["Tab","Shift","Control","Alt","Meta","CapsLock"];

document.addEventListener("keydown", e => {
    if (startScreen.classList.contains("active")) {
        if (document.activeElement === document.getElementById("player-name")) {
            if (e.key === "Enter") startGame();
        } else if (!IGNORED_KEYS.includes(e.key)) {
            startGame();
        }
        return;
    }

    // Game Over screen — any key retries (only once readyToRetry is set)
    if (gameOverScr.classList.contains("active")) {
        if (readyToRetry && !IGNORED_KEYS.includes(e.key)) resetGame();
        return;
    }

    // In-game paddle movement — arrow keys + A/D
    if (["ArrowLeft", "a", "A"].includes(e.key))  { e.preventDefault(); PAD.dx = -8; }
    if (["ArrowRight", "d", "D"].includes(e.key)) { e.preventDefault(); PAD.dx =  8; }
});

document.addEventListener("keyup", e => {
    if (["ArrowLeft","ArrowRight","a","A","d","D"].includes(e.key)) PAD.dx = 0;
});

// Click anywhere on start screen (not the input) to start
startScreen.addEventListener("click", e => {
    if (e.target.tagName === "INPUT") return;
    startGame();
});

// Click anywhere on game over screen to retry
gameOverScr.addEventListener("click", () => { if (readyToRetry) resetGame(); });

// Buttons (stopPropagation so screen-click listener doesn't double-fire)
document.getElementById("start-btn").addEventListener("click", e => { e.stopPropagation(); startGame(); });
document.getElementById("retry-btn").addEventListener("click", e => { e.stopPropagation(); resetGame(); });