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
    <link href='https://fonts.googleapis.com/css?family=Cairo' rel='stylesheet'>
    <link href='https://fonts.googleapis.com/css?family=Playfair Display' rel='stylesheet'>
    <link rel="stylesheet" href="/css/main.css">
    <link rel="icon" type="image/png" sizes="32x32" href="img/logo.png">
    <title>Главная</title>
</head>

<body>
    <?php      require "blocks/header.php";    ?>

    <div class="sign_up_head">
        <span>Сообщение блога</span>
        <div class="head_link">
            <a href="/index.php">Главная</a><span> / </span><a href="/blog.php">Блог</a><span> / </span><a
                href="">Поможет ли подсчет калорий достичь желаемого веса?</a>
        </div>
    </div>

    <div class="blog_div_main">

        <div class="blog_filter">
            <div class="blog_filter_search">
                <input type="text" class="input_text" placeholder="Найти">
            </div>

            <h2>Категории</h2>
            <ul class="blog_filter_category shop_filter_item">
                <li>
                    <div class="blog_filter_category_item">
                        <a href="">Косметика</a>
                        <p>(4)</p>
                    </div>
                </li>

                <li>
                    <div class="blog_filter_category_item">
                        <a href="">Лекарственное средство</a>
                        <p>(5)</p>
                    </div>
                </li>

                <li>
                    <div class="blog_filter_category_item">
                        <a href="">Органический</a>
                        <p>(11)</p>
                    </div>
                </li>
            </ul>

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


        <div class="blog_item">
            <div class="blog_item_insert"></div>
            <script src="js\blog_item.js"></script>




        </div>

    </div>
    <?php      require "blocks/footer.php";    ?>
</body>

</html>