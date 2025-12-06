<?php
// Ruta del archivo PDF
$ruta = './pdfs/'.$_GET["pdfName"];

// Verifica si el archivo existe
if (!file_exists($ruta)) {
    die("El archivo no existe.");
}

// Tipo MIME del archivo
header("Content-Type: application/pdf");

// Forzar descarga
header("Content-Disposition: attachment; filename=\"" . basename($ruta) . "\"");

// Evitar caché
header("Cache-Control: no-cache");
header("Expires: 0");

// Tamaño del archivo
header("Content-Length: " . filesize($ruta));

// Lee el archivo y se lo envia al navegador , practicamente se lo descarga
readfile($ruta);
exit;