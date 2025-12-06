<?php
// include_once '../Models/Products/ProductSubCategory.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,Mercasena-Token,x-csrf-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");


function mostrarheaders(){
if (function_exists('getallheaders')) {
    $headers = getallheaders();
    echo "<pre>";
    print_r($headers);
    echo "</pre>";
} else {
    echo "La función getallheaders() no está disponible en este servidor.";
}

}
$data = json_decode(file_get_contents("php://input"), true);
// fecha actual
$currentDate = date('Y-m-d');
// verficacion de la session del usuario

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $headers = getallheaders();
    $sessionToken = isset($headers['Mercasena-Token']) ? $headers['Mercasena-Token'] : null;

    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion"]);
        exit();
        # code...
    } else {

        session_id($sessionToken);
        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();

        // extraccion del token csrf 
        $csrf_token = $headers['x-csrf-token'];
        // verificacion del token csrf
        if (!hash_equals($_SESSION['Csrf_token'], $csrf_token)) {
            // if (!isset($_SESSION['Csrf_token']) || $_SESSION['Csrf_token'] != $data["dataObject"]['tokenCsfr']) {
            http_response_code(403);
            echo json_encode(["error" => "Token CSRF inválido"]);
            exit();
        } else {
            switch ($data["action"]) {
                //! LAS PARTES DE GUARDAR =====

                case "createOrderasda":
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
                case "logout":
                    try {
                        include "../Models/User.php";
                        User::logout('hola');
                        echo json_encode(["mensagge" => "Sesión cerrada con éxito"]);
                        // echo json_encode(["dataNormal" => $object, "idUsuario" => $_SESSION['userId']]);
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;


                // para guardar la categoria




                //?  ACTUALIZAR =====


                default:
                    break;
            }
        }
    }
}

// PETICIONES GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // aca coje la peticion
    $headers = getallheaders();
    $sessionToken = isset($headers['Mercasena-Token']) ? $headers['Mercasena-Token'] : null;
    // $retoken = $_COOKIE['PHPSESSID'];
    if ($sessionToken == null) {
    // if (false) {
        http_response_code(401);
        mostrarheaders();
        echo json_encode(["error" => "No se ha iniciado sesion $sessionToken"]);
        exit();
        # code...
    } else {

        session_id($sessionToken);
        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();
        $data = $_GET;
        switch ($_GET["action"]) {

            case 'getUserInfo':
                try {
                    include_once "../Models/User.php";
                    $user = new User();
                    // se trae la informacion del usuario
                    $userData = $user->getInfo($_SESSION['userId']);
                    // $userData = $user->getInfo('user_6@gm_682a519b1aeb78.24661902');
                    // las devuelve al navegador
                    echo json_encode($userData ?? $_SESSION);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => "No se encontraron datos"]);
                }


                break;

            default:
                # code...
                exit();
        }
    }

}

// PETICIONES PUT 
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // agregar foto del producto
    $headers = getallheaders();
    $sessionToken = isset($headers['Mercasena-Token']) ? $headers['Mercasena-Token'] : null;

    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion"]);
        exit();
        # code...
    } else {
        // despues iniciamos session para poder tener los datos de la antigua session

        session_id($sessionToken);
        session_start();

        // extraccion del token csrf 
        $csrf_token = $headers['x-csrf-token'];
        // verificacion del token csrf
        if (!hash_equals($_SESSION['Csrf_token'], $csrf_token)) {
            // if (!isset($_SESSION['Csrf_token']) || $_SESSION['Csrf_token'] != $data["dataObject"]['tokenCsfr']) {
            http_response_code(403);
            echo json_encode(["error" => "Token CSRF inválido"]);
            exit();
        } else {

            switch ($data["action"]) {
                //! LAS PARTES DE GUARDAR =====
                // actualiza la informqacion de un usuario
                case "updateUserInfo":

                    try {
                        include_once "../Models/User.php";
                        $product = new User($_SESSION["userId"]);
                        $object = $data["dataObject"];
                        $dataSend = [
                            'nombre' => $object['name'],
                            'direccion' => $object['adress'],
                            'telefono' => $object['phoneNumber'],
                            'NIT' => $object['nit']
                        ];
                        $product->update('2', $dataSend);
                        echo json_encode(["mensagge" => "datos de cuenta actualizados correctamente", "type" => "product", "executedAction" => "update"]);
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;

                case "devolver":
                    try {
                        $object = $data["dataObject"];
                        // file_put_contents("plantillas/plantilla.json",json_encode($object));
                        echo json_encode(["dataNormal" => $object, "idUsuario" => $_SESSION]);
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