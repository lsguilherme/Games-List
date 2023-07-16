import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [uid, setUID] = useState("");
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const firestore = getFirestore();

  const handleSignIn = async (email, senha) => {
    await signInWithEmailAndPassword(auth, email, senha)
      .then((userCredential) => {
        const userUID = userCredential.user.uid;

        setUID(userUID);
        navigate("/");
      })
      .catch((error) => {
        if (
          error.code === "auth/wrong-password" ||
          error.code === "auth/user-not-found" ||
          error.code === "auth/invalid-email"
        ) {
          toast.error("Email ou senha incorreto!");
        } else if (error.code === "auth/too-many-requests") {
          toast.error("Você errou muitas vezes, tente novamente mais tarde!");
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
        setError(true);
      });
  };

  const handleSignUp = async (email, senha) => {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        setError(false);
        toast.success("Usuário cadastrado com sucesso!");
        const userUID = userCredential.user.uid;

        const userRef = collection(firestore, "users");
        const cadastroUid = doc(userRef, userUID);

        await setDoc(cadastroUid, { favorites: [], rating: [] });
      })
      .catch((error) => {
        if (error.code === "auth/email-already-in-use") {
          toast.error("Email já cadastrado!");
        } else if (error.code === "auth/invalid-email") {
          toast.error("Email inválido!");
        } else {
          toast.error("Erro no servidor, tente novamente mais tarde!");
        }
        setError(true);
      });
  };

  const currentValue = {
    uid,
    handleSignIn,
    handleSignUp,
    error,
    setError,
  };

  return (
    <AuthContext.Provider value={currentValue}>{children}</AuthContext.Provider>
  );
}
