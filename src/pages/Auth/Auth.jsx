import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [register, setRegister] = useState(false);

  const { handleSignIn, handleSignUp, errorMessage, error, setError } =
    useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (register) {
      await handleSignUp(email, senha);
    }

    if (!register) {
      await handleSignIn(email, senha);
    }
  };

  const changeVariant = async () => {
    setEmail("");
    setSenha("");
    setError(false);
    setRegister(!register);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 className="title-form">{register ? "Cadastro" : "Login"}</h2>
        <div className="container-input-form">
          {error && <p className="error-message">{errorMessage}</p>}
          <label className="label-form" htmlFor="email">
            Email
          </label>
          <input
            className="input-form"
            autoComplete="off"
            placeholder="Email"
            type="email"
            name="email"
            value={email}
            onChange={(e) => [setEmail(e.target.value), setError(false)]}
            required
          />
        </div>

        <div className="container-input-form">
          <label className="label-form" htmlFor="senha">
            Senha
          </label>
          <input
            className="input-form"
            placeholder="Senha"
            type="password"
            id="senha"
            name="senha"
            value={senha}
            onChange={(e) => [setSenha(e.target.value), setError(false)]}
            required
          />
        </div>

        {register ? (
          <input
            className="button-form"
            type="submit"
            value="Cadastrar"
            onClick={handleSubmit}
          />
        ) : (
          <input
            className="button-form"
            type="submit"
            value="Login"
            onClick={handleSubmit}
          />
        )}
        <div className="change-register">
          {register ? (
            <a onClick={changeVariant}>Já possuo conta</a>
          ) : (
            <a onClick={changeVariant}>Cadastre-se</a>
          )}
        </div>
      </form>
    </div>
  );
}
