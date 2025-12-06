<?php

$filePath = $_GET['pdfName'];
// $filePath = 'index.php';
include "../class/security.php";
include "../class/saleReceipt.php";


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

    if (Security::isPdfFile(__DIR__,$filePath)) {
        
        readfile($filePath);
    }else{
        echo json_encode(["mensagge"=> "no puedes descargar este archivo"]);
    }
    // Lee el archivo y envíalo al cliente
    exit;
} else {
    echo 'El archivo no existe.';
}
?>