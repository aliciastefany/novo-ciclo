import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from '../config/firebase.js';

export const emailRedefinirSenha = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return { sucess: true };
  } 
  catch(err) {
    return { sucess: false, erro: err.code };
  }
};