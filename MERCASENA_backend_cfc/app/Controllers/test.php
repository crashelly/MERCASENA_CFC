<?php
if (function_exists('getallheaders')) {
    $headers = getallheaders();
    echo "<pre>";
    print_r($headers);
    echo "</pre>";
} else {
    echo "La función getallheaders() no está disponible en este servidor.";
}
?>