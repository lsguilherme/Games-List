import "./styles.css";

export function Filter({ children }) {
  return (
    <div className="filter-container">
      <h1>Catalógo de Jogos</h1>
      {children}
    </div>
  );
}
