import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { FileText, Trophy, Target, BookOpen } from "lucide-react";
import { useEffect, useState } from "react";
import { api } from "@/api/simulation/v2";
import { type TestWithAccess } from "@/api/real/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [tests, setTests] = useState<TestWithAccess[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.student.getTests();
        setTests(response.tests);
      } catch (error) {
        console.error("Error fetching tests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className={`rounded-lg p-6 ${
            theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <h1 className="text-3xl font-bold">Welcome Stranger !</h1>
          <p
            className={`mt-2 ${
              theme === "dark" ? "text-gray-700" : "text-gray-200"
            }`}
          >
            Ready to take your next SAT test?
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
              <p className="text-xs text-muted-foreground">Available to take</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Premium Tests
              </CardTitle>
              <Trophy className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tests.filter((test) => test.isPremium).length}
              </div>
              <p className="text-xs text-muted-foreground">Premium access</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Math Tests</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {tests.filter((test) => test.subject === "mathematics").length}
              </div>
              <p className="text-xs text-muted-foreground">SAT Math focused</p>
            </CardContent>
          </Card>
        </div>

        {/* SAT Tests Section */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">SAT Tests</h2>
            <div className="flex gap-2">
              <Button
                variant={theme === "dark" ? "outline" : "default"}
                size="sm"
              >
                All Tests
              </Button>
              <Button
                variant={theme === "dark" ? "outline" : "default"}
                size="sm"
              >
                Math
              </Button>
              <Button
                variant={theme === "dark" ? "outline" : "default"}
                size="sm"
              >
                Reading
              </Button>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading tests...</p>
            </div>
          ) : tests.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No tests available</h3>
              <p className="mt-1 text-muted-foreground">
                Please check back later for new SAT tests.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tests.map((test) => (
                <Card key={test.testId} className="overflow-hidden">
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{test.nomi}</CardTitle>
                      {test.isPremium && (
                        <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
                          Premium
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                        {test.subject}
                      </span>
                      <span>{test.questionCount} questions</span>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Avg. Score</span>
                      <span className="font-medium">{test.average}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Attempts</span>
                      <span className="font-medium">
                        {test.jami_urinishlar}
                      </span>
                    </div>
                    <Button
                      asChild
                      disabled={!test.hasAccess && test.isPremium}
                      className="w-full"
                    >
                      <Link to={`/test/${test.testId}`}>
                        {test.hasAccess || !test.isPremium
                          ? "Start Test"
                          : "Access Required"}
                      </Link>
                    </Button>
                    {!test.hasAccess && test.isPremium && (
                      <p className="text-xs text-center text-muted-foreground">
                        Contact your teacher to get access
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
