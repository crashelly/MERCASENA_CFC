<?php 
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,mercasena-token,X-CSRF-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");
// echo  json_encode(["mensaje"=>"peticion recibida  , devolviendo los datos"]);
// echo ;
$path = dirname(__DIR__,2). '/public/assets/banner/images/OIP (1).jpg';
unlink($path);
?>