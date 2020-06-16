<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/dbconn.php';
    include_once '../../class/categories.php';

    $database = new DB();
    $db = $database->db;

    $item = new Category($db);

    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    $item->name = $data->name;
    $item->updated_at = date('Y-m-d H:i:s');
    $item->created_at = date('Y-m-d H:i:s');
    
    try {
        $item->updateCategory();
        $arr = array(
            "success" => true,
            "body" => [],
            "message" => "Category updated."
        );
        echo json_encode($arr);
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => false,
            "body" => [],
            "message" => "Category couldn't be updated."
        );
        echo json_encode($arr);
    }
