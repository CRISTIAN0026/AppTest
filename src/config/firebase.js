import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNy5oIkJIfFuYAaVtXH1sABnip8gbka9c",
  authDomain: "app-tets001.firebaseapp.com",
  projectId: "app-tets001",
  storageBucket: "app-tets001.firebasestorage.app",
  messagingSenderId: "538881240044",
  appId: "1:538881240044:web:481b5634ad2bd170dfeec9",
  measurementId: "G-KGKKNMJVEL",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
