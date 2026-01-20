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
            <a href="level-3.php" class="level extra"></a>
            <a href="level-2.php" class="level extra"></a>
            <a href="level-1.php" class="level main"></a>
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