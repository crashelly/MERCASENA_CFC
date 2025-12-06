<?php
// Ruta al archivo que deseas enviar
$filePath = $_GET['pdfName'];

// Verifica si el archivo existe
if (file_exists($filePath)) {
    // Establece las cabeceras para la descarga
    header('Content-Description: File Transfer');
    header('Content-Type: application/pdf');
    header('Content-Disposition: attachment; filename="' . basename($filePath) . '"');
    header('Content-Length: ' . filesize($filePath));
    header('Pragma: public');
    header('Cache-Control: must-revalidate, post-check=0, pre-check=0');
    header('Expires: 0');

    // Limpia el búfer de salida
    ob_clean();
    flush();

    // Lee el archivo y envíalo al cliente
    readfile($filePath);
    exit;
} else {
    echo 'El archivo no existe.';
}
?>