import { createUserWithEmailAndPassword } from "firebase/auth";

export const cadastrarUsuario = async (dados, email, senha) => {
  try {
    const credencial = await createUserWithEmailAndPassword(auth, email, senha);
    return credencial.user.uid;
  } catch (err) {
    return err.code;
  }
};