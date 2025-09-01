import { setDoc, doc } from 'firebase/firestore';
import { db } from '../config/firebase.js';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from '../config/auth.js';

export const cadastrarUsuarioRepository = async (dados) => {
    try {
        const idUsuario = await createUserWithEmailAndPassword(auth, dados.email, dados.senha);
        await setDoc(doc(db, 'usuario', idUsuario.user.uid), dados);
        return idUsuario.user.uid;
    } catch(err) {
        return err.code;
    }
}