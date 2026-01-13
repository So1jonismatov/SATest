import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/context/AuthContext";
import { useTheme } from "@/context/ThemeContext";
import { FileText, Trophy, Target, BookOpen, Filter, ChevronLeft, ChevronRight } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { api } from "@/api/real";
import { type Test, type TestWithAccess } from "@/api/real/types";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const StudentDashboard = () => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const [tests, setTests] = useState<TestWithAccess[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [subjectFilter, setSubjectFilter] = useState("all");
  const [accessFilter, setAccessFilter] = useState("all");
  const testsPerPage = 6; // Adjust this number as needed

  useEffect(() => {
    const fetchTests = async () => {
      try {
        const response = await api.student.getTests();
        if (response) {
          const testsWithAccess = response.map((test: Test) => {
            const hasAccess = user?.userAccesses.some(
              (access: any) => access.test_id === test.id
            );
            return {
              testId: test.id,
              nomi: test.nomi,
              subject: test.subject,
              questionCount: test.savollar_soni || 0,
              is_premium: test.is_premium,
              hasAccess: hasAccess || !test.is_premium,
              jami_urinishlar: test.jami_urinishlar,
              average: test.average,
              questions: test.questions,
            };
          });
          setTests(testsWithAccess);
        }
      } catch (error) {
        console.error("Error fetching tests:", error);
        setTests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchTests();
  }, [user]);

  // Filter tests based on search term, subject, and access
  const filteredTests = useMemo(() => {
    return tests.filter(test => {
      const matchesSearch = test.nomi.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           test.subject.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesSubject = subjectFilter === "all" || test.subject === subjectFilter;
      const matchesAccess = accessFilter === "all" ||
                           (accessFilter === "accessible" && (test.hasAccess || !test.is_premium)) ||
                           (accessFilter === "premium" && test.is_premium && !test.hasAccess);

      return matchesSearch && matchesSubject && matchesAccess;
    });
  }, [tests, searchTerm, subjectFilter, accessFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredTests.length / testsPerPage);
  const startIndex = (currentPage - 1) * testsPerPage;
  const paginatedTests = filteredTests.slice(startIndex, startIndex + testsPerPage);

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, subjectFilter, accessFilter]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className={`rounded-lg p-6 ${
            theme === "dark" ? "bg-white text-black" : "bg-gray-900 text-white"
          }`}
        >
          <h1 className="text-3xl font-bold">Welcome {user?.name || "Stranger"}!</h1>
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
                {tests.filter((test) => test.is_premium).length}
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
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <h2 className="text-2xl font-bold">SAT Tests</h2>

            {/* Filters */}
            <div className="flex flex-wrap gap-3">
              {/* Search */}
              <div className="relative">
                <Input
                  placeholder="Search tests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-full md:w-64"
                />
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>

              {/* Subject Filter */}
              <Select value={subjectFilter} onValueChange={setSubjectFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Subject" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Subjects</SelectItem>
                  <SelectItem value="mathematics">Mathematics</SelectItem>
                  <SelectItem value="reading">Reading</SelectItem>
                  <SelectItem value="english">English</SelectItem>
                </SelectContent>
              </Select>

              {/* Access Filter */}
              <Select value={accessFilter} onValueChange={setAccessFilter}>
                <SelectTrigger className="w-[140px]">
                  <SelectValue placeholder="Access" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Tests</SelectItem>
                  <SelectItem value="accessible">Accessible</SelectItem>
                  <SelectItem value="premium">Premium Only</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <p>Loading tests...</p>
            </div>
          ) : paginatedTests.length === 0 ? (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-medium">No tests found</h3>
              <p className="mt-1 text-muted-foreground">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {paginatedTests.map((test) => (
                  <Card key={test.testId} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{test.nomi}</CardTitle>
                        {test.is_premium && (
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
                        disabled={!test.hasAccess && test.is_premium}
                        className="w-full"
                      >
                        <Link to={`/test/${test.testId}`}>
                          {test.hasAccess || !test.is_premium
                            ? "Start Test"
                            : "Access Required"}
                        </Link>
                      </Button>
                      {!test.hasAccess && test.is_premium && (
                        <p className="text-xs text-center text-muted-foreground">
                          Contact your teacher to get access
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Pagination */}
              <div className="flex items-center justify-between mt-8">
                <div className="text-sm text-muted-foreground">
                  Showing {startIndex + 1}-{Math.min(startIndex + testsPerPage, filteredTests.length)} of {filteredTests.length} tests
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>

                  <div className="flex items-center space-x-1">
                    {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                      let pageNum;
                      if (totalPages <= 5) {
                        pageNum = i + 1;
                      } else if (currentPage <= 3) {
                        pageNum = i + 1;
                      } else if (currentPage >= totalPages - 2) {
                        pageNum = totalPages - 4 + i;
                      } else {
                        pageNum = currentPage - 2 + i;
                      }

                      return (
                        <Button
                          key={pageNum}
                          variant={currentPage === pageNum ? "default" : "outline"}
                          size="sm"
                          onClick={() => handlePageChange(pageNum)}
                        >
                          {pageNum}
                        </Button>
                      );
                    })}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
