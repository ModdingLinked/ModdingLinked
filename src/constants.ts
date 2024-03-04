import type { GuideCover } from "@/types";

const TITLE = "ModdingLinked" as const;
const BASE_URL = "https://moddinglinked.com" as const;

const LINKS = {
  VIVA_NEW_VEGAS: "https://vivanewvegas.moddinglinked.com/",
  THE_BEST_OF_TIMES: "https://thebestoftimes.moddinglinked.com/",
  THE_MIDNIGHT_RIDE: "https://themidnightride.moddinglinked.com/",
  A_DRAGONBORNS_FATE: "https://dragonbornsfate.moddinglinked.com/",
} as const;

const GUIDE_COVERS: GuideCover[] = [
  {
    title: "Viva New Vegas",
    subtitle: "Fallout New Vegas",
    imgPath: "/src/assets/guide-covers/vnv.webp",
    alt: "Viva New Vegas",
    href: LINKS.VIVA_NEW_VEGAS,
  },
  {
    title: "The Best of Times",
    subtitle: "Tale of Two Wastelands",
    imgPath: "/src/assets/guide-covers/tbot.webp",
    alt: "The Best of Times",
    href: LINKS.THE_BEST_OF_TIMES,
  },
  {
    title: "The Midnight Ride",
    subtitle: "Fallout 4",
    imgPath: "/src/assets/guide-covers/tmr.webp",
    alt: "The Midnight Ride",
    href: LINKS.THE_MIDNIGHT_RIDE,
  },
  {
    title: "A Dragonborn's Fate",
    subtitle: "Skyrim Special Edition",
    imgPath: "/src/assets/guide-covers/dbf.webp",
    alt: "A Dragonborn's Fate",
    href: LINKS.A_DRAGONBORNS_FATE,
  },
] as const;

const CONSTANTS = {
  TITLE,
  BASE_URL,
  LINKS,
  GUIDE_COVERS,
};

export default CONSTANTS;
