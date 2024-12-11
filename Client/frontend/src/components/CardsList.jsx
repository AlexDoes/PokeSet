import { useState, useEffect } from "react";
import { CardService } from "../services/CardsService.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Link } from "react-router-dom";
import { MagicCard } from "./ui/magic-card.jsx";
const rarityMap = {
  Common: 1,
  Uncommon: 2,
  Rare: 3,
  "Double Rare": 4,
  "Art Rare": 1,
  "Super Rare": 2,
  "Special Art Rare": 2,
  "Immersive Rare": 3,
  "Crown Rare": 4,
};

const typeMap = {
  Pokemon: 1,
  Trainer: 2,
  Energy: 3,
};

const attributeColors = {
  Grass: "text-green-300",
  Fire: "text-red-300",
  Water: "text-blue-300",
  Lightning: "text-yellow-300",
  Psychic: "text-purple-300",
  Fighting: "text-orange-300",
  Darkness: "text-black-300",
  Colorless: "text-gray-300",
};

const formatId = (id) => {
  if (id.startsWith("PROMO")) {
    return id.slice(0, 1) + id.slice(id.indexOf("-"));
  }
  return id;
};

const getRarityImages = (rarity) => {
  const rarityValue = rarityMap[rarity];
  if (
    rarity === "Common" ||
    rarity === "Uncommon" ||
    rarity === "Rare" ||
    rarity === "Double Rare"
  ) {
    return Array.from({ length: rarityValue }, (_, index) => (
      <img
        key={`diamond-${index}`}
        src="/card-assets/rarity-diamond.webp"
        alt={rarity}
        width="10"
        height="10"
      />
    ));
  }
  if (
    rarity === "Art Rare" ||
    rarity === "Super Rare" ||
    rarity === "Special Art Rare" ||
    rarity === "Immersive Rare"
  ) {
    return Array.from({ length: rarityValue }, (_, index) => (
      <img
        key={`star-${index}`}
        src="/card-assets/rarity-star.webp"
        alt="Star Rarity"
        width="20"
        height="20"
      />
    ));
  }
  if (rarity === "Crown Rare") {
    return Array.from({ length: rarityValue }, (_, index) => (
      <img
        key={`crown-${index}`}
        src="/card-assets/rarity-crown.webp"
        alt="Crown Rarity"
        width="20"
        height="20"
      />
    ));
  }
  if (rarity === "Promo Rare") return " Promo Rare";
};

const getAttributeImages = (attribute) => {
  if (!attribute) return "";
  if (attribute === "No Color") return "";
  attribute = attribute.toLowerCase();
  const imgsrc = "/card-assets/type-" + attribute + ".webp";
  return <img src={imgsrc} alt="Attribute" width="20" height="20" />;
};

const getDamageColor = (type) => {
  const color = attributeColors[type] || "gray";
  return "text-" + color + "-300";
};

const getRetreatImages = (retreat) => {
  return Array.from({ length: retreat }, (_, index) => (
    <img
      key={`retreat-${index}`}
      src="/card-assets/type-colorless.webp"
      alt={retreat + "cost"}
      width="20"
      height="20"
    />
  ));
};

const getAttackCosts = (cost) => {
  const energyCosts = Object.entries(cost).map(([type, count]) => (
    <div key={type} className="flex gap-1">
      {Array.from({ length: count }, (_, index) => (
        <span key={index}>{getAttributeImages(type)}</span>
      ))}
    </div>
  ));
  return <div className="flex gap-1">{energyCosts}</div>;
};

export default function CardsList() {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      const startTime = Date.now();

      try {
        const response = await CardService.getCards(page);
        setCards(response.content);
      } catch (error) {
        console.error("Error fetching cards:", error);
      } finally {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(2000 - elapsedTime, 0);

        if (process.env.NODE_ENV === "development") {
          setLoading(false);
        } else {
          setTimeout(() => setLoading(false), remainingTime);
        }
      }
    };

    fetchCards();
  }, [page]);

  return (
    <div className="w-full">
      {loading ? (
        <div className="w-full h-full justify-center flex">
          <DotLottieReact
            src="https://lottie.host/155d8ab9-7384-48ca-88a5-72fdd415563e/4Wq5eqTFyr.lottie"
            loop
            autoplay
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 xl:grid-cols-3 gap-3 text-sm p-4 2xl:text-xl">
          {cards.map((card) => (
            <MagicCard key={card.id}>
              <div
                className="border-2 rounded-xl p-2 grid grid-cols-2 items-center w-full h-full"
                key={card.id}
              >
                <div className="flex justify-center">
                  <Link to={`/cards/${card.id}`} key={card.id} className="">
                    <img
                      src={`/card-assets/${card.id.toLowerCase()}.webp`}
                      loading="lazy"
                      style={{
                        width: "100%",
                        maxWidth: "367px",
                        maxHeight: "512px",
                        height: "100%",
                        border: "0px solid white",
                      }}
                    />
                  </Link>
                </div>
                <div className="flex flex-col gap-1 p-3">
                  <div className="flex justify-between">
                    <div>{card.name}</div>
                    <div className="text-red-300">{formatId(card.id)}</div>
                  </div>

                  <div>HP: {card.hp}</div>
                  <div className="flex gap-1">
                    <div>{card.type}</div>
                    <div>{card.stage}</div>
                  </div>
                  <div className="flex gap-2">
                    Rarity:
                    {getRarityImages(card.rarity)}
                  </div>
                  <div className="flex gap-2">
                    Type: {card.attribute}
                    {getAttributeImages(card.attribute)}
                  </div>
                  <div className="flex gap-2">
                    Weakness: {card.weakness}
                    {getAttributeImages(card.weakness)}
                  </div>
                  <div className="flex gap-2">
                    Retreat:
                    {getRetreatImages(card.retreat)}
                  </div>
                  {/* {card.description && <div>Description: {card.description}</div>} */}
                  <div>
                    <div> {card.attacks.length ? "Attacks:" : "Ability"}</div>

                    <ul className="p-4 bg-slate-600 rounded-xl">
                      {card.attacks.length === 0 && (
                        <li className="text-sm">{card.description}</li>
                      )}
                      {card.attacks.map((attack) => (
                        <li key={attack.name} className="">
                          <div className="flex w-full flex-col gap-1">
                            <div className="flex w-full justify-between font-semibold text-xs">
                              {attack.name}
                              <div
                                className={`${
                                  attributeColors[card.attribute] || "gray"
                                }`}
                              >
                                {attack.damage
                                  ? "(" + attack.damage + ")"
                                  : null}
                              </div>
                            </div>
                            {getAttackCosts(attack.cost.types)}
                            <div className="text-xs">
                              {/* {attack.description && attack.description} */}
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </MagicCard>
          ))}
        </div>
      )}
    </div>
  );
}
