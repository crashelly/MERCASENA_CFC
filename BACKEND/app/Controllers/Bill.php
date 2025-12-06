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
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

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
                        echo json_encode(["dataNormal" => $object]);
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;
                case "confirmBill":

                    // aqui tengo que poner lo de ls permisos osea quie si la seesion el permis es tal entonce sdejartl hacer
                    try {
                        include_once "../Models/Bill.php";
                        include_once "../Models/mercasena.php";
                        include_once "../Models/Sales/Sale.php";
                        include_once "../Models/Orders/order.php";
                        include_once "../Models/Orders/orderHasProducts.php";

                        $order = new Order();
                        $bill = new Bill();
                        $productsInOrder = new OrderHasProducts();
                        $sales = new Sale();
                        $mercasena = new MERCASENA();
                        // id del pedido
                        $billInfo = $data["dataObject"];
                        $id = $billInfo["orderID"];
                        $actualDate = date('Y-m-d');
                        // aqui nos traemos los datos de ese pedido
                        // recordar que la factura tiene que dejarse editar asi que en esa instancia los datos se van a enviar desde el cliente

                        $orders = $order->fetchOrderById($id);
                        // prducto que se trae de la factura

                        $productsInBill = $billInfo["products"];
                        $data = [];


                        $totalPrice = 0;
                        // primero calculo el total para validarlo con lo que vino del cliente
                        foreach ($productsInBill as $key => $product) {
                            $totalPrice += intval($product["precio"]);
                        }

                        // verificando que ambos totales sean iguales
                        // if ($totalPrice == $billInfo['total'] or $totalPrice == $billInfo['total'] +1 or $totalPrice == $billInfo['total'] -1) {
                        if (true) {
                            // aqui configuro o estrcuutro el arreglo  $structure
                            foreach ($orders as $orderItem) {
                                $data[] = [
                                    "pedidoId" => $orderItem["id"],
                                    "precioTotal" => $totalPrice,
                                    "Usuario" => $billInfo["customer"] == null
                                        ? $orderItem["usuario"]
                                        : $billInfo["customer"],
                                    "encargadoPuntoVenta" => $mercasena->getPuntoVentaEncargado(),
                                    "fecha" => date('Y-m-d'),
                                    "telefono" => $billInfo['customersPhone'] == null
                                        ? $orderItem["telefono"]
                                        : $billInfo["customersPhone"],
                                    "direccion" => $billInfo['customerAddress'] == null
                                        ? $orderItem["direccion"]
                                        : $billInfo["customerAddress"],
                                    "nit" => $billInfo['customerNit'] == null
                                        ? $orderItem["nit"]
                                        : $billInfo["customerNit"],
                                    "productos" => $productsInBill
                                ];

                            }


                            // miramos quien fue el usuario que hizo el pedido y luego se le inyercta a la consulta
                            $user = $order->selectUserByOrder($data[0]["pedidoId"]);
                            // $saneamos las variables 
                            $user = $user[0]['id'];


                            // limpiamos 

                            // foreach ($ as $key => $value) {
                            //     # code...
                            // }
                            // file_put_contents('prueba.json', json_encode($productsInBill));
                            // echo json_encode(["mira" => "$productsInBill"]  );

                            $newData = json_encode($data);
                            // // y insertamos la factura
                            $bill->insert([
                                "usr_id" => $user,
                                "totalPrice" => $totalPrice,
                                "billData" => $newData,
                                "orderID" => $id,
                                "productsQuantity" => count($productsInBill)
                            ]);


                            // $order->delete($id);

                            // busca la ultima factura guardada la va a buscar apartir del serial del pedido despues de un segundo
                            sleep(1);
                            $billId = $bill->getBillIdByOrderID($id);
                            // echo json_encode(["mensagge" => "Pedido confirmado con exito",   "userID" => $user]);


                            // regisdtrando los productos en las ventas 
                            foreach ($productsInBill as $product) {
                                $sales->insert([
                                    "billID" => $billId["id"],
                                    "productID" => $product["id"],
                                    "quantity" => $product["cantidad"],
                                    "price" => $product["precio"],
                                    "productsQuantity" => count($productsInBill)
                                ]);
                            }
                            // elimina el pedido
                            $order->delete($id);
                            echo json_encode(["mensagge" => "  guardando nueva venta... configurando y guardando detalles"]);
                            // insertamos la venta

                        } else {
                            http_response_code(404);
                            echo json_encode(["error" => "El total de la factura no coincide con el total del pedido total medido $totalPrice"]);
                        }


                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;
                case "confirmBillWithoutOrder":
                    try {
                        include_once "../Models/Bill.php";
                        include_once "../Models/mercasena.php";
                        include_once "../Models/Sales/Sale.php";
                        include_once "../Models/Orders/order.php";
                        include_once "../Models/Orders/orderHasProducts.php";

                        $order = new Order();
                        $bill = new Bill();
                        $productsInOrder = new OrderHasProducts();
                        $sales = new Sale();
                        $mercasena = new MERCASENA();

                        // products in bill
                        $productsInBill = $data["dataObject"]["products"];
                        // id del pedido
                        $billInfo = $data["dataObject"];
                        $dataBill[] = [

                            "precioTotal" => $billInfo["total"],
                            "Usuario" => $billInfo["customer"] == null
                                ? 'usuario No definido ERROR'
                                : $billInfo["customer"],
                            "encargadoPuntoVenta" => $mercasena->getPuntoVentaEncargado(),
                            "fecha" => date('Y-m-d'),
                            "telefono" => $billInfo['customersPhone'] == null
                                ? ''
                                : $billInfo["customersPhone"],
                            "direccion" => $billInfo['customerAddress'] == null
                                ? ''
                                : $billInfo["customerAddress"],
                            "nit" => $billInfo['customerNit'] == null
                                ? ''
                                : $billInfo["customerNit"],
                            "productos" => $productsInBill
                        ];

                        // aqui nos traemos los datos de ese pedido
                        // recordar que la factura tiene que dejarse editar asi que en esa instancia los datos se van a enviar desde el cliente


                        // prducto que se trae de la factura

                        $newData = json_encode($dataBill);

                        $totalPrice = 0;
                        // primero calculo el total para validarlo con lo que vino del cliente
                        foreach ($productsInBill as $key => $product) {
                            $totalPrice += $product["precio"];
                        }

                        // verificando que ambos totales sean iguales
                        // if ($totalPrice == $billInfo['total'] or $totalPrice == $billInfo['total'] +1 or $totalPrice == $billInfo['total'] -1) {
                        if (true) {
                            // limpiamos 

                            // aqui es donde se crea la factura
                            $bill->createBillWithoutOrder([
                                "userName" => $billInfo['customer'],
                                // "totalPrice" => $billInfo[''],
                                "totalPrice" => $totalPrice,
                                "billData" => $newData,
                                "orderID" => 'sin pedido ,facturado desde cero',
                                "productsQuantity" => count($productsInBill)
                            ]);




                            // busca la ultima factura guardada la va a buscar apartir del serial del pedido despues de un segundo
                            sleep(1);
                            $billId = $bill->getLastBillByDate();
                            // echo json_encode(["mensagge" => "Pedido confirmado con exito",   "userID" => $user]);


                            // regisdtrando los productos en las ventas 
                            foreach ($productsInBill as $product) {
                                $sales->insert([
                                    "billID" => $billId,
                                    "productID" => $product["id"],
                                    "quantity" => $product["cantidad"],
                                    "price" => $product["precio"]
                                ]);
                            }

                            echo json_encode(["mensagge" => "  guardando nueva venta... configurando y guardando detalles"]);
                            // insertamos la venta
                        }
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }

                    break;
                default:
                    break;
            }
        }
    }
}

// PETICIONES GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // aca coje la peticion
    $data = $_GET;
    switch ($_GET["action"]) {


        case 'getBillsByDate':
            include_once "../Models/Bill.php";
            $bill = new Bill();
            // $userId = 'user_6@gm_682a519b1aeb78.24661902';

            // $billData = $bill->filterBillByUserName($_GET['username']);
            $billData = $bill->filterBillByDate($_GET['BillDate']);
            $response = [];
            // $data =  json_encode($billId);
            // $data =  $billId[0]['pedi_info'];
            // asignacion de otros componentes importantes en la factura
            //    $data =  $billId;
            // print_r($billData);

            // $billInfo = $billData[0]['pedi_info'];
            // // parseamos los datos en un json
            // // $billInfo = json_decode($billInfo, true);
            foreach ($billData as $key => $Bill) {
                //    valida si vino el cliente que no esta registrado para poner ese noombre
                if ($Bill['clienteNoRegistrado'] == null) {
                    $client = $Bill['cliente'];
                    $userBool = true;
                } else {
                    $userBool = false;
                    $client = $Bill['clienteNoRegistrado'];

                }

                $preData = [
                    "cantProductos" => $Bill['cantidad'],
                    // "fecha" => $Bill['fac_fechaBusqueda'],
                    "fecha" => $Bill['fecha'],
                    "cliente" => $client,
                    "total" => $Bill['precioTotal'],
                    "id" => $Bill['id'],
                    "isClientRegistered" => $userBool
                ];
                // print_r(value: $Bill);
                // print_r($billInfo);
                // meto los datos que extrai a el arreglod e response
                $response[] = $preData;
                // print_r($response);
            }

            echo json_encode($response);
            break;
        case 'getBillByUserName':
            include_once "../Models/Bill.php";
            $bill = new Bill();
            // $userId = 'user_6@gm_682a519b1aeb78.24661902';

            // $billData = $bill->filterBillByUserName($_GET['username']);
            $billData = $bill->filterBillByUserName($_GET['clientName']);
            $response = [];
            // $data =  json_encode($billId);
            // $data =  $billId[0]['pedi_info'];
            // asignacion de otros componentes importantes en la factura
            //    $data =  $billId;
            // print_r($billData);

            // $billInfo = $billData[0]['pedi_info'];
            // // parseamos los datos en un json
            // // $billInfo = json_decode($billInfo, true);
            foreach ($billData as $key => $Bill) {
                //    valida si vino el cliente que no esta registrado para poner ese noombre
                if ($Bill['clienteNoRegistrado'] == null) {
                    $client = $Bill['usr_nombre'];
                    $userBool = true;
                } else {
                    $userBool = false;
                    $client = $Bill['clienteNoRegistrado'];

                }

                $preData = [
                    "cantProductos" => $Bill['cantidad'],
                    // "fecha" => $Bill['fac_fechaBusqueda'],
                    "fecha" => $Bill['fecha'],
                    "cliente" => $client,
                    "total" => $Bill['precioTotal'],
                    "id" => $Bill['id'],
                    "isClientRegistered" => $userBool
                ];
                // print_r(value: $Bill);
                // print_r($billInfo);
                // meto los datos que extrai a el arreglod e response
                $response[] = $preData;
                // print_r($response);
            }

            echo json_encode($response);
            break;
        case 'getBillByUserNameAndDate':
            include_once "../Models/Bill.php";
            $bill = new Bill();
            // $userId = 'user_6@gm_682a519b1aeb78.24661902';

            // $billData = $bill->filterBillByUserName($_GET['username']);
            $billData = $bill->filterBillByUserNameAndDate($_GET["BillDate"], $_GET["clientName"]);
            $response = [];
            // $data =  json_encode($billId);
            // $data =  $billId[0]['pedi_info'];
            // asignacion de otros componentes importantes en la factura
            //    $data =  $billId;
            // print_r($billData);

            // $billInfo = $billData[0]['pedi_info'];
            // // parseamos los datos en un json
            // // $billInfo = json_decode($billInfo, true);
            foreach ($billData as $key => $Bill) {
                //    valida si vino el cliente que no esta registrado para poner ese noombre
                if ($Bill['clienteNoRegistrado'] == null) {
                    $client = $Bill['usr_nombre'];
                    $userBool = true;
                } else {
                    $userBool = false;
                    $client = $Bill['clienteNoRegistrado'];

                }

                $preData = [
                    "cantProductos" => $Bill['cantidad'],
                    // "fecha" => $Bill['fac_fechaBusqueda'],
                    "fecha" => $Bill['fecha'],
                    "cliente" => $client,
                    "total" => $Bill['precioTotal'],
                    "id" => $Bill['id'],
                    "isClientRegistered" => $userBool
                ];
                // print_r(value: $Bill);
                // print_r($billInfo);
                // meto los datos que extrai a el arreglod e response
                $response[] = $preData;
                // print_r($response);
            }

            echo json_encode($response);
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
        case 'getBillId':
            try {
                include_once "../Models/Bill.php";
                $bill = new Bill();
                $billId = $bill->getBillId();
                echo json_encode($billId);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        case "getMinimalBillInfoForUser":
            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

                // iniciamos session 
                session_id($sessionToken);
                session_start();
                if (isset($_SESSION['userId'])) {
                    include_once "../Models/Bill.php";
                    $bill = new Bill();
                    // $userId = 'user_6@gm_682a519b1aeb78.24661902';
                    $userId = $_SESSION['userId'];
                    $billData = $bill->getBillInfoByUser($userId);
                    $response = [];
                    // $data =  json_encode($billId);
                    // $data =  $billId[0]['pedi_info'];
                    // asignacion de otros componentes importantes en la factura
                    //    $data =  $billId;
                    // print_r($billData);

                    $billInfo = $billData[0]['pedi_info'];
                    // parseamos los datos en un json
                    // $billInfo = json_decode($billInfo, true);
                    foreach ($billData as $key => $Bill) {
                        // parse el json
                        $billInfo = json_decode($Bill['pedi_info'], true);
                        $preData = [
                            "cantProductos" => $Bill['cant_productos'],
                            // "fecha" => $Bill['fac_fechaBusqueda'],
                            "fecha" => $Bill['fac_fecha'],
                            "cliente" => $billInfo[0]['Usuario'],
                            "total" => $Bill['fac_precioTotal'],
                            "id" => $Bill['fac_id']
                        ];
                        // print_r(value: $Bill);
                        // print_r($billInfo);
                        // meto los datos que extrai a el arreglod e response
                        $response[] = $preData;
                        // print_r($response);
                    }

                    echo json_encode($response);
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion ".json_encode($_SESSION)]);
                }

            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
                throw $th;
            }
            break;
        case 'downloadBill':
            try {
                // verificacion de la session 
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                if (!Auth::checkInicializateSession()) {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion"]);
                    exit();
                } else {
                    // iniciamos session 
                    session_id($sessionToken);
                    session_start();

                    include_once "../Models/Bill.php";
                    include_once "../Models/User.php";
                    include_once "../Models/mercasena.php";
                    $bill = new Bill();
                    $billId = $_GET["billId"];

                    $billData = $bill->getBillInfoByID($billId);
                    // verificacion de que la factura si pertenesca a ese usuario
                    if (User::isUsersBill($_SESSION['userId'], $billData)) {
                        // guardando los datos recolectados de la factura


                        $billJSONData = json_decode($billData['pedi_info'], true);
                        $billJSONData[0]['fac_id'] = $billId;

                        // guardamos los datos en la session
                        $_SESSION['billInfo'] = json_encode($billJSONData);

                        // devuelve la informacion
                        echo json_encode(["url" => MERCASENA::getServerAddress() . "/mercasena/app/Downloader/index.php?id=" . session_id()]);
                        // echo json_encode(["url" => MERCASENA::getServerAddress() . "/app/Downloader/index.php?id=" . session_id()]);
                        // header("Location: ../Downloader/");

                    } else {
                        // devolvera que la factura no le pertenece
                        http_response_code(401);
                        echo json_encode(["error" => "esta factura no te  pertenece"]);
                        exit();
                    }

                }

            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);//throw $th;
            }
            break;
        case 'downloadBillForAdmin':
            try {
                // verificacion de la session 
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                if (!Auth::checkInicializateSession()) {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion"]);
                    exit();
                } else {
                    // iniciamos session 
                    session_id($sessionToken);
                    session_start();

                    include_once "../Models/Bill.php";
                    include_once "../Models/User.php";
                    include_once "../Models/mercasena.php";
                    $bill = new Bill();
                    $billId = $_GET["billId"];

                    $billData = $bill->getBillInfoByID($billId);
                    // verificacion de que la factura si pertenesca a ese usuario
                    if (Auth::checkAdminPrvileges()) {
                        // guardando los datos recolectados de la factura


                        $billJSONData = json_decode($billData['pedi_info'], true);
                        $billJSONData[0]['fac_id'] = $billId;

                        // guardamos los datos en la session
                        $_SESSION['billInfo'] = json_encode($billJSONData);

                        echo json_encode(["url" => MERCASENA::getServerAddress() . "/mercasena/app/Downloader/index.php?id=" . session_id()]);
                        // header("Location: ../Downloader/");

                    } else {
                        // devolvera que la factura no le pertenece
                        http_response_code(401);
                        Auth::insuficientPrivileges();
                        // echo json_encode(["error" => "esta factura no te  pertenece"]);
                        exit();
                    }

                }

            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);//throw $th;
            }
            break;
        case 'getBillByID':

            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

                // iniciamos session 
                session_id($sessionToken);
                session_start();
                // verificamops si existe un id del usuario  si no lo deveulve
                if (isset($_SESSION['userId'])) {

                    include_once "../Models/Bill.php";
                    include_once "../Models/User.php";

                    $bill = new Bill();

                    $billId = $_GET["billID"];
                    $billInfo = $bill->getBillInfoByID($billId);

                    // verifcamos que la factura si sea de ese usuario 
                    if (User::isUsersBill($_SESSION['userId'], $billInfo)) {
                        // agrego el id del comprobante de la factura a la factura
                        // aqui tranformio la cadena de texto a json 
                        $billData = json_decode($billInfo['pedi_info'], true);

                        $billData[0]['id'] = $billInfo['fac_id'];

                        echo json_encode($billData);

                    } else {
                        http_response_code(401);
                        echo json_encode(["error" => "No se ha iniciado sesion"]);

                    }
                    # code...
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion"]);
                    exit();
                }


            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        case 'getBillByIDForAdmin':

            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

                // iniciamos session 
                session_id($sessionToken);
                session_start();
                // verificamops si existe un id del usuario  si no lo deveulve
                if (isset($_SESSION['userId'])) {

                    include_once "../Models/Bill.php";
                    include_once "../Models/User.php";

                    $bill = new Bill();



                    // verifcamos que la factura si sea de ese usuario 
                    if (Auth::checkAdminPrvileges()) {
                        $billId = $_GET["billID"];
                        $billInfo = $bill->getBillInfoByID($billId);
                        // agrego el id del comprobante de la factura a la factura
                        // aqui tranformio la cadena de texto a json 
                        $billData = json_decode($billInfo['pedi_info'], true);

                        $billData[0]['id'] = $billInfo['fac_id'];

                        echo json_encode($billData);

                    } else {
                        http_response_code(401);
                        echo json_encode(["error" => "no tienes los permisos"]);

                    }
                    # code...
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion"]);
                    exit();
                }


            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        default:
            http_response_code(405);
            // echo json_encode(["error" => "Metodo no permitido"]);
            exit();
    }

}

// PETICIONES PUT 
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    // agregar foto del producto

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

    switch ($data["action"]) {
        //     //! LAS PARTES DE ELIMINAR=====






        default;
        // para guardar la categoria

    }

}

?>