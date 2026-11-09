
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TravelWorld | Login</title>
    <link rel="stylesheet" href="style.css">

    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
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
