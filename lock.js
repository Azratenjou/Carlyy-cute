let input = [];
const correct = "0208";
let attempts = 0;

const tapSound = document.getElementById("tapSound");
const unlockSound = document.getElementById("unlockSound");
const heartbeat = document.getElementById("heartbeat");

// Safe autoplay for heartbeat only if element exists
if (heartbeat) {
    document.body.addEventListener("click", () => {
        if (heartbeat.paused) {
            heartbeat.volume = 0.4;
            heartbeat.play().catch(() => {});
        }
    }, { once: true });
}

function playTap() {
    if (tapSound) {
        tapSound.currentTime = 0;
        tapSound.play().catch(() => {});
    }
}

function press(num) {
    playTap();

    if (input.length < 4) {
        input.push(num);
        updateDots();

        if (input.length === 4) {
            setTimeout(check, 200);
        }
    }
}

function del() {
    playTap();
    input.pop();
    updateDots();
}

function updateDots() {
    for (let i = 0; i < 4; i++) {
        document.getElementById("dot" + i).classList.toggle("fill", i < input.length);
    }
}

function check() {
    const entered = input.join("");

    if (entered === correct) {
        if (unlockSound) unlockSound.play().catch(() => {});
        if (heartbeat) heartbeat.pause();

        document.getElementById("padlock").classList.add("open");

        const rect = document.getElementById("padlock").getBoundingClientRect();

        for (let i = 0; i < 50; i++) {
            createSparkle(rect.left + rect.width / 2, rect.top + 40);
        }

        setTimeout(() => {
            document.getElementById("finalMessage").classList.add("show");
        }, 500);

        setTimeout(() => {
            document.getElementById("loadingScreen").classList.add("show");
        }, 1500);

        setTimeout(() => {
            window.location.href = "letter.html";
        }, 2600);

    } else {
        attempts++;
        document.getElementById("status").innerText = "Wrong passcode 😅";
        input = [];
        updateDots();
        shake();

        if (attempts === 3) {
            document.getElementById("hint").innerText = "Maybe it's a special date 🤔";
        }
        if (attempts === 4) {
            document.getElementById("hint").innerText = "Think of something important to you 💭";
        }
        if (attempts === 5) {
            document.getElementById("hint").innerText = "It's 02/08 😳";
        }
    }
}

function shake() {
    const el = document.querySelector(".lock-container");
    el.style.transform = "translateX(10px)";
    setTimeout(() => el.style.transform = "translateX(-10px)", 100);
    setTimeout(() => el.style.transform = "translateX(0)", 200);
}

function createSparkle(x, y) {
    const s = document.createElement("div");
    s.classList.add("sparkle");
    s.style.left = x + "px";
    s.style.top = y + "px";
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 1000);
}

// Floating hearts
setInterval(() => {
    const heart = document.createElement("div");
    heart.classList.add("heart");
    heart.innerText = "💖";

    heart.style.left = Math.random() * 100 + "vw";

    const size = 18 + Math.random() * 12;
    heart.style.fontSize = size + "px";

    heart.style.opacity = 0.3 + Math.random() * 0.7;

    document.body.appendChild(heart);

    setTimeout(() => heart.remove(), 6000);
}, 500);