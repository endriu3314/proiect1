<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    header("Access-Control-Allow-Methods: POST");
    header("Access-Control-Max-Age: 3600");
    header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $item = new Post($db);

    $item->id = $_GET['id'];
  
    $item->getPost();

    if ($item->id != null) {
        $arr = array(
            "id" => $item->id,
            "title" => $item->title,
            "category_id" => $item->category_id,
            "body" => $item->body,
            "updated_at" => $item->updated_at,
            "created_at" => $item->created_at
        );
      
        echo json_encode($arr);
    } else {
        http_response_code(404);
        echo json_encode("Post not found.");
    }
