import { LayoutDashboard, FileText, LogOut } from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/student/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Tests",
    href: "/student/tests",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <LogOut className="h-5 w-5" />,
  },
];

export default links;
