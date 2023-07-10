import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [uid, setUID] = useState();

  const handleSignIn = async (email, senha) => {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userUID = userCredential.user.uid;
        setUID(userUID);
        console.log("entrar na conta ", userUID);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("erro ao autenticar: " + errorCode);
      });
  };

  const handleSignUp = async (email, senha) => {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userUID = userCredential.user.uid;

        console.log("cadastrar conta ", userUID);
      })
      .catch((error) => {
        const errorCode = error.code;
        console.log("erro ao autenticar: " + errorCode);
      });
  };

  const currentValue = { uid, handleSignIn, handleSignUp };

  return (
    <AuthContext.Provider value={currentValue}>{children}</AuthContext.Provider>
  );
}
