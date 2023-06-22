import "./styles.css";

export function FilterSearch({ onSearchInput }) {
  const onSearch = (ev) => {
    const query = ev.target.value;
    onSearchInput(query);
  };
  return (
    <input
      className="game-search"
      type="search"
      placeholder="Buscar jogo..."
      onChange={onSearch}
    />
  );
}
