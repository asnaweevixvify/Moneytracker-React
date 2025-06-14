import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs , addDoc , deleteDoc ,doc} from 'firebase/firestore/lite';
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyAQj74RZ5X4rrgy2QSsiBkmuJk5JJ6FwBs",
  authDomain: "moneytracker-e0ec1.firebaseapp.com",
  projectId: "moneytracker-e0ec1",
  storageBucket: "moneytracker-e0ec1.firebasestorage.app",
  messagingSenderId: "897462511741",
  appId: "1:897462511741:web:77f7b53bb533ad45b22914",
  measurementId: "G-X9XSJ806T4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);