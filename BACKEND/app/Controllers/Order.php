<?php
// include_once '../Models/Products/ProductSubCategory.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,mercasena-token,x-csrf-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
// fecha actual
$currentDate = date('Y-m-d');
// inicio la session
include "../Models/Auth.php";
// la configuracion de la fecha 
include_once '../config/date.php';
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
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;


    if (!Auth::checkInicializateSession()) {
        http_response_code(401);
        // echo json_encode(["error" => "No se ha iniciado sesion"]);
        // echo json_encode(["error" => "No se ha iniciado sesion"]);

        echo mostrarheaders();
        exit();
    } else {

        // seteamos el id de la session
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
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

    // $sessionToken = $data['dataObject']["sessionToken"]; 
    if ($sessionToken == null) {
    // if (false) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion ".$headers['mercasena-token'] ]);
        exit();
    } else {

        // seteamos el id de la session
        session_id($sessionToken);

        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();
        // aca coje la peticion
        $data = $_GET;
        switch ($_GET["action"]) {


            case 'getOrdersCount':
                try {
                    // verficando si la cnsulta vien del administrador
                    if (Auth::checkAdminPrvileges()) {

                        include_once "../Models/Orders/order.php";
                        $order = new Order();
                        // se trae la categorias
                        $countOfOrders = $order->countOrders();
                        // las devuelve al navegador
                        echo json_encode(["valor" => $countOfOrders["cantidad"]]);

                    } else {
                        http_response_code(401);
                        echo (["error" => "No se ha iniciado sesion com administrador  "]);
                    }
                } catch (Exception $th) {
                    echo json_encode(["error" => $th->getMessage()]);
                }

                break;
            case 'getAllOrders':
                try {
                    include_once "../Models/Products/ProductSubCategory.php";
                    $category = new ProductSubCategory();
                    // se trae la categorias
                    $categoryData = $category->fetchByCategory($_GET["categoryId"]);
                    // las devuelve al navegador
                    echo json_encode($categoryData);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => "No se encontraron productos"]);
                }

                break;
            case "getAllOrdersByDatev1":
                try {
                    if (Auth::checkAdminPrvileges()) {
                        include_once "../Models/Orders/order.php";
                        include_once "../Models/Orders/orderHasProducts.php";
                        $order = new Order();
                        $productsInOrder = new OrderHasProducts();
                        $productsPerOrder = [];
                        $data = [];

                        // nose porque pero es que la hora del servidor falla asi que voy a poner un dia antes que seria la fecha real actual
                        // 

                        // $currentDate = date('Y-m-d');
                        // $newDate = $currentDate;

                        // 
                        // $dateTime = new DateTime($currentDate);
                        // $dateTime->modify('-1 day');
                        // $newDate = $dateTime->format('Y-m-d');
                        // hasta aqui llego el suplicio :V


// $newDate ="2025-07-18";

                        $orders = $order->fetchAllOrdersByDate($newDate);

                        // aqui configuro o estrcuutro el arreglo  $structure
                        foreach ($orders as $orderItem) {

                            // consulta que guarda  todos los productos relacionados al pedido
                            $productsPerOrder[$orderItem["id"]] = $productsInOrder->fetchProductsByOrder($orderItem["id"]);
                            // $productsPerOrder[$orderItem["id"]] = $productsInOrder->fetchProductsByOrder('2025-05-07');
                            // aqui se arama la estrucutra
                            $data[] = [
                                "pedidoId" => $orderItem["id"],
                                "precioTotal" => $orderItem["precioTotal"],
                                "Usuario" => $orderItem["usuario"],
                                "fecha" => $orderItem["fechaHoraPedido"],
                                "estado" => $orderItem["estado"],
                                "estadoID" => $orderItem["estadoId"],
                                "productos" => $productsPerOrder[$orderItem["id"]]
                            ];

                        }
                        // file_put_contents("../test/JSON/pruebaEstructura.json",json_encode($data));

                        echo json_encode($data);
                        // echo json_encode($orders);
                    } else {
                        http_response_code(403);
                        echo json_encode(["error" => $th->getMessage()]);
                    }

                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
                }
                break;

            case "getOrderInfo":
                try {
                    include_once "../Models/Orders/order.php";
                    include_once "../Models/Orders/orderHasProducts.php";
                    $order = new Order();
                    $productsInOrder = new OrderHasProducts();
                    $productsPerOrder = [];
                    $data = [];

                    // nose porque pero es que la hora del servidor falla asi que voy a poner un dia antes que seria la fecha real actual
                    // 



                    $orders = $order->fetchOrdersInfo($_GET['orderID']);

                    // aqui configuro o estrcuutro el arreglo  $structure
                    foreach ($orders as $orderItem) {

                        // consulta que guarda  todos los productos relacionados al pedido
                        $productsPerOrder[$orderItem["id"]] = $productsInOrder->fetchProductsByOrderToBill($orderItem["id"]);
                        // $productsPerOrder[$orderItem["id"]] = $productsInOrder->fetchProductsByOrder('2025-05-07');
                        // aqui se arama la estrucutra
                        $data[] = [
                            "pedidoId" => $orderItem["id"],
                            "precioTotal" => $orderItem["precioTotal"],
                            "Usuario" => $orderItem["usuario"],
                            "usuarioTelefono" => $orderItem["usuarioTelefono"],
                            "usuarioDireccion" => $orderItem["usuarioDireccion"],
                            "usuarioEmail" => $orderItem["usuarioEmail"],
                            "usuarioNit" => $orderItem["nit"],
                            "fecha" => $orderItem["fechaHoraPedido"],
                            "estado" => $orderItem["estado"],
                            "estadoID" => $orderItem["estadoId"],
                            "productos" => $productsPerOrder[$orderItem["id"]]
                        ];

                    }

                    echo json_encode($data);

                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
                }
                break;

            case "getAllInformation":
                try {
                    include_once "../Models/Products/ProductSubCategory.php";
                    $products = new ProductSubCategory();
                    $data = $products->fetchAllInformation();
                    echo json_encode($data);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => "no se encontraron productos"]);
                }
                break;

            case "getAllBaseProducts":
                try {
                    include_once "../Models/Products/Product.php";
                    $products = new Product();
                    $data = $products->fetchAllBaseProducts();
                    echo json_encode($data);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
                }
                break;
            case "getOrdersByUser":
                try {

                    include_once "../Models/Orders/order.php";
                    include_once "../Models/Orders/orderHasProducts.php";
                    $order = new Order();
                    $productsInOrder = new OrderHasProducts();
                    $orders = $order->fetchOrdersByUser($_SESSION['userId']);
                    // $orders = $order->fetchOrdersByUser('user_6@gm_682a519b1aeb78.24661902');
                    // $orders = $order->fetchOrdersByUser($_GET['id']);
                    $data = [];

                    foreach ($orders as $orderItem) {

                        // consulta que guarda  todos los productos relacionados al pedido
                        $productsPerOrder[$orderItem["id"]] = $productsInOrder->fetchProductsByOrderForUser($orderItem["id"]);

                        // aqui se arama la estrucutra
                        $data[] = [
                            "pedidoId" => $orderItem["id"],
                            "precioTotal" => $orderItem["precioTotal"],
                            "fecha" => $orderItem["fechaHoraPedido"],
                            "estado" => $orderItem["estado"],
                            "estadoID" => $orderItem["estadoId"],
                            "productos" => $productsPerOrder[$orderItem["id"]]
                        ];

                    }
                    echo json_encode($data);
                } catch (Exception $th) {
                    http_response_code(404);
                    echo json_encode(["error" => $th->getMessage()]);
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

    switch ($data["action"]) {
        //! LAS PARTES DE GUARDAR =====

        case "updateBaseProduct":
            try {
                include_once "../Models/Products/Product.php";
                $product = new Product();
                $dataSend = [
                    "nombre" => $data["objectData"]["productName"],
                ];
                $product->update($data["objectData"]["id"], $dataSend);

                echo json_encode(["mensagge" => "Producto actualizado  con exito", "type" => "baseProduct", "executedAction" => "update"]);


            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;

        case "saveProductWithSubCategory":

            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $product = new ProductSubCategory();
                $object = $body["object"];
                $dataSend = [
                    "prod_id" => $object["product"],
                    "nombre" => $object["variation"],
                    "existencias" => $object["stock"],
                    "precio" => $object["price"],
                    "prodMed" => $object["measurement"],
                    "cantidad" => $object["unit"],
                    "descripcion" => null,
                    "fechaExpiracion" => null,
                    "prodPes" => 1,
                    "prodE_id" => 3,
                    "prodCat_id" => $object["category"]
                ];
                $product->insert($dataSend);
                echo json_encode(["mensagge" => "Producto guardado con exito", "type" => "product", "executedAction" => "update"]);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        case "devolver":
            try {
                $object = $body["data"];
                // file_put_contents("plantillas/plantilla.json",json_encode($object));
                echo json_encode($object);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        // para actualizar  la categoria
        case "updateCategory":
            try {
                include_once "../Models/Products/ProductCategory.php";
                $product = new ProductCategory();
                $dataSend = [
                    "nuevaCategoria" => $data["objectData"]["categoryName"]
                ];
                $product->update($data["objectData"]["id"], $dataSend);
                echo json_encode(["mensagge" => "Categoria  actualizada   con exito", "type" => "Category", "executedAction" => "update"]);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;


        case "updateMeasurement":
            try {
                include_once "../Models/Products/ProductMeasurement.php";
                $product = new ProductMeasurement();
                $dataSend = [
                    "nuevaMedida" => $data["objectData"]["name"],
                    "prodMed_factor" => $data["objectData"]["factor"]
                ];
                $product->update($data["objectData"]["id"], $dataSend);
                echo json_encode(["mensagge" => "medida  actualizada   con exito", "type" => "measurement", "executedAction" => "update"]);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;

        //?  ACTUALIZAR =====

        case 'updateProduct':
            try {
                include_once "../Models/Products/Product.php";
                $product = new Product();
                $id = $data["id"];

                $dataArr = [
                    "nombre" => $data["name"]
                ];
                $product->update($id, $dataArr);
                echo json_encode(["mensagge" => "producto actualizado con exito"]);
            } catch (Exception) {
                echo json_encode(["error" => "algo paso y no se actualizaron los datos"]);

            }
        case 'deleteProduct':
            try {
                include_once "../Models/Products/Product.php";
                $product = new Product();
                $id = $_GET["id"];
                $product->delete($id);
                echo json_encode(["mensagge" => "producto eliminado con exito"]);
            } catch (Exception $th) {
                echo json_encode(["error" => "algo paso y no se elimino el producto"]);
            }
            exit();
        default:
            break;
    }
}
// PETICIONES DELETE
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

    // $sessionToken = $data['dataObject']["sessionToken"]; 
    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion $sessionToken "]);
        exit();
        # code...
// if (false) {
//     # code...

    } else {

        // seteamos el id de la session
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
                //     //! LAS PARTES DE ELIMINAR=====



                case "deleteOrder":


                    try {

                        include_once "../Models/Orders/order.php";


                        $order = new Order();



                        // id del pedido
                        $orderID = $data["dataObject"]["orderID"];

                        // verificacion de que el usuario que intenta borrar el pedido sea el mismo que lo pidio
                        if ($order->isUsersOrder($orderID, $_SESSION["userId"])) {

                            // eliminamos el pedido
                            $order->delete($orderID);
                            echo json_encode(["mensagge" => " Pedido  eliminado con exito"]);
                        } else {
                            http_response_code(404);
                            echo json_encode(["error" => "No tienes permiso para borrar este pedido"]);
                            exit();
                        }
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;



                default;
                // para guardar la categoria

            }
        }
    }
}
// }
?>