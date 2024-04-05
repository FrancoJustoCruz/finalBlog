-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 05-04-2024 a las 01:03:40
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
-- Base de datos: `proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categorias`
--

CREATE TABLE `categorias` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `categorias`
--

INSERT INTO `categorias` (`id`, `nombre`) VALUES
(1, 'Tecnologia'),
(2, 'Moda'),
(3, 'Viajes'),
(4, 'Comida'),
(5, 'Salud'),
(6, 'Finanzas'),
(7, 'Belleza'),
(8, 'Educación'),
(9, 'Entretenimiento'),
(10, 'Hogar'),
(11, 'Automotriz'),
(12, 'Deportes'),
(13, 'Arte'),
(14, 'Maternidad'),
(15, 'Fotografía'),
(16, 'Medioambiente'),
(17, 'Ciencia'),
(18, 'Negocios'),
(19, 'Relaciones'),
(20, 'Humor'),
(22, 'Nueva Categoría');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `id` int(11) NOT NULL,
  `post_id` int(11) DEFAULT NULL,
  `user_id` int(11) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `hora_creacion` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`id`, `post_id`, `user_id`, `contenido`, `fecha_creacion`, `hora_creacion`) VALUES
(16, 2, 1, 'nuevo_contenido_del_comentario', '2024-04-04', '13:30:54'),
(17, 2, 1, 'Contenido del segundo comentario', '2024-04-04', '13:32:37'),
(18, 2, 2, 'Contenido del tercer comentario', '2024-04-04', '13:32:55'),
(19, 3, 2, 'Contenido del primer comentario del segundo post', '2024-04-04', '13:33:24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `posts`
--

CREATE TABLE `posts` (
  `id` int(11) NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `titulo` varchar(255) DEFAULT NULL,
  `contenido` text DEFAULT NULL,
  `fecha_creacion` date DEFAULT NULL,
  `hora_creacion` time DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `posts`
--

INSERT INTO `posts` (`id`, `user_id`, `titulo`, `contenido`, `fecha_creacion`, `hora_creacion`) VALUES
(2, 1, 'Segundo post modificado', 'Contenido del segundo post modificado', '2024-04-02', '09:44:30'),
(3, 2, 'tercer post', 'Contenido del tercer post', '2024-04-02', '09:45:47'),
(4, 3, 'Cuarto post', 'Contenido del cuarto post', '2024-04-04', '12:50:03'),
(5, 4, 'Quinto post', 'Contenido del quinto post', '2024-04-04', '12:50:56'),
(6, 5, 'Sexto post', 'Contenido del sexto post', '2024-04-04', '12:51:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `post_categorias`
--

CREATE TABLE `post_categorias` (
  `post_id` int(11) DEFAULT NULL,
  `categoria_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `post_categorias`
--

INSERT INTO `post_categorias` (`post_id`, `categoria_id`) VALUES
(2, 1),
(2, 2),
(2, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`id`, `nombre`) VALUES
(1, 'admin'),
(2, 'usuario');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `nombre` varchar(255) NOT NULL,
  `apellido` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `celular` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `profile_picture` varchar(255) NOT NULL,
  `role_id` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `nombre`, `apellido`, `email`, `celular`, `password`, `profile_picture`, `role_id`) VALUES
(1, 'franco', 'justo', 'email2@nuevo.com', '1234567890', 'contraseña123', 'michitrite.jpg', 1),
(2, 'armando', 'casas', 'maria@example.com', '123123123', 'contraseña456', 'arquimichi.jpg', 2),
(3, 'armando', 'paredes', 'pedro@example.com', '12121212', 'contraseña789', 'electrimichi.jpg', 1),
(4, 'betty', 'lafea', 'laura@example.com', '1111111', 'contraseñaabc', 'medimichi.jpg', 1),
(5, 'goku', 'sajajin', 'carlos@example.com', '22222', 'contraseñadef', 'michihacher.jpg', 1),
(6, 'nolose', 'tudime', 'ana@example.com', '3333', 'contraseña789', 'michiloco.jpeg', 2),
(10, 'pablo emilio', 'nomeaacuerdo', 'email@prueba.com', '777', '123456', 'polimichi.jpg', 2);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categorias`
--
ALTER TABLE `categorias`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `post_id` (`post_id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `posts`
--
ALTER TABLE `posts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indices de la tabla `post_categorias`
--
ALTER TABLE `post_categorias`
  ADD KEY `post_id` (`post_id`),
  ADD KEY `categoria_id` (`categoria_id`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD KEY `fk_role_id` (`role_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categorias`
--
ALTER TABLE `categorias`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT de la tabla `posts`
--
ALTER TABLE `posts`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `posts`
--
ALTER TABLE `posts`
  ADD CONSTRAINT `posts_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`);

--
-- Filtros para la tabla `post_categorias`
--
ALTER TABLE `post_categorias`
  ADD CONSTRAINT `post_categorias_ibfk_1` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`),
  ADD CONSTRAINT `post_categorias_ibfk_2` FOREIGN KEY (`categoria_id`) REFERENCES `categorias` (`id`);

--
-- Filtros para la tabla `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `fk_role_id` FOREIGN KEY (`role_id`) REFERENCES `rol` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
