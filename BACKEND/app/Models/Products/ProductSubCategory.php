<?php
// incluimos la clase padre DB
// include_once 'C:\xampp\htdocs\MERCASENA\app\Models\db.php';
include_once dirname(__DIR__) . '/db.php';
/**
 *  clase modelo de la tabla productos_subcategorias
 *  
 */
// CARGAMOS EL COMPONNETE PARA LEER LAS VARIABLES GLOBAALES
require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 3));
$dotenv->load();

class ProductSubCategory extends DB
{

    private $serverIp = 'http://192.168.1.34';


    // ======= METODOS CRUD ========================
    private function setIp()
    {
        $this->serverIp = $_ENV['IP_ADRESS'];
    }


    /**
     * crea datos dentro de la tabla productos_subcategorias .
     * @return array arreglo asociativo con los datos
     */


    public function select()
    {

        $this->connect();
        $this->sql = "SELECT * FROM productos_subcategorias"; //asigna la query
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
        $this->sql = "SELECT * FROM productos_subcategorias WHERE prodImg_miniatura = 1 AND prod_id = :idProducto LIMIT 1";
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
            'info' => "SELECT * FROM productos_subcategorias WHERE prod_id = :idProducto",
            'showShopImages' => "SELECT prodImg_ruta FROM productos_subcategorias WHERE prod_id = :idProducto",
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
     * muestra los prodcutos con bajo estock o agotados
     *
 * 
 */
    public function fetchLowAndZeroProducts()
    {
        $this->connect(true);
        $this->sql = "select * from productosagotadosybajostock ;";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        //  devuelve los datos
        return $this->query->fetchALL(PDO::FETCH_ASSOC);
    }
    /**
     * 
     *
     * muestra un contador que dice que cantidad de productos hay con stock bajo
     *
     * @return void
     */
    public function countLowOrOutStockProducts()
    {
        $this->connect(true);
        $this->sql = "select * from notificacionescounter;";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        //  devuelve los datos
        return $this->query->fetchALL(PDO::FETCH_ASSOC);
    }

    
    /**
     * obtiene los productos por su nombre
     * @param string $name
     * @throws \Exception
     * @return array 
     *
     */
    public function fetchProductsByName(string $name)
    {
        // seneamos para crear dentro de la variable los pares
        $newName = '%' . $name . '%';
        $this->connect();
        $this->sql = "  SELECT 
    ps.subCat_id as id,
    ps.subCat_nombre as subCategoria,
    ps.subCat_precio * ps.prodCat_Cantidad as precio,
    p.prod_nombre as nombre,
    mv.prodMed_medida as factor,
    mv.prodMed_medida as medidaVenta,
    pi.prodImg_ruta as rutaImagen,
    ps.subCat_existencias as existencias,
    pe.prodE_estado as estado,
    pe.prodE_id as estadoID
    

FROM 
    productos_subcategorias ps 
INNER JOIN 
    productos p ON ps.prod_id = p.prod_id
INNER JOIN 
    productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
INNER JOIN  
	productos_categoria pc on ps.prodCat_id = pc.prodCat_id
INNER JOIN 
    productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
INNER JOIN 
	productos_estado pe ON ps.prodE_id = pe.prodE_id
WHERE 
    ps.subCat_nombre like :name  OR p.prod_nombre  like :name  AND  pi.prodImg_miniatura = 1;
"; ////asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':name', $newName, PDO::PARAM_STR);
        $this->query->execute();

        $dataDb = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $data = [];
        // inyectamos la ip del servidor :V
        foreach ($dataDb as $item => $product) {
            # code...
            $product['rutaImagen'] = $this->serverIp . $product['rutaImagen'];
            $product['subCategoria'] == 'default' ? $product['subCategoria'] = '' : '';
            //    agregamos en el nuevo arreglo los productos cn la imagen ya inyectada
            $data[] = $product;
        }

        // si no encuentra los datos devuelve que no los encontro
        if (empty($data)) {
            throw new Exception("No se encontraron datos para esta categoria  ");
        }
        return $data;


    }

    public function fetchProductInfo($prodID)
    {
        $this->connect(true);
        $this->sql = "CALL  obtenerInformacionProductoEdicion(:prodID)"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':prodID', $prodID, PDO::PARAM_STR);
        $this->query->execute();
        $newData = [];


        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        foreach ($data as $subArr => $product) {
            $product['rutaImagen'] = $this->serverIp . $product['rutaImagen'];
            $product['variacion'] == 'default' ? $product['variacion'] = '' : '';

            // print_r($product);
            $newData[] = $product;
        }

        return $newData;
    }

/**
 * vuelve visible el producto para la tienda 
 */
    // 
    public function makeVisible($data)
    {
        $id= $data['id'];
        // ternaria que analiza si state es true  o false y guarda el dato
        // $state ==  true  ? $state = 1 :$state = 0;  
        $this->connect(true);
        $this->sql = "update productos_subcategorias ps
SET ps.subCat_visible = 1 
WHERE subCat_id = :id";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        // $this->query->bindParam(':state', $state, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se volvio visible o ");
        }
    }
    /**
 * vuelve invisiblwe el producto para la tienda de lmercasena
 */
    public function makeInvisible($data)
    {
        $id= $data['id'];
        // ternaria que analiza si state es true  o false y guarda el dato
        // $state ==  true  ? $state = 1 :$state = 0;  
        $this->connect(true);
        $this->sql = "update productos_subcategorias ps
SET ps.subCat_visible = 0 
WHERE subCat_id = :id";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        // $this->query->bindParam(':state', $state, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se volvio visible o ");
        }
    }
    /**
     * obtiene informacion de los productos para el admin
     */

    public function fetchProductsInfoForAdmin()
    {

        $this->connect();
        $this->sql = "  SELECT 
ps.subCat_id as id,
ps.subCat_nombre as subCategoria,
ps.subCat_precio * ps.prodCat_Cantidad as precio,
p.prod_nombre as nombre,
mv.prodMed_medida as medidaVenta,
pi.prodImg_ruta as rutaImagen,
ps.prodCat_Cantidad as cantidad,
ps.subCat_existencias as existencias,
pe.prodE_estado as estado,
pe.prodE_id as estadoID,
ps.subCat_visible  as esVisible

FROM 
productos_subcategorias ps 
INNER JOIN 
productos p ON ps.prod_id = p.prod_id
INNER JOIN 
productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
INNER JOIN  
productos_categoria pc on ps.prodCat_id = pc.prodCat_id
INNER JOIN 
productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
INNER JOIN productos_estado pe  ON ps.prodE_id = pe.prodE_id
WHERE 
 pi.prodImg_miniatura = 1 ;
"; ////asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $datos = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($datos as $subArr => $product) {
            $product['rutaImagen'] = $this->serverIp . $product['rutaImagen'];
            $product['subCategoria'] == 'default' ? $product['subCategoria'] = '' : '';

            // print_r($product);
            $newData[] = $product;
        }
        //  print_r($data.'<br>');

        // si no encuentra los datos devuelve que no los encontro
        if (empty($newData)) {
            throw new Exception("No se encontraron datos $newData");
        }
        return $newData;
    }
    /**
     * se trae todos los productos de la base de datos
     */
    public function fetchAllProducts()
    {
        $this->connect();
        $this->sql = "SELECT prod_id  as id , prod_nombre as nombre FROM productos"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
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
        $this->sql = "SELECT * FROM productos_subcategorias WHERE  prodMed_id= :id";
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
     * 
     * devuelve los datos  de los  DANIEL productos por categorias
     * @param string $category_id id de la categoria de la cual consultar los producto
     * @return array  datos del producto
     * @throws Exception No se encontraron datos
     */
    public function fetchByCategory(string $category_id)
    {

        $this->connect();

        $this->sql = "CALL obtenerProductosPorCategoria(:category_id)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':category_id', $category_id, PDO::PARAM_STR);
        $this->query->execute();

        $dataDb = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $data = [];
        // inyectamos la ip del servidor :V
        foreach ($dataDb as $item => $product) {
            # code...
            $product['rutaImagen'] = $this->serverIp . $product['rutaImagen'];
            $product['subCategoria'] == 'default' ? $product['subCategoria'] = '' : '';

            //    agregamos en el nuevo arreglo los productos cn la imagen ya inyectada
            $data[] = $product;
        }

        // si no encuentra los datos devuelve que no los encontro
        if (empty($data)) {
            throw new Exception("No se encontraron datos para esta categoria  ");
        }
        return $data;
    }

    public function fetchAllInformation()
    {
        $this->connect();
        $this->sql = "SELECT
-- ids
ps.subCat_id as productoID,
ps.prod_id as productoPadreID,
ps.prodE_id as estadoID,
ps.prodCat_id as categoriaID,
ps.prodMed_id as medidaID,
-- los demas datos
-- de la tabla de productos_subcategorias
ps.subCat_nombre as variacion,
ps.subCat_existencias as existencias,
ps.subCat_precio as precio,
ps.prodCat_descripcion as descripcion,
pc.prodCat_categoria as categoria,
pc.prodCat_fechaCreacion as fechaCreacion,

p.prod_nombre as producto,
pm.prodMed_medida as medidaVenta,
pe.prodE_estado as estado,
pi.prodImg_ruta as imagen,
ps.subCat_visible as esVisible





FROM productos_subcategorias ps
INNER JOIN productos p ON ps.prod_id = p.prod_id
INNER JOIN productos_medidaventa  pm ON ps.prodMed_id = pm.prodMed_id
INNER JOIN productos_estado pe on ps.prodE_id =pe.prodE_id
INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id 
INNER JOIN productos_imagenes pi ON ps.subCat_id = pi.subCat_id ORDER BY ps.subCat_fechaCreacion DESC";

        // $this->sql = "CALL obtenerInformacionProductos()";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($data as $subArr => $product) {
            $product['imagen'] = $this->serverIp . $product['imagen'];
            $product['variacion'] == 'default' ? $product['variacion'] = '' : '';

            // print_r($product);
            $newData[] = $product;
        }
        //  print_r($data.'<br>');
        return $newData;
    }

    /**
     * obtiene informacionsobre el stock minimo de un producto 
     * @param string $prodID id del producto
     * @return array datos del producto
     * @throws Exception No se encontraron datos con ese producto
     */
    public function fetchMinimalStockInfo($prodID)
    {

        $this->connect(true);
        $this->sql = "CALL obtenerInfoProductMinInfo(:prodID)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':prodID', $prodID, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        if (empty($data)) {
            throw new Exception("No se encontraron datos con ese producto");
        } else {
            return $data;
        }
    }
    public function updateMinimalStock($product)
    {


        $prodID = $product['id'];
        $minStock = $product['minStock'];
        $this->connect(true);
        $this->sql = "CALL actualizarMinStockParaAlerta(:productID,:minStock);";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':productID', $prodID, PDO::PARAM_STR);
        $this->query->bindParam(':minStock', $minStock, PDO::PARAM_STR);

        $result = $this->execParamQuery();
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("No se realizaron cambios a la alerta de bajo stock ");
        }
    }

    /**
     * obtiene informacion de los productos para la tienda
     */

    public function fetchProductsInfoForShop()
    {

        $this->connect();
        $this->sql = "  SELECT 
ps.subCat_id as id,
ps.subCat_nombre as subCategoria,
ps.subCat_precio * ps.prodCat_Cantidad as precio,
p.prod_nombre as nombre,
mv.prodMed_medida as medidaVenta,
pi.prodImg_ruta as rutaImagen,
ps.prodCat_Cantidad as cantidad,
ps.subCat_existencias as existencias,
pe.prodE_estado as estado,
pe.prodE_id as estadoID

FROM 
productos_subcategorias ps 
INNER JOIN 
productos p ON ps.prod_id = p.prod_id
INNER JOIN 
productos_medidaventa mv ON ps.prodMed_id = mv.prodMed_id 
INNER JOIN  
productos_categoria pc on ps.prodCat_id = pc.prodCat_id
INNER JOIN 
productos_imagenes pi ON ps.subCat_id = pi.subCat_id 
INNER JOIN productos_estado pe  ON ps.prodE_id = pe.prodE_id
WHERE 
 pi.prodImg_miniatura = 1 AND ps.subCat_visible = 1;
"; ////asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $datos = $this->query->fetchAll(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($datos as $subArr => $product) {
            $product['rutaImagen'] = $this->serverIp . $product['rutaImagen'];
            $product['subCategoria'] == 'default' ? $product['subCategoria'] = '' : '';

            // print_r($product);
            $newData[] = $product;
        }
        //  print_r($data.'<br>');

        // si no encuentra los datos devuelve que no los encontro
        if (empty($newData)) {
            throw new Exception("No se encontraron datos $newData");
        }
        return $newData;
    }
    /**
    *  crea datos dentro de la tabla productos_subcatorias  .
    * @param  array $data arreglo asociativo [
    *       "nombre" => "nombre del producto  ",
            "prod_id" => "foranea de la tabla productos",
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

    public function insert(array $data)
    {
        $this->connect(true);
        //    terniaria que si no encuentran el valor lo ponene en ""
        $measureForeignKey = empty($data['prodMed']) ? null : $data['prodMed'];
        $productForeignKey = empty($data['prod_id']) ? 1 : $data['prod_id'];
        $categoryForeignKey = empty($data['prodCat_id']) ? null : $data['prodCat_id'];
        $statusForeignKey = empty($data['prodE_id']) ? null : $data['prodE_id'];
        $weightForeignKey = empty($data['prodPes']) ? null : $data['prodPes'];
        $expirationDate = empty($data['fechaExpiracion']) ? null : $data['fechaExpiracion'];
        // $expiryDate   = empty($data['caducidad']) ? null : $data['caducidad'];
        $sellQuantity = empty($data['cantidad']) ? null : $data['cantidad'];
        $name = empty($data['nombre']) ? "default" : $data['nombre']; // nombre medida
        $stock = empty($data['existencias']) ? null : $data['existencias'];
        $price = empty($data['precio']) ? null : $data['precio'];
        $description = empty($data['descripcion']) ? null : $data['descripcion'];
        // sentencia SQL
        $this->sql = "CALL crear_producto_subcategoria(:prodId,:name,:stock,:price,:measureForeignKey,:sellQuantity,:description,:expirationDate,:weightForeignKey,:statusForeignKey,:categoryForeignKey)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);


        $this->query->bindParam(':prodId', $productForeignKey, PDO::PARAM_STR);
        $this->query->bindParam(':name', $name, PDO::PARAM_STR);
        $this->query->bindParam(':stock', $stock, PDO::PARAM_INT);
        $this->query->bindParam(':price', $price, PDO::PARAM_STR);
        $this->query->bindParam(':measureForeignKey', $measureForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':sellQuantity', $sellQuantity, PDO::PARAM_INT);
        $this->query->bindParam(':description', $description, PDO::PARAM_STR);
        $this->query->bindParam(':expirationDate', $expirationDate, PDO::PARAM_STR);
        $this->query->bindParam(':weightForeignKey', $weightForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':statusForeignKey', $statusForeignKey, PDO::PARAM_INT);
        $this->query->bindParam(':categoryForeignKey', $categoryForeignKey, PDO::PARAM_INT);
        // echo $this->query->queryString;
        $result = $this->execParamQuery();
        $this->disconnect();
        // verificacion de que haya realizado cambios


        if (!$result) {
            throw new Exception("No se creo  el producto con subcategoria $result ");
        }
    }
    /**
     * actualiza datos dentro de la tabla productos_subcategorias
     * @param  string $id id de la imagen
     * @param  array $data arreglo asociativo 
     * ["prod_id"=>"producto del cual se basa la imagen","subCat_categoria"=>"categoria del producto"]
     * @throws Exception No se realizaron cambios ni actualizaciones
     */
    public function update(string $id, array $data)
    {
        $this->connect(true);
        // $variant = $data['variacion'] || 'default';
        $variant = $data['variacion'] != null ? $variant = $data['variacion'] : $variant = 'default';
        $this->sql = "CALL actualizar_producto_subcategoria(:subCat_id,:prodId,:variante,:stock,:precio,:medida,:subCat_categoria)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam('subCat_id', $id, PDO::PARAM_STR);
        $this->query->bindParam(':prodId', $data['prod_id'], PDO::PARAM_STR);
        $this->query->bindParam(':variante', $variant, PDO::PARAM_STR);
        $this->query->bindParam(':stock', $data['stock'], PDO::PARAM_INT);
        $this->query->bindParam(':precio', $data['precio'], PDO::PARAM_STR);
        $this->query->bindParam(':medida', $data['medida'], PDO::PARAM_STR);
        $this->query->bindParam(':subCat_categoria', $data['categoria'], PDO::PARAM_STR);

        $result = $this->execParamQuery();
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("No se realizaron cambios ni actualizaciones $result ");
        }
    }

    /**
     * recarga el inventario diario de un producto
     * @param array $data array asociativo
     * [
     *      "id" => id del producto,
     *      "prodName" => nombre del producto,
     *      "observation" => observaciones sobre el producto,
     *      "oldQuantity" => cantidad antigua del producto,
     *      "newQuantity" => cantidad nueva del producto
     * ]
     * @throws Exception succedio algo al actualizar el inventairio
     */
    public function rechargeInventary(array $data)
    {
        // variables
        $id = $data['id'];
        $prodName = $data['prodName'];
        $observation = $data['observation'];
        $oldQuantity = $data['oldQuantity'];
        $newQuantity = $data['newQuantity'];
        $totalQuantity = $oldQuantity + $newQuantity;

        // $id = '74';
        // $prodName = 'LULO';
        // $observation = 'PRobando el modelo que no funciona';
        // $oldQuantity = '12';
        // $newQuantity = '12';
        // $totalQuantity = $oldQuantity + $newQuantity;

        $this->connect(true);
        $this->sql = "CALL crear_inventario_diario(:idProd,:prodName,:observation,:oldQuantity,:newQuantity,:totalQuantity);";

        $this->query = $this->conn->prepare($this->sql);

        $this->query->bindParam(':idProd', $id, PDO::PARAM_STR);
        $this->query->bindParam(':prodName', $prodName, PDO::PARAM_STR);
        $this->query->bindParam(':observation', $observation, PDO::PARAM_STR);
        $this->query->bindParam(':oldQuantity', $oldQuantity, PDO::PARAM_STR);
        $this->query->bindParam(':newQuantity', $newQuantity, PDO::PARAM_STR);
        $this->query->bindParam(':totalQuantity', $totalQuantity, PDO::PARAM_STR);
        $result = $this->execParamQuery();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("succedio algo al actualizar el inventario $result ");
        }

    }
    /**
     * Elimina datos de la tabla productos_subcategorias
     * @param mixed $id id de la subcategoria del producto
     * 
     * @throws  Exception no se la subcategoria del producto
     */
    public function delete(string $id)
    {
        $this->connect(true);
        $this->sql = "CALL eliminar_producto_subcategoria(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se elimino la suibcategoria del priducto ");
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

?>