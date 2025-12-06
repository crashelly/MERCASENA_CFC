session_start();

// Generar un token de sesión
$sessionToken = bin2hex(random_bytes(32));

// Configurar la cookie de sesión
setcookie('sessionToken', $sessionToken, [
    'expires' => time() + 3600, // 1 hora de expiración
    'path' => '/',
    'domain' => 'tu-dominio.com',
    'secure' => true, // Solo enviar a través de HTTPS
    'httponly' => true, // No accesible desde JavaScript
    'samesite' => 'Strict' // Restringir a solicitudes del mismo sitio
]);

// Almacenar el token en la sesión
$_SESSION['sessionToken'] = $sessionToken;