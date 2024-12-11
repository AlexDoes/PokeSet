import React from "react";
import { columns } from "./columns";
import { DataTable } from "./data-table";
import * as CARDS from "@/lib/cards.json";
import { CardService } from "@/services/CardsService";

async function getData() {
  const cards = await CardService.getCards();
  return cards.content;
}

export default function CardDirectory() {
  const data = getData();

  return <DataTable columns={columns} data={data} />;
}
