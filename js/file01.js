"use strict";

import { fetchFakerData } from "./functions.js";

import { saveVote, getVotes } from "./firebase.js";

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

/**
 * Habilita el formulario de votación y gestiona el envío.
 * @returns {void}
 */
const enableForm = () => {
    const form = document.getElementById('form_voting');
    if (!form) return;

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        const select = document.getElementById('select_product');
        if (!select) return;

        const productID = select.value;

        if (productID) {

            await saveVote(productID);

        }

        form.reset();

        await displayVotes();
    });
};

/**
 * Muestra una tabla con el total de votos por producto.
 * @returns {Promise<void>}
 */
const displayVotes = async () => {
    const votes = await getVotes();
    if (!votes) return;

    // Contar votos por producto
    const voteCounts = {};
    Object.values(votes).forEach(vote => {
        const product = vote.productID;
        if (!voteCounts[product]) {
            voteCounts[product] = 0;
        }
        voteCounts[product] += 1;
    });

    // Crear tabla
    let tableHTML = `
        <table class="min-w-full bg-white dark:bg-gray-800 rounded shadow mt-6">
            <thead>
                <tr>
                    <th class="py-2 px-4 border-b text-left">Producto</th>
                    <th class="py-2 px-4 border-b text-left">Total de votos</th>
                </tr>
            </thead>
            <tbody>
    `;

    Object.entries(voteCounts).forEach(([product, count]) => {
        tableHTML += `
            <tr>
                <td class="py-2 px-4 border-b">${product}</td>
                <td class="py-2 px-4 border-b">${count}</td>
            </tr>
        `;
    });

    tableHTML += `
            </tbody>
        </table>
    `;

    // Mostrar la tabla en el contenedor con id="results"
    let container = document.getElementById("results");
    if (!container) {
        container = document.createElement("div");
        container.id = "results";
        document.body.appendChild(container);
    }
    container.innerHTML = tableHTML;
};

/**
 * Habilita el formulario de votación y gestiona el envío.
 * @returns {void}
 */

(function() {
    showToast();
    showVideo();
    loadData();
    enableForm();
    displayVotes();
})();