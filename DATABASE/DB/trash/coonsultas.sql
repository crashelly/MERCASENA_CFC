SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM facturas f WHERE fac_fechaBusqueda = '2025-07-09' limit 200; 


-- filtraje por usuarios (la quey mas costosa xd)

SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM  facturas
WHERE usr_noRegistrado LIKE  '%Jesus%' 
limit 200; 


SELECT f.fac_id as id ,f.fac_fecha as fecha , f.usr_noRegistrado as clienteNoRegistrado, u.usr_nombre, f.cant_productos as cantidad 


SELECT f.fac_id as id ,f.fac_fecha as fecha ,f.fac_precioTotal as precioTotal f.usr_noRegistrado as clienteNoRegistrado, u.usr_nombre, f.cant_productos as cantidad   FROM facturas f
INNER JOIN usuarios u  ON f.usr_id = u.usr_id
WHERE f.usr_noRegistrado  LIKE  '%Yeison%' OR
u.usr_nombre LIKE '%Yeison%'
limit 200; 

SELECT f.fac_id as id ,f.fac_fecha as fecha ,f.fac_precioTotal as precioTotal, f.usr_noRegistrado as clienteNoRegistrado, u.usr_nombre, f.cant_productos as cantidad 

SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM facturas f
LEFT JOIN usuarios u ON f.usr_id = u.usr_id
WHERE f.fac_fechaBusqueda = '2025-07-13' 
AND (f.usr_noRegistrado LIKE '%Jesus%' OR u.usr_nombre LIKE '%Jesus%')
LIMIT 200;

DELIMITER $$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE ()
BEGIN 

END $$
DELIMITER ;
DELIMITER $$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE (IN totalPrecio float)
BEGIN 
DECLARE totalVentasGlobal int;

-- asigno el stock actual del producto que busque 
   SELECT puntVen_totalVentas  INTO totalVentasGlobal
    FROM punto_venta
    WHERE `punto_venta`.`puntVen_ID` = 1;


UPDATE `punto_venta` SET `puntVen_totalVentas` =totalVentasGlobal + totalPrecio  WHERE `punto_venta`.`puntVen_ID` = 1;


END $$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE buscarFacturaPorFechaYUsuario(
    IN fac_fecha_p date,
    IN usuario text
)
BEGIN 
SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM facturas f
LEFT JOIN usuarios u ON f.usr_id = u.usr_id
WHERE f.fac_fechaBusqueda = fac_fecha_p 
AND (f.usr_noRegistrado LIKE CONCAT('%', usuario, '%') OR u.usr_nombre LIKE CONCAT('%', usuario, '%'))
LIMIT 200;
END $$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE buscarFacturaPorUsuario(IN usuario text)
BEGIN 
SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM facturas f
INNER JOIN usuarios u  ON f.usr_id = u.usr_id
WHERE f.usr_noRegistrado  LIKE  CONCAT('%', usuario, '%') OR
u.usr_nombre LIKE CONCAT('%', usuario, '%')
limit 200; 

END $$
DELIMITER ;

DELIMITER $$
CREATE DEFINER=`administrador`@`localhost` PROCEDURE buscarFacturaPorFecha(IN fac_fecha date)
BEGIN 
SELECT f.fac_id as id ,f.fac_fecha as fecha , f.pedi_info, f.pedi_id as pediInfo FROM facturas f WHERE fac_fechaBusqueda = fac_fecha  limit 200; 

END $$
DELIMITER ;