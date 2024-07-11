// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBBMHhdh9ZpjInDuQgFztK1f9LYWee84fs",
  authDomain: "financely-project-7e1fc.firebaseapp.com",
  projectId: "financely-project-7e1fc",
  storageBucket: "financely-project-7e1fc.appspot.com",
  messagingSenderId: "306813506849",
  appId: "1:306813506849:web:f729792f6b08ddb70d9a60",
  measurementId: "G-CG1DWXGTT7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { db,auth, provider,doc, setDoc};