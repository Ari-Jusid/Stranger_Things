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