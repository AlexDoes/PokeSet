import {
  BellIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  InputIcon,
  RowsIcon,
  GitHubLogoIcon,
  LinkedInLogoIcon,
  MagicWandIcon,
  Link2Icon,
  ListBulletIcon,
  ImageIcon,
  EnvelopeClosedIcon,
} from "@radix-ui/react-icons";

import { BentoCard, BentoGrid } from "@/components/ui/bento-grid";

const features = [
  {
    Icon: FileTextIcon,
    name: "Up to date Pokémon TCG Pocket Content",
    description: "Keep up to date with Pokémon TCG Pocket.",
    href: "/",
    cta: "Visit feature",
    background: (
      <img
        className="absolute top-20 opacity-40"
        src="bento/cardHome.png
    "
      />
    ),
    className: "lg:row-start-1 lg:row-end-4 lg:col-start-2 lg:col-end-3",
  },
  {
    Icon: InputIcon,
    name: "Search for Pokémon cards on Pokémon TCG Pocket",
    description: "Search through all the latest cards in one place.",
    // href: "/",
    cta: "Use the search bar in the top right",
    background: (
      <img
        className="absolute -right-20 -top-10 opacity-60"
        src="bento/cardSearch.png"
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3",
  },
  {
    Icon: Link2Icon,
    name: "Detailed card information",
    description: "Displays 300+ card details and stats.",
    href: `/cards/A1-057`,
    cta: "Visit feature",
    background: (
      <img
        className="absolute -right-20 -top-0 opacity-20"
        src="bento/cardDetails.png
    "
      />
    ),
    className: "lg:col-start-1 lg:col-end-2 lg:row-start-3 lg:row-end-4",
  },
  {
    Icon: ListBulletIcon,
    name: "Compact directory",
    description: "View cards in a compact directory.",
    href: "/cardslist",
    cta: "Visit feature",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="bento/cardDirectory.png"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-1 lg:row-end-2",
  },
  {
    Icon: ImageIcon,
    name: "Card Gallery",
    description:
      "View cards in a gallery with details in a centralized location.",
    href: "/cards",
    cta: "Visit feature",
    background: (
      <img
        className="absolute -right-20 -top-20 opacity-60"
        src="bento/cardGallery.png"
      />
    ),
    className: "lg:col-start-3 lg:col-end-3 lg:row-start-2 lg:row-end-4",
  },
];

export default function About() {
  return (
    <div className="w-full  h-[calc(100vh-50px)] bg-gradient-to-b from-background via-transparent to-gray-700 flex flex-col px-2">
      <BentoGrid className="lg:grid-rows-3 ">
        {features.map((feature) => (
          <BentoCard
            className="backdrop-blur-md"
            key={feature.name}
            {...feature}
          />
        ))}
      </BentoGrid>
      <br />
      <h5 className=" text-muted-foreground bottom-0"> Created by Alex Wong</h5>
      <div className="flex-row flex  w-full items-center align-bottom ">
        <div className="flex flex-col gap-1 flex-grow w-full">
          <a
            href="https://github.com/AlexDoes"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 flex gap-1 items-center"
          >
            <GitHubLogoIcon /> Github @AlexDoes
          </a>
          <a
            href="https://www.linkedin.com/in/alwong191/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 flex gap-1 items-center"
          >
            <LinkedInLogoIcon /> LinkedIn @alwong191
          </a>
        </div>
        <div className="flex flex-col gap-1 w-full">
          <a
            href="https://alexswe.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 flex gap-1 items-center"
          >
            <MagicWandIcon /> Portfolio @alexSWE
          </a>
          <a
            href="mailto:alexswong191@gmail.com?subject=[PokéSet] Hello"
            target="_blank"
            rel="noopener noreferrer"
            className="text-muted-foreground hover:text-blue-500 flex gap-1 items-center"
          >
            <EnvelopeClosedIcon /> Email @alexswong191@gmail.com
          </a>
        </div>
        <article className="text-muted-foreground text-[8px] bottom-0 flex-grow-0 prose dark:prose-invert border rounded-md p-2 m-1">
          Disclaimer This website is not affiliated with, endorsed, or sponsored
          by Nintendo, The Pokémon Company, or any other official entity. All
          images and content featured on this site are the property of their
          respective copyright and trademark holders, including Nintendo and
          Pokémon. Images sourced from fan sites or other platforms are used
          under the assumption of fair use for non-commercial, educational, or
          entertainment purposes. If you own the rights to any content featured
          on this website and would like it removed or credited differently,
          please contact us directly.
        </article>
      </div>
    </div>
  );
}
