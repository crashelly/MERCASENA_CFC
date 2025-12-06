<?php
// incluimos la clase padre DB
include_once dirname(__DIR__) . '/db.php';

/**
 *  clase modelo de la tabla productos_imagenes
 *  
 */
class ProductImage extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_imagenes .
     * @return array arreglo asociativo con los datos
     */
    public function select()
    {

        $this->connect();
        $this->sql = "SELECT * FROM productos_imagenes"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetchAll();
    }

    /**
     * solo puede haber una miniatura por producto
     * selecciona la miniatura y trae la informacion de ella
     * @return array
     * @param $idProducto es la id de la imagen
     */
    public function fetchMiniature(string $idProducto)
    {
        $this->connect();
        $this->sql = "SELECT * FROM productos_imagenes WHERE prodImg_miniatura = 1 AND prod_id = :idProducto LIMIT 1";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();

        //  devuelve los datos
        return $this->query->fetchALL();
    }
    // * solo puede haber una miniatura por producto
    /**

         * selecciona todas las fotos de un producto
         * @param $idProducto es la id de la imagen
         * @param string $type "info" para obtener la informacion de la imagen, "showShopImages" para obtener todas las imagenes de un producto
         * @return array
         * 
         */
    public function fetchImages(string $idProducto, string $type)
    {

        // dependiendo el tipo de busqyeda se selecciona la query
        // ya que por temas de rendimientos se hace esto
        $this->sql = match ($type) {
            'info' => "SELECT * FROM productos_imagenes WHERE prod_id = :idProducto",
            'showShopImages' => "SELECT prodImg_ruta FROM productos_imagenes WHERE prod_id = :idProducto",
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
     * selecciona solo un registro que se le indique de la base de datos
     * @param  string id
     * @return array arreglo asociativo con los datos
     * @throws Exception No se encontraron datos
     * 
     */
    public function selectOne(string $id)
    {
        $this->connect();
        $this->sql = "SELECT * FROM productos_imagenes WHERE  prodMed_id= :id";
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

    public function checkLastProduct()
    {
        $this->connect();
        $this->sql = "SELECT subCat_id   FROM productos_subcategorias  ORDER BY subCat_id DESC LIMIT 1";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        return $this->query->fetch(PDO::FETCH_ASSOC);
    }

    /**
     *  crea datos dentro de la tabla productos_imagenes .
     * @param  array $data arreglo asociativo ["prodImg_ruta" => "ruta de la imagen en el servidor","subCat_id"=>"producto del cual se basa la imagen","prodImg_miniatura" => "confirmacion de que esa sera la miniatura del producto"]
     * @throws Exception No se guardo la imagen del producto
     */
    public function insert(array $data)
    {

        $this->connect(true);

        // variables 
        $path = $data['prodImg_ruta']; // ruta imagen 
        $prodId = $data['subCat_id']; // id del producto en el que se base la imagen
        $BoolMiniature = $data['prodImg_miniatura']; // confirmacion de que esa sera la miniatura del producto
        $this->sql = "CALL crear_producto_imagen(:path,:prodId,:BoolMiniature)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':path', $path, PDO::PARAM_STR);
        $this->query->bindParam(':prodId', $prodId, PDO::PARAM_STR);
        $this->query->bindParam(':BoolMiniature', $BoolMiniature, PDO::PARAM_INT);

        $result = $this->execParamQuery();
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result) {
            throw new Exception("No se guardo la imagen del producto");
        }
    }
    /**
     * actualiza datos dentro de la tabla productos_imagenes
     * @param  string $id id de la imagen
     * @param  array $data arreglo asociativo 
     * ["prodImg_ruta" => "ruta de la imagen en el servidor","prod_id"=>"producto del cual se basa la imagen","prodImg_miniatura" => "confirmacion de que esa sera la miniatura del producto"]
     * @throws Exception No se realizaron cambios ni actualizaciones
     */
    public function update(string $id, array $data)
    {
        $this->connect(true);
        // variables 
        $path = $data['prodImg_ruta']; // ruta imagen 
        // $path = $data['prodImg_id']; // ruta imagen 
        $BoolMiniature = $data['prodImg_miniatura']; // confirmacion de que esa sera la miniatura del producto
        $this->sql = "CALL actualizar_producto_imagen(:prodImg_id,:path,:BoolMiniature)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':path', $path, PDO::PARAM_STR);
        $this->query->bindParam(':prodImg_id', $id, PDO::PARAM_STR);

        $this->query->bindParam(':BoolMiniature', $BoolMiniature, PDO::PARAM_INT);
        $result = $this->execParamQuery();
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("No se realizaron cambios ni actualizaciones ");
        }
    }

    /**
     * extrae el id de la imagen apartir del ultimo producto actualizado
     *
     * 
     */
    public function extractProdImgID()
    {
        $this->connect(true);
        $this->sql = "CALL extraerIdImagen()";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        $data =  $this->query->fetch(PDO::FETCH_ASSOC);

        // aca retornamos el id del la foto
        return  $data['id'];
    }
    /**
     * Elimina datos de la tabla productos_imagenes
     * @param mixed $id id del producto_imagen
     * 
     * @throws  Exception no se elimino la imagen
     */
    public function delete(string $id)
    {
        $this->connect();
        $this->sql = "CALL eliminar_producto_imagen(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se elimino la imagen ");
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

// $iamge = new ProductImage();
// echo $iamge->extractProdImgID();
// $iamge->checkLastProduct();

// echo json_encode($iamge->checkLastProduct());

// $iamge->insert([
//     "subCat_id" => 22,
//     "prodImg_ruta" => "ruta",
//     "prodImg_miniatura" => 1
// ]);