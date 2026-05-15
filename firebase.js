import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyC4SRh7GKB8KkDYao6aw0S1JnLzNOjRcY0",
  authDomain: "damaso-978c9.firebaseapp.com",
  projectId: "damaso-978c9",
  storageBucket: "damaso-978c9.firebasestorage.app",
  messagingSenderId: "545014965592",
  appId: "1:545014965592:web:58aec27da0472c6ace712d",
  measurementId: "G-GGC2PTKLS8"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { app };