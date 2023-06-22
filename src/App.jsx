import { useEffect, useState } from "react";

import { CardGame } from "./components/CardGame";
import { Loading } from "./components/Loading";
import { ContainerCard } from "./components/ContainerCard";

import axios from "axios";
import { Main } from "./components/Main";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { FilterSearch } from "./components/FilterSearch";
import { FilterGenre } from "./components/FilterGenre";
import { Footer } from "./components/Footer";

function App() {
  const [games, setGames] = useState(null);

  const [filteredItems, setFilteredItems] = useState(null);

  const [genre, setGenre] = useState([]);

  useEffect(() => {
    axios
      .get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
        headers: { "dev-email-address": "lacerdagui42@gmail.com" },
      })
      .then((res) => {
        setGames(res?.data);

        setFilteredItems(res?.data);

        setGenre([...new Set(res?.data?.map((item) => item.genre))]);
      });
  }, []);

  const handleNameSelect = (name) => {
    if (name) {
      const filtered = games.filter((game) => game?.genre === name);
      setFilteredItems(filtered);
    }

    if (name === "Todos") {
      setFilteredItems(games);
    }
  };

  const searchInput = (name) => {
    const gameFilter = games?.filter((game) =>
      game?.title?.toLowerCase()?.includes(name?.toLowerCase())
    );
    setFilteredItems(gameFilter);
  };

  return (
    <>
      <Header />

      <Main>
        <Filter>
          <FilterSearch onSearchInput={searchInput} />
          <FilterGenre genre={genre} onGenreSelected={handleNameSelect} />
        </Filter>

        {games ? (
          <ContainerCard>
            {filteredItems ? (
              filteredItems.map((games, index) => (
                <CardGame
                  key={index}
                  title={games?.title}
                  image={games?.thumbnail}
                  description={games?.short_description}
                  genre={games?.genre}
                  platform={games?.platform}
                  link={games?.game_url}
                />
              ))
            ) : (
              <p style={{ color: "white" }}>Nenhum jogo encontrado</p>
            )}
          </ContainerCard>
        ) : (
          <Loading />
        )}
      </Main>

      <Footer />
    </>
  );
}

export default App;
