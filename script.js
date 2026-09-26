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

            cards.forEach(card => {
              if (card.dataset.imageUrl) {
                card.style.backgroundImage = `url("${card.dataset.imageUrl}")`;
              }
            });

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
                if (countEl) {
                  countEl.textContent = `${visibles} imagen${visibles === 1 ? '' : 'es'}`;
                }
                if (sinResultados2) {
                  sinResultados2.style.display = visibles === 0 ? 'block' : 'none';
                }
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
                const image = card.querySelector('img');
                const imageUrl = card.dataset.imageUrl || image?.src;
                lightboxImage.style.backgroundImage = imageUrl
                  ? `url("${imageUrl}")`
                  : getComputedStyle(card).backgroundImage;
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


const contactForm = document.getElementById("contactForm");

const nombre = document.getElementById("nombre");
const email = document.getElementById("email");
const asunto = document.getElementById("asunto");
const mensaje = document.getElementById("mensaje");
const terminos = document.getElementById("terminos");

const formSuccess = document.getElementById("formSuccess");


if (contactForm) {
contactForm.addEventListener("submit", function (e) {

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

    contactForm.reset();

  }

});
}


function mostrarError(input, mensajeError) {

  const formGroup = input.closest(".form-group");

  const errorMessage =
    formGroup.querySelector(".error-message");

  formGroup.classList.add("error");

  errorMessage.textContent = mensajeError;

}

//QUIZ

try {
  var form = document.getElementById('quizForm');
  var submitBtn = document.getElementById('quizSubmit');
  var resultModal = document.getElementById('quizResultModal');
  var resultClose = document.getElementById('quizResultClose');
  var resultName = document.getElementById('quizResultName');
  var resultImage = document.getElementById('quizResultImage');
  var resultDescription = document.getElementById('quizResultDescription');
  var allRadios = Array.prototype.slice.call(form.querySelectorAll('input[type="radio"]'));
 
  // total de preguntas = cantidad de grupos de radios distintos que hay en el form
  var groupNames = {};
  allRadios.forEach(function(r){ groupNames[r.name] = true; });
  var totalQuestions = Object.keys(groupNames).length;
 
  function checkCompletion(){
    var checked = form.querySelectorAll('input[type="radio"]:checked');
    var answeredNames = {};
    for (var i = 0; i < checked.length; i++){ answeredNames[checked[i].name] = true; }
    var answeredCount = Object.keys(answeredNames).length;
    submitBtn.disabled = answeredCount < totalQuestions;
  }
 
  function onRadioChange(e){
    var input = e.target || e.srcElement;
    if (!input || input.type !== 'radio') return;
 
    var name = input.name;
 
    // sacar el resaltado a las otras opciones de esta misma pregunta
    var group = form.querySelectorAll('input[name="' + name + '"]');
    for (var i = 0; i < group.length; i++){
      var opt = group[i].closest ? group[i].closest('.quiz-option') : group[i].parentElement;
      if (opt) {
        if (group[i].checked) { opt.classList.add('is-selected'); }
        else { opt.classList.remove('is-selected'); }
      }
    }
 
    // tildar el ítem correspondiente en el sidebar
    var navItem = document.querySelector('.quiz-nav-item[data-nav-for="' + name + '"]');
    if (navItem) navItem.classList.add('is-answered');
 
    checkCompletion();
  }
 
  // delegado en el form (por si acaso) + listener directo en cada radio (a prueba de balas)
  form.addEventListener('change', onRadioChange);
  allRadios.forEach(function(r){
    r.addEventListener('change', onRadioChange);
    r.addEventListener('click', onRadioChange);
  });
 
  // evalúa el estado ni bien carga la página: si el navegador restauró
  // respuestas ya tildadas (recarga, botón "atrás", autocompletado), esto
  // evita que el botón se quede disabled aunque ya esté todo contestado
  checkCompletion();
  allRadios.forEach(function(input){
    if (!input.checked) return;
    var opt = input.closest ? input.closest('.quiz-option') : input.parentElement;
    if (opt) opt.classList.add('is-selected');
    var nav = document.querySelector('.quiz-nav-item[data-nav-for="' + input.name + '"]');
    if (nav) nav.classList.add('is-answered');
  });
 
  var questions = Array.prototype.slice.call(form.querySelectorAll('.quiz-question'));
 
  // resaltar en el sidebar la pregunta que está a la vista mientras se hace scroll
  var navItems = Array.prototype.slice.call(document.querySelectorAll('.quiz-nav-item'));
  if (window.IntersectionObserver) {
    var observer = new IntersectionObserver(function(entries){
      entries.forEach(function(entry){
        if (!entry.isIntersecting) return;
        var qNum = entry.target.getAttribute('data-question');
        navItems.forEach(function(item){ item.classList.remove('is-current'); });
        var current = navItems[qNum - 1];
        if (current) current.classList.add('is-current');
      });
    }, { rootMargin: '-40% 0px -50% 0px' });
 
    questions.forEach(function(q){ observer.observe(q); });
  }
 
  form.addEventListener('submit', function(e){
    e.preventDefault();
    var checked = form.querySelectorAll('input[type="radio"]:checked');
    var conteo = {};
    for (var i = 0; i < checked.length; i++){
      var v = checked[i].value;
      conteo[v] = (conteo[v] || 0) + 1;
    }
    var mejor = null, mejorCant = -1;
    for (var key in conteo){
      if (conteo[key] > mejorCant) { mejor = key; mejorCant = conteo[key]; }
    }
 
    var nombres = {
      lider: 'Una persona líder, decidida a tomar acción cuando el grupo más lo necesita.',
      protector: 'Alguien protector, que siempre piensa primero en cuidar a los demás.',
      curioso: 'Un espíritu curioso, atraído por lo desconocido y las respuestas difíciles.',
      leal: 'Un compañero leal, el que nunca abandona al grupo pase lo que pase.'
    };
 
    var personajes = {
      lider: {
        nombre: 'Mike Wheeler',
        imagen: 'https://i.pinimg.com/1200x/7a/54/80/7a5480c2c534586667418a378ae63da4.jpg',
        descripcion: nombres.lider
      },
      protector: {
        nombre: 'Eleven',
        imagen: 'https://i.pinimg.com/736x/81/ee/d7/81eed76772fcf3b9524fffb8b2dc37e9.jpg',
        descripcion: nombres.protector
      },
      curioso: {
        nombre: 'Dustin Henderson',
        imagen: 'https://i.pinimg.com/736x/47/f8/b6/47f8b6cbaf3d49412a03f64fd2cf5cc8.jpg',
        descripcion: nombres.curioso
      },
      leal: {
        nombre: 'Will Byers',
        imagen: 'https://i.pinimg.com/1200x/f0/99/60/f0996059f55756e352d476456e41ac30.jpg',
        descripcion: nombres.leal
      }
    };

    var personaje = personajes[mejor];
    if (!personaje || !resultModal) return;

    resultName.textContent = personaje.nombre;
    resultImage.src = personaje.imagen;
    resultImage.alt = personaje.nombre;
    resultDescription.textContent = personaje.descripcion;
    resultModal.classList.add('is-visible');
    resultModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('quiz-modal-open');
    resultClose.focus();
  });

  function closeResultModal() {
    if (!resultModal) return;
    resultModal.classList.remove('is-visible');
    resultModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('quiz-modal-open');
  }

  if (resultClose) resultClose.addEventListener('click', closeResultModal);
  if (resultModal) {
    resultModal.addEventListener('click', function(e) {
      if (e.target === resultModal) closeResultModal();
    });
  }
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') closeResultModal();
  });
} catch (err) {
  console.error('Error en el script del quiz:', err);
}