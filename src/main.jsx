import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { getAuth } from "firebase/auth";
import "./index.css";

// Import the functions you need from the SDKs you need
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDItCiG3NlbM1pXYH-pl9xImepoiwaJ4WU",
  authDomain: "rajashop-dcfc9.firebaseapp.com",
  projectId: "rajashop-dcfc9",
  storageBucket: "rajashop-dcfc9.appspot.com",
  messagingSenderId: "694433443060",
  appId: "1:694433443060:web:b3e1c6945b476549c902a1",
  measurementId: "G-35343FZPL5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
