
<?php 
// include_once "../Models/db.php";
include_once "db.php";

class Productos extends DB{
    public function __construct(){
        
    }

    protected function select(){}
    protected function  insert(){}
    protected function  update(){}
    protected function  delete(){}

    public function selectProducts(){
        $sql = "SELECT * FROM productos";
        $this->connect();
        $this->execSQL($sql);
        $this->disconnect();
        return $this->fetchAll();
    }

}

$productos = new Productos();


print_r ($productos->selectProducts());
?>