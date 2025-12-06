<?php 
// incluimos la clase padre DB
include_once 'db.php';

/**
 *  clase modelo de la tabla productos_subcategoria
 *  
 */
class TestModel extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_subcategoria .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
     
        $this->connect(); 
        $this->sql = "SELECT * FROM productos_subcategoria"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        return $this->query->fetchAll();
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
            $this->sql = "SELECT * FROM productos_subcategoria WHERE  prodMed_id= :id"; 
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
*  crea datos dentro de la tabla productos_subcategoria .
* @param  array $data arreglo asociativo ["newSubCategory" => "nombre o tipo de medida"]
* @throws Exception No se creo el subcategoria del producto
*/
    public  function insert(array $data){
        $this->connect();
        $SubCategory = $data['newSubCategory']; // nueva medida
        // sentencia SQL
        $this->sql = "CALL crear_producto_subcategoria(:SubCategory)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':SubCategory', $SubCategory, PDO::PARAM_STR);
        $result = $this->execParamQuery(); 
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result){
            throw  new Exception("No se creo  la nueva medida del producto");
        }
    }
    /**
    * actualiza datos dentro de la tabla productos_subcategoria
    * @param  string $id id de la subcategoria producto
    * @param  array $data arreglo asociativo 
    * [
    *   "newSubCategory" => "nombre de la medida Venta"
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect();
        $SubCategory = $data['newSubCategory'];
        // sentencia SQL
        $this->sql = "CALL actualizar_producto_subcategoria(:id,:categoria)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':categoria', $SubCategory, PDO::PARAM_STR);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ");
        }
    }

    /**
     * Elimina datos de la tabla productos_subcategoria
     * @param mixed $id id del producto_subcategoria
     * 
     * @throws  Exception no se elimino la medida del producto
     */
    public  function delete(string $id){
        $this->connect();
        $this->sql = "CALL eliminar_producto_subcategoria(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("no se elimino la medida del producto ");
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
