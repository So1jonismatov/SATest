import React, { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useAuth } from "@/context/AuthContext";
import {
  Search,
  Trash2,
  UserPlus,
  UserX,
  Users,
  CheckCircle,
} from "lucide-react";
import type { UserWithAccessList, TestWithAccess } from "@/api/real/types";
import { api } from "@/api/simulation/v2";

const StudentManagement: React.FC = () => {
  const { user } = useAuth();
  const [students, setStudents] = useState<UserWithAccessList[]>([]);
  const [tests, setTests] = useState<TestWithAccess[]>([]);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(
    null,
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [isAddStudentDialogOpen, setIsAddStudentDialogOpen] = useState(false);
  const [newStudent, setNewStudent] = useState({
    full_name: "",
    email: "",
    password: "",
  });

  const selectedStudent = useMemo(() => {
    if (!selectedStudentId) return null;
    return students.find((s) => s.id === selectedStudentId);
  }, [selectedStudentId, students]);

  // Fetch students and tests
  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentsData = await api.teacher.getUsers();
        const testsData = await api.student.getTests();

        setStudents(studentsData.users);
        setTests(testsData.tests);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [user]);

  // Filter students based on search term
  const filteredStudents = useMemo(() => {
    return students.filter(
      (student) =>
        student.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [students, searchTerm]);

  // Handle access toggle for a specific test with optimistic updates
  const handleAccessToggle = async (
    studentId: string,
    testId: string,
    currentlyHasAccess: boolean,
  ) => {
    // Optimistically update the UI
    setStudents((prev) =>
      prev.map((student) =>
        student.id === studentId
          ? {
              ...student,
              access_list: currentlyHasAccess
                ? student.access_list.filter((id) => id !== testId)
                : [...student.access_list, testId],
            }
          : student,
      ),
    );

    try {
      if (currentlyHasAccess) {
        // Revoke access
        await api.teacher.revokeAccess({ userId: studentId, testId });
      } else {
        // Grant access
        await api.teacher.grantAccess({ userId: studentId, testId });
      }
    } catch (error) {
      // If API call fails, revert the optimistic update
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? {
                ...student,
                access_list: currentlyHasAccess
                  ? [...student.access_list, testId] // Add back if we were removing
                  : student.access_list.filter((id) => id !== testId), // Remove if we were adding
              }
            : student,
        ),
      );
      console.error("Error toggling access:", error);
    }
  };

  // Handle granting all access
  const handleGrantAllAccess = async (studentId: string) => {
    try {
      const grantPromises = tests.map((test) =>
        api.teacher.grantAccess({ userId: studentId, testId: test.testId }),
      );
      await Promise.all(grantPromises);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId
            ? { ...student, access_list: tests.map((t) => t.testId) }
            : student,
        ),
      );
    } catch (error) {
      console.error("Error granting all access:", error);
    }
  };

  // Handle revoking all access
  const handleRevokeAllAccess = async (studentId: string) => {
    try {
      const revokePromises = tests.map((test) =>
        api.teacher.revokeAccess({ userId: studentId, testId: test.testId }),
      );
      await Promise.all(revokePromises);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === studentId ? { ...student, access_list: [] } : student,
        ),
      );
    } catch (error) {
      console.error("Error revoking all access:", error);
    }
  };
  // Handle student deletion
  const handleDeleteStudent = async () => {
    if (!studentToDelete) return;

    try {
      await api.teacher.deleteUser(studentToDelete);
      setStudents((prev) =>
        prev.filter((student) => student.id !== studentToDelete),
      );
      setIsDeleteDialogOpen(false);
      setStudentToDelete(null);
    } catch (error) {
      console.error("Error deleting student:", error);
    }
  };

  // Handle adding a new student
  const handleAddStudent = async () => {
    try {
      const addedStudent = await api.teacher.addUser({
        email: newStudent.email,
        password: newStudent.password,
        full_name: newStudent.full_name,
        role: "student",
      });

      setStudents([...students, addedStudent]);
      setIsAddStudentDialogOpen(false);
      setNewStudent({ full_name: "", email: "", password: "" });
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Failed to add student. Please try again.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex h-full w-full flex-col gap-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Student Management</h1>
            <p className="text-muted-foreground mt-2">
              Manage students, their access to tests, and user accounts
            </p>
          </div>

          <div className="flex gap-2">
            <Dialog
              open={isAddStudentDialogOpen}
              onOpenChange={setIsAddStudentDialogOpen}
            >
              <DialogTrigger asChild>
                <Button>
                  <UserPlus className="h-4 w-4 mr-2" />
                  Add Student
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Add New Student</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="full_name">Full Name</Label>
                    <Input
                      id="full_name"
                      value={newStudent.full_name}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          full_name: e.target.value,
                        })
                      }
                      placeholder="Enter student's full name"
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={newStudent.email}
                      onChange={(e) =>
                        setNewStudent({ ...newStudent, email: e.target.value })
                      }
                      placeholder="Enter student's email"
                    />
                  </div>
                  <div>
                    <Label htmlFor="password">Password</Label>
                    <Input
                      id="password"
                      type="password"
                      value={newStudent.password}
                      onChange={(e) =>
                        setNewStudent({
                          ...newStudent,
                          password: e.target.value,
                        })
                      }
                      placeholder="Enter password"
                    />
                  </div>
                  <div className="w-full">
                    <Button onClick={handleAddStudent} className="w-full">
                      Add Student
                    </Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search students by name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>

        {/* Main Content - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-[calc(100vh-250px)]">
          {/* Left Column - Student List */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  Students ({filteredStudents.length})
                </CardTitle>
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              <div className="space-y-3">
                {filteredStudents.map((student) => (
                  <div
                    key={student.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedStudentId === student.id
                        ? "border-primary bg-primary/5"
                        : "hover:bg-muted"
                    }`}
                    onClick={() => setSelectedStudentId(student.id)}
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-medium">{student.full_name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                        <div className="flex gap-2 mt-2">
                          <Badge variant="secondary" className="text-xs">
                            Tests: {student.access_list.length}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={(e) => {
                            e.stopPropagation();
                            setStudentToDelete(student.id);
                            setIsDeleteDialogOpen(true);
                          }}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Right Column - Test Access Management */}
          <Card className="h-full flex flex-col">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Test Access Management</CardTitle>
                {selectedStudent && (
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleGrantAllAccess(selectedStudent.id)}
                    >
                      <CheckCircle className="h-4 w-4 mr-1" />
                      Grant All
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokeAllAccess(selectedStudent.id)}
                    >
                      <UserX className="h-4 w-4 mr-1" />
                      Revoke All
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto">
              {selectedStudent ? (
                <div>
                  <h3 className="font-medium mb-4">
                    Managing: {selectedStudent.full_name}
                  </h3>
                  <div className="space-y-3">
                    {tests.map((test) => (
                      <div
                        key={test.testId}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <h4 className="font-medium">{test.nomi}</h4>
                          <p className="text-sm text-muted-foreground">
                            {test.subject} • {test.questionCount} questions
                          </p>
                        </div>
                        <div className="flex items-center gap-2">
                          {test.isPremium && (
                            <Badge variant="secondary">Premium</Badge>
                          )}
                          <Checkbox
                            checked={selectedStudent.access_list.includes(
                              test.testId,
                            )}
                            onCheckedChange={(checked) =>
                              handleAccessToggle(
                                selectedStudent.id,
                                test.testId,
                                selectedStudent.access_list.includes(
                                  test.testId,
                                ), // Current state before change
                              )
                            }
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center text-muted-foreground">
                  <p>Select a student to manage their test access</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Delete Confirmation Dialog */}
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Deletion</DialogTitle>
            </DialogHeader>
            <p>
              Are you sure you want to delete this student? This action cannot
              be undone.
            </p>
            <div className="flex justify-end gap-2">
              <Button
                variant="outline"
                onClick={() => setIsDeleteDialogOpen(false)}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteStudent}>
                Delete
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default StudentManagement;
