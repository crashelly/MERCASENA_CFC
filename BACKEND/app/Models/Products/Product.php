<?php 
// incluimos la clase padre DB
include_once dirname(__DIR__).'/db.php';

/**
 *  clase modelo de la tabla productos_PesoVenta
 *  
 */
class Product extends DB
{
    /**
     * devuelve las imagenes relacionadas con algun producto
     *
     * @return void
     */
    public function fetchImages($product_id){

    }

    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_PesoVenta .
     * 
     */
    public function select(){
     
        // $this->connect(); 
        // $this->sql = "SELECT FROM "; //asigna la query
        // $this->query = $this->conn->prepare($this->sql);
        // $this->query->execute();
        
        // return $this->query->fetchAll();
    }

    public function fetchAllBaseProducts(){
        $this->connect(); 
        $this->sql = "SELECT prod_id as id , prod_nombre  as nombre , prod_fechaCreacion as  fechaCreacion FROM productos ORDER BY prod_fechaCreacion DESC"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)){
            throw new Exception("No se encontraron datos sobre los productos");
        }else{
            return $data;
        }
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
            $this->sql = "SELECT * FROM productos_PesoVenta WHERE  prodMed_id= :id"; 
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
*  crea datos dentro de la tabla productos_subcategorias .
* @param  array $data arreglo asociativo ["prod_nombre"=>"nombre del producto"]
* @throws Exception No se guardo la imagen del producto
*/
public  function insert(array $data){
    $this->connect(true);

    // variables 
    $nombre= $data['prod_nombre']; // ruta imagen 
    $this->sql = "CALL crear_producto(:prodNombre)";

    // escondemos los parametros para la query
    $this->query = $this->conn->prepare($this->sql);
    $this->query->bindParam(':prodNombre', $nombre, PDO::PARAM_STR);
    
    $result = $this->execParamQuery(); 
    $this->disconnect();
    // verificacion de que haya realizado cambios

    if (!$result){
        throw  new Exception("No se guardo el producto");
    }
}

    /**
    * actualiza datos dentro de la tabla producto
    * @param  string $id id de la PesoVenta producto
    * @param  array $data arreglo asociativo 
    * [
    *    "nombre" => "huevo",
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect(true);
        // 
        /**
         * @var string $name nombre del producto
         */
        
        // sentencia SQL
        $this->sql = "CALL actualizar_producto(:id,:name)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam('id', $id, PDO::PARAM_STR);
        $this->query->bindParam(':name',$data["nombre"], PDO::PARAM_STR);
       
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ni actualizacion al producto  base  ");
        }
    }

    /**
     * Elimina datos de la tabla productos
     * @param mixed $id id del producto
     * 
     * @throws  Exception no se elimino el producto
     */
    public  function delete(string $id){
        $this->connect(true);
        $this->sql = "CALL eliminar_producto(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("no se elimino el  producto ");
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
