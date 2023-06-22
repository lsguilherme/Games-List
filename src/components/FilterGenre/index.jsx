import { useState } from "react";
import "./styles.css";

export function FilterGenre({ genre, onGenreSelected }) {
  const [selectedGenre, setSelectedGenre] = useState("Gênero");

  const handleSelectedGenre = (event) => {
    setSelectedGenre(event.target.value);
    onGenreSelected(event.target.value);
  };
  return (
    <select
      className="select-genre"
      value={selectedGenre}
      onChange={handleSelectedGenre}
      defaultValue={"DEFAULT"}
    >
      <option selected disabled value="DEFAULT">
        Gênero
      </option>
      {genre.map((name, index) => (
        <option key={index}>{name}</option>
      ))}
    </select>
  );
}
