<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: *, Authorization');
header('Access-Control-Allow-Methods: *');
header('Access-Control-Allow-Credentials: true');
header('Content-type:json/application');
require 'sql.php';
require 'clases\_blogs.php';
require 'clases\_products.php';
require 'clases\_users.php';
require 'clases\_cart.php';
$method =$_SERVER['REQUEST_METHOD'];



$q_tp =$_GET['q'];
$q= substr($q_tp, 12);
$params = explode('/', $q);

$type =$params[0];
if(isset($params[1])){
    if(is_numeric($params[1])){
    $id=$params[1];
    }
    else{
        $tag= $params[1];
    }
}

$blogs= new _blogs();
$products = new _products();
$users = new _users();
$cart = new _cart();


if($type === 'blogs'){
    switch ($method) {
        case 'GET':
                if(isset($id)){
                    $blogs->get_blog($conn,$id);
                }else{
                    $blogs->get_blogs($conn);
                } 
            
            break;
        case 'POST':
            $blogs->add_post($conn,$_POST);
            break;
        case 'PATCH':
            
                if(isset($id)){
                    
                    $data = file_get_contents('php://input');
                    $data = json_decode($data, true);
                    $blogs->edit_post($conn,$id, $data);                
                }
            
            break;
        case 'DELETE':
        
                if(isset($id)){
                        $blogs->delete_post($conn,$id);
                        
                    }
                
            break;
    }
}

if($type === 'products'){
    switch ($method) {
        case 'GET':           
                if(isset($id))
                {
                    $products->get_product_by_id($conn,$id);
                }                
                elseif(isset($tag) && $tag == 'promo')
                {
                    $products->get_product_by_promo($conn);
                }
                elseif(isset($tag))
                {
                    $products->get_product_by_tag($conn,$tag);
                }
                else
                {
                    $products->get_products($conn);
            
                }   
            break;
        case 'POST':
            $products->add_product($conn,$_POST);
            break;
        case 'PATCH':           
                if(isset($id)){                    
                    $data = file_get_contents('php://input');
                    $data = json_decode($data, true);
                    $products->edit_product($conn, $id, $data);                
                }          
            break;
        case 'DELETE':        
                if(isset($id)){
                        $products->delete_product($conn,$id);                        
                    }                
            break;
    }
}

if($type === 'users'){
    switch ($method) {
        case 'GET':
            if(isset($id)){
                $users->get_user($conn,$id);
            }else{
                $users->get_users($conn);
            } 
            break;
        case 'POST':
            $users->add_user($conn,$_POST);
            break;
        case 'PATCH':           
            if(isset($id)){                    
                $data = file_get_contents('php://input');
                $data = json_decode($data, true);
                $users->edit_user($conn, $id, $data);                
            }          
        break;
}}

if($type === 'products_cart_by_user'){
    switch ($method) {
        case 'GET':           
                if(isset($id))
                {
                    $cart->get_product_by_id($conn,$id);
                }                
                else
                {
                    $cart->get_products($conn);
                }   
            break;
        case 'POST':
            $cart->add_product_to_cart($conn,$_POST);
            break;
        case 'PATCH':                           
                    $data = file_get_contents('php://input');
                    $data = json_decode($data, true);
                    $cart->edit_product_cart($conn, $data);               
            break;
        case 'DELETE':  
            if(isset($id)){
                $cart->delete_product_cart($conn,$id);                        
            }           
            break;
    }
}