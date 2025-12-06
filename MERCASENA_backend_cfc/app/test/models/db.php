<?php
abstract class DB {
    private $BaseDatos = 'mercasena';       
    private $Servidor = '127.0.0.1';     
    private $Usuario = 'root';            
    private $Clave = '';                  

    protected $conn; 
    protected $Consulta_ID; 
    protected $ResultadoCon; 
    protected $ErrNo;  
    protected $ErrTxt; //texto de error
 

    protected $query; // variable que se le asigna a la query

    protected $sql; // variable que se le asigna a la sentencia SQL

    // aplicacion de esquema singleton
    private static $instance = null; 

    // contructor privado para prevenir multiples instancia y perdida de rendimiento
    private function __construct() {
        $this->connect();
    }


    // metodo para obtener la instancia singleton (unica)
    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new static();
        }
        return self::$instance;
    }

    //  aqui prevenimos de que se clone la instancia
    private function __clone() {}

    // Prevenior la inseralizaciond e la instancia
    public function __wakeup() {}

//  ============ METODOS ABSTRACTOS ============================
    abstract protected function select();
    abstract protected function insert(array $data);
    abstract protected function update(string $id,array $data);
    abstract protected function delete(string $id);

    // ===========================================
    // Conexion a la base de datos de mercasena
    public function connect() {
        try {
            $this->conn = new PDO('mysql:host='.$this->Servidor.';dbname='.$this->BaseDatos, $this->Usuario, $this->Clave, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'", PDO::MYSQL_ATTR_LOCAL_INFILE => true));
        } catch(PDOException $e) {
            $this->ErrNo = -1;
            $this->ErrTxt = $e->getMessage();
        }
    }

    // Desconeccion a la base de datos
    public function disconnect() {
        $this->conn = NULL;
    }

    // Ejecucion de la sentencia SQL de todas las quierys de las subclases
    public function execQuery() {
        if ($this->conn) {
            try {
                $this->Consulta_ID = $this->conn->query($this->query);
                return true;
            } catch(PDOException $e) {
                $this->ErrTxt = $e->getMessage();
                return false;
            }
        }
        return false;
    }

    // querys con parametros

    public function execParamQuery() {
        if ($this->conn) {
            try {
                $this->Consulta_ID = $this->query->execute();
                return true;
            } catch(PDOException $e) {
                $this->ErrTxt = $e->getMessage();
                return false;
            }
        }
        return false;
    }
    // carga todos los resultados de las querys y los devuelve
    protected function fetchAll() {
        if ($this->conn) {
            $this->ResultadoCon = $this->Consulta_ID->fetchAll();
        } else {
            $this->ResultadoCon = false;
        }
        $this->disconnect();
        return($this->ResultadoCon);
    }

    // carga solamente un regsitro de la  base datos
    protected function fetchOne() {
        if ($this->conn) {
            $this->ResultadoCon = $this->Consulta_ID->fetch(PDO::FETCH_BOTH);
        } else {
            $this->ResultadoCon = false;
        }
        return ($this->ResultadoCon);
    }

    // Return a string with the error message if it exists
    public function printError() {
        return sprintf("Error: %s - %s", $this->ErrNo, $this->ErrTxt);
    }



    // Limpiar varaibles
    private function cleanErrors() {
        $this->ErrNo = "";
        $this->ErrTxt = "";
    }
}
?>