import { auth } from "../config/firebase";
import {
  createUserWithEmailAndPassword,
  AuthErrorCodes,
  signInWithEmailAndPassword,
} from "firebase/auth";

function errosFirebase(error) {
  let mensagem = "";

  switch (error.code) {
    case AuthErrorCodes.EMAIL_EXISTS:
      mensagem = "Esse email já esta em uso.";
      break;

    case AuthErrorCodes.INVALID_EMAIL:
      mensagem = "Preencha um email valído.";
      break;

    case AuthErrorCodes.WEAK_PASSWORD:
      mensagem = "Sua senha precisa de no mínimo 6 caracteres.";
      break;

    default:
      mensagem = "sucesso";
      break;
  }
  return mensagem;
}

export async function cadastrar(email, senha) {
  const resultado = await createUserWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario);
      return "sucesso";
    })
    .catch((error) => {
      return errosFirebase(error);
    });

  return resultado;
}

export async function logar(email, senha) {
  const resultado = await signInWithEmailAndPassword(auth, email, senha)
    .then((dadosDoUsuario) => {
      console.log(dadosDoUsuario);
      return "sucesso";
    })
    .catch((error) => {
      return "erro";
    });

  return resultado;
}
