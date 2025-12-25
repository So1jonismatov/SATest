import { LayoutDashboard, Users, LogOut } from "lucide-react";

const parentLinksData = [
  {
    label: "Dashboard",
    href: "/admin/dashboard",
    icon: (
      <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
  {
    label: "User Management",
    href: "/admin/users",
    icon: (
      <Users className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },

  {
    label: "Logout",
    href: "#",
    icon: (
      <LogOut className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },
];

export default parentLinksData;
