<?php
  session_start();
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="X-UA-Compatible" content="ie=edge">
    <link href='https://fonts.googleapis.com/css?family=Cairo' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="icon" type="image/png" sizes="32x32" href="img/logo.png">
    <title>Магазин</title>
</head>

<body>
    <?php      require "blocks/header.php";    ?>
    <div class="alet_delete_product">
        Вы хотите удалить товар из карзины
        <div style="display: flex; flex-direction: row; justify-content: space-around; margin:10px">
            <button type="button" class="btn_alert_product" id="btn_no_product">Нет</button>
            <button type="button" class="btn_alert btn_alert_product" id="btn_yes_product">Да</button>
        </div>
    </div>
    <div class="shop_item_insert">


    </div>



    <div class="wrapper">
        <div class="main_product slider_container">
            <div class="slider_track product_more_item">
            </div>
        </div>
        <div class="slider_buttons slider_buttons_main">
            <button class="btn_prev"></button>
            <button class="btn_next"></button>
        </div>
        <script src="js\add_favorite.js"></script>
        <script src="https://code.jquery.com/jquery-3.2.0.min.js"
            integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I=" crossorigin="anonymous"></script>
        <script src="js\product_item.js"></script>
        <script>

        </script>
    </div>
    </div>

    <?php      require "blocks/footer.php";    ?>
</body>