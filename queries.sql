-- Creación de la tabla "tabla"
CREATE TABLE tabla (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(50),
  apellido VARCHAR(50),
  edad INTEGER
);

-- Inserción de datos de ejemplo en la tabla
INSERT INTO tabla (nombre, apellido, edad) VALUES ('John', 'Doe', 25);
INSERT INTO tabla (nombre, apellido, edad) VALUES ('Jane', 'Smith', 30);
INSERT INTO tabla (nombre, apellido, edad) VALUES ('Bob', 'Johnson', 40);
