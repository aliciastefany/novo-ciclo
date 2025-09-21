import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase.js';

export const loginUsuarioRepository = async (email, senha) => {
  try {
    const credencial = await signInWithEmailAndPassword(auth, email, senha);
    return { sucess: true, id: credencial.user.uid };
  } 
  catch(err) {
    return {sucess: false, erro: err.code };
  }
};