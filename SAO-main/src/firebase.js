// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, OAuthProvider } from 'firebase/auth';
import { getFirestore, collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmqnoxXYTlQk7GrjNzYwENAW0BwXOqToI",
  authDomain: "sao-project-2e539.firebaseapp.com",
  databaseURL: "https://sao-project-2e539-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "sao-project-2e539",
  storageBucket: "sao-project-2e539.appspot.com",
  messagingSenderId: "1091357628984",
  appId: "1:1091357628984:web:5e2b8c355bbc68212de4cd",
  measurementId: "G-N3MBPEECNC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

const storage = getStorage(app);


const auth = getAuth();
export { auth, db, OAuthProvider, collection, addDoc, storage, ref, uploadBytes, getDownloadURL, doc, getDoc };

