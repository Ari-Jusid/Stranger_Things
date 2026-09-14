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
                btn.addEventListener('click', () => {
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

            filtros.forEach(tag => {
                tag.addEventListener('click', () => {
                    filtros.forEach(t => t.classList.remove('active'));
                    tag.classList.add('active');
                    aplicarFiltro(tag.dataset.filter);
                });
            });

            pintarFavoritos();
            aplicarFiltro('todas');