import React from "react";
import { AppSidebar } from "@/components/App-Sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import SearchBar from "@/components/Searchbar";
import * as CARDS from "@/lib/cards.json";

const MainLayout = ({ children }) => {
  return (
    <SidebarProvider>
      <AppSidebar className="" />
      <main className="w-full">
        <div className="w-full border-b sticky top-0 bg-background z-10">
          <div className="flex justify-between">
            <SidebarTrigger className="h-[48px] rounded-r-md px-2" />
            <SearchBar />
          </div>
        </div>
        {children}
      </main>
    </SidebarProvider>
  );
};

export default MainLayout;
