import { LayoutDashboard, FileText, Users, LogOut } from "lucide-react";

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
    label: "Students",
    href: "/admin/students", // This could be a future route for managing students
    icon: <Users className="h-5 w-5" />,
  },
  {
    label: "Logout",
    href: "#",
    icon: <LogOut className="h-5 w-5" />,
  },
];

export default links;
