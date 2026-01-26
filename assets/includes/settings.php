<div id="settings">
    <button id="settingsbutton" onclick="openPopup('settingsPopup')">
        <i class="fa-solid fa-gear"></i>
    </button>
</div>

<div id="question">
    <button id="questionbutton" onclick="openPopup('questionPopup')">
        <i class="fa-solid fa-question"></i>
    </button>
</div>

<div id="settingsPopup" class="popup-overlay">
    <div class="popup">
        <button class="close" onclick="closePopup()">✕</button>
        <div id="settingsgeluid">
            <h2>Settings</h2>

            <div id="positiegeluid">
                <button id="musicbutton" class="music-off">
                    <i class="fa-solid fa-music"></i>
                </button>

                <button id="soundbutton" class="sound-on">
                    <i class="fa-solid fa-volume-high"></i>
                </button>

                <button id="resetProgress">
                    <i class="fa-solid fa-arrow-rotate-left"></i>
                </button>
            </div>
        </div>

    </div>
</div>

<div id="questionPopup" class="popup-overlay">
    <div class="popup">
        <button class="close" onclick="closePopup()">✕</button>

        <div id="positievraag">
            <h2>How to play</h2>
            <p>Firegirl and Watergirl is a cooperative puzzle platform game where two characters must work together to complete each level. Firegirl can safely walk through fire and lava but must avoid water, while Watergirl can move through water but must stay away from fire. Both characters must avoid green toxic liquid and the brown tiles. The goal of each level is to parkour and reach the exit doors by solving puzzles and helping each other overcome obstacles.</p>

            <h2>Controls</h2>
            Firegirl is controlled using the arrow keys on the keyboard, while Watergirl is controlled using the W, A, S, and D keys. Players must move, jump, and time their actions carefully to coordinate both characters at the same time. Good teamwork and precise control are essential to successfully complete the levels.
            </p>

            <h2>Settings</h2>
            The music button turns the music on and off.
            The speaker control lets you make the music louder or quieter.
            The dial allows you to reset your progress.
        </div>
    </div>
</div>