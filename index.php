<?php
include('assets/includes/header.php');
?>

<body>
  <div id="bodyhomepagina">
    <div id="achtergrond">
        <div id="titelboxboven">
            <h1 id="fireboy">Firegirl</h1>
            <h2 id="titeltekst">and</h2>
            <h1 id="watergirl">Watergirl</h1>
        </div>
        <div id="titelboxbeneden">
            <div id="winter">Winter Wonderland</div>
        </div>

        <div id="buttonmiddle">
            <a href="levelscherm.php" id="playbutton">Play</a>
        </div>

        <?php
        include('assets/includes/settings.php');
        ?>

    </div>
  </div>
</body>

</html>

<script>
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

      // hier zet je straks loop-geluid uit
      // walkSound.pause();
    } else {
      icon.classList.remove("fa-volume-low");
      icon.classList.add("fa-volume-high");
      soundButton.classList.remove("sound-off");

      // walkSound.play();
    }
  });
</script>
