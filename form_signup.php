<!DOCTYPE html>
<html lang="es">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stranger Things | Crear cuenta</title>
    <link rel="stylesheet" href="style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700&display=swap"
        rel="stylesheet">
</head>

<body>
    <main class="tw-login-container">

        <section class="tw-login-section">
         

            <div class="tw-form-container">
                <div class="tw-form-title">
                    <h1 class="tw-title">
                        Bienvenido a<br>Hawkins!
                    </h1>

                    <p class="tw-subtitle">
                        Ya tenés una cuenta?
                        <a class="tw-link" href="form_login.php">Iniciá sesión</a>
                    </p>
                </div>

                <form class="tw-form" action="signup.php" method="POST">
                    <div class="tw-input-group">
                        <label class="tw-label" for="tw-name">Nombre</label>
                        <input class="tw-input" type="text" id="tw-name" name="nombre"
                            placeholder="Tu nombre" autocomplete="name" required>
                    </div>

                    <div class="tw-input-group">
                        <label class="tw-label" for="tw-email">Email</label>
                        <input class="tw-input" type="email" id="tw-email" name="email"
                            placeholder="example@example.com" autocomplete="email" required>
                    </div>

                    <div class="tw-input-group">
                        <label class="tw-label" for="tw-password">Password</label>
                        <input class="tw-input" type="password" id="tw-password" name="contrasena"
                            placeholder="••••••••" autocomplete="new-password" minlength="8" required>
                    </div>

                    <label class="tw-subtitle" for="tw-news" >
                        <input type="checkbox" id="tw-news" name="novedades" required style="margin-bottom: 20px;">
                        Acepto recibir novedades de la comunidad.
                    </label>

                    <button class="tw-login-button" type="submit">
                        SIGN UP
                    </button>
                </form>
            </div>
        </section>

        <section class="tw-image-section">
            <div class="tw-image-overlay"></div>
            
        </section>

    </main>
</body>

</html>
