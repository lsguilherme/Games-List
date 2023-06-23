import "./styles.css";

export function ErrorMessage({ errorMessage }) {
  return <p className="alert-message">{errorMessage}</p>;
}
