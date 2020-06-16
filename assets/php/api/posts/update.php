<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: PUT");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $item = new Post($db);

    $data = json_decode(file_get_contents("php://input"));
    
    $item->id = $data->id;
    $item->title = $data->title;
    $item->categories = $data->categories;
    $item->body = $data->body;
    $item->updated_at = date('Y-m-d H:i:s');
    $item->created_at = date('Y-m-d H:i:s');
    
    try {
        $item->updatePost();
        $arr = array(
            "success" => true,
            "body" => [],
            "message" => "Post updated."
        );
        echo json_encode($arr);
    } catch (Exception $e) {
        http_response_code(200);
        $arr = array(
            "success" => true,
            "body" => [],
            "message" => "Post couldn't be updated."
        );
        echo json_encode($arr);
    }
