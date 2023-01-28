<!DOCTYPE html>
<html lang="en">
<?php
function rng(){
$rand = array('0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f');
$color = '#'.$rand[mt_rand(0,15)].$rand[mt_rand(0,15)].$rand[mt_rand(0,15)].$rand[mt_rand(0,15)].$rand[mt_rand(0,15)].$rand[mt_rand(0,15)];
return $color;
}
?>

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Мини портфолио</title>
    <link rel="stylesheet" href="selector.css">
</head>

<body>
    <div class="main">
        <?php
                
                    echo "<p style='color: ".rng().";'>Мои работы</p>";
               
        ?>
        <div class="chose">
            <ul>
                <?php
                for ($i=1; $i < 6; $i++) { 
                    echo "<a href='".$i."/".$i.".html'><li style='color: ".rng().";'>".$i."</li></a>";
                }
                ?>
            </ul>
        </div>
    </div>
</body>

</html>