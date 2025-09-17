import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase.js';
import { setDoc, doc } from "firebase/firestore";

export const cadastrarUsuarioRepository = async (dados, senha) => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, dados.email, senha);
    await setDoc(doc(db, 'usuario', credencial.user.uid), dados);
    return credencial.user.uid;
  } 
  catch(err) {
    return err.code;
  }
};