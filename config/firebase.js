import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDuvZUpNneZ3kAZr0nf_ntEltdy-s0RzSA",
  authDomain: "novo-ciclo-103dc.firebaseapp.com",
  projectId: "novo-ciclo-103dc",
  storageBucket: "novo-ciclo-103dc.firebasestorage.app",
  messagingSenderId: "1086539769581",
  appId: "1:1086539769581:web:5df914b16d401147c30ee4",
  storageBucket: 'gs://novo-ciclo-103dc.firebasestorage.app'
};

const app = initializeApp(firebaseConfig);
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});
const db = getFirestore(app);
const storage = getStorage(app);

export { db, auth, storage };