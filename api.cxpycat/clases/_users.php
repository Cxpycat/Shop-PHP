<?

class _users{

public function get_users($conn){
    $users = mysqli_query($conn, "SELECT * FROM user");

    $users_list=[];
    
    while($user= mysqli_fetch_assoc($users)){
        $users_list[]=$user;
    }
    
    echo json_encode($users_list);
}

public function get_user($conn, $id){
    $user = mysqli_query($conn, "SELECT * FROM user WHERE id ='$id'");


    if(mysqli_num_rows($user) ==0){
    http_response_code(404);

    $res = [
        "status"=> false,
        "message" => "user not found"            
    ];
    echo json_encode($res);
    }else{
    $user =mysqli_fetch_assoc($user);
    
    echo json_encode($user);
    }
}

public function add_user($conn, $data){
    $email =$data['email_nu'];
    $password = $data['password_nu'];
    $password2 = $data['password2_nu'];
    $FIO = $data['FIO_nu'];
    $phone = $data['phone_nu'];

    $check_sql_data_user = "SELECT * FROM user";
   
  if(strcmp($password2, $password) !== 0) {
        http_response_code(200);
        $res = [
            "status"=> "error",
            "error" => "wrong pass"         
        ];
        header('Location:/sign_up.php');
        echo json_encode($res);
        exit();
    }

    $check_email = mysqli_query($conn,"SELECT * FROM user WHERE `email` ='$email'");
    if(mysqli_num_rows($check_email) >= 1){
        $res=[
            "status"=> "error",
            "error" => "wrong email"    
        ];
        echo json_encode($res);
        exit();
    }

    $check_phone = mysqli_query($conn,"SELECT * FROM user WHERE `phone` ='$phone'");
    if(mysqli_num_rows($check_phone) >= 1){
        $res=[
            "status"=> "error",
            "error" => "wrong phone"    
        ];
        echo json_encode($res);
        exit();
    }
   
    $FIO_tmp = explode(" ", $FIO);
    $lastname = $FIO_tmp[0];
    $firstname = $FIO_tmp[1];

    $password =md5($password);
    mysqli_query($conn,"INSERT INTO user (`email`, `password`, `lastname`, `firstname`, `phone`)
    VALUES ('$email','$password','$lastname','$firstname', '$phone')");


    http_response_code(201);
    $res = [
        "status"=> true,
        "user_id" => mysqli_insert_id($conn),
        "user_name" => $FIO   
    ];


    echo json_encode($res);
}

public function edit_user($conn, $id, $data){
    $first_name=$data['first_name'];
    $last_name=$data['last_name'];
    $email=$data['email'];
    $phone=$data['phone'];
    $temp_img=$data['img'];  
    $img=str_replace('C:\\fakepath', 'img/avatars/',$temp_img );

    $sql="UPDATE `user` SET `email`='$email',`lastname`='$last_name',`firstname`='$first_name',`phone`='$phone',`img`='$img' WHERE id='$id'";

    if ($data['password'] != "") {
        $password=$data['password'];
        $sql="UPDATE `user` SET `email`='$email',`lastname`='$last_name',`firstname`='$first_name',`phone`='$phone',`password`='$password',`img`='$img' WHERE id='$id'";
    }

    mysqli_query($conn,$sql);

    http_response_code(202);
    $res = [
        "status"=> true,
        "user_id" => "user is updated"            
    ];

    echo json_encode($res);
}

}