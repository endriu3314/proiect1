<?php
    class Post
    {
        private $db_table="posts";
        private $relation_table="post_has_category";

        public $id;
        public $title;
        public $body;
        public $updated_at;
        public $created_at;

        private $conn;
        
        public function __construct($db)
        {
            $this->conn = $db;
        }

        /**
         * Get all posts
         *
         * @return void
         */
        public function getPosts()
        {
            //----- POST -----

            $query = "SELECT id, title, body, updated_at, created_at FROM " . $this->db_table;
            
            $stmt = $this->conn->prepare($query);
        
            $stmt->execute();

            $postArr = array();
            $postArr["body"] = array();
            $postArr["count"] = $stmt->rowCount();
            $posts = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($posts) {
                foreach ($posts as $post) {
                    //----- BUILD CATEGORY ARRAY -----
                    extract($post);

                    $query = "SELECT category_id FROM " . $this->relation_table . " WHERE `post_id` = :post_id";

                    $stmt = $this->conn->prepare($query);

                    $stmt->bindValue(":post_id", $id, PDO::PARAM_INT); //same id used stripped tags upper

                    $stmt->execute();

                    $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    $arrCategory = array();
                    if ($categories) {
                        foreach ($categories as $val) {
                            foreach ($val as $val2) {
                                array_push($arrCategory, $val2);
                            }
                        }
                    } else {
                        //array_push($arrCategory, "No categories.");
                    }
                    
                    //----- BUILD POST ARRAY -----
                    $arr = array(
                        "id" => $id,
                        "title" => $title,
                        "body" => $body,
                        "updated_at" => $updated_at,
                        "created_at" => $created_at,
                        "categories" => $arrCategory
                    );

                    array_push($postArr["body"], $arr);
                }
            } else {
                http_response_code(404);
                return json_encode("There was an error!");
            }

            return json_encode($postArr);
        }
        
        /**
         * Get individual post by id
         *
         * @return void
         */
        public function getPost()
        {
            if ($this->id != null) {
                //----- POST -----

                $query = "SELECT id, title, body, updated_at, created_at FROM " . $this->db_table . " WHERE `id` = :id";
            
                $stmt = $this->conn->prepare($query);

                $this->id=htmlspecialchars(strip_tags($this->id));

                $stmt->bindParam(":id", $this->id);
            
                $stmt->execute();

                $postArr = array();
                $postArr["body"] = array();
                $post = $stmt->fetch(PDO::FETCH_ASSOC);

                if ($post) {
                    extract($post);
                    $arr = array(
                        "id" => $id,
                        "title" => $title,
                        "body" => $body,
                        "updated_at" => $updated_at,
                        "created_at" => $created_at,
                    );
                    array_push($postArr["body"], $arr);
                } else {
                    http_response_code(404);
                    return json_encode("There was an error!");
                }

                //----- CATEGORIES -----

                $query = "SELECT category_id FROM " . $this->relation_table . " WHERE `post_id` = :post_id";
                
                $stmt = $this->conn->prepare($query);
                
                $stmt->bindValue(":post_id", $this->id, PDO::PARAM_INT); //same id used stripped tags upper

                $stmt->execute();

                $categories = $stmt->fetchAll(PDO::FETCH_ASSOC);
                
                //if you need to repair here even god doesn't know how it works
                if ($categories) {
                    $arr = array();
                    foreach ($categories as $val) {
                        foreach ($val as $val2) {
                            array_push($arr, $val2);
                        }
                    }
                    foreach ($arr as $val) {
                        $postArr["body"][0]["categories"][] = $val;
                    }
                } else {
                    $postArr["body"][0]["categories"]=[];
                }
                
                return json_encode($postArr);
            } else {
                http_response_code(404);
                return json_encode("Post not found.");
            }
        }
        
        /**
         * Create a post
         *
         * @return void
         */
        public function createPost()
        {
            $query = "INSERT INTO " . $this->db_table . " SET title = :title, body = :body, updated_at = :updated_at, created_at = :created_at";

            $stmt = $this->conn->prepare($query);

            $this->title = htmlspecialchars(strip_tags($this->title));
            $this->body = htmlspecialchars(strip_tags($this->body));
            $this->updated_at = date("Y-m-d H:i:s");
            $this->created_at = date("Y-m-d H:i:s");

            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":body", $this->body);
            $stmt->bindParam(":updated_at", $this->updated_at);
            $stmt->bindParam(":created_at", $this->created_at);

            $stmt->execute();
            
            $post_id = $this->conn->lastInsertId();
            
            $query = "INSERT INTO " . $this->relation_table . " SET post_id = :post_id, category_id = :category_id";

            if ($this->categories != null) {
                foreach ($this->categories as $value) {
                    $stmt = $this->conn->prepare($query);

                    $value = htmlspecialchars(strip_tags($value));

                    $stmt->bindParam(":post_id", $post_id);
                    $stmt->bindParam(":category_id", $value);

                    $stmt->execute();
                }
            }
        }
        
        /**
         * Update post
         *
         * @return void
         */
        public function updatePost()
        {
            $query = "UPDATE " . $this->db_table . " SET title = :title, body = :body, updated_at = :updated_at WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->id = htmlspecialchars(strip_tags($this->id));
            $this->title = htmlspecialchars(strip_tags($this->title));
            $this->body = htmlspecialchars(strip_tags($this->body));
            $this->updated_at = date("Y-m-d H:i:s");
            
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":body", $this->body);
            $stmt->bindParam(":updated_at", $this->updated_at);

            $stmt->execute();

            //----- DELETE OLD POST_HAS_CATEGORY VALUES -----
            $query = "DELETE FROM " . $this->relation_table . " WHERE post_id = :post_id";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":post_id", $this->id); //already stripped tags upper

            $stmt->execute();

            //----- UPDATE POST_HAS_CATEGORY VALUES -----
            if ($this->categories != null) {
                foreach ($this->categories as $value) {
                    $query = "INSERT INTO " . $this->relation_table . " SET post_id = :post_id, category_id = :category_id";

                    $stmt = $this->conn->prepare($query);

                    $value = htmlspecialchars(strip_tags($value));

                    $stmt->bindParam(":post_id", $this->id);
                    $stmt->bindParam(":category_id", $value);

                    $stmt->execute();
                }
            }
        }
        
        /**
         * Delete post
         *
         * @return void
         */
        public function deletePost()
        {
            $query = "DELETE FROM " . $this->db_table . " WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->id=htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(":id", $this->id);

            $stmt->execute();

            //----- DELETE POST_HAS_CATEGORY VALUES -----
            $query = "DELETE FROM " . $this->relation_table . " WHERE post_id = :post_id";

            $stmt = $this->conn->prepare($query);

            $stmt->bindParam(":post_id", $this->id); //already stripped tags upper

            $stmt->execute();
        }
    }
