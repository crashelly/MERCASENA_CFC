CREATE TABLE IF NOT EXISTS `prueba`.`productos_MedidaVenta` (
  `prodMed_id` INT NOT NULL AUTO_INCREMENT,
  `prodMed_medida` VARCHAR(45) NULL,
  `prodMed_fechaCreacion` DATETIME NULL,
  PRIMARY KEY (`prodMed_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `prueba`.`productos_Estado` (
  `prodE_id` INT NOT NULL AUTO_INCREMENT,
  `prodE_tipo` ENUM('agotado', 'disponible', 'en Espera') NULL,
  PRIMARY KEY (`prodE_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `prueba`.`productos_PesoVenta` (
  `prodPes_id` INT NOT NULL AUTO_INCREMENT,
  `prodPes_medida` VARCHAR(45) NULL,  -- 
  `prodPes_fechaCreacion` DATETIME NULL,
  `prodPes_numero` INT NULL DEFAULT 1,
  PRIMARY KEY (`prodPes_id`)
) ENGINE = InnoDB;

CREATE TABLE IF NOT EXISTS `prueba`.`productos_categoria` (
  `prodCat_id` INT NOT NULL AUTO_INCREMENT,
  `prodCat_categoria` TINYTEXT NULL,
  `prodCat_fechaCreacion` VARCHAR(45) NULL,
  PRIMARY KEY (`prodCat_id`)
)
ENGINE = InnoDB;
CREATE TABLE IF NOT EXISTS `prueba`.`productos` (
  `prod_id` INT NOT NULL AUTO_INCREMENT,
  `prod_nombre` VARCHAR(45) NULL,
  `prod_existencias` INT NULL,
  `prod_precio` DOUBLE NULL,
  `prodMed_id` INT NULL,
  `prod_cantidad` INT NULL,
  `prod_tamaño` VARCHAR(45) NULL,
  `prod_peso` INT NULL,
  `prodCat_id` INT NULL,
  `prodE_id` INT NULL,
  `prod_fechaExpiracion` DATE NULL,
  `prodPes_id` INT NULL,
  PRIMARY KEY (`prod_id`),
  INDEX `fk_productos_categorias_productos1_idx` (`prodCat_id` ASC) ,
  INDEX `fk_productos_productos_MedidaVenta2_idx` (`prodMed_id` ASC),
  INDEX `fk_productos_productos_Estado1_idx` (`prodE_id` ASC),
  INDEX `fk_productos_productos_PesoVenta1_idx` (`prodPes_id` ASC),
  
  CONSTRAINT `fk_productos_categorias_productos1`
  FOREIGN KEY (`prodCat_id`)
  REFERENCES `prueba`.`productos_categoria` (`prodCat_id`)
  ON DELETE NO ACTION
  ON UPDATE NO ACTION,
  
  CONSTRAINT `fk_productos_productos_MedidaVenta2`
    FOREIGN KEY (`prodMed_id`)
    REFERENCES `prueba`.`productos_MedidaVenta` (`prodMed_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_productos_Estado1`
    FOREIGN KEY (`prodE_id`)
    REFERENCES `prueba`.`productos_Estado` (`prodE_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_productos_productos_PesoVenta`
    FOREIGN KEY (`prodPes_id`)
    REFERENCES `prueba`.`productos_PesoVenta` (`prodPes_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION
) ENGINE = InnoDB;



-- cambiar el paramtrop



CREATE TABLE IF NOT EXISTs carrito_tiene_productos(
carProd_id int AUTO_INCREMENT PRIMARY KEY,
car_id varchar(255) NOT NULL ,
prod_id int  NOT NULL ,
carProd_precioParcial float NOT NULL,
carProd_cant int NOT NULL,
carProd_categoria int NOT NULL,
subCat_id int  NOT NULL,
carProd_fecha DATETIME DEFAULT CURRENT_TIMESTAMP(),
carProd_fechaEdicion DATETIME 
    
);

-- foranea a subcategorias de productos
ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (subCat_id) REFERENCES productos_subcategorias(subCat_id) ON UPDATE CASCADE ON DELETE CASCADE ;

--foranea de el id del carrito
ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (car_id) REFERENCES carrito(car_id) ON UPDATE CASCADE ON DELETE CASCADE ;

--foranea del id del producto
ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (prod_id) REFERENCES productos(prod_id) ON UPDATE CASCADE ON DELETE CASCADE ;

-- foreabnea a las categorias de los productos
ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (carProd_categoria) REFERENCES productos_categoria(prodCat_id) ON UPDATE CASCADE ON DELETE CASCADE ;

-- foreanea de subcategorias 
ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (subCat_id) REFERENCES productos_subcategorias(subCat_id) ON UPDATE CASCADE ON DELETE CASCADE ;

-- -- foranea a las categorias de los productos
-- ALTER TABLE  carrito_tiene_productos ADD FOREIGN KEY (subCat_id) REFERENCES productos_subcategorias(subCat_id) ON UPDATE CASCADE ON DELETE CASCADE ;



DELIMITER $$

CREATE PROCEDURE get_user_id_by_email (
    IN p_usr_correo VARCHAR(45),
    OUT p_usr_id INT
)
BEGIN
    -- Retrieve the user ID based on the email
    SELECT usr_id INTO p_usr_id
    FROM usuarios
    WHERE usr_correo = p_usr_correo
    LIMIT 1;
END$$

DELIMITER ;