import { useContext, useEffect, useState } from "react";

import { CardGame } from "./../../components/CardGame";
import { Loading } from "./../../components/Loading";
import { ContainerCard } from "./../../components/ContainerCard";

import axios from "axios";
import { Main } from "./../../components/Main";
import { Header } from "./../../components/Header";
import { Filter } from "./../../components/Filter";
import { FilterSearch } from "./../../components/FilterSearch";
import { FilterGenre } from "./../../components/FilterGenre";
import { Footer } from "./../../components/Footer";
import { EmptyGame } from "./../../components/EmptyGame";
import { ErrorMessage } from "./../../components/ErrorMessage";

function Home() {
  const [games, setGames] = useState([]);
  const [filteredItems, setFilteredItems] = useState(null);
  const [genre, setGenre] = useState([]);
  const [error, setError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [selectedGenre, setSelectedGenre] = useState("");

  useEffect(() => {
    axios
      .get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
        headers: { "dev-email-address": "teste@gmail.com" },
        timeout: 5000,
      })
      .then((res) => {
        setGames(res?.data);

        setFilteredItems(res?.data);

        setGenre([...new Set(res?.data?.map((item) => item.genre))]);
      })
      .catch((err) => {
        if (err.code === "ECONNABORTED") {
          setError("slowServer");
          setErrorMessage(
            "O servidor demorou para responder, tente mais tarde."
          );
        } else if (
          [500, 502, 503, 504, 507, 508, 509].includes(err.response?.status)
        ) {
          setError("internalError");
          setErrorMessage(
            "O servidor falhou em responder, tente recarregar a página."
          );
        } else {
          setError("otherError");
          setErrorMessage(
            "O servidor não conseguiu responder por agora, tente voltar novamente mais tarde."
          );
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  const handleNameSelect = (name) => {
    if (name) {
      const filtered = games.filter((game) => game?.genre === name);
      setFilteredItems(filtered);
      setSelectedGenre(name);
    }

    if (name === "Todos") {
      setSelectedGenre(name);
      setFilteredItems(games);
    }
  };

  const searchInput = (name) => {
    const gameFilter = games?.filter((game) =>
      game?.title?.toLowerCase()?.includes(name?.toLowerCase())
    );
    setFilteredItems(gameFilter);
    setSelectedGenre("DEFAULT");
  };

  return (
    <>
      <Header />

      <Main>
        <Filter>
          <FilterSearch onSearchInput={searchInput} />
          <FilterGenre
            genre={genre}
            onGenreSelected={handleNameSelect}
            selectedGenre={selectedGenre}
          />
        </Filter>
        {error === "internalError" && (
          <ErrorMessage errorMessage={errorMessage} />
        )}

        {error === "slowServer" && <ErrorMessage errorMessage={errorMessage} />}

        {error === "otherError" && <ErrorMessage errorMessage={errorMessage} />}

        {!error && !isLoading && games && (
          <ContainerCard>
            {filteredItems.length > 0 ? (
              filteredItems.map((games, index) => (
                <CardGame
                  key={index}
                  title={games?.title}
                  image={games?.thumbnail}
                  description={games?.short_description}
                  genre={games?.genre}
                  platform={games?.platform}
                  link={games?.game_url}
                  id={games?.id}
                />
              ))
            ) : (
              <EmptyGame />
            )}
          </ContainerCard>
        )}

        {isLoading && <Loading />}
      </Main>

      <Footer />
    </>
  );
}

export default Home;
