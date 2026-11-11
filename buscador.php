<?php
include("connect.php");
session_start();

if (isset($_POST['palabraIngresada'])) {
    $palabra = $_POST['palabraIngresada'];
    $query = "SELECT * FROM personajes WHERE nombre LIKE '%$palabra%'";
    $resultado = mysqli_query($conexion, $query);
    $personajes = array();
    while($fila = mysqli_fetch_assoc($resultado)){ 
        $personajes[] = $fila;
    }
    $_SESSION['busqueda'] = $personajes;
    
    header("Location: personajes.php#buscador");
    exit();
}
?>