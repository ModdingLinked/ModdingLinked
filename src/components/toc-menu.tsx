import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { List } from "lucide-react";

export function TocMenu({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" className={className}>
          <List />
        </Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Table of Contents</SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4 overflow-y-auto py-4">{children}</div>
      </SheetContent>
    </Sheet>
  );
}
