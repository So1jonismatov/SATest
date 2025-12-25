import { TriangleAlert } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const UnauthorizedPage = () => {
  const content = (
    <div className="flex flex-col items-center justify-center p-4 text-center">
      <div className="mb-4 rounded-full border border-yellow-500/20 bg-yellow-500/10 p-3 text-yellow-500">
        <TriangleAlert className="h-10 w-10" />
      </div>
      <h1 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        Access Denied
      </h1>
      <p className="mt-4 max-w-md text-lg text-muted-foreground">
        Sorry, you do not have the necessary permissions to access this page.
        Please contact an administrator if you believe this is an error.
      </p>
      <div className="mt-8 flex items-center gap-4">
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

export default UnauthorizedPage;
