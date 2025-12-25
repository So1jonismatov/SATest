import { LayoutDashboard, FileText, LogOut } from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/teacher/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Tests",
    href: "/teacher/tests",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <LogOut className="h-5 w-5" />,
  },
];

export default links;
