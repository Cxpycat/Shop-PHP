<?

class _blogs{

public function get_blogs($conn){
    $blogs = mysqli_query($conn, "SELECT * FROM blogs");

    $blogs_list=[];
    
    while($blog= mysqli_fetch_assoc($blogs)){
        $blogs_list[]=$blog;
    }
    
    echo json_encode($blogs_list);
} 

public function get_blog($conn, $id){
    $blog = mysqli_query($conn, "SELECT * FROM blogs WHERE id ='$id'");


    if(mysqli_num_rows($blog) ==0){
    http_response_code(404);

    $res = [
        "status"=> false,
        "message" => "Blog not found"            
    ];
    echo json_encode($res);
    }else{
    $blog =mysqli_fetch_assoc($blog);
    
    echo json_encode($blog);
    }
}

public function add_post($conn, $data){
    $name=$data['name'];
    $text=$data['text'];
    $opinion=$data['opinion'];
    $img=$data['img'];
    $topic=$data['topic'];
    $date=$data['date'];
    $creator=$data['creator'];
    $tags=$data['tags'];

    mysqli_query($conn, "INSERT INTO `blogs`(`name`, `text`, `opinion`, `img`, `topic`, `date`, `creator`, `tags`) 
    VALUES ('$name','$text','$opinion','$img','$topic','$date','$creator','$tags')");


    http_response_code(201);
    $res = [
        "status"=> true,
        "post_id" => mysqli_insert_id($conn)            
    ];


    echo json_encode($res);
}

public function edit_post($conn, $id, $data){
    $name=$data['name'];
    $text=$data['text'];
    $opinion=$data['opinion'];
    $img=$data['img'];
    $topic=$data['topic'];
    $date=$data['date'];
    $creator=$data['creator'];
    $tags=$data['tags'];

    mysqli_query($conn,"UPDATE `blog_test` SET `name` = '$name', `text` = '$text', `opinion` = '$opinion',
     `img` = '$img', `topic` = '$topic', `date` = '$date', `creator` = '$creator', `tags` = '$tags' WHERE `blog_test`.`id` = $id");

    http_response_code(200);
    $res = [
        "status"=> true,
        "post_id" => "Blog is updated"            
    ];

    echo json_encode($res);
}

public function delete_post($conn, $id){
 mysqli_query($conn, "DELETE FROM `blogs` WHERE `blogs`.`id` = $id");
 http_response_code(200);
 $res = [
     "status"=> true,
     "post_id" => "Blog is deleted"            
 ];

 echo json_encode($res);
}

}

?>