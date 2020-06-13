<?php
    header("Access-Control-Allow-Origin: *");
    header("Content-Type: application/json; charset=UTF-8");
    
    include_once '../../config/dbconn.php';
    include_once '../../class/posts.php';

    $database = new DB();
    $db = $database->db;

    $items = new Post($db);

    $stmt = $items->getPosts();
    $count = $stmt->rowCount();

    if ($count > 0) {
        $postArr = array();
        $postArr["body"] = array();
        $postArr["count"] = $count;

        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            extract($row);
            $arr = array(
                "id" => $id,
                "title" => $title,
                "category_id" => $category_id,
                "body" => $body,
                "updated_at" => $updated_at,
                "created_at" => $created_at
            );

            array_push($postArr["body"], $arr);
        }
        echo json_encode($postArr);
    } else {
        http_response_code(404);
        echo json_encode(
            array("message" => "No record found.")
        );
    }
