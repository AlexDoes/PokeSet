import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { useState, useRef } from "react";
import * as CARDS from "@/lib/cards.json";
import { useNavigate } from "react-router-dom";

export default function SearchBar({ commands = CARDS.default }) {
  const [value, setValue] = useState("");
  const [isSelecting, setIsSelecting] = useState(false);
  const navigate = useNavigate();

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
      navigate(`/cards/${firstCommand.id}`);
      setValue("");
    }
  };

  const handleItemClick = (cardId) => {
    setIsSelecting(true);
    navigate(`/cards/${cardId}`);
    setValue("");
  };

  const handleBlur = () => {
    // Only clear if we're not in the middle of selecting an item
    setTimeout(() => {
      if (!isSelecting) {
        setValue("");
      }
      setIsSelecting(false);
    }, 200);
  };

  return (
    <div className="relative w-1/2 items-center z-50">
      <Command className="rounded-lg border shadow-md w-full justify-center z-50">
        <CommandInput
          value={value}
          onValueChange={setValue}
          onKeyDown={handleKeyDown}
          placeholder="Search for a card like Pikachu or Charizard"
          className="w-full"
          onBlur={handleBlur}
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
                  className="bg-background z-50"
                  onSelect={() => handleItemClick(command.id)}
                >
                  <div className="flex flex-col w-full hover:bg-primary-foreground hover:text-primary-background z-50">
                    <p className="font-semibold">{command.name}</p>
                    <div className="flex w-full justify-between z-50">
                      <div>
                        {command.id}
                        <p className="font-extralight">{command.type} Card</p>
                      </div>
                      <p className="text-muted-foreground rounded-sm justify-self-end">
                        Set: {command.set}
                      </p>
                    </div>
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
