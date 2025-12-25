import React, { useState, useEffect } from "react";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { api } from "@/api/real";
import { useAuth } from "@/context/AuthContext";
import { AdminUserSchema } from "@/lib/zod-schemas/admin-schema";
import { UserEditDialog } from "@/components/shared/admin-portal/UserEditDialog";
import type { User } from "@/types";
import {
  Users,
  GraduationCap,
  BookOpen,
  UserPlus,
  TrendingUp,
  Activity,
  BarChart3,
} from "lucide-react";

const AdminDashboard: React.FC = () => {
  const { token } = useAuth();
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    totalParents: 0,
    activeUsers: 0,
  });
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [classes, setClasses] = useState<string[]>([
    "10A",
    "10B",
    "11A",
    "11B",
  ]);

  const fetchUsers = async () => {
    const users = await api.admin.getUsers();
    const totalStudents = users.filter((u) => u.role === "student").length;
    const totalTeachers = users.filter((u) => u.role === "teacher").length;
    const totalParents = users.filter((u) => u.role === "parent").length;
    setStats({
      totalStudents,
      totalTeachers,
      totalParents,
      activeUsers: users.length,
    });
  };

  useEffect(() => {
    fetchUsers();
  }, [token]);

  const handleSaveUser = async (values: z.infer<typeof AdminUserSchema>) => {
    await api.admin.createUser(values as Omit<User, "id">);
    fetchUsers(); // Refresh stats after adding a user
    setIsUserDialogOpen(false);
  };

  const handleAddClass = (className: string) => {
    if (className && !classes.includes(className)) {
      setClasses([...classes, className]);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div
          className="rounded-lg p-6 transition-colors
            bg-gradient-to-r from-gray-900 to-gray-700 text-white
            dark:from-gray-100 dark:to-gray-300 dark:text-gray-900"
        >
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold">Admin Dashboard</h1>
              <p className="mt-2 opacity-90">
                Manage users, classes, and system settings
              </p>
            </div>

            <div className="flex gap-2">
              <Button
                className="bg-white w-full text-black hover:bg-gray-200 dark:bg-black dark:text-white dark:hover:bg-gray-800"
                onClick={() => setIsUserDialogOpen(true)}
              >
                <UserPlus className="h-4 w-4 mr-2" />
                Quick Add User
              </Button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <GraduationCap className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {stats.totalStudents}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Students
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <BookOpen className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">
                    {stats.totalTeachers}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Total Teachers
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <Users className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.totalParents}</div>
                  <div className="text-sm text-muted-foreground">
                    Total Parents
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stats.activeUsers}</div>
                  <div className="text-sm text-muted-foreground">
                    Active Users
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
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

          {/* Quick Stats & Actions */}
          <div className="space-y-6">
            {/* System Health */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>System Health</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full"></div>
                      <span className="text-sm">Server Status</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full"></div>
                      <span className="text-sm">Database</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full"></div>
                      <span className="text-sm">Storage</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full"></div>
                      <span className="text-sm">Backup</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <UserEditDialog
        isOpen={isUserDialogOpen}
        onClose={() => setIsUserDialogOpen(false)}
        onSave={handleSaveUser}
        editingUser={null}
        classes={classes}
        onAddClass={handleAddClass}
      />
    </div>
  );
};

export default AdminDashboard;
