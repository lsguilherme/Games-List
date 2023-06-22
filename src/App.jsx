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
  const [games, setGames] = useState([]);
  const [genre, setGenre] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  useEffect(() => {
    axios
      .get("https://games-test-api-81e9fb0d564a.herokuapp.com/api/data/", {
        headers: { "dev-email-address": "lacerdagui42@gmail.com" },
      })
      .then((res) => {
        setGames(res?.data);

        setGenre([...new Set(res?.data?.map((item) => item.genre))]);
      });
  }, []);

  const handleNameSelect = (name) => {
    const filtered = games.filter((item) => item?.genre === name);
    setFilteredItems(filtered);
  };

  return (
    <>
      <Header />

      <Main>
        <Filter>
          <FilterSearch />
          <FilterGenre genre={genre} onGenreSelected={handleNameSelect} />
        </Filter>

        {games ? (
          <ContainerCard>
            {/* {filteredItems.map((games) => (
              <CardGame
                title={games?.title}
                image={games?.thumbnail}
                description={games?.short_description}
                genre={games?.genre}
                platform={games?.platform}
                link={games?.game_url}
              />
            ))} */}
            {games.map((games) => (
              <CardGame
                title={games?.title}
                image={games?.thumbnail}
                description={games?.short_description}
                genre={games?.genre}
                platform={games?.platform}
                link={games?.game_url}
              />
            ))}
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
