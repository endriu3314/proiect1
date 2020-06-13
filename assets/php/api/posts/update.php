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
    $item->category_id = $data->category_id;
    $item->body = $data->body;
    $item->updated_at = date('Y-m-d H:i:s');
    $item->created_at = date('Y-m-d H:i:s');
    
    try {
        $item->updatePost();
        echo("Post updated.");
    } catch (Exception $e) {
        echo("Post couldn't be updated.");
        //echo ($e->getMessage());
    }
