<?php
// incluimos la clase padre DB
include_once 'db.php';

require '../../vendor/autoload.php';
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();
/**
 *  clase modelo de la tabla usuario
 *  
 */
class User extends DB
{
    public $email;
    public $password;

    private $id;



    // ======= METODOS CRUD ========================
    /**
     * crea datos dentro de la tabla usuario .
     * @return array arreglo asociativo con los datos
     */
    public function select()
    {

        $this->connect();
        $this->sql = "SELECT * FROM usuario"; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();

        return $this->query->fetchAll();
    }
    /**
     * 
     * verifica la existencia de un correo en la abse de datos
     * @param mixed $email
     */
    public  function checkRegisteredEmail($email)
    {
        $this->connect();
        $this->sql = 'CALL verificarExistenciaCorreo(:email)'; //asigna la query
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':email', $email, PDO::PARAM_STR);
        $this->query->execute();

        $data =  $this->query->fetchAll(PDO::FETCH_ASSOC);

        // si encontro alguno entonces devolvera un true
        return $data[0]['verificacion'] == 0 ? false : true;
        // return $data;
    }

    /**
     * Obtiene la informacion de un usuario como telefono  direccion y nit
     * 
     * @param int $userID El id del usuario con el que se identifica en mercasena
     * @return array Un arreglo asociativo con la informacion del usuario
     */
    public function getInfo($userID)
    {
        $this->connect();
        $this->sql = " CALL obtenerInfoUsuario(:id)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':id', $userID, PDO::PARAM_STR);
        $this->query->execute();
        return $this->query->fetchALL(PDO::FETCH_ASSOC);
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

    /**
     * funcion saca al usuario de la session
     * @param string $sessionID que es la session actual del usuario
     */
    static function logout($SessionID)
    {

        if (empty($_SESSION)) {
            throw new Exception("No se pudo cerrar la session");
        } else {
            session_destroy();
        }
    }
    /**
     * 
     * verifica si el usuario aparece como propietario de una factura o no
     * 
     * @param mixed $userID id del usuario
     * @param mixed $billData datos de la factura
     * @return bool true si si  si no false
     */
    static function isUsersBill($userID , $billData){
        if($userID == $billData['usr_id']){
            return true;
        }else{
            return false;
        }
    }

    /**
     * crea el toke csrf 
     *
     * @param string $email
     * @return void
     */


    public function createToken(string $email)
    {
        $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
    }

    public function getInfoByEmail($email)
    {
        $this->connect();
        //         $this->sql = "SELECT du.tipoUsr_id as permiso , u.usr_id as userId , u.usr_correo as email, u.usr_nombre as name   FROM usuarios u
// INNER JOIN detalles_usuarios du ON u.usr_id = du.usr_id


        // WHERE usr_correo = :correo";

        $this->sql = "CALL  obtenerUsuarioPorEmail(:correo)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':correo', $email, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos por este correo");
        } else {
            return $data;
        }
    }

    /**
     * se trae  la contraseña del correo
     *
     * @param string $email
     * @return mixed arreglo
     */
    public function selectPasswordFromEmail(string $email)
    {

        $this->connect();
        $this->sql = "SELECT usr_contrasena_hash  FROM usuarios WHERE usr_correo = :correo";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':correo', $email, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos por este correo");
        } else {
            return $data;
        }
    }
/**
 * cambia la contraseña del usuario
 *
 * @param string $email
 * @return mixed arreglo
 */
    public function updatePassword(string $user,string $password){
// encripta la contraseña
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $this->connect();

        $this->sql = "CALL actualizarContraseña(:user,:password)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':user',$user, PDO::PARAM_STR);
        $this->query->bindParam(':password',$password_hash, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (($data)) {
            throw new Exception("No se encontraron datos por este usuario ");
        //    print_r($data);
        } else {
            return $data;
        }
    }


/**
 * cambia la contraseña del usuario
 *
 * @param string $email
 * @return mixed arreglo
 */
    public function updatePasswordByEmail(string $email,string $password){
// encripta la contraseña
        $password_hash = password_hash($password, PASSWORD_DEFAULT);
        $this->connect();

        $this->sql = "CALL actualizarContraseñaPorCorreo(:correo,:password)";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':correo',$email, PDO::PARAM_STR);
        $this->query->bindParam(':password',$password_hash, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if ($data) {
            throw new Exception("No se encontraron datos por este usuario ");
        //    print_r($data);
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
        $this->connect();
        $this->sql = "SELECT * FROM usuario WHERE  prodMed_id= :id";
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
     * genera un id uni apartir de ciertos caracteres del corre y un codigo de encriptacijn
     *
     * @param [type] $email emial coon el que se hara el di
     * @return void
     */
    public function genenerateUniqueId($email)
    {


        $lenght = strlen($email);
        $start = rand(0, $lenght - 4);
        $subcaracter = substr($email, $start, 4);



        $uniq = uniqid('user_' . $subcaracter . '_', true);

        // guarda la clave generada en el atributo id
        return $uniq;
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
        $this->connect(true);

        $id = $data['id'];
        $email = $data['email'];
        $password = $data['password'];
        $name = $data['name'];


        // sentencia SQL
        $this->sql = "CALL crear_usuario( :id, :email, :name, :password)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        $this->query->bindParam(':email', $email, PDO::PARAM_STR);
        $this->query->bindParam(':name', $name, PDO::PARAM_STR);
        $this->query->bindParam(':id', $id, PDO::PARAM_STR);
        $this->query->bindParam(':password', $password, PDO::PARAM_STR);

        // echo $this->query->queryString;
        try {
            $result = $this->execParamQuery();

        } catch (PDOException $e) {
            throw new Exception("paso algo " . $e->getMessage());
        }
        $this->disconnect();
        // verificacion de que haya realizado cambios

        if (!$result) {
            // aca verificamos si el correo ya se encuentra registrado
            if ($this->query->errorCode() == "45000") {
                throw new Exception("El correo ya se encuentra registrado");
            }
            // print_r($result);
            throw new Exception("No se creo  el nuevo usuario perdon ");
        } else {
            return $result;
        }
    }
    /**
     * actualiza datos dentro de la tabla usuario
     * @param  string $correo id de la usuario
     * @param  array $data arreglo asociativo 
     * ["prodImg_ruta" => "ruta de la usuario en el servidor","prod_id"=>"producto del cual se basa la usuario","prodImg_miniatura" => "confirmacion de que esa sera la miniatura del producto"]
     * @throws Exception No se logro actualizar el usuario
     */
    public function update(string $id, array $data)
    {
        $this->connect();

        $name = $data['nombre']; // nombre usuarios
        // $address = $data['direccion'] || 'no la encontre'; // direccion
        $address = $data['direccion']; // direccion
        $phone = $data['telefono']; // telefono
        $NIT = $data['NIT']; // cNIT si  lo quiere


        // sentencia SQL
        $this->sql = "CALL actualizar_usuario( :id, :name, :address, :phone, :NIT)";

        // escondemos los parametros para la query
        $this->query = $this->conn->prepare($this->sql);

        $this->query->bindParam(':id', $this->id, PDO::PARAM_STR);
        $this->query->bindParam(':name', $name, PDO::PARAM_STR);
        $this->query->bindParam(':address', $address, PDO::PARAM_STR);
        $this->query->bindParam(':phone', $phone, PDO::PARAM_STR);
        $this->query->bindParam(':NIT', $NIT, PDO::PARAM_STR);

        $result = $this->execParamQuery();
        $this->disconnect();
        // verificacion de que haya realizado cambios


        if (!$result) {
            throw new Exception("No se actualizaron los datos");
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
     * setea el id del usuario
     *
     * @param [type] $id
     * @return void
     */
    public function setId($id)
    {
        $this->id = $id;
    }
    public function __construct($id = null)
    {
        /**
         * traemos  el contructor y los parametros basicos
         *
         * @return void
         */
        $this->id = $id;
    }


}

// $user = new User();
// $user->updatePassword('user_colc_68161fc0da9cb6.62445674','admin1234@');
// $user->update('2',['nombre' => 'colchonate con la comodidad de la casa', 'direccion' => 'calle 123', 'telefono' => '1234567890', 'NIT' => '1234567890']);
// $userEmail = "colchon@gmail.com";
//  $pass = password_hash("123", PASSWORD_DEFAULT);
// // echo $user->genenerateUniqueId("buitragoagudelj007@gmail.com");
// $db_pass = $user->selectPasswordFromEmail($userEmail);

// if (password_verify("123", $db_pass[0]['usr_contrasena_hash'])) {
//     echo "si";
//     print_r(    $user->getInfoByEmail($userEmail));
// $user = new User();
// print_r ($user->checkRegisteredEmail('admin@gmai.com'));
 

// $user = new User();
//                     // se trae la informacion del usuario
//                     // $userData = $user->getInfo($_SESSION['userId']);
//                     $userData = $user->getInfo('user_6@gm_682a519b1aeb78.24661902');
//                     // las devuelve al navegador
//                     echo json_encode($userData);
// }






?>