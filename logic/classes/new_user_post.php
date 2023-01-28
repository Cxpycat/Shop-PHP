<?php
class new_user_post{

     public $email;  
     public $password;    
     public $password2;
     public $FIO;
     public $phone;

public function __construct($email, $password, $password2, $FIO, $phone)
{
    $this->email=$email;
    $this->password=$password;
    $this->password2=$password2;
    $this->FIO=$FIO;
    $this->phone=$phone;
}


public function data_user_check(){
    include 'sql.php'; 
    $error_check;
    $check_sql_data_user = "SELECT * FROM user";
    $check_sign_up = mysqli_query($conn, $check_sql_data_user);
   
    while ($row= mysqli_fetch_assoc($check_sign_up)){    
    $max_for=$row['id'];
    $email_check[$row['id']] = $row['email'];
    $phone_check[$row['id']] = $row['phone'];
  }
  if(strcmp($this->password2, $this->password) !== 0) {
        $_SESSION['message_sign_up_error'] = '<p class="alert_danger alert_danger_p">
        Пароли не совпадают</p>';
        $error_check=1;
        header('Location:/sign_up.php');
        exit();
    }
   for($i=0; $i <= $max_for; $i++){
   if ($email_check[$i]==$this->email) {
        $_SESSION['message_sign_up_error'] = '<p class="alert_danger alert_danger_p">
        Пользователь с таким email уже существует </p> ';
        $error_check=1;
        header('Location:/sign_up.php');
        exit();
    }
}
    for($i=0; $i <= $max_for; $i++){
    if($phone_check[$i]==$this->phone){
        $_SESSION['message_sign_up_error'] = '<p class="alert_danger alert_danger_p">
        Пользователь с таким номером телефона уже существует</p>';
        $error_check=1;
        header('Location:/sign_up.php');
        exit();
    }
}
    return ($error_check);

}


public function data_user_post(){

    $sesia= $this->data_user_check();

    if($this->data_user_check==1){
        header('Location:/sign_up.php');
        exit();
    }
    include 'sql.php'; 
    $this->password =md5($this->password."cxpycat");
    $sql="INSERT INTO user (email, password, lastname, firstname,  phone) VALUES ('$this->email','$this->password','$this->FIO','$this->FIO', '$this->phone')";
    $nameuser = $this->FIO;
    if (mysqli_query($conn, $sql)) {
    $_SESSION['message_sign_up'] = 'Вы успешно зарегистрировались '."$nameuser" .'';
    $_SESSION['sign_up_succes'] = 'modal_show';
    header('Location:/');
    exit();
    } 
    else{
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
    }
}
}
?>