import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAbISTx_rV-sLEvP-XZ33HYAQPXpiz2nSA",
  authDomain: "ghibli-app-7cbc4.firebaseapp.com",
  projectId: "ghibli-app-7cbc4",
  storageBucket: "ghibli-app-7cbc4.firebasestorage.app",
  messagingSenderId: "514172994606",
  appId: "1:514172994606:web:fb2951431fa0e3f24f8bbf",
  measurementId: "G-HFE7QTQ4XP"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;