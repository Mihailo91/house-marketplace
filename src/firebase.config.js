import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBxrXcAdx9BvRwPPXXiC6JuzG8ORvJm1FU",
  authDomain: "house-marketplace-830b3.firebaseapp.com",
  projectId: "house-marketplace-830b3",
  storageBucket: "house-marketplace-830b3.appspot.com",
  messagingSenderId: "740520293209",
  appId: "1:740520293209:web:f96482d64eea5e9c7e1248",
  measurementId: "G-ZNREJRMHQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const db = getFirestore()