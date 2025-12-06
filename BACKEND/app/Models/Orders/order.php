<?php
// incluimos la clase padre DB
include_once dirname(__DIR__) . '/db.php';

/**
 *  clase modelo de la tabla pedidos 
 *  
 */

 // CARGAMOS EL COMPONNETE PARA LEER LAS VARIABLES GLOBAALES
require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 3));
$dotenv->load();

class Order extends DB
{
    public $id;


    // ======= METODOS CRUD ========================

    public function select()
    {

        // $this->connect(); 
        // $this->sql = "SELECT FROM "; //asigna la query
        // $this->query = $this->conn->prepare($this->sql);
        // $this->query->execute();

        // return $this->query->fetchAll();
    }



   public function  isUsersOrder($orderID,$userID){
        $this->connect();
        $this->sql = "CALL esElPedidoDelUsuario(:orderID, :userID)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':orderID', $orderID, PDO::PARAM_STR);
        $this->query->bindParam(':userID', $userID, PDO::PARAM_STR);
        $this->query->execute();
        // si en verdad ese pediod fue hecho por ese usuario entonces retorna 1 de lo contrario 0 y devolveremos true o false
        if($this->query->rowCount() > 0){
            return true;
        }else{
            return false;
        } 
    }
    /**
     * muestra la cantidad de registros que tiene la tabla pedidos
     * @return void
     */

    public function countOrders()
    {
        $this->connect(true);
        $this->sql = "SELECT * from cantidad_pedidos"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }
    /**
     * busca todos los ids de los pedidos 
     * @param mixed $date fecha que pasamos como parametro para la busqueda
     * @throws \Exception
     */

    public function fetchAllOrdersByDate($date)
    {
        $this->connect();
        $this->sql = "SELECT p.pedi_id as id , ep.pedE_id as estadoId, u.usr_nombre as usuario , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM pedidos p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE pedi_fechaCreacion = :dateParam ORDER BY pedi_fechaHora ASC"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':dateParam', $date, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            // throw new Exception("fecha incorrecta $date  o error interno en el servidor");
            throw new Exception("no se encontro ningun pedido en la fecha solicitada $date");
        } else {
            return $data;
        }
    }
    
/**
 * muestra la informacion de un pedido
 *
 * @param [type] $orderID
 * @return void
 */
     public function fetchOrdersInfo($orderID)
    {
        $this->connect();
        $this->sql = "CALL obtenerDetallesPedido(:pediID)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':pediID', $orderID, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("ID de pedido no valido o incorrecto");
        } else {
            return $data;
        }
    }


       public function fetchOrderById($id)
    {
        $this->connect(true);
        $this->sql = "SELECT  u.usr_direccion as direccion,u.NIT as nit ,p.pedi_id as id , ep.pedE_id as estadoId, u.usr_nombre as usuario , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM pedidos p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE pedi_id = :id "; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("id del pedido erroneo o no encontrado");
        } else {
            return $data;
        }
    }

    public function fetchOrdersByUser($usr){
        $this->connect();
        $this->sql = "CALL obtenerPedidoPorUsuario(:usr)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':usr', $usr, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);

        if(empty($data)){
            throw new Exception("No se encontraron pedidos relacionados contigo");
        }else{
            return $data;
        }
    }
    /**
     * muestra todas las ordenes
     * @throws \Exception
     *
     *  function
     *
     * @return void
     */
    public function fetchAllOrders()
    {
        $this->connect();
        $this->sql = "SELECT prod_id as id , prod_nombre  as nombre , prod_fechaCreacion as  fechaCreacion FROM pedidoss"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos sobre los pedidoss");
        } else {
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
    public function selectUserByOrder(string $id)
    {
        $this->connect(true);
        $this->sql = "SELECT usr_id as id  FROM pedidos  WHERE pedi_id =  :id";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $this->query->execute();


        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos");
        } else {
            return $data;
        }
    }

    /**
     *  crea datos dentro de la tabla pedidoss_subcategorias .
     * @param  array $data arreglo asociativo ["precioTotal"=>"precio","idUsuario"=>"id del usuario"]
     * @throws Exception No se creo el pedido lo sentimos ,intenta nuevamente
     *
     * @throws Exception No se guardo la imagen del pedidos
     */

    /**
     * 
     * genera un id para el pedido
     * 
     */
    public function generateUniqueOrderID()
    {
        $fecha_actual = date("Y-m-d");
        $uniq = uniqid('ped_' . $fecha_actual . '_', true);

        // guarda la clave generada en el atributo id
        $this->id = $uniq;
    }

    /**
     * inserta datos en la tabla pedidos
     * @param array $data variable que tiene ["precioTotal"=>"precioTotal del pedido","idUsuario"=>"usuario"]
     * @throws \Exception
     * @return void
     */


    public function insert(array $data)
    {
        $this->connect();

        // variables 
        $totalPrice = $data['precioTotal']; // precio total
        $userID = $data['idUsuario']; //id del usuario
        // $userID = 1; //id del usuario

        $this->sql = "CALL crear_pedido(:precioTotal,:idUsuario,:orderID)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':orderID', $this->id, PDO::PARAM_STR);
        $this->query->bindParam(':precioTotal', $totalPrice, PDO::PARAM_STR);
        $this->query->bindParam(':idUsuario', $userID, PDO::PARAM_STR);

        $result = $this->execParamQuery();
        // print_r(   $this->conn->lastInsertId());
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result) {
            throw new Exception("No se creo el pedido lo sentimos ,intenta nuevamente $result");
        }


    }

    /**
     * actualiza datos dentro de la tabla pedidoss
     * @param  string $id id de la pedido
     * @param  array $data arreglo asociativo 
     * [
     *    pedi_id => "id del pedidos",
     *    precio_total => "precio total",
     *    "usuario" => "usuario",
     * ]
     * @throws Exception No se realizaron cambios
     */
    public function update(string $id, array $data)
    {
        $this->connect();

        $totalPrice = $data["precio_total"];
        $userID = $data["usuario"];

        // sentencia SQL
        $this->sql = "CALL actualizar_pedido(:orderId,:totalPrice,:idUsuario)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':orderId', $id, PDO::PARAM_STR);
        $this->query->bindParam(':totalPrice', $totalPrice, PDO::PARAM_STR);
        $this->query->bindParam(':idUsuario', $userID, PDO::PARAM_STR);


        $result = $this->query->execute();
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("No se realizaron cambios ni actualizacion  a los pedidos");
        }

    }

    /**
     * Elimina datos de la tabla pedidos
     * @param mixed $id id del pedidos
     * 
     * @throws  Exception no se elimino el pedidos
     */
    public function delete(string $id)
    {
        $this->connect(true);
        $this->sql = "CALL eliminar_pedido(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se elimino el pedido");
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

// $prueba = new Order();
// echo $prueba->isUsersOrder('ped_2025-06-02_683de82fa973f0.16094314','user_6@gm_682a519b1aeb78.24661902');
// echo json_encode($data); 
// echo json_encode($prueba->fetchAllOrdersByDate("2025-04-26"));
?>