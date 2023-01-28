<?php
  session_start();
  include 'classes\sql.php';
  include 'classes\user_login.php';
  $email =$_POST['email'];
  $password = $_POST['password'];
  
$new_user =new user_login($email, $password);
$new_user->user_login_check();

?>