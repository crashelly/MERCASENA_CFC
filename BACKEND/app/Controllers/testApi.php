<?php


// $currentPath = __DIR__;

// $oneLevelUp = dirname($currentPath);
// // directorio base 
// $base_path = dirname($oneLevelUp);


// require_once $base_path. '/vendor/autoload.php';
// $dotenv = Dotenv\Dotenv::createImmutable($base_path);
// $dotenv->load();


// $db_host = getenv('IMAGES_PATH');
// echo $base_path;
$structure = [
    [
        "pedido_id" => "loque sea",
        "precioTotal" => "3000000",
        "nombreUsuario" => "carlos andres Loaiza",
        "fechaHora" => "2022-01-01 00:00:00",
        "productos" =>[
            [
                "id" => "1",
                "cantidad" => "2",
                "precioParcial" => "1500000"
            ],
            [
                "id" => "1",
                "cantidad" => "2",
                "precioParcial" => "1500000"
            ],
            [
                "id" => "1",
                "cantidad" => "2",
                "precioParcial" => "1500000"
            ],
        ]
        ]
];
echo json_encode($structure);   
// file_put_contents("../test/JSON/pruebaEstructura.json",json_encode($structure));
print_r($structure);
?>