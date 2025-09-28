// audio.js

// 🎵 Background Music
let bgMusic = new Audio("music/npalame.mp3"); // put your bg music file
bgMusic.loop = true;

// 🔊 Example SFX
let clickSfx = new Audio("click.mp3"); // put your SFX file

// --- Default states ---
if (localStorage.getItem("musicState") === null) {
  localStorage.setItem("musicState", "ON"); // default ON
}
if (localStorage.getItem("sfxState") === null) {
  localStorage.setItem("sfxState", "ON"); // default ON
}

// --- Apply background music state ---
if (localStorage.getItem("musicState") === "ON") {
  bgMusic.play();
} else {
  bgMusic.pause();
}

// 🎵 Toggle Music
function toggleMusic() {
  if (localStorage.getItem("musicState") === "ON") {
    localStorage.setItem("musicState", "OFF");
    bgMusic.pause();
  } else {
    localStorage.setItem("musicState", "ON");
    bgMusic.play();
  }
}

// 🔊 Toggle SFX
function toggleSfx() {
  if (localStorage.getItem("sfxState") === "ON") {
    localStorage.setItem("sfxState", "OFF");
  } else {
    localStorage.setItem("sfxState", "ON");
  }
}

// 🔊 Play SFX (only if ON)
function playSfx(sound) {
  if (localStorage.getItem("sfxState") === "ON") {
    sound.currentTime = 0; // restart from beginning
    sound.play();
  }
}

// Helpers
function isMusicOn() {
  return localStorage.getItem("musicState") === "ON";
}
function isSfxOn() {
  return localStorage.getItem("sfxState") === "ON";
}
