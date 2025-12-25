import { Link } from "react-router-dom";
import { GraduationCap } from "lucide-react";

export const LogoBig = () => {
  return (
    <Link to="/">
      <div className="flex items-center gap-2 cursor-pointer">
        <GraduationCap className="h-10 w-10 shrink-0 text-foreground" />
        <span className="text-2xl font-bold text-foreground">AnorTest</span>
      </div>
    </Link>
  );
};
