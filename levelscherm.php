<?php
include('assets/includes/header.php');
?>

<body>
    <div id="keuzelevelachtergrond">
        <div id="bovenbalk">
            <div id="backbuttonbox">
                <a href="index.php" id="backbutton"><i class="fa-solid fa-arrow-left"></i></a>
            </div>

            <div id="winterwonderland">Winter Wonderland</div>
        </div>

        <div id="levelkeuze">
            <a href="levels.php?level=3" class="level extra" data-level="3"></a>
            <a href="levels.php?level=2" class="level extra" data-level="2"></a>
            <a href="levels.php?level=1" class="level main" data-level="1"></a>
        </div>

        <!-- <div id="level1button">
            <a href="level-1.php" id="levelbutton"><img src="assets/img/levelknop.png"></a>
        </div> -->

    </div>
    <div id="lichtekeuzelevelachtergrond">

        <?php
        include('assets/includes/settings.php');
        ?>

        <div id="sneeuwvlokvak">
            <img src="assets/img/sneeuwster.png" id="sneeuwvlok">
        </div>
    </div>
</body>
<script src="assets/js/main.js"></script>

</html>