<?php



// echo $fecha_actual;



// $numero_uuid = uniqid('', true);
// $numero_uuid = substr($numero_uuid, 0, 4);

// $clave_uuid = uniqid('', true);
// $clave = substr($clave_uuid, 0, 6);

// echo "clave :". $clave.'<br>';
// echo "numero :". $numero_uuid.'<br>';




// $numero = $clave;
// $salt = $fecha_actual.'-'.$numero_uuid;
// $iteraciones = 10000;
// $algoritmo = 'sha256';

// $hash = hash_pbkdf2($algoritmo, $numero, $salt, $iteraciones, 32, true);
// $hash_hex = bin2hex($hash);

// echo $hash_hex;

function createUniqueOrderID(): string
{
    $fecha_actual = date("Y-m-d");
    $uniq = uniqid('ped_' . $fecha_actual . '_', true);
    return $uniq;

}

$json = json_decode(
    '[
        {"id": 1, "nombre": "Producto 23", "precio": 100},
        {"id": 2, "nombre": "Producto 2", "precio": 150},
        {"id": 3, "nombre": "Producto 3", "precio": 200},
        {"id": 4, "nombre": "Producto 23", "precio": 250},
        {"id": 5, "nombre": "Producto 5", "precio": 300},
        {"id": 6, "nombre": "Producto 6", "precio": 350},
        {"id": 7, "nombre": "Producto 7", "precio": 400}
    ]'   ,true);

$arr = [
    ["id" => 1, "nombre" => "Producto 1", "precio" => 100],
    ["id" => 2, "nombre" => "Producto 2", "precio" => 150],
    ["id" => 3, "nombre" => "Producto 3", "precio" => 200],
    ["id" => 4, "nombre" => "Producto 4", "precio" => 250],
    ["id" => 5, "nombre" => "Producto 5", "precio" => 300],
    ["id" => 6, "nombre" => "Producto 6", "precio" => 350],
    ["id" => 7, "nombre" => "Producto 7", "precio" => 400]

];
/**
 * inserta todos los productos de un pedido en la bas ede datos
 *
 * @param array $order arreglo que contiene todos los productos
 * @param string $OrderID id unico del pedido
 * @param string $userID id del usuario por supuesto
 * @return array el nuevo arreglo asociativo
 */
function inyectDataInOrder( array $order,string $OrderID){
    $object = [];
    foreach ($order as $order => $product) {
        $product['orderId'] = $OrderID;

        // inyectamos el nuevo arreglo a uno diferente
       $object[]=$product;
    }
    // print_r( $product);
    return $object;
}

// echo "========= LAS QUE NO SE LE HA INSERTADO NADA ================= <br>";
// foreach ($json as $item => $product) {
//     echo $product['id'] . ' ' . $product['nombre'] . ' ' . $product['precio'] . '<br>';
// }

// print_r( $json);
foreach ($json as $order => $product) {
    // $product['orderId'] = $OrderID;
    // $product['userId']  = $userID;
    print_r( json_encode($product));
}

// echo "============ ================= <br>";
// echo "========= VERIFICADAS  ================= <br>";
// $orders = inyectDataInOrder($json,"ped_2023-10-12_1.0", "user_1234567890");
// foreach ($orders as $item => $product) {
//     echo $product['id'] . ' ' . $product['nombre'] . ' ' . $product['precio'] . ' ' . $product['orderId'] . ' ' . $product['userId'] . '<br>';
// }

$newJSON = inyectDataInOrder($json,"ped_2023-10-12_1.0");

print_r(json_encode($newJSON) );
// echo "============ ================= <br>";

// echo file_put_contents("pedidos.json",json_encode([$newJSON]));
    // for ($i=0; $i<1000000; $i++){
//     echo createUniqueIOrderID().'<br>';
// }
// echo createUniqueIOrderID();
    ?>