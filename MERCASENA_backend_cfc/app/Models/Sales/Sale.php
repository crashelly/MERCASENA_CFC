<?php
// incluimos la clase padre DB
include_once dirname(__DIR__) . '/db.php';

/**
 *  clase modelo de la tabla facturas 
 *  
 */
class Sale extends DB
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
     *  crea datos dentro de la tabla facturass_subcategorias .
     * @param  array $data arreglo asociativo ["precioTotal"=>"precio","idUsuario"=>"id del usuario"]
     * @throws Exception No se creo el pedido lo sentimos ,intenta nuevamente
     *
     * @throws Exception No se guardo la imagen del facturas
     */



    /**
     * inserta datos en la tabla de ventas
     * @param array $data arreglo que contiene los productos
     * @throws \Exception
     * @return void
     */

    public function insert(array $data)
    {
        $this->connect(true);

        // recorrera todo el arreglo he ira agregando los productos
            $billID = $data['billID'];
            $productID = $data['productID'];
            $quantity = $data['quantity'];
            $price = $data['price'];
            $this->sql = "CALL crear_venta(:billID,:productID,:quantity,:price)";
            // informacion sobre la factura

            // escondemos los parametros para la query
            $this->query = $this->conn->prepare($this->sql);

            // asignamos los parametros
            $this->query->bindParam(':billID', $billID, PDO::PARAM_STR);
            $this->query->bindParam(':productID', $productID, PDO::PARAM_STR);
            $this->query->bindParam(':quantity', $quantity, PDO::PARAM_STR);
            $this->query->bindParam(':price', $price, PDO::PARAM_STR);
            $result = $this->execParamQuery();
            // print_r(   $this->conn->lastInsertId());
            $this->disconnect();
            // verificacion de que haya realizado cambios

            if (!$result) {
                throw new Exception("No se guardo la informacion del producto en la vennta : factura-> $billID id:$productID  $result");
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
        $this->sql = "";

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
// echo json_encode($bill->getBillId());
// echo json_encode($prueba->fetchAllbillsByDate("2025-04-26"));
?>