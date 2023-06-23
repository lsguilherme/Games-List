import "./styles.css";
import { FaChrome, FaWindows } from "react-icons/fa";

export function CardGame({ title, image, genre, platform, link }) {
  const handleClick = () => {
    window.open(link, "_blank");
  };

  const platforms = platform.split(", ");

  return (
    <div className="card" onClick={() => handleClick()}>
      <div className="game-container">
        <img className="game-image" src={image} />
      </div>
      <div className="game-content">
        <h2 className="game-title">{title}</h2>
        <h3 className="game-genre">{genre}</h3>
        <ul className="platform-list">
          {platforms.includes("PC (Windows)") && (
            <li>
              <FaWindows />
            </li>
          )}
          {platforms.includes("Web Browser") && (
            <li>
              <FaChrome />
            </li>
          )}
        </ul>
      </div>
    </div>
  );
}
