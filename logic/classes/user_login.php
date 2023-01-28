<?php
class user_login{

    public $email;  
    public $password;

    public function __construct($email, $password){
        $this->email=$email;
        $this->password=$password;
    }

public function user_login_check(){
    include 'sql.php';
    $this->password =md5($this->password."cxpycat");
    $sql = "SELECT * FROM user WHERE email='$this->email' AND password ='$this->password'";
    $check_user = mysqli_query($conn, $sql);

    if(mysqli_num_rows($check_user)>0){
        $user_data=mysqli_fetch_assoc($check_user);
        $_SESSION['user_login_succes'] =[
            "id" => $user_data['id'],
            "lastname" => $user_data['lastname'],
            "firstname" => $user_data['firstname'],
            "patronymic" => $user_data['patronymic'],
            "phone" => $user_data['phone']       
        ];
        $nameuser = $_SESSION['user_login_succes']['lastname'];
        $_SESSION['login_succes']='modal_show';
        $_SESSION['message_login']='Добро пожаловать '."$nameuser" .'';
        header('Location:/');
    }else {
        $_SESSION['login_error']='modal_show';
        $_SESSION['message_login_error'] = '<p class="alert_danger alert_danger_p">Неправильный логин или пароль</p>';
        header('Location:/');
  }
}
    
}