import React, { useContext, useState } from "react";

import { AuthContext } from "../../context/AuthContext";
import "./Auth.css";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup
    .string()
    .email("Digite um endereço de email válido")
    .required("O email é obrigatório"),
  senha: yup
    .string()
    .min(6, "A senha deve ter pelo menos 6 caracteres")
    .required("A senha é obrigatória"),
});

export default function Auth() {
  const [variant, setVariant] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const { handleSignIn, handleSignUp, errorMessage, error, setError } =
    useContext(AuthContext);

  const onSubmit = async (data, e) => {
    e.preventDefault();

    const email = data.email;
    const senha = data.senha;

    if (variant) {
      await handleSignUp(email, senha);
    }

    if (!variant) {
      await handleSignIn(email, senha);
    }
  };

  const changeVariant = async () => {
    setError(false);
    reset();
    setVariant(!variant);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit(onSubmit)}>
        <h2 className="title-form">{variant ? "Cadastro" : "Login"}</h2>
        <div className="container-input-form">
          {error &&
            (errorMessage !== "Email inválido!" ||
              errorMessage !== "Email já cadastrado!") && (
              <p className="error-message">{errorMessage}</p>
            )}
          <label
            className={`label-form${
              errors.email ||
              errorMessage === "Email inválido!" ||
              errorMessage === "Email já cadastrado!"
                ? "-error"
                : ""
            }`}
            htmlFor="email"
          >
            Email
          </label>
          <input
            className={`input-form${
              errors.email ||
              errorMessage === "Email inválido!" ||
              errorMessage === "Email já cadastrado!"
                ? "-error"
                : ""
            }`}
            autoComplete="off"
            placeholder="Email"
            type="text"
            name="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          {errorMessage === "Email inválido!" ||
            (errorMessage === "Email já cadastrado!" && (
              <p className="error-message">{errorMessage}</p>
            ))}
        </div>

        <div className="container-input-form">
          <label
            className={`label-form${errors.senha ? "-error" : ""}`}
            htmlFor="senha"
          >
            Senha
          </label>
          <input
            className={`input-form${errors.senha ? "-error" : ""}`}
            placeholder="Senha"
            type="password"
            id="senha"
            name="senha"
            {...register("senha")}
          />

          {errors.senha && (
            <p className="error-message">{errors.senha.message}</p>
          )}
        </div>

        {variant ? (
          <input className="button-form" type="submit" value="Cadastrar" />
        ) : (
          <input className="button-form" type="submit" value="Login" />
        )}
        <div className="change-register">
          {variant ? (
            <a onClick={changeVariant}>Já possuo conta</a>
          ) : (
            <a onClick={changeVariant}>Cadastre-se</a>
          )}
        </div>
      </form>
    </div>
  );
}
