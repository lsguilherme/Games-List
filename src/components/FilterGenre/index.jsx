import { useState } from "react";
import "./styles.css";

export function FilterGenre({ genre, onGenreSelected, selectedGenre }) {
  const handleSelectedGenre = (event) => {
    onGenreSelected(event.target.value);
  };

  return (
    <div>
      <select
        className="select-genre"
        value={selectedGenre}
        onChange={handleSelectedGenre}
      >
        <option hidden value="DEFAULT">
          Gênero
        </option>
        <option>Todos</option>
        {genre.map((name, index) => (
          <option value={name} key={index}>
            {name}
          </option>
        ))}
      </select>
    </div>
  );
}
