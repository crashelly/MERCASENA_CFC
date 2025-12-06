<?php 
// incluimos la clase padre DB
include_once dirname(__DIR__).'/db.php';

/**
 *  clase Productos_categorias
 */
class ProductCategory extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_categoria .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
        $this->connect(); 
        $this->sql = "SELECT prodCat_id as id , prodCat_categoria as nombre , prodCat_fechaCreacion as fechaCreacion  FROM productos_categoria ORDER BY prodCat_fechaCreacion  DESC"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }


    
/**
 * selecciona solo un registro que se le indique de la base de datos
 * @param  string id
 * @return array arreglo asociativo con los datos
 * @throws Exception No se encontraron datos
 * 
 */
    public function selectOne( string $id){
        $this->connect(); 
        $this->sql = "SELECT * FROM productos_estado WHERE  prodE_id= :id"; 
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $this->query->execute();
        

        $data = $this->query->fetchAll();
        // verificacion de que se encontraron datos
        if (empty($data)){
            throw new Exception("No se encontraron datos");
        }else{
            return $data;
        }
}
/**
*  crea datos dentro de la tabla productos_categoria .
* @param  array $data arreglo asociativo ["categoria" => "nombre de la categoria"]
* @throws Exception No se creo el estado del producto
*/
    public  function insert(array $data){
        $this->connect(true);
        $categoryName = $data['categoria'];
        // sentencia SQL
        $this->sql = "CALL crear_producto_categoria(:categoria)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':categoria', $categoryName, PDO::PARAM_STR);
        $result = $this->execParamQuery(); 
        $this->disconnect();

        if (!$result){
            throw  new Exception("No se creo la categoria del producto");
        }
        
    }
    /**
    * resumen del metodo  update
    * @param  array $data arreglo asociativo 
    * [
    *   "id" => "id de la categoria "
    *   "nuevaCategoria" => "nombre de la categoria"
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect(true);
        $categoryName = $data['nuevaCategoria'];
        // sentencia SQL
        $this->sql = "CALL actualizar_producto_categoria(:id,:categoria)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':categoria', $categoryName, PDO::PARAM_STR);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        
    }

    /**
     * Elimina datos de la tabla productos_categoria
     * @param mixed $id id del producto_categoria
     * 
     * @throws Exception  No se elimino la categoria
     */
    public  function delete(string $id){
        $this->connect(true);
        $this->sql = "CALL eliminar_producto_categoria(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();

        
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se elimino la categoria ");
        }

       
        
    }
    public function __construct()
    {
        /**
         * traemos  el contructor y los parametros basicos
         *
         * @return void
         */
    }


}

?>
