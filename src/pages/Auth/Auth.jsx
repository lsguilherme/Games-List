import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  setDoc,
} from "firebase/firestore";

export default function Auth() {
  const [email, setEmail] = useState("teste@gmail.com");
  const [senha, setSenha] = useState("12345678");

  const navigate = useNavigate();

  const { uid, handleSignIn } = useContext(AuthContext);

  const firestore = getFirestore();

  /* useEffect(() => {
    if (uid) {
      navigate("/register");
    }
  }, [uid]); */

  // levar essa função para o cadastro de usuário
  async function cadastroFirebase() {
    // cadastro do usuario
    const usuarioRef = collection(firestore, "users");
    const cadastroUid = doc(usuarioRef, uid);

    await setDoc(cadastroUid, {});

    // cadastro da subcollection
    const usuarioRef2 = collection(firestore, `users/${uid}/games`);
    await setDoc(doc(usuarioRef2, "teste"), {
      teste: "teste",
    });

    /* 
      usuarioRef2 - caminho que será adicionado
      "teste" - id que será adicionado no doc(passar o id do game)
    */
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleSignIn(email, senha);
    await cadastroFirebase();
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="email">Email:</label>
      <input
        type="email"
        id="email"
        name="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <br />
      <br />

      <label htmlFor="senha">Senha:</label>
      <input
        type="password"
        id="senha"
        name="senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        required
      />
      <br />
      <br />

      <input type="submit" value="Enviar" onClick={handleSubmit} />
    </form>
  );
}
