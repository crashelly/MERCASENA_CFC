<?php
include_once '../Models/Products/ProductSubCategory.php';
include_once '../Models/Auth.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,mercasena-token,x-csrf-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
    // $sessionToken = $data['dataObject']["sessionToken"]; 
    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion $sessionToken"]);
        exit();
        # code...
    } else {
        // seteamos el id de la session
        session_id($sessionToken);

        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();

        // agregar foto del producto
        if (isset($_FILES['image'])) {
            $online_public_path = "http://192.168.1.33/mercasena/public/images/";
            $currentPath = __DIR__;

            $oneLevelUp = dirname($currentPath);
            // directorio base 
            $base_path = dirname($oneLevelUp);

            $dir = $base_path . "/mercasena/public/images/";
            $dir = "/mercasena/public/images/";
            $uploadFile = $dir . basename($_FILES['image']['name']);
            $errors = [];
            $file_name = $_FILES['image']['name'];
            $file_size = $_FILES['image']['size'];
            $file_tmp = $_FILES['image']['tmp_name'];
            $file_type = $_FILES['image']['type'];





            $file_ext_parts = explode('.', $_FILES['image']['name']);
            $file_ext = strtolower(end($file_ext_parts));
            // $file_ext = strtolower(end(explode('.', $_FILES['image']['name'])));

            $extensions = ["jpeg", "jpg", "png"];

            if (in_array($file_ext, $extensions) === false) {
                $errors[] = "Extensión no permitida, por favor elige un archivo JPEG o PNG.";
            }

            if ($file_size > 2097152) {
                $errors[] = 'El tamaño del archivo debe ser menor de 2 MB';
            }
            //  aqui guarda la imagen 
            if (empty($errors) == true && Auth::checkAdminPrvileges()) {
                move_uploaded_file($file_tmp, "../../public/images/" . $file_name);
                // echo json_encode((["ruta"=>$online_public_path.$file_name]));

                include "../Models/Products/ProductImage.php";

                $image = new ProductImage();
                $product = $image->checkLastProduct();

                $image->insert([
                    "subCat_id" => $product["subCat_id"],
                    "prodImg_ruta" => $dir . $file_name,
                    "prodImg_miniatura" => 1
                ]);

                echo json_encode(["mensagge" => "La imagen de tu producto ha sido guardada con exito", "type" => "imageProduct"]);
            } else {
                // echo "Error: " . implode(', ', $errors);
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);

            }

            // agregar foto del producto

        } else {
            if (isset($_FILES['Uptimage'])) {
                $online_public_path = "http://192.168.1.33/mercasena/public/images/";
                $currentPath = __DIR__;

                $oneLevelUp = dirname($currentPath);
                // directorio base 
                $base_path = dirname($oneLevelUp);

                $dir = $base_path . "public/images/";
                $uploadFile = $dir . basename($_FILES['Uptimage']['name']);
                $errors = [];
                $file_name = $_FILES['Uptimage']['name'];
                $file_size = $_FILES['Uptimage']['size'];
                $file_tmp = $_FILES['Uptimage']['tmp_name'];
                $file_type = $_FILES['Uptimage']['type'];

                $file_ext_parts = explode('.', $_FILES['Uptimage']['name']);
                $file_ext = strtolower(end($file_ext_parts));
                $extensions = ["jpeg", "jpg", "png"];

                if (in_array($file_ext, $extensions) === false) {
                    $errors[] = "Extensión no permitida, por favor elige un archivo JPEG o PNG.";
                }

                if ($file_size > 2097152) {
                    $errors[] = 'El tamaño del archivo debe ser menor de 2 MB';
                }
                //  aqui guarda la imagen 
                if (empty($errors) == true) {
                    move_uploaded_file($file_tmp, "../../public/images/" . $file_name);
                    // echo json_encode((["ruta"=>$online_public_path.$file_name]));

                    include "../Models/Products/ProductImage.php";

                    $image = new ProductImage();
                    // $product = $image->checkLastProduct();

                    $image->update($image->extractProdImgID(), [
                        "prodImg_ruta" => "/mercasena/public/images/" . $file_name,
                        "prodImg_miniatura" => 1
                    ]);
                    // echo json_encode(["id_IMAGEN" =>]);
                    echo json_encode(["mensagge " => "imagen guardadaa con exito"]);
                } else {
                    echo json_encode(["error" => $errors]);
                    // echo "Error: " . implode(', ', $errors);
                }
            } else {
                switch ($data["action"]) {
                    //! LAS PARTES DE GUARDAR =====

                    case "saveProduct":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/Product.php";
                                $product = new Product();
                                $dataSend = [
                                    "prod_nombre" => $data["objectData"]["productName"],
                                ];
                                $product->insert($dataSend);

                                echo json_encode(["mensagge" => "Producto guardado coon exito", "type" => "baseProduct"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }
                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;
                    case "changeVisibility":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductSubCategory.php";
                                $product = new ProductSubCategory();
                                // extraigo el id
                                $dataSend = [
                                    "id" => $data["dataObject"]["id"],
                                ];
                                // apartir de como venga la validacion se vuelve visible o no el rpodcuto
                                if ($data["dataObject"]["visibility"] == true) {
                                    $product->makeVisible($dataSend);
                                } else {
                                    $product->makeInvisible($dataSend);

                                }

                                echo json_encode(["mensagge" => "estado actualizado con exito", "type" => "baseProduct"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }
                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;

                    case "saveProductWithSubCategory":

                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductSubCategory.php";
                                $product = new ProductSubCategory();
                                $object = $data["dataObject"];
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
                                echo json_encode(["mensagge" => "Producto guardado con exito", "type" => "product"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            echo json_encode(["error" => $th->getMessage()]);
                            http_response_code(404);
                        }
                        break;
                    case "devolver":
                        try {
                            $object = $data["dataObject"];
                            // file_put_contents("plantillas/plantilla.json",json_encode($object));
                            // echo json_encode($object);
                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;
                    // para guardar la categoria
                    case "saveCategory":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductCategory.php";
                                $product = new ProductCategory();
                                $dataSend = [
                                    "categoria" => $data["objectData"]["categoryName"]
                                ];
                                $product->insert($dataSend);
                                echo json_encode(["mensagge" => "Categoria  guardada  con exito", "type" => "Category"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;


                    case "saveMeasurement":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductMeasurement.php";
                                $product = new ProductMeasurement();
                                $dataSend = [
                                    "prodMed_medida" => $data["objectData"]["name"],
                                    "prodMed_factor" => $data["objectData"]["factor"]
                                ];
                                $product->insert($dataSend);
                                echo json_encode(["mensagge" => "medida  agregada  con exito", "type" => "measurement"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;

                    //?  ACTUALIZAR =====

                    default:
                        http_response_code(400);
                        break;
                }
            }


        }
    }
}

// PETICIONES GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // aca coje la peticion
    $data = $_GET;
    switch ($_GET["action"]) {
        case 'getCategories':
            try {

                include_once "../Models/Products/ProductCategory.php";
                $category = new ProductCategory();
                // se trae la categorias
                $categoryData = $category->select();
                // las devuelve al navegador
                echo json_encode($categoryData);
            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'getProductsByCategory':
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $category = new ProductSubCategory();
                // se trae la categorias
                $categoryData = $category->fetchByCategory($_GET["categoryId"]);
                // las devuelve al navegador
                echo json_encode($categoryData);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "No se encontraron productos $th "]);
            }

            break;
        case "getAllProducts":
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $products = new ProductSubCategory();
                $data = $products->fetchAllProducts();
                echo json_encode($data);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "no se encontraron productos"]);
            }
            break;
        case "getProductInfoForMinimalStock":
            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                // verifica si se inicio session
                if (Auth::checkInicializateSession()) {
                    session_id($sessionToken);
                    session_start();
                    // verficando si la cnsulta vien del administrador
                    if (Auth::checkAdminPrvileges()) {
                        include_once "../Models/Products/ProductSubCategory.php";
                        $products = new ProductSubCategory();
                        $data = $products->fetchMinimalStockInfo($_GET['id']);
                        $response = [
                            "product" => $data[0]['producto'],
                            "variation" => $data[0]['variacion'],
                            "id" => $data[0]['id'],
                            "measurement" => $data[0]['medida'],
                            "minimalStock" => $data[0]['minimoStock']
                        ];
                        echo json_encode($response);
                    } else {
                        Auth::insuficientPrivileges();
                        // http_response_code(403);
                        // echo  json_encode(["error"=> "no tienes los suficientes perfmisos"]);
                    }
                } else {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion  "]);
                }

            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        case "getInfoProductsForShop":
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $products = new ProductSubCategory();
                $data = $products->fetchProductsInfoForShop();
                echo json_encode($data);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "no se encontraron productos"]);
            }
            break;
        case "getInfoProductsForAdmin":
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $products = new ProductSubCategory();
                $data = $products->fetchProductsInfoForAdmin();
                echo json_encode($data);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "no se encontraron productos"]);
            }
            break;
        case 'getMeasurementById':
            try {
                include_once "../Models/Products/ProductMeasurement.php";
                $category = new ProductMeasurement();
                // se trae la categorias
                $categoryData = $category->fetchById($_GET["id"]);
                // las devuelve al navegador
                echo json_encode($categoryData);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "No se encontraron productos"]);
            }
            break;
        case 'getLowStockProductsInfo':
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $LowStockProducts = new ProductSubCategory();
                // se trae la categorias
                $LowStockProductsData = $LowStockProducts->fetchLowAndZeroProducts();
                // las devuelve al navegador
                echo json_encode($LowStockProductsData);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "No se encontraron productos"]);
            }
            break;
        case 'getLowStockProductsCounter':
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $LowStockProducts = new ProductSubCategory();
                // se trae la categorias
                $LowStockProductsData = $LowStockProducts->countLowOrOutStockProducts();
                // las devuelve al navegador
                echo json_encode($LowStockProductsData);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "No se encontraron productos"]);
            }
            break;
        // cogiendo todos los datos 



        case "getAllMeasurements":
            try {
                include_once "../Models/Products/ProductMeasurement.php";
                $products = new ProductMeasurement();
                $data = $products->fetchAllMeasurements();
                echo json_encode($data);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => "no se encontraron medidas"]);
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

        case "getProductsByName":
            try {
                include_once "../Models/Products/ProductSubCategory.php";
                $products = new ProductSubCategory();
                $data = $products->fetchProductsByName($_GET['pseudoname']);
                echo json_encode($data);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'getProductInfo':
            try {
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
                // verifica si se inicio session
                if (Auth::checkInicializateSession()) {
                    session_id($sessionToken);
                    session_start();
                    // verficando si la cnsulta vien del administrador
                    if (Auth::checkAdminPrvileges()) {
                        include_once "../Models/Products/ProductSubCategory.php";
                        $products = new ProductSubCategory();
                        $data = $products->fetchProductInfo($_GET['id']);
                        echo json_encode($data);
                    } else {
                        Auth::insuficientPrivileges();
                        // http_response_code(403);
                        // echo  json_encode(["error"=> "no tienes los suficientes perfmisos"]);
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
            http_response_code(400);
            echo json_encode(["mensagge" => "bad request"]);
            exit();

    }
    exit();

}

// PETICIONES PUT 
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
    // $sessionToken = $data['dataObject']["sessionToken"]; 
    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion"]);
        exit();
        # code...
    } else {
        // seteamos el id de la session
        session_id($sessionToken);

        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();

        // VERIFICACION DE CODIGO CSRF
        // extraccion del token csrf 
        $csrf_token = $headers['x-csrf-token'];
        // verificacion del token csrf
        if (!hash_equals($_SESSION['Csrf_token'], $csrf_token)) {
            // if (!isset($_SESSION['Csrf_token']) || $_SESSION['Csrf_token'] != $data["dataObject"]['tokenCsfr']) {
            http_response_code(403);
            echo json_encode(["error" => "Token CSRF inválido"]);
            exit();
        } else {

            // verificacion de si la peticion tiene permisos de adminsitrador
            if (Auth::checkAdminPrvileges()) {

                switch ($data["action"]) {
                    //! LAS PARTES DE GUARDAR =====

                    case "updateBaseProduct":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/Product.php";
                                $product = new Product();
                                $dataSend = [
                                    "nombre" => $data["objectData"]["productName"],
                                ];
                                $product->update($data["objectData"]["id"], $dataSend);

                                echo json_encode(["mensagge" => "Producto actualizado  con exito", "type" => "baseProduct", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }
                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;

                    case "updateProductWithSubCategory":

                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductSubCategory.php";
                                $product = new ProductSubCategory();
                                $object = $data["objectData"];
                                $dataSend = [
                                    "id" => $object["id"],
                                    "prod_id" => $object["baseProduct"],
                                    "variacion" => $object["variant"],
                                    "stock" => $object["stock"],
                                    "precio" => $object["price"],
                                    "medida" => $object["measurement"],
                                    "categoria" => $object["category"]
                                ];
                                $product->update($object['id'], $dataSend);
                                echo json_encode(["mensagge" => "Producto actualizado  con exito", "type" => "product", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;
                    case "rechargeInventary":
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductSubCategory.php";
                                $productSubCategory = new ProductSubCategory();
                                $object = $data["dataObject"];
                                // bucle que actualiza el stock de los productos

                                foreach ($object['products'] as $key => $product) {
                                    $dataSend = [
                                        "id" => $product['id'],
                                        "prodName" => $product['name'],
                                        "observation" => $product['observations'],
                                        "oldQuantity" => $product['oldQuantity'],
                                        "newQuantity" => $product['newQuantity']
                                    ];
                                    $productSubCategory->rechargeInventary($dataSend);
                                }

                                echo json_encode(["mensagge" => "Inventario actualizado  con exito gracias ❤ ", "type" => "product", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                            // echo json_encode(["mensagge" => $data, "type" => "product", "executedAction" => "update"]);
                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;
                    case "devolver":
                        try {
                            $object = $data["dataObject"];
                            // $object = $data;
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

                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductCategory.php";
                                $product = new ProductCategory();
                                $dataSend = [
                                    "nuevaCategoria" => $data["objectData"]["categoryName"]
                                ];
                                $product->update($data["objectData"]["id"], $dataSend);
                                echo json_encode(["mensagge" => "Categoria  actualizada   con exito", "type" => "Category", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;
                    case "updateMinStockForAlert":
                        try {

                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductSubCategory.php";
                                $product = new ProductSubCategory();
                                $dataSend = [
                                    "minStock" => $data["objectData"]["minimalStock"],
                                    "id" => $data["objectData"]["id"]
                                ];
                                $product->updateMinimalStock($dataSend);
                                echo json_encode(["mensagge" => "alerta de stock bajo actualizada con exito", "type" => "Product", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;


                    case "updateMeasurement":
                        try {

                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/ProductMeasurement.php";
                                $product = new ProductMeasurement();
                                $dataSend = [
                                    "nuevaMedida" => $data["objectData"]["name"],
                                    "prodMed_factor" => $data["objectData"]["factor"]
                                ];
                                $product->update($data["objectData"]["id"], $dataSend);
                                echo json_encode(["mensagge" => "medida  actualizada   con exito", "type" => "measurement", "executedAction" => "update"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception $th) {
                            http_response_code(404);
                            echo json_encode(["error" => $th->getMessage()]);
                        }
                        break;

                    //?  ACTUALIZAR =====

                    case 'updateProduct':
                        try {
                            if (Auth::checkAdminPrvileges()) {
                                include_once "../Models/Products/Product.php";
                                $product = new Product();
                                $id = $data["id"];

                                $dataArr = [
                                    "nombre" => $data["name"]
                                ];
                                $product->update($id, $dataArr);
                                echo json_encode(["mensagge" => "producto actualizado con exito"]);
                            } else {
                                Auth::insuficientPrivileges();
                            }

                        } catch (Exception) {
                            echo json_encode(["error" => "algo paso y no se actualizaron los datos"]);

                        }

                    default:
                        http_response_code(400);
                        echo json_encode(["error" => "no se encontro la accion"]);
                        break;
                }

            } else {
                http_response_code(401);
                echo json_encode(["error" => "No se ha iniciado sesion como administrador  "]);
            }

        }
    }
}

// PETICIONES DELETE 
if ($_SERVER["REQUEST_METHOD"] == "DELETE") {
    $headers = getallheaders();
    $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
    // $sessionToken = $data['dataObject']["sessionToken"]; 
    if ($sessionToken == null) {
        http_response_code(401);
        echo json_encode(["error" => "No se ha iniciado sesion"]);
        exit();
        # code...
    } else {
        // seteamos el id de la session
        session_id($sessionToken);

        // despues iniciamos session para poder tener los datos de la antigua session
        session_start();

        // VERIFICACION DE CODIGO CSRF
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
                //     //! LAS PARTES DE GUARDAR =====
                case "devolver":
                    try {

                        $object = $data["dataObject"];
                        // file_put_contents("plantillas/plantilla.json",json_encode($object));
                        echo json_encode($object);
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;
                case "deleteBaseProduct":
                    try {
                        if (Auth::checkAdminPrvileges()) {
                            include_once "../Models/Products/Product.php";
                            $product = new Product();

                            $id = $data["dataObject"]["id"];

                            $product->delete($id);
                            echo json_encode(["mensagge" => "Producto-base  eliminado con exito"]);
                        } else {
                            Auth::insuficientPrivileges();
                        }
                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;

                case "deleteProduct":
                    try {
                        if (Auth::checkAdminPrvileges()) {
                            include_once "../Models/Products/ProductSubCategory.php";
                            $product = new ProductSubCategory();

                            $id = $data["dataObject"]["id"];

                            $product->delete($id);
                            echo json_encode(["mensagge" => "Producto    eliminado con exito"]);
                        } else {
                            Auth::insuficientPrivileges();
                        }


                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;
                case "deleteCategory":
                    try {
                        if (Auth::checkAdminPrvileges()) {
                            include_once "../Models/Products/ProductCategory.php";
                            $category = new ProductCategory();

                            $id = $data["dataObject"]["id"];

                            $category->delete($id);
                            echo json_encode(["mensagge" => " Categoria   eliminada con exito"]);
                        } else {
                            Auth::insuficientPrivileges();
                        }


                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;
                case "deleteMeasurement":
                    try {
                        if (Auth::checkAdminPrvileges()) {
                            include_once "../Models/Products/ProductMeasurement.php";
                            $measurement = new ProductMeasurement();

                            $id = $data["dataObject"]["id"];

                            $measurement->delete($id);
                            echo json_encode(["mensagge" => " Medida   eliminada con exito"]);
                        } else {
                            Auth::insuficientPrivileges();
                        }


                    } catch (Exception $th) {
                        http_response_code(404);
                        echo json_encode(["error" => $th->getMessage()]);
                    }
                    break;



                default;
                    http_response_code(401);

            }
        }

    }
}
?>