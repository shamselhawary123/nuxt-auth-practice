// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQlukHexfrzYSlwMys9LRM6p-mx6TgKeQ",
  authDomain: "nuxt-auth-397c6.firebaseapp.com",
  projectId: "nuxt-auth-397c6",
  storageBucket: "nuxt-auth-397c6.firebasestorage.app",
  messagingSenderId: "819013656224",
  appId: "1:819013656224:web:4285f25ecd4d01711a73c5",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
