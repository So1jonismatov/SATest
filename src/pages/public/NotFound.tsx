import { SearchX } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const content = (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 rounded-full border border-border bg-card p-4 text-muted-foreground">
        <SearchX className="h-12 w-12" />
      </div>
      <h1 className="text-5xl font-bold tracking-tight text-foreground sm:text-6xl">
        404 - Page Not Found
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Oops! The page you are looking for does not exist. It might have been
        moved or deleted.
      </p>
      <div className="mt-8">
        <Button asChild>
          <Link to="/">Go to Homepage</Link>
        </Button>
      </div>
    </div>
  );

  return (
    <div className="relative z-10 flex h-screen w-full items-center justify-center">
      {content}
    </div>
  );
};

export default NotFound;
