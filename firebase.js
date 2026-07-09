import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-analytics.js";

const firebaseConfig = {
    apiKey: "AIzaSyBuH4-Ydh2j4OAQaQSPrqO56PqHTfs-w-U",
    authDomain: "damaso-b5d5a.firebaseapp.com",
    projectId: "damaso-b5d5a",
    storageBucket: "damaso-b5d5a.firebasestorage.app",
    messagingSenderId: "514653959267",
    appId: "1:514653959267:web:c8a31b702d8f14f2957456",
    measurementId: "G-2J1ERD5NCB"
};

const app = initializeApp(firebaseConfig);

let analytics;
try {
    analytics = getAnalytics(app);
} catch (e) {
    console.warn("Firebase Analytics no se pudo inicializar:", e);
}

export { app, analytics };
