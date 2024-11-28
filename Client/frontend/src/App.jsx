import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    fetch("https://api.pokemontcg.io/v2/cards", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((data) => {
        setCards(data.data);
      })
      .catch((error) => console.error(error));
  }, []);

  return (
    <>
      <img
        src="https://www.pokemon-zone.com/assets/uploads/2024/09/promo-a-14-lapras.webp"
        className="App-logo"
        alt="logo"
      />
      <img
        src="https://static.dotgg.gg/pokepocket/card/A1-001.webp"
        className="App-logo"
        alt="logo"
      />
      <div className="flex flex-wrap w-full justify-center">
        {cards.length > 0 ? (
          cards.map((card) => (
            <div className="border-2 border-red-300">
              <div key={card.id}>
                <p>{card.name}</p>
                <img src={card?.images?.small} alt={card?.name} />
              </div>
            </div>
          ))
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </>
  );
}

export default App;
