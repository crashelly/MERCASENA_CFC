<?php
// incluimos la clase padre DB
include_once __DIR__ . '/db.php';

// libreria de phpdoenv
require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();

/**
 *  clase modelo de la tabla facturas 
 *  
 */
class Bill extends DB
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

    /**
     * muestra la cantidad de registros que tiene la tabla facturas
     * @return void
     */

    public function countbills()
    {
        $this->connect();
        $this->sql = "SELECT * from cantidad_facturas"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }
    /**
     * busca todos los ids de los facturas 
     * @param mixed $date fecha que pasamos como parametro para la busqueda
     * @throws \Exception
     */

    public function fetchAllbillsByDate($date)
    {
        $this->connect();
        $this->sql = "SELECT p.pedi_id as id , ep.pedE_id as estadoId, u.usr_nombre as usuario , ep.pedE_estado as estado,p.pedi_precioTotal as precioTotal, p.pedi_fechaHora as fechaHoraPedido FROM facturas p 
                        INNER JOIN usuarios u ON p.usr_id = u.usr_id
                        INNER JOIN estado_pedido ep ON p.pedE_id= ep.pedE_id

                        WHERE pedi_fechaCreacion = :dateParam ORDER BY pedi_fechaHora ASC"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':dateParam', $date, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("fecha incorrecta o error interno en el servidor");
        } else {
            return $data;
        }
    }

    /**
     * obtienen informacion de una factura apartir del id del pedido
     *
     * @param [type] $orderID
     * @return void
     */
    public function fetchbillsInfo($orderID)
    {
        $this->connect();
        $this->sql = "SELECT
    p.pedi_id AS id,
    ep.pedE_id AS estadoId,
    u.usr_nombre AS usuario,
    ep.pedE_estado AS estado,
    p.pedi_precioTotal AS precioTotal,
    p.pedi_fechaHora AS fechaHoraPedido
FROM
    facturas p
INNER JOIN usuarios u ON
    p.usr_id = u.usr_id
INNER JOIN estado_pedido ep ON
    p.pedE_id = ep.pedE_id
WHERE p.pedi_id = :pediID"; //asigna la query
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
    /**
     * obtiene toda la informacion de todas las facturas
     * Summary of fetchAllbills
     * @throws \Exception
     *
     */
    public function fetchAllbills()
    {
        $this->connect();
        $this->sql = "SELECT prod_id as id , prod_nombre  as nombre , prod_fechaCreacion as  fechaCreacion FROM facturass"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos sobre los facturass");
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
    public function selectOne(string $id)
    {

    }

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
     * inserta datos en la tabla facturas
     * @param array $data variable que tiene los datos ["userID"=>"id del usuario","totalPrice"=>"precio total","billData"=>"informacion de la factura"]
     * @throws \Exception
     * @return void
     */

    /**
     * muestra el id de la ultima factura + 1
     *
     * @return array ["id" => "ultimo id +1"]
     */
    public function getBillId()
    {
        $this->connect();
        $this->sql = "SELECT * from pseudoid"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }
    /**
     * funcion para contar lña ventas hachas en el dia 
     * @param mixed $date fecha solicitada en este caso es para el dia actual
     */

    public function countOrdersOfDay($date)
    {

        $this->connect(true);
        $this->sql = "CALL obtenerCantVentasHoy(:fechaS)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':fechaS', $date, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * muestra CUAL ES la cantidad vendida hoy
     * @param mixed $date
     *
     * 
     */
    public function getAllSelledToday($date)
    {
        $this->connect(true);
        $this->sql = " CALL obtenerTotalVendidoHoy(:fechaS);"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':fechaS', $date, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     * obtiene la ultima factura por el id dle pedido
     *
     * @param [type] $orderID id del pedido
     * @return void
     *  CALL  ObtenerIdFacturaPorPedido('ped_2025-06-17_68516ecf82f365.27467124');  
     */
    public function getBillIdByOrderID($orderID)
    {

        $this->connect(true);
        $this->sql = " CALL  ObtenerIdFacturaPorPedido(:order_id);"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':order_id', $orderID, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetch(PDO::FETCH_ASSOC);
    }
    /**
     * obtiene la ultima factura por el id de la factura
     *
     * @param [type] $orderID id del pedido
     * @return array informacion de la factura
     * @throws Exception No se encontraron datos de la factura
     */
    public function getBillInfoByID($facID)
    {

        $this->connect();
        $this->sql = " CALL  obtenerFacInfoPorId(:fac_id);"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':fac_id', $facID, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetch(PDO::FETCH_ASSOC);

        if (empty($data)) {
            throw new Exception('No se encontraron datos de la factura');
        } else {
            return $data;
        }
    }

    /**
     * obtiene  el id de la ultima factura registrada 

     * @return void
     */
    public function getLastBillByDate()
    {

        $this->connect(true);
        $this->sql = " SELECT * FROM  ultimoidporfecha;"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $data = $this->query->fetch(PDO::FETCH_ASSOC);
        // retorna el ultimo id  de la factura
        return $data['id'];
    }

    // por temas de tiempo me toca hacer esta mamaracchera :V

    public function filterBillByDate($date)
    {
        $this->connect(true);

        $this->sql = "CALL 	buscarFacturaPorFecha(:date)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':date', $date, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }
    public function filterBillByUserName($username)
    {
        $this->connect(true);

        $this->sql = "CALL buscarFacturaPorNombreCliente(:user)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':user', $username, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }
    public function filterBillByUserNameAndDate($date, $username)
    {
        $this->connect(true);

        $this->sql = "CALL buscarFacturaPorFechaYUsuario(:date,:user)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':date', $date, PDO::PARAM_STR);
        $this->query->bindParam(':user', $username, PDO::PARAM_STR);
        $result = $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * obtiene informacion de una factura apartir dle susuario
     * @param mixed $userID
     */

    public function getBillInfoByUser($userID)
    {
        $this->connect();
        $this->sql = "SELECT * FROM facturas WHERE usr_id = :id ORDER BY fac_fecha DESC"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $userID, PDO::PARAM_STR);
        $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }


    /**
     * crea la factura apartir de la informacion de un pedido

     * @param array $data
     * @throws \Exception
     * @return void
     */
    public function insert(array $data)
    {
        $this->connect(true);

        // variables 
        $usr_id = $data['usr_id'];
        $TotalPrice = $data['totalPrice'];
        $billData = $data['billData'];
        $orderID = $data['orderID'];
        // informacion sobre la factura
        $productsQuantity = $data['productsQuantity']; // informacion sobre la factura


        $this->sql = "CALL crear_factura(:usr_id,:totalPrice,:billData,:orderID,:cantidad)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        // asignamos los parametros
        $this->query->bindParam(':usr_id', $usr_id, PDO::PARAM_STR);
        $this->query->bindParam(':totalPrice', $TotalPrice, PDO::PARAM_STR);
        $this->query->bindParam(':billData', $billData, PDO::PARAM_STR);
        $this->query->bindParam(':orderID', $orderID, PDO::PARAM_STR);
        $this->query->bindParam(':cantidad', $productsQuantity, PDO::PARAM_STR);
        $result = $this->execParamQuery();
        // print_r(   $this->conn->lastInsertId());
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result) {
            throw new Exception("No se creo la factura lo sentimos , intenta nuevamente ");
        }


    }


    public function createBillWithoutOrder(array $data)
    {
        $this->connect(true);

        // variables 
        $userName = $data['userName'];
        $TotalPrice = $data['totalPrice'];
        $billData = $data['billData'];
        $orderID = $data['orderID'];
        $productsQuantity = $data['productsQuantity']; // informacion sobre la factura


        $this->sql = "CALL crearfacturasinpedidoprevio(:userName,:totalPrice,:billData,:orderID,:cantidad)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        // asignamos los parametros
        $this->query->bindParam(':userName', $userName, PDO::PARAM_STR);
        $this->query->bindParam(':totalPrice', $TotalPrice, PDO::PARAM_STR);
        $this->query->bindParam(':billData', $billData, PDO::PARAM_STR);
        $this->query->bindParam(':orderID', $orderID, PDO::PARAM_STR);
        $this->query->bindParam(':cantidad', $productsQuantity, PDO::PARAM_STR);
        $result = $this->execParamQuery();
        // print_r(   $this->conn->lastInsertId());
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result) {
            throw new Exception("No se creo la factura lo sentimos , intenta nuevamente, variables utilizadas : ");
        }


    }
    /**
     * actualiza datos dentro de la tabla facturass
     * @param  string $id id de la pedido
     * @param  array $data arreglo asociativo 
     * [
     *    pedi_id => "id del facturas",
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
            throw new Exception("No se realizaron cambios ni actualizacion  a los facturas");
        }

    }

    /**
     * Elimina datos de la tabla facturas
     * @param mixed $id id del facturas
     * 
     * @throws  Exception no se elimino el facturas
     */
    public function delete(string $id)
    {
        $this->connect();
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


// $bill = new Bill();
// ;
//  $billId = $bill->getLastBillByDate();
//  echo $billId;
// $bill->createBillWithoutOrder([
//     "userName" =>'salome rios rogriguez',
//     // "totalPrice" => $billInfo[''],
//     "totalPrice" => 10000,
//     "billData" => "[{'llorelo':'hola'}]",
//     "orderID" => 'sin pedido ,facturado desde cero'
// ]);

// echo json_encode($bill->countOrdersOfDay('2025-06-05'));
// echo json_encode($prueba->fetchAllbillsByDate("2025-04-26"));
?>