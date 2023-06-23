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
  const [slowServer, setSlowServer] = useState(false);
  const [internalError, setInternalError] = useState(false);

  useEffect(() => {
    axios
      .get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
        headers: { "dev-email-address": "lacerdagui42@gmail.com" },
        timeout: 5000,
      })
      .then((res) => {
        setGames(res?.data);

        setFilteredItems(res?.data);

        setGenre([...new Set(res?.data?.map((item) => item.genre))]);
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          setSlowServer(true);
        }

        if (
          [500, 502, 503, 504, 507, 508, 509].includes(err.response?.status)
        ) {
          setInternalError(true);
        }
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
        {!slowServer && internalError && (
          <p style={{ color: "red" }}>
            O servidor fahou em responder, tente recarregar a página
          </p>
        )}

        {!internalError && slowServer && (
          <p style={{ color: "red" }}>
            O servidor demorou para responder, tente mais tarde.
          </p>
        )}

        {!internalError && !slowServer && games && (
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
        )}

        {!internalError && !slowServer && !games && <Loading />}
      </Main>

      <Footer />
    </>
  );
}

export default App;
