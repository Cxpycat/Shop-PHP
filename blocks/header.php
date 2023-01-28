<?php
if (empty($_COOKIE['favorite_item'])) {
    setcookie('favorite_item', '0');
}
if (empty($_COOKIE['cart_item'])) {
    setcookie('cart_item', '0');
}
if (empty($_COOKIE['cart_item_count'])) {
    setcookie('cart_item_count', '0');
}
if (!empty($_COOKIE['id'])) {
    $_SESSION['User_id'] = $_COOKIE['id'];
}
?>


<head>
    <script src="https://code.jquery.com/jquery-3.5.0.js"></script>

</head>

<div class="header_main">
    <div class="menu_header_list">
        <ul class="header_list">
            <li> <a href="/index.php">ГЛАВНАЯ</a> </li>
            <li> <a href="/shop.php">МАГАЗИН</a> </li>
            <li> <a href="/blog.php  ">БЛОГ</a> </li>
        </ul>
    </div>
    <a href="/index.php"> <img src="img\logo.png" class="header_logo"></a>
    <div class="menu_header_btn">
        <ul class="header_btn">
            <?php 
    if (isset($_COOKIE['user_login_succes']))
    {
        echo '<li class="btn_login_succes"> <a href="" ><div class="btn_login_header" id="btn_login_succes">firstname</div></a>';
    }
    else
    {
    echo '<li><div class="btn_login_header btn_login_header_no_login">ВХОД / РЕГИСТРАЦИЯ</div>';
    }
    ?>



            <div class="sub_menu">
                <ul>
                    <li onclick="document.location='profile.php'">Профиль</li>
                    <li onclick="document.location='logout.php'">Выйти</li>
                </ul>
            </div>
            </li>
            <li>
                <a href="favorite.php">
                    <div class="count favorite_item" data-text="0">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 295.559 295.559"
                            style="enable-background:new 0 0 295.559 295.559;" xml:space="preserve">
                            <path
                                d="M294.626,88.215c-2.388-17.766-9.337-34.209-20.099-47.555c-9.956-12.346-22.871-21.525-36.365-25.844
                    c-10.026-3.201-19.906-4.824-29.374-4.824c-24.577,0-46.313,10.811-62.147,30.678c-17.638-20.154-38.392-30.355-61.812-30.357
                    c-8.839,0-18.06,1.516-27.408,4.502c-13.505,4.32-26.423,13.498-36.382,25.844C10.274,54.004,3.322,70.449,0.934,88.215
                    c-3.858,28.701,4.289,60.008,23.562,90.533c22.278,35.285,59.255,69.889,109.904,102.848c3.989,2.598,8.617,3.971,13.381,3.971
                    c4.764,0,9.392-1.373,13.383-3.973c50.646-32.957,87.623-67.561,109.9-102.848C290.335,148.221,298.482,116.916,294.626,88.215z" />
                        </svg>
                    </div>
                </a>
            </li>
            <li>
                <a href="cart.php">
                    <div class="count cart_item" data-text="0">
                        <svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 60 60"
                            style="enable-background:new 0 0 60 60;" xml:space="preserve">
                            <path d="M11.68,13l-0.833-5h-2.99C7.411,6.28,5.859,5,4,5C1.794,5,0,6.794,0,9s1.794,4,4,4c1.859,0,3.411-1.28,3.858-3h1.294l0.5,3
                    H9.614l5.171,26.016c-2.465,0.188-4.518,2.086-4.76,4.474c-0.142,1.405,0.32,2.812,1.268,3.858C12.242,48.397,13.594,49,15,49h2
                    c0,3.309,2.691,6,6,6s6-2.691,6-6h11c0,3.309,2.691,6,6,6s6-2.691,6-6h4c0.553,0,1-0.447,1-1s-0.447-1-1-1h-4.35
                    c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4h-11.7c-0.826-2.327-3.043-4-5.65-4s-4.824,1.673-5.65,4H15
                    c-0.842,0-1.652-0.362-2.224-0.993c-0.577-0.639-0.848-1.461-0.761-2.316c0.152-1.509,1.546-2.69,3.173-2.69h0.791
                    c0.014,0,0.025,0,0.039,0h38.994C57.763,41,60,38.763,60,36.013V13H11.68z M4,11c-1.103,0-2-0.897-2-2s0.897-2,2-2s2,0.897,2,2
                    S5.103,11,4,11z" />
                        </svg>
                    </div>
                </a>
            </li>
        </ul>
    </div>
</div>




<div class="close_win"></div>

<?php
         echo '<section class="modal modal_auth ';
         if(!empty($_SESSION['login_error'])){
            echo ' '. $_SESSION['login_error'] .' ">';
        }else        {        echo '">';    }
?>
<section class="modal_close_btn"></section>

<div class="auth">
    <h2>Войти</h2>
    <div id="message_wrong_pass">
        <?php 
    if (isset($_COOKIE['message_login']))
    {
        echo $_COOKIE['message_login'];
    }
    ?>
    </div>
    <?php
         if(!empty($_SESSION['login_error'])){
            echo ''. $_SESSION['message_login_error'] .''; 
            unset($_SESSION['login_error']);
        }
        ?>


    <label for="email" class="label_child">Имя пользователя или адрес электронной почты *</label>
    <input type="email" class="input_text" id="email" name="email">

    <label for="password" class="label_child">Пароль *</label>
    <input type="password" class="input_text" id="password" name="password">

    <div class="modal_checkbox_forget">
        <div class="modal_checkbox">
            <label class="login_checkbox">
                <input type="checkbox" value="remember_pass" name="remember_pass" class="visually_hidden">
                <span class="checkbox_indicator"></span>
                <p>Запомните меня</p>
            </label>
        </div>
        <a href="">Забыли пароль?</a>
    </div>

    <button class="btn btn_login" onclick="getUser()">Авторизоваться</button>
    <script src="js\user.js"></script>
    <a href="sign_up.php" class="btn_sign_up">Еще не с нами?</a>
</div>


</section>
<script src="js\header.js"></script>