<?php
    class Category
    {
        private $db_table="categories";

        public $id;
        public $name;
        public $updated_at;
        public $created_at;

        private $conn;
        
        public function __construct($db)
        {
            $this->conn = $db;
        }

        /**
         * Get all categories
         *
         * @return void
         */
        public function getCategories()
        {
            $query = "SELECT id, name, updated_at, created_at FROM " . $this->db_table;
            
            $stmt = $this->conn->prepare($query);
            $stmt->execute();
            
            $categArr = array();
            $categArr["body"] = array();
            $categArr["count"] = $stmt->rowCount();
            $categs = $stmt->fetchAll(PDO::FETCH_ASSOC);

            if ($categs) {
                foreach ($categs as $categ) {
                    extract($categ);
                    $arr = array(
                        "id" => $id,
                        "name" => $name,
                        "updated_at" => $updated_at,
                        "created_at" => $created_at
                    );

                    array_push($categArr["body"], $arr);
                }
                $categArr["success"] = true;
                $categArr["message"] = "Got categories.";
                return json_encode($categArr);
            } else {
                throw new Exception("Couldn't get categories.");
            }
        }

        /**
         * Get one category
         *
         * @return void
         */
        public function getCategory()
        {
            $query = "SELECT id, name, updated_at, created_at FROM " . $this->db_table . " WHERE id = :id";

            $stmt = $this->conn->prepare($query);
            
            //echo($this->id);
            $this->id = htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(":id", $this->id);

            $stmt->execute();

            $categArr = array();
            $categArr["body"] = array();
            $categ = $stmt->fetch(PDO::FETCH_ASSOC);

            if ($categ) {
                extract($categ);
                $arr = array(
                    "id" => $id,
                    "name" => $name,
                    "updated_at" => $updated_at,
                    "created_at" => $created_at
                );

                array_push($categArr["body"], $arr);

                $categArr["success"] = true;
                $categArr["message"] = "Got categories.";
                return json_encode($categArr);
            } else {
                throw new Exception("Couldn't get category.");
            }
        }
        
        
        /**
         * Create a category
         *
         * @return void
         */
        public function createCategory()
        {
            $query = "INSERT INTO " . $this->db_table . " SET name = :name, updated_at = :updated_at, created_at = :created_at";
            
            $stmt = $this->conn->prepare($query);

            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->updated_at = date("Y-m-d H:i:s");
            $this->created_at = date("Y-m-d H:i:s");

            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":updated_at", $this->updated_at);
            $stmt->bindParam(":created_at", $this->created_at);

            $stmt->execute();
        }
        
        /**
         * Update category
         *
         * @return void
         */
        public function updateCategory()
        {
            $query = "UPDATE " . $this->db_table . " SET name = :name, updated_at = :updated_at WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->name = htmlspecialchars(strip_tags($this->name));
            $this->updated_at = date("Y-m-d H:i:s");
            
            $stmt->bindParam(":id", $this->id);
            $stmt->bindParam(":name", $this->name);
            $stmt->bindParam(":updated_at", $this->updated_at);

            $stmt->execute();
        }
        
        /**
         * Delete category
         *
         * @return void
         */
        public function deleteCategory()
        {
            $query = "DELETE FROM " . $this->db_table . " WHERE id = :id";
            
            $stmt = $this->conn->prepare($query);

            $this->id=htmlspecialchars(strip_tags($this->id));

            $stmt->bindParam(":id", $this->id);

            $stmt->execute();
        }
    }
