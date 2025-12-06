<?php 
// incluimos la clase padre DB
include_once dirname(__DIR__).'/db.php';

/**
 *  clase modelo de la tabla productos_medidaVenta
 *  
 */
class ProductMeasurement extends DB
{



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla productos_medidaVenta .
     * @return array arreglo asociativo con los datos
     */
    public function select(){
     
        $this->connect(); 
        $this->sql = "SELECT * FROM productos_medidaVenta"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        
        return $this->query->fetchAll();
    }

    
public function fetchAllMeasurements(){
    $this->connect(); 
    $this->sql = "SELECT prodMed_id as id,prodMed_medida as nombre ,prodMed_fechaCreacion as fechaCreacion ,prodMed_factor as factor  FROM productos_medidaventa ORDER BY prodMed_fechaCreacion DESC"; //asigna la query
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
    public function fetchById( string $id){
            $this->connect(); 
            $this->sql = "SELECT prodMed_id as id,prodMed_medida as medida , prodMed_factor as factor FROM productos_medidaventa WHERE  prodMed_id= :id"; 
            $this->query = $this->conn->prepare($this->sql);
            $this->query->bindParam(':id', $id, PDO::PARAM_STR);
            $this->query->execute();
            

            $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
            // verificacion de que se encontraron datos
            if (empty($data)){
                throw new Exception("No se encontraron datos o la medida no existe");
            }else{
                return $data;
            }
    }

/**
*  crea datos dentro de la tabla productos_medidaVenta .
* @param  array $data arreglo asociativo ["prodMed_medida" => "nombre o tipo de medida"]
* @throws Exception No se creo el medidaVenta del producto
*/
    public  function insert(array $data){
        $this->connect(true);
        $Measurement = $data['prodMed_medida']; // nueva medida
        $factorMeasurement = $data['prodMed_factor']; // factor de la medida
        // sentencia SQL
        $this->sql = "CALL 	Crear_producto_medidaVenta(:Measurement,:factorMeasurement)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':Measurement', $Measurement, PDO::PARAM_STR);
        $this->query->bindParam(':factorMeasurement', $factorMeasurement, PDO::PARAM_STR);
        $result = $this->execParamQuery(); 
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result){
            throw  new Exception("No se creo  la nueva medida del producto");
        }
    }


    /**
    * actualiza datos dentro de la tabla productos_medidaVenta
    * @param  string $id id de la medidaVenta producto
    * @param  array $data arreglo asociativo 
    * [
    *   "nuevaMedida" => "nombre de la medida Venta"
    * ]
    * @throws Exception No se realizaron cambios
    */
    public function update(string $id,array $data){
        $this->connect(true);
        $Measurement = $data['nuevaMedida'];
        $factorMeasurement = $data['prodMed_factor'];
        // sentencia SQL
        $this->sql = "CALL actualizar_producto_medidaventa(:id,:nuevaMedida,:factorMeasurement)";

        // esconde los parametros
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':nuevaMedida', $Measurement, PDO::PARAM_STR);
        $this->query->bindParam(':factorMeasurement', $factorMeasurement, PDO::PARAM_STR);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();

        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("No se realizaron cambios ");
        }
    }

    /**
     * Elimina datos de la tabla productos_medidaVenta
     * @param mixed $id id del producto_medidaVenta
     * 
     * @throws  Exception no se elimino la medida del producto
     */
    public  function delete(string $id){
        $this->connect(true);
        $this->sql = "CALL eliminar_producto_medidaVenta(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute(); 
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False){
            throw  new Exception("no se elimino la medida del producto ");
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