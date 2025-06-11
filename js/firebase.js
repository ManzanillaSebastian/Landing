// Importa las funciones necesarias desde el CDN de Firebase v11.9.1
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getDatabase, ref, set, push, get, child } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-database.js";

// Configuración de Firebase usando variables de entorno de Vite
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Inicializa la aplicación de Firebase
const app = initializeApp(firebaseConfig);

// Obtiene la referencia a la base de datos en tiempo real
const database = getDatabase(app);

/**
 * Guarda un voto en la base de datos en tiempo real de Firebase.
 * @param {string} productID - El ID del producto votado.
 * @returns {Promise<{success: boolean, message: string}>}
 */
export function saveVote(productID) {
  // Referencia a la colección 'votes'
  const votesRef = ref(database, 'votes');
  // Crea una nueva referencia única para el voto
  const newVoteRef = push(votesRef);
  // Datos a guardar
  const voteData = {
    productID: productID,
    date: new Date().toISOString()
  };
  // Guarda los datos y maneja la promesa
  return set(newVoteRef, voteData)
    .then(() => ({
      success: true,
      message: 'Voto guardado correctamente.'
    }))
    .catch((error) => ({
      success: false,
      message: `Error al guardar el voto: ${error.message}`
    }));
}

/**
 * Obtiene todos los votos de la base de datos en tiempo real de Firebase.
 * @returns {Promise<Object|null>} - Un objeto con los votos o null si no hay datos.
 */
export async function getVotes() {
  const votesRef = ref(database, 'votes');
  try {
    const snapshot = await get(votesRef);
    if (snapshot.exists()) {
      return snapshot.val();
    } else {
      return null;
    }
  } catch (error) {
    throw new Error(`Error al obtener los votos: ${error.message}`);
  }
}