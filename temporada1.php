<?php
  include("connect.php");
  session_start();

  if (!isset($_SESSION['usuario']))
  { header("Location: form_login.php");
exit;}

  $resultado = mysqli_query($conexion, "SELECT * FROM episodios WHERE id_temporada = 1");
if (!$resultado) {
    die("Error en la consulta: " . mysqli_error($conexion));
}
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
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=mail" />
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
 <link rel="stylesheet" href="style.css">
</head>

<body>

  <!-- ===================== HEADER ===================== -->
    <header class="site-header">
    <div class=" header-inner-landing">
      <nav class="main-nav">
        <a href="index.php">
          <img src="img/minilogoST.png" alt="" class="miniLogo">
        </a>

        <a href="personajes.php">Personajes</a>

        <div class="nav-dropdown">
          <a href="temporada1.php" class="has-caret">
            Temporadas <span class="caret">▾</span>
          </a>

          <div class="dropdown-menu">
            <a href="temporada1.php">Temporada 1</a>
            <a href="temporada2.php">Temporada 2</a>
            <a href="temporada3.php">Temporada 3</a>
            <a href="temporada4.php">Temporada 4</a>
            <a href="temporada5.php">Temporada 5</a>
          </div>
        </div>

        <a href="galeria.php">Galería</a>
        <a href="quiz.php">Quiz</a>
      </nav>

      <div class="auth-buttons">
        <button class="btn btn-ghost"><a href="logout.php">Log out</a></button>
      </div>
    </div>
    </div>
  </header>


  <main>
    <div class="cursor-light"></div>
    <div class="cursor-trail"></div>

    <section class="temporada-hero">

      <div class="temporada-hero-bg"></div>

      <div class="temporada-hero-content">

        <span class="temporada-anio">2016</span>

        <h1>Temporada 1</h1>

        <p>
          En Hawkins, Indiana, la desaparición de Will Byers desencadena
          una serie de acontecimientos extraños. Mientras sus amigos lo
          buscan, descubren una niña con poderes, experimentos secretos
          y una dimensión paralela conocida como el Upside Down.
        </p>

        <a href="#episodios" class="btn btn-primary">
          Ver episodios
        </a>

      </div>

    </section>


    <!-- EPISODIOS -->
    <section class="episodios-section" id="episodios">

      <div class="episodios-container">

        <div class="episodios-header">
          <span>Temporada 1</span>
          <h2>Episodios</h2>
        </div>
        <div class="episodios-grid">

        <?php
        while($fila = mysqli_fetch_assoc($resultado)){ 

        ?>
        <article class="episodio-card">

            <img class="episodio-img episodio-1" src="<?php echo $fila['imageURL']?>" alt="Imagen del episodio 1 de la temporada 1">

            <div class="episodio-info">
              <span class="episodio-numero">0<?php echo $fila['numero']?></span>

              <h3><?php echo $fila['nombre']?></h3>

              <p>
                <?php echo $fila['descripcion']?>
              </p>
            </div>

        </article>

        <?php 
        } 
          ?>
        </div>

       

    </section>
<!-- ===================== VIDEO ===================== -->
    <section class="video-section-temporada">
      <div class="container">
        <div class="tv-wrapper">
          <div class="tv-video-wrap">
            <iframe src="https://www.youtube.com/embed/xgCxY0qWRC4?rel=0&modestbranding=1&autoplay=1&mute=1"
              title="Stranger Things - Video oficial de Netflix" frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
          <img src="img/tvST.png" alt="Televisor retro" class="tv-image">
        </div>
      </div>
    </section>

  <section class="container mb-5 temporada-posters">
                    <h2 class="quiz-title">Posters oficiales de la temporada 1</h2>
        
    <div class="row">
                <figure class="galeria-card poster col m-2" data-id="9" data-season="1">
                  <img src="https://m.media-amazon.com/images/I/71Uk2LWwj-L.jpg" alt="Poster de Stranger Things temporada 1">
                    <button class="card-fav" aria-label="Agregar a favoritos">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.6 6.6 4.6 5.2c2.3-1.1 4.8-.2 6.4 1.7L12 8l1-.9c1.6-1.9 4.1-2.8 6.4-1.7 3 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" />
                        </svg>
                    </button>
                    <span class="card-tag">T.1</span>
                    <figcaption>
                        <h3>Lorem ipsum</h3>
                    </figcaption>
                </figure>
                <figure class="galeria-card poster col m-2" data-id="10" data-season="1">
                  <img src="https://static.wikia.nocookie.net/strangerthings/images/b/bc/Stranger_Things_S01_Poster_2.jpg/revision/latest/scale-to-width-down/1000?cb=20170113222410&path-prefix=es" alt="Poster de Stranger Things temporada 1">
                    <button class="card-fav" aria-label="Agregar a favoritos">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.6 6.6 4.6 5.2c2.3-1.1 4.8-.2 6.4 1.7L12 8l1-.9c1.6-1.9 4.1-2.8 6.4-1.7 3 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" />
                        </svg>
                    </button>
                    <span class="card-tag">T.1</span>
                    <figcaption>
                        <h3>Lorem ipsum</h3>
                    </figcaption>
                </figure>
                <figure class="galeria-card poster col m-2" data-id="11" data-season="1">
                  <img src="https://static.wikia.nocookie.net/strangerthings/images/a/a1/Once_Poster_T1.jpg/revision/latest?cb=20171020213016&path-prefix=es" alt="Poster de Stranger Things temporada 1">
                    <button class="card-fav" aria-label="Agregar a favoritos">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.6 6.6 4.6 5.2c2.3-1.1 4.8-.2 6.4 1.7L12 8l1-.9c1.6-1.9 4.1-2.8 6.4-1.7 3 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" />
                        </svg>
                    </button>
                    <span class="card-tag">T.1</span>
                    <figcaption>
                        <h3>Lorem ipsum</h3>
                    </figcaption>
                </figure>
                <figure class="galeria-card poster col m-2" data-id="12" data-season="1">
                  <img src="https://static.wikia.nocookie.net/strangerthings/images/4/49/Hopper_Poster_T1.jpg/revision/latest?cb=20171020213018&path-prefix=es" alt="Poster de Stranger Things temporada 1">
                    <button class="card-fav" aria-label="Agregar a favoritos">
                        <svg viewBox="0 0 24 24" width="16" height="16">
                            <path
                                d="M12 21s-6.7-4.35-9.3-8.1C1 10.1 1.6 6.6 4.6 5.2c2.3-1.1 4.8-.2 6.4 1.7L12 8l1-.9c1.6-1.9 4.1-2.8 6.4-1.7 3 1.4 3.6 4.9 1.9 7.7C18.7 16.65 12 21 12 21z" />
                        </svg>
                    </button>
                    <span class="card-tag">T.1</span>
                    <figcaption>
                        <h3>Lorem ipsum</h3>
                    </figcaption>
                </figure>
            </div>
        </section>

  <!-- ===================== FOOTER ===================== -->
  <footer class="site-footer">
    <div class="cont footer-inner">
      <div class="footer-brand">
        <img src="img/logoST.png" alt="">
        <p class="footer-desc">Un espacio para sumergirte en el universo de Stranger Things, recorrer sus historias,
          conocer a sus personajes y revivir los momentos más memorables.</p>
        <div class="socials">
          <a href="#" aria-label="Instagram" class="social-icon">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
              <path
                d="M12 2.2c3.2 0 3.6 0 4.9.07 1.2.06 2 .24 2.4.4.6.24 1 .55 1.5 1s.75.9 1 1.5c.16.4.34 1.2.4 2.4.06 1.3.07 1.7.07 4.9s0 3.6-.07 4.9c-.06 1.2-.24 2-.4 2.4-.24.6-.55 1-1 1.5s-.9.75-1.5 1c-.4.16-1.2.34-2.4.4-1.3.06-1.7.07-4.9.07s-3.6 0-4.9-.07c-1.2-.06-2-.24-2.4-.4-.6-.24-1-.55-1.5-1s-.75-.9-1-1.5c-.16-.4-.34-1.2-.4-2.4C2.21 15.6 2.2 15.2 2.2 12s0-3.6.07-4.9c.06-1.2.24-2 .4-2.4.24-.6.55-1 1-1.5s.9-.75 1.5-1c.4-.16 1.2-.34 2.4-.4C8.4 2.21 8.8 2.2 12 2.2zm0 1.8c-3.15 0-3.5 0-4.75.07-1 .05-1.6.2-1.9.35-.5.19-.85.42-1.2.78s-.6.7-.78 1.2c-.15.3-.3.9-.35 1.9C3 9.5 3 9.85 3 13s0 3.5.07 4.75c.05 1 .2 1.6.35 1.9.19.5.42.85.78 1.2s.7.6 1.2.78c.3.15.9.3 1.9.35 1.25.07 1.6.07 4.75.07s3.5 0 4.75-.07c1-.05 1.6-.2 1.9-.35.5-.19.85-.42 1.2-.78s.6-.7.78-1.2c.15-.3.3-.9.35-1.9.07-1.25.07-1.6.07-4.75s0-3.5-.07-4.75c-.05-1-.2-1.6-.35-1.9a3.1 3.1 0 0 0-.78-1.2 3.1 3.1 0 0 0-1.2-.78c-.3-.15-.9-.3-1.9-.35C15.5 4 15.15 4 12 4zm0 3.6a5.4 5.4 0 1 1 0 10.8 5.4 5.4 0 0 1 0-10.8zm0 1.9a3.5 3.5 0 1 0 0 7 3.5 3.5 0 0 0 0-7zm5.6-2.1a1.26 1.26 0 1 1-2.52 0 1.26 1.26 0 0 1 2.52 0z" />
              </svg>
          </a>
          <a href="#" aria-label="X" class="social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M18.9 2H22l-7.5 8.6L23.3 22h-7l-5.5-7.2L4.5 22H1.4l8-9.2L1 2h7.2l5 6.6L18.9 2zm-1.2 18h1.7L7.4 3.9H5.6L17.7 20z" />
              </svg>
          </a>
          <a href="#" aria-label="TikTok" class="social-icon">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path
                d="M14 2h3.1c.2 1.6 1.4 3 3.1 3.4V8.6c-1.2 0-2.4-.4-3.4-1v6.9c0 3.4-2.7 6-6 6-1.5 0-2.9-.6-3.9-1.5A6 6 0 0 1 5.5 8.7c1-.7 2.2-1 3.4-.9v3.2c-.5-.1-1-.1-1.4.1a2.8 2.8 0 0 0-1.6 3.2c.3 1.2 1.4 2 2.6 2 1.5 0 2.8-1.2 2.8-2.8V2z" />
              </svg>
          </a>
        </div>
      </div>

      <div class="footer-links">
        <h3>Páginas</h3>
        <a href="index.html">Inicio</a>
        <a href="personajes.html">Personajes</a>
        <a href="temporada1.html">Temporadas</a>
        <a href="galeria.html">Galería</a>
                <a href="quiz.html">Quiz</a>

      </div>

      <div class="footer-contact">
        <h3>Contacto</h3>
        <a href="mailto:strangersite@gmail.com">strangersite@gmail.com</a>
        <a href="#">@stranger_site</a>
        <a href="tel:+5491165769865">+54 9 11 6576-9865</a>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="cont footer-bottom-inner">
        <p>Copyright © 2026 <span class="accent">Stranger Things</span> - Todos los derechos reservados</p>
        <p class="legal-links"><a href="#">Términos &amp; Condiciones</a> | <a href="#">Política de privacidad</a></p>
      </div>
    </div>
  </footer>
    </main>
  <script src="script.js"></script>
</body>

</html>
<?php
  mysqli_close($conexion);
?>