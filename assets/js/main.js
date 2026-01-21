function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup() {
  document.querySelectorAll('.popup-overlay')
    .forEach(popup => popup.style.display = "none");
}

const audioElement = document.querySelector('#backgroundMusic');
const musicButton = document.getElementById("musicbutton");
const soundButton = document.getElementById("soundbutton");

/* ===== STATUS BIJ LADEN ===== */
const savedMusicState = localStorage.getItem("musicState");
const savedVolume = localStorage.getItem("musicVolume");

// Volume herstellen
if (savedVolume !== null) {
  audioElement.volume = savedVolume;
}

// Muziek aan/uit herstellen
if (savedMusicState === "off") {
  audioElement.pause();
  musicButton.classList.add("music-off");
  musicButton.classList.remove("music-on");
} else {
  // default = aan
  audioElement.play();
  musicButton.classList.add("music-on");
  musicButton.classList.remove("music-off");
}

/* ===== MUZIEK AAN/UIT ===== */
musicButton.addEventListener("click", () => {
  if (audioElement.paused) {
    audioElement.play();
    musicButton.classList.add("music-on");
    musicButton.classList.remove("music-off");
    localStorage.setItem("musicState", "on");
  } else {
    audioElement.pause();
    musicButton.classList.add("music-off");
    musicButton.classList.remove("music-on");
    localStorage.setItem("musicState", "off");
  }
});

/* ===== VOLUME ZACHT / HARD ===== */
soundButton.addEventListener("click", () => {
  const icon = soundButton.querySelector("i");

  if (icon.classList.contains("fa-volume-high")) {
    icon.classList.replace("fa-volume-high", "fa-volume-low");
    soundButton.classList.add("sound-off");
    audioElement.volume = 0.3;
    localStorage.setItem("musicVolume", 0.3);
  } else {
    icon.classList.replace("fa-volume-low", "fa-volume-high");
    soundButton.classList.remove("sound-off");
    audioElement.volume = 1.0;
    localStorage.setItem("musicVolume", 1.0);
  }
});
