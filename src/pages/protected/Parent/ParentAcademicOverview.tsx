import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import type { Student, TestAnswer } from "@/types/index";
import { GraduationCap } from "lucide-react";

const ParentAcademicOverview: React.FC = () => {
  const { user } = useAuth();
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [results, setResults] = useState<TestAnswer[]>([]);

  useEffect(() => {
    if (user && user.role === "parent") {
      api.parent.getChildren().then((children) => {
        setChildren(children);
        if (children.length > 0) {
          setSelectedChildId(children[0].id);
        }
      });
    }
  }, [user]);

  useEffect(() => {
    if (selectedChildId) {
      api.parent.getChildTestResults(selectedChildId).then(setResults);
    }
  }, [selectedChildId]);

  const selectedChild = children.find((child) => child.id === selectedChildId);

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Academic Overview</h1>
            <p className="text-muted-foreground mt-2">
              View courses, teachers, and academic performance for your children
            </p>
          </div>

          {children.length > 1 && (
            <div className="lg:w-64">
              <Select
                value={selectedChildId}
                onValueChange={setSelectedChildId}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a child" />
                </SelectTrigger>
                <SelectContent>
                  {children.map((child) => (
                    <SelectItem key={child.id} value={child.id}>
                      {child.name} - {child.class}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        {selectedChild && (
          <>
            {/* Child Info Card */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <GraduationCap className="h-6 w-6 text-blue-600" />
                  </div>
                  <div>
                    <span>{selectedChild.name}</span>
                    <p className="text-sm font-normal text-muted-foreground">
                      {selectedChild.class}
                    </p>
                  </div>
                </CardTitle>
              </CardHeader>
            </Card>

            {/* Results Grid */}
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Test Results</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((result) => (
                  <Card
                    key={result.id}
                    className="transition-shadow hover:shadow-md"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div>
                          <CardTitle className="text-lg">
                            Test #{result.testId.split("-")[1]}
                          </CardTitle>
                          <p className="text-sm text-muted-foreground">
                            Completed on{" "}
                            {new Date(result.submittedAt).toLocaleDateString()}
                          </p>
                        </div>
                        <Badge variant="outline">{result.score}%</Badge>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </div>
          </>
        )}

        {children.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <GraduationCap className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Children Enrolled</h3>
              <p className="text-muted-foreground mb-4">
                You don't have any children enrolled in the system yet.
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default ParentAcademicOverview;
