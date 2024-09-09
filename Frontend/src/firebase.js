// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API,
  authDomain: "fringale-food.firebaseapp.com",
  projectId: "fringale-food",
  storageBucket: "fringale-food.appspot.com",
  messagingSenderId: "1039470835715",
  appId: "1:1039470835715:web:9143dba7df191d47153636",
  measurementId: "G-ME69TKR3R7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);