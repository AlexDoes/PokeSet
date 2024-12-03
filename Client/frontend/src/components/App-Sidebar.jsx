import {
  Calendar,
  FileQuestion,
  Home,
  Inbox,
  ListMinus,
  Search,
  Settings,
  WalletCards,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { QuestionMarkCircledIcon } from "@radix-ui/react-icons";

const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Cards Gallery",
    url: "/cards",
    icon: WalletCards,
  },
  {
    title: "Card List",
    url: "/cardslist",
    icon: ListMinus,
  },
  {
    title: "Random Card",
    url: `/cards/A1-${String(Math.floor(Math.random() * 226)).padStart(
      3,
      "0"
    )}`,
    icon: FileQuestion,
  },
  {
    title: "About",
    url: "/about",
    icon: QuestionMarkCircledIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="z-20">
      <SidebarContent className="">
        <SidebarGroup className="">
          <a href="/">
            <SidebarGroupLabel className="text-yellow-200 text-2xl my-auto border-yellow-100 gap-1 off mb-2 w-full">
              PokéSet
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 20">
                <circle
                  cx="11"
                  cy="11"
                  r="10"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                />

                <path
                  d="M11 1 A10 10 0 0 1 21 11 H1 A10 10 0 0 1 11 1"
                  fill="#FF0000"
                />

                <path
                  d="M11 21 A10 10 0 0 1 1 11 H21 A10 10 0 0 1 11 21"
                  fill="white"
                />

                <circle
                  cx="11"
                  cy="11"
                  r="3"
                  fill="none"
                  stroke="black"
                  strokeWidth="1"
                />

                <circle cx="11" cy="11" r="2" fill="white" />

                <line
                  x1="1"
                  y1="11"
                  x2="21"
                  y2="11"
                  stroke="black"
                  strokeWidth="1"
                />
              </svg>
            </SidebarGroupLabel>
          </a>
          <SidebarGroupContent className="border-t">
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url} className="text-muted-foreground">
                      <item.icon strokeWidth={0.75} />
                      <span className="font-base text-muted-foreground">
                        {item.title}
                      </span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
