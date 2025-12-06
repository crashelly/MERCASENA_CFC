-- -- Revoke all privileges from the 'cliente' user
-- REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'cliente'@'localhost';

-- -- Drop the 'cliente' user from the database
-- DROP USER 'cliente'@'localhost';
-- -- Revoke all privileges from the 'cliente' user
-- REVOKE ALL PRIVILEGES, GRANT OPTION FROM 'admin'@'localhost';

-- -- Drop the 'cliente' user from the database
-- DROP USER 'admin'@'localhost';








-- -- para borrar lo de arriba 



-- Create the 'cliente' user with SELECT permissions
CREATE USER 'cliente'@'localhost' IDENTIFIED BY '';

-- Create the 'administrador' user with full permissions
CREATE USER 'administrador'@'localhost' IDENTIFIED BY 'admin_password';


