// Animasi Hati & Pesan Kejutan 1
function showLove() {
  const msg = document.getElementById('love-message');
  msg.classList.remove('hidden');
  msg.style.animation = 'popIn 1.2s';
}

// Popup Kejutan 2
function showPopup() {
  document.getElementById('romantic-popup').classList.remove('hidden');
  // Animasi bunga di popup
  const popupFlowers = document.querySelector('.popup-flowers');
  popupFlowers.innerHTML = '';
  const flowerEmojis = ['🌸', '🌹', '🌺', '💐', '🌷', '🌻'];
  for (let i = 0; i < 4; i++) {
    const span = document.createElement('span');
    span.textContent = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
    popupFlowers.appendChild(span);
  }
}
function closePopup() {
  document.getElementById('romantic-popup').classList.add('hidden');
}

// MODE GELAP
function toggleMode() {
  const body = document.body;
  body.classList.toggle('dark');
  const btn = document.getElementById('toggle-mode');
  if (body.classList.contains('dark')) {
    btn.innerHTML = "☀️ Mode Terang";
  } else {
    btn.innerHTML = "🌙 Mode Gelap";
  }
}

// ANIMASI BUNGA JATUH
const flowerCanvas = document.getElementById('flower-canvas');
const flowerCtx = flowerCanvas.getContext('2d');
let flowers = [];
const flowerEmojis = ['🌸','🌺','🌹','🌷','💐','🌻'];

function resizeFlowerCanvas() {
  flowerCanvas.width = window.innerWidth;
  flowerCanvas.height = window.innerHeight;
}
function createFlower() {
  const emoji = flowerEmojis[Math.floor(Math.random() * flowerEmojis.length)];
  const fontSize = Math.random() * 28 + 26;
  return {
    x: Math.random() * flowerCanvas.width,
    y: -fontSize,
    speed: Math.random() * 1.7 + 0.7,
    drift: (Math.random() - 0.5) * 1.1,
    fontSize: fontSize,
    emoji: emoji,
    rotate: Math.random() * Math.PI * 2,
    rotateSpeed: (Math.random() - 0.5) * 0.03
  };
}
function drawFlower(flower) {
  flowerCtx.save();
  flowerCtx.font = `${flower.fontSize}px serif`;
  flowerCtx.translate(flower.x, flower.y);
  flowerCtx.rotate(flower.rotate);
  flowerCtx.fillText(flower.emoji, 0, 0);
  flowerCtx.restore();
}
function animateFlowers() {
  flowerCtx.clearRect(0, 0, flowerCanvas.width, flowerCanvas.height);
  if (flowers.length < 30) {
    flowers.push(createFlower());
  }
  for (let i = 0; i < flowers.length; i++) {
    const f = flowers[i];
    f.y += f.speed;
    f.x += f.drift;
    f.rotate += f.rotateSpeed;
    drawFlower(f);
    if (f.y > flowerCanvas.height + 40 || f.x < -40 || f.x > flowerCanvas.width + 40) {
      flowers[i] = createFlower();
    }
  }
  requestAnimationFrame(animateFlowers);
}
window.addEventListener('resize', resizeFlowerCanvas);
resizeFlowerCanvas();
animateFlowers();

// AUDIO ROMANTIS
let audioPlaying = false;
function toggleAudio() {
  const audio = document.getElementById('romantic-audio');
  const btn = document.getElementById('audio-btn');
  if (audio.paused) {
    audio.play();
    audioPlaying = true;
    btn.innerHTML = "⏸️ Pause Lagu";
  } else {
    audio.pause();
    audioPlaying = false;
    btn.innerHTML = "🎵 Mainkan Lagu";
  }
}

// WISH (BINTANG)
const wishCanvas = document.getElementById('wish-canvas');
const wishCtx = wishCanvas.getContext('2d');
let wishes = [];

function resizeWishCanvas() {
  wishCanvas.width = window.innerWidth;
  wishCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeWishCanvas);
resizeWishCanvas();

function drawWishStars() {
  wishCtx.clearRect(0, 0, wishCanvas.width, wishCanvas.height);
  wishes.forEach((wish, i) => {
    let x = wish.x, y = wish.y;
    // Star shape
    wishCtx.save();
    wishCtx.globalAlpha = 0.88;
    wishCtx.translate(x, y);
    wishCtx.rotate(Math.sin(Date.now()/700 + i) * 0.2);
    wishCtx.font = "22px serif";
    wishCtx.fillText("⭐", 0, 0);
    wishCtx.restore();
    // Wish text
    wishCtx.save();
    wishCtx.globalAlpha = 0.93;
    wishCtx.font = "bold 15px Segoe UI";
    wishCtx.fillStyle = (document.body.classList.contains('dark')) ? "#ffb6c1" : "#a15c8b";
    wishCtx.fillText(wish.text, x+22, y+7);
    wishCtx.restore();
  });
  requestAnimationFrame(drawWishStars);
}
drawWishStars();

function addWish(event) {
  event.preventDefault();
  const input = document.getElementById('wish-input');
  const text = input.value.trim();
  if (!text) return;
  let x = Math.random() * (wishCanvas.width - 200) + 20;
  let y = Math.random() * (wishCanvas.height - 80) + 30;
  wishes.push({text, x, y});
  input.value = "";
}

// GALERI (tidak perlu kode JS, animasi di CSS)

// SURAT CINTA INTERAKTIF
const letterTexts = [
  `<b>Surat 1</b><br>
  Sayangku,<br>
  Setiap hari aku bersyukur memilikimu. Kebahagiaan yang kamu hadirkan tak terlukiskan.<br>
  Terima kasih untuk setiap senyuman, pelukan, dan perhatianmu.<br>
  Aku mencintaimu sepenuh hati.<br><br>
  <i>— Seseorang yang selalu memikirkanmu</i>`,
  `<b>Surat 2</b><br>
  Untukmu yang selalu di hati,<br>
  Tidak ada yang mampu menggantikanmu. Bersamamu, setiap detik terasa berarti.<br>
  Aku ingin terus berjalan bersamamu, merangkai cerita indah bersama.<br>
  <i>— Dengan penuh cinta</i>`,
  `<b>Surat 3</b><br>
  Cintaku,<br>
  Aku ingin kamu tahu, cintaku ini tulus dan takkan pudar oleh waktu.<br>
  Semoga kebahagiaan selalu menyertai langkah kita.<br>
  <i>— Kekasihmu</i>`
];
function openLetter(idx) {
  document.getElementById('letter-popup').classList.remove('hidden');
  document.getElementById('letter-text').innerHTML = letterTexts[idx-1];
}
function closeLetter() {
  document.getElementById('letter-popup').classList.add('hidden');
}

// SYNC MODE GELAP pada wish star & gallery
const observer = new MutationObserver(() => {
  drawWishStars();
});
observer.observe(document.body, {attributes: true, attributeFilter:['class']});