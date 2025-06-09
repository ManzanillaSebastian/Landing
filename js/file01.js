"use strict";

import { fetchFakerData } from "./functions.js";

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

/**
 * Renderiza hasta tres tarjetas con los datos recibidos en el contenedor 'skeleton-container'.
 * @param {Array} items - Arreglo de objetos con las claves title, author, genre y content.
 */
const renderCards = (items) => {
    const container = document.getElementById("skeleton-container");
    if (!container) return;

    container.innerHTML = ""; // Limpiar contenido previo

    items.slice(0, 3).forEach(({ title, author, genre, content }) => {
        const card = `
            <div class="bg-white rounded-lg shadow-md p-6 mb-4 dark:bg-gray-800">
                <h2 class="text-xl font-bold text-gray-900 dark:text-white mb-2">${title}</h2>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-1">Autor: ${author}</p>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">Género: ${genre}</p>
                <p class="text-gray-700 dark:text-gray-300">${content}</p>
            </div>
        `;
        container.innerHTML += card;
    });
};

const loadData = async () => {
    const url = 'https://fakerapi.it/api/v2/texts?_quantity=10&_characters=120';

    try {
        const result = await fetchFakerData(url);

        if (result.success) {
            console.log('Datos obtenidos con éxito:', result.body);
            // Llamar a renderCards con los datos recibidos
            renderCards(result.body.data);
        } else {
            console.error('Error al obtener los datos:', result.error);
        }

    } catch (error) {
        console.error('Ocurrió un error inesperado:', error);
    }
};

(function() {
    showToast();
    showVideo();
    loadData();
})();