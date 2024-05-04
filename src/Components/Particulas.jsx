import React, { useEffect } from 'react';
import "../Css/Particulas.css";

const Particulas = () => {

    useEffect(() => {
        const particleCount = 100; // Número de partículas
        const particles = document.querySelector(".particles");

        // Crear partículas
        for (let i = 0; i < particleCount; i++) {
            createParticle();
        }

        // Crear una nueva partícula
        function createParticle() {
            const particle = document.createElement("div");
            particle.className = "particle";
            particles.appendChild(particle);

            // Posicionar la partícula de manera aleatoria
            const size = Math.random() * 5 + 1; // Tamaño de la partícula
            const x = Math.random() * window.innerWidth;
            const y = Math.random() * window.innerHeight;
            const duration = Math.random() * 3 + 2; // Duración de la animación

            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.left = x + "px";
            particle.style.top = y + "px";
            particle.style.animationDuration = duration + "s";
        }

        // Actualizar posición de las partículas cuando se mueva el cursor
        const moveParticles = function (e) {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            const allParticles = document.querySelectorAll(".particle");

            allParticles.forEach(function (particle) {
                const particleX = particle.getBoundingClientRect().left + particle.offsetWidth / 2;
                const particleY = particle.getBoundingClientRect().top + particle.offsetHeight / 2;

                const deltaX = mouseX - particleX;
                const deltaY = mouseY - particleY;

                const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

                // Mover la partícula lejos del cursor si está muy cerca
                if (distance < 100) {
                    const newX = particleX - deltaX / distance * 100;
                    const newY = particleY - deltaY / distance * 100;
                    particle.style.left = newX - particle.offsetWidth / 2 + "px";
                    particle.style.top = newY - particle.offsetHeight / 2 + "px";
                }
            });
        };

        document.addEventListener("mousemove", moveParticles);

        // Cleanup
        return () => {
            document.removeEventListener("mousemove", moveParticles);
        };
    }, []); // Ejecutar solo una vez al montar el componente

    return (
        <div className="particles">
        </div>
    );
}

export default Particulas;
