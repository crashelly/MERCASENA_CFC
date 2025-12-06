<?php
// incluimos la clase padre DB
include_once dirname(__DIR__) . '/db.php';

/**
 *  clase modelo de la tabla pedidos 
 *  
 */
 // CARGAMOS EL COMPONNETE PARA LEER LAS VARIABLES GLOBAALES
// require '../../../vendor/autoload.php';
// $dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 3));
// $dotenv->load();
class OrderHasProducts extends DB
{
    public $products = [];
    public $orderID = null;

    private $serverIp = null;
    // ======= METODOS CRUD ========================


    // SETTER
  private function setIp()
    {
        $this->serverIp = $_ENV['IP_ADRESS'];
    }

    public function setOrderID(string $id)
    {
        $this->orderID = $id;
    }
    public function select()
    {

        // $this->connect(); 
        // $this->sql = "SELECT FROM "; //asigna la query
        // $this->query = $this->conn->prepare($this->sql);
        // $this->query->execute();

        // return $this->query->fetchAll();
    }

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


    /**
     * trae todos los productos relacionados a una pedido
     * @param mixed $orderId id del pedido
     * @throws \Exception No se encontraron los productos relacionados con este pedido
     */

    public function fetchProductsByOrder($orderId)
    {
        $this->connect();
        $this->sql = "SELECT pp.pedProd_estado as estado, p.prod_nombre as nombre , ps.subCat_nombre as variante , pm.prodMed_medida as medida , pp.pedProd_cantidad as cantidad , pp.pedProd_precioParcial as precioParcialProducto
                    FROM pedidos_tiene_productos pp
                    INNER JOIN productos_subcategorias ps ON pp.subCat_id =ps.subCat_id
                    INNER JOIN productos p ON ps.prod_id = p.prod_id
                    INNER JOIN productos_medidaventa pm ON ps.prodMed_id =  pm.prodMed_id
                    INNER JOIN pedidoproductos_estado pee ON pp.pedProd_estado = pee.pedProdE_id
                    WHERE  pedi_id = :id";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $orderId, PDO::PARAM_STR);
        $this->query->execute();


        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron los productos relacionados con este pedido $orderId");
        } else {
            return $data;
        }
    }
    /**
     * hace lo mismo que fetch ProductsByOrder pero este si se trae la ruta de las imagenes entonces es una consulta mas pesada en cambio la otra es mas rapida y liviana
     * @param mixed $orderId id del pedido
     */
    public function fetchProductsByOrderForUser($orderId)
    {
        $this->connect();
        $this->sql = "CALL  obtenerProductosPorPedido(:id)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $orderId, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($data as $subArr => $product) {
            $product['imagen'] = $this->serverIp . $product['imagen'];
            $product['variante'] == 'default' ? $product['variante'] = '' : '';

            // print_r($product);
            $newData[] = $product;
        }
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron los productos relacionados con este pedido $orderId");
        } else {
            return $newData;
        }
    }

    public function fetchProductsByOrderToBill($orderId)
    {
        $this->connect();
        $this->sql = "SELECT
    pp.pedProd_estado AS estado,
    p.prod_nombre AS nombre,
    ps.subCat_nombre AS variante,
    pm.prodMed_medida AS medida,
    pp.pedProd_cantidad AS cantidad,
    pp.pedProd_precioParcial AS precioParcial,
    pm.prodMed_factor as Medidafactor,
    ps.subCat_precio as precio,
    -- ids utiles
    pp.subCat_id as id
FROM
    pedidos_tiene_productos pp
INNER JOIN productos_subcategorias ps ON
    pp.subCat_id = ps.subCat_id
INNER JOIN productos p ON
    ps.prod_id = p.prod_id
INNER JOIN productos_medidaventa pm ON
    ps.prodMed_id = pm.prodMed_id
INNER JOIN pedidoproductos_estado pee ON
    pp.pedProd_estado = pee.pedProdE_id
WHERE
    pedi_id = :id";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $orderId, PDO::PARAM_STR);
        $this->query->execute();


        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron los productos relacionados con este pedido $orderId");
        } else {
            return $data;
        }
    }
    public function selectOne(string $id)
    {
        $this->connect();
        $this->sql = "SELECT * FROM pedidoss_PesoVenta WHERE  prodMed_id= :id";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $this->query->execute();


        $data = $this->query->fetchAll();
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos");
        } else {
            return $data;
        }
    }

    /**
     *  crea datos dentro de la tabla pedidoss .
     * @param  array $data arreglo  que contiene objectos [["
     *    subCat_id INT,
     *  
     *    precioParcial FLOAT,
     *    cantidad FLOAT
     *],[]]
     * @throws Exception No se creo el pedido lo sentimos ,intenta nuevamente
     *
     * @throws Exception 
     */
    public function insert(array $data)
    {
        $this->connect();
        // recorrera el arreglo insertando los productos
        foreach ($data as $item => $product) {

            $id = $product['id'];
            $quantity = $product['quantity'];
            $partialTotalPrice = $product['partialTotalPrice'];
            // print_r($product);
            $this->sql = "CALL crear_pedido_tiene_productos(:subCat_id,:pedi_id,:precioParcial,:cantidad)";
            $this->query = $this->conn->prepare($this->sql);
            $this->query->bindParam(':subCat_id', $id, PDO::PARAM_STR);
            $this->query->bindParam(':pedi_id', $this->orderID, PDO::PARAM_STR);
            $this->query->bindParam(':precioParcial', $partialTotalPrice, PDO::PARAM_STR);
            $this->query->bindParam(':cantidad', $quantity, PDO::PARAM_STR);
            $result = $this->execParamQuery();
            // if (!$result) {
            //     throw new Exception("No se pudieron guardar los productos del pedido  => $result");
            // }
        }
        $this->disconnect();
    }

    // public function insert(array $product)
    // {
    //     $this->connect();

    //     $id = $product['id'];
    //     $quantity = $product['quantity'];
    //     $partialTotalPrice = $product['partialTotalPrice'];


    //     $this->sql = "CALL crear_pedido_tiene_productos(:subCat_id,:pedi_id,:precioParcial,:cantidad)";
    //     $this->query = $this->conn->prepare($this->sql);
    //     $this->query->bindParam(':subCat_id', $id, PDO::PARAM_STR);
    //     $this->query->bindParam(':pedi_id', $this->orderID, PDO::PARAM_STR);
    //     $this->query->bindParam(':precioParcial', $partialTotalPrice, PDO::PARAM_STR);
    //     $this->query->bindParam(':cantidad', $quantity, PDO::PARAM_STR);

    //     $result = $this->execParamQuery();
    //     if (!$result) {
    //         throw new Exception("No se creo el pedido lo sentimos ,intenta nuevamente");
    //     }

    //     // print_r(   $this->conn->lastInsertId());
    //     $this->disconnect();
    //     // verificacion de que haya realizado cambios
    // }


    // // escondemos los parametros para la query

    // // $this->query = $this->conn->prepare($this->sql);
    // // $this->query->bindParam(':subCat_id', $product[], PDO::PARAM_STR);
    // // $this->query->bindParam(':pedi_id', $product[], PDO::PARAM_STR);
    // // $this->query->bindParam(':precioParcial', $product[], PDO::PARAM_STR);
    // // $this->query->bindParam(':cantidad', $product[], PDO::PARAM_STR);




    // verificacion de que haya realizado cambios



    /**
     * actualiza datos dentro de la tabla pedidoss
     * @param  string $id id de la PesoVenta pedidos
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

        $this->setIp();
    }


}
$prueba = new OrderHasProducts();

// echo json_encode($prueba->fetchProductsByOrder("ped_2025-05-30_6838eb39683d50.14514671"));

?>