import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAKPyzEu0KinBGDvIduxZbYnnnJj4rAl-4",
  authDomain: "polaganje-quiz.firebaseapp.com",
  projectId: "polaganje-quiz",
  storageBucket: "polaganje-quiz.appspot.com",
  messagingSenderId: "120126101593",
  appId: "1:120126101593:web:f5cc5e8486fc9534be3948",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
