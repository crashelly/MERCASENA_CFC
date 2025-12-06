

 CREATE USER "usuario_test"@"localhost" IDENTIFIED BY "test";
 create database empresa_db;
GRANT SELECT  ON empresa_db.* to "usuario_test"@"localhost";

use empresa_db;
 create TABLE test(id int auto_increment PRIMARY KEY,nombre text);
 GRANT INSERT ON empresa_db.test TO "usuario_test"@"localhost";
CREATE USER "test_eliminar"@"localhost" ;
 DROP USER "test_eliminar"@"localhost" ;
DROP USER "test_eliminar"@"localhost" ;
 SHOW GRANTS;