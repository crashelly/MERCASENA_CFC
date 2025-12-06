<?php 
// incluimos la clase padre DB
include_once dirname(__DIR__).'/db.php';

/**
 *  clase modelo de la tabla pedidos 
 *  
 */
class OrderState extends DB
{
    

    // ======= METODOS CRUD ========================
    
    public function select(){
     
        // $this->connect(); 
        // $this->sql = "SELECT FROM "; //asigna la query
        // $this->query = $this->conn->prepare($this->sql);
        // $this->query->execute();
        
        // return $this->query->fetchAll();
    }

    public function fetchAllOrders(){
        $this->connect(); 
        $this->sql = "SELECT prod_id as id , prod_nombre  as nombre , prod_fechaCreacion as  fechaCreacion FROM pedidoss"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)){
            throw new Exception("No se encontraron datos sobre los pedidoss");
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
            // $this->connect(); 
            // $this->sql = "SELECT * FROM pedidoss_PesoVenta WHERE  prodMed_id= :id"; 
            // $this->query = $this->conn->prepare($this->sql);
            // $this->query->bindParam(':id', $id, PDO::PARAM_STR);
            // $this->query->execute();
            

            // $data = $this->query->fetchAll();
            // // verificacion de que se encontraron datos
            // if (empty($data)){
            //     throw new Exception("No se encontraron datos");
            // }else{
            //     return $data;
            // }
    }

/**
*  crea datos dentro de la tabla estado_pedidos .
* @param  array $data arreglo asociativo
* ["estado"=>"lo que sea "]
* @throws Exception No se creo el pedido lo sentimos ,intenta nuevamente
*
*/
public  function insert(array $data){
    $this->connect();

    // variables 
    $state = $data['estado']; // nombre 
   

    $this->sql = "CALL crear_estado_pedido(:state)";

    // escondemos los parametros para la query
    $this->query = $this->conn->prepare($this->sql);
    $this->query->bindParam(':state', $state, PDO::PARAM_STR);
    
    $result = $this->execParamQuery(); 
    $this->disconnect();
    // verificacion de que haya realizado cambios

    if (!$result){
        throw  new Exception("No se creo el estado del pedido");
    }
}

    /**
    * actualiza datos dentro de la tabla pedidoss
    * @param  string $id id de la 
    * @param  array $data arreglo asociativo 
    * [
    *    pedi_id => "id del pedidos",
    *    precio_total => "precio total",
    *    "usuario" => "usuario",
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect();
        
        $totalPrice = $data["precio_total"];
        $userID = $data["usuario"]; 
        
        // sentencia SQL
        $this->sql = "CALL actualizar_pedido(:orderId,:totalPrice,:idUsuario)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':orderId', $id, PDO::PARAM_STR);
        $this->query->bindParam(':totalPrice',$totalPrice, PDO::PARAM_STR);
        $this->query->bindParam(':idUsuario',$userID, PDO::PARAM_STR);
       
       
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ni actualizacion  a los pedidos");
        }
    }

    /**
     * Elimina datos de la tabla pedidos
     * @param mixed $id id del pedidos
     * 
     * @throws  Exception no se elimino el pedidos
     */
    public  function delete(string $id){
        $this->connect();
        $this->sql = "CALL eliminar_pedido(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("no se elimino el pedido");
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
$prueba = new Order();
// $prueba->insert([
//     "precioTotal" => 100,
//     "idUsuario" => 1
// ]);

// $prueba->update("4",[
//     "precio_total" => 30,
//     "usuario" => 1
// ])

// $prueba->delete("4");
?>
