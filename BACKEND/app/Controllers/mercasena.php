<?php
// include_once '../Models/Products/ProductSubCategory.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,x-csrf-token,mercasena-token");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
header("Content-Type: application/json");

$data = json_decode(file_get_contents("php://input"), true);
// fecha actual
$currentDate = date('Y-m-d');
// inicio la session

include "../Models/Auth.php";


// PETICIONES GET
if ($_SERVER["REQUEST_METHOD"] == "GET") {
    // aca coje la peticion
    $data = $_GET;
    switch ($_GET["action"]) {
        case 'getWhatsappNumber':
            try {

                include_once "../Models/mercasena.php";
                $mercasena = new MERCASENA();
                // se trae las imagenes
                $data = $mercasena->fetchWhatsappNumber();
                // las devuelve al navegador
                echo json_encode($data);
            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'getBannerImages':
            try {

                include_once "../Models/mercasena.php";
                $mercasena = new MERCASENA();
                // se trae las imagenes
                $data = $mercasena->fetchAllBannerImages();
                // las devuelve al navegador
                echo json_encode(["images" => $data]);
            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'getBannerImagesForAdmin':
            try {

                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;


                if (!Auth::checkInicializateSession()) {
                    http_response_code(401);
                    throw new Exception("No se ha iniciado sesion");

                } else {
                    session_id($sessionToken);

                    // despues iniciamos session para poder tener los datos de la antigua session
                    session_start();
                    if (Auth::checkAdminPrvileges()) {
                        // seteamos el id de la session


                        include_once "../Models/mercasena.php";
                        $mercasena = new MERCASENA();
                        // se trae las imagenes
                        $data = $mercasena->fetchAllBannerImagesWithID();
                        // las devuelve al navegador
                        echo json_encode(["images" => $data]);
                    } else {

                        Auth::insuficientPrivileges();
                    }


                }


            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'sendEmail':
            try {

                include_once "../Models/mercasena.php";
                $mercasena = new MERCASENA();
                $code = MERCASENA::createVerificationCode();
                $data = [
                    "address" => 'colchondeSpam@gmail.com',
                    "subject" => 'Codigo de verficacion',
                    "body" => '
                                    <h2>Solicitud de Cambio de Contraseña</h2>
                    <p>Hola,</p>
                    <p>Nos hemos dado cuenta de que has solicitado cambiar tu contraseña. Si no realizaste esta solicitud, por favor ignora este correo.</p>
                    <p>Para completar el proceso de cambio de contraseña, utiliza el siguiente código de verificación:</p>
                    <h3>' . $code . '</h3>
                    <p>Este código es válido por 10 minutos.</p>
                    <p>Gracias,</p>
                    <p>El equipo de MERCASENA</p>
                    '
                ];
                // se trae las imagenes
                $data = $mercasena->sendEmail($data);
                // las devuelve al navegador

            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage()]);
            }

            break;
        case 'getMeasurementsInfo':
            // Leer el contenido del archivo JSON
            $dir = dirname(__DIR__, 2) . '/config/medidas.json';
            $jsonContent = file_get_contents($dir);

            // Decodificar el JSON a un array asociativo
            $medidas = json_decode($jsonContent, true);

            // Imprimir el array asociativo
            echo json_encode($medidas);
            break;
        case 'getPuntoDeVentaProgress':
            try {
                include_once '../Models/mercasena.php';
                $mercasena = new MERCASENA();
                $data = $mercasena->calculateSellProgress();
                echo json_encode($data);
            } catch (\Throwable $th) {
                //throw $th;
            }
            break;
        case 'getPuntoDeVentaInfo':


            try {
                 $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;


                if (!Auth::checkInicializateSession()) {
                    http_response_code(401);
                    throw new Exception("No se ha iniciado sesion");

                } else {
                    session_id($sessionToken);

                    // despues iniciamos session para poder tener los datos de la antigua session
                    session_start();
                if (Auth::checkAdminPrvileges()) {
                    include_once "../Models/mercasena.php";
                    $puntoVenta = new MERCASENA();

                    $dataSend = $puntoVenta->select();

                    echo json_encode($dataSend);
                } else {
                    Auth::insuficientPrivileges();
                }
            }


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
        if (isset($_FILES['BannerImage'])) {
            $online_public_path = "http://192.168.1.33/mercasena/public/images/";
            $currentPath = __DIR__;

            $oneLevelUp = dirname($currentPath);
            // directorio base 
            $base_path = dirname($oneLevelUp);


            $dir = "/public/assets/banner/images/";
            $uploadFile = $dir . basename($_FILES['BannerImage']['name']);
            $errors = [];
            $file_name = $_FILES['BannerImage']['name'];
            $file_size = $_FILES['BannerImage']['size'];
            $file_tmp = $_FILES['BannerImage']['tmp_name'];
            $file_type = $_FILES['BannerImage']['type'];





            $file_ext_parts = explode('.', $_FILES['BannerImage']['name']);
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
            // if (empty($errors) == true && Auth::checkAdminPrvileges()) {
            if (empty($errors) == true && true) {
                // guardando la imagen en los banner
                move_uploaded_file($file_tmp, "../../public/assets/banner/images/" . $file_name);


                include "../Models/mercasena.php";

                $image = new Mercasena();

                // guardamos la imagen en la db
                $image->saveImage($dir . $file_name);


                echo json_encode(["mensagge" => "La imagen publicitaria  ha sido guardada con exito", "type" => "imageProduct"]);
            } else {
                // echo "Error: " . implode(', ', $errors);
                http_response_code(404);
                echo json_encode(["error" => implode(', ', $errors)]);

            }

            // agregar foto del producto

        } else {
            switch ($data["action"]) {
                //! LAS PARTES DE GUARDAR =====

                case "updatePuntoVenta":
                    try {
                        include_once "../Models/mercasena.php";
                        $puntoVenta = new MERCASENA();

                        $dataSend = [
                            'regional' => $data["dataObject"]['regional'],
                            'encargado' => $data["dataObject"]['encargado'],
                            'metaAnual' => $data["dataObject"]['metaAnual'],
                            'whatsapp' => $data["dataObject"]['whatsapp'],
                            'ubicacion' => $data["dataObject"]['ubicacion'],
                            'centroFormacion' => $data["dataObject"]['centroFormacion']
                        ];
                        $puntoVenta->update('1', $dataSend);

                        echo json_encode(["mensagge" => "Informacion de punto de venta actualizado con exito", "type" => "baseProduct", "executedAction" => "update"]);


                        // echo json_encode($data);
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
if ($_SERVER["REQUEST_METHOD"] == "PUT") {
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


        switch ($data["action"]) {
            //! LAS PARTES DE GUARDAR =====

            case "updatePuntoVenta":
                try {
                    include_once "../Models/mercasena.php";
                    $puntoVenta = new MERCASENA();

                    $dataSend = [
                        'regional' => $data['nombre'],
                        'encargado' => $data['encargado'],
                        'metaAnual' => $data['metaAnual'],
                        'whatsapp' => $data['whatsapp'],
                        'ubicacion' => $data['ubicacion'],
                        'centroFormacion' => $data['centroFormacion']
                    ];
                    $puntoVenta->update($data["objectData"]["id"], $dataSend);

                    echo json_encode(["mensagge" => "Informacion de punto de venta actualizado con exito", "type" => "baseProduct", "executedAction" => "update"]);


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
                case "deleteBannerImage":
                    try {
                        if (Auth::checkAdminPrvileges()) {
                            include_once "../Models/mercasena.php";
                            $image = new Mercasena();

                            $id = $data["dataObject"]["id"];

                            // se trae la ruta de la iamgen 
                            $dbImagePath = $image->selectImageByID($id);
                            // elimina la ruta de la imagen de la base de datos 

                            // obtiene la ruta de la imagen que se trajo de la db para despues ponerla en rut absoluta
                            $imagePath = $dbImagePath[0]['ruta'];

                            // aqui se completa la ruta con al ruta delñ servirodr mas la de la foto
                            $basePath = dirname(__DIR__, 2);
                            $path = $basePath . $imagePath;


                            $image->deleteImageFromServer($path);
                            $image->deleteImageFromDb($id);
                            echo json_encode(["mensagge" => "Imagen publicitaria eliminada con exito"]);
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