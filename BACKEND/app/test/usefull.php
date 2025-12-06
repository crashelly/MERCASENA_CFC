abstract class DB {
    private $BaseDatos = 'mercasena';
    private $Servidor = '127.0.0.1';
    private $Usuario;
    private $Clave;

    protected $conn;
    protected $Consulta_ID;
    protected $ResultadoCon;
    protected $ErrNo;
    protected $ErrTxt;

    private static $instance = null;

    private function __construct($role = 'client') {
        $this->setCredentials($role);
        $this->connect();
    }

    public static function getInstance($role = 'client') {
        if (self::$instance === null) {
            self::$instance = new static($role);
        }
        return self::$instance;
    }

    private function setCredentials($role) {
        switch ($role) {
            case 'admin':
                $this->Usuario = getenv('DB_ADMIN_USER');
                $this->Clave = getenv('DB_ADMIN_PASS');
                break;
            case 'normal':
                $this->Usuario = getenv('DB_NORMAL_USER');
                $this->Clave = getenv('DB_NORMAL_PASS');
                break;
            case 'client':
            default:
                $this->Usuario = getenv('DB_CLIENT_USER');
                $this->Clave = getenv('DB_CLIENT_PASS');
                break;
        }
    }

    public function connect() {
        try {
            $this->conn = new PDO('mysql:host='.$this->Servidor.';dbname='.$this->BaseDatos, $this->Usuario, $this->Clave, array(PDO::MYSQL_ATTR_INIT_COMMAND => "SET NAMES 'UTF8'", PDO::MYSQL_ATTR_LOCAL_INFILE => true));
        } catch(PDOException $e) {
            $this->ErrNo = -1;
            $this->ErrTxt = $e->getMessage();
        }
    }

    // Other methods remain unchanged...
}
?>
