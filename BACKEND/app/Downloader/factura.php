<?php
require '../../vendor/autoload.php';
use Dompdf\Dompdf;
use Dompdf\Options;


use Endroid\QrCode\Builder\Builder;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\Label\LabelAlignment;
use Endroid\QrCode\Label\Font\OpenSans;
use Endroid\QrCode\RoundBlockSizeMode;
use Endroid\QrCode\Writer\PngWriter;

$dotenv = Dotenv\Dotenv::createImmutable(dirname(__DIR__, 2));
$dotenv->load();
$ip = $_ENV['IP_ADRESS'];
$mercasenaBillValidatorUrl = "http://$ip/MERCASENA_backend/app/Downloader/mercasenaBillValidator.php";
// Lee el contenido del archivo JSON
// $jsonContent = file_get_contents('json/data.json');
$jsonContent = $_SESSION['billInfo'];
// Decodifica el contenido JSON a un array asociativo
$data = json_decode($jsonContent, true);
$factura = $data[0];
$productos = $factura['productos'];
$fecha = explode('-', $factura['fecha']);

// verificacion de null y seteo de variables
$factura['fac_id'] = $factura['fac_id'] ?? '';
$factura['Usuario'] = $factura['Usuario'] ?? '';
$factura['nit'] = $factura['nit'] ?? '';
$factura['direccion'] = $factura['direccion'] ?? '';
$factura['telefono'] = $factura['telefono'] ?? '';
$factura['precioTotal'] = $factura['precioTotal'] ?? '';

$builder = new Builder(
    writer: new PngWriter(),
    writerOptions: [],
    validateResult: false,
    data: $mercasenaBillValidatorUrl,
    encoding: new Encoding('UTF-8'),
    errorCorrectionLevel: ErrorCorrectionLevel::High,
    size: 300,
    margin: 10,
    roundBlockSizeMode: RoundBlockSizeMode::Margin,
    logoResizeToWidth: 50,
    logoResizeToHeight: 50,
    logoPunchoutBackground: true,
    labelFont: new OpenSans(20),
    labelAlignment: LabelAlignment::Center
    // logoResizeToWidth: 50
);

// ejecucion del builder y extraccion del URI del codigo qr
$result = $builder->build();
$qrCodeUri = $result->getDataUri();

// Builder for QR code 
function addPuntuaction($number)
{
    return number_format($number, 0, '', '.');
}
?>

</html>
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <title>Factura</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- lo siento por este mamarachho de meter css dentro del html y no separarlo en archivos independientes
  hay que entender que la libreria de pdf que convierte codigo html a
  pdf  no reconoce muschas veces los estilso entyonces me  toco ponerlo aqui
   -->
    <style>
        @import url('fonts/BrixSansRegular.css');
        @import url('fonts/BrixSansBlack.css');
        /*  */


        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        p,
        label,
        span,
        table {
            font-family: 'BrixSansRegular';
            font-size: 9pt;
        }

        .h2 {
            font-family: 'BrixSansBlack';
            font-size: 16pt;
        }

        .h2-desc {
            font-family: 'BrixSansBlack';
            font-size: 12pt;
            font-weight: bold;
            margin-bottom: 5px;
        }

        .h3 {
            font-family: 'BrixSansBlack';
            font-size: 12pt;
            display: block;
            background: #0a4661;
            color: #FFF;
            text-align: center;
            padding: 3px;
            margin-bottom: 5px;
        }

        #page_pdf {
            width: 95%;
            margin: 15px auto 10px auto;
        }

        #factura_head,
        #factura_cliente,
        #factura_detalle {
            width: 100%;
            margin-bottom: 10px;
        }

        .logo_factura {
            width: 20%;
        }

        .info_empresa {
            width: 70%;
            text-align: center;
        }

        .info_factura {
            width: 25%;
        }

        .info_cliente {
            width: 100%;
        }

        .datos_cliente {
            width: 100%;
        }

        .datos_cliente tr td {
            width: 50%;
        }

        .datos_cliente {
            padding: 10px 10px 0 10px;
        }

        .datos_cliente label {
            width: 75px;
            display: inline-block;
        }

        .datos_cliente p {
            display: inline-block;
        }

        .qrClass_label{
            margin-top: 20px;
        }
        .textright {
            text-align: right;
        }

        .textleft {
            text-align: left;
        }

        .textcenter {
            text-align: center;
        }

        .round {
            border-radius: 10px;
            border: 1px solid #0a4661;
            overflow: hidden;
            padding-bottom: 15px;
        }

        .round p {
            padding: 0 15px;
        }

        #factura_detalle {
            border-collapse: collapse;
        }

        #factura_detalle thead th {
            background: #058167;
            color: #FFF;
            padding: 5px;
        }

        #detalle_productos tr:nth-child(even) {
            background: #ededed;
        }

        #detalle_totales span {
            font-family: 'BrixSansBlack';
        }

        .nota {
            font-size: 8pt;
            margin-top: 30px;
            margin-bottom: 20px;
        }

        .label_gracias {
            font-family: verdana;
            font-weight: bold;
            font-style: italic;
            text-align: center;
            margin-top: 20px;
            margin-bottom: 20px;
        }

        .anulada {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translateX(-50%) translateY(-50%);
        }

        hr {
            border: none;
            /* Elimina el borde predeterminado */
            height: 5px;
            /* Ajusta el grosor de la línea */
            background-color: #000;
            /* Cambia el color de la línea */
        }
    </style>
    <!-- estilso de la parte de informacion del clietne y la ffehca y comprobante de venta -->
    <style>
        body {
            font-family: Arial, sans-serif;
            background-color: rgb(255, 255, 255);
            margin: 20px;
        }

        .comprobante {
            background-color: rgb(255, 255, 255);
            padding: 20px;
            /* border-radius: 8px; */
            width: 650px;
            /* border: 1px solid #999; */
        }

        .fila-superior {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 20px;
        }

        .fecha {
            text-align: center;
            /* border: 2px solid black; */
            width: 140px;
        }

        .fecha label {
            display: block;
            font-weight: bold;
            background: white;
            padding: 2px 0;
        }

        .fecha .campos {
            display: flex;
            justify-content: space-between;
            border-top: 1px solid black;
        }

        .fecha .campos div {
            width: 33.33%;
            /* border-left: 1px solid black; */
            padding: 5px 0;
        }

        .fecha .campos div:first-child {
            /* border-left: none; */
        }

        .numero {
            text-align: center;
        }

        .numero b {
            font-size: 14px;
            display: block;
            margin-bottom: 4px;
        }

        .numero span {
            display: inline-block;
            padding: 5px 15px;
            border: 1px solid #444;
            border-radius: 8px;
            color: #b00000;
            font-size: 18px;
            font-weight: bold;
        }

        table.info {
            width: 100%;
            border-collapse: collapse;
            border-radius: 20px;
            margin-top: 10px;
        }

        table.info td {
            border: 1px solid black;
            padding: 6px;
            font-size: 14px;
        }

        table.info td.theadl {
            font-weight: bold;
            width: 0%;
            background: rgb(124, 115, 105);
        }

        table.info td.label {
            font-weight: bold;
            width: 0%;
            background: rgb(255, 255, 255);
        }

        table.fecha {
            width: 100%;
            margin-top: 10px;
            /* border-radius: 20px; */
            border-collapse: collapse;
            border: 2px solid black;
            border-radius: 12px;
        }

        table.fecha td {
            /* border-collapse: collapse; */
            border: 1px solid black;
            padding: 5px;
            font-size: 12px;
        }

        table.fecha td.label {
            font-weight: bold;
            width: 0%;
            background: rgb(255, 255, 255);
        }

        .espacioBlanco {
            color: #FFF;
            cursor: text;
        }

        .desaparecer {
            color: #FFF;
            cursor: text;
        }

        #fechaTexto {
            margin-left: 30px;
            margin-bottom: -20px;
            margin-top: 20px;
            font-weight: bold;
            font-size: 12pt;

        }

        .cant {
            width: 20px;
        }

        .thead {
            background-color: rgb(219, 207, 207);
        }

        .fecha_bold {
            font-weight: bold;
        }

        #info-foot {
            margin-top: -2px;
        }
    </style>
</head>

<body>

    <div id="page_pdf">
        <table id="factura_head">
            <tr>
                <td class="logo_factura" height="70">
                    <div>
                        <img width="150" height="150" src="<?php echo $ip . "/mercasena/public/assets/logos/sena_logo.png" ?>"
                            alt="Sena Logo">
                    </div>
                </td>
                <td class="info_empresa">

                    <div>
                        <strong class="h2">COMERCIALIZADORA DIDÁCTICA </strong>
                        <hr>
                        <p class="h2-desc">SERVICIO NACIONAL DE APRENDIZAJE-SENA</p>
                        <p class="h2-desc">REGIONAL CALDAS</p>
                        <p class="h2-desc">COMPROBANTE MERCASENA</p>

                    </div>

                </td>
                <!-- <td class="">
                    <div class="">
                        <span class="desaparecer">Factura</span>
                        <p class="desaparecer">piensa bien siempre</strong></p>
                        <p class="desaparecer">algun dia succedio</p>
                        <p class="desaparecer">no se la verdad</p>
                        <p class="desaparecer">NO nesecitas sabeer el contenido</p>
                    </div>
                </td> -->
            </tr>
        </table>
        <!-- parte de la informacion del cliente -->
        <div class="comprobante">
            <div class="fila-superior">
                <!-- Fecha -->


                <!-- Número de factura -->

            </div>
            <table>
                <tr>
                    <span id="fechaTexto">FECHA</span>
                </tr>
                <tr>
                    <td>
                        <div>
                            <table class="fecha">

                                <tr>

                                    <td class="fecha_bold">DIA</td>
                                    <td class="fecha_bold">MES</td>
                                    <td class="fecha_bold">AÑO</td>
                                </tr>
                                <tr>
                                    <td><?php echo $fecha[2] ?></td>
                                    <td><?php echo $fecha[1] ?></td>
                                    <td><?php echo $fecha[0] ?></td>
                                </tr>
                            </table>
                            <!-- <label>FECHA</label>
                        <div class="campos">
                            <div>DÍA</div>
                            <div>MES</div>
                            <div>AÑO</div>
                        </div> -->
                        </div>
                    </td>
                    <td>
                        <b
                            class="espacioBlanco">......................................................................................</b>
                    </td>
                    <td>
                        <b>COMPROBANTE DE VENTA</b>
                    </td>
                    <td>
                        <div class="numero">

                            <span>N° <?php echo $factura['fac_id'] ?></span>
                        </div>
                    </td>
                </tr>
            </table>
            <!-- Datos del cliente -->
            <table class="info">
                <tr>
                    <td class="label">CLIENTE:</td>
                    <td><?php echo $factura['Usuario']; ?></td>
                    <td class="label">C.C. / Nit.:</td>
                    <td><?php echo $factura['nit']; ?></td>
                </tr>
                <tr>
                    <td class="label">DIRECCIÓN:</td>
                    <td><?php echo $factura['direccion']; ?></td>
                    <td class="label">TELÉFONO/CELULAR:</td>
                    <td><?php echo $factura['telefono']; ?></td>
                </tr>
            </table>

            <table class="info">
                <tr>
                    <td class=" thead textcenter cant">CANT:</td>
                    <td class=" thead textcenter descripcion">DESCRIPCION</td>
                    <td class=" thead textcenter">Vr.UNIT</td>
                    <td class=" thead textcenter ">vr.TOTAL</td>
                </tr>
                <?php
                foreach ($productos as $key => $producto) {
                    # code...
                    $producto['cantidad'] = $producto['cantidad'] ?? '';
                    $producto['name'] = $producto['name'] ?? '';
                    $producto['precioUnitario'] = $producto['precioUnitario'] ?? '';
                    $producto['precio'] = $producto['precio'] ?? '';
                    ?>
                    <tr>
                        <td class="textcenter"><?php echo $producto['cantidad']; ?></td>
                        <td class="textcenter"><?php echo $producto['name']; ?> </td>
                        <td class="textcenter"><?php echo $producto['precioUnitario']; ?>:</td>
                        <td class="textcenter"><?php echo addPuntuaction($producto['precio']); ?></td>
                    </tr>
                <?php } ?>
                <!-- <tfoot>
                     <tr>
                    <td class="textcenter" colspan="4">recibido</td>
                    <td class="textcenter" colspan="4">total <?php addPuntuaction($factura['precioTotal']) ?> </td>
                </tr>
                </tfoot> -->
            </table>
            <table id="info-foot" class="info">
                <tr>
                    <td class="textleft" colspan="4">recibido <? echo $factura['encargadoPuntoVenta'] ?> :Encargado punto
                        de venta SENA</td>
                    <td class="textleft" colspan="4">total <?php echo addPuntuaction($factura['precioTotal']) ?> </td>
                </tr>
            </table>

        </div>

        <!-- FIN  -->




        <div>
            <p class="nota">Si usted tiene preguntas sobre este comprobante de venta <br>pongase en contacto con nombre,
                teléfono y
                Email</p>
            <h4 className="label_gracias">¡Gracias por su compra!</h4>
            <h4 className="qrClass_label">Codigo QR de validacion</h4>
            <div className="qrClass">
                <img width="150" height="150" src=<?php echo $qrCodeUri ?>>

            </div>

        </div>

    </div>

</body>

</html>