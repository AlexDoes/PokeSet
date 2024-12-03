import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState } from "react";
import * as CARDS from "@/lib/cards.json";

export default function SearchBar({ commands = CARDS.default }) {
  const [value, setValue] = useState("");

  const filteredCommands = value
    ? commands
        .filter((command) =>
          command.name.toLowerCase().includes(value.toLowerCase())
        )
        .slice(0, 10)
    : [];

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && filteredCommands.length > 0) {
      const firstCommand = filteredCommands[0];
      window.location.href = `/cards/${firstCommand.id}`;
    }
  };

  return (
    <div className="relative w-1/2 items-center">
      <Command className="rounded-lg border shadow-md w-full justify-center">
        <CommandInput
          value={value}
          onValueChange={setValue}
          onKeyDown={handleKeyDown}
          placeholder="Search for a card like Pikachu or Charizard"
          className="w-full"
        />
        <div className="absolute top-full left-0 right-0 mt-1 z-50">
          <CommandList>
            {value && filteredCommands.length === 0 ? (
              <></>
            ) : value ? (
              filteredCommands.map((command) => (
                <CommandItem
                  key={command.id}
                  value={command.name}
                  className="bg-background"
                >
                  <div className="flex flex-col w-full hover:bg-primary-foreground hover:text-primary-background  ">
                    <a href={`/cards/${command.id}`}>
                      <p className="font-semibold">{command.name}</p>
                      <div className="flex w-full justify-between">
                        <p>
                          {command.id}
                          <p className="font-extralight">{command.type} Card</p>
                        </p>
                        <p className="text-muted-foreground rounded-sm justify-self-end">
                          Set: {command.set}
                        </p>
                      </div>
                    </a>
                  </div>
                </CommandItem>
              ))
            ) : null}
          </CommandList>
        </div>
      </Command>
    </div>
  );
}
