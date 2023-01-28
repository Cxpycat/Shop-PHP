<?php
  session_start();
  include 'classes\sql.php';
  include 'classes\new_user_post.php';
  $email =$_POST['email'];
  $password = $_POST['password'];
  $password2 = $_POST['password2'];
  $FIO = $_POST['FIO'];
  $phone = $_POST['phone'];

$new_user =new new_user_post($email, $password, $password2, $FIO, $phone);
$new_user->data_user_post();

?>