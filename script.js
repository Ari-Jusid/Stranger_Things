const hero = document.querySelector(".hero");
const light = document.querySelector(".cursor-light");
const trail = document.querySelector(".cursor-trail");

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

// Estela — más cerca del punto
trailX += (mouseX - trailX) * 0.10;
trailY += (mouseY - trailY) * 0.10;

    light.style.left = `${lightX}px`;
    light.style.top = `${lightY}px`;

    trail.style.left = `${trailX}px`;
    trail.style.top = `${trailY}px`;

    requestAnimationFrame(animate);
}

animate();