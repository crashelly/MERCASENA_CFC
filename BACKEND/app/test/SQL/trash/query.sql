SELECT
-- ids
ps.subCat_id as productoID,
ps.prod_id as productoPadreID,
ps.prodE_id as estadoID,
ps.prodCat_id as categoriaID,
ps.prodMed_id as medidaID,
-- los demas datos
-- de la tabla de productos_subcategorias
ps.subCat_nombre as variacion,
ps.subCat_existencias as existencias,
ps.subCat_precio as precio,
ps.prodCat_descripcion as descripcion,

p.prod_nombre as producto,
pm.prodMed_medida as medidaVenta,
pe.prodE_estado as estado,
pi.prodImg_ruta as imagen





FROM productos_subcategorias ps
INNER JOIN productos p ON ps.prod_id = p.prod_id
INNER JOIN productos_medidaventa  pm ON ps.prodMed_id = pm.prodMed_id
INNER JOIN productos_estado pe on ps.prodE_id =pe.prodE_id
INNER JOIN productos_categoria pc ON ps.prodCat_id = pc.prodCat_id 
INNER JOIN productos_imagenes pi ON ps.subCat_id = pi.subCat_id;