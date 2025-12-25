import { LayoutDashboard, BarChart3, LogOut } from "lucide-react";

const parentLinksData = [
  {
    label: "Dashboard",
    href: "/parent/dashboard",
    icon: (
      <LayoutDashboard className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
    ),
  },

  {
    label: "Test Results",
    href: "/parent/results",
    icon: (
      <BarChart3 className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
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
