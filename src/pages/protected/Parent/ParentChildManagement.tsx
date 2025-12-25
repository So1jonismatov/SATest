import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getParentChildren,
  getChildPerformance,
  getGradeColor,
  getStatusColor,
} from "@/function/Parent/ParentDashboardFunctions";
import type { Child } from "@/types/index";
import { GraduationCap, Mail, Calendar, User } from "lucide-react";

const ParentChildManagement: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      const fetchedChildren = await getParentChildren();
      setChildren(fetchedChildren);
    };

    fetchChildren();
  }, []);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold">Child Management</h1>
          <p className="text-muted-foreground mt-2">
            View your children's enrollment and basic information
          </p>
        </div>

        {/* Children Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {children.map((child) => {
            const performance = getChildPerformance(child.id);
            return (
              <Card
                key={child.id}
                className="transition-shadow hover:shadow-md"
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                        <GraduationCap className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{child.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">
                          {child.grade}
                        </p>
                      </div>
                    </div>
                    <Badge
                      className={getStatusColor(child.status || "active")}
                      variant="secondary"
                    >
                      {child.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span className="truncate">{child.email}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>Class: {child.class}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>
                        Enrolled:{" "}
                        {child.enrollmentDate
                          ? new Date(child.enrollmentDate).toLocaleDateString()
                          : "N/A"}
                      </span>
                    </div>

                    {performance && (
                      <div className="pt-2 border-t">
                        <div className="flex items-center justify-between text-sm">
                          <span>Current Grade:</span>
                          <Badge
                            className={getGradeColor(performance.overallGrade)}
                            variant="secondary"
                          >
                            {performance.overallGrade}
                          </Badge>
                        </div>
                        <div className="flex items-center justify-between text-sm mt-1">
                          <span>GPA:</span>
                          <span className="font-medium">{performance.gpa}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ParentChildManagement;
