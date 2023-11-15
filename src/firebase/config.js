// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";

import { getAuth } from "firebase/auth";

import { getFirestore } from "firebase/firestore/lite";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyByO8FsQJgeEPKSdMPpFmdo297jpKbqjZ4",

  authDomain: "react-curso-7e13c.firebaseapp.com",

  projectId: "react-curso-7e13c",

  storageBucket: "react-curso-7e13c.appspot.com",

  messagingSenderId: "875584060659",

  appId: "1:875584060659:web:48bcc9494be713cca70b86",
};

// Initialize Firebase

export const FirebaseApp = initializeApp(firebaseConfig);

export const FirebaseAuth = getAuth(FirebaseApp);

export const FirebaseDB = getFirestore(FirebaseApp);
