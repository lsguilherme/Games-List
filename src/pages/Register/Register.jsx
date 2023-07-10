import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  setDoc,
  updateDoc,
} from "firebase/firestore";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [data, setData] = useState();

  const firestore = getFirestore();

  const { uid, handleSignUp } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    handleSignUp(email, senha);
  };

  // mover isso para tela home
  const usuarioRef = collection(firestore, `users/${uid}/games`);
  useEffect(() => {
    async function pegarDados() {
      const userData = await getDocs(usuarioRef);
      setData(userData.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    }
    pegarDados();
  }, []);

  // mover isso para tela home
  async function editarDados() {
    let itemId = "ID_DO_ITEM_1";
    await updateDoc(doc(usuarioRef, itemId), {
      favorito: false,
    });
  }

  /* 
    - Mover para tela de cadastro
    - Passar todos os itens da API de jogos (Home) para context
    - Consumir no registro de usuário, cadastrando apenas se não existir o doc
  */
  const listaItens = { itemId: "ID_DO_ITEM_1", favorito: true, nota: 5 };
  async function adicionarDados() {
    await setDoc(doc(usuarioRef, listaItens?.itemId), {
      favorito: listaItens.favorito,
      nota: listaItens.nota,
    });
  }

  return (
    <form /* onSubmit={handleSubmit} */>
      <h1>{uid}</h1>
      <label htmlFor="email">Email:</label>
      <input
        // type="email"
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

      {data.map((item) => (
        <>
          <h3>{item?.nota}</h3>
        </>
      ))}
      <input type="submit" value="Enviar" onClick={adicionarDados} />
      <input type="submit" value="Editar" onClick={editarDados} />
    </form>
  );
}
