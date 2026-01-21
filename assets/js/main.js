function openPopup(id) {
  document.getElementById(id).style.display = "flex";
}

function closePopup() {
  document.querySelectorAll('.popup-overlay')
  .forEach(popup => popup.style.display = "none");
}



const audioElement = document.querySelector('#backgroundMusic');
const button = document.getElementById("musicbutton");

button.addEventListener("click", () => {
  button.classList.toggle("music-off");
  button.classList.toggle("music-on");

  if (button.classList.contains('music-on')) {
    audioElement.play();
  }else if (button.classList.contains('music-off')){
    audioElement.pause();
  }
});

const soundButton = document.getElementById("soundbutton");

soundButton.addEventListener("click", () => {
  const icon = soundButton.querySelector("i");

  if (icon.classList.contains("fa-volume-high")) {
    icon.classList.remove("fa-volume-high");
    icon.classList.add("fa-volume-low");
    soundButton.classList.add("sound-off");
    audioElement.volume = 0.3;

    // hier komt straks loop geluid uit
    // walkSound.pause();
  } else {
    icon.classList.remove("fa-volume-low");
    icon.classList.add("fa-volume-high");
    soundButton.classList.remove("sound-off");
    audioElement.volume = 1.0;

    // walkSound.play();
  }
});