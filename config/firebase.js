import { initializeApp } from 'firebase/app';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyByZmAg5LeV06euziI6xksVym-HjiSSfWA",
  authDomain: "novo-ciclo-be537.firebaseapp.com",
  projectId: "novo-ciclo-be537",
  storageBucket: "novo-ciclo-be537.firebasestorage.app",
  messagingSenderId: "713869019399",
  appId: "1:713869019399:web:7267be8b2bba12b0581da2"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export default db;