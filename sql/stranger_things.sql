-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 26-09-2026 a las 17:28:47
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `stranger_things`
--

CREATE DATABASE IF NOT EXISTS stranger_things
CHARACTER SET utf8mb4
COLLATE utf8mb4_general_ci;

USE stranger_things;
-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `episodios`
--

CREATE TABLE `episodios` (
  `id_episodio` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `descripcion` text NOT NULL,
  `duracion` decimal(10,2) NOT NULL,
  `id_temporada` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `imageURL` text NOT NULL,
  `esFavorito` tinyint(1) NOT NULL DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `episodios`
--

INSERT INTO `episodios` (`id_episodio`, `nombre`, `descripcion`, `duracion`, `id_temporada`, `numero`, `imageURL`, `esFavorito`) VALUES
(9, 'The Vanishing of Will Byers', 'Will Byers desaparece misteriosamente cuando vuelve a casa tras jugar diez largas horas con sus mejores amigos, mientras tanto una niña con asombrosas cualidades aparece en una cafetería de la localidad.', 49.00, 1, 1, 'https://static.wikia.nocookie.net/strangerthings/images/5/5e/The_vanishing_of_will_byers.jpg/revision/latest?cb=20160826025446&path-prefix=es', 0),
(10, 'The Weirdo on Maple Street', 'Lucas, Mike y Dustin intentan hablar con la chica que encontraron en el bosque. Hopper interroga a una Joyce angustiada por una inquietante llamada telefónica.', 55.00, 1, 2, 'https://static.wikia.nocookie.net/strangerthings/images/f/fc/The_weirdo_on_mapple_street.jpg/revision/latest?cb=20160826030827&path-prefix=es', 0),
(11, 'Holly, Jolly', 'Una Nancy cada vez más preocupada busca a Barb y descubre qué ha estado haciendo Jonathan. Joyce está convencida de que Will intenta comunicarse con ella.', 52.00, 1, 3, 'https://static.wikia.nocookie.net/strangerthings/images/9/93/Holly%2C_Jolly.png/revision/latest?cb=20160828183211&path-prefix=es', 0),
(12, 'The Body', 'Joyce se niega a creer que Will esté muerto e intenta comunicarse con su hijo. Los chicos le hacen un cambio de imagen a Eleven. Nancy y Jonathan forman una alianza inesperada.', 50.00, 1, 4, 'https://static.wikia.nocookie.net/strangerthings/images/c/cd/The_Body.png/revision/latest?cb=20160828183212&path-prefix=es', 0),
(13, 'The Flea and the Acrobat', 'Hopper entra al laboratorio mientras Nancy y Jonathan se enfrentan a la fuerza que se llevó a Will. Los chicos le preguntan al profesor Clarke cómo viajar a otra dimensión.', 53.00, 1, 5, 'https://static.wikia.nocookie.net/strangerthings/images/f/f1/The_Flea_and_the_Acrobat_-_the_Monster_feeds.png/revision/latest?cb=20170730225514&path-prefix=es', 0),
(14, 'The monster', 'Un desesperado Jonathan busca a Nancy en la oscuridad, pero Steve también la está buscando. Hopper y Joyce descubren la verdad sobre los experimentos del laboratorio.', 47.00, 1, 6, 'https://static.wikia.nocookie.net/strangerthings/images/8/8a/The_Monster.jpg/revision/latest?cb=20160828183213&path-prefix=es', 0),
(15, 'The Bathtub', 'Eleven intenta llegar hasta Will, mientras Lucas advierte que los hombres malos se acercan. Nancy y Jonathan muestran a la policía lo que Jonathan captó con su cámara.', 42.00, 1, 7, 'https://static.wikia.nocookie.net/strangerthings/images/8/81/The_Bathtub_-_Joyce_and_Eleven.png/revision/latest/scale-to-width-down/1000?cb=20220223165650&path-prefix=es', 0),
(16, 'The Upside Down', 'El Dr. Brenner interroga a Hopper y Joyce, mientras los chicos se preparan para rescatar a Will y enfrentarse a la amenaza que se encuentra al otro lado.', 55.00, 1, 8, 'https://static.wikia.nocookie.net/strangerthings/images/6/63/Stranger_things_mundo_el_rev%C3%A9s.png/revision/latest/scale-to-width-down/1000?cb=20161012225046&path-prefix=es', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `temporadas`
--

CREATE TABLE `temporadas` (
  `id_temporada` int(11) NOT NULL,
  `anio` int(11) NOT NULL,
  `numero` int(11) NOT NULL,
  `descripcion` text NOT NULL,
  `cant_episodios` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `temporadas`
--

INSERT INTO `temporadas` (`id_temporada`, `anio`, `numero`, `descripcion`, `cant_episodios`) VALUES
(1, 2016, 1, 'En Hawkins, Indiana, la desaparición de Will Byers desencadena una serie de acontecimientos extraños. Mientras sus amigos lo buscan, descubren una niña con poderes, experimentos secretos y una dimensión paralela conocida como el Upside Down.', 8),
(2, 2017, 2, 'En Hawkins, un año después de los acontecimientos del Upside Down, Will Byers intenta retomar su vida normal mientras una nueva amenaza comienza a extenderse por el pueblo. La llegada de Max y la aparición de una entidad más poderosa ponen al grupo en peligro.', 9),
(3, 2019, 3, 'Durante el verano de 1985, los habitantes de Hawkins disfrutan de la apertura del centro comercial Starcourt. Sin embargo, una nueva amenaza relacionada con el Mundo del Revés pone nuevamente en peligro a Eleven y sus amigos.', 8),
(4, 2022, 4, 'Seis meses después de la batalla de Starcourt, los amigos se encuentran separados entre California, Hawkins y Rusia. Mientras Eleven intenta recuperar sus poderes, una nueva amenaza comienza a atacar a los habitantes de Hawkins desde el Upside Down.', 9),
(5, 2025, 5, 'En el otoño de 1987, Hawkins quedó marcada por la apertura de las Grietas. El grupo se reúne con un único objetivo: encontrar a Vecna y acabar con él, mientras el gobierno impone una cuarentena militar y Eleven vuelve a esconderse.', 8);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id_usuario` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `contraseña` varchar(50) NOT NULL,
  `tipo_usuario` enum('admin','consumidor') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id_usuario`, `nombre`, `email`, `contraseña`, `tipo_usuario`) VALUES
(1, 'Zoe', 'zoea@gmail.com', 'zoe123', 'consumidor'),
(2, 'Nico', 'nicot@gmail.com', 'n1c0', 'consumidor'),
(3, 'Chiara', 'vivalapesca@gmail.com', 'pesca2', 'consumidor'),
(4, 'Vito', 'vitoz@gmail.com', 'vito456', 'consumidor'),
(5, 'Ari', 'arijusid1@gmail.com', 'ariju321', 'admin');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD PRIMARY KEY (`id_episodio`),
  ADD KEY `id_temporada` (`id_temporada`);

--
-- Indices de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  ADD PRIMARY KEY (`id_temporada`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `episodios`
--
ALTER TABLE `episodios`
  MODIFY `id_episodio` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT de la tabla `temporadas`
--
ALTER TABLE `temporadas`
  MODIFY `id_temporada` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id_usuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `episodios`
--
ALTER TABLE `episodios`
  ADD CONSTRAINT `episodios_ibfk_1` FOREIGN KEY (`id_temporada`) REFERENCES `temporadas` (`id_temporada`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
