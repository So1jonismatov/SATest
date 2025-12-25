import { GraduationCap, Users, BookOpen, Shield } from "lucide-react";

const roleData = [
  {
    title: "Student",
    description: "Take tests and view your results",
    icon: <GraduationCap className="w-8 h-8 text-white" />,
    gradientClasses:
      "bg-gradient-to-r from-blue-500 to-blue-600 group-hover:from-blue-600 group-hover:to-blue-700",
    path: "/student/dashboard", // Updated Path
  },
  {
    title: "Parent",
    description: "Monitor your child's progress",
    icon: <Users className="w-8 h-8 text-white" />,
    gradientClasses:
      "bg-gradient-to-r from-green-500 to-green-600 group-hover:from-green-600 group-hover:to-green-700",
    path: "/parent/dashboard", // Updated Path
  },
  {
    title: "Teacher",
    description: "Upload and manage tests",
    icon: <BookOpen className="w-8 h-8 text-white" />,
    gradientClasses:
      "bg-gradient-to-r from-purple-500 to-purple-600 group-hover:from-purple-600 group-hover:to-purple-700",
    path: "/teacher/dashboard", // Updated Path
  },
  {
    title: "Admin",
    description: "Monitor platform and analytics",
    icon: <Shield className="w-8 h-8 text-white" />,
    gradientClasses:
      "bg-gradient-to-r from-orange-500 to-orange-600 group-hover:from-orange-600 group-hover:to-orange-700",
    path: "/admin/dashboard", // Updated Path
  },
];

export default roleData;
