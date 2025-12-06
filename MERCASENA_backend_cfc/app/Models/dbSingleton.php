<?php

class Database
{
    // Instancia única de la clase
    private static $instance = null;

    // Conexión a la base de datos
    private $connection;

    // Credenciales de la base de datos
    private $host = 'localhost';
    private $user = 'root';
    private $password = '';
    private $dbname = 'mi_base_de_datos';

    // Constructor privado para evitar la creación de instancias fuera de la clase
    private function __construct()
    {
        // Crear la conexión a la base de datos
        $this->connection = new mysqli($this->host, $this->user, $this->password, $this->dbname);

        // Verificar si hay errores en la conexión
        if ($this->connection->connect_error) {
            die("Error de conexión: " . $this->connection->connect_error);
        }
    }

    // Método para obtener la instancia única de la clase
    public static function getInstance()
    {
        if (self::$instance === null) {
            self::$instance = new Database();
        }

        return self::$instance;
    }

    // Método para obtener la conexión a la base de datos
    public function getConnection()
    {
        return $this->connection;
    }

    // Método para ejecutar consultas SQL
    public function executeQuery($sql)
    {
        $result = $this->connection->query($sql);

        if (!$result) {
            die("Error en la consulta: " . $this->connection->error);
        }

        return $result;
    }

    // Evitar la clonación de la instancia
    private function __clone() {}

    // Evitar la deserialización de la instancia
    private function __wakeup() {}
}

// Uso de la clase Database
$db = Database::getInstance();
$connection = $db->getConnection();

// Ejemplo de ejecución de una consulta SQL
$sql = "SELECT * FROM usuarios";
$result = $db->executeQuery($sql);

while ($row = $result->fetch_assoc()) {
    echo "ID: " . $row['id'] . " - Nombre: " . $row['nombre'] . "<br>";
}

?>