import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import CONSTANTS from "@/constants";
import { MenuIcon } from "lucide-react";
import { Separator } from "./ui/separator";

export function HubMenu({ hubArticles }: { hubArticles: any[] }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost">
          <MenuIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <SheetHeader className="flex flex-row items-center">
          <img
            src="/logo.webp"
            alt="Logo"
            width={32}
            height={32}
            className="mr-2"
          />
          <SheetTitle>{CONSTANTS.TITLE}</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-2 overflow-y-auto">
          <Separator />
          <div>
            <a href="/" className="text-xl font-semibold">
              Home
            </a>
          </div>
          <div>
            <p className="text-xl font-semibold text-muted-foreground">
              Guides:
            </p>
            <div className="flex flex-col gap-1 pt-1">
              {CONSTANTS.GUIDE_COVERS.map((cover) => (
                <a href={cover.href} target="_blank" className="font-medium">
                  {cover.title}
                </a>
              ))}
            </div>
          </div>
          <div className="pb-2">
            <p className="text-xl font-semibold text-muted-foreground">
              Hub Articles:
            </p>
            <div className="flex flex-col gap-1 pt-1">
              {hubArticles.map((article) => (
                <a href={`/${article.slug}`} className="font-medium">
                  {article.data.title}
                </a>
              ))}
            </div>
          </div>
          <Separator />
        </div>
        <SheetFooter className="flex items-center gap-4">
          <a
            href="https://discord.gg/S99Ary5eba"
            target="_blank"
            className="select-none"
          >
            <img
              src="/discord-white.svg"
              alt="discord"
              width={32}
              height={32}
              loading="eager"
              className="hidden dark:block"
            />
            <img
              src="/discord-black.svg"
              alt="discord"
              width={32}
              height={32}
              loading="eager"
              className="dark:hidden"
            />
          </a>
          <a
            href="https://ko-fi.com/wall_sogb"
            target="_blank"
            className="select-none"
          >
            <img
              src="/coffee-white.svg"
              alt="coffee"
              width={32}
              height={32}
              loading="eager"
              className="hidden dark:block"
            />
            <img
              src="/coffee-black.svg"
              alt="coffee"
              width={32}
              height={32}
              loading="eager"
              className="dark:hidden"
            />
          </a>
          <a
            href="https://github.com/ModdingLinked/ModdingLinked"
            target="_blank"
            className="select-none"
          >
            <img
              src="/github-white.svg"
              alt="github"
              width={32}
              height={32}
              loading="eager"
              className="hidden dark:block"
            />
            <img
              src="/github-black.svg"
              alt="github"
              width={32}
              height={32}
              loading="eager"
              className="dark:hidden"
            />
          </a>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
