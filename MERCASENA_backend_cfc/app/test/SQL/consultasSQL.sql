-- para ver todos los productos por categoria 
SELECT 
    pi.prodImg_ruta AS rutaImagen, 
    p.prod_nombre AS nombreProducto, 
    p.prod_precio * p.prod_cantidad AS precio 
FROM 
    productos AS p 
INNER JOIN 
    productos_imagenes AS pi 
ON 
    p.prod_id = pi.prod_id 
WHERE 
    p.prodCat_id = 9 AND pi.prodImg_miniatura = 1;