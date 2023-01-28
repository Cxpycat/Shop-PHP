<?php

if (!empty($_FILES['_img'])) {
    
    $file = $_FILES['_img'];
    $name = $file['name'];
    $path_file = $_SERVER['DOCUMENT_ROOT'].'\img\avatars\\'.$name;
    header('Location: profile.php');
    if (!move_uploaded_file($file['tmp_name'],$path_file)) {
    echo 'gg';
   }
}

?>