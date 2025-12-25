import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { FileText, Trophy, Target } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { api } from "@/api/real";
import { type Test, type TestAnswer } from "@/types";
import { ScoreHistoryChart } from "@/components/shared/student-dashboard/ScoreHistoryChart";

const StudentDashboard = () => {
  const { user, token } = useAuth();
  const { theme } = useTheme();
  const [tests, setTests] = useState<Test[]>([]);
  const [allTestResults, setAllTestResults] = useState<TestAnswer[]>([]);

  useEffect(() => {
    if (user && user.role === "student") {
      const studentId = user.id;

      api.student.getAssignedTests(studentId).then(setTests);

      api.parent.getChildTestResults(studentId).then(setAllTestResults);
    }
  }, [user, token]);

  const recentResults = useMemo(() => {
    return allTestResults
      .sort(
        (a, b) =>
          new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
      )
      .slice(0, 3);
  }, [allTestResults]);

  const averageScore =
    allTestResults.length > 0
      ? Math.round(
          allTestResults.reduce((sum, result) => sum + result.score, 0) /
            allTestResults.length,
        )
      : 0;

  const chartData = useMemo(() => {
    const testMap = new Map(tests.map((test) => [test.id, test.title]));
    return allTestResults.map((result) => ({
      name: testMap.get(result.testId) || `Test ${result.testId.slice(-4)}`,
      score: result.score,
    }));
  }, [allTestResults, tests]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className={`rounded-lg p-6 ${
            theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <h1 className="text-3xl font-bold">Welcome back, {user?.name}!</h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            Ready to take your next test?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Available Tests
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{tests.length}</div>
              <p className="text-xs text-muted-foreground">Ready to take</p>
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
              <div className="text-2xl font-bold">{allTestResults.length}</div>
              <p className="text-xs text-muted-foreground">Total completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Average Score
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Overall performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Score History Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Score History</CardTitle>
          </CardHeader>
          <CardContent>
            {chartData.length > 0 ? (
              <ScoreHistoryChart data={chartData} />
            ) : (
              <p>No test results yet to display a chart.</p>
            )}
          </CardContent>
        </Card>

        {/* Recent Results */}
        {recentResults.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Recent Results</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentResults.map((result, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-3 border rounded"
                  >
                    <div>
                      <p className="font-medium">
                        {tests.find((t) => t.id === result.testId)?.title ||
                          `Test #${result.testId.split("-")[1]}`}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold">{result.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default StudentDashboard;
