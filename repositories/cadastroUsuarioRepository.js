import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";

export const cadastrarUsuarioRepository = async (dados) => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
    return credencial.user.uid;
  } 
  catch(err) {
    return err.code;
  }
};