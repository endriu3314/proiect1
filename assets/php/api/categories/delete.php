<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/dbconn.php';
    include_once '../../class/categories.php';

    $database = new DB();
    $db = $database->db;

    $item = new Category($db);

    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    
    try{
        $item->deleteCategory();
        echo ("Category deleted.");
    }
    catch (Exception $e){
        echo ("Category couldn't be deleted.");
        //echo ($e->getMessage());
    }
?>