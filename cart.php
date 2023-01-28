<?php
  session_start();

?>
<!DOCTYPE html>
<html lang="ru" dir="ltr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <meta name="X-UA-Compatible" content="ie=edge">
    <link href='https://fonts.googleapis.com/css?family=Cairo' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'>
    <link rel="stylesheet" href="/css/main.css">
    <script type="text/javascript" src="js\products_favorite.js"></script>
    <script type="text/javascript" src="js\add_favorite.js"></script>
    <link rel="icon" type="image/png" sizes="32x32" href="img/logo.png">
    <title>Главная</title>
</head>

<body>
    <?php      require "blocks/header.php";    ?>
    <main>
        <div class="sign_up_head">
            <span>Корзина</span>
            <div class="head_link">
                <a href="/index.php">Главная</a><span> / </span><a href="">Избранное</a>
            </div>
        </div>
        <div class="alet_delete_product">
            Вы хотите удалить товар из карзины
            <div style="display: flex; flex-direction: row; justify-content: space-around; margin:10px">
                <button type="button" class="btn_alert_product" id="btn_no_product">Нет</button>
                <button type="button" class="btn_alert btn_alert_product" id="btn_yes_product">Да</button>
            </div>
        </div>
        <div class="cart_list">
            <span class="name_cart">НАИМЕНОВАНИЕ ТОВАРА</span>
            <span class="price_cart">ЦЕНА ЗА ЕДИНИЦУ ТОВАРА</span>
        </div>
        <div class="list_item">
            <script src="js\cart.js"></script>
            <script src=""></script>
        </div>
    </main>
    <?php      require "blocks/footer.php";    ?>
</body>

</html>