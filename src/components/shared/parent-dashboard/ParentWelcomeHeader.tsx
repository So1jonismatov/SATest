import React from "react";
import { useAuth } from "@/context/AuthContext";
import { getFamilyPerformanceOverview } from "@/function/Parent/ParentDashboardFunctions";

const ParentWelcomeHeader: React.FC = () => {
  const { user } = useAuth();
  const familyOverview = getFamilyPerformanceOverview();

  return (
    <div className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
        <div className="mb-4 lg:mb-0">
          <h1 className="text-2xl font-bold lg:text-3xl">
            Welcome back, {user?.name || "Parent"}!
          </h1>
          <p className="mt-2 text-blue-50">
            Monitor your {familyOverview.totalChildren}{" "}
            {familyOverview.totalChildren === 1 ? "child's" : "children's"}{" "}
            academic progress and stay connected with their education.
          </p>
        </div>

        <div className="flex flex-col space-y-2 text-sm lg:text-right">
          <div className="flex items-center justify-between lg:justify-end lg:space-x-4">
            <span className="text-blue-100">Active Children:</span>
            <span className="font-semibold">
              {familyOverview.activeChildren}
            </span>
          </div>
          <div className="flex items-center justify-between lg:justify-end lg:space-x-4">
            <span className="text-blue-100">Family Avg GPA:</span>
            <span className="font-semibold">{familyOverview.averageGPA}</span>
          </div>
          <div className="flex items-center justify-between lg:justify-end lg:space-x-4">
            <span className="text-blue-100">Homework Completion:</span>
            <span className="font-semibold">
              {familyOverview.homeworkCompletionRate}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentWelcomeHeader;
