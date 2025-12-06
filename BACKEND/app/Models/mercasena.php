<?php
// incluimos la clase padre DB
include_once 'db.php';
//Import PHPMailer classes into the global namespace
//These must be at the top of your script, not inside a function
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

//Load Composer's autoloader (created by composer, not included with PHPMailer)
/**
 *  clase modelo de la tabla usuario
 *  
 */
require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();
class MERCASENA extends DB
{

    private $serverIp = '';
    // private $serverIp = 'http://192.168.137.252';
    // private $serverIp = 'http://192.168.143.194';
    // private $serverIp = 'http://192.168.43.194';


    private function setIp()
    {
        $this->serverIp = $_ENV['IP_ADRESS'];
    }
    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla usuario .
     * @return array arreglo asociativo con los datos
     */
    /**
     * obtiene la direccion del servidor
     */
    static function getServerAddress()
    {
        return $_ENV['IP_ADRESS'];
    }


    public function saveImage($path)
    {
        $this->connect(true);



        // sentencia SQL
        $this->sql = "CALL guardarImagenPublicitaria( :path)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        $this->query->bindParam(':path', $path, PDO::PARAM_STR);


        // echo $this->query->queryString;
        try {
            $result = $this->execParamQuery();

        } catch (PDOException $e) {
            throw new Exception("paso algo y no guardamos la imagen publicitaria ");
        }
        $this->disconnect();
        // verificacion de que haya realizado cambios


    }
    public function select()
    {

        $this->connect(true);
        $this->sql = "SELECT pv.puntVen_nombre as regional, pv.puntv_encargado as encargado , pv.puntv_metaAnual as metaAnual , pv.puntv_whatsapp as whatsapp , pv.puntVent_ubicacion
 as ubicacion , pv.puntv_centroFormacion as centroFormacion FROM `punto_venta` pv WHERE 1"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetchAll(PDO::FETCH_ASSOC);
    }

    /**
     * solo puede haber una miniatura por producto
     * selecciona la miniatura y trae la informacion de ella
     * @return array
     * 
     */
    public function fetchMiniature(string $idProducto)
    {
        $this->connect();
        $this->sql = "SELECT * FROM usuario WHERE prodImg_miniatura = 1 AND prod_id = :idProducto LIMIT 1";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();

        //  devuelve los datos
        return $this->query->fetchALL();
    }
    public function fetchWhatsappNumber()
    {
        $this->connect(true);
        $this->sql = "SELECT puntv_whatsapp as whatsapp FROM `punto_venta` WHERE 1"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        // $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();

        //  devuelve los datos
        $data = $this->query->fetchALL(PDO::FETCH_ASSOC);


        return $data;
    }
    public function getPuntoVentaEncargado()
    {
        $this->connect(true);
        $this->sql = "SELECT pv.puntv_encargado as encargado FROM `punto_venta` pv WHERE 1"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // calcular el porcentaje 
        return $data[0]['encargado'];
        ;
    }
    /**
     * selecciona solo un registro  
     *
     * @return int devuelve el porcentaje 
     */
    public function calculateSellProgress()
    {
        $this->connect(true);
        $this->sql = "SELECT pv.puntv_metaAnual as metaAnual, pv.puntVen_totalVentas as totalVentas FROM `punto_venta` pv WHERE 1"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // calcular el porcentaje 
        $porcentaje = ($data[0]['totalVentas'] / $data[0]['metaAnual']) * 100;
        return ["percentage" => $porcentaje, "anualGoal" => $data[0]['metaAnual']];
        // return ["percentage"=>$porcentaje,"anualGoal"=>];
    }

    /**
     *se trae las imagenes del banner para la custommizzacion 

     * @return string[]
     */
    public function fetchAllBannerImages()
    {
        $this->connect();
        $this->sql = "SELECT puntImg_ruta as ruta from punto_venta_imagenes";
        $this->query = $this->conn->prepare($this->sql);
        // $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();

        //  devuelve los datos
        $data = $this->query->fetchALL(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($data as $item => $image) {
            $newData[] = $this->serverIp . "/mercasena/" . $image['ruta'];
        }

        return $newData;

    }
    public function fetchAllBannerImagesWithID()
    {
        $this->connect();
        $this->sql = "SELECT puntImg_ruta as ruta , puntImg_id as id  from punto_venta_imagenes";
        $this->query = $this->conn->prepare($this->sql);
        // $this->query->bindParam(':idProducto', $idProducto, PDO::PARAM_STR);
        $this->query->execute();

        //  devuelve los datos
        $data = $this->query->fetchALL(PDO::FETCH_ASSOC);
        $newData = [];
        foreach ($data as $item => $image) {
            $newData[$item]["id"] = $image['id'];
            $newData[$item]["url"] = $this->serverIp . "/mercasena/" . $image['ruta'];
        }

        return $newData;

    }

    /**
     * crea un codigo de verificacion
     *
     * @return int codigo de verificacion de 6 digitos
     */
    static function createVerificationCode()
    {
        return rand(100000, 999999);
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
        // $this->sql = "SELECT * FROM usuario WHERE  prodMed_id= :id";
        $this->sql = "";
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

    public function selectImageByID($id)
    {
        $this->connect(true);
        // $this->sql = "SELECT * FROM usuario WHERE  prodMed_id= :id";
        $this->sql = "CALL 	obtenerRutaImagenPuntoVenta(:id)";
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
     * funcion para enviar un correo a alguien
     * @param  string $email correo del usuario
     * @param mixed $mailData
     * @return void
     */
    public function sendEmail($mailData)
    {
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);

        $subjet = $mailData['subject'];
        $body = $mailData['body'];
        $targetAdress = $mailData['address'];

        try {
            //Server settings
            // $mail->SMTPDebug = SMTP::DEBUG_SERVER;                      
            $mail->SMTPDebug = 0;
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = $_ENV['MAIL_USER'];                     //SMTP username
            $mail->Password = $_ENV['MAIL_PASSWORD'];                               //SMTP password
            // $mail->Password   = 'ofki dmlb vcld scae';                               //
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;
            // $mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

            //de quien es y a quien vA 
            $mail->setFrom($_ENV['MAIL_USER'], 'Gestor de correos de mercasena');
            $mail->addAddress($targetAdress, );     //Add a recipient


            // //Attachments
            // $mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
            // $mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

            //Contenido
            $mail->isHTML(true);                                  //Set email format to HTML
            $mail->Subject = $subjet;
            $mail->Body = $body;
            // $mail->AltBody = ;

            $mail->send();

        } catch (Exception $e) {
            throw new Exception('el correo no pudo ser enviado por: ' . $mail->ErrorInfo);

        }
    }

    /**
    *  crea datos dentro de la tabla productos  .
    * @param  array $data arreglo asociativo [
    *       "correo" => "correo",
    *       "nombre" => "nombre" ",
            "direccion" => "direccion",
            "telefono"  =>   "telefono del usuario",
            "NIT" => "identificacion",
            "tipoUsr" => "tipoUsr",
            "contraseña" => "fecha de expiracion del producto"

    * ]
    * @throws Exception No se creo el usuario del producto
    */
    public function insert(array $data)
    {
        return false;
    }

    /**
     * Updates the information of a sales point in the database.
     * 
     * This method updates the details of a sales point using the provided data.
     * 
     * @param string $id The id of the sales point to be updated.
     * @param array $data An associative array containing the new data for the sales point:
     *     - 'nombre': The name of the sales point.
     *     - 'encargado': The person in charge of the sales point.
     *     - 'metaAnual': The annual target for the sales point.
     *     - 'whatsapp': The WhatsApp contact information.
     *     - 'progreso': The progress of the sales point.
     *     - 'ubicacion': The location of the sales point.
     *     - 'centroFormacion': The training center associated with the sales point.
     * 
     * @throws Exception if the update operation fails.
     */

    public function update(string $id, array $data)
    {
        $this->connect(true);

        $nombre = $data['regional'];
        $encargado = $data['encargado'];
        $metaAnual = $data['metaAnual'];
        $whatsapp = $data['whatsapp'];
        $ubicacion = $data['ubicacion'];
        $centroFormacion = $data['centroFormacion'];

        // SQL statement for the new procedure
        $this->sql = "CALL actualizarPuntoVenta(:id, :nombre, :encargado, :metaAnual, :whatsapp,  :ubicacion, :centroFormacion)";

        // Prepare the query
        $this->query = $this->conn->prepare($this->sql);

        // Bind parameters
        $this->query->bindParam(':id', $id, PDO::PARAM_INT);
        $this->query->bindParam(':nombre', $nombre, PDO::PARAM_STR);
        $this->query->bindParam(':encargado', $encargado, PDO::PARAM_STR);
        $this->query->bindParam(':metaAnual', $metaAnual, PDO::PARAM_STR);
        $this->query->bindParam(':whatsapp', $whatsapp, PDO::PARAM_STR);

        $this->query->bindParam(':ubicacion', $ubicacion, PDO::PARAM_STR);
        $this->query->bindParam(':centroFormacion', $centroFormacion, PDO::PARAM_STR);

        // Execute the query
        $result = $this->execParamQuery();
        $this->disconnect();

        // Check if the update was successful
        if (!$result) {
            throw new Exception("No se pudo actualizar el punto de venta.");
        }
    }

    /**
     * Elimina datos de la tabla usuario
     * @param mixed $id id del producto_usuario
     * 
     * @throws  Exception no se elimino la usuario
     */
    public function delete(string $id)
    {
        $this->connect();
        $this->sql = "CALL eliminar_usuario(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se elimino la usuario ");
        }

    }
    /**
     * Elimina datos de la tabla de punto_venta_iamgenes
     * @param mixed $id id del producto_usuario
     * 
     * @throws  Exception no se elimino la usuario
     */
    public function deleteImageFromDb(string $id)
    {
        $this->connect(true);
        $this->sql = "CALL eliminarFotoPuntoVenta(:id)";

        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $result = $this->query->execute();
        $this->disconnect();
        // verificacion de que si se hizo la actualizacion
        if ($result == False) {
            throw new Exception("no se elimino la usuario ");
        }

    }

    public function deleteImageFromServer($path)
    {
        // si no elimina la imagen entonces mnanda una error
        if (!unlink($path)) {
            throw new Exception("no se elimino la imagen");
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

// $user = new MERCASENA();
// echo json_encode($user->fetchAllBannerImages());
// $userEmail = "colchon@gmail.com";
//  $pass = password_hash("123", PASSWORD_DEFAULT);
// // echo $user->genenerateUniqueId("buitragoagudelj007@gmail.com");
// $db_pass = $user->selectPasswordFromEmail($userEmail);

// if (password_verify("123", $db_pass[0]['usr_contrasena_hash'])) {
//     echo "si";
//     print_r(    $user->getInfoByEmail($userEmail));


// }






?>