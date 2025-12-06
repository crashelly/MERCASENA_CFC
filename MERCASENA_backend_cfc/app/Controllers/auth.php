<?php


header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type,mercasena-token,x-csrf-token");
header("Content-Type: application/json");


$data = json_decode(file_get_contents("php://input"), true);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // aqui extraemos los datos del json
    // $data = json_decode( file_get_contents('php://input'), true);
    $action = $data['action'];

    switch ($action) {
        case "register":
            try {
                include_once '../Models/User.php';
                $user = new User();
                // creacion del nuevo usuario

                $email = $data['dataObject']['email'];
                $name = $data['dataObject']['name'];


                $password = $data['dataObject']['password'];

                // encripta la contraseña
                $password_hash = password_hash($password, PASSWORD_DEFAULT);
                // genero el id unico del usuario
                $id = $user->genenerateUniqueId($email);
                $data = [
                    "id" => $id,
                    "email" => $email,
                    "name" => $name,
                    "password" => $password_hash
                ];
                $user->insert($data);
                echo json_encode(["mensagge" => "Usuario registrado con exito", "estado" => "ok"]);
            } catch (Exception $th) {
                echo json_encode(["mensagge" => $th->getMessage(), "estado" => "bad register"]);
            }

            break;
        case "login":
            include_once '../Models/Auth.php';
            // session_start();
            $user = new Auth($data['dataObject']['email'], $data['dataObject']["password"]);
            // $user->email = $data["correo"];
            // $user->password = $data["contrasena"];
            // $user->email =;
            // $user->password = ;
            // MEJORAR POR TEMAS DE SEGURIDAD
            try {

                $userData = $user->login();

                // devuelve los datos
                echo json_encode($userData);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage(), "estado" => "bad login"]);
            }
            break;
        case "checkPrivileges":
            // verficia si al inicarse lka session en verda fue el administrador si no lo cancela
            $headers = getallheaders();
            $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;
            if ($sessionToken == null) {
                http_response_code(401);
                echo json_encode(["error" => "No se ha iniciado sesion"]);
                exit();
                # code...
            } else {
                session_id($sessionToken);
                session_start();
                if ($_SESSION['permission'] == 3) {
                    echo json_encode(["response" => true]);
                } else {
                    // session_destroy();
                    echo json_encode(["response" => false]);
                    # code...
                }
            }
            break;
        case "forgotPassword":
            try {
                include_once '../Models/User.php';
                $user = new User();
                // creacion del nuevo usuario

                $email = $data['dataObject']['email'];

                // verificacion de que si encontro un correo
                if ($user->checkRegisteredEmail($email) == 1) {
                    include_once '../Models/mercasena.php';
                    $app = new MERCASENA();

                    // creacion del codigo de verificacion
                    $code = MERCASENA::createVerificationCode();
                    $data = [
                        "address" => $email,
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
                    // envia el correo 
                    $data = $app->sendEmail($data);

                    // espera 2 segundo
                    sleep(2);

                    // crea una session que expirara en 10 minutos y agrega el codigo de verificacion alli
                    session_start();
                    $_SESSION['code'] = $code;
                    $_SESSION['expire'] = time() + 600; // 10 minutos
                    $_SESSION['checked'] = false;
                    $_SESSION['email'] = $email;

                    echo json_encode(["mensagge" => "verifica en tu correo el codigo de confirmacion ", "estado" => "waiting", "RECOVER_TOKEN" => session_id()]);
                } else {

                    echo json_encode(["error" => "El correo no se encuentra registrado", "estado" => "email not found", "estadoID" => 3]);
                    http_response_code(404);
                }





            } catch (Exception $th) {
                echo json_encode(["error" => $th->getMessage(), "estado" => "bad register"]);
            }

            break;
        case "verifyCode":
            try {
                $token = $data['dataObject']['token'];
                if ($token == null) {
                    http_response_code(401);
                    echo json_encode(["error" => "Error en el servidor"]);
                    exit();
                    # code...
                } else {
                    session_id($token);
                    session_start();
                    // verificacion de que no haya expirtado el token 
                    if (time() < $_SESSION['expire']) {
                        // if (true) {
                        $code = $data['dataObject'];
                        // verificacion del codigo de verificacion
                        if ($code['code'] == $_SESSION['code']) {
                            $_SESSION['checked'] = true;
                            echo json_encode(["mensagge" => "Codigo verificado con exito", "estado" => "ok", "RECOVER_TOKEN" => session_id()]);
                        } else {
                            http_response_code(404);
                            echo json_encode(["error" => "El codigo de verificacion no es correcto"]);
                        }
                    } else {
                        http_response_code(404);
                        echo json_encode(["error" => 'tu codigo de verifica ya ha expirado']);
                    }
                }
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
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
        case "changePassword":
            try {
                include_once '../Models/User.php';
                $user = new User();
                $password = $data["dataObject"]["password"];
                $token = $data["dataObject"]["token"];
                if ($token != null) {
                    // inicia session
                    session_id($token);
                    session_start();
                    // verifica si fue permitido el cambio de contraseña 
                    if ($_SESSION['checked'] == true) {

                        // actualiza la contraseña
                        $user->updatePasswordByEmail($_SESSION['email'], $password);

                        echo json_encode(["mensagge" => "contrasena cambiada con exito", "estado" => "ok"]);
                    } else {
                        http_response_code(404);
                        echo json_encode(["error" => "Error en el servidor"]);
                    }

                } else {
                    throw new Exception("Error en el servidor");
                }


                // file_put_contents("plantillas/plantilla.json",json_encode($object));
                // echo json_encode($object);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;
        case "changePasswordWithoutCode":
            try {
                include_once '../Models/User.php';
                $user = new User();
                $password = $data["dataObject"]["password"];
                // $token = $data["dataObject"]["token"];
                $headers = getallheaders();
                $sessionToken = isset($headers['mercasena-token']) ? $headers['mercasena-token'] : null;

                if ($sessionToken == null) {
                    http_response_code(401);
                    echo json_encode(["error" => "No se ha iniciado sesion"]);
                    exit();
                    # code...
                } else {

                    // inicia session
                    session_id($sessionToken);
                    session_start();
                    // verifica si fue permitido el cambio de contraseña 
                    if (true) {

                        // actualiza la contraseña
                        $user->updatePasswordByEmail($_SESSION['email'], $password);

                        echo json_encode(["mensagge" => "contraseña cambiada con exito", "estado" => "ok"]);
                    } else {
                        http_response_code(404);
                        echo json_encode(["error" => "Error en el servidor"]);
                    }




                    // file_put_contents("plantillas/plantilla.json",json_encode($object));
                }  // echo json_encode($object);
            } catch (Exception $th) {
                http_response_code(404);
                echo json_encode(["error" => $th->getMessage()]);
            }
            break;


        default:
            echo json_encode(["error" => "Action not found"]);
        // return ["error" => "Action not found"];
    }

}
// $user = new User();
// try {
// $data = [
//     "correo" => "ejemplo@gmail.com",
//     "nombre" => "Juan Pérez",
//     "direccion" => "Calle 123, Ciudad de México",
//     "telefono" => "5512345678",
//     "NIT" => "123456789",
//     "tipoUsr" => "Administrador",
//     "contrasena" => "password123"
// ];
//     $user->insert($data);
//     // $user->update('2',);

//     // print_r($user->fetchMiniature('3'));
//     // print_r($user->fetchImages('3',"showShopImages")[1]['prodImg_ruta']);
//     //  $user->delete('2');
//     // $hola  = $user->select();
//     //  $hola  = $user->selectOne('1');
//     // $category = $_GET["categoryId"];
//     // $data = $user->fetchByCategory($category);
//     // print_r($data);
//     // echo json_encode([
//     //     "nombre" => "hola",
//     //     "rutaImagen" => $data[0]['prodImg_ruta'],
//     //     "id" => $data[0]['prod_id']
//     // ]);
//     // echo json_encode($data);


//     // print_r($data);


// } catch (Exception $error) {
//     echo $error->getMessage();
//     return ["error"=>$error->getMessage()];


// }
?>