<?php
$conn = mysqli_connect("localhost", "nikoto_biolife", "O7aV*qNj", "nikoto_biolife");
$id_from_cookie = $_COOKIE['id'];
$get_user_data= mysqli_query($conn,"SELECT * FROM `user` WHERE id='$id_from_cookie'");
while($row=mysqli_fetch_assoc($get_user_data)){
    $id = $row['id'];
    $email = $row['email'];
    $lastname = $row['lastname'];
    $firstname = $row['firstname'];
    $phone = $row['phone'];
    $img = $row['img'];
}
?>
<form action="add_img_profile.php" method="post" enctype="multipart/form-data" class="form_wrapper_profile">

    <div class="wrapper_img">

        <img src="<?php echo $img?>" alt="" class="profile_img preview" id="img_change_profile">
        <div class="btns_wrapper">
            <div class="img_file_upload">
                <label>
                    <input type="file" name="_img" id="_img">
                    <span>Выбрать файл</span>
                </label>
            </div>

            <div class="save_img_wrapper">
                <input type="text" id="filename" class="filename" multiple="multiple" accept=".txt,image/*">
                <a href="#" class="upload_files button">Сохранить</a>
                <div class="ajax-reply"></div>
            </div>
        </div>
    </div>
    <script>
    $(document).ready(function() {
        $(".img_file_upload input[type=file]").change(function() {
            var filename = $(this).val().replace(/.*\\/, "");
            $("#filename").val(filename);
            var file = this.files; //Files[0] = 1st file
            if (file[0]) $(".preview").attr("src", URL.createObjectURL(file[0]));
            if (file[0]) $(".preview").attr("value", URL.createObjectURL(file[0]));
        });
    });
    </script>


    <script>
    var files; // переменная. будет содержать данные файлов

    // заполняем переменную данными, при изменении значения поля file 
    $('input[type=file]').on('change', function() {
        files = this.files;
    });
    </script>

    </div>
    <div class="profile_edit">
        <div class="firs_last_name">
            <div class="_first_name">
                <label for="_first_name">Имя *</label>
                <input type="text" class="input_text" id="_first_name" name="_first_name" value="<?php           
                echo $firstname;
                ?>">
            </div>
            <div class="_last_name">
                <label for="last_name">Фамилия *</label>
                <input type="text" class="input_text" id="_last_name" name="_last_name" value="<?php echo $lastname?>">
            </div>
        </div>

        <label for="_email">Адрес электронной почты *</label>
        <input type="email" class="input_text" id="_email" name="_email" value="<?php echo $email?>">
        <label for="_phone">Номер телефона *</label>
        <input type="text" class="input_text" id="_phone" name="_phone" value="<?php echo $phone?>">


        <div class="edit_pas">
            <h3>Изменение пароля</h3>
            <div class="old_pas">
                <label for="_current_pas">Текущий пароль</label>
                <input type="password" class="input_text" id="_current_pas" name="_current_pas">
            </div>
            <div class="new_pas">
                <label for="_password">Новый пароль</label>
                <input type="password" class="input_text" id="_password" name="_password">
                <label for="_password2">Подтвердите новый пароль</label>
                <input type="password" class="input_text" id="_password2" name="_password2">
            </div>
        </div>

        <button type="button" class="btn" onclick="updateUser(<?php echo $id?>)">
            Изменить
            сохранения </button>

    </div>
</form>

<script src="http://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="js\jQ_img.js"></script>
<script src="js\user.js"></script>