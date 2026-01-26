console.log("SCRIPT LOADED");

function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup() {
  document.querySelectorAll('.popup-overlay')
    .forEach(popup => popup.style.display = "none");
}

/* ===== AUDIO ===== */
const audioElement = document.getElementById("backgroundMusic");
const musicButton = document.getElementById("musicbutton");
const soundButton = document.getElementById("soundbutton");

/* ===== MUZIEKSTATUS BIJ LADEN ===== */
if (audioElement) {
  const musicState = localStorage.getItem("musicState");
  const musicVolume = localStorage.getItem("musicVolume");

  if (musicVolume !== null) {
    audioElement.volume = musicVolume;
  }

  // standaard: muziek AAN
  if (musicState !== "off") {
    audioElement.play().catch(() => {});
  } else {
    audioElement.pause();
  }
}

/* ===== MUZIEK AAN / UIT KNOP ===== */
if (musicButton && audioElement) {
  // juiste start-klasse
  if (localStorage.getItem("musicState") === "off") {
    musicButton.classList.add("music-off");
  } else {
    musicButton.classList.add("music-on");
  }

  musicButton.addEventListener("click", () => {
    if (audioElement.paused) {
      audioElement.play();
      localStorage.setItem("musicState", "on");
      musicButton.classList.remove("music-off");
      musicButton.classList.add("music-on");
    } else {
      audioElement.pause();
      localStorage.setItem("musicState", "off");
      musicButton.classList.remove("music-on");
      musicButton.classList.add("music-off");
    }
  });
}

/* ===== VOLUME KNOP ===== */
if (soundButton && audioElement) {
  soundButton.addEventListener("click", () => {
    const icon = soundButton.querySelector("i");

    if (icon.classList.contains("fa-volume-high")) {
      icon.classList.replace("fa-volume-high", "fa-volume-low");
      audioElement.volume = 0.3;
      localStorage.setItem("musicVolume", 0.3);
    } else {
      icon.classList.replace("fa-volume-low", "fa-volume-high");
      audioElement.volume = 1.0;
      localStorage.setItem("musicVolume", 1.0);
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
    const levelButtons = document.querySelectorAll(".level");

    levelButtons.forEach(button => {
        const level = button.dataset.level;

        console.log('checking level', level); // DEBUG

        if (localStorage.getItem(`level_${level}_completed`) === 'true') {
            button.classList.add("completed");
        }
    });
});

document.getElementById("resetProgress")?.addEventListener("click", () => {
    if (!confirm("Are you sure you want to reset your progress?")) return;

    localStorage.clear();
    location.reload();
});
