import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import { mockApi as api } from "@/api/mock";
import { useAuth } from "@/context/AuthContext";
import type { Test } from "@/types/index";
import type { TestWithAccess, UserWithAccessList } from "@/api/real/types";
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
  const [tests, setTests] = useState<TestWithAccess[]>([]);
  const [users, setUsers] = useState<UserWithAccessList[]>([]);
  const [stats, setStats] = useState({
    totalTests: 0,
    premiumTests: 0,
    totalStudents: 0,
    averageScore: 0,
  });

  useEffect(() => {
    // For now, we'll simulate data since the API isn't fully implemented
    const mockTests: TestWithAccess[] = [
      {
        testId: "1",
        nomi: "SAT Math Practice Test 1",
        subject: "mathematics",
        questionCount: 58,
        isPremium: false,
        hasAccess: true,
        jami_urinishlar: 120,
        average: 750.5
      },
      {
        testId: "2",
        nomi: "SAT Reading Practice Test 1",
        subject: "reading",
        questionCount: 52,
        isPremium: false,
        hasAccess: true,
        jami_urinishlar: 95,
        average: 680.0
      },
      {
        testId: "3",
        nomi: "Advanced SAT Math Test",
        subject: "mathematics",
        questionCount: 58,
        isPremium: true,
        hasAccess: false,
        jami_urinishlar: 15,
        average: 720.0
      }
    ];

    const mockUsers: UserWithAccessList[] = [
      {
        id: "1",
        full_name: "John Doe",
        email: "john@example.com",
        access_list: ["1"]
      },
      {
        id: "2",
        full_name: "Jane Smith",
        email: "jane@example.com",
        access_list: ["1", "2"]
      },
      {
        id: "3",
        full_name: "Bob Johnson",
        email: "bob@example.com",
        access_list: []
      }
    ];

    setTests(mockTests);
    setUsers(mockUsers);

    setStats({
      totalTests: mockTests.length,
      premiumTests: mockTests.filter(t => t.isPremium).length,
      totalStudents: mockUsers.length,
      averageScore: Math.round(mockTests.reduce((sum, test) => sum + test.average, 0) / mockTests.length) || 0
    });
  }, [user]);

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Welcome Header */}
        <div
          className="rounded-lg p-6 transition-colors
            bg-gradient-to-r from-gray-900 to-gray-700 text-white
            dark:from-gray-100 dark:to-gray-400 dark:text-gray-900"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">SAT Teacher Dashboard</h1>
              <p className="mt-2 opacity-90">
                Manage your SAT tests and student access. Track performance and engagement.
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
                <Link to="/admin/tests">
                  <Plus className="h-4 w-4 mr-2" />
                  Create SAT Test
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Total Tests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.totalTests}</div>
              <p className="text-xs text-muted-foreground">All SAT tests</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">
                Premium Tests
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.premiumTests}</div>
              <p className="text-xs text-muted-foreground">Premium content</p>
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
                Avg. Score
              </CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.averageScore}</div>
              <p className="text-xs text-muted-foreground">
                SAT score average
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
                  <CardTitle className="flex items-center space-x-2">
                    <BookOpen className="h-5 w-5" />
                    <span>Recent SAT Tests</span>
                  </CardTitle>
                  <Button variant="default" size="sm" asChild>
                    <Link to="/admin/tests">View All</Link>
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {tests.slice(0, 3).map((test) => (
                    <div
                      key={test.testId}
                      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 p-4 rounded-lg border hover:shadow-sm transition-shadow"
                    >
                      {/* Test Info */}
                      <div className="flex-1">
                        <div className="flex items-start sm:items-center space-x-3">
                          <div>
                            <h4 className="font-medium">{test.nomi}</h4>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                              <span>{test.subject}</span>
                              <span>•</span>
                              <span>{test.questionCount} questions</span>
                              {test.isPremium && (
                                <>
                                  <span>•</span>
                                  <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-0.5 rounded">
                                    Premium
                                  </span>
                                </>
                              )}
                            </div>
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

          {/* Student Access Summary */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Student Access</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Students with access</span>
                    <span className="text-sm font-medium">
                      {users.filter(u => u.access_list.length > 0).length}/{users.length}
                    </span>
                  </div>
                  <Progress
                    value={(users.filter(u => u.access_list.length > 0).length / users.length) * 100}
                    className="w-full"
                  />
                  <div className="text-xs text-muted-foreground">
                    {Math.round((users.filter(u => u.access_list.length > 0).length / users.length) * 100)}% of students have test access
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="p-3 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">New SAT Test Created</div>
                    <div className="text-sm text-muted-foreground">Math Practice Test 1</div>
                  </div>
                  <div className="text-sm text-muted-foreground">2 hours ago</div>
                </div>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Access Granted</div>
                    <div className="text-sm text-muted-foreground">To John Doe for Advanced SAT Math</div>
                  </div>
                  <div className="text-sm text-muted-foreground">5 hours ago</div>
                </div>
              </div>

              <div className="p-3 rounded-lg border">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-medium">Test Completed</div>
                    <div className="text-sm text-muted-foreground">Jane Smith scored 1340</div>
                  </div>
                  <div className="text-sm text-muted-foreground">1 day ago</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default TeacherPortal;
