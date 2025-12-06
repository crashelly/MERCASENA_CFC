BEGIN
	DECLARE stock_actual int;
    
    START TRANSACTION;
    
     SELECT subCat_existencias  INTO stock_actual
    FROM productos
    WHERE subCat_id = p_prod_id;
    
    IF stock_actual >= p_prod_cant THEN 
    
    INSERT INTO `ventas` (
        `fac_id`, `prod_id`, `prod_cant`, `prod_precio`
    ) VALUES (
        p_fac_id, p_prod_id, p_prod_cant, p_prod_precio
    );
    
    UPDATE productos_subcategorias 
    SET subCat_existencias = stock_actual - p_prod_cant
    WHERE subCat_id = p_prod_id;
    
    COMMIT;
    ELSE 
    ROLLBACK;
    SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'no se pudo guardar la venta ya que la cantidad solicitada supero las existencias actuales del inventario';
    END IF;
END