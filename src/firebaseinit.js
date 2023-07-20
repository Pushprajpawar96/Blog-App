// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBi5m-VZFEDsdRuJnaV5x3BGI5S2FqM_S8",
  authDomain: "blooging-app.firebaseapp.com",
  projectId: "blooging-app",
  storageBucket: "blooging-app.appspot.com",
  messagingSenderId: "392217220066",
  appId: "1:392217220066:web:754863ba89104185b71fbb"
};



const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const db = getFirestore(app);





