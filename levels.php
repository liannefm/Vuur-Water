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

    <div id="pausePopup" class="popup-overlay">
        <div class="popup-content">
            <h2>Paused</h2>
            <p>
                Press <strong>R</strong> to restart<br>
                Press <strong>M</strong> to return to the level menu<br>
                Press <strong>Space</strong> to continue
            </p>
            <button class="popup-button" id="resumeBtn">Resume Game</button>
            <button class="popup-button" id="restartBtn">Restart Level</button>
            <button class="popup-button" onclick="goToLevelScreen()">Back to Level Menu</button>
        </div>
    </div>

    <div id="gameOverPopup" class="popup-overlay">
        <div class="popup-content">
            <h2>Game Over</h2>
            <p>Press <strong>R</strong> to restart<br>
                Press <strong>M</strong> to return to the level menu
            </p>
            <button class="popup-button" onclick="restartGame()">Restart Level</button>
            <button class="popup-button" onclick="goToLevelScreen()">Back to Level Menu</button>
        </div>
    </div>

    <script src="assets/js/game.js" type="module"></script>
</body>


</html>