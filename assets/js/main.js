function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup() {
  document.querySelectorAll('.popup-overlay')
    .forEach(popup => popup.style.display = "none");
}



const button = document.getElementById("musicbutton");

button.addEventListener("click", () => {
  button.classList.toggle("music-off");
  button.classList.toggle("music-on");
});

const soundButton = document.getElementById("soundbutton");

soundButton.addEventListener("click", () => {
  const icon = soundButton.querySelector("i");

  if (icon.classList.contains("fa-volume-high")) {
    icon.classList.remove("fa-volume-high");
    icon.classList.add("fa-volume-low");
    soundButton.classList.add("sound-off");

    // hier komt straks loop geluid uit
    // walkSound.pause();
  } else {
    icon.classList.remove("fa-volume-low");
    icon.classList.add("fa-volume-high");
    soundButton.classList.remove("sound-off");

    // walkSound.play();
  }
});



















































const audioElement = document.querySelector('.audioControls');


audioElement.addEventListener("pause", () => {
  audioElement.play();
});

audioElement.addEventListener("ended", () => {
  audioElement.play();
});

audioElement.play();
audioElement.volume = 0.7;
audioElement.muted = false;