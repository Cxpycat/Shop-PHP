<?

class _products{

public function get_products($conn){
    $products = mysqli_query($conn,"SELECT * FROM products");

    $products_list=[];

    while ($product=mysqli_fetch_assoc($products)) {
        $products_list[]=$product;
    }

    echo json_encode($products_list);
}

public function get_product_by_id($conn, $id){
    $product = mysqli_query($conn,"SELECT * FROM products WHERE `id` ='$id'");


    if(mysqli_num_rows($product)== 0){
        http_response_code(404);

    $rex=[
        "status" => false,
        "message" => "Product not fount"
    ];

    echo json_encode($rex);
    } else{
    $product = mysqli_fetch_assoc($product);

    echo json_encode($product);
    }


}

public function get_product_by_promo($conn){
    $products_list=[];
    $full_product= mysqli_query($conn,"SELECT * FROM products");
    while ($row = mysqli_fetch_assoc($full_product)) {
        $id[]=$row['id'];
        $max_id=$row['id'];
    }
    for ($i=0; $i < $max_id; $i++) { 
        if ($i%2==0 && in_array($i, $id)) {
            $products = mysqli_query($conn,"SELECT * FROM products WHERE `id` ='$i'");
            while ($product=mysqli_fetch_assoc($products)) {
                $products_list[]=$product;
            }
        }
    }
 
        if(mysqli_num_rows($products)== 0){
            http_response_code(404);
    
        $res=[
            "status" => false,
            "message" => "Product not fount"
        ];
    
        echo json_encode($res);
        } else{
            
        echo json_encode($products_list);
        }

   
}

public function get_product_by_tag($conn, $tag){
    $products = mysqli_query($conn,"SELECT * FROM products WHERE `category` ='$tag'");


    if(mysqli_num_rows($products)== 0){
        http_response_code(404);

    $res=[
        "status" => false,
        "message" => "Products not fount"
    ];

    echo json_encode($res);
    } else{
        $products_list=[];

        while ($product=mysqli_fetch_assoc($products)) {
            $products_list[]=$product;
        }

    echo json_encode($products_list);
    }


}


public function add_product($conn, $data){
    $name=$data['name'];
    $category=$data['category'];
    $text=$data['text'];
    $img=$data['img'];
    $price_sale=$data['price_sale'];
    $price=$data['price'];

    mysqli_query($conn, "INSERT INTO `products`(`name`, `category`, `text`, `price`, `price_sale`, `img`) 
    VALUES ('$name','$category','$text','$img','$price_sale','$price')");


    http_response_code(201);
    $res = [
        "status"=> true,
        "post_id" => mysqli_insert_id($conn)            
    ];


    echo json_encode($res);
}

public function edit_product($conn, $id, $data){
    $name=$data['name'];
    $category=$data['category'];
    $text=$data['text'];
    $img=$data['img'];
    $price_sale=$data['price_sale'];
    $price=$data['price'];

    mysqli_query($conn,"UPDATE `products` SET `name`='$name',`category`='$category',`text`='$text',
    `price`='$price',`price_sale`='$price_sale',`img`='$img' WHERE `id`='$id'");

    http_response_code(200);
    $res = [
        "status"=> true,
        "post_id" => "Product is updated"            
    ];

    echo json_encode($res);
}

public function delete_product($conn, $id){
 mysqli_query($conn, "DELETE FROM `products` WHERE `products`.`id` = $id");
 http_response_code(200);
 $res = [
     "status"=> true,
     "post_id" => "Product is deleted"            
 ];

 echo json_encode($res);
}

}

?>