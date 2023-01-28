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
    <script type="text/javascript" src="js\add_favorite.js"></script>
    <script type="text/javascript" src="js\cart.js"></script>
    <link rel="icon" type="image/png" sizes="32x32" href="img/logo.png">
    <title>Магазин</title>
</head>

<body>
    <?php      require "blocks/header.php";    ?>

    <div class="sign_up_head">
        <span>Магазин</span>
        <div class="head_link">
            <a href="/index.php">Главная</a><span> / </span><a href="">Магазин</a>
        </div>
    </div>

    <div class="shop_div_main">
        <div class="shop_filter">
            <h2>Категории</h2>
            <ul class="shop_filter_categories shop_filter_item">
                <li><input type="checkbox" name="" id="">Категория 1</li>
                <li><input type="checkbox" name="" id="">Категория 2</li>
                <li><input type="checkbox" name="" id="">Категория 3</li>
            </ul>
            <div class="shop_filter_price shop_filter_item">
                <h2>Цена</h2>
                <input type="range" min="0" max="100" step="1" value="50">
                <div class="shop_filter_price_btn_text">
                    Цена: <span>500 ₽</span> - <span>99999 ₽</span>
                </div>
            </div>

            <h2>Популярные теги</h2>
            <div class="shop_filter_tags">
                <a href="" class="btn_tags">Косметика</a>
                <a href="" class="btn_tags">Свежие ягоды</a>
                <a href="" class="btn_tags">Свежие фрукты</a>
                <a href="" class="btn_tags">Подарки</a>
                <a href="" class="btn_tags">Органический Овощи</a>
                <a href="" class="btn_tags">Овсянка</a>
            </div>

        </div>

        <div class="shop_products">
            <div class="wrapper wrapper_products_hot">
                <div class="shop_products_hot slider_container">
                    <div class="slider_track">

                    </div>
                </div>
                <div class="slider_buttons slider_buttons_promo">
                    <button class="btn_prev"></button>
                    <button class="btn_next"></button>
                </div>
            </div>
            <script src="https://code.jquery.com/jquery-3.2.0.min.js"
                integrity="sha256-JAW99MJVpJBGcbzEuXk4Az05s/XyDdBomFqNlM3ic+I=" crossorigin="anonymous"></script>
            <script src="js\products_promo.js"></script>

            <div class="shop_products_list">

                <div class="shop_products_list_menu">
                    <p id="shop_products_list_menu">Показано 1–12 из 66 результатов</p>

                    <div class="shop_products_list_menu_count">
                        <p>Показать</p>
                        <select class="btn_tags" id="count_pages">
                            <option value="5" selected>5 товаров</option>
                            <option value="10">10 товаров</option>
                            <option value="15">20 товаров</option>
                            <option value="999999999">Все товары</option>
                        </select>
                    </div>

                    <div class="shop_products_list_menu_sort">
                        <p>Сортировка</p>
                        <a href="" class="btn_tags">По полярности</a>
                    </div>

                </div>

            </div>
            <div class="alet_delete_product">
                Вы хотите удалить товар из карзины
                <div style="display: flex; flex-direction: row; justify-content: space-around; margin:10px">
                    <button type="button" class="btn_alert_product" id="btn_no_product">Нет</button>
                    <button type="button" class="btn_alert btn_alert_product" id="btn_yes_product">Да</button>
                </div>
            </div>
            <div class="list_products">

            </div>


            <div class="btns_page" onload="get_products_all()">

            </div>
            <script src="js\products.js"></script>
            <script>

            </script>
        </div>
</body>

</html>