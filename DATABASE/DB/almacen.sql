-- MySQL database export
START TRANSACTION;

CREATE TABLE IF NOT EXISTS `loan_state` (
    `loanState_id` INT NOT NULL,
    `loanState_name` TINYTEXT,
    CONSTRAINT `pk_table_14_id` PRIMARY KEY (`loanState_id`)
);



CREATE TABLE IF NOT EXISTS `loan` (
    `loan_id` INT NOT NULL,
    `loan_datetime` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `loan_date` DATE NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `user_id` VARCHAR(255),
    `carnetConfirmation` INT,
    `loanState_id` INT NOT NULL,
    `loan_programID` BIGINT
);



CREATE TABLE IF NOT EXISTS `user_has_roles` (
    `UserRoles_id` INT NOT NULL,
    `role_id` INT,
    `usr_id` VARCHAR(255) DEFAULT NULL
);



CREATE TABLE IF NOT EXISTS `user` (
    `usr_id` VARCHAR(255) NOT NULL,
    `usr_email` TEXT NOT NULL,
    `usr_name` TEXT NOT NULL,
    `usr_address` TEXT DEFAULT NULL,
    `usr_phoneNumber` TEXT DEFAULT NULL,
    `usr_logo` TEXT DEFAULT NULL,
    `usr_creationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `NIT` TEXT DEFAULT NULL,
    `isActive` TINYINT(1),
    `usr_password_hash` TEXT NOT NULL,
    `usr_lastConnection` BIGINT,
    `usr_formationProgramID` INT,
    `usr_formationProgramName` BIGINT,
    `userCategory_id` INT,
    `userState_id` INT
);



CREATE TABLE IF NOT EXISTS `loans_has_products` (
    `lp_id` INT NOT NULL,
    `loan_id` INT,
    `prodVar_id` INT,
    `prod_quantity` INT,
    CONSTRAINT `pk_table_16_id` PRIMARY KEY (`lp_id`)
);



CREATE TABLE IF NOT EXISTS `product` (
    `prod_id` INT NOT NULL,
    `prod_name` VARCHAR(45) DEFAULT NULL,
    `prod_creationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()'
);



CREATE TABLE IF NOT EXISTS `product_images` (
    `prodImg_id` INT NOT NULL,
    `prodImg_path` TEXT DEFAULT NULL,
    `prodVar_id` INT DEFAULT NULL,
    `prodImg_creationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `prodImg_miniature` tinyint NOT NULL DEFAULT 0
);



CREATE TABLE IF NOT EXISTS `product_category` (
    `prodCat_id` INT NOT NULL,
    `prodCat_creationDate` DATETIME DEFAULT 'CURRENT_TIMESTAMP()',
    `prodCat_name` TEXT DEFAULT NULL
);



CREATE TABLE IF NOT EXISTS `product_variation` (
    `prodVar_id` INT NOT NULL,
    `prod_id` INT DEFAULT NULL,
    `prodVar_name` TEXT DEFAULT NULL,
    `prodVar_creationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `prodVar_actualizationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()',
    `prodVar_stock` INT NOT NULL,
    `prodMeasurement_id` INT NOT NULL,
    `isConsumable` TINYINT(1) NOT NULL,
    `prodVar_description` TEXT DEFAULT NULL,
    `prodVar_expirationDate` DATE DEFAULT NULL,
    `prodWeight_id` INT NOT NULL,
    `prodState_id` INT NOT NULL,
    `prodCategory_id` INT NOT NULL,
    `prodVar_minStock` INT NOT NULL,
    `isVisible` INT NOT NULL DEFAULT 1,
    `prodVar_loanStock` INT
);



CREATE TABLE IF NOT EXISTS `product_state` (
    `prodState_id` INT NOT NULL,
    `prodState_name` TEXT DEFAULT NULL,
    `prodState_CreationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()'
);



CREATE TABLE IF NOT EXISTS `product_measurement` (
    `prodMea_id` INT NOT NULL,
    `prodMea_measurement` TEXT DEFAULT NULL,
    `prodMed_factor` FLOAT NOT NULL DEFAULT 1,
    `prodMea_creationDate` DATETIME NOT NULL DEFAULT 'CURRENT_TIMESTAMP()'
);



CREATE TABLE IF NOT EXISTS `roles` (
    `role_id` INT NOT NULL,
    `role_name` TINYTEXT NOT NULL
);



CREATE TABLE IF NOT EXISTS `user_state` (
    `userState_id` INT NOT NULL,
    `userState_name` TEXT,
    CONSTRAINT `pk_table_13_id` PRIMARY KEY (`userState_id`)
);



CREATE TABLE IF NOT EXISTS `user_category` (
    `userCat_id` INT NOT NULL,
    `userCat_name` TEXT,
    `userCat_criticLevel` INT,
    CONSTRAINT `pk_table_14_id` PRIMARY KEY (`userCat_id`)
);


-- Foreign key constraints
ALTER TABLE `loan` ADD CONSTRAINT `fk_loan_loanState_id` FOREIGN KEY(`loanState_id`) REFERENCES `loan_state`(`loanState_id`);
ALTER TABLE `loans_has_products` ADD CONSTRAINT `fk_loans_has_products_loan_id` FOREIGN KEY(`loan_id`) REFERENCES `loan`(`loan_id`);
ALTER TABLE `product_variation` ADD CONSTRAINT `fk_product_variation_prod_id` FOREIGN KEY(`prod_id`) REFERENCES `product`(`prod_id`);
ALTER TABLE `product_variation` ADD CONSTRAINT `fk_product_variation_prodCategory_id` FOREIGN KEY(`prodCategory_id`) REFERENCES `product_category`(`prodCat_id`);
ALTER TABLE `product_variation` ADD CONSTRAINT `fk_product_variation_prodState_id` FOREIGN KEY(`prodState_id`) REFERENCES `product_state`(`prodState_id`);
ALTER TABLE `product_variation` ADD CONSTRAINT `fk_product_variation_prodVar_id` FOREIGN KEY(`prodVar_id`) REFERENCES `product_images`(`prodVar_id`);
ALTER TABLE `user` ADD CONSTRAINT `fk_user_usr_id` FOREIGN KEY(`usr_id`) REFERENCES `user_has_roles`(`usr_id`);
ALTER TABLE `user_has_roles` ADD CONSTRAINT `fk_user_has_roles_role_id` FOREIGN KEY(`role_id`) REFERENCES `roles`(`role_id`);
ALTER TABLE `user_state` ADD CONSTRAINT `fk_user_state_userState_id` FOREIGN KEY(`userState_id`) REFERENCES `user`(`userState_id`);
ALTER TABLE `user_category` ADD CONSTRAINT `fk_user_category_userCat_id` FOREIGN KEY(`userCat_id`) REFERENCES `user`(`userCategory_id`);
ALTER TABLE `loan` ADD CONSTRAINT `fk_loan_user_id` FOREIGN KEY(`user_id`) REFERENCES `user`(`usr_id`);
ALTER TABLE `loans_has_products` ADD CONSTRAINT `fk_loans_has_products_prodVar_id` FOREIGN KEY(`prodVar_id`) REFERENCES `product_variation`(`prodVar_id`);
ALTER TABLE `product_variation` ADD CONSTRAINT `fk_product_variation_prodMeasurement_id` FOREIGN KEY(`prodMeasurement_id`) REFERENCES `product_measurement`(`prodMea_id`);

COMMIT;
