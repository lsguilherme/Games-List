import "./styles.css";
import { FaChrome, FaWindows } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart, AiFillStar } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";
import { toast } from "react-toastify";

export function CardGame({ title, image, genre, platform, link, id }) {
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState([]);
  const [rated, setRated] = useState(null);
  const [hover, setHover] = useState(null);

  const { uid } = useContext(AuthContext);
  const firestore = getFirestore();

  const handleClick = () => {
    window.open(link, "_blank");
  };

  useEffect(() => {
    const fetchData = async () => {
      if (uid) {
        const userRef = doc(firestore, `users/${uid}`);
        const userDoc = await getDoc(userRef);

        const userData = userDoc.data();
        const { favorites, rating } = userData;

        const isLiked = favorites.includes(id);
        const valueRating = rating[id];

        setRated(valueRating);

        setFavorites(favorites);
        setRating(rating);
        setLiked(isLiked);
      }
    };
    fetchData();
  }, [rated, favorites]);

  async function updateFavorites() {
    const userRef = doc(firestore, `users/${uid}`);
    const isFavorite = favorites.includes(id);

    const updateData = isFavorite
      ? { favorites: arrayRemove(id) }
      : { favorites: arrayUnion(id) };

    await updateDoc(userRef, updateData)
      .then(() => {
        toast.success("Favoritado com sucesso!", {
          autoClose: 1500,
        });
      })
      .catch(() => {
        toast.error("Erro ao favoritar.", {
          autoClose: 1500,
        });
      });
  }

  async function updateRating(newRating) {
    const userRef = doc(firestore, `users/${uid}`);
    const updatedRating = { ...rating, [id]: newRating };

    await updateDoc(userRef, { rating: updatedRating })
      .then(() => {
        setRated(newRating);
        toast.success("Avaliação realizada!", {
          autoClose: 1500,
        });
      })
      .catch(() => {
        toast.error("Erro ao avaliar", {
          autoClose: 1500,
        });
      });
  }

  const platforms = platform.split(", ");

  return (
    <div className="card">
      <div className="game-container" onClick={() => handleClick()}>
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

        <div className="container-avaliation">
          <div className="fav">
            {uid ? (
              <div className={`heart-icon${liked ? "-liked" : ""}`}>
                {liked ? (
                  <AiFillHeart onClick={updateFavorites} size={20} />
                ) : (
                  <AiFillHeart
                    onClick={updateFavorites}
                    size={20}
                    color="grey"
                  />
                )}
              </div>
            ) : (
              <Link to="/auth" style={{ color: "white" }}>
                <AiFillHeart color="grey" />
              </Link>
            )}
          </div>

          {uid ? (
            <div className="rating">
              {[...Array(4)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <AiFillStar
                    key={index}
                    className="star"
                    size={20}
                    color={ratingValue <= (hover || rated) ? "#ffcb0c" : "grey"}
                    onClick={() => updateRating(ratingValue)}
                    onMouseEnter={() => setHover(ratingValue)}
                    onMouseLeave={() => setHover(null)}
                  />
                );
              })}
            </div>
          ) : (
            <Link to="/auth">
              {[...Array(4)].map((_, index) => {
                return <AiFillStar key={index} size={20} color="grey" />;
              })}
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
