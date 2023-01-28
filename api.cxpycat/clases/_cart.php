<?

class _cart{

public function get_products($conn){
    $cart = mysqli_query($conn, "SELECT * FROM cart");

    $cart_list=[];
    
    while($user= mysqli_fetch_assoc($cart)){
        $cart_list[]=$user;
    }
    
    echo json_encode($cart_list);
}

public function get_product_by_id($conn, $id){
    $cart_user = mysqli_query($conn, "SELECT * FROM cart WHERE `id_user` = '$id'");

    if(mysqli_num_rows($cart_user)== 0){
        http_response_code(404);

    $res=[
        "status" => false,
        "message" => "cart is empty"
    ];

    echo json_encode($res);
    } else{
    $cart_list=[];
    while($product= mysqli_fetch_assoc($cart_user)){
        $cart_list[]=$product;
    }
    echo json_encode($cart_list);}
}


public function add_product_to_cart($conn, $data){
    
    $id_product=$data['id_product_cart'];
    $id_user=$data['id_user_cart'];
    $count=$data['count_cart'];

    $cart_check = mysqli_query($conn, "SELECT * FROM cart WHERE `id_user` = '$id_user' AND `id_product` = '$id_product'");

    if(mysqli_num_rows($cart_check) != 0){
        http_response_code(200);

    $res=[
        "status" => false,
        "message" => "cart already set"
    ];

    echo json_encode($res);
    } else{

    mysqli_query($conn, "INSERT INTO `cart`(`id_product`, `id_user`, `count`) 
    VALUES ('$id_product','$id_user','$count')");


    http_response_code(201);
    $res = [
        "status"=> true,
        "post_id" => mysqli_insert_id($conn)            
    ];


    echo json_encode($res);}
}

public function edit_product_cart($conn, $data){
    $id=$data['id'];
    $count=$data['count_cart'];

    mysqli_query($conn,"UPDATE `cart` SET `count`='$count' WHERE `id` = '$id'");

    http_response_code(200);
    $res = [
        "status"=> true,
        "post_id" => "Product is updated"            
    ];

    echo json_encode($res);
}

public function delete_product_cart($conn, $id){
    mysqli_query($conn, "DELETE FROM `cart` WHERE `id` = '$id' ");
    http_response_code(200);
    $res = [
        "status"=> true,
        "post_id" => "Product is deleted"            
    ];
   
    echo json_encode($res);
   }

}