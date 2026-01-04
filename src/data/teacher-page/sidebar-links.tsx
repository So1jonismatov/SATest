import { LayoutDashboard, FileText, LogOut, UserCog } from "lucide-react";

const links = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: <LayoutDashboard className="h-5 w-5" />,
  },
  {
    label: "Tests",
    href: "/admin/tests",
    icon: <FileText className="h-5 w-5" />,
  },
  {
    label: "Student Management",
    href: "/admin/students",
    icon: <UserCog className="h-5 w-5" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <LogOut className="h-5 w-5" />,
  },
];

export default links;
