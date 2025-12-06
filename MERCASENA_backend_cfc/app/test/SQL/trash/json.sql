CREATE TABLE ejemplo_json (
    id INT AUTO_INCREMENT PRIMARY KEY,
    datos JSON
);

-- Insertar datos JSON
INSERT INTO ejemplo_json (datos) 
VALUES ('{"nombre": "Juan", "edad": 30, "hobbies": ["leer", "viajar"]}');

-- Consultar un valor específico
SELECT JSON_EXTRACT(datos, '$.nombre') AS nombre FROM ejemplo_json;

-- Actualizar un valor dentro del JSON
UPDATE ejemplo_json 
SET datos = JSON_SET(datos, '$.edad', 31) 
WHERE id = 1;
