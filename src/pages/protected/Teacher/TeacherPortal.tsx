import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import type { Test, TestAnswer } from "@/types/index";
import {
  BookOpen,
  Users,
  FileText,
  TrendingUp,
  Plus,
  Eye,
  Target,
  Activity,
} from "lucide-react";

const TeacherPortal: React.FC = () => {
  const { user } = useAuth();
  const [tests, setTests] = useState<Test[]>([]);
  const [recentResults, setRecentResults] = useState<TestAnswer[]>([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    activeTests: 0,
    totalStudents: 0,
    averageScore: 0,
  });

  useEffect(() => {
    if (user) {
      const teacherId = user.id;
      api.teacher.getTests(teacherId).then((tests) => {
        setTests(tests);
        setStats((prev) => ({
          ...prev,
          totalTests: tests.length,
          activeTests: tests.length,
        })); // Simplified
      });

      // In a real app, you would fetch all results for all tests by the teacher.
      // For this simulation, we will just fetch all test answers.
      Promise.all(
        tests.map((test) => api.teacher.getTestResults(test.id)),
      ).then((results) => {
        setRecentResults(results.flat().slice(0, 5));
      });

      // Get student count
      const studentIds = new Set<string>();
      tests.forEach(() => {
        // This is a placeholder. In a real app, you would have a better way to get assigned students.
      });
      setStats((prev) => ({ ...prev, totalStudents: studentIds.size }));
    }
  }, [user, tests]);

  return (
    <div className="container mx-auto p-4 ">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className="rounded-lg p-6 transition-colors
            bg-gradient-to-r from-gray-900 to-gray-700 text-white
            dark:from-gray-100 dark:to-gray-400 dark:text-gray-900"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Teacher Dashboard</h1>
              <p className="mt-2 opacity-90">
                Welcome back! Here's what's happening with your tests and
                students.
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
              {/* Create Test Button */}
              <Button
                asChild
                className="w-full md:w-auto bg-white text-black hover:bg-gray-200
                           dark:bg-black dark:text-white dark:hover:bg-gray-800"
              >
                <Link to="/teacher/tests">
                  <Plus className="h-4 w-4 mr-2" />
                  Create Test
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTests}</div>
              <p className="text-xs text-muted-foreground">All tests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Active Tests
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.activeTests}</div>
              <p className="text-xs text-muted-foreground">Currently active</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Total Students
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalStudents}</div>
              <p className="text-xs text-muted-foreground">Enrolled students</p>
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
              <div className="text-2xl font-bold">{stats.averageScore}%</div>
              <p className="text-xs text-muted-foreground">
                Overall performance
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Tests */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <CardTitle className="flex items-center space-x-2 ">
                    <BookOpen className="h-5 w-5" />
                    <span>Recent Tests</span>
                  </CardTitle>
                  <Button variant="default" size="sm" asChild>
                    <Link to="/teacher/tests">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tests.slice(0, 3).map((test) => (
                    <div
                      key={test.id}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      {/* Test Info */}
                      <div className="flex-1">
                        <div className="flex items-start sm:items-center space-x-3">
                          <div>
                            <h4 className="font-medium">{test.title}</h4>
                            <p className="text-sm text-muted-foreground">
                              {test.questions.length} questions
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center space-x-2 self-start sm:self-auto">
                        <Button variant="ghost" size="sm">
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {/* Placeholder for recent activity */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Test Results */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Recent Test Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentResults.map((result) => (
                <div
                  key={result.id}
                  className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-3 rounded-lg border"
                >
                  {/* Student Info */}
                  <div className="flex items-center space-x-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                      <span className="text-sm font-medium">
                        {/* Placeholder for student name */}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium">{result.studentId}</div>
                      <div className="text-sm text-muted-foreground">
                        {result.answers.length} correct •{" "}
                        {new Date(result.submittedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Result Info */}
                  <div className="flex items-center space-x-3 sm:self-auto self-start">
                    <div className="text-left sm:text-right">
                      <div className="font-bold text-lg">{result.score}%</div>
                    </div>
                    <Progress value={result.score} className="w-24 sm:w-20" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPortal;
