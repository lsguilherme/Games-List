import "./styles.css";
import { FaChrome, FaWindows } from "react-icons/fa";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import {
  arrayRemove,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getFirestore,
  updateDoc,
} from "firebase/firestore";

export function CardGame({ title, image, genre, platform, link, id }) {
  const [liked, setLiked] = useState(false);
  const [favorites, setFavorites] = useState([]);

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

        const favorites = userData.favorites;
        const isLiked = favorites.includes(id);

        setFavorites(favorites);
        setLiked(isLiked);
      }
    };
    fetchData();
  }, [liked]);

  async function updateFavorites() {
    const userRef = doc(firestore, `users/${uid}`);
    const isFavorite = favorites.includes(id);

    const updateData = isFavorite
      ? { favorites: arrayRemove(id) }
      : { favorites: arrayUnion(id) };

    await updateDoc(userRef, updateData);

    setLiked(!liked);
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
        </div>
      </div>
    </div>
  );
}
