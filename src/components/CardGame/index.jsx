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

export function CardGame({ title, image, genre, platform, link, id }) {
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [rating, setRating] = useState([]);
  const [rated, setRated] = useState(null);

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
  }, [uid, id]);

  async function updateFavorites() {
    const userRef = doc(firestore, `users/${uid}`);
    const isFavorite = favorites.includes(id);

    const updateData = isFavorite
      ? { favorites: arrayRemove(id) }
      : { favorites: arrayUnion(id) };

    await updateDoc(userRef, updateData);
  }

  async function updateRating(newRating) {
    const userRef = doc(firestore, `users/${uid}`);
    const updatedRating = { ...rating, [id]: newRating };

    await updateDoc(userRef, { rating: updatedRating });
    setRated(newRating);
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

        <div className="fav">
          {uid ? (
            <div className={`heart-icon${liked ? "-liked" : ""}`}>
              {liked ? (
                <AiFillHeart onClick={updateFavorites} />
              ) : (
                <AiOutlineHeart onClick={updateFavorites} />
              )}
            </div>
          ) : (
            <Link to="/auth" style={{ color: "white" }}>
              <AiOutlineHeart />
            </Link>
          )}

          {uid && (
            <div>
              <AiFillStar
                onClick={() => updateRating(1)}
                style={{ color: rated >= 1 ? "yellow" : "gray" }}
              />
              <AiFillStar
                onClick={() => updateRating(2)}
                style={{ color: rated >= 2 ? "yellow" : "gray" }}
              />
              <AiFillStar
                onClick={() => updateRating(3)}
                style={{ color: rated >= 3 ? "yellow" : "gray" }}
              />
              <AiFillStar
                onClick={() => updateRating(4)}
                style={{ color: rated >= 4 ? "yellow" : "gray" }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
