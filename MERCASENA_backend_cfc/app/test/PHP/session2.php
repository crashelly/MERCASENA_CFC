<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if (!empty($data)) {
    session_id($data['sessionID']);

    session_start();
    // echo 'Username: ' . $_SESSION['username']; // Outputs: Username: JohnDoe
    // echo 'Email: ' . $_SESSION['email']; // Outputs: Email: john@example.com
    echo json_encode ( ["nombre"=>$_SESSION['username']]);
    
} else {
    echo json_encode(["error" => "No data provided"]);
}

?>