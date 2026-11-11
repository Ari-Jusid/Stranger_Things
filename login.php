<?php
include("connect.php");
session_start();
$_SESSION['logueado'] = false;


$correo = $_POST['email'];
$contrasena = $_POST['contrasena'];

$consulta = "SELECT * FROM usuarios WHERE email='$correo'";
$resultado = mysqli_query($conexion, $consulta);

$error = "";

if (mysqli_num_rows($resultado) == 1) {
    $usuario = mysqli_fetch_assoc($resultado);
    
    if (password_verify($contrasena, $usuario['contraseña'])) {
         $_SESSION['usuario'] = $usuario['nombre'];
         $_SESSION['logueado'] = true;
         echo "✅ Bienvenido, " . $_SESSION['usuario'] . "!";
         header('Location: index.php');
        exit();
    } else {
               $_SESSION['error_login'] = "La contraseña es incorrecta.";
 
        header('Location: form_login.php');
        exit();?>
    
    <?php }
} else {
    $_SESSION['error_login'] = "El email ingresado no está registrado.";

     header('Location: form_login.php');
     exit();?>
    <?php
}

$error = "";
?>
