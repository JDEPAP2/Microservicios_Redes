CREATE DATABASE usuariosDB;
USE usuariosDB;
CREATE TABLE usuarios (
    id_usuario INT(11) NOT NULL AUTO_INCREMENT,
    nombre_completo VARCHAR(100) NOT NULL,
    usuario VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    rol ENUM('administrador', 'cliente') NOT NULL,
    PRIMARY KEY (id_usuario)
);

CREATE DATABASE paquetesDB;
USE paquetesDB;
CREATE TABLE paquetes (
    id_paquete INT(11) NOT NULL AUTO_INCREMENT,
    descripcion VARCHAR(255) NOT NULL,
    id_usuario INT(11) NOT NULL,
    estado ENUM('creado', 'en transito', 'entregado', 'devuelto') NOT NULL,
    PRIMARY KEY (id_paquete)
);

CREATE DATABASE notificacionesDB;
USE notificacionesDB;
CREATE TABLE notificaciones (
    id_notificacion INT(11) NOT NULL AUTO_INCREMENT,
    id_paquete INT(11) NOT NULL,
    id_usuario INT(11) NOT NULL,
    estado ENUM('creado', 'en transito', 'entregado', 'devuelto') NOT NULL,
    fecha_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id_notificacion)
);