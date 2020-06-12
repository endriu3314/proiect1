<?php
    class Post{
        private $db_table="posts";

        public $id;
        public $title;
        public $category_id;
        public $body;
        public $updated_at;
        public $created_at;        

        private $conn;
        
        public function __construct($db){
            $this->conn = $db;
        }

        /**
         * Get all posts
         * 
         * @return void
         */
        public function getPosts(){
            $query = "SELECT id, title, category_id, body, updated_at, created_at FROM " . $this->db_table;
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            return $stmt;
        }
        
        /**
         * Get individual post by id
         *
         * @return void
         */
        public function getPost(){
            $query = "SELECT id, title, category_id, body, updated_at, created_at FROM " . $this->db_table . " WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);
            $stmt->bindParam(":id", $id);
            $stmt->execute();
            
            return $stmt;
        }
        
        /**
         * Create a post
         *
         * @return void
         */
        public function createPost(){
            $query = "INSERT INTO " . $this->db_table . " SET title = :title, category_id = :category_id, body = :body, updated_at = :updated_at, created_at = :created_at";
            
            $stmt = $this->conn->prepare($query);

            $this->title = htmlspecialchars(strip_tags($this->title));
            $this->category_id = htmlspecialchars(strip_tags($this->category_id));
            $this->body = htmlspecialchars(strip_tags($this->body));
            $this->updated_at = date("Y-m-d H:i:s");
            $this->created_at = date("Y-m-d H:i:s");

            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":category_id", $this->category_id);
            $stmt->bindParam(":body", $this->body);
            $stmt->bindParam(":updated_at", $this->updated_at);
            $stmt->bindParam(":created_at", $this->created_at);

            $stmt->execute();
        }
        
        /**
         * Update post
         *
         * @return void
         */
        public function updatePost(){
            $query = "UPDATE " . $this->db_table . " SET title = :title, category_id = :category_id, body = :body, updated_at = :updated_at WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->title = htmlspecialchars(strip_tags($this->title));
            $this->category_id = htmlspecialchars(strip_tags($this->category_id));
            $this->body = htmlspecialchars(strip_tags($this->body));
            $this->updated_at = date("Y-m-d H:i:s");
            
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":title", $this->title);
            $stmt->bindParam(":category_id", $this->category_id);
            $stmt->bindParam(":body", $this->body);
            $stmt->bindParam(":updated_at", $this->updated_at);

            $stmt->execute();
        }
        
        /**
         * Delete post
         *
         * @return void
         */
        public function deletePost(){
            $query = "DELETE FROM " . $this->db_table . " WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->id=htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(":id", $this->id);

            $stmt->execute();
        }
        
    }