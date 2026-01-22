<?php
include('assets/includes/header.php');
?>

<body>
    <div id="game-container">
        
        
        <div id="timer-wrapper">
            <img src="assets/img/timer.png" id="timer" alt="Timer">
            <span id="timer-text">00:00</span>
        </div>
        
        <div id="pause-wrapper">
            <button id="pausebutton">
                <i class="fa-solid fa-pause"></i>
            </button>
        </div>

        <canvas id="board"></canvas>
    </div>

    <audio id="backgroundMusic" loop>
        <source src="./assets/sounds/backgroundmusic.mp3" type="audio/mpeg">
    </audio>

        <div id="levelCompletePopup" class="popup-overlay">
    <div class="popup-content">
        <h2>🎉 You completed the level! 🎉</h2>
        <button class="popup-button" onclick="goToLevelScreen()">
            Return
        </button>
    </div>
</div>

    
    <script src="assets/js/game.js" type="module"></script>
</body>


</html>