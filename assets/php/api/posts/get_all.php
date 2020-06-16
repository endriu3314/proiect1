<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $items = new Post($db);

    try {
        echo $items->getPosts();
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => false,
            "body" => [],
            "message" => "There was an error while retrieving posts."
        );
        echo json_encode($arr);
    }
