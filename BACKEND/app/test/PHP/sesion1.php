<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

session_start();
$_SESSION['username'] = 'JohnDoe';
$_SESSION['email'] = 'john@example.com';

echo json_encode(["mensaje"=>"variables de sessiOn creadas con exito","sessionID"=>session_id()]);
?>