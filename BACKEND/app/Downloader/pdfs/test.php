<?php 


include "../class/security.php";
include "../class/saleReceipt.php";

try {
    // echo SaleReceipt::createName('ComproVenta_');
    // echo Security::isPdfFile(__DIR__,'facturas.pdf');
    SaleReceipt::deleteOldReceipts(__DIR__ );
} catch (Exception $th) {
    throw $th;


}
?>