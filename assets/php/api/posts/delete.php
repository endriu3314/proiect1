<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: DELETE");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $item = new Post($db);

    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    
    try {
        $item->deletePost();
        $arr = array(
            "success" => true,
            "body" => [],
            "message" => "Post deleted."
        );
        echo json_encode($arr);
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => true,
            "body" => [],
            "message" => "Post couldn't be deleted."
        );
        echo json_encode($arr);
    }
