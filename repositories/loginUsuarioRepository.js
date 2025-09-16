import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase.js';

export const login = async (dados) => {
  try {
    const credencial = await signInWithEmailAndPassword(auth, dados.email, dados.senha);
    return credencial.user.uid;
  } 
  catch(err) {
    return err.code;
  }
};