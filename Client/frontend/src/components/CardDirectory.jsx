import { useState, useEffect } from "react";
import { CardService } from "../services/CardsService.js";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function CardDirectory() {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const formatId = (id) => {
    if (id.startsWith("PROMO")) {
      return id.slice(0, 1) + id.slice(id.indexOf("-"));
    }
    return id;
  };

  useEffect(() => {
    const fetchCards = async () => {
      const cards = await CardService.getCards();
      setCards(cards.content);
      setLoading(false);
    };

    fetchCards();
  }, []);

  const skeletonRows = Array(30).fill(null);

  return (
    <div className="justify-self-center w-3/4">
      <div className="text-xl text-muted-foreground">
        All cards available on Pokemon TCG Pocket
      </div>
      <div className="m-auto h-full justify-self-center rounded-xl border p-2">
        <Table>
          <TableCaption>
            A list of all the cards available in Pokemon TCG Pocket
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-48">Card name</TableHead>
              <TableHead className="w-32">ID</TableHead>
              <TableHead className="w-32">Card Typing</TableHead>
              <TableHead className="w-32 text-right">Type</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading
              ? skeletonRows.map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell className="w-48">
                      <div className="h-4 w-32 bg-gray-400 animate-pulse rounded" />
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="h-4 w-16 bg-gray-400 animate-pulse rounded" />
                    </TableCell>
                    <TableCell className="w-32">
                      <div className="h-4 w-16 bg-gray-400 animate-pulse rounded" />
                    </TableCell>
                    <TableCell className="w-32 text-right">
                      <div className="h-4 w-16 bg-gray-400 animate-pulse rounded ml-auto" />
                    </TableCell>
                  </TableRow>
                ))
              : cards.map((card) => (
                  <TableRow
                    key={card.id}
                    onClick={() => (window.location.href = `/cards/${card.id}`)}
                    className="cursor-pointer group"
                  >
                    <TableCell className="w-48 group-hover:text-blue-400">
                      {card.name}
                    </TableCell>
                    <TableCell className="w-32">{formatId(card.id)}</TableCell>
                    <TableCell className="w-32">
                      {card.type === "Supporter"
                        ? "Supporter - Trainer"
                        : card.type}
                    </TableCell>
                    <TableCell className="w-32 text-right">
                      {card.attribute}
                    </TableCell>
                  </TableRow>
                ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
