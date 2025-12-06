<?php 
// incluimos la clase padre DB
include_once 'db.php';

/**
 *  clase modelo de la tabla usuario
 *  
 */
class TestModely extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla usuario .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
     
        $this->connect(); 
        $this->sql = "SELECT * FROM usuario"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        return $this->query->fetchAll();
    }

    /**
     * solo puede haber una miniatura por producto
     * selecciona la miniatura y trae la informacion de ella
     * @return array
     * 
     */
    public function fetchMiniature(string $idProducto){
        $this->connect(); 
        $this->sql = "SELECT * FROM usuario WHERE prodImg_miniatura = 1 AND prod_id = :idProducto LIMIT 1";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();
        
//  devuelve los datos
        return $this->query->fetchALL();
    }
/**
     * solo puede haber una miniatura por producto
     * selecciona todas las fotos de un producto
     * @param string $type "info" para obtener la informacion de la imagen, "showShopImages" para obtener todas las imagenes de un producto
     * @param $idProducto es la id de la imagen
     * @return array
     * 
     */
    public function fetchImages(string $idProducto, string $type ){

        // dependiendo el tipo de busqyeda se selecciona la query
        // ya que por temas de rendimientos se hace esto
        $this->sql = match ($type) {
            'info' => "SELECT * FROM usuario WHERE prod_id = :idProducto",
            'showShopImages' =>"SELECT prodImg_ruta FROM usuario WHERE prod_id = :idProducto",
            default => throw new InvalidArgumentException("el tipo de busqueda no existe"),    
        };
        $this->connect(); 
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();
        
//  devuelve los datos
        return $this->query->fetchAll();
    }


/**
 * selecciona Kevin solo un registro que se le indique de la base de datos
 * @param  string id
 * @return array arreglo asociativo con los datos
 * @throws Exception No se encontraron datos
 * 
 */
    public function selectOne( string $id){
            $this->connect(); 
            $this->sql = "SELECT * FROM usuario WHERE  prodMed_id= :id"; 
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
*       "correo" => "correo",
*       "nombre" => "nombre" ",
        "direccion" => "precio producto",
        "telefono"  =>   "foranea de medidaVenta",
        "NIT" => "cantidad de la que se vende,
        "tipoUsr" => "tamaño del producto",
        "contraseña" => "fecha de expiracion del producto",	
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
    * actualiza datos dentro de la tabla usuario
    * @param  string $id id de la imagen
    * @param  array $data arreglo asociativo 
    * ["prodImg_ruta" => "ruta de la imagen en el servidor","prod_id"=>"producto del cual se basa la imagen","prodImg_miniatura" => "confirmacion de que esa sera la miniatura del producto"]
    * @throws Exception No se realizaron cambios ni actualizaciones
    */
    public function update(string $id,array $data){
        $this->connect();
          // variables 
        $path = $data['prodImg_ruta']; // ruta imagen 
        $prodId = $data['prod_id']; // id del producto en el que se base la imagen
        $BoolMiniature = $data['prodImg_miniatura']; // confirmacion de que esa sera la miniatura del producto
        $this->sql = "CALL actualizar_producto_imagen(:prodImg_id,:path,:prodId,:BoolMiniature)";
  
        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':path', $path, PDO::PARAM_STR);
        $this->query->bindParam(':prodImg_id', $id, PDO::PARAM_STR);
        $this->query->bindParam(':prodId', $prodId, PDO::PARAM_STR);
        $this->query->bindParam(':BoolMiniature', $BoolMiniature, PDO::PARAM_INT);
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ni actualizaciones ");
        }
    }

    /**
     * Elimina datos de la tabla usuario
     * @param mixed $id id del producto_imagen
     * 
     * @throws  Exception no se elimino la imagen
     */
    public  function delete(string $id){
        $this->connect();
        $this->sql = "CALL eliminar_producto_imagen(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("no se elimino la imagen ");
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