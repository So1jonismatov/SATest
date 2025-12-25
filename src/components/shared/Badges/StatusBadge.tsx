import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { type DisplayStatus as Status } from "@/types";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      status: {
        Pending:
          "border-transparent bg-yellow-500/20 text-yellow-700 dark:text-yellow-400",
        Submitted:
          "border-transparent bg-green-500/20 text-green-700 dark:text-green-400",
        Graded:
          "border-transparent bg-blue-500/20 text-blue-700 dark:text-blue-400",
        Overdue:
          "border-transparent bg-red-500/20 text-red-700 dark:text-red-400",
        "Not Started":
          "border-transparent bg-gray-500/20 text-gray-700 dark:text-gray-400",
        Completed:
          "border-transparent bg-green-500/20 text-green-700 dark:text-green-400",
        Active:
          "border-transparent bg-green-500/20 text-green-700 dark:text-green-400",
        Inactive:
          "border-transparent bg-gray-500/20 text-gray-700 dark:text-gray-400",
        Suspended:
          "border-transparent bg-red-500/20 text-red-700 dark:text-red-400",
        "In Progress":
          "border-transparent bg-blue-500/20 text-blue-700 dark:text-blue-400",
        Published:
          "border-transparent bg-gray-500/20 text-gray-700 dark:text-gray-400",
        Draft:
          "border-transparent bg-gray-500/20 text-gray-700 dark:text-gray-400",
        Archived:
          "border-transparent bg-gray-500/20 text-gray-700 dark:text-gray-400",
      },
    },
  },
);

interface StatusBadgeProps {
  status: Status;
}

export const StatusBadge = ({ status }: StatusBadgeProps) => {
  return <div className={cn(badgeVariants({ status }))}>{status}</div>;
};
