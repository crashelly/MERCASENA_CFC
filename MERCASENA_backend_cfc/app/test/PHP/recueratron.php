// Conexión a la base de datos
$dsn = "mysql:host=localhost;dbname=tu_base_de_datos";
$username = "tu_usuario";
$password = "tu_contraseña";

// Crear la conexión
$pdo = new PDO($dsn, $username, $password);

// Ruta del archivo SQL para importar
$archivo_sql = "ruta/al/archivo.sql";

// Abrir el archivo SQL
$fp = fopen($archivo_sql, "r");
if (!$fp) {
    die("Error al abrir el archivo SQL");
}

// Leer el contenido del archivo SQL
$sql = fread($fp, filesize($archivo_sql));
fclose($fp);

// Ejecutar la consulta SQL
$stmt = $pdo->prepare($sql);
if ($stmt->execute()) {
    echo "Base de datos importada con éxito";
} else {
    echo "Error al importar la base de datos: " . $pdo->errorInfo()[2];
}

// Cerrar la conexión
$pdo = null;