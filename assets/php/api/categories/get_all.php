<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../config/dbconn.php';
    include_once '../../class/categories.php';

    $database = new DB();
    $db = $database->db;

    $items = new Category($db);

    try {
        echo $items->getCategories();
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => false,
            "body" => [],
            "message" => $e->getMessage()
        );
        echo json_encode($arr);
    }
