import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const LogoSmall = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <GraduationCap className="h-5 w-5 shrink-0 text-foreground" />
        <span className="text-lg font-semibold text-foreground">AnorTest</span>
      </div>
    </Link>
  );
};
