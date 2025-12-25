import { type Feature } from "@/types/index";
import { BookOpen, Shield, Users } from "lucide-react";

const features: Feature[] = [
  {
    icon: <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    text: "Secure device & IP tracking",
    bgClass: "bg-blue-100 dark:bg-blue-900/50",
  },
  {
    icon: <Users className="w-4 h-4 text-green-600 dark:text-green-400" />,
    text: "Real-time progress monitoring",
    bgClass: "bg-green-100 dark:bg-green-900/50",
  },
  {
    icon: <BookOpen className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    text: "One-time test completion",
    bgClass: "bg-purple-100 dark:bg-purple-900/50",
  },
];

export default features;
