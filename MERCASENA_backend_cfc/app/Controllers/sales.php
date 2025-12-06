<?php
// include_once '../Models/Products/ProductSubCategory.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,mercasena-token,x-csrf-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
// fecha actual
$currentDate = date('Y-m-d');

// inclusion del archivo auth 
include "../Models/Auth.php";
// inicio la session
// la configuracion de la fecha 
include_once '../config/date.php';





if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion"]);
        exit();
        # code...
    } else {
        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();
        switch ($data["action"]) {
            //! LAS PARTES DE GUARDAR =====

            case "createOrder":
                try {
                    include_once "../Models/Orders/order.php";
                    include_once "../Models/Orders/orderHasProducts.php";
                    $order = new Order();
                    $productsInOrder = new OrderHasProducts();

                    $dataSend = $data["dataObject"]["products"];

                    $order->generateUniqueOrderID();
                    $order->insert([
                        "precioTotal" => $data["dataObject"]["totalPrice"],
                        "idUsuario" => $_SESSION['userId'],
                    ]);


                    // guardamos el  id del pedido en el atributo de productsOrder
                    $productsInOrder->setOrderID($order->id);

                    // guardamos los pedidos
                    // // traemos los datos  y los guardams en un arreglo
                    $productsInOrder->products = $data["dataObject"];
                    $productsInOrder->insert($dataSend);

                    echo json_encode(["mensagge" => "Pedido Guardado con exito", "type" => "baseProduct"]);
                    // file_put_contents("id.json", json_encode(["orderID"=>$order->id]));

                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
                }
                break;


            case "devolver":
                try {
                    $object = $data["dataObject"];
                    // file_put_contents("plantillas/plantilla.json",json_encode($object));
                    echo json_encode(["dataNormal" => $object, "idUsuario" => $_SESSION['userId']]);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
                }
                break;

            //?  ACTUALIZAR =====


            default:
                break;
        }
    }
}

// PETICIONES GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // aca coje la peticion
    $data = $_GET;
    switch ($_GET["action"]) {

        case 'getSalesCount':

            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                // verifica si se inicio session
                if (Auth::checkInicializateSession()) {
                    session_id($sessionToken);
                    session_start();
                    // verficando si la cnsulta vien del administrador
                    if (Auth::checkAdminPrvileges()) {
                        include_once "../Models/Bill.php";
                        $sell = new Bill();
                        // se trae la categorias
                        // $countOfSells = $sell->countOrdersOfDay(date: $currentDate);
                        $countOfSells = $sell->countOrdersOfDay($newDate);
                        // $countOfSells = $sell->countOrdersOfDay('2025-06-09');
                        // las devuelve al navegador
                        echo json_encode(["valor" => $countOfSells["cantidad"]]);
                    } else {
                        Auth::insuficientPrivileges();
                    }
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion  "]);
                }

            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;

        case 'getTotalToday':

            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                // verifica si se inicio session
                if (Auth::checkInicializateSession()) {
                    session_id($sessionToken);
                    session_start();
                    // verficando si la cnsulta vien del administrador
                    if (Auth::checkAdminPrvileges()) {
                        include_once "../Models/Bill.php";
                        $sell = new Bill();
                        // se trae la categorias
                        // $countOfSells = $sell->countOrdersOfDay(date: $currentDate);
                        $totalSoldToday = $sell->getAllSelledToday($newDate);
                        // $countOfSells = $sell->countOrdersOfDay('2025-06-09');
                        // las devuelve al navegador
                        echo json_encode(["valor" => $totalSoldToday["totalVendidoHoy"]]);
                    } else {
                        http_response_code(401);
                        echo json_encode(["error" => "No se ha iniciado sesion com administrador  "]);
                    }
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion  "]);
                }

            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;


        default:
            # code...
            exit();
    }

}

// PETICIONES PUT 
if ($_SERVER["REQUEST_METHOD"] == "PUT") {

}
// PETICIONES DELETE
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {

    switch ($data["action"]) {
        //     //! LAS PARTES DE ELIMINAR=====






        default;
        // para guardar la categoria

    }

}

?>