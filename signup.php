<?php
include("connect.php");

$nombre = $_POST['nombre'];
$correo = $_POST['email'];
$contrasena = password_hash($_POST['contrasena'], PASSWORD_DEFAULT);

// Verificar si el correo ya existe
$consulta = "SELECT * FROM usuarios WHERE email='$correo'";
$resultado = mysqli_query($conexion, $consulta);

if (mysqli_num_rows($resultado) > 0) {
    echo "❌ Este correo ya está registrado. <a href='form_login.php'>Inicia sesión</a>";
} else {
    $insertar = "INSERT INTO usuarios (nombre, email, contraseña)
                 VALUES ('$nombre', '$correo', '$contrasena')";
    if (mysqli_query($conexion, $insertar)) {
        header('Location: '.$index.html);
        exit();

    } else {
        echo "Error: " . mysqli_error($conexion);
    }
}
?>
