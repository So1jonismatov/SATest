import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import type { Student, TestAnswer, Test } from "@/types/index";
import { BarChart3, User, Loader2 } from "lucide-react";
import { useIsMobile as useMobile } from "@/hooks/use-mobile";
import { TestResultAnalysis } from "@/components/shared/parent-dashboard/TestResultAnalysis";

const ParentReports: React.FC = () => {
  const { user } = useAuth();
  const isMobile = useMobile();
  const [children, setChildren] = useState<Student[]>([]);
  const [selectedChildId, setSelectedChildId] = useState<string>("");
  const [results, setResults] = useState<TestAnswer[]>([]);
  const [selectedResult, setSelectedResult] = useState<TestAnswer | null>(null);
  const [selectedTestDetails, setSelectedTestDetails] = useState<Test | null>(
    null,
  );
  const [isDetailsLoading, setIsDetailsLoading] = useState(false);

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
    } else {
      setResults([]);
    }
    setSelectedResult(null);
    setSelectedTestDetails(null);
  }, [selectedChildId]);

  const handleResultClick = async (result: TestAnswer) => {
    setSelectedResult(result);
    setIsDetailsLoading(true);
    try {
      const testDetails = await api.teacher.getTest(result.testId);
      setSelectedTestDetails(testDetails || null);
    } catch (error) {
      console.error("Failed to fetch test details", error);
      setSelectedTestDetails(null);
    } finally {
      setIsDetailsLoading(false);
    }
  };

  const selectedChild = children.find((child) => child.id === selectedChildId);

  const renderAnalysis = () => {
    if (isDetailsLoading) {
      return (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      );
    }
    if (selectedResult && selectedTestDetails) {
      return (
        <TestResultAnalysis
          result={selectedResult}
          test={selectedTestDetails}
        />
      );
    }
    return (
      <Card className="flex items-center justify-center h-full min-h-[300px]">
        <CardContent className="text-center">
          <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground" />
          <p className="mt-4 text-muted-foreground">
            Select a test result to see the analysis.
          </p>
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Performance Reports</h1>
            <p className="text-muted-foreground mt-2">
              Detailed academic performance and progress reports
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
            {children.length > 1 && (
              <Select
                value={selectedChildId}
                onValueChange={setSelectedChildId}
              >
                <SelectTrigger className="w-full sm:w-48">
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
            )}
          </div>
        </div>

        {selectedChild && (
          <>
            {/* Student Header Card */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                      <User className="h-8 w-8 text-blue-600" />
                    </div>
                    <div>
                      <CardTitle className="text-2xl">
                        {selectedChild.name}
                      </CardTitle>
                      <p className="text-muted-foreground">
                        {selectedChild.class}
                      </p>
                    </div>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Academic Report */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Recent Tests */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Test Results</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {results.length > 0 ? (
                      results.map((result, index) => (
                        <div
                          key={index}
                          className={`flex items-center justify-between p-3 rounded-lg border cursor-pointer transition-colors ${
                            selectedResult?.id === result.id
                              ? "bg-muted"
                              : "hover:bg-muted/50"
                          }`}
                          onClick={() => handleResultClick(result)}
                        >
                          <div>
                            <div className="font-medium">
                              Test #{result.testId.split("-")[1]}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {new Date(
                                result.submittedAt,
                              ).toLocaleDateString()}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold">
                              {result.score}%
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-muted-foreground text-center">
                        No test results found for this child.
                      </p>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Analysis View */}
              {!isMobile && <div>{renderAnalysis()}</div>}
            </div>
          </>
        )}

        {children.length === 0 && (
          <Card>
            <CardContent className="text-center py-12">
              <BarChart3 className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <h3 className="text-lg font-medium mb-2">No Children Enrolled</h3>
              <p className="text-muted-foreground">
                You need to have children enrolled to view performance reports.
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      {isMobile && (
        <Dialog
          open={!!selectedResult}
          onOpenChange={(isOpen) => !isOpen && setSelectedResult(null)}
        >
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            {renderAnalysis()}
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default ParentReports;
