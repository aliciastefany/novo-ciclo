import { setDoc, doc } from 'firebase/firestore';
import { signInWithEmailAndPassword } from "firebase/auth";

export const login = async (dados) => {
  try {
    const credencial = await signInWithEmailAndPassword(auth, dados.email, dados.senha);
    return credencial.user.uid;
  } 
  catch(err) {
    return err.code;
  }
};