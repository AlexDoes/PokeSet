import { useState, useEffect } from "react";
import { CardService } from "../services/CardsService.js";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "react-router-dom";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { ChevronRight, ChevronLeft } from "lucide-react";
import * as CARDS from "@/lib/cards";
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
        src="/cards/rarity-diamond.webp"
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
        src="/cards/rarity-star.webp"
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
        src="/cards/rarity-crown.webp"
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
  const imgsrc = "/cards/type-" + attribute + ".webp";
  return <img src={imgsrc} alt="Attribute" width="20" height="20" />;
};

const getRetreatImages = (retreat) => {
  if (!retreat) return "No Retreat Cost";
  return Array.from({ length: retreat }, (_, index) => (
    <img
      key={`retreat-${index}`}
      src="/cards/type-colorless.webp"
      alt={retreat + "cost"}
      width="20"
      height="20"
    />
  ));
};

const getAttackCosts = (types) => {
  if (!types) return null;
  const energyCosts = Object.entries(types).map(([type, count]) => (
    <div key={type} className="flex gap-1">
      {Array.from({ length: count }, (_, index) => (
        <span key={index}>{getAttributeImages(type)}</span>
      ))}
    </div>
  ));
  return <div className="flex gap-1">{energyCosts}</div>;
};

export default function CardDetail() {
  const id = useParams().id;
  const [card, setCard] = useState({});
  const [loading, setLoading] = useState(true);

  const getNextCard = (id) => {
    let [set, number] = id.split("-");
    number = parseInt(number);
    console.log(set, number);
    if (number < 226 && set === "A1") {
      number++;
    } else if (number < 24 && set === "PROMO") {
      number++;
    } else if (number === 24 && set === "PROMO") {
      set = "A1";
      number = 1;
    } else {
      number = 1;
      set = "PROMO";
    }
    return `${set}-${String(number).padStart(3, "0")}`;
  };

  const getPrevCard = (id) => {
    let [set, number] = id.split("-");
    number = parseInt(number);
    if (number > 1 && set === "A1") {
      number--;
    } else if (number > 1 && set === "PROMO") {
      number--;
    } else if (number === 1 && set === "A1") {
      set = "PROMO";
      number = 24;
    } else {
      number = 226;
      set = "A1";
    }
    return `${set}-${String(number).padStart(3, "0")}`;
  };

  useEffect(() => {
    const fetchCard = async () => {
      const cardDetails = await CardService.getCard(id.toUpperCase());
      setTimeout(() => {
        setCard(cardDetails);
        setLoading(false);
      }, 0);
    };
    fetchCard();
  }, [id]);

  const TableRowContent = ({
    label,
    content,
    skeletonWidth = "w-full",
    index,
  }) => (
    <TableRow
      className={`h-10 border-b border-x ${
        index % 2 === 0 ? "bg-background" : "bg-muted hover:bg-background"
      } ${index === 10 ? "" : ""}`}
    >
      <TableCell
        className={`w-32 font-medium border-r ${
          index % 2 === 0
            ? "border-muted hover:border-background"
            : "border-background hover:border-muted"
        }`}
      >
        {label}
      </TableCell>
      <TableCell className="p-3">
        {loading ? <Skeleton className={`${skeletonWidth} h-6`} /> : content}
      </TableCell>
    </TableRow>
  );

  const AttackContent = () => {
    if (loading) return <Skeleton className="w-full h-32" />;

    return (
      <div>
        <ul className="p-4 bg-slate-600 rounded-xl">
          {(!card?.attacks || card.attacks.length === 0) && (
            <li className="text-sm">{card?.description}</li>
          )}
          {card?.attacks?.map((attack) => (
            <li key={attack.name} className="mb-2 last:mb-0">
              <div className="flex w-full flex-col gap-1">
                <div className="flex w-full justify-between font-semibold">
                  {attack.name}
                  <div
                    className={
                      attributeColors[card.attribute] || "text-gray-300"
                    }
                  >
                    {attack.damage ? `(${attack.damage})` : null}
                  </div>
                </div>
                {getAttackCosts(attack.cost?.types)}
                <div className="text-xs">{attack.description}</div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  const nextAndPrevContent = () => {
    const cardsList = CARDS.default.reduce((acc, card) => {
      acc[card.id] = card;
      return acc;
    }, {});
    console.log(cardsList["A1-001"]);
    const next = getNextCard(id);
    const prev = getPrevCard(id);
    return (
      <div className="flex justify-between items-center">
        {id !== "A1-001" ? (
          <a
            className="flex gap-2 group hover:text-blue-500 items-center pr-2 border-r-2"
            href={`/cards/${prev}`}
          >
            <div>
              <ChevronLeft></ChevronLeft>
            </div>
            <div className="flex flex-col text-muted-foreground group-hover:text-blue-500 ">
              <div>{prev}</div>
              <div> {cardsList[prev].name} </div>
            </div>
          </a>
        ) : (
          <div></div>
        )}
        <a
          className="flex gap-2 hover:text-blue-500 items-center group border-l-2 pl-2"
          href={`/cards/${next}`}
        >
          <div className="flex flex-col text-muted-foreground group-hover:text-blue-500">
            <div>{next}</div>
            <div> {cardsList[next].name} </div>
          </div>
          <div>
            <ChevronRight />
          </div>
        </a>
      </div>
    );
  };

  const formatHp = (hp) => {
    if (hp === "0") return "-";
    return hp;
  };

  return (
    <div className="w-full h-[calc(100vh-48px)]">
      <div className="flex h-full">
        <img
          src={`/cards/${id.toLowerCase()}.webp`}
          loading="lazy"
          alt="Card"
          className="max-w-[600px] max-h-[500px]"
        />
        <div className="w-full h-full">
          <Table className="border-foreground rounded-lg">
            <TableBody>
              <TableRowContent label="Name" content={card?.name} index={0} />
              <TableRowContent label="ID" content={card?.id} index={1} />
              <TableRowContent
                label="HP"
                content={formatHp(card?.hp)}
                index={2}
              />
              <TableRowContent label="Type" content={card?.type} index={3} />
              <TableRowContent label="Stage" content={card?.stage} index={4} />
              <TableRowContent
                label="Rarity"
                content={
                  <div className="flex gap-2">
                    {card && getRarityImages(card.rarity)}
                  </div>
                }
                index={5}
              />
              <TableRowContent
                label="Attribute"
                content={
                  <div className="flex gap-2 items-center">
                    {card?.attribute}
                    {card && getAttributeImages(card.attribute)}
                  </div>
                }
                index={6}
              />
              <TableRowContent
                label="Weakness"
                content={
                  <div className="flex gap-2 items-center">
                    {card?.weakness || "No Weakness"}
                    {card && getAttributeImages(card.weakness)}
                  </div>
                }
                index={7}
              />
              <TableRowContent
                label="Retreat"
                content={
                  <div className="flex gap-2">
                    {card && getRetreatImages(card.retreat)}
                  </div>
                }
                index={8}
              />
              <TableRowContent
                label="Attacks"
                content={<AttackContent />}
                index={9}
              />
              <TableRowContent
                label=""
                content={nextAndPrevContent()}
                index={10}
                className="rounded-b-lg"
              />
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
}
