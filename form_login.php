<?php
include("connect.php");

?>

<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Stranger Things</title>
  <link rel="icon" type="image" href="img/minilogoST.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
    rel="stylesheet">
  <link rel="stylesheet"
    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=mail" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
    integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
  <link rel="stylesheet" href="style.css">
</head>

<body>

    

    <main class="tw-login-container">

        <!-- PANEL IZQUIERDO -->
        <section class="tw-login-section">

            <header class="tw-header">

               
            </header>

            <div class="tw-form-container">

                <div class="tw-form-title">
                    <h1 class="tw-title">
                        Bienvenido<br>devuelta!
                    </h1>

                    <p class="tw-subtitle">
                        No tenés una cuenta aún?
                        <a class="tw-link" href="form_signup.php">Sign Up</a>
                    </p>
                </div>

                <form class="tw-form" action="login.php" method="POST">

                    <div class="tw-input-group">
                        <label class="tw-label" for="tw-email">
                            Email
                        </label>

                        <input
                            class="tw-input"
                            type="email"
                            id="tw-email"
                            name="email"
                            placeholder="example@example.com"
                            required
                        >
                        
                    </div>

                    <div class="tw-input-group">
                        <label class="tw-label" for="tw-password">
                            Password
                        </label>

                        <input
                            class="tw-input"
                            type="password"
                            name="contrasena"
                            id="tw-password"
                            placeholder="••••••••"
                            required
                        >
                   
                    </div>

                    <?php
session_start();

if (isset($_SESSION['error_login'])) {
    echo '<p style="color: var(--red); font-size: 0.75rem;">' . $_SESSION['error_login'] . '</p>';
    unset($_SESSION['error_login']);
}
?>

                    <button class="tw-login-button" type="submit">
                        LOG IN
                    </button>


                </form>

            </div>

        </section>


        <!-- PANEL DERECHO -->
        <section class="tw-image-section">

            <div class="tw-image-overlay"></div>

            <div class="tw-decoration"></div>

            <div class="tw-image-content">

                

                

            </div>

        </section>

    </main>



</body>
</html>
