<?php
include_once 'testModely.php';

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

//    $product->insert([
//     "nombre" => "huevo",
//     "existencias" => 100,
//     "precio" => 600,
//     "prodMed"  =>   "4",
//     "cantidad" => 30,
//     "tamaño" => "AAA",
//     "fechaExpiracion" => "2025-03-24",
//     "prodPes" => "1",
//     "caducidad" => "2025-03-24",
//     "prodE_id" => "7",
//     "prodCat_id" => "9"
//    ]);


//  $product->update('2',[
//     "nombre" => "huevas",
//     "existencias" => 100,
//     "precio" => 600,
//     "prodMed"  => "4",
//     "cantidad" => 30,
//     "tamaño" => "AAA",
//     "fechaExpiracion" => "2025-03-24",
//     "prodPes" => "1",
//     "caducidad" => "2025-03-24",
//     "prodE_id" => "7",
//     "prodCat_id" => "9"
//    ]);
$product = new TestModel();
try {

    // $product->insert(["prod_id" => "3","prodImg_miniatura" => "1","prodImg_ruta"=> "https://th.bing.com/th/id/OIP.X9zIkLtSUirY-3y7HBEjHAHaFB?rs=1&pid=ImgDetMain"]);
    // $product->update('2',);

    // print_r($product->fetchMiniature('3'));
    // print_r($product->fetchImages('3',"showShopImages")[1]['prodImg_ruta']);
    //  $product->delete('2');
    // $hola  = $product->select();
    //  $hola  = $product->selectOne('1');
    $category = $_GET["categoryId"];
    $data = $product->fetchByCategory($category);
    // print_r($data);
    // echo json_encode([
    //     "nombre" => "hola",
    //     "rutaImagen" => $data[0]['prodImg_ruta'],
    //     "id" => $data[0]['prod_id']
    // ]);
    echo json_encode($data);


    // print_r($data);

    
} catch (Exception $error) {
    echo $error->getMessage();
    return ["error"=>$error->getMessage()];


}
?>