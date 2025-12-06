<?php 
// incluimos la clase padre DB
include_once dirname(__DIR__).'/db.php';

/**
 *  clase modelo de la tabla productos_estado
 *  
 */
class ProductState extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_estado .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
     
        $this->connect(); 
        $this->sql = "SELECT * FROM productos_estado"; //asigna la query
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
*  crea datos dentro de la tabla productos_estado .
* @param  array $data arreglo asociativo ["prodE_estado" => "nombre o tipo de estado"]
* @throws Exception No se creo el estado del producto
*/
    public  function insert(array $data){
        $this->connect();
        $prodE_estado = $data['prodE_estado'];
        // sentencia SQL
        $this->sql = "CALL crear_producto_estado(:prodE_estado)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':prodE_estado', $prodE_estado, PDO::PARAM_STR);
        $result = $this->execParamQuery(); 
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result){
            throw  new Exception("No se creo el estado del producto");
        }
    }
    /**
    * actualiza datos dentro de la tabla productos_estado
    * @param  string $id id de la estado producto
    * @param  array $data arreglo asociativo 
    * [
    *   "newProdE_estado" => "nombre de la categoria"
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect();
        $prodE_estado = $data['newProdE_estado'];
        // sentencia SQL
        $this->sql = "CALL actualizar_producto_estado(:id,:ProdE_estado)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':ProdE_estado', $prodE_estado, PDO::PARAM_STR);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ");
        }
    }

    /**
     * Elimina datos de la tabla productos_estado
     * @param mixed $id id del producto_categoria
     * 
     * @throws  Exception no se elimino la categoria
     */
    public  function delete(string $id){
        $this->connect();
        $this->sql = "CALL eliminar_producto_estado(:id)";

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
