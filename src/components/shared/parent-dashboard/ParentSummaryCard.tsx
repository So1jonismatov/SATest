import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ParentSummaryCardProps {
  icon: React.ReactNode;
  title: string;
  value: string | number;
  subtitle: string;
  iconBgClass?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const ParentSummaryCard: React.FC<ParentSummaryCardProps> = ({
  icon,
  title,
  value,
  subtitle,
  iconBgClass = "bg-blue-500",
  trend,
}) => {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className={`rounded-full p-2 ${iconBgClass}`}>{icon}</div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground">{subtitle}</p>
          {trend && (
            <span
              className={`text-xs font-medium ${
                trend.isPositive ? "text-green-600" : "text-red-600"
              }`}
            >
              {trend.isPositive ? "+" : ""}
              {trend.value}%
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ParentSummaryCard;
