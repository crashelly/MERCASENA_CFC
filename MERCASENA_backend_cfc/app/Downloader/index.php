<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Mercasena-Token,X-CSRF-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");


// require_once 'vendor/autoload.php';
require '../../vendor/autoload.php';
use Dompdf\Dompdf;
use Dompdf\Options;
$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();

$sessionToken = $_GET['id'];
// $sessionToken = $data['dataObject']["sessionToken"]; 
if ($sessionToken == null) {
    http_response_code(401);
    echo json_encode(["error" => "No se ha iniciado sesion $sessionToken"]);
    exit();
    # code...
} else {
    session_id($sessionToken);
    session_start();

    include 'class/saleReceipt.php';

    // 1️⃣ Opcional: configurar para que permita cargar archivos remotos como CSS o imágenes
    $options = new Options();
    $options->set('isRemoteEnabled', true);
    $dompdf = new Dompdf($options);
    ob_start();
    include 'factura.php';
    // include 'HOLA.php';

    $html = ob_get_clean();
    // ob_start();
// include('facturiña.php');
// $html = ob_get_clean();
// ob_start();

    // $html = ob_get_clean();



    // instantiate and use the dompdf class

    $dompdf->loadHtml($html);
    // Opcional: tamaño y orientación
    $dompdf->setPaper('A4', 'portrait');

    // Renderizar
    $dompdf->render();
    // echo $html;
// Mostrar en navegador
    // $dompdf->stream("factura.pdf", ["Attachment" => false]);

    $fileName = SaleReceipt::createName('Comprobate_venta_');
    $pdfOutput = $dompdf->output();
    $savePath = __DIR__ . '/pdfs/'.$fileName; 
    file_put_contents($savePath, $pdfOutput);

    
    // despues envia como respuesta el link del pdf de la Factura
    echo json_encode(["url"=> $_ENV['IP_ADRESS'].'/mercasena/app/Downloader/downloader.php?pdfName='.$fileName ]);
    // echo json_encode(["url"=> $_ENV['IP_ADRESS'].'/app/Downloader/pdfs/index.php?pdfName='.$fileName ]);
    // echo json_encode(["url"=> $_ENV['IP_ADRESS'].'/app/Downloader/downloader.php?pdfName='.$fileName ]);
    // $url = $fileName;
    // header("Location : pdfs/factura.pdf");
// echo '<script>window.location = "pdfs/index.php?pdfName='.$url.'";</script>';
// file_put_contents($savePath, $pdfOutput);

    // echo $pdfOutput;
}
?>