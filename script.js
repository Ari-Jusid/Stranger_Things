// =========================
// CURSOR DEL HERO
// =========================

const hero = document.querySelector(".hero");
const light = document.querySelector(".cursor-light");
const trail = document.querySelector(".cursor-trail");

if (hero && light && trail) {

    let mouseX = 0;
    let mouseY = 0;

    let lightX = 0;
    let lightY = 0;

    let trailX = 0;
    let trailY = 0;

    hero.addEventListener("mousemove", (e) => {

        const rect = hero.getBoundingClientRect();

        mouseX = e.clientX - rect.left;
        mouseY = e.clientY - rect.top;

        light.style.opacity = "1";
        trail.style.opacity = "1";
    });

    hero.addEventListener("mouseleave", () => {
        light.style.opacity = "0";
        trail.style.opacity = "0";
    });

    function animate() {

        // Luz principal
        lightX += (mouseX - lightX) * 0.15;
        lightY += (mouseY - lightY) * 0.15;

        // Estela
        trailX += (mouseX - trailX) * 0.10;
        trailY += (mouseY - trailY) * 0.10;

        light.style.left = `${lightX}px`;
        light.style.top = `${lightY}px`;

        trail.style.left = `${trailX}px`;
        trail.style.top = `${trailY}px`;

        requestAnimationFrame(animate);
    }

    animate();
}


// =========================
// BUSCADOR DE PERSONAJES
// =========================

const buscador = document.querySelector(".personajes-search input");
const personajes = document.querySelectorAll(".perCard");
const sinResultados = document.querySelector(".sin-resultados");

if (buscador) {

    buscador.addEventListener("input", function () {

        const texto = this.value.toLowerCase().trim();
        let encontrados = 0;

        personajes.forEach(function (personaje) {

            const nombre = personaje
                .querySelector("h6")
                .textContent
                .toLowerCase();

            if (nombre.includes(texto)) {

                personaje.style.display = "";
                encontrados++;

            } else {

                personaje.style.display = "none";

            }

        });

        if (sinResultados) {

            if (encontrados === 0) {
                sinResultados.style.display = "block";
            } else {
                sinResultados.style.display = "none";
            }

        }

    });

}


 const FAVS_KEY = 'st-galeria-favoritos';
            const cards = document.querySelectorAll('.galeria-card');
            const filtros = document.querySelectorAll('.filtro-tag');
            const countEl = document.querySelector('.galeria-count');
            const sinResultados2 = document.querySelector('.sin-resultados');

            function getFavoritos() {
                return JSON.parse(localStorage.getItem(FAVS_KEY) || '[]');
            }

            function guardarFavoritos(favs) {
                localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
            }

            function pintarFavoritos() {
                const favs = getFavoritos();
                cards.forEach(card => {
                    const btn = card.querySelector('.card-fav');
                    btn.classList.toggle('is-fav', favs.includes(card.dataset.id));
                });
            }

            function aplicarFiltro(filtro) {
                const favs = getFavoritos();
                let visibles = 0;
                cards.forEach(card => {
                    let mostrar = true;
                    if (filtro === 'favoritos') {
                        mostrar = favs.includes(card.dataset.id);
                    } else if (filtro !== 'todas') {
                        mostrar = card.dataset.season === filtro;
                    }
                    card.classList.toggle('is-hidden', !mostrar);
                    if (mostrar) visibles++;
                });
                countEl.textContent = `${visibles} imagen${visibles === 1 ? '' : 'es'}`;
                sinResultados2.style.display = visibles === 0 ? 'block' : 'none';
            }

            document.querySelectorAll('.card-fav').forEach(btn => {
              btn.addEventListener('click', (event) => {
                event.stopPropagation();
                    const card = btn.closest('.galeria-card');
                    const id = card.dataset.id;
                    let favs = getFavoritos();
                    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
                    guardarFavoritos(favs);
                    pintarFavoritos();

                    const activo = document.querySelector('.filtro-tag.active');
                    if (activo && activo.dataset.filter === 'favoritos') aplicarFiltro('favoritos');
                });
            });

              const lightbox = document.querySelector('#galeria-lightbox');
              const lightboxImage = lightbox?.querySelector('.lightbox-image');
              const lightboxClose = lightbox?.querySelector('.lightbox-close');
              const lightboxPrev = lightbox?.querySelector('.lightbox-prev');
              const lightboxNext = lightbox?.querySelector('.lightbox-next');
              let lightboxCards = [];
              let lightboxIndex = 0;

              function actualizarLightbox() {
                const card = lightboxCards[lightboxIndex];
                if (!card) return;
                lightboxImage.style.backgroundImage = getComputedStyle(card).backgroundImage;
                lightboxImage.setAttribute('aria-label', card.querySelector('h3')?.textContent || 'Imagen de la galería');
                lightboxPrev.disabled = lightboxCards.length < 2;
                lightboxNext.disabled = lightboxCards.length < 2;
              }

              function navegarLightbox(direccion) {
                if (lightboxCards.length < 2) return;
                lightboxIndex = (lightboxIndex + direccion + lightboxCards.length) % lightboxCards.length;
                actualizarLightbox();
              }

              function cerrarLightbox() {
                if (!lightbox) return;
                lightbox.classList.remove('is-visible');
                lightbox.setAttribute('aria-hidden', 'true');
                document.body.classList.remove('lightbox-open');
              }

              if (lightbox && lightboxImage && lightboxClose && lightboxPrev && lightboxNext) {
                cards.forEach(card => {
                  card.addEventListener('click', () => {
                    lightboxCards = [...cards].filter(item => !item.classList.contains('is-hidden'));
                    lightboxIndex = lightboxCards.indexOf(card);
                    actualizarLightbox();
                    lightbox.classList.add('is-visible');
                    lightbox.setAttribute('aria-hidden', 'false');
                    document.body.classList.add('lightbox-open');
                    lightboxClose.focus();
                  });
                });

                lightboxClose.addEventListener('click', cerrarLightbox);
                lightboxPrev.addEventListener('click', () => navegarLightbox(-1));
                lightboxNext.addEventListener('click', () => navegarLightbox(1));
                lightbox.addEventListener('click', event => {
                  if (event.target === lightbox) cerrarLightbox();
                });
                document.addEventListener('keydown', event => {
                  if (event.key === 'Escape') cerrarLightbox();
                  if (event.key === 'ArrowLeft') navegarLightbox(-1);
                  if (event.key === 'ArrowRight') navegarLightbox(1);
                });

                let touchStartX = 0;
                lightboxImage.addEventListener('touchstart', event => {
                  touchStartX = event.changedTouches[0].screenX;
                }, { passive: true });
                lightboxImage.addEventListener('touchend', event => {
                  const distance = event.changedTouches[0].screenX - touchStartX;
                  if (Math.abs(distance) > 50) navegarLightbox(distance > 0 ? -1 : 1);
                }, { passive: true });
              }

            filtros.forEach(tag => {
                tag.addEventListener('click', () => {
                    filtros.forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                    aplicarFiltro(tag.dataset.filter);
                });
            });

            pintarFavoritos();
            aplicarFiltro('todas');


(function () {
  "use strict";
  /*
   * Form Validation
   */

  // Fetch all the forms we want to apply custom validation styles to
  const forms = document.querySelectorAll(".needs-validation");
  const result = document.getElementById("result");
  // Loop over them and prevent submission
  Array.prototype.slice.call(forms).forEach(function (form) {
    form.addEventListener(
      "submit",
      function (event) {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();

          form.querySelectorAll(":invalid")[0].focus();
        } else {
          /*
           * Form Submission using fetch()
           */

          const formData = new FormData(form);
          event.preventDefault();
          event.stopPropagation();
          const object = {};
          formData.forEach((value, key) => {
            object[key] = value;
          });
          const json = JSON.stringify(object);
          result.innerHTML = "Please wait...";

          fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Accept: "application/json"
            },
            body: json
          })
            .then(async (response) => {
              let json = await response.json();
              if (response.status == 200) {
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-green-500");
              } else {
                console.log(response);
                result.innerHTML = json.message;
                result.classList.remove("text-gray-500");
                result.classList.add("text-red-500");
              }
            })
            .catch((error) => {
              console.log(error);
              result.innerHTML = "Something went wrong!";
            })
            .then(function () {
              form.reset();
              form.classList.remove("was-validated");
              setTimeout(() => {
                result.style.display = "none";
              }, 5000);
            });
        }
        form.classList.add("was-validated");
      },
      false
    );
  });
})();


const form = document.getElementById("contactForm");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const terminos = document.getElementById("terminos");

const formSuccess = document.getElementById("formSuccess");


form.addEventListener("submit", function (e) {

  e.preventDefault();

  let valido = true;

  // Limpiar errores anteriores

  document.querySelectorAll(".form-group").forEach(group => {
    group.classList.remove("error");
  });

  document.querySelectorAll(".error-message").forEach(error => {
    error.textContent = "";
  });


  // Nombre

  if (nombre.value.trim() === "") {

    mostrarError(nombre, "Por favor ingresá tu nombre.");

    valido = false;

  }


  // Email

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email.value.trim())) {

    mostrarError(email, "Ingresá un email válido.");

    valido = false;

  }


  // Asunto

  if (asunto.value.trim() === "") {

    mostrarError(asunto, "Ingresá un asunto.");

    valido = false;

  }


  // Mensaje

  if (mensaje.value.trim().length < 10) {

    mostrarError(
      mensaje,
      "El mensaje debe tener al menos 10 caracteres."
    );

    valido = false;

  }


  // Checkbox

  if (!terminos.checked) {

    alert("Tenés que aceptar ser contactado.");

    valido = false;

  }


  // Envío correcto

  if (valido) {

    formSuccess.textContent =
      "¡Mensaje enviado correctamente! Nos pondremos en contacto pronto.";

    formSuccess.classList.add("show");

    form.reset();

  }

});


function mostrarError(input, mensajeError) {

  const formGroup = input.closest(".form-group");

  const errorMessage =
    formGroup.querySelector(".error-message");

  formGroup.classList.add("error");

  errorMessage.textContent = mensajeError;

}