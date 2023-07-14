import { createContext, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../config/firebase";
import { collection, doc, getFirestore, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export default function AuthProvider({ children }) {
  const [uid, setUID] = useState("");

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
        const errorCode = error.code;
        console.log("erro ao autenticar: " + errorCode);
      });
  };

  const handleSignUp = async (email, senha) => {
    await createUserWithEmailAndPassword(auth, email, senha)
      .then(async (userCredential) => {
        const userUID = userCredential.user.uid;

        const userRef = collection(firestore, "users");
        const cadastroUid = doc(userRef, userUID);

        await setDoc(cadastroUid, { favorites: [], rating: [] });
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
