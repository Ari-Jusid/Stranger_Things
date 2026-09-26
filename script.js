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

  if (sinResultados) {
    sinResultados.style.display = "none";
  }

    buscador.addEventListener("input", function () {

        const texto = this.value.toLowerCase().trim();
        let encontrados = 0;

        if (texto === "") {
          personajes.forEach(function (personaje) {
            personaje.style.display = "";
          });
          if (sinResultados) {
            sinResultados.style.display = "none";
          }
          return;
        }

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
            const allCards = cards;
            const filtros = document.querySelectorAll('.filtro-tag');
            const countEl = document.querySelector('.galeria-count');
            const sinResultados2 = document.querySelector('.sin-resultados');

            const posterSection = document.querySelector('.temporada-posters');
            if (posterSection && document.querySelector('#galeria-grid')) {
              const posterRows = Array.prototype.slice.call(posterSection.querySelectorAll('.row'));
              const posterCards = Array.prototype.slice.call(posterSection.querySelectorAll('.poster'));
              const posterOrderKey = 'st-galeria-poster-order-v1';
              const getPosterKey = card => `${card.dataset.season}|${card.querySelector('img')?.src || ''}`;
              const originalKeys = posterCards.map(getPosterKey);
              let savedKeys = [];

              try {
                savedKeys = JSON.parse(localStorage.getItem(posterOrderKey) || '[]');
              } catch (error) {
                savedKeys = [];
              }

              const savedOrderIsValid = savedKeys.length === originalKeys.length &&
                originalKeys.every(key => savedKeys.includes(key));

              if (!savedOrderIsValid) {
                savedKeys = originalKeys.slice();
                for (let i = savedKeys.length - 1; i > 0; i--) {
                  const randomIndex = Math.floor(Math.random() * (i + 1));
                  const temporary = savedKeys[i];
                  savedKeys[i] = savedKeys[randomIndex];
                  savedKeys[randomIndex] = temporary;
                }
                try {
                  localStorage.setItem(posterOrderKey, JSON.stringify(savedKeys));
                } catch (error) {
                }
              }

              posterCards.sort((first, second) => savedKeys.indexOf(getPosterKey(first)) - savedKeys.indexOf(getPosterKey(second)));
              const posterGrid = posterRows[0];
              if (posterGrid) {
                posterCards.forEach(card => posterGrid.appendChild(card));
                posterRows.slice(1).forEach(row => row.remove());
              }
            }

            function getFavoritos() {
                return JSON.parse(localStorage.getItem(FAVS_KEY) || '[]');
            }

            function guardarFavoritos(favs) {
                localStorage.setItem(FAVS_KEY, JSON.stringify(favs));
            }

            function pintarFavoritos() {
                const favs = getFavoritos();
                allCards.forEach(card => {
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
                if (sinResultados2 && cards.length > 0) {
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
 
  var ultimaFirmaQuiz = null;
  var ultimaClaveQuiz = null;

  form.addEventListener('submit', function(e){
    e.preventDefault();
    var respuestasActuales = Array.prototype.slice.call(
      form.querySelectorAll('input[type="radio"]:checked')
    ).map(function(input){ return input.name + '=' + input.value; }).join('|');
 
    var personajes = {
      hopper: {
        nombre: 'Jim Hopper',
        imagen: 'https://static.wikia.nocookie.net/strangerthings/images/6/68/Jim_Hopper_Season_2.png/revision/latest?cb=20190427154920&path-prefix=es',
        descripcion: 'Un protector decidido, dispuesto a investigar cualquier misterio para cuidar a su familia y a Hawkins.'
      },
      eleven: {
        nombre: 'Eleven',
        imagen: 'https://i.pinimg.com/736x/81/ee/d7/81eed76772fcf3b9524fffb8b2dc37e9.jpg',
        descripcion: 'Una persona poderosa y sensible que enfrenta cualquier amenaza para proteger a quienes quiere.'
      },
      dustin: {
        nombre: 'Dustin Henderson',
        imagen: 'https://i.pinimg.com/736x/47/f8/b6/47f8b6cbaf3d49412a03f64fd2cf5cc8.jpg',
        descripcion: 'Un estratega ingenioso y curioso que siempre busca una explicación para lo imposible.'
      },
      steve: {
        nombre: 'Steve Harrington',
        imagen: 'https://thumb.wikimedia.org/wikipedia/en/thumb/8/8b/ST3_Steve_Harrington_portrait.jpg/250px-ST3_Steve_Harrington_portrait.jpg?utm_source=en.wikipedia.org&utm_campaign=parser&utm_content=thumbnail',
        descripcion: 'Un aliado valiente y protector que termina poniéndose al frente cuando sus amigos lo necesitan.'
      },
      joyce: {
        nombre: 'Joyce Byers',
        imagen: 'https://static.wikia.nocookie.net/strangerthings/images/f/f3/Joyces5.webp/revision/latest?cb=20251129030252&path-prefix=es',
        descripcion: 'Una madre intuitiva y perseverante que nunca deja de luchar por su familia.'
      },
      will: {
        nombre: 'Will Byers',
        imagen: 'https://i.pinimg.com/1200x/f0/99/60/f0996059f55756e352d476456e41ac30.jpg',
        descripcion: 'Una persona sensible y leal, con una conexión profunda con sus amigos y con lo desconocido.'
      },
      nancy: {
        nombre: 'Nancy Wheeler',
        imagen: 'https://static.wikia.nocookie.net/strangerthings/images/7/73/Nancy_Wheeler.png/revision/latest/scale-to-width/360?cb=20160831170859&path-prefix=es',
        descripcion: 'Una investigadora decidida que busca pruebas y enfrenta la verdad sin rendirse.'
      },
      jonathan: {
        nombre: 'Jonathan Byers',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/f/f1/Jonathan_Byers.jpg/revision/latest/scale-to-width/360?cb=20200915034529',
        descripcion: 'Una persona observadora y protectora, siempre pendiente de su familia y de quienes ama.'
      },
      mike: {
        nombre: 'Mike Wheeler',
        imagen: 'https://i.pinimg.com/1200x/7a/54/80/7a5480c2c534586667418a378ae63da4.jpg',
        descripcion: 'Un líder leal que mantiene unido al grupo y confía profundamente en sus amigos.'
      },
      robin: {
        nombre: 'Robin Buckley',
        imagen: 'https://media.vogue.es/photos/5d261c302a7c500008a1f6f2/2:3/w_2560%2Cc_limit/RD24_promo_stills_022519.0050.jpg',
        descripcion: 'Una persona brillante y observadora, capaz de encontrar conexiones que otros pasan por alto.'
      },
      lucas: {
        nombre: 'Lucas Sinclair',
        imagen: 'https://static.wikia.nocookie.net/personajes-random/images/a/a6/Lucas.png/revision/latest?cb=20200917164504&path-prefix=es',
        descripcion: 'Un amigo práctico y valiente que piensa con claridad incluso en los momentos más difíciles.'
      },
      erica: {
        nombre: 'Erica Sinclair',
        imagen: 'https://static.wikia.nocookie.net/strangerthings/images/2/24/Erica_Season_3.png/revision/latest?cb=20190711205512&path-prefix=es',
        descripcion: 'Una persona ingeniosa, directa y segura de sí misma, capaz de resolver cualquier desafío.'
      },
      vecna: {
        nombre: 'Vecna',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/8/8b/Vecna_S4.jpg/revision/latest/scale-to-width/360?cb=20230819085138',
        descripcion: 'Una presencia calculadora y poderosa que convierte los miedos en su principal arma.'
      },
      billy: {
        nombre: 'Billy Hargrove',
        imagen: 'https://static.wikia.nocookie.net/strangerthings/images/9/95/Billy.png/revision/latest/scale-to-width/360?cb=20171028233931&path-prefix=es',
        descripcion: 'Una personalidad intensa y desafiante que enfrenta cada situación con orgullo y determinación.'
      },
      eddie: {
        nombre: 'Eddie Munson',
        imagen: 'https://hips.hearstapps.com/hmg-prod/images/joseph-quinn-as-eddie-munson-stranger-things-season-4-2-1653998700.jpg?crop=0.491xw:0.739xh;0.242xw,0.0185xh&resize=1200:*',
        descripcion: 'Un espíritu creativo y rebelde que protege a su grupo siendo fiel a sí mismo.'
      },
      brenner: {
        nombre: 'Dr. Brenner',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/b/be/Brenner_S1.png/revision/latest?cb=20221115135716',
        descripcion: 'Una mente fría y calculadora que busca controlar aquello que todavía no comprende.'
      },
      max: {
        nombre: 'Max Mayfield',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/2/2a/1989.png/revision/latest?cb=20260313154711',
        descripcion: 'Una persona independiente y fuerte que necesita libertad, pero también valora profundamente a su grupo.'
      },
      bob: {
        nombre: 'Bob Newby',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/d/d0/Bob_Newby_S2.png/revision/latest/thumbnail/width/360/height/360?cb=20180327083407',
        descripcion: 'Un aliado amable y resolutivo que siempre intenta encontrar una solución para ayudar.'
      },
      murray: {
        nombre: 'Murray Bauman',
        imagen: 'https://static.wikia.nocookie.net/strangerthings8338/images/d/de/Murray_Bauman.png/revision/latest?cb=20171118142040',
        descripcion: 'Un investigador honesto y desconfiado que sigue las pistas hasta las teorías más extrañas.'
      },
      holly: {
        nombre: 'Holly Wheeler',
        imagen: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOU_H7grX8g0QIUdJ82DXFYwhHGbc41EN1jSccM5D57g&s=10',
        descripcion: 'Una persona sensible y curiosa que encuentra seguridad en su familia y en quienes la acompañan.'
      }
    };

    if (respuestasActuales !== ultimaFirmaQuiz || !ultimaClaveQuiz) {
      var claves = Object.keys(personajes);
      ultimaClaveQuiz = claves[Math.floor(Math.random() * claves.length)];
      ultimaFirmaQuiz = respuestasActuales;
    }

    var claveAleatoria = ultimaClaveQuiz;
    var personaje = personajes[claveAleatoria];
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