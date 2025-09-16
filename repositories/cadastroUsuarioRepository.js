import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/firebase.js';

export const cadastrarUsuarioRepository = async (dados, senha) => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, dados.email, senha);
    return credencial;
  } 
  catch(err) {
    return err.code;
  }
};