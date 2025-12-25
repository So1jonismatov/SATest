import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getParentChildren,
  getChildPerformance,
  getGradeColor,
  getStatusColor,
} from "@/function/Parent/ParentDashboardFunctions";
import { User, GraduationCap } from "lucide-react";
import type { Child } from "@/types/index";

const ChildrenOverviewCard: React.FC = () => {
  const [children, setChildren] = useState<Child[]>([]);

  useEffect(() => {
    const fetchChildren = async () => {
      const fetchedChildren = await getParentChildren();
      setChildren(fetchedChildren);
    };

    fetchChildren();
  }, []);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <User className="h-5 w-5" />
          <span>Children Overview</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {children.map((child) => {
            const performance = getChildPerformance(child.id);
            return (
              <div
                key={child.id}
                className="flex items-center justify-between rounded-lg border p-4"
              >
                <div className="flex items-center space-x-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <GraduationCap className="h-5 w-5 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold">{child.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {child.grade} • {child.class}
                    </p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Badge
                    className={getStatusColor(child.status)}
                    variant="secondary"
                  >
                    {child.status}
                  </Badge>
                  {performance && (
                    <Badge
                      className={getGradeColor(performance.overallGrade)}
                      variant="secondary"
                    >
                      {performance.overallGrade}
                    </Badge>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};

export default ChildrenOverviewCard;
