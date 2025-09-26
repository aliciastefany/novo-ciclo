import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../config/firebase.js';
import { setDoc, doc } from "firebase/firestore";

export const cadastrarMercadoRepository = async (dados, senha) => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, dados.email, senha);
    await setDoc(doc(db, 'mercados', credencial.user.uid), dados);
    return { sucess: true, id: credencial.user.uid };
  } 
  catch(err) {
    console.log(err);
    return { sucess: false, erro: err.code };
  }
};