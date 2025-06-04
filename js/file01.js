"use strict";

(function() {
  const mensaje = "¡Bienvenido!";
  alert(mensaje);
  console.log(mensaje);
})();

const showToast = () => {
    const toast = document.getElementById("toast-interactive");
    if (toast) {
        toast.classList.add("md:block");
    }
};

const showVideo = () => {
  const demoElement = document.getElementById("demo");

  if (demoElement) {
    demoElement.addEventListener("click", () => {
      window.open("https://www.youtube.com/watch?v=dQw4w9WgXcQ", "_blank");
    });
  }
};

(() => {
    showToast();
    showVideo();
})();