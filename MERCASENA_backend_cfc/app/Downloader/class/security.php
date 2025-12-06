<?php
class Security
{
    static $dir ;
    public function __construct(){

    }
    /**
     * verifica que el archivo este dentro del direcotrio para prevenir descargas de otros archivos
     *
     * @param string $filePath ruta del archivo a validar
     * @return bool retorna true si esta en el rango permitido
     */
    static function isFileInCurrentDirectory($filePath, $allowedDir)
    {

        // Obtiene la ruta real del archivo
        $realPath = realpath($filePath);

        // Obtiene la ruta real del directorio permitido
        $realAllowedDir = realpath($allowedDir);

        // Verifica si la ruta real del archivo comienza con la ruta del directorio permitido
        return $realPath !== false && strpos($realPath, $realAllowedDir) === 0;
    }

    /**
     * funcion que verifica que el archivo sea un pdf 
     *
     * @return boolean
     */
    static function isPdfFile($dir,$file)
    {
        
        if (Security::doesFileExists($dir,$file)) {
         
            $filePath = $dir . '/' . $file;
            // Obtiene la extension del archivo
            $fileExtension = pathinfo($filePath, PATHINFO_EXTENSION);

            // Verifica si la extensión es 'pdf'
            return strtolower($fileExtension) === 'pdf' ? true : false;
        }else{
            // throw new Exception("el archivo no existe");
            return false;
        }

    }
/**
 * verifica si un archivo existe
 */
    static function doesFileExists($dir,$file)
    {
        $filePath = $dir . '/' . $file;
        return file_exists($filePath) ? true : false;
    }
}
// try {
//     echo Security::isPdfFile('test.pdf', __DIR__);
// } catch (Exception $th) {
//     throw $th;
// }
// echo Security::isPdfFile('test.pdf');
?>