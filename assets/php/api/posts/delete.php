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
        echo("Post deleted.");
    } catch (Exception $e) {
        echo("Post couldn't be deleted.");
        //echo ($e->getMessage());
    }
