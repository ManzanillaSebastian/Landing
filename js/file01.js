"use strict";

/**
 * Muestra una notificación en pantalla agregando la clase 'md:block'
 * al elemento con el ID 'toast-interactive', si existe.
 * @returns {void}
 */
const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

/**
 * Agrega un evento click al elemento con el ID 'demo' que,
 * al hacer clic, abre un video de YouTube en una nueva pestaña.
 * @returns {void}
 */
const showVideo = () => {
    const demo = document.getElementById("demo");
    if (demo) {
        demo.addEventListener("click", () => {
            window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
        });
    }
};

(function() {
    showToast();
    showVideo();
})();