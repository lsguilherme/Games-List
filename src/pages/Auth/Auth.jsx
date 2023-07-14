import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Auth() {
  const [email, setEmail] = useState("teste@gmail.com");
  const [senha, setSenha] = useState("12345678");
  const [register, setRegister] = useState(false);

  const navigate = useNavigate();

  const { uid, handleSignIn, handleSignUp } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      await handleSignUp(email, senha);
    }

    if (!register) {
      await handleSignIn(email, senha);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1>{register ? "Cadastro" : "Login"}</h1>
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

      {register ? (
        <p onClick={() => setRegister(!register)}>Já possuo conta</p>
      ) : (
        <p onClick={() => setRegister(!register)}>Fazer cadastro</p>
      )}
      <br />
      <br />

      {register ? (
        <input type="submit" value="Cadastrar" onClick={handleSubmit} />
      ) : (
        <input type="submit" value="Login" onClick={handleSubmit} />
      )}
    </form>
  );
}
