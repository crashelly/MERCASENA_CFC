<?php 
// incluimos la clase padre DB
include_once 'db.php';

/**
 *  clase modelo de la tabla productos_PesoVenta
 *  
 */
class TestModel extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_PesoVenta .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
     
        // $this->connect(); 
        // $this->sql = "SELECT FROM "; //asigna la query
        // $this->query = $this->conn->prepare($this->sql);
        // $this->query->execute();
        
        // return $this->query->fetchAll();
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
*  crea datos dentro de la tabla productos  .
* @param  array $data arreglo asociativo [
*       "nombre" => "nombre del producto  ",
*       "existencias" => existencias ",
        "precio" => "precio producto",
        "prodMed"  =>   "foranea de medidaVenta",
        "cantidad" => "cantidad de la que se vende,
        "tamaño" => "tamaño del producto",
        "fechaExpiracion" => "fecha de expiracion del producto",	
        "prodPes" => "foranea de pesoVenta",
        "caducidad" => "fecha de caducidad del producto",
        "prodE_id" => "foreanea de la tabla estado",
        "prodCat_id" => "foranea de la tabla categorias"
* ]
* @throws Exception No se creo el PesoVenta del producto
*/
    public  function insert(array $data){
        $this->connect();
       
        $name = $data['nombre']; // nombre medida
        $stock = $data['existencias']; // la medida en numero de ese valor
        $price = $data['precio']; // precio producto
        $measureForeignKey = $data['prodMed']; // foranea de medidaVenta
        $sellQuantity = $data['cantidad']; // cantidad de la que se vende
        $size = $data['tamaño']; // tamaño del producto
        $expirationDate = $data['fechaExpiracion']; // fecha de expiracion del producto
        $weightForeignKey = $data['prodPes']; // foranea de pesoVenta
        $expiryDate = $data['caducidad']; // fecha de caducidad del producto
        $statusForeignKey = $data['prodE_id']; // foranea de la tabla estado
        $categoryForeignKey = $data['prodCat_id']; // foranea de la tabla categorias
        // sentencia SQL
        $this->sql = "CALL Crear_producto(:name,:stock,:price,:measureForeignKey,:sellQuantity,:size,:expirationDate,:weightForeignKey,:expiryDate,:statusForeignKey,:categoryForeignKey)";
 
        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        $this->query->bindParam(':name', $name, PDO::PARAM_STR);
        $this->query->bindParam(':stock', $stock, PDO::PARAM_INT);
        $this->query->bindParam(':price', $price, PDO::PARAM_STR);
        $this->query->bindParam(':measureForeignKey', $measureForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':sellQuantity', $sellQuantity, PDO::PARAM_INT);
        $this->query->bindParam(':size', $size, PDO::PARAM_STR);
        $this->query->bindParam(':expirationDate', $expirationDate, PDO::PARAM_STR);
        $this->query->bindParam(':weightForeignKey', $weightForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':expiryDate', $expiryDate, PDO::PARAM_STR);
        $this->query->bindParam(':statusForeignKey', $statusForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':categoryForeignKey', $categoryForeignKey, PDO::PARAM_INT);
        // echo $this->query->queryString;
        $result = $this->execParamQuery(); 
        $this->disconnect();
        // verificacion de que haya realizado cambios


        if (!$result){
            throw  new Exception("No se creo  la nueva medida del peso del producto");
        }
    }
    /**
    * actualiza datos dentro de la tabla productos_PesoVenta
    * @param  string $id id de la PesoVenta producto
    * @param  array $data arreglo asociativo 
    * [
    *    "nombre" => "huevo",
*   "existencias" => 100,
* "precio" => 600,
*     "prodMed"  =>   "4",
*     "cantidad" => 30,
*     "tamaño" => "AAA",
*     "fechaExpiracion" => "2025-03-24",
*    "prodPes" => "1",
*     "caducidad" => "2025-03-24",
*     "prodE_id" => "7",
*    "prodCat_id" => "9"
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect();
        // 
        $name = $data['nombre']; // nombre medida
        $stock = $data['existencias']; // la medida en numero de ese valor
        $price = $data['precio']; // precio producto
        $measureForeignKey = $data['prodMed']; // foranea de medidaVenta
        $sellQuantity = $data['cantidad']; // cantidad de la que se vende
        $size = $data['tamaño']; // tamaño del producto
        $expirationDate = $data['fechaExpiracion']; // fecha de expiracion del producto
        $weightForeignKey = $data['prodPes']; // foranea de pesoVenta
        $expiryDate = $data['caducidad']; // fecha de caducidad del producto
        $statusForeignKey = $data['prodE_id']; // foranea de la tabla estado
        $categoryForeignKey = $data['prodCat_id']; // foranea de la tabla categorias
        // sentencia SQL
        $this->sql = "CALL actualizar_producto(:id,:name,:stock,:price,:measureForeignKey,:sellQuantity,:size,:expirationDate,:weightForeignKey,:expiryDate,:statusForeignKey,:categoryForeignKey)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam('id', $id, PDO::PARAM_STR);
        $this->query->bindParam(':name', $name, PDO::PARAM_STR);
        $this->query->bindParam(':stock', $stock, PDO::PARAM_INT);
        $this->query->bindParam(':price', $price, PDO::PARAM_STR);
        $this->query->bindParam(':measureForeignKey', $measureForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':sellQuantity', $sellQuantity, PDO::PARAM_INT);
        $this->query->bindParam(':size', $size, PDO::PARAM_STR);
        $this->query->bindParam(':expirationDate', $expirationDate, PDO::PARAM_STR);
        $this->query->bindParam(':weightForeignKey', $weightForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':expiryDate', $expiryDate, PDO::PARAM_STR);
        $this->query->bindParam(':statusForeignKey', $statusForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':categoryForeignKey', $categoryForeignKey, PDO::PARAM_INT);
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios p actualizaciones ");
        }
    }

    /**
     * Elimina datos de la tabla productos_PesoVenta
     * @param mixed $id id del producto_PesoVenta
     * 
     * @throws  Exception no se elimino la medida del producto
     */
    public  function delete(string $id){
        $this->connect();
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


$prueba = new OrderHasProducts();
// $prueba->products = [
//     [
//         "subCat_id" => 1,
//         "precioParcial" => 100.00,
//         "cantidad" => 2
//     ],
//     [
//         "subCat_id" => 2,
//         "precioParcial" => 150.00,
//         "cantidad" => 1
//     ],
//     [
//         "subCat_id" => 3,
//         "precioParcial" => 200.00,
//         "cantidad" => 3
//     ]
// ];
// $prueba->orderID = "ped_2023-10-12_1.0";
// $newJSONData = $prueba->inyectDataInOrder();

// $prueba->insert($newJSONData);
$prueba->setOrderID("ped_2025-04-25_680abc9a171255.74953468");
// // echo json_encode($newJSONData);

$data = '[
    {
        "id": 27,
        "quantity": "5",
        "partialTotalPrice": "10000"
    },
    {
        "id": 26,
        "quantity": "3",
        "partialTotalPrice": "300000"
    },
    {
        "id": 22,
        "quantity": "2",
        "partialTotalPrice": "20000"
    },
    {
        "id": 30,
        "quantity": "3",
        "partialTotalPrice": "6000"
    }
]';


$newData = [
    [
        "id" => 26,
        "quantity" => "3",
        "partialTotalPrice" => "6000"
    ],
    [
        "id" => 22,
        "quantity" => "3",
        "partialTotalPrice" => "6000"
    ],
    [
        "id" => 30,
        "quantity" => "3",
        "partialTotalPrice" => "6000"
    ]

];
$newData = json_decode($data, true);
// print_r(json_decode($data, true));
// $prueba->insert(json_decode($data,true)); 
// $prueba->insert($newData);
$lsData = [];
foreach ($newData as $item => $product) {
    try {
        $obj = [
            "id" => $product['id'],
            "quantity" => $product['quantity'],
            "partialTotalPrice" => $product['partialTotalPrice']
        ];
        // print_r("id is " . $obj['id'] . " quantity is " . $obj['quantity'] . " partialTotalPrice is " . $obj['partialTotalPrice'] . "\n");
    
       
   
        // print_r($obj);
        $lsData[]= $obj;
    } catch (Exception $e) {
        print_r($e->getMessage() . "\n");
    }
   
}
$prueba->insert($lsData);
?>
