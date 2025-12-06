<?php
/**
 * clase para los comprobantes de venta
 *
 * 
 */
class SaleReceipt
{

    /**
     * crea el nombre  del comprobante de venta
     *
     * @param [type] $keyName
     * @return string
     */
    static function createName($keyName)
    {

        $dateTime = date('Ymd_His'); // Formato: YYYYMMDD_HHMMSS

        // Genera un identificador unico con la hora del sistema
        $uniqueId = uniqid();

        // Concatena la fecha, el identificador único y la extensión del archivo
        $filename = "{$keyName}_{$dateTime}_{$uniqueId}.pdf";

        return $filename;
    }


      /**
     * Elimina todas las facturas que se crearon hace más de 5 minutos.
     *
     * @param string $directory Directorio donde se almacenan las facturas.
     */
    public static function deleteOldReceipts($directory)
    {
         // Obtiene el tiempo actual
        $currentTime = time();

        // Abre el directorio
        if ($handle = opendir($directory)) {
            while (false !== ($file = readdir($handle))) {
                $filePath = $directory . '/' . $file;

                // Ignora los directorios '.' y '..'
                if ($file !== '.' && $file !== '..') {
                    // Verifica si el archivo es un PDF y fue modificado hace más de 5 minutos
                    if (is_file($filePath) && strtolower(pathinfo($filePath, PATHINFO_EXTENSION)) === 'pdf' && ($currentTime - filemtime($filePath)) > 300) {
                        // Elimina el archivo
                        unlink($filePath);
                    }
                }
            }
            closedir($handle);
        }
    
    }

    public function __construct()
    {
        echo 'saleReceipt';
    }


}

// $name = SaleReceipt::createName('ComproVenta_');
// echo $name;

?>