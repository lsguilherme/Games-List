import { useContext } from "react";
import "./styles.css";
import { FaGamepad } from "react-icons/fa";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";

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
        <Link className="container-button-login" to="/auth">
          Login
        </Link>
      ) : (
        <div className="empty" />
      )}
    </header>
  );
}
