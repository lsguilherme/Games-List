import "./styles.css";
import { FaGamepad } from "react-icons/fa";

export function Header() {
  return (
    <header className="header-container">
      <FaGamepad />
      <p>Game List</p>
    </header>
  );
}
