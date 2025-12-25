import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { getParentChildren } from "@/function/Parent/ParentDashboardFunctions";
import type { Student } from "@/types/index";
import { Users, TrendingUp, Trophy, Eye, GraduationCap } from "lucide-react";

const ParentDashboard: React.FC = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchChildren = async () => {
      setIsLoading(true);
      const fetchedChildren = await getParentChildren();
      setChildren(fetchedChildren);
      setIsLoading(false);
    };

    if (user && user.role === "parent") {
      fetchChildren();
    }
  }, [user]);

  // TODO: This data is now mocked/empty. It needs to be replaced with real API calls.
  const totalChildren = children.length;
  const totalTests = 0; // Mocked
  const averageScore = 0; // Mocked

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className="
            rounded-lg p-6
            bg-gray-900 text-white
            dark:bg-gray-100 dark:text-gray-900
          "
        >
          <h1 className="text-3xl font-bold">Welcome, {user?.name}!</h1>
          <p className="mt-2">
            Here is an overview of your family's academic progress.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Children
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalChildren}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Tests Completed
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{totalTests}</div>
              <p className="text-xs text-muted-foreground">
                TODO: Implement real data
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Family Average
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                TODO: Implement real data
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Children Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <GraduationCap className="h-5 w-5" />
              <span>Children Overview</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <p>Loading children...</p>
            ) : (
              <div className="space-y-4">
                {children.map((child) => (
                  <div
                    key={child.id}
                    className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-4 border rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <span className="text-blue-600 font-medium">
                          {child.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </span>
                      </div>
                      <div>
                        <h4 className="font-semibold">{child.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {child.class}
                        </p>
                      </div>
                    </div>
                    {/* TODO: This section needs to be updated with real test data */}
                    <div className="flex flex-col md:flex-row md:items-center md:space-x-4 gap-2 md:gap-0">
                      <div className="text-left md:text-right">
                        <div className="font-semibold">N/A%</div>
                        <div className="text-sm text-muted-foreground">
                          0 tests
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full md:w-auto"
                        disabled
                      >
                        <Eye className="h-4 w-4 mr-1" />
                        View Results
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* TODO: This entire card needs to be implemented with real test result data */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Test Results</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              This feature is pending API integration.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ParentDashboard;
