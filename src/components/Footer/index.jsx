import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import "./styles.css";

export function Footer() {
  return (
    <footer className="footer-container">
      <div className="social-container">
        <a
          href="https://github.com/lsguilherme"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaGithub />
        </a>
        <a
          href="https://www.linkedin.com/in/guilherme-lacerda-498996210/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <FaLinkedin />
        </a>
      </div>
    </footer>
  );
}
