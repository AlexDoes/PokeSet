"use client";
import * as React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
export type Card = {
  id: string;
  name: string;
  type: string;
  attribute?: string;
  set: string;
  rarity?: string;
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

// {
//     "id": "A1-001",
//     "name": "Bulbasaur",
//     "evolvesFrom": null,
//     "hp": "70",
//     "type": "Pokemon",
//     "stage": "Basic",
//     "weakness": "Fire",
//     "retreat": 1,
//     "illustrator": "Narumi Sato",
//     "rarity": "Common",
//     "attribute": "Grass",
//     "description": null
// }

const formatID = (id: string) => {
  const [set, number] = id.split("-");
  if (set === "PROMO") {
    return `P-${number}`;
  }
  return `${set}-${number}`;
};

export const columns: ColumnDef<Card>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return <div>{formatID(row.original.id)}</div>;
    },
  },
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Card Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div>
          {row.original.type === "Supporter"
            ? "Supporter - Trainer"
            : row.original.type}
        </div>
      );
    },
  },
  {
    accessorKey: "attribute",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Type
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div
          className={`text-sm font-sem-bold ${
            attributeColors[row.original.attribute]
          }`}
        >
          {row.original.attribute}
        </div>
      );
    },
  },
  {
    accessorKey: "id",
    id: "set",
    header: ({ column }) => {
      return (
        <div
          className="flex items-center"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Set
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div key={`SET`}>
          {row.original.id.split("-")[0] === "A1"
            ? "Genetic Apex"
            : row.original.id.split("-")[0]}
        </div>
      );
    },
  },
];
