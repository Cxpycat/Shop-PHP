<?php
  session_start();
  if (isset($_COOKIE['user_login_succes'])) {  
  }else{
    header('Location:index.php');
  }
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
            <a href="/index.php">Главная</a><span> / </span><a href="profile.php">Профиль</a><span> / </span><a
                href="">Детали учетной записи</a>
        </div>
    </div>

    <div class="profile_wrapper">
        <div class="profile_side_bar">
            <ul>
                <li>Детали учетной записи</li>
                <li onclick="document.location='logout.php'">Выйти</li>
            </ul>
        </div>

        <div class="profile_main_window">
            <?php      require "blocks/profile_main.php";    ?>
        </div>
    </div>
    <?php      require "blocks/footer.php";    ?>
</body>

</html>