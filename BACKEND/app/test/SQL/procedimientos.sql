-- todos los procedimientos los voy a organizar  encapsuilados entre las etiqueta s de  
    -- 
    -- ===========================================================
    -- por cada tabla de la base de datos  ahora bien cada uno tendra su CRUD 
    -- tabla
    --      procedimientos :> -crear
    --                  -actualizar
    --                  -eliminar
    --

    -- ===========================================================
    -- =================   tipos_usuario  ==========================
    -- crear 
DELIMITER
    $$

CREATE PROCEDURE Crear_tipo_usuario(
    IN p_tipoUsr_tipo ENUM(
        'admin',
        'proveedor',
        'cliente',
        'invitado'
    )
)
BEGIN
    INSERT INTO `mercasena`.`tipo_usuario`(`tipoUsr_tipo`)
VALUES(p_tipoUsr_tipo) ;
END $$

DELIMITER ;

    -- actualizar
DELIMITER
    $$
CREATE PROCEDURE actualizar_tipo_usuario(
    IN p_tipoUsr_id INT, IN nuevo_tipo ENUM('agotado', 'disponible', 'en Espera')
)
BEGIN
    UPDATE
        `mercasena`.`tipo_usuario`
    SET
        `prodE_tipo` = nuevo_tipo
    WHERE
        `prodE_id` = p_tipoUsr_id ;
END $$
DELIMITER ;


-- eliminar 
DELIMITER
        $$
    CREATE PROCEDURE eliminar_tipo_usuario(IN p_tipoUsr_id INT(11))
BEGIN
    DELETE
FROM
    `mercasena`.`tipo_usuario`
WHERE
    `tipoUsr_id` = p_tipoUsr_id ;
END $$

DELIMITER ;
-- ===========================================================
-- =============== tabla  productos_Estado   =======================
-- crear

DELIMITER
    $$
CREATE PROCEDURE crear_producto_estado(
    IN p_estado text
)
BEGIN
    INSERT INTO `mercasena`.`productos_Estado`(`prodE_estado`)
VALUES(p_estado) ; 
END $$
DELIMITER ;

-- eliminar
DELIMITER
    $$
CREATE PROCEDURE eliminar_producto_estado(IN p_prodE_id INT(11))
BEGIN
    DELETE
FROM
    `mercasena`.`productos_Estado`
WHERE
    prodE_id = p_prodE_id ;
END $$
DELIMITER ;
    -- actualizar
DELIMITER
    $$
CREATE PROCEDURE actualizar_producto_estado(
    IN id INT,
    IN nuevo_estado text
)
BEGIN
    UPDATE
        `mercasena`.`productos_Estado`
    SET
        `prodE_estado` = nuevo_tipo
    WHERE
        `prodE_id` = id ; END $$
    DELIMITER
        ;
-- ===========================================================
-- =================   productos_categoria ==========================
        -- DELIMITER $$
        -- crear 
DELIMITER $$
CREATE PROCEDURE crear_producto_categoria(IN categoria TINYTEXT)

BEGIN
    INSERT INTO `mercasena`.`productos_categoria`(`prodCat_categoria`)
VALUES(categoria); 
END $$
DELIMITER ;
-- actualizar 

DELIMITER
    $$
CREATE PROCEDURE actualizar_producto_categoria(
    IN id INT,
    IN nueva_categoria TINYTEXT
)
BEGIN
    UPDATE
        `mercasena`.`productos_categoria`
    SET
        `prodCat_categoria` = nueva_categoria
    WHERE
        `prodCat_id` = id ; 
        END $$
    DELIMITER
        ;
-- eliminar 
    DELIMITER  $$
    CREATE PROCEDURE eliminar_producto_categoria(IN p_prodCat_id INT(11))
BEGIN
    DELETE FROM `mercasena`.`productos_categoria` WHERE prodCat_id = p_prodCat_id ;

END $$
DELIMITER ;
-- ===========================================================
-- =================   productos pesoventa  ==========================
-- crear 
DELIMITER
    $$

CREATE PROCEDURE Crear_producto_pesoVenta(

    IN p_medida TEXT,
    IN p_numero INT
)
BEGIN
    INSERT INTO `mercasena`.`productos_PesoVenta`(`prodPes_medida`, `prodPes_numero`)
VALUES(p_medida, p_numero) ; END $$
DELIMITER
    ;
    -- eliminar 
DELIMITER
    $$
CREATE PROCEDURE eliminar_producto_pesoVenta(IN p_prodPes_id INT)
BEGIN
    DELETE
FROM
    `mercasena`.`productos_PesoVenta`
WHERE
    `prodPes_id` = p_prodPes_id ; END $$
DELIMITER
    ;
    -- actualizar 
DELIMITER
    $$
CREATE PROCEDURE actualizar_producto_pesoVenta(
    IN p_prodPes_id INT,
    IN p_medida TEXT,
    IN p_numero INT
)
BEGIN
    UPDATE
        `mercasena`.`productos_PesoVenta`
    SET
        `prodPes_medida` = p_medida,
        `prodPes_numero` = p_numero
    WHERE
        `prodPes_id` = p_prodPes_id ; END $$
    DELIMITER
        ;
        -- ===========================================================
        -- =================   productos medidaVenta  ==========================
-- crear 
      
    DELIMITER
        $$
    CREATE PROCEDURE Crear_producto_medidaVenta(IN p_medida TEXT)

BEGIN
    INSERT INTO `mercasena`.`productos_MedidaVenta`(`prodMed_medida`)
VALUES(p_medida) ; END $$
DELIMITER
    ;
    -- actualizar 
DELIMITER
    $$
CREATE PROCEDURE actualizar_producto_medidaVenta(
    IN p_prodMed_id INT,
    IN p_medida TEXT
)
BEGIN
    UPDATE
        `mercasena`.`productos_MedidaVenta`
    SET
        `prodMed_medida` = p_medida
    WHERE
        `prodMed_id` = p_prodMed_id ; END $$
    DELIMITER
        ;
        -- eliminar 
    DELIMITER
        $$
    CREATE PROCEDURE eliminar_producto_medidaVenta(IN p_prodMed_id INT)
BEGIN
    DELETE
FROM
    `mercasena`.`productos_MedidaVenta`
WHERE
    `prodMed_id` = p_prodMed_id ; END $$
DELIMITER
    ;
    -- ===========================================================
    -- =================   productos  ==========================
    -- crear 

DELIMITER $$

CREATE PROCEDURE crear_producto(IN p_nombre VARCHAR(45))
BEGIN
    INSERT INTO `mercasena`.`productos`(`prod_nombre`)
    VALUES(p_nombre);
END $$
DELIMITER ;
DELIMITER $$

DELIMITER $$

CREATE PROCEDURE actualizar_producto(
    IN p_producto_id INT,
    IN nuevo_nombre VARCHAR(255)
)
BEGIN
    UPDATE `mercasena`.`productos`
    SET `prod_nombre` = nuevo_nombre
    WHERE `prod_id` = p_producto_id;
END $$

DELIMITER ;
DELIMITER $$

CREATE PROCEDURE eliminar_producto(
    IN p_producto_id INT
)
BEGIN
    DELETE FROM `mercasena`.`productos`
    WHERE `prod_id` = p_producto_id;
END $$

DELIMITER ;










CREATE PROCEDURE obtener_producto_por_id(IN p_prod_id INT)
BEGIN
    SELECT
        p.*,
        pc.prodCat_categoria AS categoria,
        pe.prodE_tipo AS estado,
        pm.prodMed_medida AS medida_venta,
        pp.prodPes_medida AS peso_venta_medida,
        pp.prodPes_numero AS peso_venta_numero
    FROM
        `mercasena`.`productos` p
    LEFT JOIN `mercasena`.`productos_categoria` pc
    ON
        p.prodCat_id = pc.prodCat_id
    LEFT JOIN `mercasena`.`productos_Estado` pe
    ON
        p.prodE_id = pe.prodE_id
    LEFT JOIN `mercasena`.`productos_MedidaVenta` pm
    ON
        p.prodMed_id = pm.prodMed_id
    LEFT JOIN `mercasena`.`productos_PesoVenta` pp
    ON
        p.prodPes_id = pp.prodPes_id
    WHERE
        p.prod_id = p_prod_id ; END $$
    DELIMITER
        ;
        -- Procedimiento para listar todos los productos con información relacionada
    DELIMITER
        $$
    CREATE PROCEDURE listar_productos()
BEGIN
    SELECT
        p.*, pc.prodCat_categoria AS categoria, pe.prodE_tipo AS estado, pm.prodMed_medida AS medida_venta, pp.prodPes_medida AS peso_venta_medida, pp.prodPes_numero AS peso_venta_numero
    FROM
        `mercasena`.`productos` p
    LEFT JOIN `mercasena`.`productos_categoria` pc
    ON
        p.prodCat_id = pc.prodCat_id
    LEFT JOIN `mercasena`.`productos_Estado` pe
    ON
        p.prodE_id = pe.prodE_id
    LEFT JOIN `mercasena`.`productos_MedidaVenta` pm
    ON
        p.prodMed_id = pm.prodMed_id
    LEFT JOIN `mercasena`.`productos_PesoVenta` pp
    ON
        p.prodPes_id = pp.prodPes_id ; END $$
    DELIMITER
        ;
-- ====================================================================
-- ===================== PEDIDOS ==============================
DELIMITER $$

CREATE PROCEDURE crear_pedido(
    IN p_preciototal FLOAT,
    IN p_usr_id INT,
    in p_id varchar(255)  
)
BEGIN
    INSERT INTO `pedidos`(`pedi_id` ,`pedi_preciototal`, `usr_id`)
    VALUES(p_id,p_preciototal, p_usr_id);
END $$
DELIMITER ;

DELIMITER $$


CREATE PROCEDURE actualizar_pedido(
    IN p_pedi_id INT,
    IN nuevo_preciototal FLOAT,
    IN nuevo_usr_id INT
)
BEGIN
    UPDATE `pedidos`
    SET `pedi_preciototal` = nuevo_preciototal,
        `usr_id` = nuevo_usr_id
    WHERE `pedi_id` = p_pedi_id;
END $$

DELIMITER $$

CREATE PROCEDURE eliminar_pedido(
    IN p_pedi_id INT
)
BEGIN
    DELETE FROM `pedidos`
    WHERE `pedi_id` = p_pedi_id;
END $$

DELIMITER ;

-- ===========================================================
-- ==================== PEDIDOS_TIENE_PRODUCTOS ============

DELIMITER $$

CREATE PROCEDURE crear_pedido_tiene_producto(
    IN p_subCat_id INT,
    IN p_pedi_id INT,
    IN p_precioParcial FLOAT,
    IN p_cantidad FLOAT
)
BEGIN
    INSERT INTO `pedidos_tiene_productos`(`subCat_id`, `pedi_id`, `pedProd_precioParcial`, `pedProd_cantidad`)
    VALUES(p_subCat_id, p_pedi_id, p_precioParcial, p_cantidad);
END $$

DELIMITER $$

CREATE PROCEDURE actualizar_pedido_tiene_productos(
    IN p_pedProd_id INT,
    IN nuevo_subCat_id INT,
    IN nuevo_pedi_id INT,
    IN nuevo_precioParcial FLOAT,
    IN nueva_cantidad FLOAT
)
BEGIN
    UPDATE `pedidos_tiene_productos`
    SET `subCat_id` = nuevo_subCat_id,
        `pedi_id` = nuevo_pedi_id,
        `pedProd_precioParcial` = nuevo_precioParcial,
        `pedProd_cantidad` = nueva_cantidad
    WHERE `pedProd_id` = p_pedProd_id;
END $$

DELIMITER ;

DELIMITER $$

CREATE PROCEDURE eliminar_pedido_tiene_producto(
    IN p_pedProd_id INT
)
BEGIN
    DELETE FROM `pedidos_tiene_productos`
    WHERE `pedProd_id` = p_pedProd_id;
END $$

DELIMITER ;

-- ============================================
-- ============== estado_pedidos ======================
DELIMITER $$

CREATE PROCEDURE crear_estado_pedido(
    IN p_estado TEXT
)
BEGIN
    INSERT INTO `estado_pedido`(`pedE_estado`)
    VALUES(p_estado);
END $$

DELIMITER $$

CREATE PROCEDURE actualizar_estado_pedido(
    IN p_pedE_id INT,
    IN nuevo_estado TEXT
)
BEGIN
    UPDATE `estado_pedido`
    SET `pedE_estado` = nuevo_estado
    WHERE `pedE_id` = p_pedE_id;
END $$

DELIMITER $$

CREATE PROCEDURE eliminar_estado_pedido(
    IN p_pedE_id INT
)
BEGIN
    DELETE FROM `estado_pedido`
    WHERE `pedE_id` = p_pedE_id;
END $$

DELIMITER ;
-- =====================================================
-- ============ productos SubCategorias =====================
DELIMITER $$

-- Crear
CREATE PROCEDURE crear_producto_subcategoria(
    IN p_prod_id INT,
    IN p_subCat_nombre TEXT,
    IN p_subCat_existencias INT,
    IN p_subCat_precio DOUBLE,
    IN p_prodMed_id INT,
    IN p_prodCat_cantidad INT,
    IN p_prodCat_descripcion VARCHAR(45),
    IN p_prodCat_fechaExpiracion DATE,
    IN p_prodPes_id INT,
    IN p_prodE_id INT,
    IN p_prodCat_id INT
)
BEGIN
    INSERT INTO `mercasena`.`productos_subcategorias`(
        `prod_id`,
        `subCat_nombre`,
        `subCat_existencias`,
        `subCat_precio`,
        `prodMed_id`,
        `prodCat_cantidad`,
        `prodCat_descripcion`,
        `prodCat_fechaExpiracion`,
        `prodPes_id`,
        `prodE_id`,
        `prodCat_id`
    )
    VALUES(
        p_prod_id,
        p_subCat_nombre,
        p_subCat_existencias,
        p_subCat_precio,
        p_prodMed_id,
        p_prodCat_cantidad,
        p_prodCat_descripcion,
        p_prodCat_fechaExpiracion,
        p_prodPes_id,
        p_prodE_id,
        p_prodCat_id
    );
END $$

DELIMITER $$

-- Actualizar
CREATE PROCEDURE actualizar_producto_subcategoria(
    IN p_subCat_id INT,
    IN p_prod_id INT,
    IN p_subCat_nombre TEXT,
    IN p_subCat_existencias INT,
    IN p_subCat_precio DOUBLE,
    IN p_prodMed_id INT,
    IN p_prodCat_cantidad INT,
    IN p_prodCat_descripcion VARCHAR(45),
    IN p_prodCat_fechaExpiracion DATE,
    IN p_prodPes_id INT,
    IN p_prodE_id INT,
    IN p_prodCat_id INT
)
BEGIN
    UPDATE `mercasena`.`productos_subcategorias`
    SET
        `prod_id` = p_prod_id,
        `subCat_nombre` = p_subCat_nombre,
        `subCat_existencias` = p_subCat_existencias,
        `subCat_precio` = p_subCat_precio,
        `prodMed_id` = p_prodMed_id,
        `prodCat_cantidad` = p_prodCat_cantidad,
        `prodCat_descripcion` = p_prodCat_descripcion,
        `prodCat_fechaExpiracion` = p_prodCat_fechaExpiracion,
        `prodPes_id` = p_prodPes_id,
        `prodE_id` = p_prodE_id,
        `prodCat_id` = p_prodCat_id
    WHERE
        `subCat_id` = p_subCat_id;
END $$

DELIMITER $$

-- Eliminar
CREATE PROCEDURE eliminar_producto_subcategoria(
    IN p_subCat_id INT
)
BEGIN
    DELETE FROM `mercasena`.`productos_subcategorias`
    WHERE `subCat_id` = p_subCat_id;
END $$

DELIMITER ;


-- =====================================================
-- ============ productos Imagenes =====================

DELIMITER $$

-- Crear
CREATE PROCEDURE crear_producto_imagen(
    IN p_prodImg_ruta TEXT,
    IN p_subCat_id INT,
    IN p_prodImg_miniatura  tinyint
)
BEGIN
    INSERT INTO `mercasena`.`productos_imagenes`(
        `prodImg_ruta`,
        `subCat_id`,
        `prodImg_miniatura`
    )
    VALUES(
        p_prodImg_ruta,
        p_subCat_id,
        p_prodImg_miniatura
    );
END $$

DELIMITER ;

DELIMITER $$

-- Actualizar
CREATE PROCEDURE actualizar_producto_imagen(
    IN p_prodImg_id INT,
    IN p_prodImg_ruta TEXT,
    IN p_subCat_id INT,
    IN p_prodImg_miniatura tinyint

)
BEGIN
    UPDATE `mercasena`.`productos_imagenes`
    SET
        `prodImg_ruta` = p_prodImg_ruta,
        `subCat_id` = p_subCat_id,
        `prodImg_miniatura` = p_prodImg_miniatura  
    WHERE
        `prodImg_id` = p_prodImg_id;
END $$

DELIMITER ;

DELIMITER $$

-- Eliminar
CREATE PROCEDURE eliminar_producto_imagen(
    IN p_prodImg_id INT
)
BEGIN
    DELETE FROM `mercasena`.`productos_imagenes`
    WHERE `prodImg_id` = p_prodImg_id;
END $$

DELIMITER ;








        -- ===========================================================
        -- =================   productos subcategorias  ==========================
        -- crear 
DELIMITER
        $$

    CREATE PROCEDURE crear_producto_subcategoria(
        IN p_prod_id INT(11),
        IN p_subCat_categoria TEXT
    )
BEGIN
    INSERT INTO `mercasena`.`productos_subcategorias`(prod_id, subCat_categoria)
VALUES(p_prod_id, p_subCat_categoria) ;
END $$
DELIMITER
    ;
    -- actualizar 
DELIMITER
    $$
CREATE PROCEDURE actualizar_productos_subcategoria(
    IN p_subCat_id INT(11) ,IN p_prod_id INT(11),
    IN p_subCat_categoria TEXT
)
BEGIN
    UPDATE
        `mercasena`.`productos_subcategorias`
    SET
        prod_id = p_prod_id,
        subCat_categoria = p_subCat_categoria
    WHERE
        subCat_id = p_subCat_id ;
END $$
DELIMITER
    ;
    -- eliminar 
DELIMITER
    $$
CREATE PROCEDURE eliminar_productos_subcategoria(IN IN p_subCat_id , INT(11))
BEGIN
    DELETE
FROM
    `mercasena`.`productos_subcategorias`
WHERE
    subCat_id = p_subCat_id ;
END $$
DELIMITER ;








-- ===========================================================
-- =================  carrito tiene productos  ==========================
-- =================   productos  carrito ==========================

DELIMITER $$

-- CREAR
CREATE PROCEDURE crear_carrito(
    IN p_car_id VARCHAR(255),
    IN p_prod_id INT,
    IN p_car_total DOUBLE,
    IN p_car_fechaCreacion DATETIME,
    IN p_usr_correo VARCHAR(45),
    IN p_car_prodCantidad FLOAT,
    IN p_car_prodPrecioTotal FLOAT
)
BEGIN
    INSERT INTO `mercasena`.`Carrito`(
        `car_id`,
        `prod_id`,
        `car_total`,
        `car_fechaCreacion`,
        `usr_correo`,
        `car_prodCantidad`,
        `car_prodPrecioTotal`
    )
    VALUES(
        p_car_id,
        p_prod_id,
        p_car_total,
        p_car_fechaCreacion,
        p_usr_correo,
        p_car_prodCantidad,
        p_car_prodPrecioTotal
    );
END $$

DELIMITER ;
DELIMITER $$ 
--  ACTUALZAR 
CREATE PROCEDURE actualizar_carrito(
    IN p_car_id INT,
    IN p_prod_id INT,
    IN p_car_total DOUBLE,
    IN p_car_fechaCreacion DATETIME,
    IN p_usr_correo VARCHAR(45),
    IN p_car_prodCantidad FLOAT,
    IN p_car_prodPrecioTotal FLOAT
)
BEGIN
    UPDATE `mercasena`.`Carrito`
    SET
        `prod_id` = p_prod_id,
        `car_total` = p_car_total,
        `car_fechaCreacion` = p_car_fechaCreacion,
        `usr_correo` = p_usr_correo,
        `car_prodCantidad` = p_car_prodCantidad,
        `car_prodPrecioTotal` = p_car_prodPrecioTotal
    WHERE
        `car_id` = p_car_id;
END $$
DELIMITER ;

DELIMITER $$
-- ELIMINAR
CREATE PROCEDURE eliminar_carrito(
    IN p_car_id VARCHAR(255)
)
BEGIN
    DELETE FROM `mercasena`.`Carrito`
    WHERE `car_id` = p_car_id;
END $$

DELIMITER ;

-- ===========================================================
-- =================   tabla administrativos  ==========================




--- =======================YEISON==================================== 
-- ======================== detalles usuarios ===========================
 --  agregar 
-- DELIMITER $$

--  CREATE PROCEDURE crear_detalle_usuario( 
--     IN p_tipoUsr_id INT,
--     IN p_usr_correo VARCHAR(45)
--     )
--     BEGIN 
--         INSERT INTO `mercasena`.`detalles_usuarios`(tipoUsr_id,usr_correo ) 
--         VALUES(p_tipoUsr_id, p_usr_correo ); 
--     END $$
-- DELIMITER ;

DELIMITER $$

 CREATE PROCEDURE crear_detalle_usuario( 
    IN p_usr_id  VARCHAR(255)
    )
    BEGIN 
        INSERT INTO `mercasena`.`detalles_usuarios`(usr_id ) 
        VALUES(p_usr_id ); 
    END $$
DELIMITER ;

DELIMITER $$

-- actualizar 
CREATE PROCEDURE actualizar_detalle_usuario(
    IN p_detUsr_id INT,
    IN p_tipoUsr_id INT,
    IN p_usr_id VARCHAR(255)
    )
    BEGIN
    UPDATE `mercasena`.`detalles_usuarios` SET 
        tipoUsr_id = p_tipoUsr_id,
        usr_id = p_usr_id 
        WHERE detUsr_id = p_detUsr_id;
    END $$
DELIMITER ;

DELIMITER $$

 CREATE PROCEDURE eliminar_detalle_usuario(
    IN p_detUsr_id INT
    )
    BEGIN DELETE FROM `mercasena`.`detalles_usuarios` WHERE detUsr_id = p_detUsr_id;
    END $$
DELIMITER ;




-- ==============================================================

-- ================= tabla usuarios ==========================
-- Crear usuario
DELIMITER $$
CREATE PROCEDURE crear_usuario(
    IN p_id VARCHAR(255),
    IN p_usr_correo text,
    IN p_clie_nombre TINYTEXT,
    IN p_password text
)
BEGIN
 IF EXISTS (SELECT 1 FROM usuarios WHERE usr_correo = p_usr_correo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = ' correo electrónico ya existe.';
    ELSE

    INSERT INTO `mercasena`.`usuarios` (
        `usr_id`, `usr_correo`, `usr_nombre`, `usr_contrasena_hash`
    ) VALUES (
        p_id, p_usr_correo , p_clie_nombre, p_password
    );
    -- cuando se ingresa un usuario entonces tambien se agrega a la tabla de usuarios 
    CALL  crear_detalle_usuario(p_id);
END $$
DELIMITER ;

-- CALL crear_usuario('elpepe@gmaiñ.com','nombre','direccion','3224455342','nose',1,'23422345');

DELIMITER $$
CREATE DEFINER=`root`@`localhost` PROCEDURE `crear_usuario` (
    IN p_usr_correo VARCHAR(45),
    IN p_usr_nombre TINYTEXT,
    IN p_usr_direccion TEXT,
    IN p_usr_telefono TEXT,
    IN p_NIT TEXT,
    IN p_tipoUsr INT(10),
    IN p_usr_contrasena_hash TEXT
    )   BEGIN
    -- Verificamos si el usuario ya existe
    IF EXISTS (SELECT 1 FROM usuarios WHERE usr_correo = p_usr_correo) THEN
        SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Usuario o correo electrónico ya existe.';
    ELSE
        -- Inserta el nuevo usuario
        INSERT INTO `mercasena`.`usuarios` (
            `usr_correo`, `usr_nombre`, `usr_direccion`, `usr_telefono`, `NIT`, `tipoUsr`,`usr_contrasena_hash`
        ) VALUES (
            p_usr_correo, p_usr_nombre, p_usr_direccion, p_usr_telefono, p_NIT, p_tipoUsr, p_usr_contrasena_hash
        );

        -- lo agregamos a la tabla detalles usuarios
        CALL crear_detalle_usuario(p_usr_correo);
    END IF;
END$$

DELIMITER ;

-- actualizar usuario


DELIMITER $$
CREATE PROCEDURE actualizar_usuario(
    IN p_usr_correo VARCHAR(45),
    IN p_usr_nombre TINYTEXT,
    IN p_usr_direccion TEXT,
    IN p_usr_telefono TEXT,
    IN p_NIT TEXT,
    IN p_tipoUsr INT(10),
    IN p_usr_contrasena_hash TEXT
)
BEGIN
    UPDATE `mercasena`.`usuarios`
    SET
        `usr_nombre` = p_usr_nombre,
        `usr_direccion` = p_usr_direccion,
        `usr_telefono` = p_usr_telefono,
        `NIT` = p_NIT,
        `tipoUsr` = p_tipoUsr,
        `usr_contrasena_hash` =  p_usr_contrasena_hash
    WHERE `usr_correo` = p_usr_correo;
END $$
DELIMITER ;

-- actualizar correo del usuario

DELIMITER $$
CREATE PROCEDURE actualizar_correo_usuario(
    IN p_usr_correo VARCHAR(45),
    IN p_nuevo_usr_correo VARCHAR(45)
)
BEGIN
    --verficamos que no exista ya esse correo
    IF EXISTS (SELECT 1 FROM usuarios WHERE usr_correo = p_usr_correo)THEN
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Correo electrónico ya existe.';
    ELSE
        UPDATE `mercasena`.`usuarios`
        SET
            `usr_correo` = p_nuevo_usr_correo
        WHERE `usr_correo` = p_usr_correo;
    END IF ;
END $$
DELIMITER ;


---Eliminar usuarios


DELIMITER $$
CREATE PROCEDURE eliminar_usuario(IN p_usr_correo VARCHAR(45))
BEGIN
    DELETE FROM `mercasena`.`usuarios` WHERE `usr_correo` = p_usr_correo;
END $$
DELIMITER ;











-- Crear pedidos 


DELIMITER $$
CREATE PROCEDURE CrearPedido(
    IN p_pedi_preciototal FLOAT,
    IN p_pedi_unidadMedida TEXT,
    IN p_usr_correo VARCHAR(45),
    IN p_pedi_cantidad FLOAT,
    IN p_pedi_peso FLOAT
)
BEGIN
    INSERT INTO `mercasena`.`pedidos` (
        `pedi_preciototal`, `pedi_unidadMedida`, `usr_correo`, `pedi_cantidad`, `pedi_peso`
    ) VALUES (
        p_pedi_preciototal, p_pedi_unidadMedida, p_usr_correo, p_pedi_cantidad, p_pedi_peso
    );
END $$
DELIMITER ;


-- actualizar pedidos 


DELIMITER $$
CREATE PROCEDURE actualizar_pedido(
    IN p_pedi_id INT,
    IN p_pedi_preciototal FLOAT,
    IN p_pedi_unidadMedida TEXT,
    IN p_usr_correo VARCHAR(45),
    IN p_pedi_cantidad FLOAT,
    IN p_pedi_peso FLOAT
)
BEGIN
    UPDATE `mercasena`.`pedidos`
    SET
        `pedi_preciototal` = p_pedi_preciototal,
        `pedi_unidadMedida` = p_pedi_unidadMedida,
        `usr_correo` = p_usr_correo,
        `pedi_cantidad` = p_pedi_cantidad,
        `pedi_peso` = p_pedi_peso
    WHERE `pedi_id` = p_pedi_id;
END $$
DELIMITER ;


-- eliminar pedidos 

DELIMITER $$
CREATE PROCEDURE eliminar_pedido(IN p_pedi_id INT)
BEGIN
    DELETE FROM `mercasena`.`pedidos` WHERE `pedi_id` = p_pedi_id;
END $$
DELIMITER ;

-- Crear factura

DELIMITER $$
CREATE PROCEDURE crear_factura(
    IN p_usr_id VARCHAR(45),
    IN p_fac_precioTotal FLOAT,
    IN pedi_info text
    
)
BEGIN
    INSERT INTO `mercasena`.`facturas` (
        `usr_id`, `fac_precioTotal`, `pedi_info`
    ) VALUES (
        p_usr_id,  p_fac_pesoProducto, pedi_info
    );
END $$
DELIMITER ;



-- actualizar factura
 
DELIMITER $$
CREATE PROCEDURE actualizar_factura(
    IN p_fac_id INT,
    IN p_usr_correo VARCHAR(45),
    IN p_fac_fecha DATETIME,
    IN p_fac_pesoProducto FLOAT,
    IN p_fac_precioTotal FLOAT,
    IN p_fac_direccion MEDIUMTEXT,
    IN p_pedi_id INT,
    IN p_fac_estado ENUM('pendiente de pago', 'cancelado', 'pagado')
)
BEGIN
    UPDATE `mercasena`.`facturas`
    SET
        `usr_correo` = p_usr_correo,
        `fac_fecha` = p_fac_fecha,
        `fac_pesoProducto` = p_fac_pesoProducto,
        `fac_precioTotal` = p_fac_precioTotal,
        `fac_direccion` = p_fac_direccion,
        `pedi_id` = p_pedi_id,
        `fac_estado` = p_fac_estado
    WHERE `fac_id` = p_fac_id;
END $$
DELIMITER ;

-- eliminar factura 

DELIMITER $$
CREATE PROCEDURE eliminar_factura(IN p_fac_id INT)
BEGIN
    DELETE FROM `mercasena`.`facturas` WHERE `fac_id` = p_fac_id;
END $$
DELIMITER ;


-- Crear venta

DELIMITER $$
CREATE PROCEDURE crear_venta(
    IN p_fac_id INT,
)
BEGIN
    INSERT INTO `mercasena`.`ventas` (`fac_id`)
    VALUES (p_fac_id);
END $$
DELIMITER ;

-- actualizar venta 


DELIMITER $$
CREATE PROCEDURE actualizar_venta(
    IN p_vent_id INT,
    IN p_fac_id INT
)
BEGIN
    UPDATE `mercasena`.`ventas`
    SET `fac_id` = p_fac_id
    WHERE `vent_id` = p_vent_id;
END $$
DELIMITER ;


-- eliminar venta 


DELIMITER $$
CREATE PROCEDURE eliminar_venta(IN p_vent_id INT)
BEGIN
    DELETE FROM `mercasena`.`ventas` WHERE `vent_id` = p_vent_id;
END $$
DELIMITER ;



-- Crear ComunidadSena


DELIMITER $$
CREATE PROCEDURE crear_comunidadSena(
    IN p_usr_cedula INT,
    IN p_usr_nombre TINYTEXT,
    IN p_usr_telefono TINYTEXT,
    IN p_usr_ficha TINYTEXT,
    IN p_usr_email TINYTEXT,
    IN p_usr_contrasena LONGTEXT,
    IN p_tipo_Usr INT(10)
)
BEGIN
    INSERT INTO `mercasena`.`comunidadSena` (
        `usr_cedula`, `usr_nombre`, `usr_telefono`, `usr_ficha`, `usr_email`, `usr_contrasena`, `tipo_Usr`
    ) VALUES (
        p_usr_cedula, p_usr_nombre, p_usr_telefono, p_usr_ficha, p_usr_email, p_usr_contrasena, p_tipo_Usr
    );
END $$
DELIMITER ;




-- actualizar ComunidadSena


DELIMITER $$
CREATE PROCEDURE actualizar_comunidadSena(
    IN p_usr_cedula INT,
    IN p_usr_nombre TINYTEXT,
    IN p_usr_telefono TINYTEXT,
    IN p_usr_ficha TINYTEXT,
    IN p_usr_email TINYTEXT,
    IN p_usr_contrasena LONGTEXT,
    IN p_tipo_Usr INT(10)
)
BEGIN
    UPDATE `mercasena`.`comunidadSena`
    SET
        `usr_nombre` = p_usr_nombre,
        `usr_telefono` = p_usr_telefono,
        `usr_ficha` = p_usr_ficha,
        `usr_email` = p_usr_email,
        `usr_contrasena` = p_usr_contrasena,
        `tipo_Usr` = p_tipo_Usr
    WHERE `usr_cedula` = p_usr_cedula;
END $$
DELIMITER ;



-- eliminar ComunidadSena


DELIMITER $$
CREATE PROCEDURE eliminar_comunidadSena(IN p_usr_cedula INT)
BEGIN
    DELETE FROM `mercasena`.`comunidadSena` WHERE `usr_cedula` = p_usr_cedula;
END $$
DELIMITER ;

