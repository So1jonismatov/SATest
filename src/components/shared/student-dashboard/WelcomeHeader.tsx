import React from "react";
import { useAuth } from "@/context/AuthContext";
import { motion } from "motion/react";
// import { getStudentOverview } from "@/function/Student/StudentDashboardFunctions";
import { GraduationCap } from "lucide-react";

const StudentWelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  // const studentOverview = getStudentOverview();

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="rounded-lg bg-gradient-to-r
                 from-[oklch(var(--primary))]
                 to-[oklch(var(--secondary))]
                 p-6 text-[oklch(var(--primary-foreground))]"
    >
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[oklch(var(--primary-foreground))/0.2]">
              <GraduationCap className="h-6 w-6 text-[oklch(var(--primary-foreground))]" />
            </div>
            <div>
              <h1 className="text-2xl font-bold lg:text-3xl">
                Welcome back, {user?.name || "Student"}!
              </h1>
              <p className="text-[oklch(var(--primary-foreground))/80]">
                Ready to continue your learning journey?
              </p>
            </div>
          </div>
          <p className="mt-2 text-[oklch(var(--primary-foreground))/80]">
            You're doing great! Keep up the excellent work in your studies.
          </p>
        </div>
        {/* Right-hand metrics */}
      </div>
    </motion.div>
  );
};

export default StudentWelcomeHeader;
