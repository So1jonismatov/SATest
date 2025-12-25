import { ModeToggle } from "@/components/ui/mode-toggle";

export const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 p-4 flex justify-between items-center border-b border-border/50 bg-background/80 backdrop-blur-sm">
      <h1 className="text-2xl font-bold text-foreground">AnorTest</h1>
      <ModeToggle />
    </header>
  );
};
