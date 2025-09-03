import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { signInWithEmailAndPassword } from "firebase/auth";
import { app } from '../config/firebase.js';

export const login = async (dados) => {
  try {
    const credencial = await signInWithEmailAndPassword(auth, dados.email, dados.senha);
    return credencial.user.uid;
  } 
  catch(err) {
    return err.code;
  }
};