import "./styles.css";

export function CardGame({ title, image, description, genre, platform, link }) {
  const handleClick = () => {
    window.open(link, "_blank");
  };

  return (
    <div className="card" onClick={() => handleClick()}>
      <img src={image} />
      <h2>{title}</h2>
      <p>{description}</p>
      <p>{genre}</p>
      <p>{platform}</p>
    </div>
  );
}
