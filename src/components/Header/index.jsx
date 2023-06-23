import "./styles.css";
import { FaGamepad } from "react-icons/fa";

export function Header() {
  const handleIconClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  return (
    <header className="header-container">
      <div onClick={handleIconClick}>
        <FaGamepad />
        <p>Game List</p>
      </div>
    </header>
  );
}
