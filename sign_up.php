<?php
session_start();
include 'logic\classes\sql.php';
unset($_COOKIE['message_sign_up']);
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
    <title>Регистрация</title>
</head>

<body>
    <?php      require "blocks/header.php";    ?>

    <div class="sign_up_head">
        <span>Регистрация</span>
        <div class="head_link">
            <a href="/index.php">Главная</a><span> / </span><a href="">Регистрация</a>
        </div>
    </div>

    <div class="sign_up_form">
        <?php
                    if(!empty($_COOKIE['message_sign_up_error'])){
                        echo ''. $_COOKIE['message_sign_up_error'] .'';
                    }
                    unset($_COOKIE['message_sign_up_error']);
            ?>


        <div class="sign_up_item">
            <label for="email_nu">Адрес электронной почты *</label>
            <input type="email" class="input_text" name="email_nu" id="email_nu">
        </div>

        <div class="sign_up_item">
            <label for="password_nu">Пароль *</label>
            <input type="password" class="input_text" name="password_nu" id="password_nu">
        </div>

        <div class="sign_up_item">
            <label for="password2_nu">Повторите пароль *</label>
            <input type="password" class="input_text" name="password2_nu" id="password2_nu">
        </div>
        <div class="sign_up_item">
            <label for="FIO_">ФИО *</label>
            <input type="text" class="input_text" name="FIO_" id="FIO_nu">
        </div>

        <div class="sign_up_item">
            <label for="phone_nu">Номер телефона *</label>
            <input type="text" class="input_text" name="phone_nu" id="phone_nu">
        </div>

        <button class="btn" onclick="addUser()">Зарегистрироваться</button>

    </div>
    <script src="js\user.js"></script>

    <?php      require "blocks/footer.php";    ?>
</body>

</html>