<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");

    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $item = new Post($db);

    $data = json_decode(file_get_contents("php://input"));
    $item->id = $data->id;

    try {
        echo $item->getPost();
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => false,
            "body" => [],
            "message" => $e->getMessage()
        );
        echo json_encode($arr);
    }
