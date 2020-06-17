<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../config/dbconn.php';
    include_once '../../class/categories.php';

    $database = new DB();
    $db = $database->db;

    $item = new Category($db);
    
    $data = json_decode(file_get_contents("php://input"));
    //var_dump($data);
    $item->id = $data->id;

    try {
        echo $item->getCategory();
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => false,
            "body" => [],
            "message" => $e->getMessage()
        );
        echo json_encode($arr);
    }
