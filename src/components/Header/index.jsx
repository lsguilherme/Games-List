import { useContext } from "react";
import "./styles.css";
import { FaGamepad } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";

export function Header() {
  const { uid } = useContext(AuthContext);
  const handleIconClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="header-container">
      <div className="empty" />
      <div onClick={handleIconClick}>
        <FaGamepad />
        <p>Game List</p>
      </div>
      {!uid ? (
        <a className="container-button-login" href="/auth">
          Login
        </a>
      ) : (
        <div className="empty" />
      )}
    </header>
  );
}
