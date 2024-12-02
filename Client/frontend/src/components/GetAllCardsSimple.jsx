import { CardService } from "../services/CardsService.js";
import { useState, useEffect } from "react";

export const GetAllCardsSimple = () => {
  const [cards, setCards] = useState([]);
  useEffect(() => {
    const fetchCards = async () => {
      const cards = await CardService.getCards();
      const filteredCards = cards.content.map((card) => ({
        id: card.id,
        name: card.name,
        type: card.type === "Pokemon" ? "Pokémon" : card.type,
        set: card.id.split("-")[0],
      }));
      setCards(filteredCards);
    };

    fetchCards();
  }, []);

  return cards.map((card) => (
    <div key={card.id}>
      <pre>
        <code>{JSON.stringify(card, null)},</code>
      </pre>
    </div>
  ));
};
