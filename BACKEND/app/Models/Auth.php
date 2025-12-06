<?php
// incluimos la clase padre DB
include_once 'db.php';

/**
 *  clase modelo de la tabla auth o authorization si sabe
 *  
 */
class Auth extends DB
{
    private $email;
    private $password;
    protected function select()
    {
    }
    protected function update(string $id, array $data)
    {
    }
    protected function delete(string $id)
    {
    }
    protected function selectOne()
    {
    }
    protected function insert(array $data)
    {
    }

    /**
     * verifica si se ha iniciado session 
     */

    static function checkInicializateSession()
    {
        $headers = getallheaders();
        $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

        if ($sessionToken == null) {
           return false;
        } else {
            return true;
        }
    }
    /**
     * verifica si el usuario tiene privilegios administrativos
     * @return bool
     */
    static function checkAdminPrvileges(){
        return $_SESSION['permission'] == 3  ?  true  :  false;
        // if($_SESSION['permission'] == 3){
        //     return true;
        // } else {
        //     return false;
        // }
    }

    
    /**
     * Envia un mensaje de acceso denegado con un estatus code 403
     * @return string con el mensaje de error
     */
    static  function insuficientPrivileges(){
        http_response_code(403);
        echo json_encode(["error" => "Acceso denegado"]);
    }
    private function checkAdmin()
    {
        $this->connect();
        $this->sql = "SELECT usr_correo FROM usuarios WHERE usr_rol = 'admin'";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->execute();
        $data = $this->query->fetchAll();
        if (empty($data)) {
            return false;
        } else {
            return true;
        }
    }


    /**
     * 
     * metodo que permite loguear a un usuario en la base de datos
     * @return bool el que verifica que las credenciales estan correctas
     * @throws \Exception email  o contraseñas incorrectas 
     */


    /**
     * 
     * metodo que permite loguear a un usuario en la base de datos
     * @return mixed data todos los datos del usuario
     */
    public function login()
    {
        session_start();
        $data = [];
        // $encryptedPassword = password_hash($this->password, PASSWORD_DEFAULT);
        // echo $user->genenerateUniqueId("buitragoagudelj007@gmail.com");
        $db_pass = $this->selectPasswordFromEmail();
        // aqui verificamos el hash de las contraseñas

        if (password_verify($this->password, $db_pass)) {

            $data = $this->getInfoByEmail($this->email);
            // $user['token'] =  $this->createToken();
            // parte donde se guardan los datos del usuarios en la session

            $_SESSION['Csrf_token'] = $this->createToken();
            $_SESSION['SessionToken'] = session_id();
            $_SESSION['permission'] = $data[0]['permiso'];
            $_SESSION['userId'] = $data[0]['userId'];
            $_SESSION['email'] = $data[0]['email'];
            $_SESSION['name'] = $data[0]['name'];

            if ($_SESSION['permission'] == 3) {
                // $db = DB::getInstance();
                $this->setUsuario($_ENV['DB_ADMIN']);
                $this->setClave($_ENV['DB_PASSADMIN']);
                $this->connect();
                return [
                    "route" => "Inventario/index.html",
                    "mensagge" => "Bienvenido Administrador",
                    "estado" => "ok",
                    "name" => $_SESSION['name'],
                    "email" => $_SESSION['email'],
                    "token" => $_SESSION['Csrf_token'],
                    "sessionToken" => $_SESSION['SessionToken'],
                ];

                // conecta a la base de datos con las nuevas credenciales de administrador

            } else {
                return [
                    "route" => "tienda/index.html",
                    "mensagge" => "Iniciando Sesion",
                    "estado" => "ok",
                    "name" => $_SESSION['name'],
                    "email" => $_SESSION['email'],
                    "token" => $_SESSION['Csrf_token'],
                    "sessionToken" => $_SESSION['SessionToken'],
                ];
             
            }
        } else {
            throw new Exception("email o contraseñas incorrectas");
        }
    }


    /**
     * crea el toke csrf 
     *
     * 
     * @return string token el nuevo token de session
     */


    private function createToken()
    {
        $token = bin2hex(random_bytes(32));
        return $token;
    }

    private function getInfoByEmail($email)
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
    private function selectPasswordFromEmail()
    {

        $this->connect();
        $this->sql = "SELECT usr_contrasena_hash  FROM usuarios WHERE usr_correo = :correo";
        $this->query = $this->conn->prepare($this->sql);
        $this->query->bindParam(':correo', $this->email, PDO::PARAM_STR);
        $this->query->execute();

        $data = $this->query->fetchAll(PDO::FETCH_ASSOC);
        // verificacion de que se encontraron datos
        if (empty($data)) {
            throw new Exception("No se encontraron datos por este correo");
        } else {
            // retorna el hash de la contraseña
            return $data[0]['usr_contrasena_hash'];
        }
    }


    public function __construct($email, $password)
    {
        $this->email = $email;
        $this->password = $password;


    }


}
// 

?>